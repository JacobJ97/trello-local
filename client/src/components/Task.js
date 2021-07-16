import React from 'react'
import Button from './Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import EditField from './EditField';

const Task = ({task, section, deleteTask, modalActive, editTask}) => {

    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [editTaskLabels, setEditTaskLabels] = useState('');
    
    const [taskToggleTitle, setTaskToggleTitle] = useState(false);
    const [taskToggleDescription, setTaskToggleDescription] = useState(false);
    const [taskToggleLabels, setTaskToggleLabels] = useState(false);

    const onSubmitTitle = (e) => {
        e.preventDefault();

        if (!editTaskTitle) {
            alert("Value is empty!");
            return;
        }

        editTask(task.task_id, "task_name", editTaskTitle)
        setTaskToggleTitle(false);
        setEditTaskTitle('');
    }

    const onSubmitDesc = (e) => {
        e.preventDefault();

        if (!editTaskDescription) {
            alert("Value is empty!");
            return;
        }

        editTask(task.task_id, "task_description", editTaskDescription)
        setTaskToggleDescription(false);
        setEditTaskDescription('');
    }

    const onSubmitLabels = (e) => {
        e.preventDefault();

        if (!editTaskLabels) {
            alert("Value is empty!");
            return;
        }

        editTask(task.task_id, "task_labels", editTaskLabels)
        setTaskToggleLabels(false);
        setEditTaskLabels('');
    }
    
    return (
        <>
        { task.SectionSectionId === section.section_id && (
        <div style={{backgroundColor: 'orange'}} className={"task task-item-" + task.task_id}>
            <div className="task-heading">
                {taskToggleTitle ? <EditField className="edit-task-title" onSubmit={onSubmitTitle} value={editTaskTitle} placeholder={task.task_name} onChange={(e) => setEditTaskTitle(e.target.value)} /> : <h2 onDoubleClick={() => setTaskToggleTitle(!taskToggleTitle)}>{task.task_name}</h2> }
                <Button iconText={faTimes} classText="btn btn-times" onClick={() => deleteTask(task.task_id)} disabled={modalActive} />
            </div>    
            {taskToggleDescription ? <EditField className="edit-task-desc" onSubmit={onSubmitDesc} value={editTaskDescription} placeholder={task.task_description} onChange={(e) => setEditTaskDescription(e.target.value)} /> : <p onDoubleClick={() => setTaskToggleDescription(!taskToggleDescription)}>{task.task_description}</p> }
            {taskToggleLabels ? <EditField className="edit-task-labels" onSubmit={onSubmitLabels} value={editTaskLabels} placeholder={task.task_labels} onChange={(e) => setEditTaskLabels(e.target.value)} /> : <span onDoubleClick={() => setTaskToggleLabels(!taskToggleLabels)}>{task.task_labels}</span> }
        </div>
        ) }
        </>
    )
    
}

export default Task
