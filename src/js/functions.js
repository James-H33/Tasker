require('../sass/main.sass');

"use strict";

(function() {

    const TodosList = {
        todos: [],
        init: function() {
            this.eventBinding();
        },
        eventBinding: function() {
            var taskInput = $('.task-create input');
            var taskDelete = $('.col-delete');
            var taskTodosDisplay = $('.task-todos-display');

            // Add Todos Event
            taskInput.on('keydown', function(event) {
                if (event.keyCode == 13) {
                    var newTodo = event.target.value;
                    TodosList.addTodos(newTodo);
                    event.target.value = '';
                }
            });

            // Delete Todos Event
            taskTodosDisplay.on('click', '.col-delete', function(event){
                var todoToDelete = event.target.closest('.task-control');
                console.log(todoToDelete);
                TodosList.deleteTodos(todoToDelete)
            });
        },
        displayTodos: function() {
            var taskTodosDisplay = $('.task-todos-display');
            taskTodosDisplay[0].innerHTML = '';
            this.todos.forEach(function(item, position) {
                taskTodosDisplay.append(`
                    <div class="task-control" data-position="${position}">
                        <div class="col">
                            <i class="fa fa-circle-thin"></i>
                        </div>
                        <p> ${item.todoText} </p>
                        <div class="col-delete">
                            <i class="fa fa-times"></i>
                        </div>
                    </div>`
                );
            })
        },
        addTodos: function(newTodo) {
            this.todos.push({
                todoText: newTodo,
                completed: false
            });
            this.displayTodos();
        },
        changeTodos: function(positon, newTodo) {
            this.todos[position].todoText = newTodo;
            this.displayTodos();
        },
        deleteTodos: function(removeEvent){
            var removePosition = removeEvent.dataset.position
            this.todos.splice(removePosition, 1);
            this.displayTodos();
        },
        toggleStatus: function(position) {
            var todoCompleted = this.todos[position].completed;
            todoCompleted = !todoCompleted;
        }
    }

    TodosList.init();

})();
