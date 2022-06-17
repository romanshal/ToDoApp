using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Entities
{
    public class TaskDb
    {
        public int Id { get; set; }
        [ForeignKey("TasksList")]
        public int ListId { get; set; }
        public string Topic { get; set; }
        public string Description { get; set; }
        public DateTime ChacngeDate { get; set; }
        public int Status { get; set; }

        public virtual TasksListDb TasksList { get; set; }
    }
}
