import React from 'react'
import moment from "moment"
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({id, date, title, body, url}) => {
    
    const dispatch = useDispatch();
    const noteDate = moment(date)
    
    const handleEntryClick = () => {
        dispatch(activeNote(id, {
            date, title, body, url
        }));
    }
    
    return (
        <div className="journal_entry pointer animate__animated animate__fadeIn animate__faster"
        onClick={handleEntryClick}
        >

            {
                (url) 
                    &&
                <div className="journal_entry-picture"
            style={
                {
                    backgroundSize: "cover",
                    backgroundImage: `url(${url})`,                  
                    
                }
            }
            ></div>
            }

            <div className="journal_entry-body"
            
            >
                <p className="journal_entry-title">
                    {title}
                </p>
                <p className="journal_entry-content">
                    {body}
                </p>
            </div>
            <div className="journal_entry-date-box">
                <span>{noteDate.format("dddd")}</span>
                <h4>{noteDate.format("Do")}</h4>
            </div>
        </div>
    )
}
