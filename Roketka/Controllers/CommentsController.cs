using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roketka.Models;
using Roketka.Services.CommentsService;
using System.Security.Claims;

namespace Roketka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsService _commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        [Authorize]
        [HttpPost("AddComment")]
        public async Task<ActionResult<Comment>> Post(Comment comment)
        {
            await _commentsService.Post(comment);

            return Ok(comment);
        }

        [Authorize]
        [HttpPut("UpdateComment")]
        public async Task<ActionResult<Comment>> Put(Comment comment)
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);

            if (comment.User.Id.ToString() != userId)
            {
                return Forbid();
            }

            await _commentsService.Put(comment);

            return Ok(comment);
        }

        [Authorize]
        [HttpDelete("DeleteComment/{id}")]
        public async Task<ActionResult<Comment>> Delete(long id)
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            var comment = await _commentsService.Get(id);

            if (comment == null)
            {
                return NotFound();
            }

            if (comment.User.Id.ToString() != userId)
            {
                return Forbid();
            }

            await _commentsService.Delete(id);

            return Ok(comment);
        }
    }
}
