using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;
using ToDoApp.Models;

namespace ToDoApp.Mappings
{
    public class TodoListProfile : Profile
    {
        public TodoListProfile()
        {
            CreateMap<TaskDb, TaskBLL>()
                .ReverseMap();
            CreateMap<TasksListDb, TasksListBLL>()
                .ReverseMap();
        }
    }
}
