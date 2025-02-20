import React from "react";
import AppBarComponent from "./components/AppBarComponent";
import TodoFormComponent from "./components/TodoFormComponent";
import TodoListComponent from "./components/TodoListComponent";
import TodoStatisticsComponent from "./components/TodoStatisticsComponent";
import useTodos from "./hooks/useTodos";

import "./App.css";
import { Todo } from "./types/todo";

function App() {
  const {
    todos,
    error,
    addTodo,
    setTodoCompleted,
    deleteTodo,
  } = useTodos();



  if (error) {
    return <div>Error: {error}</div>;
  }

  const numTodos = todos.length;
  const numCompletedTodos = todos.filter((todo:Todo) => todo.status).length; 
  const numIncompleteTodos = numTodos - numCompletedTodos;


  return (
    <div className="App">
      <AppBarComponent />
      <div className="App__Container">
        <div className="App__Main">
          <TodoFormComponent onAddTodo={addTodo} />
          <TodoListComponent
            todos={todos}
            onSetCompleted={setTodoCompleted}
            onDelete={deleteTodo}
          />
          <TodoStatisticsComponent
            numTodos={numTodos}
            numIncompleteTodos={numIncompleteTodos}
            numCompletedTodos={numCompletedTodos}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
