import Task from "../Task";
import { render, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom';

describe('Describes a particular task in a kanban board', () => {
    const taskData = {
        task_name: 'test',
        task_description: 'this is a task testing whether things render',
        task_labels: 'testing',
        SectionSectionId: 1
    }
    const sectionData = {
        section_id: 1
    }
    test('Check that text values within task are rendered when tasks exist', () => {
        const {getByRole, container} = render(<Task task={taskData} section={sectionData} />)
        let taskTitle = getByRole('heading')
        let taskDescription = container.querySelector('p')
        let taskLabel = container.querySelector('span')
        let taskDiv = container.querySelector('.task');
        expect(taskTitle.innerHTML).toBe('test')
        expect(taskDescription.innerHTML).toBe('this is a task testing whether things render')
        expect(taskLabel.innerHTML).toBe('testing')
        expect(taskDiv).toBeVisible();
    });
    test('Check that nothing renders when there are no tasks', () => {
        const taskData = {};
        const sectionData = {
            section_id: 1
        };

        const {container} = render(<Task task={taskData} section={sectionData} />)
        let taskDiv = container.querySelector('.task');
        expect(taskDiv).toBeNull();
    });
    test('Check that task is deleted when button is pressed', () => {
        const deleteTask = jest.fn(x => unmount());
        const {getByRole, container, unmount} = render(<Task task={taskData} section={sectionData} deleteTask={deleteTask}/>)
        let button = getByRole('button');
        expect(container.querySelector('.task')).toBeVisible();
        button.click();
        expect(container.querySelector('.task')).toBeNull();
    });
});