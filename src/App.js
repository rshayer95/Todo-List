import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./components/TodoList";
import "./styles/main.css";

const LOCAL_STORAGE_KEY = "TodoApp.todos";
function App() {
   const [todos, setTodos] = useState([]);
   const todoReference = useRef();

   useEffect(() => {
     const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
     if(storedTodos) {
       setTodos(storedTodos);
     }
   }, []);
   useEffect(() => {
     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
   }, [todos]);

   function completeHandler(id) {
    const newList = [...todos];
    const todo = newList.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newList);
  }
   function addHandler(e){
     const name = todoReference.current.value;
     if(name === ""){
        return;
     }
     setTodos(previousTodo => [...previousTodo, {id: uuidv4() ,name: name, complete: false}]);
     todoReference.current.value = null;
   }
  return (
    <>
     
      <header className="header"> 
      <h1><span className="redText">Todo</span><span className="blueText">List</span></h1>
      <div className="add-group">
          <input ref={todoReference} type="text" placeholder="Enter Todo" />
          <button className="btn btn-primary" onClick={addHandler}>Add</button>
          <button className="btn btn-danger" onClick={() => {
            const newList = todos.filter(todo => !todo.complete);
            setTodos(newList);
          }}>Clear Complete</button>
        </div>
      </header>
      <div className="remaining">
        {todos.filter(todo => !todo.complete).length} Left To Do
      </div>
      <TodoList todos= {todos} completeTodo = {completeHandler}/>
    </>
  );
}

export default App;
