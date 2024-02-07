namespace alphaEnterprises.API.Models.DTO
{
  public class PptProjectDto
  {
        public Guid Id { get; set; }

        public string? ProjectName { get; set; }

        public string Email { get; set; }

        public string ContactNumber { get; set; }

        public string City { get; set; }

        public string Heading { get; set; }

        public string Type { get; set; }

        public string Width { get; set; }

        public string Height { get; set; }

        public required string Image { get; set; }
  }
}
