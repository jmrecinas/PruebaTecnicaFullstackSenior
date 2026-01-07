using JRecinas.Acity.Domain.Enums;
using JRecinas.Acity.Domain.ValueObjects;

namespace JRecinas.Acity.Domain.Entities
{
    public class Pedido : BaseEntity
    {
        public string NumeroPedido { get; private set; } = default!;
        public string ClienteNombre { get; private set; } = default!;
        public DateTime FechaPedido { get; private set; }
        public Money Total { get; private set; } = default!;
        public PedidoStatus Estado { get; private set; }

        private Pedido() { }

        private Pedido(string numeroPedido, string clienteNombre, Money total, DateTime fechaPedido)
        {
            NumeroPedido = numeroPedido;
            ClienteNombre = clienteNombre;
            Total = total;
            FechaPedido = fechaPedido; 
            Estado = PedidoStatus.Registrado;
        }

        public static Pedido Crear(string numeroPedido, string clienteNombre, decimal montoTotal, string moneda, DateTime fechaPedido)
        {
            if (string.IsNullOrWhiteSpace(numeroPedido)) throw new ArgumentException("El número de pedido es requerido.");
            if (string.IsNullOrWhiteSpace(clienteNombre)) throw new ArgumentException("El cliente es requerido.");
            if (montoTotal <= 0) throw new InvalidOperationException("El total del pedido debe ser mayor a 0.");

            if (fechaPedido == DateTime.MinValue) fechaPedido = DateTime.UtcNow;

            fechaPedido = DateTime.SpecifyKind(fechaPedido, DateTimeKind.Utc);

            return new Pedido(numeroPedido, clienteNombre, Money.Create(montoTotal, moneda), fechaPedido);
        }

        public void ActualizarInformacion(string clienteNombre, decimal montoTotal, DateTime fechaPedido)
        {
            if (Estado != PedidoStatus.Registrado && Estado != PedidoStatus.Procesando)
                throw new InvalidOperationException("Solo se pueden editar pedidos en estado Registrado o Procesando."); 

            if (montoTotal <= 0) throw new InvalidOperationException("El total debe ser mayor a 0.");

            if (fechaPedido == DateTime.MinValue) fechaPedido = DateTime.UtcNow;

            ClienteNombre = clienteNombre;
            Total = Money.Create(montoTotal, Total.Currency);
            FechaPedido = DateTime.SpecifyKind(fechaPedido, DateTimeKind.Utc); 
            UpdatedAt = DateTime.UtcNow;
        }

        public void CambiarEstado(PedidoStatus nuevoEstado)
        {
            Estado = nuevoEstado;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}