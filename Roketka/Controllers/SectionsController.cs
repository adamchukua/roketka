using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roketka.Models;
using Roketka.Services.SectionsService;

namespace Roketka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ISectionsService _sectionsService;

        public SectionsController(ISectionsService sectionsService)
        {
            _sectionsService = sectionsService;
        }

        [HttpGet("GetSections")]
        public async Task<ActionResult<IEnumerable<Section>>> Get()
        {
            var sections = await _sectionsService.Get();

            return Ok(sections);
        }

        [HttpGet("GetSection/{id}")]
        public async Task<ActionResult<Section>> Get(long id)
        {
            var section = await _sectionsService.Get(id);

            if (section == null)
            {
                return NotFound();
            }

            return Ok(section);
        }

        [HttpPost("AddSection")]
        public async Task<ActionResult<Section>> Post(Section section)
        {
            await _sectionsService.Post(section);

            return Ok(section);
        }

        [HttpPut("UpdateSection")]
        public async Task<ActionResult<Section>> Put(Section section)
        {
            await _sectionsService.Put(section);

            return Ok(section);
        }

        [HttpDelete("DeleteSection/{id}")]
        public async Task<ActionResult<Section>> Delete(long id)
        {
            var section = await _sectionsService.Delete(id);

            if (section == null)
            {
                return NotFound();
            }

            return Ok(section);
        }
    }
}
