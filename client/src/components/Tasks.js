import React from 'react';
import Task from './Task';

const Tasks = ({tasks, section}) => {
    return (
        <div className="tasks">
            {
                //.map function
                tasks.map((task) => 
                    <Task key={task.task_id} task={task} section={section} />
                )
            }
        </div>
    )
}

export default Tasks
