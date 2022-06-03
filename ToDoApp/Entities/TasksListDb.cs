using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Entities
{
    [Table("TasksList")]
    public class TasksListDb
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [ForeignKey("ListId")]
        public virtual ICollection<TaskDb> Tasks { get; set; }
    }
}
