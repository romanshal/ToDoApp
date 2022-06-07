using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public class TodoListModel
    {
        public IEnumerable<TaskBLL> Tasks { get; set; }
        public IEnumerable<TasksListBLL> Lists { get; set; }
    }
}
