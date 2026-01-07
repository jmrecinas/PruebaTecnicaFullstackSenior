namespace JRecinas.Acity.Application.Contracts.Services
{
    public interface ITokenService
    {
        string GenerateToken(string email, string role);
    }
}