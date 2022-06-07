using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;
using ToDoApp.Models;

namespace ToDoApp.Mappings
{
    public class TaskProfile : Profile
    {
        public TaskProfile()
        {
            CreateMap<TaskDb, TaskBLL>()
                .ReverseMap();

            CreateMap<TaskBLL, TaskDb>()
                .ReverseMap();
        }
    }
}
