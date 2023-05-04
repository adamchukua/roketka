using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class ReviewNumber
{
    public string Title { get; set; } = null!;

    public int? ReviewsNumber { get; set; }
}
