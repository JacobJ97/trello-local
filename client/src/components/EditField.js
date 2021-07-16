import React from 'react'

const EditSectionTask = ({className, onSubmit, value, placeholder, onChange}) => {
    return (
        <form className={className} onSubmit={onSubmit}>
            <div className="form-control">
                <input type="text" onBlur={(e) => e.target.form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })) } value={value} placeholder={placeholder} onChange={onChange} />
            </div>
        </form>

    )
}

export default EditSectionTask
