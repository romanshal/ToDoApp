using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Models;
using ToDoApp.Services;
using Newtonsoft.Json;

namespace ToDoApp.Controllers
{
    public class TaskController : Controller
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            this._taskService = taskService;
        }

        [HttpPost]
        [Route("createtask")]
        public async Task<IActionResult> CreateTaskAsync(TaskModel task)
        {
            var result = await _taskService.CreateTaskAsync(task);

            if (result != 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("gettask")]
        public async Task<IActionResult> GetTaskAsync(int id)
        {
            var result = await _taskService.GetTaskByIdAsync(id);

            if (result != null)
            {
                var json = JsonConvert.SerializeObject(result);
                return Ok(json);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updatetask")]
        public async Task<IActionResult> UpdateTaskAsync(TaskModel newTask)
        {
            var result = await _taskService.UpdateTaskAsync(newTask);

            if (result != 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("updatestatustask")]
        public async Task<IActionResult> UpdateTaskStatusAsync(int taskId, int status)
        {
            var result = await _taskService.UpdateTaskStatusAsync(taskId, status);

            if (result != 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("deletetask")]
        public async Task<IActionResult> DeleteTaskAsync(int taskId)
        {
            var result = await _taskService.DeleteTaskAsync(taskId);

            if (result != 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
