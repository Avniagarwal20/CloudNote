import React, { useContext ,useRef } from 'react';
import NoteContext from '../Context/Notes/NotesContext'; //

export default function NoteItem(props) {
  const noteContext = useContext(NoteContext); // Correct usage of useContext with NoteContext

  const { deleteNote} = noteContext; 
    
  const handleDel = ()=>{
    props.showAlert("You are going to delete Note","danger");
    ref3.current.click() ;
 }
 const handleEdit = ()=>{
       props.editNotes(props.note) ; 
       props.showAlert("You are going to Edit Note","danger");
     
 }
 const ref3 = useRef(null);
 const ref4 = useRef(null);
 const handleClick3 = ()=>{
  deleteNote(props.note._id);  
  ref4.current.click() ;
  props.showAlert("Deleted Note","success");
 }
  return (  
    <div style={{width: "24%"}} >
    <div>
    <button
      ref={ref3}
      type="button"
      className="btn btn-primary d-none "
      data-toggle="modal"
      data-target="#exampleModal2"
    >
     hello
    </button>

    <div
      className="modal fade"
      id="exampleModal2"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel2"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel2">
              You are going to delete this note 
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
         
          <div className="modal-footer">
            <button
              ref={ref4}
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleClick3}
              className="btn btn-primary"
            >
               Delete Note
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  <div className="card mx-1 my-1" >
    <div className="card-body">
      <h5 className="card-title">{props.note.title} </h5>
    
      <p className="card-text">{props.note.description}  </p>
      <i className="fa-solid fa-pen-to-square mx-2 my-2 " onClick = {handleEdit} ></i>
      <i className="fa-regular fa-trash-can mx-2 my-2 " onClick = {handleDel}></i>
    </div>
  </div>
 </div>
  )
}
