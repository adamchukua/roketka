using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class Seller
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
