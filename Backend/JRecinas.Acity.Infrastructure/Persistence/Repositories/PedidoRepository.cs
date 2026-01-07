using JRecinas.Acity.Application.Contracts.Repositories;
using JRecinas.Acity.Domain.Entities;
using JRecinas.Acity.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace JRecinas.Acity.Infrastructure.Persistence.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly ApplicationDbContext _context;

        public PedidoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Pedido> AddAsync(Pedido pedido)
        {
            var result = await _context.Pedidos.AddAsync(pedido);
            return result.Entity;
        }

        public async Task<IEnumerable<Pedido>> GetAllAsync()
        {
            return await _context.Pedidos
                .AsNoTracking() 
                .Where(p => p.IsActive) 
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<Pedido?> GetByIdAsync(Guid id)
        {
            return await _context.Pedidos
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        }

        public void Update(Pedido pedido)
        {
            _context.Pedidos.Update(pedido);
        }

        public async Task<bool> ExistsByNumeroPedidoAsync(string numeroPedido)
        {
            return await _context.Pedidos
                .AnyAsync(p => p.NumeroPedido == numeroPedido && p.IsActive);
        }
    }
}