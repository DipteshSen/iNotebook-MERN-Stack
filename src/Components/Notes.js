import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem'
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    let navigate=useNavigate();

    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

    const handleClick = (e) => {
        //console.log('Updating..',note);
        refClose.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        e.preventDefault();
        props.showAlert("Updated Successfully","success");
        
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            navigate('/login')
        }
        
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        
        //console.log(currentNote);
        setNote({id:currentNote._id ,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag})
        

    }

    const ref = useRef(null);
    
    const refClose = useRef(null);

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" minLength={3} required value={note.etitle} onChange={onChange} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" minLength={3} required value={note.edescription} onChange={onChange} className="form-control" id="edescription" name="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" required value={note.etag} onChange={onChange} className="form-control" id="etag" name="etag" />
                                </div>
                    
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<3 || note.etag.length===0 } onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container glass' style={{ padding: "25px" }}>
                <h1>Your Notes</h1>
                <div className='row'>
                <div style={{color:"grey"}} className='container my-3 ml-3'>{notes.length===0 && "No Notes to display"}</div>
                    {notes.map((note) => {
                        return <Noteitem showAlert={props.showAlert} key={note._id} note={note} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
