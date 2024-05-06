using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.Entities;

namespace Workers.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Identity { get; set; }
        
        public string LastName { get; set; }
        public bool Status { get; set; }
        public DateTime StartDateWork { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public IsmanOrWomen Gender { get; set; }//enum

        public List<RoleEmployeeDto> Roles { get; set;}

       

    
    }
}
