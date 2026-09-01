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