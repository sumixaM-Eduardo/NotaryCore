using Microsoft.EntityFrameworkCore;
using NotaryCore.Api.Data;
using NotaryCore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<NotarycoreDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("NotaryCore")
    );
});
var app = builder.Build();

app.MapPersonEndPoints();
app.MapProtocolEndPoints();
app.MapActEndpoint();

app.Run();