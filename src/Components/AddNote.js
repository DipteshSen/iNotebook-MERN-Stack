import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote]=useState({title:"",description:"",tag:"default"})

    const handleClick = (e) => {
        
        e.preventDefault();
        addNote(note.title,note.description,e.tag);
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <div className='container my-4 glass'>
            <h1>Add a Note</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" onChange={onChange} className="form-control" id="title" name="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" onChange={onChange} className="form-control" id="description" name="description" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddNote
