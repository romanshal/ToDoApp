using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Context;
using ToDoApp.Entities;

namespace ToDoApp.Repositories.Impl
{
    public class TodoListRepository : ITodoListRepository
    {
        private readonly DatabaseContext _databaseContext;

        public TodoListRepository(DatabaseContext databaseContext)
        {
            this._databaseContext = databaseContext;
        }

        public async Task<IEnumerable<TaskDb>> GetTasksAsync()
        {
            return await _databaseContext.Tasks.OrderBy(task => task.ChacngeDate).ToListAsync();
        }
    }
}
