using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
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

            CreateMap<TasksListModel, TasksListDb>()
                .ForMember(m => m.Icon, opt => opt.MapFrom(f => this.GetByteArray(f.Icon)));
        }

        private byte[] GetByteArray(IFormFile file)
        {
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);

                return ms.ToArray();
            }
        }
    }
}
