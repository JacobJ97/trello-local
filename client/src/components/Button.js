import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Button = ({iconText, classText, onClick, disabled}) => {
    return (
        <button className={classText} onClick={onClick} disabled={disabled}><FontAwesomeIcon icon={iconText}/></button>
    )
}

export default Button
