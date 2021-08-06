import React from 'react'
import TaskSection from './TaskSection'

const TaskSections = ({sections, tasks, onAddModal, modalActive, deleteSection, deleteTask, editSection, editTask}) => {
    return (
        <div className="sections">
            {
                //.map function
                sections.map((section) =>
                    <TaskSection key={section.section_id} section={section} tasks={tasks} onAddModal={onAddModal} modalActive={modalActive} deleteSection={deleteSection} deleteTask={deleteTask} editSection={editSection} editTask={editTask} />
                )
            }
        </div>
    )
}

export default TaskSections
