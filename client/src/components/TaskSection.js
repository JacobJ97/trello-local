import React from 'react';
import Button from './Button';
import Tasks from './Tasks';
import EditField from './EditField';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const TaskSection = ({section, tasks, onAddModal, modalActive, deleteSection, deleteTask, editSection, editTask}) => {

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
        <div data-key={section.section_id} className="section">
            <div className="section-heading">
                <Button iconText={faPlus} classText="btn btn-plus" onClick={() => onAddModal(section.section_id)} disabled={modalActive} />
                {sectionToggle ? 
                <EditField className="edit-section-name" onSubmit={onSubmit} value={sectionNameEdit} placeholder={section.section_name} onChange={(e) => setSectionNameEdit(e.target.value)} />
                : 
                <h1 onDoubleClick={() => setSectionToggle(!sectionToggle)}>{section.section_name}</h1>}
                <Button iconText={faTimes} classText="btn btn-times" onClick={() => deleteSection(section.section_id)} disabled={modalActive} />
            </div>
            <Tasks tasks={tasks} section={section} deleteTask={deleteTask} modalActive={modalActive} editTask={editTask} />
        </div>
    )
}

export default TaskSection
