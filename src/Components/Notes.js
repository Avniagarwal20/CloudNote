import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../Context/Notes/NotesContext"; // Correct import statement with correct case
import NoteItem from "./NoteItem";

export default function Notes(props) {
    const [Id, setId] = useState("");
  const noteContext = useContext(NoteContext); // Correct usage of useContext with NoteContext
  const [a, seta] = useState(""); 
  const [b, setb] = useState("");
  const [c, setc] = useState("");
  const { notes, getNotes, editNote } = noteContext; // Destructuring values from the context object
  useEffect(()=> {
    getNotes() ;
  }, []);

  const ref1 = useRef(0);
  const ref2 = useRef(0);
  const HandleOnChange2 = (e) => {
    // e.preventDefault(); 
    const { id, value } = e.target;

    if (id === "etitle") {
      seta(value);
    } else if (id === "edesc") {
      setb(value);
    } else if (id === "etag") {
      setc(value);
    }
  };
  const handleClick2 = async() => {
    
    await editNote(Id, a, b, c);
     ref2.current.click() ;
     props.showAlert("Edited Note","success");
  };
  const editNotes = async(note) => {
   setId(note._id); 
   seta(note.title); 
   setb(note.description); 
   setc(note.tag); 
       ref1.current.click() ;
  };
  return (
    <div className="row my-3 mt-5">
      {/* Modal start */}
      <div>
        <button
          ref={ref1}
          type="button"
          className="btn btn-primary d-none "
          data-toggle="modal"
          data-target="#exampleModal"
        >
         hello
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Title </label>
                    <input value = {a}
                      type="text"
                      className="form-control"
                      id="etitle"
                      aria-describedby="emailHelp"
                      placeholder="Enter Title"
                      onChange={HandleOnChange2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Description </label>
                    <input value = { b}
                      type="text"
                      className="form-control"
                      id="edesc"
                      aria-describedby="emailHelp"
                      placeholder="Enter Description"
                      onChange={HandleOnChange2}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1"> Tag </label>
                    <input value = { c}
                      type="text"
                      className="form-control"
                      id="etag"
                      aria-describedby="emailHelp"
                      placeholder="Enter Tag"
                      onChange={HandleOnChange2}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={ref2}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleClick2}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
      <h2>Your Notes</h2>
      { localStorage.getItem('token')&&  Array.isArray(notes) && notes.length > 0 && (notes && 
        notes.map((note) => {
          return <NoteItem key={note._id} note={note} editNotes={editNotes} showAlert = {props.showAlert}/>;
        }))}
    </div>
  );
}
