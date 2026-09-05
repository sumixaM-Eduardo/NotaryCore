using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Domain.Entities;

namespace NotaryCore.Api.Endpoints;

public static class ActEndpoint
{
    public static void MapActEndpoint(this WebApplication app)
    {
        var actsGroup = app.MapGroup("/acts");

        actsGroup.MapGet("/{id}", async (int id, NotarycoreDbContext db) =>
        {
            Act? act = await db.Acts.FindAsync(id);
            if(act == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(act);
        });
        actsGroup.MapGet("/", async (NotarycoreDbContext db) =>
        {
           List<Act> actslist = await db.Acts.ToListAsync();  
           return Results.Ok(actslist);
        });
        actsGroup.MapPost("/", async (Act act, NotarycoreDbContext db) =>
        {
            db.Acts.Add(act);
            await db.SaveChangesAsync();
            return Results.Created($"/acts/{act.Id}", act);
        });
        actsGroup.MapPut("/{id}", async (int id, Act actUpdate, NotarycoreDbContext db) =>
        {
            Act? acts = await db.Acts.FindAsync(id);
            if(acts == null)
            {
                return Results.NotFound();
            }
            acts.Type = actUpdate.Type;
            acts.OpeningDate = actUpdate.OpeningDate;
            acts.Value = actUpdate.Value;
            await db.SaveChangesAsync();
            return Results.Ok(acts);
        });
        actsGroup.MapDelete("/{id}", async (int id, NotarycoreDbContext db) =>
        {
            Act? act = await db.Acts.FindAsync(id);
            if(act == null)
            {
                return Results.NotFound();
            }
            db.Acts.Remove(act);
            await db.SaveChangesAsync();
            return Results.NoContent(); 
        });
        actsGroup.MapPost("/{id}/parts", async (int id, ActPart part, NotarycoreDbContext db) =>
        {
            Act? act = await db.Acts.FindAsync(id);
            if (act == null)
            {
                return Results.NotFound();
            }
            Person? person = await db.Persons.FindAsync(part.PersonId);
            if (person == null)
            {
                return Results.NotFound("Person not found");
            }
            part.ActId = id;
            db.ActParts.Add(part);
            await db.SaveChangesAsync();
            return Results.Created($"/acts/{id}/parts/{part.Id}", part);
        });
        actsGroup.MapGet("/{id}/parts", async (int id, NotarycoreDbContext db) =>
        {
           Act? act = await db.Acts.FindAsync(id);
           if (act == null)
           {
                return Results.NotFound();
           }
           List<ActPart> actParts = await db.ActParts.Where(ap => ap.ActId == id).ToListAsync();
           return Results.Ok(actParts);
        });
        actsGroup.MapGet("/{id}/parts/{partId}", async (int id, int partid, NotarycoreDbContext db) =>
        {
           Act? act = await db.Acts.FindAsync(id);
           if (act == null)
           {
                return Results.NotFound();
           }
           ActPart? actParts = await db.ActParts.FirstOrDefaultAsync(ap => ap.Id == partid && ap.ActId == id);
           if(actParts == null)
            {
                return Results.NotFound();
            }
           return Results.Ok(actParts);
        });
        actsGroup.MapDelete("/{id}/parts/{partId}", async (int id, int partid, NotarycoreDbContext db) =>
        {
            Act? act = await db.Acts.FindAsync(id);
            if (act == null)
            {
                return Results.NotFound();
            }
            ActPart? actpart = await db.ActParts.FirstOrDefaultAsync(ap => ap.Id == partid && ap.ActId == id);
            if(actpart == null)
            {
                return Results.NotFound();
            }
            db.ActParts.Remove(actpart);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
        actsGroup.MapPut("/{id}/parts/{partId}", async (int id, int partid, ActPart updatePart, NotarycoreDbContext db) =>
        {
            Act? act = await db.Acts.FindAsync(id);
            if(act == null)
            {
                return Results.NotFound();
            }
            ActPart? actpart = await db.ActParts.FirstOrDefaultAsync(ap => ap.Id == partid && ap.ActId == id);
            if(actpart == null)
            {
                return Results.NotFound();
            }
            Person? person = await db.Persons.FirstOrDefaultAsync(p => p.Id == updatePart.PersonId);
            if(person == null)
            {
                return Results.NotFound();
            }
            actpart.PersonId = updatePart.PersonId;
            actpart.Role = updatePart.Role;
            await db.SaveChangesAsync();
            return Results.Ok();
        });
    }
}