import Button from './Button';
import React from 'react'
import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons'

const TopBar = ({onAddModal, onSettingsModal, modalActive}) => {

    return (
        <div className="topbar">
            <Button iconText={faPlus} classText="btn btn-plus" onClick={() => onAddModal()} disabled={modalActive} />
            <Button iconText={faCog} classText="btn btn-cog" onClick={() => onSettingsModal()} disabled={modalActive}/>
        </div>
    )
}

export default TopBar
