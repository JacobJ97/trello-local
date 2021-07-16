import Task from "../Task";
import { render, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom';

describe('Describes a particular task in a kanban board', () => {
    const onSubmit = jest.fn();
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
    test('Check that double click on header element will change to input value', () => {
        const {getByRole, getByText, getAllByRole} = render(<Task section={sectionData} task={taskData} editTask={onSubmit}/>);
        const header = getByRole('heading');
        const text = getByText('this is a task testing whether things render');
        const label = getByText('testing');
        fireEvent.dblClick(header);
        fireEvent.dblClick(text);
        fireEvent.dblClick(label);
        const textboxs = getAllByRole('textbox');
        textboxs.forEach(textbox => expect(textbox).toBeVisible());
    });
    test('Check that invalid input will stop submit from happening', () => {
        window.alert = jest.fn();
        const {getByRole, getByText, getAllByRole} = render(<Task section={sectionData} task={taskData} editTask={onSubmit}/>);
        const header = getByRole('heading');
        const desc = getByText('this is a task testing whether things render');
        const label = getByText('testing');
        fireEvent.dblClick(header);
        fireEvent.dblClick(desc);
        fireEvent.dblClick(label);
        const textboxs = getAllByRole('textbox');
        textboxs.forEach((textbox) => {
            fireEvent.blur(textbox);
            expect(window.alert).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenCalledTimes(0);
            jest.clearAllMocks();
        });
    });
    test('Check that value can be inputted and submitted', () => {
        window.alert = jest.fn();
        const {getByRole, getByText, getAllByRole} = render(<Task section={sectionData} task={taskData} editTask={onSubmit}/>);
        const header = getByRole('heading');
        const desc = getByText('this is a task testing whether things render');
        const label = getByText('testing');
        fireEvent.dblClick(header);
        fireEvent.dblClick(desc);
        fireEvent.dblClick(label);
        const textboxs = getAllByRole('textbox');
        textboxs.forEach((textbox) => {
            fireEvent.change(textbox, {
                target: {
                    value: 'bigTesting'
                }
            })
            fireEvent.blur(textbox);
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(window.alert).toHaveBeenCalledTimes(0);
            jest.clearAllMocks();
        });
    })
});