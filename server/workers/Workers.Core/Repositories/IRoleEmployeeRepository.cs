using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;

namespace Workers.Core.Repositories
{
    public interface IRoleEmployeeRepository 
    {
        Task<IEnumerable<roleEmployee>> GetEmployeeRolesAsync();
        Task<roleEmployee> GetEmployeeRolesByIdAsync(int employeeId);
        Task<roleEmployee> AddRoleToEmployeeAsync(roleEmployee roleEmployee);
        Task<roleEmployee> UpdateRoleToEmployeeAsync(int employeeId, roleEmployee roleEmployee);
        Task<roleEmployee> DeleteRoleOfEmployeeAsync(int id);
        
    }
}
