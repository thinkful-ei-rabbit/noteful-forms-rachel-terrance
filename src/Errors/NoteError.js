import React, { Component } from 'react';
import './NoteError.css';

export default class NoteError extends Component {
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
                <main className='error__main'>
                    <h2>Notes cannot be displayed</h2>
                </main>
            );
        }

        return this.props.children;
    }

}