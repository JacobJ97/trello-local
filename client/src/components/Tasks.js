import React from 'react';
import Task from './Task';

const Tasks = ({tasks, section, deleteTask, modalActive, editTask}) => {
    return (
        <div className="tasks">
            {
                //.map function
                tasks.map((task) => 
                    <Task key={task.task_id} task={task} section={section} deleteTask={deleteTask} modalActive={modalActive} editTask={editTask} />
                )
            }
        </div>
    )
}

export default Tasks
