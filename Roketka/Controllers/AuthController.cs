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
        public async Task<ActionResult<string>> Register(UserDto userDto)
        {
            var userToken = await _auth.Registration(userDto);

            if (userToken == null)
            {
                return Unauthorized();
            }

            return Ok(userToken);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(UserDto userDto)
        {
            var userToken = await _auth.Login(userDto);

            if (userToken == null)
            {
                return Unauthorized("There is no users with these credits");
            }

            return Ok(userToken);
        }
    }
}
