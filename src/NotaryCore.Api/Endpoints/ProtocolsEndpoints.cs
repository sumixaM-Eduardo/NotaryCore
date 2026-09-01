using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Domain.Entities;

namespace NotaryCore.Api.Endpoints;

public static class ProtocolEndPoints
{
    public static void MapProtocolEndPoints(this WebApplication app)
    {
        var protocolsGroup = app.MapGroup("/protocols");


        protocolsGroup.MapGet("/{id}", async (int id, NotarycoreDbContext db) =>
        {
            Protocol? protocol = await db.Protocols.FindAsync(id);
            if(protocol == null)
            {
                return Results.NotFound();
            }
            return Results.Ok(protocol);
        });
        protocolsGroup.MapGet("/", async (NotarycoreDbContext db) =>
        {
            List<Protocol> protocols = await db.Protocols.ToListAsync();
            return Results.Ok(protocols);
        });
        protocolsGroup.MapPost("/", async (Protocol protocol, NotarycoreDbContext db) =>
        {
            db.Protocols.Add(protocol);
            await db.SaveChangesAsync();
            return Results.Created($"/protocols/{protocol.Id}", protocol);
        });
        protocolsGroup.MapPut("/{id}", async (int id, Protocol updateProtocol, NotarycoreDbContext db) =>
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
        protocolsGroup.MapDelete("/{id}", async (int id, NotarycoreDbContext db) =>
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
    }
}