import React from 'react'

const ButtonModal = ({form, type, className}) => {
    return (
        <button className={"btn-modal " + className} form={form} type={type}>Submit</button>
    )
}

export default ButtonModal
