using Roketka.Models;

namespace Roketka.Services.Auth
{
    public interface IAuth
    {
        Task<string> Login(UserDto userDto);
        Task<string> Registration(UserDto userDto);
    }
}
