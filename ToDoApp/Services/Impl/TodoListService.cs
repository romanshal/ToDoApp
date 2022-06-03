using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Models;
using ToDoApp.Repositories;

namespace ToDoApp.Services.Impl
{
    public class TodoListService : ITodoListService
    {
        private ITodoListRepository _todoListRepository;
        private IMapper _mapper;

        public TodoListService(ITodoListRepository todoListRepository, IMapper mapper)
        {
            this._todoListRepository = todoListRepository;
            this._mapper = mapper;
        }

        public async Task<IEnumerable<TaskBLL>> GetTasksAsync()
        {
            return await _todoListRepository.GetTasksAsync().ContinueWith(r => _mapper.Map<IEnumerable<TaskBLL>>(r.Result));
        }
    }
}
