using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class DataContext : DbContext{
    public DataContext(DbContextOptions options) : base(options) { }
    public DbSet<Activity> Activities { get; set; } = null!;
    }
}