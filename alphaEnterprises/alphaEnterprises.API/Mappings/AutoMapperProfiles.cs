using alphaEnterprises.API.Models.Domain;
using alphaEnterprises.API.Models.DTO;
using AutoMapper;

namespace alphaEnterprises.API.Mappings
{
  public class AutoMapperProfiles: Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<PptProject, PptProjectDto>().ReverseMap();
      CreateMap<AddProjectRequestDto, PptProject>().ReverseMap();
    }

    
  }
}
