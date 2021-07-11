import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import AddSection from './AddSection'
import AddTaskSection from './AddTaskSection'
import Settings from './Settings'

const Modal = ({sectionModal, settingsModal, tasksModal, modalVisible, title, onAddSection, onAddTask, sectionIDForTask}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <FontAwesomeIcon className="times" icon={faTimes} onClick={() => modalVisible()}/>
                </div>
                <div className="modal-body">
                    {sectionModal && (<AddSection modalVisible={modalVisible} onAddSection={onAddSection} />)}
                    {settingsModal && (<Settings modalVisible={modalVisible} />)}
                    {tasksModal && (<AddTaskSection modalVisible={modalVisible} onAddTask={onAddTask} sectionIDForTask={sectionIDForTask}/>)}
                </div>
            </div>    
        </div>
    )
}

export default Modal
