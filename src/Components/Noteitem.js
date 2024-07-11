import React from 'react'
import noteContext from "../context/notes/NoteContext"

const Noteitem = (props) => {

    const context = React.useContext(noteContext);

    const {deleteNote}=context;

    const { note,updateNote } = props;

    //If image src is broken then image wont be shown...
    const handleImageError = (event) => {
        event.target.style.display = 'none';
    };

    return (
        <>
            <div className='col-lg-4 col-md-6 col-sm-6 col-xs-3 my-3'>
                <div onError={handleImageError} className="card">
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Sucessfully","warning")}} style={{cursor:"pointer"}} className="fa-solid fa-trash-can"></i>
                        <i onClick={()=>{updateNote(note)}} style={{cursor:"pointer",marginLeft:"10px"}} className="fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
