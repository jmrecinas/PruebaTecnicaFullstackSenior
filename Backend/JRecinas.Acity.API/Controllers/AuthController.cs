using JRecinas.Acity.Application.Handlers.Auth;
using JRecinas.Acity.Application.DTOs.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace JRecinas.Acity.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _mediator.Send(new LoginQuery(request.Email, request.Password));

            if (!result.IsSuccess)
                return Unauthorized(result);

            return Ok(result);
        }
    }
}