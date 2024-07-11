import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick = (e) => {
        
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added Successfully","success");
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <div style={{padding:"25px"}}>
        <div className='container my-4 glass' >
            <h1>Add a Note</h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" onChange={onChange} minLength={3} required className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" onChange={onChange} minLength={3} required className="form-control" value={note.description} id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" onChange={onChange} required className="form-control" value={note.tag} id="tag" name="tag" />
                </div>
                <button disabled={note.title.length<3 || note.description.length<3 || note.tag.length===0 } onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
    )
}

export default AddNote
