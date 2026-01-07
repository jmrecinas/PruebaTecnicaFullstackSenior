using MediatR;
using JRecinas.Acity.Application.DTOs;
using JRecinas.Acity.Application.DTOs.Pedidos;
using JRecinas.Acity.Application.Contracts.Repositories;
using JRecinas.Acity.Application.Contracts.CQRS;

namespace JRecinas.Acity.Application.Handlers.Pedidos
{
    public record GetAllPedidosQuery : IQuery<BaseResponse<IEnumerable<PedidoDto>>>;

    public class GetAllPedidosQueryHandler : IQueryHandler<GetAllPedidosQuery, BaseResponse<IEnumerable<PedidoDto>>>
    {
        private readonly IPedidoRepository _pedidoRepository;

        public GetAllPedidosQueryHandler(IPedidoRepository pedidoRepository)
        {
            _pedidoRepository = pedidoRepository;
        }

        public async Task<BaseResponse<IEnumerable<PedidoDto>>> Handle(GetAllPedidosQuery request, CancellationToken cancellationToken)
        {
            var pedidos = await _pedidoRepository.GetAllAsync();

            var pedidosDto = pedidos.Select(p => new PedidoDto(
                p.Id,
                p.NumeroPedido,
                p.ClienteNombre,
                p.FechaPedido, 
                p.Total.Amount,
                p.Estado.ToString()
            ));

            return BaseResponse<IEnumerable<PedidoDto>>.Success(pedidosDto);
        }
    }
}