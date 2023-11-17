import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, updateNewTodo } from '../reducers/todo';
import { autoId, isEmptyOrNil } from '../common';
import '../styles/todo.css'

const Todo = () => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const [newTitle, setNewTitle] = useState('')
    const [newDesc, setNewDesc] = useState('')

    const [activeUpdate, setActiveUpdate] = useState(false)
    const [todoToUpdate, setTodoToUpdate] = useState([])

    const dispatch = useDispatch()
    const stateTodoList = useSelector(state => state.todo.todoList)

    const handleLogState = () => {
        console.log('stateTodoList', stateTodoList);
    }

    const handleAddNewTodo = (e) => {
        e.preventDefault();
        if (!isEmptyOrNil(title && desc)) {
            dispatch(addTodo({
                id: autoId(),
                title: title,
                desc: desc
            }))
        }
        else {
            console.log('cannot dispatch');
        }
    }

    const hanldeRemoveTodo = (id) => {
        dispatch(deleteTodo({ id: id }))
        setActiveUpdate(false);
    }

    const handleUpdateTodo = (id) => {
        const todo = stateTodoList.filter((i) => i.id === id)
        // console.log("old state", todo);
        if (todo) {
            dispatch(updateNewTodo({
                id: id,
                title: newTitle,
                desc: newDesc
            }))
        }
    }

    const handleActiveUpdate = (id) => {
        setActiveUpdate(true)
        const todo = stateTodoList.filter((i) => i.id === id)
        // console.log("old state", todo);
        setTodoToUpdate(todo)
    }

    return (
        <>
            <div>
                <form onSubmit={handleAddNewTodo} className='form_add-new-todo'>
                    <h3>Add new Todo</h3>
                    <input type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Desc..." onChange={(e) => setDesc(e.target.value)} />
                    <button type="submit">Add New Todo</button>
                </form>
                {
                    activeUpdate &&
                    <>
                        {
                            todoToUpdate.map((todo) => (
                                <div key={todo.id} className="form_update-todo">
                                    <h3>Update Todo</h3>
                                    <input type="text" placeholder={todo.title} onChange={(e) => setNewTitle(e.target.value)} />
                                    <input type="text" placeholder={todo.desc} onChange={(e) => setNewDesc(e.target.value)} />
                                    <div className='form_update-todo_button'>
                                        <button onClick={() => handleUpdateTodo(todo.id)}>Update Todo</button>
                                        <button onClick={() => setActiveUpdate(!activeUpdate)}>Cancel</button>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                }
            </div>

            {
                stateTodoList.length > 0 && stateTodoList?.map((i) => {
                    return (
                        <div className="todo_container" key={i.id}>
                            <div className='todo_item'>
                                <div className='todo_item-action'>
                                    <button onClick={() => handleActiveUpdate(i.id)}>Edit</button>
                                    <button onClick={() => hanldeRemoveTodo(i.id)}>Remove</button>
                                </div>
                                <div className="todo_item-sub-title"><small>Title</small></div>
                                <h3 className='todo_title'>{i.title}</h3>
                                <div className="todo_item-sub-title"><small>Desc</small></div>
                                <h4 className='todo_desc'>{i.desc}</h4>
                            </div>
                        </div>
                    )
                })
            }
            <button onClick={() => handleLogState()} className='button_logState'>Log State</button>
        </>
    )
}

export default Todo