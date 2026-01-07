namespace JRecinas.Acity.Application.DTOs.Pedidos
{
    public record CreatePedidoRequest(
        string NumeroPedido,
        string ClienteNombre,
        decimal Total,
        string Estado,
        DateTime FechaPedido 
    );

    public record UpdatePedidoRequest(
        string ClienteNombre,
        decimal Total,
        string Estado,
        DateTime FechaPedido 
    );

    public record PedidoDto(Guid Id, string NumeroPedido, string ClienteNombre, DateTime Fecha, decimal Total, string Estado);
}