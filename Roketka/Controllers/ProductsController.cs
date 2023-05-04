using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roketka.Models;

namespace Roketka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly RoketkaContext _context;

        public ProductsController(RoketkaContext context)
        {
            _context = context;
        }

        [HttpGet("GetProducts")]
        public IActionResult Get()
        {
            List<Product> products = _context.Products.ToList();
            return Ok(products);
        }
    }
}
