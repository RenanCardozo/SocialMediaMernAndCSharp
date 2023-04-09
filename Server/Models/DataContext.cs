using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class DataContext : IdentityDbContext<AppUser>{
    public DataContext(DbContextOptions options) : base(options) { }
    public DbSet<Activity> Activities { get; set; } = null!;
    
    }
}