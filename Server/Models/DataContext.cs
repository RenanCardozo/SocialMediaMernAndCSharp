using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Server.Models
{
    public class DataContext : IdentityDbContext<AppUser>{
    public DataContext(DbContextOptions options) : base(options) { }
    public DbSet<Activity> Activities { get; set; } = null!;
    public DbSet<ActivityAttendee> ActivitiesAttendees { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<UserFollowing> UserFollowings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new ActivityAttendeeConfiguration());

        builder.Entity<Comment>()
        .HasOne(a => a.Activity)
        .WithMany(c => c.Comments)
        .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserFollowing>(b => {
            b.HasKey(k => new {k.ObserverId, k.TargetId});

            b.HasOne(a => a.Observer)
                .WithMany(f => f.Followings)
                .HasForeignKey(o => o.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

            b.HasOne(a => a.Target)
                .WithMany(f => f.Followers)
                .HasForeignKey(o => o.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
}