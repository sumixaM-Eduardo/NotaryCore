using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Domain.Entities;

namespace NotaryCore.Api.Endpoints;

public static class PropertyEndpoints
{
    public static void MapPropertyEndpoints(this WebApplication app)
    {
        RouteGroupBuilder propertiesGroup = app.MapGroup("/properties");

        propertiesGroup.MapPost("/", async (
            Property property,
            NotarycoreDbContext db) =>
        {
            db.Properties.Add(property);
            await db.SaveChangesAsync();

            return Results.Created($"/properties/{property.Id}", property);
        });

        propertiesGroup.MapGet("/", async (NotarycoreDbContext db) =>
        {
            List<Property> properties = await db.Properties.ToListAsync();

            return Results.Ok(properties);
        });

        propertiesGroup.MapGet("/{id}", async (
            int id,
            NotarycoreDbContext db) =>
        {
            Property? property = await db.Properties.FindAsync(id);

            if (property == null)
            {
                return Results.NotFound("Property not found.");
            }

            return Results.Ok(property);
        });

        propertiesGroup.MapPut("/{id}", async (
            int id,
            Property updatedProperty,
            NotarycoreDbContext db) =>
        {
            Property? property = await db.Properties.FindAsync(id);

            if (property == null)
            {
                return Results.NotFound("Property not found.");
            }

            property.RegistrationNumber = updatedProperty.RegistrationNumber;
            property.Address = updatedProperty.Address;
            property.Area = updatedProperty.Area;
            property.MunicipalRegistration =
                updatedProperty.MunicipalRegistration;
            property.Description = updatedProperty.Description;

            await db.SaveChangesAsync();

            return Results.Ok(property);
        });

        propertiesGroup.MapDelete("/{id}", async (
            int id,
            NotarycoreDbContext db) =>
        {
            Property? property = await db.Properties.FindAsync(id);

            if (property == null)
            {
                return Results.NotFound("Property not found.");
            }

            db.Properties.Remove(property);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}