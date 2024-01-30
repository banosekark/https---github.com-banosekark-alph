using alphaEnterprises.API.Models.Domain;
using alphaEnterprises.API.Models.DTO;

namespace alphaEnterprises.API.Repositories
{
  public interface IPptProjectsRepository
  {
    Task<List<PptProject>> GetAllAsync();
    Task<PptProject?> GetByIdAsync();
    Task<PptProject>CreateAsync(PptProject pptProject);

  }
}
