using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roketka.Models;
using Roketka.Services.ImagesService;
using static System.Net.Mime.MediaTypeNames;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using Image = Roketka.Models.Image;

namespace Roketka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesService _imagesService;

        public ImagesController(IImagesService imagesService)
        {
            _imagesService = imagesService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("Get/{id}")]
        public async Task<ActionResult<Image>> Get(long id)
        {
            var image = await _imagesService.Get(id);

            if (image == null)
            {
                return NotFound();
            }

            return Ok(image);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetImagesByProductId/{id}")]
        public async Task<ActionResult<Image>> GetImagesByProductId(long id)
        {
            var images = await _imagesService.GetByProductId(id);

            if (images == null)
            {
                return NotFound();
            }

            return Ok(images);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Upload")]
        public async Task<ActionResult<IEnumerable<Image>>> Upload
        (
            [FromForm] List<IFormFile> files, 
            [FromForm] int productId)
        {
            var images = await _imagesService.Upload(files, productId);

            return Ok(images);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<Image>> Delete(long id)
        {
            var image = await _imagesService.Delete(id);

            if (image == null)
            {
                return NotFound();
            }

            return Ok(image);
        }
    }
}
