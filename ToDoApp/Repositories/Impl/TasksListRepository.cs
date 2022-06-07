using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Context;
using ToDoApp.Entities;

namespace ToDoApp.Repositories.Impl
{
    public class TasksListRepository : ITasksListRepository
    {
        private readonly DatabaseContext _databaseContext;

        public TasksListRepository(DatabaseContext databaseContext)
        {
            this._databaseContext = databaseContext;
        }

        public async Task<int> CreateTasksListAsync(TasksListDb tasksListDb)
        {
            _databaseContext.TasksList.Add(tasksListDb);
            var countChanges = await _databaseContext.SaveChangesAsync().ConfigureAwait(false);

            return countChanges;
        }

        public async Task<IEnumerable<TasksListDb>> GetTasksListsAsync()
        {
            return await _databaseContext.TasksList.OrderBy(task => task.Name).ToListAsync();
        }

        public async Task<TasksListDb> GetTasksListByIdAsync(int tasksListId)
        {
            return await _databaseContext.TasksList.Where(taskList => taskList.Id == tasksListId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateTasksListAsync(TasksListDb newTasksList)
        {
            var oldTasksList = await _databaseContext.TasksList.Where(tasksList => tasksList.Id == newTasksList.Id).FirstOrDefaultAsync();

            if (oldTasksList != null)
            {
                oldTasksList.Name = newTasksList.Name;
                oldTasksList.Description = newTasksList.Description;
                oldTasksList.Icon = newTasksList.Icon;

                _databaseContext.Entry(oldTasksList).State = EntityState.Modified;
                var countChanges = await _databaseContext.SaveChangesAsync().ConfigureAwait(false);

                return countChanges;
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> DeleteTasksListAsync(int tasksListId)
        {
            var tasksList = await _databaseContext.TasksList.Where(tasksList => tasksList.Id == tasksListId).FirstOrDefaultAsync();

            if (tasksList != null)
            {
                _databaseContext.Remove(tasksList);
                var countChanges = await _databaseContext.SaveChangesAsync().ConfigureAwait(false);

                return countChanges;
            }
            else
            {
                return 0;
            }
        }
    }
}
