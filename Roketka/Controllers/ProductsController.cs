using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roketka.Models;
using Roketka.Services.ProductsService;

namespace Roketka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _productsService;

        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet("GetProducts")]
        public async Task<ActionResult> Get()
        {
            var products = await _productsService.Get();
            return Ok(products);
        }

        [HttpGet("GetProduct/{id}")]
        public async Task<ActionResult<Product>> Get(long id)
        {
            var product = await _productsService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("SearchProducts/{keyword}")]
        public async Task<ActionResult<IEnumerable<Product>>> Search(string keyword)
        {
            var products = await _productsService.Search(keyword);

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("AddProduct")]
        public async Task<ActionResult<Product>> Post([FromForm] Product product)
        {
            await _productsService.Post(product);

            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateProduct")]
        public async Task<ActionResult<Product>> Put([FromForm] Product product)
        {
            var updatedProduct = await _productsService.Put(product);

            return Ok(updatedProduct);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteProduct/{id}")]
        public async Task<ActionResult<Product>> Delete(long id)
        {
            var product = await _productsService.Delete(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteProducts")]
        public async Task<ActionResult<Product>> Delete(IEnumerable<int> products)
        {
            var deletedInts = await _productsService.Delete(products);

            if (deletedInts == null)
            {
                return BadRequest();
            }

            return Ok(deletedInts);
        }
    }
}