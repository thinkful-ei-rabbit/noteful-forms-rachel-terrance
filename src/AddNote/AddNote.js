import React from 'react';
import CircleButton from '../CircleButton/CircleButton'
import config from '../config';

import ApiContext from '../ApiContext';
import AddFolderOptions from './AddFolderOptions';
import './AddNote.css';




export default function AddNote(props){

const handleForm = (e, addNote) => {
    e.preventDefault();

    const name = e.target.noteName.value;
    const content = e.target.noteContent.value;
    const folder= e.target.folderSection.value;

    const obj = {
        name: name,
        modified: "2019-01-03T00:00:00.000Z",
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        content: content

    }

    fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(res => {
            if(res.ok){
               return res.json();
                
            } else {
                return Promise.reject('Unable to fetch');
            }})
        .then(note => {
            addNote(note);
            props.history.push('/');
        })
        .catch(err => console.log(err.message));
}

return (
    <ApiContext.Consumer>
        {({addNote}) =>
    <form className="newNote" onSubmit={e => handleForm(e, addNote)} >
        <h2>Add a new note</h2>
        <label htmlFor="noteName">Name</label>
        <input
            type="text"
            className="registration__control"
            name="noteName"
            id="noteName"
        />
        
        <label htmlFor="noteContent" className="inputDescription">Content</label>
        <input
            type="text"
            className="registration__control"
            name="noteContent"
            id="noteContent"
        />
       

    <label htmlFor="folderSelection">Folder</label>
    <select id="folderSection" name="folderSection">
        <option value="one">One</option>
        <option value="two">Two</option>
        <option value="three">Three</option>
    </select>
        
{/* 
        <AddFolderOptions folders={folders} /> */}

       




        <CircleButton
            tag='button'
            type='submit'
            className='AddFolder__add-folder-submit'
            >
            Submit
      </CircleButton>
    </form>
}
    </ApiContext.Consumer>
)
}