import AddSection from "../AddSection";
import { render, fireEvent, cleanup } from '@testing-library/react'; 
import '@testing-library/jest-dom';

describe('Form for adding a new section', () => {
    test('Check that inputs can change', () => {
        const {getByRole} = render(<AddSection />);
        const text = getByRole('textbox');
        expect(text.value).toBe('');
        fireEvent.change(text, {
            target: {
                value: 'testing'
            }
        });
        expect(text.value).toBe('testing');
    })
    test('Check that empty form throws alert and does not send', () => {
        window.alert = jest.fn();
        const {getByRole} = render(<AddSection />);
        const submitButton = getByRole('button')
        fireEvent.submit(submitButton);
        expect(window.alert).toHaveBeenCalledTimes(1);
        window.alert.mockClear();
    })
    test('Check that valid form submits', () => {
        const mockAddToDB = jest.fn();
        const mockMakeModalDisable = jest.fn();
        const {getByRole} = render(<AddSection modalVisible={mockMakeModalDisable} onAddSection={mockAddToDB} />);
        const text = getByRole('textbox');
        const submitButton = getByRole('button')
        fireEvent.change(text, {
            target: {
                value: 'testing'
            }
        });
        fireEvent.submit(submitButton)
        expect(mockAddToDB).toHaveBeenCalledTimes(1)
        expect(mockMakeModalDisable).toHaveBeenCalledTimes(1);
    })
})