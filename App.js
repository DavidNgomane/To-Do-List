import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import "./src/components/App.css";

export default function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")

  React.useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if(loadedTodos){
    setTodos(loadedTodos)
    }
  }, [])

  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])


  function handleSubmit(e){
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  function deleteTodo(id){
    const updatedTodos = [...todos].filter((todo) => todo.id !== id ) 

    setTodos(updatedTodos)
  }

  function toggleComplete(id){
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  function editTodo(id){
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id ){
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("") 
  }

  return (
    <div style={{marginLeft: '60px'}}>
      <form onSubmit={handleSubmit}>
      <button type="submit" style={{border: '1px solid', borderColor: 'red', borderRadius: '6px', padding: '8px 16px'}}>Add Todo List</button>&nbsp;
        <input type="text" style={{height: 30, width: 340, borderColor: 'gray', borderWidth: 1}} onChange={(e) => setTodo(e.target.value)} value={todo}/>
        
      </form>
       {todos.map((todo) =><div key={todo.id}>

        {todoEditing == todo.id ? 
        ( <input type="text" onChange={(e) => setEditingText(e.target.value)} 
        value={editingText}/>) 
        : 
        (<div>{todo.text}</div>) }
         
        
         <button onClick={() => deleteTodo(todo.id)} style={{border: '1px solid', borderColor: 'black', borderRadius: '6px', padding: '8px 16px'}}>Delete</button>
         <input type="checkbox" onChange={() => toggleComplete(todo.id)} 
         checked={todo.completed}/>

          {todoEditing === todo.id ? (<button onClick={() => editTodo(todo.id)}
          style={{border: '1px solid', borderColor: 'blue', borderRadius: '6px', padding: '8px 16px'}}>Submit edits</button>) : ( <button onClick={() => setTodoEditing(todo.id)}
          style={{border: '1px solid', borderColor: 'blue', borderRadius: '6px', padding: '8px 16px'}}>Edit</button>)}
         </div> )}
    </div>
    
  );
}


