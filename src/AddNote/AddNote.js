import React from 'react';
import CircleButton from './CircleButton';


export default function AddNote(){

const handleForm = e =>{
    e.preventDefault();
}

return (
    <form className="newNote" onSubmit={e => handleForm(e)} >
        <h2>Add a new note</h2>
        <label htmlFor="noteName">Name</label>
        <input
            type="text"
            className="registration__control"
            name="noteName"
            id="noteName"
        />
        
        <label htmlFor="noteContent">Content</label>
        <input
            type="text"
            className="registration__control"
            name="noteContent"
            id="noteContent"
        />
       
       <label htmlFor="noteContent">Content</label>
        <input
            type="text"
            className="registration__control"
            name="noteContent"
            id="noteContent"
        />

    <label htmlFor="folderSelection">Content</label>
        <input
            type="text"
            className="registration__control"
            name="folderSelection"
            id="folderSelection"
        />
        <CircleButton
            tag='button'
            type='submit'
            className='AddFolder__add-folder-submit'
            >
            Submit
      </CircleButton>
    </form>
)
}