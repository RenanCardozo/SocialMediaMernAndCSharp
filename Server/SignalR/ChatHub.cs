using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Server.Comments;
using MediatR;
using AutoMapper;
using Server.DTOs;

namespace Server.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public ChatHub(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        public async Task SendComment(Create.Command command)
        {
            var result = await _mediator.Send(command);
            var commentDto = _mapper.Map<CommentDto>(result.Value);

            await Clients
                .Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", commentDto);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var results = await _mediator.Send(
                new List.Query { ActivityId = Guid.Parse(activityId) }
            );
            await Clients.Caller.SendAsync("LoadComments", results.Value);
        }
    }
}
