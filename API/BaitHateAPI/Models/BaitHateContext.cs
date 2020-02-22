using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BaitHateAPI.Models
{
    public partial class BaitHateContext : DbContext
    {
        public BaitHateContext()
        {
        }

        public BaitHateContext(DbContextOptions<BaitHateContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Models> Models { get; set; }
        public virtual DbSet<TrainingData> TrainingData { get; set; }
        public virtual DbSet<Vote> Votes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("models");

                entity.Property(e => e.Model)
                    .IsRequired()
                    .HasColumnName("model");
            });

            modelBuilder.Entity<TrainingData>(entity =>
            {
                entity.ToTable("trainingData");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsClickbait).HasColumnName("isClickbait");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .IsUnicode(false);

                //entity.HasKey("id");
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("votes");

                entity.Property(e => e.Bad).HasColumnName("bad");

                entity.Property(e => e.Good).HasColumnName("good");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .IsUnicode(false);

                entity.HasKey("id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
