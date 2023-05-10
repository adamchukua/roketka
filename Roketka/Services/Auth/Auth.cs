using Microsoft.IdentityModel.Tokens;
using Roketka.Models;
using Roketka.Services.PasswordHasher;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Roketka.Services.Auth
{
    public class Auth : IAuth
    {
        private readonly IPasswordHasher _passwordHasher;
        private readonly RoketkaContext _context;
        private readonly IConfiguration _configuration;

        public Auth(IPasswordHasher passwordHasher, RoketkaContext context, IConfiguration configuration)
        {
            _passwordHasher = passwordHasher;
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> Login(UserDto userDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (user == null)
            {
                return null;
            }

            var userPass = user.Password;
            var userDtoPass = _passwordHasher.GeneratePasswordHash(userDto.Password);

            if (user.Password != _passwordHasher.GeneratePasswordHash(userDto.Password))
            {
                return null;
            }

            var token = GenerateJwtToken(user);

            return token;
        }

        public async Task<string> Registration(UserDto userDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == userDto.Email))
            {
                return null;
            }

            userDto.Password = _passwordHasher.GeneratePasswordHash(userDto.Password);

            var user = new User()
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);

            return token;
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("JWTSecret").Value);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Id.ToString())
            };

            if (user.IsAdmin == 1)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

    }
}
