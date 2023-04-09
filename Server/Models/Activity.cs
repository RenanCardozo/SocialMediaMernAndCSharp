#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Activity
    {
        [Key]
        public Guid Id { get; set; }

        public string? Title { get; set; }

        public DateTime? Date { get; set; }

        public string? Description { get; set; }

        public string? Category { get; set; }

        public string? City { get; set; }

        public string? Venue { get; set; }
    }
}