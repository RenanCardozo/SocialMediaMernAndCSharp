using AutoMapper;
using Server.Application.Activities;
using Server.Models;

namespace Server.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(
                    d => d.HostUsername,
                    o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName)
                )
                .ForMember(
                    d => d.Attendees,
                    o => o.MapFrom(s => s.Attendees)
                );
            CreateMap<ActivityAttendee, Profiles.ProfileDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}
