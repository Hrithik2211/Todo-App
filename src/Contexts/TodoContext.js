import { createContext, useContext } from "react";

// exporting the contexts(object and functions to use them globally)
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed:false,
        }
    ],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleComplete: (id) => { }
})
// exporting the useContext globally by this custom hook then we will not need to import useContext again and again.
export const useTodo = () => {
    return useContext(TodoContext)
}
// exporting provider to wrap the child component for access.
export const TodoProvider = TodoContext.Provider