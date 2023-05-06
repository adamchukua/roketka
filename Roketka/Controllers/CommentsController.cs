using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roketka.Models;
using Roketka.Services.CommentsService;

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
            await _commentsService.Put(comment);

            return Ok(comment);
        }

        [Authorize]
        [HttpDelete("DeleteComment/{id}")]
        public async Task<ActionResult<Comment>> Delete(long id)
        {
            var comment = await _commentsService.Delete(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }
    }
}
