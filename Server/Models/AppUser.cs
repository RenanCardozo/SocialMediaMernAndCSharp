using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        public List<ActivityAttendee> Activities { get; set; }

        public List<Photo> Photos { get; set; }

        public List<UserFollowing> Followings { get; set; }
        public List<UserFollowing> Followers { get; set; }
    }
}