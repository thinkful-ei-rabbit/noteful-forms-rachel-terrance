import React from 'react';
import CircleButton from '../CircleButton/CircleButton'
import config from '../config';
import FormError from '../Errors/FormError'
import ApiContext from '../ApiContext';
import AddFolderOptions from './AddFolderOptions';
import IsRequired from './IsRequired';
import './AddNote.css';

import PropTypes from 'prop-types';



export default class AddNote extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
            name: {
                value: '',
                touched: false,
                disabling: true,

            },

            content: {
                value: '',
                touched: false,
                disabling: true,
            }

        }
    }

    updateName(name) {
        this.validateName();

        this.setState({
            name: {
                value: name,
                touched: true
            }
        })
    };

    updateContent(content) {

        this.validateContent();

        this.setState({
            content: {
                value: content,
                touched: true
            }
        })
    }


    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {

            if (this.state.name.disabling === false) {
                this.setState({
                    name: {
                        disabling: true
                    }
                })
            }

            return "Note must have title"

        } else if (name.length <= 2) {

            if (this.state.name.disabling === false) {
                this.setState({
                    name: {
                        disabling: true
                    }
                })
            }
            return "Title must be at least 3 characters long"
        } else {
            if (this.state.name.disabling === true) {
                this.setState({
                    name: {
                        disabling: false
                    }
                })
            }
        }
    }

    validateContent() {

        const content = this.state.content.value.trim();
        if (content.length === 0) {

            if (this.state.content.disabling === false) {
                this.setState({
                    conent: {
                        disabling: true
                    }
                })
            }

            return "Note must have some content"

        } else if (content.length < 3) {

            if (this.state.content.disabling === false) {
                this.setState({
                    conent: {
                        disabling: true
                    }
                })
            }

            return 'Note must be at least 3 characters long'

        } else {
            if (this.state.content.disabling === true) {
                this.setState({
                    conent: {
                        disabling: false
                    }
                })
            }
        }
    }



    handleForm = (e) => {

        const name = this.state.name.value;
        const content = this.state.content.value;
        const folder = this.context.folders.find(folder => folder.name === e.target.folderSelection.value);
        const date = new Date();


        const obj = {
            name,
            modified: date,
            folderId: folder.id,
            content

        };




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
                this.props.history.goBack();
            })
            .catch(err => console.log(err.message));
    }

    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();

        return (
            <form className="newNote" onSubmit={e => this.handleForm(e)}>
                <h2>Add a new note</h2>
                <label htmlFor="noteName">Name</label>
                <input
                    type="text"
                    className="registration__control"
                    name="noteName"
                    id="noteName"
                    placeholder="Name"
                    onChange={e => this.updateName(e.target.value)}
                />
                {!this.state.name.touched
                    ? <IsRequired />
                    : null}
                {this.state.name.touched && <FormError message={nameError} />}

                <label htmlFor="noteContent" className="inputDescription">Content</label>
                <input
                    type="text"
                    className="registration__control"
                    name="noteContent"
                    id="noteContent"
                    placeholder="Content"
                    onChange={e => this.updateContent(e.target.value)}
                />
                {!this.state.content.touched
                    ? <IsRequired />
                    : null}
                {this.state.content.touched && <FormError message={contentError} />}


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
                    disabled={
                        this.state.content.disabling || this.state.name.disabling
                            ? true
                            : false
                    }
                    input='Submit'

                />

            </form>

        )
    }


}
AddNote.propTypes = {
    history: PropTypes.object
}
