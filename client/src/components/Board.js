import React from 'react'
import TaskSections from './TaskSections'

const Board = ({sections, tasks, onAddModal, modalActive, deleteSection, deleteTask}) => {
    return (
        <div className="board">
            <TaskSections sections={sections} tasks={tasks} onAddModal={onAddModal} modalActive={modalActive} deleteSection={deleteSection} deleteTask={deleteTask} />
        </div>
    )
}

export default Board
