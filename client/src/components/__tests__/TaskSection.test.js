import TaskSection from "../TaskSection";
import Task from "../Task";
import { render, fireEvent, waitFor } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

describe('Particular column in a kanban board.', () => {
    const formSubmit = jest.fn();

    const sectionData = {
        section_name: 'Test',
        section_id: 1
    };

    const tasks = {};
    
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Check that text values within section exist', () => {
        const {getByRole} = render(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        let values = getByRole('heading');
        expect(values.innerHTML).toBe('Test');
    });
    test('Check that nothing renders when there are no sections', () => {
        const sectionData = [];
        const {container} = render(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        let sectionDiv = container.querySelector('.task');
        expect(sectionDiv).toBeNull();
    });
    test('Check that section gets deleted when pressed', () => {
        const deleteSection = jest.fn(x => unmount());
        const {container, unmount} = render(<DragDropContext><TaskSection section={sectionData} tasks={tasks} deleteSection={deleteSection} editSection={formSubmit} /></DragDropContext>);
        let button = container.querySelector('.btn-times');
        expect(container.querySelector('.section')).toBeVisible();
        button.click();
        expect(container.querySelector('.section')).toBeNull();
    });
    test('Check that a task will get added when pressed', () => {
        const taskData = {
            task_name: 'test',
            task_description: 'this is a task testing whether things render',
            task_labels: 'testing',
            SectionSectionId: 1
        };

        const modalActive = jest.fn(x => render(<DragDropContext><Droppable key={0} droppableId={'1'}>{(provided) => (<div ref={provided.innerRef}><Task section={sectionData} task={taskData} index={0} /></div>)}</Droppable></DragDropContext>));
        const {container} = render(<DragDropContext><TaskSection section={sectionData} tasks={tasks} onAddModal={modalActive} editSection={formSubmit} /></DragDropContext>);
        let button = container.querySelector('.btn-plus');
        button.click();
        expect(modalActive.mock.results[0].value.baseElement).toBeVisible()
    });
    test('Check that double click on header element will change to input value', () => {
        const {getByRole, rerender} = render(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        const header = getByRole('heading');
        fireEvent.dblClick(header);
        rerender(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        expect(getByRole('textbox')).toBeVisible()
    });
    test('Check that invalid input will stop submit from happening', () => {
        window.alert = jest.fn();
        const {getByRole, rerender} = render(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        const header = getByRole('heading');
        fireEvent.dblClick(header);
        rerender(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        const text = getByRole('textbox');
        fireEvent.blur(text);
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(formSubmit).toHaveBeenCalledTimes(0);
    })
    test('Check that value can be inputted and submitted', () => {
        window.alert = jest.fn();
        const {getByRole, rerender} = render(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        const header = getByRole('heading');
        fireEvent.dblClick(header);
        rerender(<DragDropContext><TaskSection section={sectionData} tasks={tasks} editSection={formSubmit}/></DragDropContext>);
        const text = getByRole('textbox');
        fireEvent.change(text, {
            target: {
                value: 'Test'
            }
        });
        fireEvent.blur(text);
        expect(formSubmit).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledTimes(0);
    })
})