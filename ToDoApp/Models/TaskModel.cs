using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        public string Topic { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public string TaskDate { get; set; }
    }
}
