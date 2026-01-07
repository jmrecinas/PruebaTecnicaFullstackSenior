using JRecinas.Acity.Domain.Entities;

namespace JRecinas.Acity.Application.Contracts.Repositories
{
    public interface IPedidoRepository
    {
        Task<Pedido> AddAsync(Pedido pedido);
        Task<Pedido?> GetByIdAsync(Guid id);
        Task<IEnumerable<Pedido>> GetAllAsync();
        void Update(Pedido pedido);
        Task<bool> ExistsByNumeroPedidoAsync(string numeroPedido);
    }
}