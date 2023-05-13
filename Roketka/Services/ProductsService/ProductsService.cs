using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Roketka.Models;
using System.Linq;

namespace Roketka.Services.ProductsService
{
    public class ProductsService : IProductsService
    {
        private readonly RoketkaContext _context;
        private const string IMAGES_PATH = "ClientApp/public/images/";

        public ProductsService(RoketkaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> Get()
        {
            return await Task.FromResult(_context.Products
                .Include(p => p.Images)
                .Include(p => p.Section)
                .ToList());
        }

        public async Task<Product> Get(long id)
        {
            return await _context.Products
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
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

            DeleteFiles(id);

            return product;
        }

        public async Task<IEnumerable<int>> Delete(IEnumerable<int> productIds)
        {
            var products = await _context.Products
                .Where(p => productIds.Contains((int)p.Id))
                .ToListAsync();

            if (products == null)
            {
                return null;
            }

            _context.Products.RemoveRange(products);
            await _context.SaveChangesAsync();

            foreach (var id in productIds)
            {
                DeleteFiles(id);
            }

            return productIds;
        }

        private void DeleteFiles(long productId)
        {
            var path = IMAGES_PATH + productId;
            var files = Directory.GetFiles(path, "*", SearchOption.AllDirectories);
            foreach (string file in files)
            {
                File.Delete(file);
            }
            Directory.Delete(path);
        }
    }
}
