using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.DTOs;
using Workers.Core.Entities;

namespace Workers.Core
{
    public  class MappingProfile:Profile
    {
        public MappingProfile() 
        {
            CreateMap<RoleDto, Role>().ReverseMap();
            CreateMap<EmployeeDto, Employee>().ReverseMap();
            CreateMap<RoleEmployeeDto, roleEmployee>().ReverseMap();



        } 
    }
}
