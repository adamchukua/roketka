using Roketka.Models;

namespace Roketka.Services.ProductsService
{
    public interface IProductsService
    {
        Task<IEnumerable<Product>> Get();
        Task<Product> Get(long id);
        Task<IEnumerable<Product>> Search(string request);
        Task<Product> Post(Product product);
        Task<Product> Put(Product product);
        Task<Product> Delete(long id);
        Task<IEnumerable<int>> Delete(IEnumerable<int> products);
    }
}
