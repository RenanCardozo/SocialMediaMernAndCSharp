using System.ComponentModel.DataAnnotations;
using System;
using Server.Application.Profiles;

namespace Server.Application.Activities
{
    public class ActivityDto
    {
        [Key]
        public Guid Id { get; set; }

        public string? Title { get; set; }

        public DateTime? Date { get; set; }

        public string? Description { get; set; }

        public string? Category { get; set; }

        public string? City { get; set; }

        public string? Venue { get; set; }

        public string HostUsername { get; set; }

        public bool isCancelled { get; set; }

        public ICollection<ProfileDto> Attendees { get; set; }
    }
}
