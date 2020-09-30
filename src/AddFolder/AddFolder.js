import React, { Component } from 'react';
import CircleButton from '../CircleButton/CircleButton'
import config from '../config';
import './AddFolder'
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';




class AddFolder extends Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            folder: {
                touched: false,
                value: ''
            }

        }
    }

    updateFolder(folder) {
        this.setState({
            folder: {
                value: folder,
                touched: true
            }
        })
    }

    validateFolder() {
        const folder = this.state.folder.value.trim();
        if (folder.length === 0) {
            return "New folders need to have names"
        } else if (folder.length <= 2) {
            return "Folder name must be at least three characters long"
        }
    }

    handleForm = (e) => {
        e.preventDefault();

        const title = e.target.folder.value;


        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })

        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                } else {
                    return Promise.reject('Unable to fetch');
                }
            })
            .then(folder => {
                this.context.addFolder(folder);
                this.props.history.push('/');

            })
            .catch(err => console.log(err));

    }

    render() {

        return (

            <form className="newFolder" onSubmit={e => this.handleForm(e)} >
                <h2>Add a new folder</h2>
                <label htmlFor="folder">Folder name</label>
                <input
                    type="text"
                    className="registration__control"
                    name="folder"
                    id="folder"
                    onChange={e => this.updateFolder(e.target.value)}
                />

                <CircleButton
                    type='submit'
                    className='AddFolder__add-folder-submit'
                    input='Submit'

                >
                    Submit
          </CircleButton>

            </form >
        )
    }
}

export default AddFolder;

AddFolder.propTypes = {
    history: PropTypes.object
}
