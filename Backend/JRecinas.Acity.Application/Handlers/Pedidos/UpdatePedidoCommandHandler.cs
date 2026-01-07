using JRecinas.Acity.Application.Contracts.CQRS;
using JRecinas.Acity.Application.Contracts.Repositories;
using JRecinas.Acity.Application.Contracts.Services;
using JRecinas.Acity.Application.DTOs;

namespace JRecinas.Acity.Application.Handlers.Pedidos
{
    public record UpdatePedidoCommand(
        Guid Id,
        string ClienteNombre,
        decimal Total,
        string Estado,
        DateTime FechaPedido
    ) : ICommand<BaseResponse<bool>>;

    public class UpdatePedidoCommandHandler : ICommandHandler<UpdatePedidoCommand, BaseResponse<bool>>
    {
        private readonly IPedidoRepository _repository;
        private readonly IUnitOfWork _uow;

        public UpdatePedidoCommandHandler(IPedidoRepository r, IUnitOfWork u) { _repository = r; _uow = u; }

        public async Task<BaseResponse<bool>> Handle(UpdatePedidoCommand request, CancellationToken ct)
        {
            var pedido = await _repository.GetByIdAsync(request.Id);
            if (pedido == null) return BaseResponse<bool>.Failure("Pedido no encontrado.");

            if (!Enum.TryParse<JRecinas.Acity.Domain.Enums.PedidoStatus>(request.Estado, true, out var nuevoEstadoEnum))
                return BaseResponse<bool>.Failure($"Estado inválido.");

            try
            {
                pedido.ActualizarInformacion(
                    request.ClienteNombre,
                    request.Total,
                    request.FechaPedido
                );

                pedido.CambiarEstado(nuevoEstadoEnum);

                _repository.Update(pedido);
                await _uow.SaveChangesAsync(ct);

                return BaseResponse<bool>.Success(true, "Pedido actualizado.");
            }
            catch (Exception ex) { return BaseResponse<bool>.Failure(ex.Message); }
        }
    }
}