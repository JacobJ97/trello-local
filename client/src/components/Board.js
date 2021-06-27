import React from 'react'
import TaskSections from './TaskSections'

const Board = ({sections, tasks, onAddModal, modalActive}) => {
    return (
        <div className="board">
            <TaskSections sections={sections} tasks={tasks} onAddModal={onAddModal} modalActive={modalActive} />
        </div>
    )
}

export default Board
