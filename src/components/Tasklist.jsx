
import React, { useEffect, useState } from 'react';
import "./style.css"

function TaskList() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        setInterval(() => {
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            setTasks(storedTasks);
        }, 1000)

   
    }, []  );
  
    const confirmedTasks = tasks.filter((task) => task.completed);
    // console.log("mydatas" , confirmedTasks);
  return (
   <>
   { confirmedTasks.length > 0 && 
    <h2 className='maintitle'>completed task</h2>
   }
   {
        confirmedTasks.map((task, index) => (

            <li key={index} className='completedtask'> {task.text}</li>
        ))
    }

   
   </>
  );
}

export default TaskList;
