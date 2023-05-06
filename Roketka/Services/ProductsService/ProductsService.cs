using Microsoft.EntityFrameworkCore;
using Roketka.Models;

namespace Roketka.Services.ProductsService
{
    public class ProductsService : IProductsService
    {
        private readonly RoketkaContext _context;

        public ProductsService(RoketkaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> Get()
        {
            return await Task.FromResult(_context.Products.ToList());
        }

        public async Task<Product> Get(long id)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> Post(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product> Put(Product product)
        {
            var oldProduct = await Get(product.Id);

            oldProduct.Title = product.Title;
            oldProduct.Description = product.Description;
            oldProduct.Price = product.Price;
            oldProduct.Quantity = product.Quantity;
            oldProduct.SectionId = product.SectionId;
            //oldProduct.Section = product.Section;
            oldProduct.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product> Delete(long id)
        {
            var product = await Get(id);

            if (product == null)
            {
                return null;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
