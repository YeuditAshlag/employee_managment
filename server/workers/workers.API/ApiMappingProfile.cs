using AutoMapper;
using Workers.API.Models;
using Workers.Core.DTOs;
using Workers.Core.Entities;

namespace Workers.API
{
    public class ApiMappingProfile:Profile
    {
       public ApiMappingProfile() {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();

            CreateMap<RolePostModel, Role>().ReverseMap();

            CreateMap<RoleEmployeePostModel, roleEmployee>().ReverseMap();


        }

    }
}
