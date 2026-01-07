using MediatR;
using JRecinas.Acity.Application.DTOs;
using JRecinas.Acity.Application.DTOs.Auth;
using JRecinas.Acity.Application.Contracts.Services; 
using JRecinas.Acity.Application.Contracts.CQRS;

namespace JRecinas.Acity.Application.Handlers.Auth
{
    public record LoginQuery(string Email, string Password) : IQuery<BaseResponse<LoginResponse>>;

    public class LoginQueryHandler : IQueryHandler<LoginQuery, BaseResponse<LoginResponse>>
    {
        private readonly ITokenService _tokenService;

        public LoginQueryHandler(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        public async Task<BaseResponse<LoginResponse>> Handle(LoginQuery request, CancellationToken cancellationToken)
        {

            bool isValidUser = request.Email == "admin@jrecinas.acity" && request.Password == "Admin123!";

            if (!isValidUser)
            {
                return BaseResponse<LoginResponse>.Failure("Credenciales inválidas.");
            }

            var token = _tokenService.GenerateToken(request.Email, "Admin");

            return BaseResponse<LoginResponse>.Success(new LoginResponse(token, 3600));
        }
    }
}