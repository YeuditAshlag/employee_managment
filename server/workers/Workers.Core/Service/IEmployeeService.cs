using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;

namespace Workers.Core.Service
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllEmployeeAsync();
        Task< Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> AddEmployeeAsync(Employee employee);
        Task<Employee> UpdateEmployeeAsync(int id, Employee employee);
        Task<Employee> DeleteEmployeeAsync(int id);
        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword);


    }
}
