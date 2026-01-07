using JRecinas.Acity.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JRecinas.Acity.Infrastructure.Persistence.Configurations
{
    public class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> builder)
        {
            builder.ToTable("Pedidos");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.NumeroPedido)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasIndex(p => p.NumeroPedido)
                .IsUnique();

            builder.Property(p => p.ClienteNombre)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(p => p.Estado)
                .HasConversion<string>()
                .IsRequired();

            builder.OwnsOne(p => p.Total, money =>
            {
                money.Property(m => m.Amount)
                    .HasColumnName("TotalAmount")
                    .HasPrecision(18, 2)
                    .IsRequired();

                money.Property(m => m.Currency)
                    .HasColumnName("TotalCurrency")
                    .HasMaxLength(3)
                    .IsRequired();
            });

            builder.Property(p => p.CreatedAt).IsRequired();
            builder.Property(p => p.IsActive).IsRequired();
        }
    }
}