using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Domain.Entities;

namespace NotaryCore.Api.Endpoints;

public static class PersonEndPoints
{
    public static void MapPersonEndPoints( this WebApplication app)
    {
        var personsGroup = app.MapGroup("/persons");


        personsGroup.MapGet("/{id}", async (int id, NotarycoreDbContext db) =>
        {
            Person? person = await db.Persons.FindAsync(id);
            if (person == null){
                return Results.NotFound();
            }
            return Results.Ok(person);
        });
        personsGroup.MapGet("/", async (NotarycoreDbContext db) =>
        {
            List<Person> personslist = await db.Persons.ToListAsync();
            return Results.Ok(personslist);
        });
        personsGroup.MapPost("/", async (Person person, NotarycoreDbContext db) =>
        {
            db.Persons.Add(person);
            await db.SaveChangesAsync();
            return Results.Created($"/persons/{person.Id}", person);
        });
        personsGroup.MapPut("/{id}", async (int id, Person updatePerson, NotarycoreDbContext db) =>
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
        personsGroup.MapDelete("/{id}", async (int id, NotarycoreDbContext db) =>
        {   
            Person? person = await db.Persons.FindAsync(id);
            if(person == null)
            {
                return Results.NotFound();
            }
            db.Persons.Remove(person);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}