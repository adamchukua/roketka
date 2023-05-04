using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class TopGood
{
    public string Title { get; set; } = null!;

    public decimal Price { get; set; }

    public int? Number { get; set; }
}
