using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Application.Core;
using Server.Application.Interfaces;
using Server.Application.Profiles;
using Server.Models;

namespace Server.Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<ProfileDto>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProfileDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<ProfileDto>>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                var profiles = new List<ProfileDto>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings
                            .Where(x => x.Target.UserName == request.Username)
                            .Select(u => u.Observer)
                            .ProjectTo<ProfileDto>(
                                _mapper.ConfigurationProvider,
                                new { currentUsername = _userAccessor.GetUserName() }
                            )
                            .ToListAsync();
                        break;
                    case "following":
                        profiles = await _context.UserFollowings
                            .Where(x => x.Observer.UserName == request.Username)
                            .Select(u => u.Target)
                            .ProjectTo<ProfileDto>(
                                _mapper.ConfigurationProvider,
                                new { currentUsername = _userAccessor.GetUserName() }
                            )
                            .ToListAsync();
                        break;
                }
                return Result<List<ProfileDto>>.Success(profiles);
            }
        }
    }
}
