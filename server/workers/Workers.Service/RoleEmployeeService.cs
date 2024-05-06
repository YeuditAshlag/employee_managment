using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;
using Workers.Core.Repositories;
using Workers.Core.Service;

namespace Workers.Service
{
    public class RoleEmployeeService : IRoleEmployeeService
    {
        private readonly IRoleEmployeeRepository _roleEmployeeRepository;
        public RoleEmployeeService(IRoleEmployeeRepository roleEmployee)
        {
            _roleEmployeeRepository = roleEmployee;
        }
        public async Task<roleEmployee> AddRoleToEmployeeAsync( roleEmployee roleEmployee)
        {
            return await _roleEmployeeRepository.AddRoleToEmployeeAsync(roleEmployee);
        }
   

        public async Task<roleEmployee> DeletePositionOfEmployeeAsync(int id)
        {
           return await _roleEmployeeRepository.DeleteRoleOfEmployeeAsync(id);
        }
      

        public async Task<IEnumerable<roleEmployee>> GetEmployeeRolesAsync()
        {
            return await _roleEmployeeRepository.GetEmployeeRolesAsync();
        }
     

        public async Task<roleEmployee> GetEmployeeRolesByIdAsync(int employeeId)
        {
            return await _roleEmployeeRepository.GetEmployeeRolesByIdAsync(employeeId);
        }

        public async Task<roleEmployee> UpdateRoleToEmployeeAsync(int employeeId, roleEmployee roleEmployee)
        {
            return await _roleEmployeeRepository.UpdateRoleToEmployeeAsync(employeeId, roleEmployee);
        }
       
    }
}
