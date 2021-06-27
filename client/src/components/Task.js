import React from 'react'

const Task = ({task, section}) => {
    
    return (
        <>
        { task.section_id === section.section_id && (
        <div style={{backgroundColor: 'orange'}} className={"task task-item-" + task.task_id}>
            <h2>{task.task_name}</h2>
            <p>{task.task_description}</p>
            <span>{task.task_labels}</span>
        </div>
        ) }
        </>
    )
    
}

export default Task
