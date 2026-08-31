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
app.MapGet("/person/{id}", async (int id, NotarycoreDbContext db) =>
{
    Person? person = await db.Persons.FindAsync(id);
    if (person != null){
        return Results.Ok(person);
    }
    return Results.NotFound();
});
app.MapGet("/persons", async (NotarycoreDbContext db) =>
{
    List<Person> persons = await db.Persons.ToListAsync();
    return Results.Ok(persons);
});
app.MapPost("/person", async (Person person, NotarycoreDbContext db) =>
{
    db.Persons.Add(person);
    int result = await db.SaveChangesAsync();
    return Results.Created($"/person/{person.Id}", person);
});
app.MapPut("/person/{id}", async (int id, Person updatePerson, NotarycoreDbContext db) =>
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
app.MapDelete("/person/{id}", async (int id, NotarycoreDbContext db) =>
{   
    Person? person = await db.Persons.FindAsync(id);
    if(person == null){
        return Results.NotFound();
    }
    db.Persons.Remove(person);
    await db.SaveChangesAsync();
    return Results.NoContent();
});