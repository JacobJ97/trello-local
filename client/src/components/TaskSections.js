import React from 'react'
import TaskSection from './TaskSection'

const TaskSections = ({sections, tasks, onAddModal, modalActive}) => {
    return (
        <div className="sections">
            {
                //.map function
                sections.map((section) =>
                    <TaskSection key={section.section_id} section={section} tasks={tasks} onAddModal={onAddModal} modalActive={modalActive} />
                )
            }
        </div>
    )
}

export default TaskSections
