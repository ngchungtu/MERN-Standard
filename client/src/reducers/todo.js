import { createSlice } from '@reduxjs/toolkit'
import { isEmptyOrNil } from '../common';

const initialState = {
    todoList: [],
};

export const todo = createSlice({
    name: 'todoApp',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            console.log(action.payload);
            state.todoList.push(action.payload);
        },
        updateNewTodo: (state, action) => {
            const { id, title, desc } = action.payload
            const todoToUpdate = state.todoList.find((i) => i.id === id)
            if (!isEmptyOrNil(todoToUpdate)) {
                todoToUpdate.title = title
                todoToUpdate.desc = desc
            }
        },
        deleteTodo: (state, action) => {
            const { id } = action.payload
            const todoToDelete = state.todoList.find((i) => i.id === id)
            if (!isEmptyOrNil(todoToDelete)) {
                state.todoList = state.todoList.filter((x) => x.id !== id)
            }
        }
    }
})

export const { addTodo, deleteTodo, updateNewTodo } = todo.actions;
export default todo.reducer;