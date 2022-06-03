using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;

namespace ToDoApp.Repositories
{
    public interface ITodoListRepository
    {
        Task<IEnumerable<TaskDb>> GetTasksAsync();
    }
}
