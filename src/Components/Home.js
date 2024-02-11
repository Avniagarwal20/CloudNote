import React, { useContext ,useState ,useEffect} from 'react';
import NoteContext from '../Context/Notes/NotesContext'
import Notes from "./Notes"

import { useNavigate } from "react-router-dom";
export default function Home(props) { 
  let navigate = useNavigate();
  const [t, setT] = useState("");
  const [d, setD] = useState("");
  const [ta, setTa] = useState("");
  const noteContext = useContext(NoteContext); // Correct usage of useContext with NoteContext
    useEffect(() => {
      if(!localStorage.getItem('token')){
          navigate("/login");
      }
    }, [])
    
  const { addNote } = noteContext; // Destructuring values from the context object
  const handleClick =  ()=>{
     addNote(t,d,ta); 
     props.showAlert("Added Note","success");
     setT("");
     setD("");
     setTa(""); 
  }
  const HandleOnChange = (e)=>{
    const { id, value } = e.target;

    if (id === 'title') {
      setT(value); 
    } else if (id === 'desc') {
      setD(value); 
    } else if (id === 'tag') {
      setTa(value); 
    }
  }
  return ( 
     <div className="container">
    <form className="mt-3">
    <div className="form-group ">
      <label htmlFor= "exampleInputEmail1"> Title  </label>
      <input value = {t}type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange = { HandleOnChange}/>
     
    </div>
    <div className="form-group">
      <label htmlFor= "exampleInputEmail1"> Description </label>
      <input value = {d}type="text" className="form-control" id="desc" aria-describedby="emailHelp" placeholder="Enter Description" onChange = { HandleOnChange}/>
     
    </div>
    <div className="form-group">
      <label htmlFor= "exampleInputEmail1"> Tag </label>
      <input value = {ta} type="text" className="form-control" id="tag" aria-describedby="emailHelp" placeholder="Enter Tag" onChange = { HandleOnChange}/>
     
    </div>
       
    <button disabled = {t.length<3 || d.length<3 || ta.length<1 }type="button" className="btn btn-primary mx-2 my-2 " onClick = {handleClick}>Add Note</button>
  </form>

     
    <Notes showAlert = {props.showAlert}/>
  </div>
  )
}

