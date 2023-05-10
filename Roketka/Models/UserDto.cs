using System.ComponentModel.DataAnnotations;

namespace Roketka.Models
{
    public class UserDto
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public byte IsAdmin { get; set; }

        public string Token { get; set; }
    }
}
