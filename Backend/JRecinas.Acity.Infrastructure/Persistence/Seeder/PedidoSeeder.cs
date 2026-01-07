using JRecinas.Acity.Domain.Entities;
using JRecinas.Acity.Domain.Enums;
using JRecinas.Acity.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace JRecinas.Acity.Infrastructure.Persistence.Seeder
{
    public static class PedidoSeeder
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            await context.Database.EnsureCreatedAsync();

            if (await context.Pedidos.AnyAsync())
            {
                return; 
            }

            // Datos de Ejemplo
            var pedidos = new List<Pedido>
            {
                Pedido.Crear("PED-001", "Juan Perez", 1500.00m, "USD", DateTime.UtcNow.AddDays(-2)),
                Pedido.Crear("PED-002", "Maria Garcia", 250.50m, "USD", DateTime.UtcNow.AddDays(-1)),
                Pedido.Crear("PED-003", "Empresa Tech SAC", 5000.00m, "USD", DateTime.UtcNow)
            };

            var pedidoEnviado = pedidos.First(p => p.NumeroPedido == "PED-001");
            pedidoEnviado.CambiarEstado(PedidoStatus.Enviado);

            await context.Pedidos.AddRangeAsync(pedidos);
            await context.SaveChangesAsync();
        }
    }
}