using alphaEnterprises.API.Data;
using alphaEnterprises.API.Models.Domain;

namespace alphaEnterprises.API.Repositories
{
  public class LocalImageRepository : IImageRepository
  {
    private readonly IWebHostEnvironment webHostEnvironment;
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly AlphaDbContext dbContext;

    public LocalImageRepository(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, AlphaDbContext dbContext)
    {
      this.webHostEnvironment = webHostEnvironment;
      this.httpContextAccessor = httpContextAccessor;
      this.dbContext = dbContext;
    }


    public async Task<Image> Upload(Image image)
    {
      var localFilePath = Path.Combine(webHostEnvironment.ContentRootPath, "AImages", image.FileName);

      //Upload Image to Local Path
      using var stream = new FileStream(localFilePath, FileMode.Create);
      await image.File.CopyToAsync(stream);

      // https://localhost:1234/images/image.jpg

      var urlFilePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}{httpContextAccessor.HttpContext.Request.PathBase}/AImages/{image.FileName}{image.FileExtension}";

      image.FilePath = urlFilePath;

      //Add Images to the table
      await dbContext.AImages.AddAsync(image);
      await dbContext.SaveChangesAsync();
      return image;
    }
  }
}
