using System.Reflection;
using Workers.Core.Entities;

namespace Workers.API.Models
{
    public class EmployeePostModel
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public int Identity { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public IsmanOrWomen Gender { get; set; }//enum
        public DateTime StartDateWork { get; set; }

        public List <RoleEmployeePostModel> Roles { get; set; }

    }
}
