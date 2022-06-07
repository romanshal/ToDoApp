using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Services
{
    public interface ITaskService
    {
        Task<int> CreateTaskAsync(TaskBLL task);
        Task<IEnumerable<TaskBLL>> GetTasksAsync();
        Task<TaskBLL> GetTaskByIdAsync(int taskId);
        Task<int> UpdateTaskAsync(TaskBLL newTask);
        Task<int> UpdateTaskStatusAsync(int taskId, int status);
        Task<int> DeleteTaskAsync(int taskId);
    }
}
