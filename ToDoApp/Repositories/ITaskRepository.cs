using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;

namespace ToDoApp.Repositories
{
    public interface ITaskRepository
    {
        Task<int> CreateTaskAsync(TaskDb task);
        Task<IEnumerable<TaskDb>> GetTasksAsync();
        Task<TaskDb> GetTaskByIdAsync(int taskId);
        Task<int> UpdateTaskAsync(TaskDb newTask);
        Task<int> UpdateTaskStatusAsync(int taskId, int status);
        Task<int> DeleteTaskAsync(int taskId);
    }
}
