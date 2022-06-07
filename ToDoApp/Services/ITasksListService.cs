using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Services
{
    public interface ITasksListService
    {
        Task<int> CreateTasksListAsync(TasksListBLL tasksListDb);
        Task<IEnumerable<TasksListBLL>> GetTasksListsAsync();
        Task<TasksListBLL> GetTasksListByIdAsync(int tasksListId);
        Task<int> UpdateTasksListAsync(TasksListBLL newTasksList);
        Task<int> DeleteTasksListAsync(int tasksListId);
    }
}
