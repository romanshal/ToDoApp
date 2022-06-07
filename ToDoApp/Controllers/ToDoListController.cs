using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Models;
using ToDoApp.Services;

namespace ToDoApp.Controllers
{
    public class ToDoListController : Controller
    {
        private readonly ITaskService _taskService;
        private readonly ITasksListService _tasksListService;

        public ToDoListController(ITaskService taskService, ITasksListService tasksListService)
        {
            this._taskService = taskService;
            this._tasksListService = tasksListService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetTodoList()
        {
            var result = new TodoListModel();
            result.Tasks = await _taskService.GetTasksAsync();
            result.Lists = await _tasksListService.GetTasksListsAsync();

            return View(result);
        }
    }
}
