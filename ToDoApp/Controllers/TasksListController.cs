using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Models;
using ToDoApp.Services;

namespace ToDoApp.Controllers
{
    public class TasksListController : Controller
    {
        private readonly ITasksListService _tasksListService;

        public TasksListController(ITasksListService tasksListService)
        {
            this._tasksListService = tasksListService;
        }

        [HttpPost]
        [Route("createlist")]
        public async Task<IActionResult> CreateTasksListAsync(TasksListModel tasksList)
        {
            var result = await _tasksListService.CreateTasksListAsync(tasksList);

            if (result != 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("updatelist")]
        public async Task<IActionResult> UpdateTaskAsync(TasksListModel newtasksList)
        {
            var result = await _tasksListService.UpdateTasksListAsync(newtasksList);

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
        [Route("deletelist")]
        public async Task<IActionResult> DeleteTasksListAsync(int tasksListId)
        {
            var result = await _tasksListService.DeleteTasksListAsync(tasksListId);

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
