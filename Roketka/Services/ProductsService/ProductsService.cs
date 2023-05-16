using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Roketka.Models;
using System.Linq;
using Roketka.Services.ImagesService;
using Roketka.Services.SectionsService;

namespace Roketka.Services.ProductsService
{
    public class ProductsService : IProductsService
    {
        private readonly RoketkaContext _context;
        private readonly ISectionsService _sectionsService;
        private readonly IImagesService _imagesService;

        public ProductsService
        (
            RoketkaContext context, 
            ISectionsService sectionsService, 
            IImagesService imagesService)
        {
            _context = context;
            _sectionsService = sectionsService;
            _imagesService = imagesService;
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
                .Include(p => p.Section)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> Post(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            product.Section = await _sectionsService.Get(product.SectionId);

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
            oldProduct.Section = await _sectionsService.Get(oldProduct.SectionId);
            oldProduct.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return oldProduct;
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

            _imagesService.DeleteImages(id);

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
                _imagesService.DeleteImages(id);
            }

            return productIds;
        }
    }
}
