import React, { useState, useEffect } from 'react';
import TaskList from './Tasklist';
import "./style.css"

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() === '') return;

    const newTask = {
      text: inputValue,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const confirmTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

//   const unconfirmedTasks = tasks.filter((task) => !task.confirmed);
  // const confirmedTasks = tasks.filter((task) => task.confirmed);

  return (
    <div className='container-fluid '>
      <div className="row d-flex justify-content-center">
         <div className="col-md-6">
         <h1 className='maintitle'>To-Do List</h1>
      <div className='inputdiv d-flex pb-md-4'>
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <h2 className='maintitle'>Tasks to Confirm</h2>
      <ul>
        {tasks.map((task, index) => (
          !task.completed &&
          <>
            <li key= {index} className='taskli d-flex justify-content-between'>
              <h6>
              {task.text}
              </h6>
            <div className="deleteandconfirmbtn">
            <button onClick={() => deleteTask(index)} className='me-3'>Delete</button>
            <button onClick={() => confirmTask(index)} >Confirm</button>
            </div>
            </li>
          </>
        ))}
      </ul>
      <TaskList/>
        </div>
      </div>

    </div>
  );
}

export default TodoApp;
