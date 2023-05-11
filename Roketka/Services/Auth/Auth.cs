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

        public async Task<UserDto> Login(UserCred userCred)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userCred.Email);

            if (user == null)
            {
                return null;
            }

            var userPass = user.Password;
            var userDtoPass = _passwordHasher.GeneratePasswordHash(userCred.Password);

            if (userPass != userDtoPass)
            {
                return null;
            }

            var token = GenerateJwtToken(user);

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                IsAdmin = user.IsAdmin,
                Token = token
            };
        }

        public async Task<UserDto> Registration(UserCred userCred)
        {
            if (await _context.Users.AnyAsync(u => u.Email == userCred.Email))
            {
                return null;
            }

            userCred.Password = _passwordHasher.GeneratePasswordHash(userCred.Password);

            var user = new User()
            {
                Name = userCred.Name,
                Email = userCred.Email,
                Password = userCred.Password,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                IsAdmin = user.IsAdmin,
                Token = token
            };
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
