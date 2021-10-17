import React from 'react'

export default function Todo({ todo , completeTodo }) {
    function TodoHandler(){
        completeTodo(todo.id)
    }
    return (
        <>
            <div id="checklist">
                <input id={todo.id} type="checkbox" checked={todo.complete} onChange= {TodoHandler} />
                <label htmlFor={todo.id}>{todo.name}</label>
            </div>
        </>
    )
}
