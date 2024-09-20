import {React,useState} from 'react'
import { useTodo } from '../Contexts';

function TodoForm() {
  const [todo, setTodo] = useState("")
  // extracting useContext from useTodo to use here
    const { addTodo } = useTodo()
  const add = (e) => {
      // it will not submit the form by default
    e.preventDefault()
      // this is a common pattern which indicates that if your todo item is falsy value for eg; empty item then it will not add up to list
        if (!todo) return
    // addTodo adds up the item preAssuming that its not completed while adding.
    addTodo({ todo, completed: false })
    // after todo item is added it will set the input field empty.
        setTodo("")
    }
  return (
      <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange = {(e)=>setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;

