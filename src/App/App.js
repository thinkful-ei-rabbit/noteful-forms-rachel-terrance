import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import config from '../config';
import NoteError from '../Errors/NoteError';
import FolderError from '../Errors/FolderError'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`, {
                mode: 'no-cors'
            }),
            fetch(`${config.API_ENDPOINT}/folders`, {
                mode: 'no-cors'
            })
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({ notes, folders });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    handleAddFolder = folder => {
        this.setState({
            folders: [...this.state.folders, folder]
        })
    }

    handleAddNote = note => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" render={props => <NotePageNav history={props.history} />} />
                <Route path="/add-note" render={props => <NotePageNav history={props.history} />} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route
                    path="/add-folder"
                    render={props => <AddFolder history={props.history} />}
                />
                <Route
                    path="/add-note"
                    render={props => <AddNote history={props.history} />}
                />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,
            back: this.back
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <FolderError>
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    </FolderError>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <NoteError>
                        <main className="App__main">{this.renderMainRoutes()}</main>
                    </NoteError>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
