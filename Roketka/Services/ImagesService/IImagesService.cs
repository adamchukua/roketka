using Roketka.Models;

namespace Roketka.Services.ImagesService
{
    public interface IImagesService
    {
        Task Upload(IFormFile file);
    }
}
