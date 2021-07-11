import Settings from "../Settings";
import { render, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom';

describe('Form for settings', () => {
    test('Ensure each input can be interacted and changed', () => {
        const {getByRole, getAllByRole} = render(<Settings />)
        const text = getByRole('textbox');
        const radioList = getAllByRole('radio');
        expect(text.value).toBe('');
        fireEvent.change(text, {
            target: {
                value: 'testing'
            }
        });
        expect(text.value).toBe("testing");
        //currently by default dark mode is selected
        expect(radioList[0]).toBeChecked();
        expect(radioList[1]).not.toBeChecked();
        fireEvent.click(radioList[1]);
        expect(radioList[0]).not.toBeChecked();
        expect(radioList[1]).toBeChecked();
        fireEvent.click(radioList[0]);
        expect(radioList[0]).toBeChecked();
        expect(radioList[1]).not.toBeChecked();
    });
    test('Test onsubmit form', () => {
        const mockMakeModalDisable = jest.fn();
        const {getByRole} = render(<Settings modalVisible={mockMakeModalDisable}/>);
        const submitButton = getByRole('button');
        fireEvent.submit(submitButton);
        expect(mockMakeModalDisable).toHaveBeenCalledTimes(1)
    })
})