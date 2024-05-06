using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;
using Workers.Core.Repositories;
using Workers.Core.Service;

namespace Workers.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task< Employee> AddEmployeeAsync(Employee employee)
        {
            return await _employeeRepository.AddEmployeeAsync(employee);

        }

        public async Task<Employee> DeleteEmployeeAsync(int id)
        {
           return await _employeeRepository.DeleteEmployeeAsync(id); 
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeeAsync()
        {
           return await _employeeRepository.GetEmployeesAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync (int id)
        {
           return await _employeeRepository.GetEmployeeByIdAsync(id);    
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            return await _employeeRepository.UpdateEmployeeAsync(id, employee);   
        }
        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return _employeeRepository.GetByEmployeeNameAndPassword(employeeFirstName, employeeLastName, employeePassword);
        }

    }
}

