using alphaEnterprises.API.Data;
using alphaEnterprises.API.Models.Domain;
using alphaEnterprises.API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace alphaEnterprises.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RegionController : ControllerBase
  {
    private readonly AlphaDbContext dbContext;

    public RegionController(AlphaDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    //GET All Region

    [HttpGet]
    public IActionResult GetAll() {

      var regions = dbContext.Regions.ToList();

      // Map Domain model to DTO

      var regionDto = new List<RegionDto>();
      foreach (var region in regions)
      {
        regionDto.Add(new RegionDto()
        {
          Id = region.Id,
          Code = region.Code,
          Name = region.Name,
          RegionImageUrl = region.RegionImageUrl,
        });
      }
      
      return Ok(regionDto);

     }

    //GET Single Region (Get Region By Id)
    [HttpGet]
    [Route ("{id:Guid}")]
    public IActionResult GetById(Guid id)
    {
    //  var region = dbContext.Regions.Find(id);
    var region = dbContext.Regions.FirstOrDefault(r => r.Id == id);

      
      if(region == null)
      {
        return NotFound();
      }

      //Map Domain model to DTO

      var regionDto = new RegionDto
      {
        Id = region.Id,
        Code = region.Code,
        Name = region.Name,
        RegionImageUrl = region.RegionImageUrl,
      };

      return Ok(regionDto);
      
    }

    //POST To Create Region
    [HttpPost]
    public IActionResult Create([FromBody] AddRegionRequestDto addRegionRequestDto)
    {

      // Map to convert DTO to Domain Model

      var regionDomainModle = new Region
      {
        Code = addRegionRequestDto.Code,
        Name = addRegionRequestDto.Name,
        RegionImageUrl = addRegionRequestDto.RegionImageUrl
      };

      // Use Domain model to create Region

      dbContext.Regions.Add(regionDomainModle);
      dbContext.SaveChanges();

      //Map Domain model back to DTO
      var regionDto = new RegionDto
      {
        Id = regionDomainModle.Id,
        Code = regionDomainModle.Code,
        Name = regionDomainModle.Name,
        RegionImageUrl = regionDomainModle.RegionImageUrl
      };
      return CreatedAtAction(nameof(GetById), new { id = regionDto.Id }, regionDto);
    }

    // Update Region
    [HttpPut]
    [Route("{id:Guid}")]

    public  IActionResult Update([FromRoute] Guid id, [FromBody] UpdateRegionRequest updateRegionRequest)
    {
      // First if Region exsist
      var regionDomainModel = dbContext.Regions.FirstOrDefault(x => x.Id == id);
      if (regionDomainModel == null)
      {
        return NotFound();
      }

        //Map DTO to Domain Modle

        regionDomainModel.Code = updateRegionRequest.Code;
        regionDomainModel.Name = updateRegionRequest.Name;
        regionDomainModel.RegionImageUrl = updateRegionRequest.RegionImageUrl;

       
        dbContext.SaveChanges();

        //Convert Domain Modle to Dto
        var regionDto = new Region
        {
          Id = regionDomainModel.Id,
          Code = regionDomainModel.Code,
          Name = regionDomainModel.Name,
          RegionImageUrl = regionDomainModel.RegionImageUrl
        };       
      
      return Ok(regionDto);
    }
  }
}
