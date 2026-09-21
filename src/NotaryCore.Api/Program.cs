using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<NotarycoreDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("NotaryCore"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("FrontendPolicy");

app.MapPersonEndPoints();
app.MapProtocolEndPoints();
app.MapActEndpoint();

app.Run();