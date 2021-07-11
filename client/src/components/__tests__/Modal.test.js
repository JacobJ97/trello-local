import Modal from "../Modal";
import App from "../../App";
import Button from "../Button";
import { render, fireEvent, cleanup } from '@testing-library/react'; 
import '@testing-library/jest-dom';

describe('Modal', () => {
    test('check that pressing "add section" button (i.e. passing true through prop) will activate modal with section form', () => {
        const {container, rerender} = render(<Modal sectionModel={false} />);
        expect(container.querySelector('.add-section-form')).toBe(null);
        rerender(<Modal sectionModal={true} />);
        expect(container.querySelector('.add-section-form')).toBeVisible();
    })
    test('check that pressing settings button (i.e. passing true through prop) will activate modal with settings form', () => {
        const {container, rerender} = render(<Modal sectionsModel={false} />);
        expect(container.querySelector('.add-section-form')).toBe(null);
        rerender(<Modal settingsModal={true} />);
        expect(container.querySelector('.settings-form')).toBeVisible();
    })
    test('check that pressing "add task" button (i.e. passing true through prop) will activate modal with task form', () => {
        const {container, rerender} = render(<Modal tasksModal={false} />);
        expect(container.querySelector('.add-section-form')).toBe(null);
        rerender(<Modal tasksModal={true} />);
        expect(container.querySelector('.add-task-form')).toBeVisible();
    })
    test('Check that button click will activate modal, and clicking the x symbol will deactivate it', () => {
        const {container} = render(<App />);
        expect(container.querySelector('.modal')).toBe(null)
        container.querySelector('.topbar .btn:nth-child(1)').click();
        expect(container.querySelector('.modal')).toBeVisible();
        const icon = container.querySelector(".times");
        fireEvent.click(icon);
        expect(container.querySelector('.modal')).toBe(null)
    });
})