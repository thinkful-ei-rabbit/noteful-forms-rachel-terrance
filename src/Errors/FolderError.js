import React from 'react';
import './FolderError.css';

export default class NoteError extends React.Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(err) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <nav>
                    <h2>Your folders cannot be displayed</h2>
                </nav>
            );
        }

        return this.props.children;
    }

}