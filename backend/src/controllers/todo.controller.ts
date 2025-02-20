import {  Response } from 'express';
import Request  from '../types/express/index';
import { TodoRepository } from '../repositories/todo.repository';
import { ITodo, ITodoPayload } from '../types/todo';

export class TodoController {
  private todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  public getTodos = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = req.user?.userId; 
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' }); 
      }
      console.log("Fetching todos for user:", userId); 
      const todos: ITodo[] = await this.todoRepository.getAllTodosForUser(userId); 
      return res.status(200).json({ todos });
    } catch (error: any) {
      console.error("Error fetching todos:", error);
      return res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }
  };

  public addTodo = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' }); 
      }
      const { name, status } = req.body as ITodoPayload; 
      const newTodo: ITodo = await this.todoRepository.createTodo({ name, status }, userId); 
      return res.status(201).json({ message: 'Todo added successfully', todo: newTodo });
    } catch (error: any) {
      console.error("Error adding todo:", error);
      return res.status(500).json({ message: 'Error adding todo', error: error.message });
    }
  };

  public updateTodo = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = req.user?.userId; 
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' }); 
      }

      const { id } = req.params as { id: string };
      const updateData = req.body as Partial<ITodo>;
      const updatedTodo: ITodo | null = await this.todoRepository.updateTodo(id, updateData, userId); 

      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (error: any) {
      console.error("Error updating todo:", error);
      return res.status(500).json({ message: 'Error updating todo', error: error.message });
    }
  };

  public deleteTodo = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User ID missing' }); 
      }

      const { id } = req.params as { id: string };
      const deletedTodo: ITodo | null = await this.todoRepository.deleteTodo(id, userId); 

      if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error: any) {
      console.error("Error deleting todo:", error);
      return res.status(500).json({ message: 'Error deleting todo', error: error.message });
    }
  };
}
