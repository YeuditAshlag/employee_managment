using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Workers.Core.Entities;
using Workers.Core.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleEmployeeController : ControllerBase
    {
        private readonly IRoleEmployeeService _RoleEmployeeService;
        private readonly IMapper _mapper;

        public RoleEmployeeController(IRoleEmployeeService roleEmployeeService,IMapper mapper)
        {
            _RoleEmployeeService = roleEmployeeService; 
            _mapper = mapper;
        }
        // GET: api/<RoleEmployeeController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<roleEmployee>>> Get()
        {
            return Ok(await _RoleEmployeeService.GetEmployeeRolesAsync());
        }

        // GET api/<RoleEmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var res = await _RoleEmployeeService.GetEmployeeRolesByIdAsync(id);
            // var resDto = _mapper.Map<ArticleDto>(res);
            return res != null ? Ok(res) : NotFound();
        }

        // POST api/<RoleEmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] roleEmployee value)
        {
            var EmployeeRole = _mapper.Map<roleEmployee>(value);
            var res = await _RoleEmployeeService.AddRoleToEmployeeAsync(value);
            //var resDto = _mapper.Map<ArticleDto>(res);
            return res != null ? Ok(value) : NotFound(value);
        }

        // PUT api/<RoleEmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] roleEmployee value)
        {
            var e = _mapper.Map<roleEmployee>(value);
            var res = await _RoleEmployeeService.UpdateRoleToEmployeeAsync(id, e);
            // var resDto = _mapper.Map<ArticleDto>(res);
            return res != null ? Ok(res) : NotFound(res);
        }

        // DELETE api/<RoleEmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var res = await _RoleEmployeeService.DeletePositionOfEmployeeAsync(id);
            // var resDto = _mapper.Map<ArticleDto>(res);
            return res != null ? Ok(res) : NotFound(res);
        }
    }
}
