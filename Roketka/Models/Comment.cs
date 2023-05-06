using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class Comment
{
    public long Id { get; set; }

    public long ProductId { get; set; }

    public long UserId { get; set; }

    public string Text { get; set; } = null!;

    public DateTime UpdatedAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual Product? Product { get; set; } = null!;

    public virtual User? User { get; set; } = null!;
}
