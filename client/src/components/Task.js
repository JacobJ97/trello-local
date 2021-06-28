import React from 'react'
import Button from './Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const Task = ({task, section, deleteTask, modalActive}) => {
    
    return (
        <>
        { task.SectionSectionId === section.section_id && (
        <div style={{backgroundColor: 'orange'}} className={"task task-item-" + task.task_id}>
            <div className="task-heading">
                <h2>{task.task_name}</h2>
                <Button iconText={faTimes} classText="btn btn-times" onClick={() => deleteTask(task.task_id)} disabled={modalActive} />
            </div>    
            <p>{task.task_description}</p>
            <span>{task.task_labels}</span>
        </div>
        ) }
        </>
    )
    
}

export default Task
