using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers.Core.DTOs;

namespace Workers.Core.Entities
{
    public enum IsmanOrWomen { man=1,women=2}
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Identity { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public IsmanOrWomen Gender { get; set; }//enum
        public DateTime StartDateWork { get; set; }
        public bool Status { get; set; }
        public List<roleEmployee> Roles { get; set; }
        public Employee()
        {
            Status=true;


        }

    }
}
