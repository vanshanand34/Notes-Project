// import { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import NewPage from './New'
import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Container } from 'react-bootstrap';
import EditPage from './EditPage';
import { NoteLayout } from './NoteLayout';
import { Note } from './Note';


export type Tag = {
  id: string,
  label: string
}

export type NotesData = {
  title: string,
  body: string,
  tags: Tag[]
}

export type RawNoteData = {
  title: string,
  body: string,
  tagIds: string[]
}

export type RawNote = {
  id: string
} & RawNoteData

export type Note = {
  id: string,
} & NotesData


function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => addTags(notes), [notes, tags]);

  function addTags(notes: RawNote[]) {
    return notes.map(
      note => {
        return {
          ...note,
          // filtering tags of this note from all tags
          tags: tags.filter(
            tag => note.tagIds.includes(tag.id)
          )
        }
      }
    )
  }

  // console.log(notesWithTags);
  // setTags([]);

  function handlecreateNote({ tags, ...data }: NotesData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: Date.now().toString(), tagIds: tags.map(tag => tag.id) }
      ]
    })
  }

  function handleUpdateNote(id: string, { tags, ...data }: NotesData) {
    setNotes(prevNotes => {
      return (
        prevNotes.map(note => {
          if(note.id === id){
            return {...note, ...data, tagIds: tags.map(tag => tag.id)}
          }else{
            return note
          }
        })
      )
    })
  }

  function handleDeleteNote(id: string){
    console.log("prev notes : ", notes, id, notes.filter(note => note.id !== id));
    setNotes(prevNotes => { return prevNotes.filter(note => note.id !== id ) })
    console.log("updated notes: ", notes);
  }

  function addTag(tag: Tag) {
    setTags(tags => [...tags, tag]);
  }

  function updateTag(id: string, label: string){
    setTags(tags => (
      tags.map(tag => {
        if(tag.id === id){
          return {...tag, label: label}
        }else{
          return tag
        }
      })
    ))
  }

  function deleteTag(id: string){
    setTags(tags => tags.filter(tag => tag.id !== id))
  }


  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home allTags={tags} allNotes={notesWithTags} updateTag={updateTag} deleteTag={deleteTag}/>} />
          <Route path='/:id'element={<NoteLayout notes={notesWithTags} />} >
            <Route index element={<Note onDelete={handleDeleteNote} />} />
            <Route path='edit' 
              element={<EditPage onSubmit={handleUpdateNote} allTags={tags} addTag={addTag} />} />
          </Route>
          <Route path='/new' element={<NewPage onSubmit={handlecreateNote} allTags={tags} addTag={addTag} />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App;

