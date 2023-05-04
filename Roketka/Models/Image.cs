using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class Image
{
    public long Id { get; set; }

    public long ProductId { get; set; }

    public string Path { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Product Product { get; set; } = null!;
}
