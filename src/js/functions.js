require('../sass/main.sass');

"use strict";

// Handles todos in the DOM
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
            TodosList.deleteTodos(todoToDelete)
        });

        // Change Status
        taskTodosDisplay.on('click', '.fa', this.toggleStatus.bind(this));

        // Change TodoText
        // taskTodosDisplay.on('click', 'p', this.changeTodos.bind(this));

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
        });
    },
    addTodos: function(newTodo) {
        this.todos.push({
            todoText: newTodo,
            completed: false
        });
        this.displayTodos();
    },
    changeTodos: function(event) {
        var todoToChange    = event.target.closest('.task-control');
        var position        = todoToChange.dataset.position;
        this.todos[position].todoText = newTodo;
        this.displayTodos();
    },
    deleteTodos: function(removeEvent){
        var removePosition = removeEvent.dataset.position
        this.todos.splice(removePosition, 1);
        this.displayTodos();
    },
    toggleStatus: function(event) {
        var toggleTodoWrapper = event.target.closest('.task-control');
        var position          = toggleTodoWrapper.dataset.position;
        var todoCompleted     = this.todos[position];

        if (event.target.className === 'fa fa-circle-thin') {
            event.target.className = 'fa fa-circle';
        } else {
            event.target.className = 'fa fa-circle-thin';
        }
        toggleTodoWrapper.classList.toggle('completed-task');
        todoCompleted.completed = !todoCompleted.completed;
    }
}

TodosList.init();

// Handles AJAX Requests
const DataHandler = {
    init: function() {
        this.cacheDOM();
        this.eventBinding();
    },
    cacheDOM: function() {
        this.$saveTodosBtn = $('#save-todos');
    },
    eventBinding: function() {
        this.$saveTodosBtn.on('click', this.postTodos.bind(this));
    },
    postTodos: function() {
        var urlPath = window.location.pathname;
        var postData = TodosList.todos;

        $.ajax({
            type: 'POST',
            url: '/',
            dataType: 'json',
            data: { 'post' : JSON.stringify(postData) },
            success: function(data) {
                console.log("Success");
            },
            error: function(err) {
                console.log(err);
            }
        });

    }
}

DataHandler.init();
