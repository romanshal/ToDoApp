using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Entities
{
    [Table("Tasks")]
    public class TaskDb
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime ChacngeDate { get; set; }
        public int Status { get; set; }
    }
}
