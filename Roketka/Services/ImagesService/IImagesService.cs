using Microsoft.AspNetCore.Mvc;
using Roketka.Models;

namespace Roketka.Services.ImagesService
{
    public interface IImagesService
    {
        Task<Image> Get(long id);
        Task<IEnumerable<Image>> GetByProductId(long productId);
        Task<IEnumerable<Image>> Upload([FromForm] List<IFormFile> files, [FromForm] int productId);
        Task<Image> Delete(long id);
        string GetPath();
        void DeleteImages(long productId);
    }
}
