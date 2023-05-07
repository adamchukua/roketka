using Microsoft.EntityFrameworkCore;
using Roketka.Models;

namespace Roketka.Services.SectionsService
{
    public class SectionService : ISectionsService
    {
        private readonly RoketkaContext _context;

        public SectionService(RoketkaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Section>> Get()
        {
            return await Task.FromResult(_context.Sections.ToList());
        }

        public async Task<Section> Get(long id)
        {
            return await _context.Sections.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Section> Post(Section section)
        {
            await _context.Sections.AddAsync(section);
            await _context.SaveChangesAsync();

            return section;
        }

        public async Task<Section> Put(Section section)
        {
            var oldSection = await Get(section.Id);

            oldSection.SubsectionId = section.SubsectionId;
            oldSection.Title = section.Title;

            await _context.SaveChangesAsync();

            return section;
        }

        public async Task<Section> Delete(long id)
        {
            var section = await Get(id);

            if (section == null)
            {
                return null;
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return section;
        }
    }
}
