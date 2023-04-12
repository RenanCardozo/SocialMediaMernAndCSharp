using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }

        public AppUser Observer { get; set; }

        public string TargetId { get; set; }

        public AppUser Target { get; set; }
    }
}