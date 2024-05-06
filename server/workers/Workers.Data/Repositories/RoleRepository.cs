using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;
using Workers.Core.Repositories;

namespace Workers.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Role> AddRoleAsync(Role role)
        {
            _context.AllRoles.AddAsync(role);
            await _context.SaveChangesAsync();
            return await _context.AllRoles.FindAsync( role.Id);
        }
    

        public async Task<Role> DeleteRoleAsync(int id)
        {
            Role role;
            role = await _context.AllRoles.FindAsync(id);
            if (role != null)
            {
                _context.AllRoles.Remove(role);
                await _context.SaveChangesAsync();
            }
            return role;
         
        }
        public async Task<Role> GetRoleByIdAsync(int id)
        {
            return await _context.AllRoles.FindAsync(id);
        }
     
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.AllRoles.ToListAsync();
        }
    
        public async Task<Role> UpdateRoleAsync(int id, Role newrole)
        {
            Role role;
            role = await _context.AllRoles.FindAsync(id);
            if(role != null)
            {
                role.NameRole = newrole.NameRole;
                await _context.SaveChangesAsync();  
            }
            return role;

        }
     

    }
}
