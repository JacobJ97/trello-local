import React from 'react';
import Button from './Button';
import Tasks from './Tasks';

const TaskSection = ({section, tasks, onAddModal, modalActive}) => {
    return (
        <div data-key={section.section_id} className="section">
            <div className="section-heading">
                <h1>{section.section_name}</h1> 
                <Button iconText="plus" classText="btn btn-plus" onClick={() => onAddModal(section.section_id)} disabled={modalActive} />
            </div>
            <Tasks tasks={tasks} section={section} />
        </div>
    )
}

export default TaskSection
