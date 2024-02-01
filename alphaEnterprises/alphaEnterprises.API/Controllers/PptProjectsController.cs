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

        // GET All Projects
        // GET: https://localhost:7234/api/pptProjects
        [HttpGet]
        public async Task<IActionResult>  GetAll()
        {
            // Get Data from Database - Domain Modal
            var pptProjectsDomain = await pptProjectsRepository.GetAllAsync();
      
             // Map Domain Modal to Dto
             // Retrun DTO back to client
             return Ok(mapper.Map<List<PptProjectDto>>(pptProjectsDomain));
        
        }


        //GET Single Project (Get Project By Id)
        //GET: https://localhost:7234/api/pptProjects/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Get Data from Database - Domain Modal
            var pptProjectDomain = await pptProjectsRepository.GetByIdAsync(id);

            if (pptProjectDomain == null)
            {
                return NotFound();
            }

            // Map Domain Modal to DTOS
          
            // Retrun DTO back to client
            return Ok(mapper.Map<PptProjectDto>(pptProjectDomain));
        }

        // POST : https://localhost:7234/api/pptProjects 
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddProjectRequestDto addProjectRequestDto)
        {
              // Map DTO to Domain Modal
              var pptProjectDomainModal = mapper.Map<PptProject>(addProjectRequestDto);
              //var pptProjectDomainModal = new PptProject
              //{
              //  ProjectName = addProjectRequestDto.ProjectName,
              //  Email = addProjectRequestDto.Email,
              //  City = addProjectRequestDto.City,
              //  ContactNumber = addProjectRequestDto.ContactNumber,
              //  Heading = addProjectRequestDto.Heading,
              //  Width = addProjectRequestDto.Width,
              //  Height  = addProjectRequestDto.Height,
              //  Type = addProjectRequestDto.Type,
              //  Image = addProjectRequestDto.Image,
              //};


        // Use Domain Modal to Create Region
        pptProjectDomainModal = await pptProjectsRepository.CreateAsync(pptProjectDomainModal);


        // Map Domain Modal back to DTO
        var pptProjectDto = mapper.Map<PptProjectDto>(pptProjectDomainModal);

            //var pptProjectDto = new PptProjectDto
            //{
            //  Id = pptProjectDomainModal.Id,
            //  ProjectName = addProjectRequestDto.ProjectName,
            //  Email = addProjectRequestDto.Email,
            //  City = addProjectRequestDto.City,
            //  ContactNumber = addProjectRequestDto.ContactNumber,
            //  Heading = addProjectRequestDto.Heading,
            //  Width = addProjectRequestDto.Width,
            //  Height = addProjectRequestDto.Height,
            //  Type = addProjectRequestDto.Type,
            //  Image = addProjectRequestDto.Image,


            //};
            //return CreatedAtAction(nameof(GetById), new { id = pptProjectDto.Id }, pptProjectDto);

            return Ok(pptProjectDto);

        }


    // Delete Project
    //Delete:https://localhost:7234/api/pptProjects/{id}
    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var pptProjectDomainModal = await pptProjectsRepository.DeleteAsync(id);
      //var pptProjectDomainModal = dbContext.PptProjects.FirstOrDefault(x => x.Id == id);

      if (pptProjectDomainModal == null)
      {
        return NotFound();
      }
      //dbContext.PptProjects.Remove(pptProjectDomainModal);
      //dbContext.SaveChanges();

      return Ok(mapper.Map<PptProjectDto>(pptProjectDomainModal));
    }
  }
}

