using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;

namespace Workers.Core.Service
{
    public interface IRoleEmployeeService
    {
        public Task<IEnumerable<roleEmployee>> GetEmployeeRolesAsync();
        Task<roleEmployee> AddRoleToEmployeeAsync( roleEmployee roleEmployee);
        Task<roleEmployee> UpdateRoleToEmployeeAsync(int employeeId, roleEmployee roleEmployee);

        Task<roleEmployee> DeletePositionOfEmployeeAsync(int id);
        Task<roleEmployee> GetEmployeeRolesByIdAsync(int employeeId);
    }
}
