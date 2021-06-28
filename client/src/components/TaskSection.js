import React from 'react';
import Button from './Button';
import Tasks from './Tasks';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

const TaskSection = ({section, tasks, onAddModal, modalActive, deleteSection, deleteTask}) => {
    return (
        <div data-key={section.section_id} className="section">
            <div className="section-heading">
                <Button iconText={faPlus} classText="btn btn-plus" onClick={() => onAddModal(section.section_id)} disabled={modalActive} />
                <h1>{section.section_name}</h1> 
                <Button iconText={faTimes} classText="btn btn-times" onClick={() => deleteSection(section.section_id)} disabled={modalActive} />
            </div>
            <Tasks tasks={tasks} section={section} deleteTask={deleteTask} modalActive={modalActive} />
        </div>
    )
}

export default TaskSection
