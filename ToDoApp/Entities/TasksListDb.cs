using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Entities
{
    public class TasksListDb
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Icon { get; set; }

        [ForeignKey("ListId")]
        public virtual ICollection<TaskDb> Tasks { get; set; }
    }
}
