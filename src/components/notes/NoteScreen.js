import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes)
    const [values, handleInputChange, reset] = useForm(note)
    
    const {body, title, id} = values

    const activeId = useRef( note.id )

    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(values.id, {...values}))
        
    }, [values, dispatch])

    const handleDelete = () => {
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes_main-content">
            <NotesAppBar />

            <div className="notes_content">
                <input 
                type="text"
                placeholder="Another awsome title"
                className="notes_title-input"
                autoComplete="off"
                value = {title}
                onChange = {handleInputChange}
                name="title"
                />

                <textarea
                placeholder="What happened today"
                className="notes_textarea"
                value={body}
                onChange={handleInputChange}
                name="body"
                >
                </textarea>

                {
                note.url &&
                <div className="notes_image">
                    <img 
                    src={note.url}
                    alt="Imagen"
                    height= "150px"
                    />
                </div>
                }
            </div>
            <button className="btn btn-danger"
            onClick={handleDelete}
            >
                    Delete
            </button>
        </div>
    )
}
