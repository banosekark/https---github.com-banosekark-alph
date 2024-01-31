using alphaEnterprises.API.Data;
using alphaEnterprises.API.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;


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
       

        public async Task<PptProject?> GetByIdAsync(Guid id)
        {
            return await dbContext.PptProjects.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<PptProject> CreateAsync(PptProject pptProject)
        {
            await dbContext.AddAsync(pptProject);
            await dbContext.SaveChangesAsync();
            return pptProject;
              
        }
  }
}
