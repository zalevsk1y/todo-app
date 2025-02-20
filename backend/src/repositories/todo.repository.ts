import { TodoDocument, TodoModel, Todo } from '../models/todo';
import { ITodo, ITodoPayload } from '../types/todo';

interface ITodoRepository {
  getAllTodosForUser(userId: string): Promise<ITodo[]>; // Changed to get todos for a specific user
  createTodo(todoData: ITodoPayload, userId: string): Promise<ITodo>; // Added userId to createTodo params
  updateTodo(id: string, updateData: Partial<ITodo>, userId: string): Promise<ITodo | null>; // Added userId for context/security
  deleteTodo(id: string, userId: string): Promise<ITodo | null>; // Added userId for context/security
}

export class TodoRepository implements ITodoRepository {
  private todoModel: TodoModel;

  constructor(todoModel: TodoModel) {
    this.todoModel = todoModel;
  }

  async getAllTodosForUser(userId: string): Promise<ITodo[]> { // Modified method
    return this.todoModel.find({ userId: userId }).exec(); // Filter by userId
  }

  async createTodo(todoPayload: ITodoPayload, userId: string): Promise<ITodo> { // Modified method
    const createdTodo = new this.todoModel({ ...todoPayload, userId: userId }); // Include userId when creating
    return createdTodo.save();
  }

  async updateTodo(id: string, updateData: Partial<ITodo>, userId: string): Promise<ITodo | null> { // Modified method
    // Optional: Add check to ensure todo belongs to the user before updating (for security)
    const todo = await this.todoModel.findOne({ _id: id, userId: userId }).exec();
    if (!todo) return null; // Or throw an error

    return this.todoModel.findByIdAndUpdate(id, updateData, { new: true }).exec(); // No user-specific filter for updateById for simplicity, consider adding for security
  }

  async deleteTodo(id: string, userId: string): Promise<ITodo | null> { // Modified method
    // Optional: Add check to ensure todo belongs to the user before deleting (for security)
    const todo = await this.todoModel.findOne({ _id: id, userId: userId }).exec();
    if (!todo) return null; // Or throw an error

    return this.todoModel.findByIdAndDelete(id).exec(); // No user-specific filter for deleteById for simplicity, consider adding for security
  }
}
