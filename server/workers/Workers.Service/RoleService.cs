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
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task< Role> AddRoleAsync(Role role)
        {
            return await _roleRepository.AddRoleAsync(role);
        }

        public async Task<Role> DeleteRoleAsync(int id)
        {
           return await _roleRepository.DeleteRoleAsync(id);
        }

        public async Task<IEnumerable<Role>> GetAllRoleAsync()
        {
            return await _roleRepository.GetRolesAsync();
        }

        public async Task< Role> GetRoleByIdAsync(int id)
        {
            return await _roleRepository.GetRoleByIdAsync(id);
        }

        public async Task< Role> UpdateRoleAsync(int id, Role role)
        {
            return await _roleRepository.UpdateRoleAsync(id, role);
        }
    }
}
