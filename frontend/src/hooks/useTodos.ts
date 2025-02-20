import { useState, useEffect } from "react";
import { Todo } from "../types/todo";

const BASE_URL = 'http://localhost:3300'; // Adjust if your backend is different

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/todos`,{
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data.todos.map((todo: Todo, index:number) => ({
          id: index, // Keep your client-side index for optimistic updates, but consider using backend IDs if available and reliable
          name: todo.name,
          status: todo.status,
          _id: todo._id // Assuming your backend might return a stable _id
        })));
      } catch (e: any) {
        console.error("Fetch todos error:", e);
        setError(e.message || "Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    setLoading(true);
    setError(null);
    const tempId = todos.length; // Using length as temporary ID for optimistic update
    const optimisticTodo = { name: title, id: tempId, status: false, _id:'' };
    setTodos([...todos, optimisticTodo]); // Optimistic update
    try {
      const response = await fetch(`/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name: title, status: false }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newTodo = await response.json();
      // Backend should return the correct id. Replace tempId with the actual id from backend.
      setTodos(todos.filter(todo => todo.id !== tempId).concat({ 
          name:newTodo.todo.name,
          id: tempId,
          status:newTodo.todo.status,
          _id:newTodo.todo._id
         }));
    } catch (e: any) {
      setTodos(todos.filter(todo => todo.id !== tempId)); // Revert optimistic update on error
      console.error("Add todo error:", e);
      setError(e.message || "Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  const setTodoCompleted = async (id: string, completed: boolean) => {
    setError(null);
    const originalTodos = [...todos]; // Store original todos for potential rollback
    const updatedTodos = todos.map(todo =>
      todo._id === id ? { ...todo, status: completed } : todo
    );
    setTodos(updatedTodos); // Optimistic update

    try {
      const response = await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: completed }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTodo = await response.json();
      
    } catch (e: any) {
      console.error("Set todo completed error:", e);
      setError(e.message || "Failed to update todo status");
      setTodos(originalTodos); // Revert optimistic update on error
    }
  };

  const deleteTodo = async (id: string) => {
    setError(null);
    const originalTodos = [...todos]; // Store original todos for potential rollback
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos); // Optimistic update

    try {
      const response = await fetch(`/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // No need to update state again here as we already removed it optimistically
    } catch (e: any) {
      console.error("Delete todo error:", e);
      setError(e.message || "Failed to delete todo");
      setTodos(originalTodos); // Revert optimistic update on error
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    setTodoCompleted,
    deleteTodo
  };
};

export default useTodos;
