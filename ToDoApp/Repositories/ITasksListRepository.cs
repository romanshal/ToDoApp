using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;

namespace ToDoApp.Repositories
{
    public interface ITasksListRepository
    {
        Task<int> CreateTasksListAsync(TasksListDb tasksListDb);
        Task<IEnumerable<TasksListDb>> GetTasksListsAsync();
        Task<TasksListDb> GetTasksListByIdAsync(int tasksListId);
        Task<int> UpdateTasksListAsync(TasksListDb newTasksList);
        Task<int> DeleteTasksListAsync(int tasksListId);
    }
}
