using alphaEnterprises.API.Data;
using alphaEnterprises.API.Models.Domain;
using alphaEnterprises.API.Models.DTO;
using alphaEnterprises.API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Collections.Generic;

namespace alphaEnterprises.API.Controllers
{
  
    // https://localhost:7234/api/pptProjects

    [Route("api/[controller]")]
    [ApiController]
    public class PptProjectsController : ControllerBase
    {
      private readonly AlphaDbContext dbContext;
    private readonly IPptProjectsRepository pptProjectsRepository;
    private readonly IMapper mapper;

    public PptProjectsController(AlphaDbContext dbContext, IPptProjectsRepository pptProjectsRepository, IMapper mapper)
      {
        this.dbContext = dbContext;
      this.pptProjectsRepository = pptProjectsRepository;
      this.mapper = mapper;
    }

      // Get All Projects
      // https://localhost:7234/api/pptProjects
      [HttpGet]
      public async Task<IActionResult>  GetAll()
      {
             // Get Data from Database - Domain Modal
             var pptProjectsDomain = await pptProjectsRepository.GetAllAsync();
      
            // Map Domain Modal to Dto
             var pptProjectsDto = mapper.Map<List<PptProjectDto>>(pptProjectsDomain);
             // Retrun DTO back to client
             return Ok(pptProjectsDto);
        
      }


    //GET Single Project (Get Project By Id)
    // https://localhost:7234/api/pptProjects/{id}
    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
      // Get Data from Database - Domain Modal
      var pptProjectDomain = await pptProjectsRepository.GetByIdAsync();

          if (pptProjectDomain == null)
          {
              return NotFound();
          }

          // Map Domain Modal to DTOS
          
          // Retrun DTO back to client
          return Ok(mapper.Map<PptProjectDto>(pptProjectDomain));
    }

      // POST To Create New Project
      // https://localhost:7234/api/pptProjects
      [HttpPost]
      public async Task<IActionResult> Create([FromBody] AddProjectRequestDto addProjectRequestDto)
      {
      // Map DTO to Domain Modal
      var pptProjectDomainModal = mapper.Map<PptProject>(addProjectRequestDto);


      // Use Domain Modal to Create Region
          pptProjectDomainModal = await pptProjectsRepository.CreateAsync(pptProjectDomainModal);


      // Map Domain Modal back to DTO
      var pptProjectDto = mapper.Map<PptProjectDto>(pptProjectDomainModal);
          return CreatedAtAction(nameof(GetById), new { id = pptProjectDto.Id }, pptProjectDto);

      }
    }
  }

