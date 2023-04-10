using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

public class ActivityAttendeeConfiguration : IEntityTypeConfiguration<ActivityAttendee>
{
    public void Configure(EntityTypeBuilder<ActivityAttendee> builder)
    {
        builder.HasKey(aa => new { aa.AppUserId, aa.ActivityId });

        builder.HasOne(u => u.AppUser)
            .WithMany(a => a.Activities)
            .HasForeignKey(aa => aa.AppUserId);

        builder.HasOne(u => u.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);
    }
}