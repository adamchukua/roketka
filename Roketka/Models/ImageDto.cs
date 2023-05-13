using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Roketka.Models;

public partial class ImageDto
{
    public long ProductId { get; set; }

    public string Path { get; set; } = null!;

    [NotMapped]
    public IFormFile File { get; set; }
}
