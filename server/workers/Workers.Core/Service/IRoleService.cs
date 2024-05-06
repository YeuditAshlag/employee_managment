using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;

namespace Workers.Core.Service
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetAllRoleAsync();
        Task< Role> GetRoleByIdAsync(int id);
        Task<Role> AddRoleAsync(Role role);
        Task<Role> UpdateRoleAsync(int id, Role role);
        Task<Role> DeleteRoleAsync(int id);
    }
}
