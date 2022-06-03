using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Controllers
{
    public class ErrorController : Controller
    {
        [Route("error")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error(int code)
        {
            switch (code)
            {
                case 404:
                    return View("404");

                case 500:
                    return View("500");

                default:
                    return View("500");
            }
        }
    }
}
