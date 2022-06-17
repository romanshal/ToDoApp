using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;
using ToDoApp.ModelConfigurations;

namespace ToDoApp.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<TaskDb> Tasks { get; set; }
        public DbSet<TasksListDb> TasksList { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TaskDbConfiguration());
            modelBuilder.ApplyConfiguration(new TasksListDbConfiguration());
        }
    }
}
