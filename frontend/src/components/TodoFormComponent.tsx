import { Button, TextField } from "@mui/material";
import React, { useState, FormEvent } from "react";

interface TodoFormComponentProps {
  onAddTodo: (title: string) => void;
}

const TodoFormComponent: React.FC<TodoFormComponentProps> = ({ onAddTodo }) => {
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (newTitle.trim()) { // Prevent adding empty todos
      onAddTodo(newTitle);
      setNewTitle("");
    }
  };

  return (
    <form className="App__Add_Form" onSubmit={handleSubmit}>
      <TextField
        type="text"
        label="Title of new todo"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
      <Button type="submit" variant="contained" color="secondary">
        Add
      </Button>
    </form>
  );
};

export default TodoFormComponent;
