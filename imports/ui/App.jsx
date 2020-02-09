import React from 'react';

import Task from './Task';
import {Tasks} from '../api/tasks.js';
import { withTracker } from 'meteor/react-meteor-data';


const getTasks = ()=>{
  return [
    { _id: 1, text: 'This is task 1' },
    { _id: 2, text: 'This is task 2' },
    { _id: 3, text: 'This is task 3' },
  ];
}

const renderTasks = (tasks,hideCompleted)=>{
  let filteredTasks  = tasks;
  if(hideCompleted){
    filteredTasks = filteredTasks.filter(task => !task.checked);
  }

  return filteredTasks.map((task)=>{
    return (
      <Task key={task._id} task={task}/>
    )
  })
}


const App = (props) =>{ 
  const [hideCompleted,setHideCompleted] = React.useState(false);
  const textRef = React.createRef();
  const handleSubmit = (event)=>{
    event.preventDefault();
    const text = textRef.current.value;
    Tasks.insert({
      text:text,
      createdAt:new Date(),
    });
    textRef.current.value = '';

  };
  return (
  <div className="container">

<header>
  <h1>Todo List ({props.incompleteCount+''})</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={hideCompleted}
              onClick={()=>setHideCompleted(!hideCompleted)}
            />
            Hide Completed Tasks
          </label>
          <form className="new-task" onSubmit={handleSubmit} >
            <input
              type="text"
              ref={textRef}
              placeholder="Type to add new tasks"
            />
          </form>
        </header>
        <ul>
          {renderTasks(props.tasks,hideCompleted)}
        </ul>
  </div>
);
}

export default withTracker(()=>{
  return {
    tasks:Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
})(App);


