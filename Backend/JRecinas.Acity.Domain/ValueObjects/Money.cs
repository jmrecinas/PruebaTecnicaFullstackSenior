namespace JRecinas.Acity.Domain.ValueObjects
{
    public record Money
    {
        public decimal Amount { get; init; }
        public string Currency { get; init; }

        private Money(decimal amount, string currency)
        {
            if (amount < 0) throw new ArgumentException("El monto no puede ser negativo.", nameof(amount));
            if (string.IsNullOrEmpty(currency)) throw new ArgumentException("La moneda es requerida.", nameof(currency));

            Amount = amount;
            Currency = currency;
        }

        public static Money Create(decimal amount, string currency = "USD")
            => new(amount, currency);
    }
}