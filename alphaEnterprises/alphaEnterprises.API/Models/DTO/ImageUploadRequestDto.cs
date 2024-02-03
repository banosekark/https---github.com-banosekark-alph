using System.ComponentModel.DataAnnotations;

namespace alphaEnterprises.API.Models.DTO
{
  public class ImageUploadRequestDto
  {
    [Required]
    public IFormFile File { get; set; }
    public string FileName { get; set; }
  }
}
