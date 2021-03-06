import ButtonModal from './ButtonModal';
import { useState } from 'react'

const Settings = ({modalVisible}) => {

    const [title, setTitle] = useState('');
    const [background, setBackground] = useState('dark');

    const onSubmit = (e) => {
        e.preventDefault();
        modalVisible();
    }

    return (
        <div>
            <form id="settings-form" className="form settings-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <input type="text" value={title} placeholder="Board Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-control">
                    <input type="radio" name="background" value="dark" onChange={(e) => setBackground(e.target.value)} checked={background === "dark"}/> 
                    <label>Dark</label>
                    <input type="radio" name="background" value="light" onChange={(e) => setBackground(e.target.value)} checked={background === "light"} />
                    <label>Light</label>
                </div>
                <ButtonModal form="settings-form" type="submit" className="btn btn-block" />
            </form>
        </div>
    )
}

export default Settings
