import   React , { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000/"
   
  
     const [notes, setNotes] = useState([]);
    //  console.log(NotesInitial); 
const getNotes = async()=>{
   try {
    const response = await fetch(`${host}api/notes/getnote`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token') ,
          },
    
      });
      const data =  await response.json();   
      if(data){
      setNotes(data);}
      
   } catch (error) {
    
   }
}
const addNote = async  (title,description,tag)=>{
   try {   const response = await fetch(`${host}api/notes/addnote`, {
    method: "POST", 
    headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token'),
      },
    body: JSON.stringify({ title,description,tag}), 
  });
  const data = await response.json();
  console.log(data);
   await  getNotes();
    
   } catch (error) {
    
   }
}
const deleteNote = async(id)=>{ 
    try {   
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
              },
            }
  
        ); 
        const data = await response.json(); 
           console.log(data);
     await getNotes();
         
    } catch (error) {
        
    }
}
const editNote = async (id,title,description,tag)=>{ 
    try {   const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({ title,description,tag}), 
      });
      const data = await response.json();
      console.log(data);
    await getNotes();
        
    } catch (error) {
        
    }
   
}
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;