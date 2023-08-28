import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {

        fetchTodoList();

    }, []);

    const fetchTodoList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todo');
            setTodoList(response.data);
        } catch (error) {
            setMessage('An error occurred while fetching the ToDo list');
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/todo', {
                text: newTodo,
            });

            setNewTodo('');
            setMessage(response.data.message);
            fetchTodoList();                  // Refresh the ToDo list
        } catch (error) {
            setMessage('An error occurred while adding a ToDo');
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/todo/${id}`);
            setMessage(response.data.message);
            fetchTodoList(); // Refresh the ToDo list
        } catch (error) {
            setMessage('An error occurred while deleting the ToDo');
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new ToDo"
                    required
                />
                <button type="submit">Add</button>
            </form>
            <p>{message}</p>
            <ul>
                {todoList.map((todo) => (
                    <li key={todo._id}>
                        {todo.text}
                        <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
