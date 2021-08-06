import React from 'react'
import Button from './Button';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import EditField from './EditField';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({task, section, deleteTask, modalActive, editTask, index}) => {

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

        editTask(task.task_id, "task_name", "title", editTaskTitle, task.SectionSectionId)
        setTaskToggleTitle(false);
        setEditTaskTitle('');
    }

    const onSubmitDesc = (e) => {
        e.preventDefault();

        if (!editTaskDescription) {
            alert("Value is empty!");
            return;
        }

        editTask(task.task_id, "task_description", "description", editTaskDescription, task.SectionSectionId)
        setTaskToggleDescription(false);
        setEditTaskDescription('');
    }

    const onSubmitLabels = (e) => {
        e.preventDefault();

        if (!editTaskLabels) {
            alert("Value is empty!");
            return;
        }

        editTask(task.task_id, "task_labels", "labels", editTaskLabels, task.SectionSectionId)
        setTaskToggleLabels(false);
        setEditTaskLabels('');
    }

    return (
        <>
        { task.SectionSectionId === section.section_id && (
            <Draggable key={task.task_id} draggableId={'draggable-' + task.task_id} index={index}>
            {(provided, snapshot) => (    
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} data-id={task.task_id} data-order={task.task_order} style={{backgroundColor: 'orange', ...provided.draggableProps.style}} className={"task task-item-" + task.task_id}>
                    <div className="task-heading">
                        {taskToggleTitle ? <EditField className="edit-task-title" onSubmit={onSubmitTitle} value={editTaskTitle} placeholder={task.task_name} onChange={(e) => setEditTaskTitle(e.target.value)} /> : <h2 onDoubleClick={() => setTaskToggleTitle(!taskToggleTitle)}>{task.task_name}</h2> }
                        <Button iconText={faTimes} classText="btn btn-times" onClick={() => deleteTask(task.task_id, task.SectionSectionId, task.task_order)} disabled={modalActive} />
                    </div>    
                    {taskToggleDescription ? <EditField className="edit-task-desc" onSubmit={onSubmitDesc} value={editTaskDescription} placeholder={task.task_description} onChange={(e) => setEditTaskDescription(e.target.value)} /> : <p onDoubleClick={() => setTaskToggleDescription(!taskToggleDescription)}>{task.task_description}</p> }
                    {taskToggleLabels ? <EditField className="edit-task-labels" onSubmit={onSubmitLabels} value={editTaskLabels} placeholder={task.task_labels} onChange={(e) => setEditTaskLabels(e.target.value)} /> : <span onDoubleClick={() => setTaskToggleLabels(!taskToggleLabels)}>{task.task_labels}</span> }
                </div>
            )}
            </Draggable>
        ) }
        </>
    )
    
}

export default Task
