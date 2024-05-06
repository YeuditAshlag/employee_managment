using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers.Core.DTOs
{
    public class RoleEmployeeDto
    {
        public RoleDto Role { get; set; }
        public bool Ismanagerial { get; set; }
        public DateTime StartDateWork { get; set; }
    }
}
