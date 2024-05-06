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
    public class RoleEmployeeRepository : IRoleEmployeeRepository
    {
        private readonly DataContext _context;  
        public RoleEmployeeRepository(DataContext context)
        {
            _context = context; 
        }

        public async Task<IEnumerable<roleEmployee>> GetEmployeeRolesAsync()
        {           
             var list = await _context.RolesEmployee.Include(x => x.Role).ToListAsync();
            return list;
        }
       
        public async Task<roleEmployee> AddRoleToEmployeeAsync(roleEmployee roleEmployee)
        {
            await _context.RolesEmployee.AddAsync(roleEmployee); 
            _context.SaveChanges();
            return await _context.RolesEmployee.FindAsync (roleEmployee);
        }

        public async Task<roleEmployee> DeleteRoleOfEmployeeAsync(int id)
        {
            roleEmployee roleemployee;
            roleemployee = await _context.RolesEmployee.FindAsync(id);
            if(roleemployee != null) 
            {
                _context.RolesEmployee.Remove(roleemployee);
                await _context.SaveChangesAsync();   
            }
            return roleemployee;
        }
       


        public async Task<roleEmployee> GetEmployeeRolesByIdAsync(int id)
        {
            var empRole= await _context.RolesEmployee.Include(e=>e.Employee).Include(x=>x.Role).FirstOrDefaultAsync(x=>x.Id==id);
            return empRole;
        }

        public async Task<roleEmployee> UpdateRoleToEmployeeAsync(int employeeId, roleEmployee roleEmployee)
        {
            roleEmployee newemployee;
            newemployee = await _context.RolesEmployee.FindAsync(employeeId);
            if(newemployee != null)
            {
                newemployee.StartDateWork = roleEmployee.StartDateWork;
                newemployee.Role= roleEmployee.Role;
                newemployee.Ismanagerial = roleEmployee.Ismanagerial;   
                await _context.SaveChangesAsync();
            }
            return newemployee;
        }

  


    }
}
