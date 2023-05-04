using System;
using System.Collections.Generic;

namespace Roketka.Models;

public partial class Product
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public long SectionId { get; set; }

    public long SellerId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Characteristic> Characteristics { get; set; } = new List<Characteristic>();

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Section Section { get; set; } = null!;

    public virtual Seller Seller { get; set; } = null!;
}
