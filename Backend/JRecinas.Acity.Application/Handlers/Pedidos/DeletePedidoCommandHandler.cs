using JRecinas.Acity.Application.Contracts.CQRS;
using JRecinas.Acity.Application.Contracts.Repositories;
using JRecinas.Acity.Application.Contracts.Services;
using JRecinas.Acity.Application.DTOs;

namespace JRecinas.Acity.Application.Handlers.Pedidos
{
    public record DeletePedidoCommand(Guid Id) : ICommand<BaseResponse<bool>>;

    public class DeletePedidoCommandHandler : ICommandHandler<DeletePedidoCommand, BaseResponse<bool>>
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly IUnitOfWork _unitOfWork;

        public DeletePedidoCommandHandler(IPedidoRepository pedidoRepository, IUnitOfWork unitOfWork)
        {
            _pedidoRepository = pedidoRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseResponse<bool>> Handle(DeletePedidoCommand request, CancellationToken cancellationToken)
        {
            var pedido = await _pedidoRepository.GetByIdAsync(request.Id);

            if (pedido == null)
            {
                return BaseResponse<bool>.Failure("El pedido no existe o ya fue eliminado.");
            }


            pedido.Deactivate();

            _pedidoRepository.Update(pedido);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return BaseResponse<bool>.Success(true, "Pedido eliminado correctamente.");
        }
    }
}