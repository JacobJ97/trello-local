import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const Button = ({iconText, classText, onClick, disabled}) => {
    return (
        <button className={classText} onClick={onClick} disabled={disabled}><FontAwesomeIcon icon={iconText === 'plus' ? faPlus : faCog}/></button>
    )
}

export default Button
