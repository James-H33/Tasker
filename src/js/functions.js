require('../sass/main.sass');

"use strict";

// Handles todos in the DOM
const TodosList = {
    todos: {
        title: '',
        list: []
    },
    init: function() {
        this.eventBinding();
    },
    eventBinding: function() {
        var taskInput          = $('.task-create input');
        var taskDelete         = $('.col-delete');
        var taskTodosDisplay   = $('.task-todos-display');
        var removeAllBtn       = $('#remove-todos');

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

        // Remove All Todos
        removeAllBtn.on('click', this.removeAllTodos.bind(this));

    },
    displayTodos: function() {
        var taskTodosDisplay = $('.task-todos-display');
        taskTodosDisplay[0].innerHTML = '';
        this.todos.list.forEach(function(item, position) {
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
    addTitle: function(newTitle) {
        this.todos.title = newTitle;
    },
    addTodos: function(newTodo) {
        this.todos.list.push({
            todoText: newTodo,
            completed: false
        });
        this.displayTodos();
    },
    deleteTodos: function(removeEvent) {
        var removePosition = removeEvent.dataset.position;
        this.todos.list.splice(removePosition, 1);
        this.displayTodos();
    },
    removeAllTodos: function() {
        this.todos.list.length = 0;
        this.displayTodos();
    },
    toggleStatus: function(event) {
        var toggleTodoWrapper = event.target.closest('.task-control');
        var position          = toggleTodoWrapper.dataset.position;
        var todoCompleted     = this.todos.list[position];

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




/****************************************************
////////////////////  UserList  ////////////////////
****************************************************/

const UserList = {
    init: function() {
        this.cachDOM();
        this.bindEvents();
    },
    cachDOM: function() {
        this.$mainListDisplay       = $('.main-list-display');
        this.$taskListControlP      = this.$mainListDisplay.find('.task-listing-control p');
        this.$listDelete            = this.$mainListDisplay.find('.list-delete');
        this.$slideListWrapper      = this.$mainListDisplay.find('.slide-list-wrapper');
        this.$listDisplay           = $('.list-display');
    },
    bindEvents: function () {
        this.$listDelete.on('click', this.deleteList.bind(this));
        this.$taskListControlP.on('click', this.slideListDisplay.bind(this));
    },
    deleteList: function(event) {
        var eventParent = event.target.closest('.task-listing-control');
        var listId = eventParent.dataset.id;
        DataHandler.deleteTodosListing(listId, eventParent);
    },
    removeListDisplay: function(elemToRemove) {
        elemToRemove.remove();
    },
    slideListDisplay: function(event) {
        this.$slideListWrapper.toggleClass('active-todos-list');
        var eventParent = event.target.closest('.task-listing-control');
        var listId = eventParent.dataset.id;
        
        DataHandler.getTodos(listId, eventParent);
    },
    displayRequestTodos: function(data) {
        this.$listDisplay[1].append(`
            <div class="task-control">
                <p> ${item.todoText} </p>
            </div>`
        );
    }
}

UserList.init();




/****************************************************
//////////////////// DataHandler ////////////////////
****************************************************/

// Handles AJAX Requests
const DataHandler = {
    init: function() {
        this.cacheDOM();
        this.eventBinding();
    },
    cacheDOM: function() {

    },
    eventBinding: function() {

    },
    postTodos: function() {
        let urlPath = window.location.pathname;
        let titleInput = $('.title-wrapper input');
        TodosList.addTitle(titleInput[0].value);

        var postData = {
            title: TodosList.todos.title,
            todos: TodosList.todos.list
        }

        $.ajax({
            type: 'POST',
            url: '/home',
            dataType: 'json',
            data: { 'post' : JSON.stringify(postData) },
            success: function(data) {
                console.log("Success");
                TodosList.removeAllTodos();
                SaveModal.displaySaveModal();
                TodosList.todos.title = '';
                titleInput[0].value = '';
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    deleteTodosListing: function(listingId, parentElem) {
        var listId = listingId;
        var parentElem = parentElem;

        $.ajax({
            type: 'DELETE',
            url: '/home',
            dataType: 'json',
            data: { 'id': listId },
            success: function(data) {
                console.log("Success");
                UserList.removeListDisplay(parentElem);
            },
            error: function(err) {
                console.log(err);
            }
        });
    },
    getTodos: function(listingId, parentElem) {
        var listId = listingId;
        var parentElem = parentElem;
        console.log('You\'ve done it!');

        // $.ajax({
        //     type: 'GET',
        //     url: '/todos',
        //     dataType: 'json',
        //     data: { 'id' : listId },
        //     success: function() {
        //         console.log('Success');
        //     },
        //     error: function(err) {
        //         console.log(err);
        //     }
        // });
    }
}

DataHandler.init();




/****************************************************
////////////////////  Save Modal ////////////////////
****************************************************/

const SaveModal = {
    init: function() {
        this.cacheDOM();
        this.bindEvents();
    },
    cacheDOM: function() {
        this.$saveTodosBtn      = $('#save-todos');
        this.$saveModalWrapper  = $('#save-modal-wrapper');
        this.$saveCloseModal    = this.$saveModalWrapper.find('.save-modal-close')
        this.$saveModalDisplay  = this.$saveModalWrapper.find('.save-modal-display');
        this.$saveModalDataBtn  = this.$saveModalWrapper.find('.save-modal-data');
        this.$titleInput        = this.$saveModalWrapper.find('.title-wrapper input');
    },
    bindEvents: function() {
        this.$saveTodosBtn.on('click', this.displaySaveModal.bind(this));
        this.$saveCloseModal.on('click', this.displaySaveModal.bind(this));
        this.$saveModalDataBtn.on('click', DataHandler.postTodos);
        this.$saveModalWrapper.on('click', this.displaySaveModal.bind(this));
    },
    displaySaveModal: function() {
        this.$saveModalWrapper.toggleClass('active-modal');
        this.$saveModalDisplay.toggleClass('active-modal');
    }
}

SaveModal.init();




/****************************************************
////////////////////  PageView  ////////////////////
****************************************************/

// Handles Page View Switch: From Todo to List and back
(function() {

    const PageView = {
        init: function(){
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.$mainDisplay   = $('.main-display');
            this.$viewToggleBtn = this.$mainDisplay.find('.more-todos');
        },
        bindEvents: function() {
            this.$viewToggleBtn.on('click', this.slideView.bind(this));
        },
        slideView: function() {
            this.$mainDisplay.toggleClass('active-list');
        }
    }

    PageView.init();

})();
