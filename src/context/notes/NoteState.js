import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = 'http://localhost:5000';

  const notesInitial = [
    {
      "_id": "6687ec59e65c3be5ce642100",
      "user": "66874a46c799c95a1d458dd4",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-07-05T12:51:37.117Z",
      "__v": 0
    },
    {
      "_id": "668a3da52028469a6ee58081",
      "user": "66874a46c799c95a1d458dd4",
      "title": "One Piece",
      "description": "Kaizoku oni orewa naru",
      "tag": "personal",
      "date": "2024-07-07T07:03:01.669Z",
      "__v": 0
    },
    {
      "_id": "668a3dbb2028469a6ee58083",
      "user": "66874a46c799c95a1d458dd4",
      "title": "Naruto",
      "description": "Orewa Hokage ni naru otoko da",
      "tag": "personal",
      "date": "2024-07-07T07:03:23.645Z",
      "__v": 0
    },
    {
      "_id": "668a3dcd2028469a6ee58085",
      "user": "66874a46c799c95a1d458dd4",
      "title": "Gintama",
      "description": "All random things keep heppening",
      "tag": "personal",
      "date": "2024-07-07T07:03:41.159Z",
      "__v": 0
    }
  ]


  const [notes, setNotes] = useState(notesInitial)


  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const url = `${host}/api/notes/addnote`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NzRhNDZjNzk5Yzk1YTFkNDU4ZGQ0In0sImlhdCI6MTcyMDE1NjE1OH0.Zzo-D3ztOshNm1axVqM1GG7F5amnLEFshseoI0IjNTg",

        },
        body: JSON.stringify({title, description, tag })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      //console.log(json);
    } catch (error) {
      console.error(error.message);
    }

    //Logic for adding a note
    console.log('Adding new note');
    const note = {
      "_id": "6687ec59e7765c3be5ce642100",
      "user": "66874a46c799c95a1d458dd4",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-07-05T12:51:37.117Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = async (id) => {

    //API Call
    const url = `${host}/api/notes/updatenote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NzRhNDZjNzk5Yzk1YTFkNDU4ZGQ0In0sImlhdCI6MTcyMDE1NjE1OH0.Zzo-D3ztOshNm1axVqM1GG7F5amnLEFshseoI0IjNTg",

        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      //console.log(json);
    } catch (error) {
      console.error(error.message);
    }

    //Logic for deleting a note
    console.log("Deleting the note " + id);
    const newNotes = notes.filter((note) => (note._id !== id));
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = async (id, title, description, tag) => {

    //API Call
    const url = `${host}/api/notes/updatenote/${id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NzRhNDZjNzk5Yzk1YTFkNDU4ZGQ0In0sImlhdCI6MTcyMDE1NjE1OH0.Zzo-D3ztOshNm1axVqM1GG7F5amnLEFshseoI0IjNTg",

        },
        body: JSON.stringify({title, description, tag })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      //console.log(json);
    } catch (error) {
      console.error(error.message);
    }


    //Logic for updating the note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        setNotes([...notes]);
        break;
      }

    }
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;