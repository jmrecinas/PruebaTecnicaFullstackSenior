using MediatR;
using JRecinas.Acity.Application.DTOs;
using JRecinas.Acity.Application.DTOs.Pedidos;
using JRecinas.Acity.Application.Contracts.Repositories;
using JRecinas.Acity.Application.Contracts.CQRS;

namespace JRecinas.Acity.Application.Handlers.Pedidos
{
    public record GetPedidoByIdQuery(Guid Id) : IQuery<BaseResponse<PedidoDto>>;

    public class GetPedidoByIdQueryHandler : IQueryHandler<GetPedidoByIdQuery, BaseResponse<PedidoDto>>
    {
        private readonly IPedidoRepository _repository;

        public GetPedidoByIdQueryHandler(IPedidoRepository repository) => _repository = repository;

        public async Task<BaseResponse<PedidoDto>> Handle(GetPedidoByIdQuery request, CancellationToken ct)
        {
            var pedido = await _repository.GetByIdAsync(request.Id);
            if (pedido == null) return BaseResponse<PedidoDto>.Failure("Pedido no encontrado.");

            var dto = new PedidoDto(pedido.Id, pedido.NumeroPedido, pedido.ClienteNombre, pedido.FechaPedido, pedido.Total.Amount, pedido.Estado.ToString());
            return BaseResponse<PedidoDto>.Success(dto);
        }
    }
}