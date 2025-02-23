import { useParams, Outlet, Navigate, useOutletContext } from "react-router-dom"
import { Note } from "./App"

export function NoteLayout ( {notes}: {notes: Note[]}) {
    console.log("params : ", useParams());
    const { id } = useParams();
    console.log("Notes : ", notes, id)
    const note = notes.find( note => note.id == id);

    if(note === null) return <Navigate to="/" replace/>;
    console.log("ans : ",note)
    return <Outlet context={note}/>
}

export function useNote() {
    return useOutletContext<Note>();
}