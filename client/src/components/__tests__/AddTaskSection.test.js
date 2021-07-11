import AddTaskSection from "../AddTaskSection";
import { render, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom';

describe('Form for adding a task to a specific section', () => {
    test('Check that inputs can change', () => {
        const {getAllByRole} = render(<AddTaskSection />)
        const texts = getAllByRole('textbox');
        texts.forEach((text) => {
            expect(text.value).toBe("")
            fireEvent.change(text, {
                target: { 
                    value: 'testing'
                } 
            })
            expect(text.value).toBe("testing")
        });
    });
    test('Check that empty form throws alert and does not send', () => {
        window.alert = jest.fn();
        const {getByRole} = render(<AddTaskSection />);
        const submitButton = getByRole('button')
        fireEvent.submit(submitButton);
        expect(window.alert).toHaveBeenCalledTimes(1);
        window.alert.mockClear();
    })
    test('Check that valid form submits', () => {
        const mockAddToDB = jest.fn();
        const mockMakeModalDisable = jest.fn();
        const {getByRole, getAllByRole} = render(<AddTaskSection modalVisible={mockMakeModalDisable} onAddTask={mockAddToDB} />);
        const texts = getAllByRole('textbox');
        texts.forEach((text) => {
            fireEvent.change(text, {
                target: {
                    value: 'testing'
                }
            });
        });
        const submitButton = getByRole('button')
        fireEvent.submit(submitButton)
        expect(mockAddToDB).toHaveBeenCalledTimes(1)
        expect(mockMakeModalDisable).toHaveBeenCalledTimes(1);
    })
})