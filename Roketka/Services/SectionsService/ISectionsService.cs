using Roketka.Models;

namespace Roketka.Services.SectionsService
{
    public interface ISectionsService
    {
        Task<IEnumerable<Section>> Get();
        Task<Section> Get(long id);
        Task<Section> Post(Section section);
        Task<Section> Put(Section section);
        Task<Section> Delete(long id);
    }
}
