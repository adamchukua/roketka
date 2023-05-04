using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class User
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime? EmailVerifiedAt { get; set; }

    public string Password { get; set; } = null!;

    public string? RememberToken { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public byte IsAdmin { get; set; }

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
