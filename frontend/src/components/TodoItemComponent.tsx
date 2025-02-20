import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { Todo } from "../types/todo";

interface TodoItemComponentProps {
  todo: Todo;
  onSetCompleted: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoItemComponent: React.FC<TodoItemComponentProps> = ({ todo, onSetCompleted, onDelete }) => {
  return (
    <ListItem
      key={todo.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete todo"
          onClick={() => onDelete(todo._id)}
          disabled={todo._id==""}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding={true}
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            checked={todo.status}
            onChange={(event) => onSetCompleted(todo._id, event.target.checked)}
            disabled={todo._id==""}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <div
              className={
                todo.status ? "App__TodoItemText--Completed" : ""
              }
            >
              {(todo.status ? "DONE: " : "TODO: ") + todo.name}
            </div>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItemComponent;
