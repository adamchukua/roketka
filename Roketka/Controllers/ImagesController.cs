using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roketka.Models;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace Roketka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IHostEnvironment _environment;
        private readonly RoketkaContext _context;

        public ImagesController(IHostEnvironment environment, RoketkaContext context)
        {
            _environment = environment;
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Upload")]
        public async Task<IActionResult> Upload([FromForm] List<IFormFile> files, [FromForm] int productId)
        {
            var images = new List<Image>();
            var directory = Directory.CreateDirectory("ClientApp/public/images/" + productId);

            foreach (var file in files)
            {
                var fileName = Path.GetFileName(file.FileName);
                var filePath = Path.Combine(directory.FullName, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var image = new Image
                {
                    Path = fileName,
                    ProductId = productId,
                };
                images.Add(image);
            }

            await _context.Images.AddRangeAsync(images);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
