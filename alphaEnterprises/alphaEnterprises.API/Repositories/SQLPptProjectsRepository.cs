using alphaEnterprises.API.Data;
using alphaEnterprises.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace alphaEnterprises.API.Repositories
{
  public class SQLPptProjectsRepository : IPptProjectsRepository
  {
    private readonly AlphaDbContext dbContext;

    public SQLPptProjectsRepository(AlphaDbContext dbContext)
    {
      this.dbContext = dbContext;
    }


    async Task<List<PptProject>> IPptProjectsRepository.GetAllAsync()
    {
      return await dbContext.PptProjects.ToListAsync();

    }

    async public Task<PptProject?> GetById(Guid id)
    {
      return await dbContext.PptProjects.FirstOrDefaultAsync(p => p.Id == id);
    }

    async public Task<PptProject> Create(PptProject pptProject)
    {
        await dbContext.PptProjects.AddAsync(pptProject);
        await dbContext.SaveChangesAsync();
        return pptProject;
    }

    public Task<PptProject?> GetByIdAsync()
    {
      throw new NotImplementedException();
    }

    public Task<PptProject> CreateAsync(PptProject pptProject)
    {
      throw new NotImplementedException();
    }
  }
}
