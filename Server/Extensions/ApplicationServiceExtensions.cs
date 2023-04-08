using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Server.Application.Activities;
using Server.Models;

namespace Server.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            var connectionString = config.GetConnectionString("DefaultConnection");
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); // Replace this line to allow specific methods
                });
            });

            services.AddMediatR(typeof(Server.Application.Activities.List.Handler).Assembly);
            services.AddAutoMapper(typeof(Server.Application.Core.MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            return services;
        }
    }
}
