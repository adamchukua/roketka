using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Roketka.Models;

public partial class User
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    [EmailAddress]
    public string Email { get; set; } = null!;
    
    public string Password { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
    
    public byte IsAdmin { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
