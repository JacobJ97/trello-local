import Button from './Button';
import React from 'react'

const TopBar = ({onAddModal, onSettingsModal, modalActive}) => {

    return (
        <div className="topbar">
            <Button iconText="plus" classText="btn btn-plus" onClick={() => onAddModal()} disabled={modalActive} />
            <Button iconText="cog" classText="btn btn-cog" onClick={() => onSettingsModal()} disabled={modalActive}/>
        </div>
    )
}

export default TopBar
