#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Activity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Venue { get; set; }
    }
}