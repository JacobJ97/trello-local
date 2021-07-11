import ButtonModal from './ButtonModal';
import { useState } from 'react'

const AddTaskSection = ({modalVisible, onAddTask, sectionIDForTask}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [labels, setLabels] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert('Fields cannot be empty.')
            return;
        }

        onAddTask({ title, description, labels, sectionIDForTask });

        setTitle('');
        setDescription('');
        setLabels('');
        modalVisible();
    }

    return (
        <div>
            <div>
            <form id="add-task-form" className="form add-task-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-control">
                    <input type="textarea" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-control">
                    <input type="text" value={labels} placeholder="Labels" onChange={(e) => setLabels(e.target.value)} />
                </div>
                <ButtonModal form="add-task-form" type="submit" className="btn btn-block" />
            </form>
        </div>
        </div>
    )
}

export default AddTaskSection
