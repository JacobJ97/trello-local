import React from 'react';
import Button from './Button';
import Tasks from './Tasks';
import EditField from './EditField';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

const TaskSection = ({section, tasks, onAddModal, modalActive, deleteSection, deleteTask, editSection, editTask, provided, snapshot}) => {

    const [sectionNameEdit, setSectionNameEdit] = useState('');

    const [sectionToggle, setSectionToggle] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!sectionNameEdit) {
            alert("Value is empty!");
            return;
        }

        editSection(section.section_id, sectionNameEdit)
        setSectionToggle(false);
        setSectionNameEdit('');
    }

    return (
        <Droppable key={section.section_id} droppableId={'' + section.section_id}>
        {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} data-key={section.section_id} className={"section section-id-" + section.section_id}>
                <div className="section-heading">
                    <Button iconText={faPlus} classText="btn btn-plus" onClick={() => onAddModal(section.section_id, document.querySelectorAll('.section-id-' + section.section_id + ' .task').length+1)} disabled={modalActive} />
                    {sectionToggle ? 
                    <EditField className="edit-section-name" onSubmit={onSubmit} value={sectionNameEdit} placeholder={section.section_name} onChange={(e) => setSectionNameEdit(e.target.value)} />
                    : 
                    <h1 onDoubleClick={() => setSectionToggle(!sectionToggle)}>{section.section_name}</h1>}
                    <Button iconText={faTimes} classText="btn btn-times" onClick={() => deleteSection(section.section_id)} disabled={modalActive} />
                </div>
                <Tasks tasks={tasks} section={section} deleteTask={deleteTask} modalActive={modalActive} editTask={editTask} />
                {provided.placeholder}
            </div>
        )}
        </Droppable>
    )
}

export default TaskSection
