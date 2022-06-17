using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApp.Entities;

namespace ToDoApp.ModelConfigurations
{
    public class TaskDbConfiguration : IEntityTypeConfiguration<TaskDb>
    {
        public void Configure(EntityTypeBuilder<TaskDb> builder)
        {
            builder
                .ToTable("Tasks")
                .HasKey(k => k.Id);
            builder
                .HasOne(e => e.TasksList)
                .WithMany(c => c.Tasks);
        }
    }
}
