using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers.Core.Entities
{
    public class roleEmployee
    {
        public int Id  { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime StartDateWork { get; set; }
        public bool Ismanagerial { get; set; }
      
    }
}
