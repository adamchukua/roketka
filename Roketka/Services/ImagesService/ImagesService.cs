using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Roketka.Models;

namespace Roketka.Services.ImagesService
{
    public class ImagesService : IImagesService
    {
        private readonly RoketkaContext _context;

        public ImagesService(RoketkaContext context)
        {
            _context = context;
        }

        public async Task<Image> Get(long id)
        {
            var image = await _context.Images.FirstOrDefaultAsync(i => i.Id == id);

            return image ?? null;
        }

        public async Task<IEnumerable<Image>> GetByProductId(long productId)
        {
            var images = await _context.Images
                .Where(i => i.ProductId == productId)
                .ToListAsync();

            return images;
        }

        public async Task<IEnumerable<Image>> Upload([FromForm] List<IFormFile> files, [FromForm] int productId)
        {
            var images = new List<Image>();
            var directory = Directory.CreateDirectory(GetPath() + productId);

            foreach (var file in files)
            {
                var fileName = Path.GetFileName(file.FileName);
                var filePath = Path.Combine(directory.FullName, fileName);

                await using (var stream = new FileStream(filePath, FileMode.Create))
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

            return images;
        }

        public async Task<Image> Delete(long id)
        {
            var image = await _context.Images
                .Include(i => i.Product)
                .FirstOrDefaultAsync(i => i.Id == id);

            var path = GetPath() + image.Product.Id + "/" + image.Path;
            File.Delete(path);

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return image;
        }

        public string GetPath()
        {
            return "ClientApp/public/images/";
        }

        public void DeleteImages(long productId)
        {
            var path = GetPath() + productId;

            if (!Directory.Exists(path))
            {
                return;
            }
    
            var files = Directory.GetFiles(path, "*", SearchOption.AllDirectories);
            
            foreach (string file in files)
            {
                File.Delete(file);
            }

            Directory.Delete(path);
        }
    }
}
