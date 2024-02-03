using alphaEnterprises.API.Models.Domain;

namespace alphaEnterprises.API.Repositories
{
  public interface IImageRepository
  {
    Task<Image> Upload(Image image);
  }
}
