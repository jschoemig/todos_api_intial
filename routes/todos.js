var express = require("express");
var router = express.Router();


var helpers = require('../helpers/todos');

router.route('/')                // all routes which start with '/' are grouped together
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/:todoId')         // all routes which start with '/todoId' are grouped together
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);



module.exports = router;



