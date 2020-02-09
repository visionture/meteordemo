import React from 'react';
import { Tasks } from '../api/tasks.js';

export default ({task})=>{

    const taskClassName = task.checked?'checked':'';
    const toggleChecked = ()=>{
        Tasks.update(task._id,{
            $set:{checked:!task.checked},
        })
    };
    const deleteThisTask = ()=>{
        Tasks.remove(task._id);
    };
    return (
    <li className={taskClassName}>
         <button className="delete" onClick={deleteThisTask}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={!!task.checked}
          onClick={toggleChecked}
        />
 
        <span className="text">{task.text}</span></li>
    )
}