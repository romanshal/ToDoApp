using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;
using ToDoApp.Models;

namespace ToDoApp.Mappings
{
    public class TasksListProfile : Profile
    {
        public TasksListProfile()
        {
            CreateMap<TasksListDb, TasksListBLL>()
                .ReverseMap();

            CreateMap<TasksListBLL, TasksListDb>()
                .ReverseMap();
        }
    }
}
