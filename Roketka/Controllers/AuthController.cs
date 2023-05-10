using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Roketka.Models;
using Roketka.Services.Auth;

namespace Roketka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuth _auth;

        public AuthController(IAuth auth)
        {
            _auth = auth;
        }

        [HttpPost("Registration")]
        public async Task<ActionResult<UserDto>> Register(UserCred userCred)
        {
            var userDto = await _auth.Registration(userCred);

            if (userDto == null)
            {
                return Unauthorized();
            }

            return Ok(userDto);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(UserCred userCred)
        {
            var userDto = await _auth.Login(userCred);

            if (userDto == null)
            {
                return Unauthorized("There is no users with these credits");
            }

            return Ok(userDto);
        }
    }
}
