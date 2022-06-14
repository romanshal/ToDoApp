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
    public class TasksListService : ITasksListService
    {
        private ITasksListRepository _tasksListRepository;
        private IMapper _mapper;

        public TasksListService(ITasksListRepository tasksListRepository, IMapper mapper) {
            this._tasksListRepository = tasksListRepository;
            this._mapper = mapper;
        }

        public async Task<int> CreateTasksListAsync(TasksListModel tasksListDb)
        {
            return await _tasksListRepository.CreateTasksListAsync(_mapper.Map<TasksListDb>(tasksListDb)).ContinueWith(r => r.Result);
        }

        public async Task<IEnumerable<TasksListBLL>> GetTasksListsAsync()
        {
            return await _tasksListRepository.GetTasksListsAsync().ContinueWith(r => _mapper.Map<IEnumerable<TasksListBLL>>(r.Result));
        }

        public async Task<TasksListBLL> GetTasksListByIdAsync(int tasksListId)
        {
            return await _tasksListRepository.GetTasksListByIdAsync(tasksListId).ContinueWith(r => _mapper.Map<TasksListBLL>(r.Result));
        }

        public async Task<int> UpdateTasksListAsync(TasksListModel newTasksList)
        {
            return await _tasksListRepository.UpdateTasksListAsync(_mapper.Map<TasksListDb>(newTasksList)).ContinueWith(r => r.Result);
        }

        public async Task<int> DeleteTasksListAsync(int tasksListId)
        {
            return await _tasksListRepository.DeleteTasksListAsync(tasksListId).ContinueWith(r => r.Result);
        }
    }
}
