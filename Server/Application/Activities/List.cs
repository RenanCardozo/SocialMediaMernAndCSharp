using Microsoft.EntityFrameworkCore;
using Server.Models;
using MediatR;
using Server.Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Server.Application.Interfaces;

namespace Server.Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
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

            public async Task<Result<List<ActivityDto>>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
            var activities = await _context.Activities
            .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUserName()})
            .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
