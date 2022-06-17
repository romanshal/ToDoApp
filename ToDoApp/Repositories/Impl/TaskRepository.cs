using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Context;
using ToDoApp.Entities;

namespace ToDoApp.Repositories.Impl
{
    public class TaskRepository : ITaskRepository
    {
        private readonly DatabaseContext _databaseContext;

        public TaskRepository(DatabaseContext databaseContext)
        {
            this._databaseContext = databaseContext;
        }

        public async Task<int> CreateTaskAsync(TaskDb task)
        {
            _databaseContext.Tasks.Add(task);
            var countChanges = await _databaseContext.SaveChangesAsync().ConfigureAwait(false);

            return countChanges;
        }

        public async Task<IEnumerable<TaskDb>> GetTasksAsync()
        {
            return await _databaseContext.Tasks.OrderBy(task => task.TaskDate).ToListAsync();
        }

        public async Task<TaskDb> GetTaskByIdAsync(int taskId)
        {
            return await _databaseContext.Tasks.Where(task => task.Id == taskId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateTaskAsync(TaskDb newTask)
        {
            var oldTask = await _databaseContext.Tasks.Where(task => task.Id == newTask.Id).FirstOrDefaultAsync();

            if(oldTask != null)
            {
                oldTask.Description = newTask.Description;
                oldTask.Topic = newTask.Topic;

                _databaseContext.Entry(oldTask).State = EntityState.Modified;
                var countChanges = await _databaseContext.SaveChangesAsync().ConfigureAwait(false);

                return countChanges;
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> UpdateTaskStatusAsync(int taskId, int status)
        {
            var task = await _databaseContext.Tasks.Where(task => task.Id == taskId).FirstOrDefaultAsync();

            if (task != null)
            {
                task.Status = status;

                _databaseContext.Entry(task).State = EntityState.Modified;
                var countChanges = await _databaseContext.SaveChangesAsync().ConfigureAwait(false);

                return countChanges;
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> DeleteTaskAsync(int taskId)
        {
            var task = await _databaseContext.Tasks.Where(task => task.Id == taskId).FirstOrDefaultAsync();

            if (task != null)
            {
                _databaseContext.Remove(task);
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
