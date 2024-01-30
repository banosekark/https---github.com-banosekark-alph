namespace alphaEnterprises.API.Models.DTO
{
  public class AddProjectRequestDto
  {
    public string ProjectName { get; set; }

    public string Email { get; set; }

    public string ContactNumber { get; set; }

    public string City { get; set; }

    public string Heading { get; set; }

    public string Type { get; set; }

    public Double Width { get; set; }

    public Double Height { get; set; }

    public required string Image { get; set; }
  }
}
