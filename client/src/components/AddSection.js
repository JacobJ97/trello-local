import { useState } from 'react'

const AddSection = ({modalVisible, onAddSection}) => {
    const [section, setSection] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        if (!section) {
            alert('Field cannot be empty.')
            return;
        }

        onAddSection({ section });

        setSection('');
        modalVisible();
    }

    return (
        <form id="add-section-form" className="form add-section-form" onSubmit={onSubmit}>
            <div className="form-control">
                <input type="text" value={section} placeholder="Section Name" onChange={(e) => setSection(e.target.value)} />
            </div>
        </form>
    )
}

export default AddSection
