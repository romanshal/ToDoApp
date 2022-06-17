using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;
using ToDoApp.Models;
using ToDoApp.Repositories;

namespace ToDoApp.Services.Impl
{
    public class TaskService : ITaskService
    {
        private ITaskRepository _taskRepository;
        private IMapper _mapper;

        public TaskService(ITaskRepository taskRepository, IMapper mapper)
        {
            this._taskRepository = taskRepository;
            this._mapper = mapper;
        }

        public async Task<int> CreateTaskAsync(TaskModel task)
        {
            return await _taskRepository.CreateTaskAsync(_mapper.Map<TaskDb>(task)).ContinueWith(r => r.Result);
        }

        public async Task<IEnumerable<TaskBLL>> GetTasksAsync()
        {
            return await _taskRepository.GetTasksAsync().ContinueWith(r => _mapper.Map<IEnumerable<TaskBLL>>(r.Result));
        }

        public async Task<TaskBLL> GetTaskByIdAsync(int taskId)
        {
            return await _taskRepository.GetTaskByIdAsync(taskId).ContinueWith(r => _mapper.Map<TaskBLL>(r.Result));
        }

        public async Task<int> UpdateTaskAsync(TaskModel newTask)
        {
            return await _taskRepository.UpdateTaskAsync(_mapper.Map<TaskDb>(newTask)).ContinueWith(r => r.Result);
        }

        public async Task<int> UpdateTaskStatusAsync(int taskId, int status)
        {
            return await _taskRepository.UpdateTaskStatusAsync(taskId, status).ContinueWith(r => r.Result);
        }

        public async Task<int> DeleteTaskAsync(int taskId)
        {
            return await _taskRepository.DeleteTaskAsync(taskId).ContinueWith(r => r.Result);
        }
    }
}
