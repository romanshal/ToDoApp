using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ToDoApp.Context;
using ToDoApp.Repositories;
using ToDoApp.Repositories.Impl;
using ToDoApp.Services;
using ToDoApp.Services.Impl;
using Microsoft.Extensions.Configuration;
using ToDoApp.Mappings;

namespace ToDoApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration) =>
            Configuration = configuration;
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(options =>
                        options.UseSqlServer(Configuration["Data:TodoList:ConnectionString"]));
            services.AddMvc(options => options.EnableEndpointRouting = false);

            services.AddAutoMapper(typeof(TodoListProfile));

            services.AddScoped<ITodoListRepository, TodoListRepository>();
            services.AddScoped<ITodoListService, TodoListService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseStatusCodePagesWithReExecute("/error", "?code={0}");
            app.UseMvcWithDefaultRoute();
        }
    }
}
