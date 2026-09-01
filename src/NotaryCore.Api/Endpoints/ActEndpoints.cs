using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Domain.Entities;

namespace NotaryCore.Api.Endpoints;

public static class ActEndpoint
{
    public static void MapActEndpoint(this WebApplication app)
    {
        var actGroup = app.MapGroup("/acts");

        actGroup.MapGet("/{id}", async (int id, NotarycoreDbContext db) =>
        {
            Act? act = await db.Acts.FindAsync(id);
            if(act == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(act);
        });
        actGroup.MapGet("/", async (NotarycoreDbContext db) =>
        {
           List<Act> actslist = await db.Acts.ToListAsync();  
           return Results.Ok(actslist);
        });
        actGroup.MapPost("/", async (Act act, NotarycoreDbContext db) =>
        {
            db.Acts.Add(act);
            await db.SaveChangesAsync();
            return Results.Created($"/acts/{act.Id}", act);
        });
        actGroup.MapPut("/{id}", async (int id, Act actUpdate, NotarycoreDbContext db) =>
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
        actGroup.MapDelete("/{id}", async (int id, NotarycoreDbContext db) =>
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
    }
}