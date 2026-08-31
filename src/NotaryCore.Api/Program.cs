using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Domain.Enums;
using NotaryCore.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<NotarycoreDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("NotaryCore")
    );
});
var app = builder.Build();
app.MapGet("/db-test", async (NotarycoreDbContext db) =>
{
    bool conected = await db.Database.CanConnectAsync();

    if (conected)
        return Results.Ok("Conexão com o banco funcionando!");

    return Results.Problem("Não foi possível conectar ao banco.");
});









app.MapGet("/persons/{id}", async (int id, NotarycoreDbContext db) =>
{
    Person? person = await db.Persons.FindAsync(id);
    if (person == null){
        return Results.NotFound();
    }
    return Results.Ok(person);
});
app.MapGet("/persons", async (NotarycoreDbContext db) =>
{
    List<Person> persons = await db.Persons.ToListAsync();
    return Results.Ok(persons);
});
app.MapPost("/persons", async (Person person, NotarycoreDbContext db) =>
{
    db.Persons.Add(person);
    await db.SaveChangesAsync();
    return Results.Created($"/persons/{person.Id}", person);
});
app.MapPut("/persons/{id}", async (int id, Person updatePerson, NotarycoreDbContext db) =>
{
    Person? person = await db.Persons.FindAsync(id);
    if (person == null)
    {
        return Results.NotFound();
    }
    person.Name = updatePerson.Name;
    person.Cpf = updatePerson.Cpf;
    await db.SaveChangesAsync();
    return Results.Ok(person);
});
app.MapDelete("/persons/{id}", async (int id, NotarycoreDbContext db) =>
{   
    Person? person = await db.Persons.FindAsync(id);
    if(person == null){
        return Results.NotFound();
    }
    db.Persons.Remove(person);
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapGet("/protocols/{id}", async (int id, NotarycoreDbContext db) =>
{
    Protocol? protocol = await db.Protocols.FindAsync(id);
    if(protocol == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(protocol);
});
app.MapGet("/protocols", async (NotarycoreDbContext db) =>
{
    List<Protocol> protocols = await db.Protocols.ToListAsync();
    return Results.Ok(protocols);
});
app.MapPost("/protocols", async (Protocol protocol, NotarycoreDbContext db) =>
{
    db.Protocols.Add(protocol);
    await db.SaveChangesAsync();
    return Results.Created($"/protocols/{protocol.Id}", protocol);
});
app.MapPut("/protocols/{id}", async (int id, Protocol updateProtocol, NotarycoreDbContext db) =>
{
    Protocol? protocol = await db.Protocols.FindAsync(id);
    if(protocol == null)
    {
        return Results.NotFound();
    } 
    protocol.OpeningDate = updateProtocol.OpeningDate;
    protocol.Status = updateProtocol.Status;
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/protocols/{id}", async (int id, NotarycoreDbContext db) =>
{
   Protocol? protocol = await db.Protocols.FindAsync(id);
   if(protocol == null)
    {
        return Results.NotFound();
    }
    db.Protocols.Remove(protocol);
    await db.SaveChangesAsync();
    return Results.NoContent();

});