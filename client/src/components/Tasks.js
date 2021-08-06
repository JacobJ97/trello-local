import React from 'react';
import Task from './Task';


const Tasks = ({tasks, section, deleteTask, modalActive, editTask}) => {

    //on drop to the task section -> have it determine in what section of task it is
    //once that is determine, trigger event to change relevant order ids and change order

    return (
        <div style={{backgroundColor: 'orange'}} className="tasks">
            {
                //.map function
                Object.entries(tasks).map(taskKeyMap => taskKeyMap.map((taskArr, i) => i===1 && taskArr.map((task, index) => 
                    <Task key={task.task_id} task={task} section={section} deleteTask={deleteTask} modalActive={modalActive} editTask={editTask} index={index} />
                )))
            }
        </div>
    )
}

export default Tasks
