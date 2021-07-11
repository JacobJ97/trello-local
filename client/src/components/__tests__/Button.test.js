import App from "../../App";
import Button from "../Button";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { faCog } from '@fortawesome/free-solid-svg-icons'

describe('Buttons', () => {
    test('Button is not disabled by default', () => {
        const mockClick = jest.fn();
        const {getByRole} = render(<Button iconText={faCog} disabled={false} onClick={() => mockClick()} />);
        const button = getByRole("button");
        expect(button).not.toBeDisabled();
    });
    test('Button disables itself after being clicked', () => {
        const mockClick = jest.fn();
        const {getByRole} = render(<Button iconText={faCog} disabled={false} onClick={() => mockClick()} />);
        const button = getByRole("button");
        //in the application, clicking button will disable it (along with every other button - test will be below)
        fireEvent.click(button)
        button.setAttribute('disabled', true)

        expect(mockClick).toHaveBeenCalledTimes(1);
        expect(button).toBeDisabled();
    })
    test('Clicking one button will disable all ', () => {
        const { container } = render(<App />);
        let buttons = container.querySelectorAll(".btn-main");
        //check that each relevant button is enabled
        buttons.forEach((button) => {
            expect(button).not.toBeDisabled();
        })
        //press a single button (any relevant button would work)
        buttons[0].click();
        //check that each relevant button is disabled
        buttons.forEach((button) => {
            expect(button).toBeDisabled();
        })
        
    })

})