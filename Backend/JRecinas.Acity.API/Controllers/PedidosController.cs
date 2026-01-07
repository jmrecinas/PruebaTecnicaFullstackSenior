using JRecinas.Acity.Application.DTOs;
using JRecinas.Acity.Application.DTOs.Pedidos;
using JRecinas.Acity.Application.Handlers.Pedidos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace JRecinas.Acity.API.Controllers
{
    [Route("api/pedidos")]
    [ApiController]
    [Authorize] 
    [EnableRateLimiting("fixed")]
    public class PedidosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PedidosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllPedidosQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _mediator.Send(new GetPedidoByIdQuery(id));
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePedidoRequest request)
        {
            var command = new CreatePedidoCommand(
                request.NumeroPedido,
                request.ClienteNombre,
                request.Total,
                request.Estado,
                request.FechaPedido // <--- Mapeo
            );

            var result = await _mediator.Send(command);
            if (!result.IsSuccess) return BadRequest(result);
            return CreatedAtAction(nameof(GetById), new { id = result.Result }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdatePedidoRequest request)
        {
            var command = new UpdatePedidoCommand(
                id,
                request.ClienteNombre,
                request.Total,
                request.Estado,
                request.FechaPedido // <--- Mapeo
            );

            var result = await _mediator.Send(command);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(BaseResponse<bool>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeletePedidoCommand(id);
            var result = await _mediator.Send(command);

            if (!result.IsSuccess)
                return NotFound(result);

            return Ok(result);
        }
    }
}