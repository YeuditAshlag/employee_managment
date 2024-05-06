using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Workers.API.Models;
using Workers.Core.DTOs;
using Workers.Core.Entities;
using Workers.Core.Service;
using Workers.Service;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeservice,IRoleService roleService, IMapper mapper)
        {
            _employeeService = employeeservice;
            _roleService= roleService;
            _mapper= mapper;    
            
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Get(Login user)
        {
            var list = await _employeeService.GetAllEmployeeAsync();
            Employee foundEmployee = null;

            foreach (var employee in list)
            {
                if (employee.Password == user.Password && (user.FirstName.Equals(employee.FirstName) || user.LastName.Equals(employee.LastName)))
                {
                    foundEmployee = employee;
                    break;
                }
            }
            return foundEmployee != null ? Ok(foundEmployee) : NotFound("שם משתמש או סיסמא שגוי");
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> Get()
        {
            var list = await _employeeService.GetAllEmployeeAsync();
            var list1 = list.Select(d => _mapper.Map<EmployeeDto>(d));
            // להחזיר רק את העובדים שהדרוג הגבוה ביותר שלהם הוא שווה או פחות מהדרוג הגבוה של מבקש הבקשה
            return Ok(list1);



        }

        [HttpGet("name={name}")]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> Get(string name)
        {
            var list = await _employeeService.GetAllEmployeeAsync();

            if (name == null)
            {
                return Ok(list);
            }
            var list1 = list.Select(d => _mapper.Map<EmployeeDto>(d));
            return Ok(list.Where(x => x.FirstName.Contains(name) || x.LastName.Contains(name) || x.Identity.Contains(name) || x.BirthDate.ToString().Contains(name) || x.BirthDate.ToString().Contains(name) || x.Roles.Any(x => x.Role.NameRole.Contains(name))));
        }
        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var emp=await _employeeService.GetEmployeeByIdAsync(id);
            return emp!=null ? Ok(emp) : NotFound();
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel emp)
        {
            var roleNames = new Dictionary<string, bool>(); // מבנה נתונים לאחסון שמות התפקידים שנתקלנו בהם
            var list = new List<roleEmployee>();
            foreach (var role in emp.Roles)
            {
                var r = await _roleService.GetRoleByIdAsync(role.RoleId);
                if (r is null)
                {
                    return NotFound();
                }
                if (roleNames.ContainsKey(r.NameRole))
                {
                    continue;
                }
                roleNames[r.NameRole] = true;
                roleEmployee e = new roleEmployee();
                e.Ismanagerial = role.Ismanagerial;
                e.Role = r;
                e.RoleId = role.RoleId;
                e.StartDateWork = role.StartDateWork;
                list.Add(e);
            }
            var employee = _mapper.Map<Employee>(emp);
            employee.Roles = list;
            var res = await _employeeService.AddEmployeeAsync(employee);
            var resDto = _mapper.Map<EmployeeDto>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);
            //var list = new List<roleEmployee>();
            //foreach (var role in emp.Roles)
            //{
            //    var r = await _roleService.GetRoleByIdAsync(role.RoleId);
            //    if (r is null)
            //    {
            //        return NotFound();
            //    }
            //    roleEmployee e = new roleEmployee();
            //    e.Ismanagerial = role.Ismanagerial;
            //    e.Role = r;
            //    e.RoleId = role.RoleId;
            //    e.StartDateWork = role.StartDateWork;
            //    list.Add(e);
            //}
            //var employee = _mapper.Map<Employee>(emp);
            //employee.Roles = list;
            //var res = await _employeeService.AddEmployeeAsync(employee);
            //var resDto = _mapper.Map<EmployeeDto>(res);
            //return res != null ? Ok(resDto) : NotFound(resDto);
        }
       
        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var e1 = _mapper.Map<Employee>(employee);

            var list = new List<roleEmployee>();
            foreach (var role in employee.Roles)
            {
                var r = await _roleService.GetRoleByIdAsync(role.RoleId);
                if (r is null)
                {
                    return NotFound();
                }
                roleEmployee e = new roleEmployee();
                e.Ismanagerial = role.Ismanagerial;
                e.Role = r;
                e.RoleId = role.RoleId;
                e.StartDateWork = role.StartDateWork;
                list.Add(e);
            }
            e1.Roles = list;
            var res = await _employeeService.UpdateEmployeeAsync(id, e1);
            var resDto = _mapper.Map<EmployeeDto>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var res = await _employeeService.DeleteEmployeeAsync(id);
            var resDto = _mapper.Map<EmployeeDto>(res);
            return res != null ? Ok(resDto) : NotFound(resDto);
        }

       
    }
}
    

