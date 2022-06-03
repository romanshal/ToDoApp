using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Repositories;
using ToDoApp.Services;

namespace ToDoApp.Controllers
{
    public class ToDoListController : Controller
    {
        private readonly ITodoListService _todoListService;

        public ToDoListController(ITodoListService todoListService)
        {
            this._todoListService = todoListService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetTodoList()
        {
            var result = await _todoListService.GetTasksAsync();
            return View(result);
        }
    }
}
