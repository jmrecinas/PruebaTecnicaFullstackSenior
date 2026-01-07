using JRecinas.Acity.Application.Contracts.CQRS;
using JRecinas.Acity.Application.Contracts.Repositories;
using JRecinas.Acity.Application.Contracts.Services;
using JRecinas.Acity.Application.DTOs;
using JRecinas.Acity.Domain.Entities;

namespace JRecinas.Acity.Application.Handlers.Pedidos
{
    public record CreatePedidoCommand(
        string NumeroPedido,
        string ClienteNombre,
        decimal Total,
        string Estado,
        DateTime FechaPedido
    ) : ICommand<BaseResponse<Guid>>;

    public class CreatePedidoCommandHandler : ICommandHandler<CreatePedidoCommand, BaseResponse<Guid>>
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreatePedidoCommandHandler(IPedidoRepository pedidoRepository, IUnitOfWork unitOfWork)
        {
            _pedidoRepository = pedidoRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<Guid>> Handle(CreatePedidoCommand request, CancellationToken cancellationToken)
        {
            if (await _pedidoRepository.ExistsByNumeroPedidoAsync(request.NumeroPedido))
                return BaseResponse<Guid>.Failure($"El número de pedido '{request.NumeroPedido}' ya existe.");

            if (!Enum.TryParse<JRecinas.Acity.Domain.Enums.PedidoStatus>(request.Estado, true, out var estadoEnum))
                return BaseResponse<Guid>.Failure($"Estado inválido.");

            try
            {
                var nuevoPedido = Pedido.Crear(
                    request.NumeroPedido,
                    request.ClienteNombre,
                    request.Total,
                    "USD",
                    request.FechaPedido 
                );

                nuevoPedido.CambiarEstado(estadoEnum);

                await _pedidoRepository.AddAsync(nuevoPedido);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                return BaseResponse<Guid>.Success(nuevoPedido.Id, "Pedido creado exitosamente.");
            }
            catch (Exception ex)
            {
                return BaseResponse<Guid>.Failure(ex.Message);
            }
        }
    }
}