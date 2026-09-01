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
}