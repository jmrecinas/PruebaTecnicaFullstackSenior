using JRecinas.Acity.Application.Contracts.Repositories;
using JRecinas.Acity.Application.Contracts.Services;
using JRecinas.Acity.Infrastructure.Persistence.Contexts;
using JRecinas.Acity.Infrastructure.Persistence.Repositories;
using JRecinas.Acity.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace JRecinas.Acity.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(
                    configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
                ));

            services.AddScoped<IPedidoRepository, PedidoRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}