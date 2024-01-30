using alphaEnterprises.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace alphaEnterprises.API.Data
{
  public class AlphaDbContext: DbContext
  {
    public AlphaDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
    {
          
    }

    public DbSet<Difficulty>  Difficulties { get; set; }
    public DbSet<Region> Regions { get; set; }
    public DbSet<Walk> Walks { get; set; }

    public DbSet<PptProject> PptProjects { get; set; }
  }
}
