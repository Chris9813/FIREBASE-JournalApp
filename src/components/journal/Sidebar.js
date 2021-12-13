import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { noteLogout, startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';


export const Sidebar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(noteLogout());
    }
    
    const {name} = useSelector(state => state.auth)
    const nameSort = name.split(" ")[0]

    const handleAddNew = () => {
        dispatch(startNewNote());
    }

    return (
        <div className="journal_sidebar">
            <div className = "journal_sidebar-navbar">
                <h3 className="mt-5">
                    <i className ="far fa-moon"></i>
                    <span>{nameSort}</span>
                </h3>
                <button
                className="btn"
                onClick={handleLogout}
                >Logout</button>
                
            </div>
            <div className="journal_new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
            <p
            className="mt-5"
            >New entry</p>
            </div>
            <JournalEntries />
        </div>
    )
}
