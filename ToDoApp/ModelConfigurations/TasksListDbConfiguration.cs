using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;

namespace ToDoApp.ModelConfigurations
{
    public class TasksListDbConfiguration : IEntityTypeConfiguration<TasksListDb>
    {
        public void Configure(EntityTypeBuilder<TasksListDb> builder)
        {
            builder
                .ToTable("TasksList")
                .HasKey(k => k.Id);
            builder
                .HasMany(c => c.Tasks)
                .WithOne(e => e.TasksList)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
