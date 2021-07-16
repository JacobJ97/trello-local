import React from 'react'
import TaskSections from './TaskSections'

const Board = ({sections, tasks, onAddModal, modalActive, deleteSection, deleteTask, editSection, editTask}) => {
    return (
        <div className="board">
            <TaskSections sections={sections} tasks={tasks} onAddModal={onAddModal} modalActive={modalActive} deleteSection={deleteSection} deleteTask={deleteTask} editSection={editSection} editTask={editTask} />
        </div>
    )
}

export default Board
