using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;
using Workers.Core.Repositories;

namespace Workers.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        private readonly IRoleEmployeeRepository _RoleEmployeeRepository ;
        public EmployeeRepository(DataContext context, IRoleEmployeeRepository roleEmployeeRepository)
        {
            _context = context;
            _RoleEmployeeRepository = roleEmployeeRepository;
        }
        public async Task< Employee> AddEmployeeAsync(Employee employee)
        {
            _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return await _context.Employees.FindAsync(employee.Id);
        }

      

        public async Task<Employee> DeleteEmployeeAsync(int id)
        {
            Employee employee;
            employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                employee.Status = false;
                await _context.SaveChangesAsync();
            }
            return employee;

        }


        public async Task< Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.Include(x => x.Roles).ThenInclude(role => role.Role).FirstOrDefaultAsync(emp => emp.Id == id);
        }



        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            var allEmployee=await _context.Employees.Include(x => x.Roles).ThenInclude(role => role.Role).Where(e=>e.Status).ToListAsync();
            return allEmployee;

        }

        public async Task< Employee> UpdateEmployeeAsync(int id, Employee newEmp)
        {
            Employee employee;
            employee = await GetEmployeeByIdAsync(id);
            if (employee != null)
            {
                employee.Status = newEmp.Status;
                employee.FirstName = newEmp.FirstName;
                employee.LastName = newEmp.LastName;
                employee.BirthDate = newEmp.BirthDate;
                employee.StartDateWork = newEmp.StartDateWork;
                employee.Email = newEmp.Email;
                // employee.Roles.ForEach(x => _context.EmployeeRole.Remove(x));

                employee.Roles.ForEach(x => {
                    _RoleEmployeeRepository.DeleteRoleOfEmployeeAsync(x.Id);
                });
                employee.Roles = newEmp.Roles;
                employee.Roles = newEmp.Roles;
                employee.Gender = newEmp.Gender;
                employee.Identity = newEmp.Identity;

                await _context.SaveChangesAsync();
            }
            return employee;
        }


        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return _context.Employees.FirstOrDefault(e => e.FirstName == employeeFirstName && e.LastName == employeeLastName && e.Password == employeePassword);
        }

    }
}
