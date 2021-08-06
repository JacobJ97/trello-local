import TopBar from "../TopBar";
import { render, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom';
import TaskSection from "../TaskSection";
import Modal from "../Modal";
import { DragDropContext } from 'react-beautiful-dnd';

describe('the top section of the app', () => {
    test('Checking action for adding a new section to the kanban board', () => {
        const sectionData = {
            section_name: 'test',
            section_id: 1
        };

        jest.mock('react-beautiful-dnd', () => ({
            Droppable: ({ children }) => children({
              draggableProps: {
                style: {},
              },
              innerRef: jest.fn(),
            }, {}),
            Draggable: ({ children }) => children({
              draggableProps: {
                style: {},
              },
              innerRef: jest.fn(),
            }, {}),
            DragDropContext: ({ children }) => children,
        }));

        const taskData = [];

        const addModal = jest.fn(x => render(<DragDropContext><TaskSection section={sectionData} tasks={taskData} /></DragDropContext>));
        const {container} = render(<TopBar onAddModal={addModal} />);
        let button = container.querySelector('.btn-plus');
        button.click();
        expect(addModal.mock.results[0].value.baseElement).toBeVisible()
    });
    test('Checking action for settings to the kanban board', () => {
        const onSettingsModal = jest.fn(x => render(<Modal title="Settings" settingsModal={true} />));
        const {container} = render(<TopBar onSettingsModal={onSettingsModal} />);
        let button = container.querySelector('.btn-cog');
        button.click();
        expect(onSettingsModal.mock.results[0].value.baseElement).toBeVisible()
    })
})