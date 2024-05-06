using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Workers.API.Models;
using Workers.Core.DTOs;
using Workers.Core.Entities;
using Workers.Core.Service;
using Workers.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Workers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;


        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;   

        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> Get()
        {
            return Ok(await _roleService.GetAllRoleAsync());
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> Get(int id)
        {
            return Ok(await _roleService.GetRoleByIdAsync(id));
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel role)
        {
            var r = _mapper.Map<Role>(role);
            var res = await _roleService.AddRoleAsync(r);
            //var resDto = _mapper.Map<ArticleDto>(res);
            return res != null ? Ok(role) : NotFound("this role already exist");
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel role)
        {
            var r = _mapper.Map<Role>(role);
            var res = await _roleService.UpdateRoleAsync(id, r);
            // var resDto = _mapper.Map<ArticleDto>(res);
            return res != null ? Ok(res) : NotFound(res);

        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _roleService.DeleteRoleAsync(id);
        }
    }
}
