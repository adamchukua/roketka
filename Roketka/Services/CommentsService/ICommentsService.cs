using Roketka.Models;

namespace Roketka.Services.CommentsService
{
    public interface ICommentsService
    {
        Task<Comment> Get(long id);
        Task<Comment> Post(Comment comment);
        Task<Comment> Put(Comment comment);
        Task<Comment> Delete(long id);
    }
}
