import React, { useState } from "react";
import Note from "./Note";
import { getUUID } from "./../common";

function CreateArea() {
  const currentNote = {
    id: null,
    title: "",
    content: ""
  };
  const [note, setNote] = useState(currentNote);
  const [notes, setNotes] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const handleNote = { ...note, [name]: value };
    setNote(handleNote);
  };

  const addNote = (e) => {
    note.id = getUUID();
    const addedNote = [...notes, note];
    setNotes(addedNote);
    setNote(currentNote);
    e.preventDefault();
  };

  const deleteNote = (id) => {
    const deletedNote = notes.filter((note) => note.id !== id);
    setNotes([...deletedNote]);
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note.content}
        />
        <button type="submit">Add</button>
      </form>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onClickDelete={deleteNote}
        />
      ))}
    </div>
  );
}

export default CreateArea;
