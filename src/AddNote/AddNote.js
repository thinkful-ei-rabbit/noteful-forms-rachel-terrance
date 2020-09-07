import React from 'react';
import CircleButton from '../CircleButton/CircleButton'
import config from '../config';

import ApiContext from '../ApiContext';
import AddFolderOptions from './AddFolderOptions';
import './AddNote.css';




export default class AddNote extends React.Component {

    static contextType = ApiContext;




    handleForm = (e) => {
        e.preventDefault();

        const name = e.target.noteName.value;
        const content = e.target.noteContent.value;
        const folder = this.context.folders.find(folder => folder.name === e.target.folderSelection.value);

        const obj = {
            name: name,
            modified: new Date(),
            folderId: folder.id,
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
                if (res.ok) {
                    return res.json();

                } else {
                    return Promise.reject('Unable to fetch');
                }
            })
            .then(note => {
                this.context.addNote(note);
                this.props.history.push('/');
            })
            .catch(err => console.log(err.message));
    }

    render() {

        return (
            <form className="newNote" onSubmit={e => this.handleForm(e)} >
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
                <select
                    id="folderSelection"
                    name="folderSelection"
                >
                    <AddFolderOptions folders={this.context.folders} />
                </select>

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
}