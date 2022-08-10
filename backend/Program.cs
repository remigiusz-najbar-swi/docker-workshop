using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.UseCors();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/test", () => Results.Ok());
app.MapGet("/articles", async (ApplicationDbContext db) => await db.Articles.ToListAsync());
app.MapPost("/article", async (ApplicationDbContext db, Article article) =>
{
    article.DateCreated = DateTime.Now;
    await db.Articles.AddAsync(article);
    await db.SaveChangesAsync();
    return Results.Ok();
});
app.Run();

internal class Article
{
    [Key]
    public int Id { get; set; }
    public DateTime DateCreated { get; set; }
    [Required]
    public string Title { get; set; } = "";
    [Required]
    public string Text { get; set; } = "";
}

internal class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) {
        Database.EnsureCreated();
    }

    public DbSet<Article> Articles { get; set; }
}