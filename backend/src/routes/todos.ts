import { Router } from "express"
import { TodoRepository } from "../repositories/todo.repository";
import { TodoController } from "../controllers/todo.controller";
import { Todo } from "../models/todo";
import { validateTodoData, handleValidationErrors } from '../middleware/validation.middleware'; 

const router: Router = Router()

const todoRepository = new TodoRepository(Todo); 
const todoController = new TodoController(todoRepository); 


router.get("/", todoController.getTodos.bind(todoController))

router.post("/",  validateTodoData(), handleValidationErrors, todoController.addTodo.bind(todoController))

router.put("/:id", todoController.updateTodo.bind(todoController))

router.delete("/:id", todoController.deleteTodo.bind(todoController))

export default router