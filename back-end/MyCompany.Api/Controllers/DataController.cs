using MyCompany.Api.Models;
using MyCompany.Api.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MyCompany.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly ApiConfig _options;

        public DataController(ApiConfig options)
        {
            _options = options;
        }

        [HttpGet]
        public DefaultResponse Get()
        {
            return new DefaultResponse()
            {
                Message = $"This is the answer from {_options.Name}"
            };
        }
    }
}