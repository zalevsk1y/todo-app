import { Button, Typography } from "@mui/material";
import React from "react";

interface TodoStatisticsComponentProps {
  numTodos: number;
  numIncompleteTodos: number;
  numCompletedTodos: number;
}

const TodoStatisticsComponent: React.FC<TodoStatisticsComponentProps> = ({
  numTodos,
  numIncompleteTodos,
  numCompletedTodos,
}) => {
  return (
    <>
      <Typography className="App__Statistics">
        {numTodos} todos ({numIncompleteTodos} incomplete, {numCompletedTodos} completed)
      </Typography>
      
    </>
  );
};

export default TodoStatisticsComponent;
