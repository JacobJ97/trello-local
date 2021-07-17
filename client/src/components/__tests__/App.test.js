import App from '../../App';
import { render, fireEvent, waitFor, findByText } from '@testing-library/react'; 
import '@testing-library/jest-dom';

const sections = [{
    section_id: 1,
    section_name: 'section'
}];

const tasks = [{
    task_id: 1,
    task_name: 'task',
    task_description: 'this is the description',
    task_labels: 'label',
    SectionSectionId: 1
}]

describe('testing GET fetch functions + button interactivity', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce(tasks)
        });
    })

    test('value is returned when fetching a section with task from api', async () => {
        const {findByText} = render(<App />);
        let section = await findByText('section');
        let task = await findByText('task');
        expect(section.innerHTML).toBe('section');
        expect(task.innerHTML).toContain('task');
    });
    test('testing that clicking plus button on topbar brings up modal', async () => {
        const {findAllByRole, findByText} = render(<App />);
        let buttons = await findAllByRole('button');
        //first instance will be adding section
        buttons[0].click();
        let section = await findByText('Add Section');
        expect(section.innerHTML).toContain('Add Section')
    })
    test('testing that clicking cog button on topbar brings up modal', async () => {
        const {findAllByRole, findByText} = render(<App />);
        let buttons = await findAllByRole('button');
        //second instance will be the settings
        buttons[1].click();
        let section = await findByText('Settings');
        expect(section.innerHTML).toContain('Settings')
    })
    test('testing that clicking cog button topbar brings up modal', async () => {
        const {findAllByRole, findByText} = render(<App />);
        await findAllByRole('button');
        let buttons2 = await findAllByRole('button');
        //third instance will be adding task
        buttons2[2].click();
        let section = await findByText('Add Task');
        expect(section.innerHTML).toContain('Add Task')
    });
});

describe('mocking fetch rest POST functions', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('POST function for Section component', async () => {
        const addedSection = {
            section_id: 2,
            section_name: 'test2'
        }

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce(tasks).mockResolvedValueOnce(addedSection)
        });

        const {findAllByRole, findByText, findByRole } = render(<App />);
        let buttons = await findAllByRole('button');
        buttons[0].click();
        const text = await findByRole('textbox')
        const submitButton = await findByText('Submit')
        fireEvent.change(text, {
            target: {
                value: 'testing'
            }
        });
        submitButton.click();
        let newSection = await findByText('test2')
        waitFor(() => expect(newSection.innerHTML).toContain('test2'));
    })
    test('POST function for Task component', async () => {
        const addedTask = {
            task_id: 2,
            task_name: 'test2',
            task_description: 'test desc',
            task_label: 'testing',
            SectionSectionId: 1
        }

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce(tasks).mockResolvedValueOnce(addedTask)
        });

        const { findAllByRole, findByText, getByText } = render(<App />);
        /**
         * onload, react loads all section/tasks that currently exist. However in this test it doesn't seem to finish doing that before trying to find all buttons on page.
         * Since this test is a combination of user interaction and actual functionality, adding a timeout await statement here to ensure everything finishes loading. A
         * user is not going to interact with any object unless it has already been loaded.
         */
        await new Promise((r) => setTimeout(r, 500))
        const buttons = await findAllByRole('button');
        buttons[2].click();
        const texts = await findAllByRole('textbox')
        const submitButton = getByText('Submit')
        texts.forEach((text, i) => {
            fireEvent.change(text, {
                target: {
                    value: Object.values(addedTask)[i+1]
                }
            });
        });
        submitButton.click();
        let newTask = await findByText('test2')
        waitFor(() => expect(newTask.innerHTML).toContain('test2'));
    });
});

describe('mocking fetch DELETE requests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('DELETE section item', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce(tasks).mockResolvedValueOnce("SUCCESSFUL")
        });

        const { findAllByRole, findByText } = render(<App />);
        await new Promise((r) => setTimeout(r, 500))
        const buttons = await findAllByRole('button');
        buttons[3].click();
        let section = await findByText('section');
        waitFor(() => expect(section).toBeNull())
    });

    test('DELETE task item', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce(tasks).mockResolvedValueOnce("SUCCESSFUL")
        });

        const { findAllByRole, findByText } = render(<App />);
        await new Promise((r) => setTimeout(r, 500))
        const buttons = await findAllByRole('button');
        buttons[4].click();
        let task = await findByText('task');
        waitFor(() => expect(task).toBeNull())
    });
});

describe('mocking fetch PUT requests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Edit title for section item', async () => {
        const sections = [{
            section_id: 1,
            section_name: 'section'
        }, {
            section_id: 2,
            section_name: 'sect2'
        }];

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce(tasks).mockResolvedValueOnce("SUCCESSFUL")
        });

        const { findAllByRole, findByRole } = render(<App />);
        const title = await findAllByRole('heading');
        fireEvent.dblClick(title[0]);
        const text = await findByRole('textbox')
        fireEvent.change(text, {
            target: {
                value: 'Test'
            }
        });
        fireEvent.blur(text);
        const titleUpdated = await findAllByRole('heading');
        waitFor(() => expect(titleUpdated[0].innerHTML).toContain('Test'))
    });
    test('Edit values for task item', async () => {
        const tasks = [{
            task_id: 1,
            task_name: 'task',
            task_description: 'this is the description',
            task_labels: 'label',
            SectionSectionId: 1
        }, {
            task_id: 2,
            task_name: 'tas2',
            task_description: 'this the desc2',
            task_labels: 'lab2',
            SectionSectionId: 1
        }];

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValueOnce(sections).mockResolvedValueOnce(tasks).mockResolvedValueOnce("SUCCESSFUL")
        });

        const { findByText, findAllByRole, findAllByText} = render(<App />);
        const title = await findByText('task');
        const desc = await findByText('this is the description');
        const label = await findByText('label');
        fireEvent.dblClick(title);
        fireEvent.dblClick(desc);
        fireEvent.dblClick(label);
        const textboxes = await findAllByRole('textbox');
        for (let i = 0; i < textboxes.length; i++) {
            let textbox = textboxes[i];
            fireEvent.change(textbox, {
                target: {
                    value: 'TestUpdate'
                }
            });
            fireEvent.blur(textbox);
            const textboxUpdateAll = await findAllByText('TestUpdate');
            textboxUpdateAll.forEach((textboxUpdate) => {
                expect(textboxUpdate.innerHTML).toContain('TestUpdate');
            })
        }
    });
});