using Microsoft.EntityFrameworkCore;
using Roketka.Models;

namespace Roketka.Services.CommentsService
{
    public class CommentsService : ICommentsService
    {
        private readonly RoketkaContext _context;

        public CommentsService(RoketkaContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetByProductId(long productId)
        { 
            return await _context.Comments
                .Include(c => c.User)
                .Where(c => c.ProductId == productId)
                .ToListAsync();
        }

        public async Task<Comment> Get(long id)
        {
            return await _context.Comments
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment> Delete(long id)
        {
            var comment = await Get(id);

            if (comment == null)
            {
                return null;
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment> Post(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment> Put(Comment comment)
        {
            var oldComment = await Get(comment.Id);

            oldComment.Text = comment.Text;
            oldComment.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return oldComment;
        }
    }
}
