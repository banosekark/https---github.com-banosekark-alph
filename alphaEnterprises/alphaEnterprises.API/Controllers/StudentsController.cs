using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace alphaEnterprises.API.Controllers
{
  //https://localhost:portNumber/api/students
  [Route("api/[controller]")]
  [ApiController]
  public class StudentsController : ControllerBase
  {
    [HttpGet]
    public IActionResult GetAllStudents()
    {
      string[] studentsName = new string[] { "John", "jane", "Mark", "Emily", "David" };
      return Ok(studentsName);
    }
  }
}
