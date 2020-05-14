/* global $ */     // in case $ should be added as standard sign to be used in that file

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);
    
    $('#todoInput').keypress(function(event){
        if(event.which == 13){                          // 13 is the eventkey for the enter key!
            createTodo();
        }
    });
    
    $('.list').on('click','li', function(){
        updateTodo($(this));
    });
    
    $('.list').on('click','span', function(event){  //listener needs to be set up on something that is there from the beginning -> html list element!
        event.stopPropagation();                    // this function stops that after the click effect on span no other effect - e.g. on list - is executed
        removeTodo($(this).parent());
    });
    
});



// ---------- Underlying functions ------------------------------------

function addTodo(todo){   // general function to include item from input bar into list
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span> </li>');
    newTodo.data('id', todo._id); // stores the id of the new todo - as created by mongo -into an id attribute of the newTodo
    newTodo.data('completed', todo._completed); //stores boolean value of task -- other option: check wether 'done' class has been assigned
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}


function addTodos(todos){         // add todos to page here
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function createTodo (){         // let's you create a todo which first goes into the data base and then with addTodo function will be posted in list format
    var usrInput = $('#todoInput').val();
    $.post('/api/todos',{name: usrInput })
    .then(function(newTodo){
        $('#todoInput').val('');   // this line clears the input of the field -- this way it looks as if the value goes from entry field to list
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    });
}


function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteURL = '/api/todos/' + clickedId;
    
    $.ajax({
        method: 'DELETE',
        url: deleteURL
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    });
}


function updateTodo (todo){
   var updateURL = '/api/todos/' + todo.data('id');
   var isDone = !todo.data('completed');
   var updateData = {completed: isDone};
   
    $.ajax({
        method: 'PUT',
        url: updateURL,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed',isDone);
    });
    
}