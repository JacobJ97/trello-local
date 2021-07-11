import TaskSection from "../TaskSection";
import Task from "../Task";
import { render, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom';

describe('Particular column in a kanban board.', () => {
    const sectionData = {
        section_name: 'Test',
        section_id: 1
    };
    const tasks = [];

    test('Check that text values within section exist', () => {
        const {getByRole} = render(<TaskSection section={sectionData} tasks={tasks} />);
        let values = getByRole('heading');
        expect(values.innerHTML).toBe('Test');
    });
    test('Check that nothing renders when there are no sections', () => {
        const sectionData = [];
        const {container} = render(<TaskSection section={sectionData} tasks={tasks} />);
        let sectionDiv = container.querySelector('.task');
        expect(sectionDiv).toBeNull();
    });
    test('Check that section gets deleted when pressed', () => {
        const deleteSection = jest.fn(x => unmount());
        const {container, unmount} = render(<TaskSection section={sectionData} tasks={tasks} deleteSection={deleteSection} />);
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

        const modalActive = jest.fn(x => render(<Task section={sectionData} task={taskData} />));
        const {container} = render(<TaskSection section={sectionData} tasks={tasks} onAddModal={modalActive} />);
        let button = container.querySelector('.btn-plus');
        button.click();
        expect(modalActive.mock.results[0].value.baseElement).toBeVisible()
    });
})