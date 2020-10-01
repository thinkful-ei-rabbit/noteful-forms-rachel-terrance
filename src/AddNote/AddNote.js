import React from 'react';
import CircleButton from '../CircleButton/CircleButton'
import config from '../config';
import FormError from '../Errors/FormError'
import ApiContext from '../ApiContext';
import AddFolderOptions from './AddFolderOptions';
import IsRequired from './IsRequired';
import './NotefulForm.css';

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
            title: {
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

    updatetitle(title) {
        this.validatetitle();

        this.setState({
            title: {
                value: title,
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


    validatetitle() {
        const title = this.state.title.value.trim();
        if (title.length === 0) {

            if (this.state.title.disabling === false) {
                this.setState({
                    title: {
                        disabling: true
                    }
                })
            }

            return "Note must have title"

        } else if (title.length <= 2) {

            if (this.state.title.disabling === false) {
                this.setState({
                    title: {
                        disabling: true
                    }
                })
            }
            return "Title must be at least 3 characters long"
        } else {
            if (this.state.title.disabling === true) {
                this.setState({
                    title: {
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
        e.preventDefault();

        const title = this.state.title.value;
        const content = this.state.content.value;
        //const folder = e.target.folderSelection.value.id;
        const folder = this.context.folders.find(folder => folder.title === e.target.folderSelection.value);
        const now = new Date();



        const obj = {
            title,
            content,
            folder: Number(folder.id),
        };

        const str = JSON.stringify(obj)


        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: str
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(note => {
                this.context.addNote({ ...obj, modified: now })
                this.props.history.push('/')
            })
            .catch(err => console.log(err.message));
    }

    render() {
        const titleError = this.validatetitle();
        const contentError = this.validateContent();

        return (
            <form classtitle="newNote" onSubmit={e => this.handleForm(e)}>
                <label htmlFor="notetitle">Title</label>
                <input
                    type="text"
                    classtitle="registration__control"
                    title="notetitle"
                    id="notetitle"
                    placeholder="title"
                    onChange={e => this.updatetitle(e.target.value)}
                />
                {!this.state.title.touched
                    ? <IsRequired />
                    : null}
                {this.state.title.touched && <FormError message={titleError} />}

                <label htmlFor="noteContent" classtitle="inputDescription">Content</label>
                <input
                    type="text"
                    classtitle="registration__control"
                    title="noteContent"
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
                    title="folderSelection"
                >
                    <AddFolderOptions folders={this.context.folders} />
                </select>

                <CircleButton
                    tag='button'
                    type='submit'
                    classtitle='AddFolder__add-folder-submit'
                    disabled={
                        this.state.content.disabling || this.state.title.disabling
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
