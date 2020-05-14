//the system always looks for a file called index.js when we require a new folder directory

var mongoose = require("mongoose");
mongoose.set('debug',true); // for us to see the debugger mode in case the code doesn't work as planned

mongoose.connect('mongodb://localhost/todo-api'); //name can be anything: can be 'mongodb://localhost/newsnobodyreads'

mongoose.Promise = Promise; //enables us to use .then and .catch functions instead of callbacks

module.exports.Todo = require("./todo"); // so that not only the index.js file is required we have to add this line to send, when required, as well the todo.js file