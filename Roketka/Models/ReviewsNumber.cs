using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class ReviewsNumber
{
    public string Title { get; set; } = null!;

    public DateTime? Date { get; set; }

    public int? ReviewsNumber1 { get; set; }
}
