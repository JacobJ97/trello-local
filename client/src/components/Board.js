import React from 'react';
import TaskSections from './TaskSections';
import { DragDropContext } from 'react-beautiful-dnd';


const Board = ({sections, tasks, onAddModal, modalActive, deleteSection, deleteTask, editSection, editTask, changeOrder, moveItem}) => {

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        removed.SectionSectionId = Number.parseInt(droppableDestination.droppableId);
        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if (source.index === destination.index) return;
            const items = reorder(tasks[source.droppableId], source.index, destination.index);
            changeOrder(source.droppableId, items, source.index, destination.index);
        } else {
            const result = move(tasks[source.droppableId], tasks[destination.droppableId], source, destination);
            moveItem(source.droppableId, destination.droppableId, result[source.droppableId], result[destination.droppableId], source.index, destination.index, destination.droppableId);
        }
    }
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board">
                <TaskSections sections={sections} tasks={tasks} onAddModal={onAddModal} modalActive={modalActive} deleteSection={deleteSection} deleteTask={deleteTask} editSection={editSection} editTask={editTask} />
            </div>
        </DragDropContext>
    )
}

export default Board
