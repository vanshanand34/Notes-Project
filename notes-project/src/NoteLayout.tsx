import { useParams, Outlet, Navigate, useOutletContext } from "react-router-dom"
import { Note } from "./App"

export function NoteLayout({ notes }: { notes: Note[] }) {

    const { id } = useParams();
    const note = notes.find(note => note.id == id);

    if (note === null) return <Navigate to="/" replace />;

    return <Outlet context={note} />
}

export function useNote() {
    return useOutletContext<Note>();
}