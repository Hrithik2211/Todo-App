import { TodoProvider } from './Contexts';
import { useEffect, useState } from 'react';
import TodoForm from './Components/TodoForm';
import TodoItem from './Components/TodoItem';

function App() {

  const [todos, setTodos] = useState([])
  
  // now write a function to add todo
  const addTodo = (todo)=>{
    // if I set only todo here then all the old values will be delete from array so use updater function
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
    // in above function I passed new todo along with old todos also new todo is passed with new id everytime so I used Date.now()
  }

  // now write a function to updateTodo
  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((prevTodo) =>
      (prevTodo.id === id ? todo : prevTodo)))
    // above we are just writing to check if The current todo ID matches with prev id if yes then update with todo or else keep prev todo
  }

  // now writing the delete function in which the todo id which matches the provided id will be deleted
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo)=> todo.id !== id))
  }
  // so here if provided id is = todo.id then keeping rest same todo.completed is changed and if the id does not match then no change with todo
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id ? {...prevTodo, completed:!prevTodo.completed} : prevTodo
    ))
  }
  //  local storage working: retrieves the items todos here and when you visit the app again it will render the todo items from local storage so prev if there were any of items present then it will show up otherwise nothing is shown.
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0)
      {
        setTodos(todos)
      }
    }, [])
    // saves todos to local storage whenever the todos are changed this is why below function will save each time when todos chnges
    useEffect(() => {
      localStorage.setItem("todos",JSON.stringify(todos))
    },[todos])
    


  return (
    <TodoProvider value={{addTodo,deleteTodo,updateTodo,toggleComplete,todos}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            ToDo List
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <TodoItem todo ={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App
