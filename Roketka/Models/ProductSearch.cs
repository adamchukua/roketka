namespace Roketka.Models
{
    public class ProductSearch
    {
        public long? Id { get; set; }

        public string? Title { get; set; } = null!;

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int? Quantity { get; set; }

        public long? SectionId { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
