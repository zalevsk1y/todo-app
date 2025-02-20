import { List } from "@mui/material";
import React from "react";
import TodoItemComponent from "./TodoItemComponent";
import { Todo } from "../types/todo";

interface TodoListComponentProps {
  todos: Todo[];
  onSetCompleted: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoListComponent: React.FC<TodoListComponentProps> = ({ todos, onSetCompleted, onDelete }) => {
  return (
    <List className="App__TodoList">
      {todos.map((todo) => (
        <TodoItemComponent
          key={todo.id}
          todo={todo}
          onSetCompleted={onSetCompleted}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default TodoListComponent;
