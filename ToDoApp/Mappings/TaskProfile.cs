using AutoMapper;
using System;
using System.Collections.Generic;
using System.Globalization;
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
                .ForMember(m => m.TaskDate, opt => opt.MapFrom(f => f.TaskDate != null ? f.TaskDate.ToString("yyyy-MM-dd") : null))
                .ForMember(m => m.ChangeDate, opt => opt.MapFrom(f => f.ChangeDate != null ? f.ChangeDate.ToString("yyyy-MM-dd") : null))
                .ForMember(m => m.Color, opt => opt.MapFrom(f => f.TasksList.Color));


            CreateMap<TaskBLL, TaskDb>()
                .ForMember(m => m.TaskDate, opt => opt.MapFrom(f => DateTime.Parse(f.TaskDate)))
                .ForMember(m => m.ChangeDate, opt => opt.MapFrom(f => DateTime.Parse(f.ChangeDate)));

            CreateMap<TaskModel, TaskDb>()
                .ForMember(m => m.TaskDate, opt => opt.MapFrom(f => DateTime.Parse(f.TaskDate)));
        }
    }
}
