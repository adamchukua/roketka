using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Roketka.Models;

public partial class RoketkaContext : DbContext
{
    public RoketkaContext()
    {
    }

    public RoketkaContext(DbContextOptions<RoketkaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Characteristic> Characteristics { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<ReviewNumber> ReviewNumbers { get; set; }

    public virtual DbSet<ReviewsNumber> ReviewsNumbers { get; set; }

    public virtual DbSet<Section> Sections { get; set; }

    public virtual DbSet<Seller> Sellers { get; set; }

    public virtual DbSet<TopGood> TopGoods { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local); DataBase=roketka;Integrated Security=true;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.UseCollation("Cyrillic_General_CI_AS");

        modelBuilder.Entity<Characteristic>(entity =>
        {
            entity.ToTable("characteristics");

            entity.HasIndex(e => new { e.ProductId, e.Title }, "IX_title_and_good_unique").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.Value)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("value");

            entity.HasOne(d => d.Product).WithMany(p => p.Characteristics)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_characteristics_goods");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.ToTable("images");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Path)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("path");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Product).WithMany(p => p.Images)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_images_goods");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_goods");

            entity.ToTable("products", tb => tb.HasTrigger("createdDateCheck"));

            entity.HasIndex(e => e.Title, "IX_goods").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(2500)
                .HasColumnName("description");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.SectionId).HasColumnName("section_id");
            entity.Property(e => e.SellerId)
                .HasDefaultValueSql("((1))")
                .HasColumnName("seller_id");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Section).WithMany(p => p.Products)
                .HasForeignKey(d => d.SectionId)
                .HasConstraintName("FK_goods_sections");

            entity.HasOne(d => d.Seller).WithMany(p => p.Products)
                .HasForeignKey(d => d.SellerId)
                .HasConstraintName("FK_goods_sellers");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.ToTable("reviews");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("date")
                .HasColumnName("created_at");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Text)
                .HasMaxLength(1000)
                .IsUnicode(false)
                .HasColumnName("text");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Product).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK_reviews_goods");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_reviews_users");
        });

        modelBuilder.Entity<ReviewNumber>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Review Number");

            entity.Property(e => e.ReviewsNumber).HasColumnName("reviews_number");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<ReviewsNumber>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("Reviews Number");

            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.ReviewsNumber1).HasColumnName("reviews_number");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<Section>(entity =>
        {
            entity.ToTable("sections");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.SubsectionId).HasColumnName("subsection_id");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<Seller>(entity =>
        {
            entity.ToTable("sellers");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<TopGood>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("top_goods");

            entity.Property(e => e.Number).HasColumnName("number");
            entity.Property(e => e.Price)
                .HasColumnType("money")
                .HasColumnName("price");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("title");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3213E83F948582F1");

            entity.ToTable("users", tb => tb.HasTrigger("setUnverifiedEmail"));

            entity.HasIndex(e => e.Email, "users_email_unique").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.EmailVerifiedAt)
                .HasColumnType("datetime")
                .HasColumnName("email_verified_at");
            entity.Property(e => e.IsAdmin).HasColumnName("is_admin");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.RememberToken)
                .HasMaxLength(100)
                .HasColumnName("remember_token");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
