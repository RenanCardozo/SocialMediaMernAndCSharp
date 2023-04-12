using Server.Models;

namespace Server.Application.Profiles
{
    public class ProfileDto
    {
        public string Username { get; set; }

        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public string Image { get; set; }

        public bool Following { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingCount { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
