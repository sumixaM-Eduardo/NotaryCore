using NotaryCore.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace NotaryCore.Api.Data;

public class NotarycoreDbContext : DbContext
{
    public NotarycoreDbContext(
        DbContextOptions<NotarycoreDbContext> options
    ): base(options)
    {
    }
    public DbSet<Person> Persons { get; set; } 
    public DbSet<Protocol> Protocols { get; set; }
    public DbSet<Act> Acts { get; set; }
    public DbSet<ActPart> ActParts { get; set; }
    public DbSet<Property> Properties { get; set; }
    public DbSet<ActProperty> ActProperties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<ActPart>()
        .HasOne(ap => ap.Act)
        .WithMany(a => a.ActParts)
        .HasForeignKey(ap => ap.ActId);

    modelBuilder.Entity<ActPart>()
        .HasOne(ap => ap.Person)
        .WithMany(p => p.ActParts)
        .HasForeignKey(ap => ap.PersonId);

    modelBuilder.Entity<Act>()
        .HasOne(a => a.Protocol)
        .WithMany(p => p.Acts)
        .HasForeignKey(a => a.ProtocolId);
    
    modelBuilder.Entity<ActProperty>()
        .HasOne(ap => ap.Act)
        .WithMany(a => a.ActProperties)
        .HasForeignKey(ap => ap.ActId);

    modelBuilder.Entity<ActProperty>()
        .HasOne(ap => ap.Property)
        .WithMany(p => p.ActProperties)
        .HasForeignKey(ap => ap.PropertyId);
}
}