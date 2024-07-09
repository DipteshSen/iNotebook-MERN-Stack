import React,{useContext} from 'react'
import noteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem'
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;

    return (
        <>
        <AddNote/>
        <div className='container'>
            <h1>Your Notes</h1>
            <div className='row'>
            {notes.map((note) => {
                return <Noteitem key={note._id} note={note}/>
            })}
            </div>
        </div>
        </>
    )
}

export default Notes
