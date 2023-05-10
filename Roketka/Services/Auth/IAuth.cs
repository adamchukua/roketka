using Roketka.Models;

namespace Roketka.Services.Auth
{
    public interface IAuth
    {
        Task<UserDto> Login(UserCred userCred);
        Task<UserDto> Registration(UserCred userCred);
    }
}
