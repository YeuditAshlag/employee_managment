using Workers.Core.Entities;

namespace Workers.API.Models
{
    public class RoleEmployeePostModel
    {
        public int RoleId { get; set; }
        public DateTime StartDateWork { get; set; }
        public bool Ismanagerial { get; set; }
    }
}
