using Microsoft.EntityFrameworkCore;
using alphaEnterprises.API.Data;
using alphaEnterprises.API.Repositories;
using Microsoft.Extensions.DependencyInjection;
using alphaEnterprises.API.Mappings;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuring Db
builder.Services.AddDbContext<AlphaDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("alphaConnectionString")));

builder.Services.AddScoped<IPptProjectsRepository, SQLPptProjectsRepository>();
builder.Services.AddScoped<IImageRepository, LocalImageRepository>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

//Returns an instance of Webapplication
var app = builder.Build();
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors();
// Default Policy

app.UseCors(builder =>
{
  builder
  .AllowAnyOrigin()
  .AllowAnyMethod()
  .AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
