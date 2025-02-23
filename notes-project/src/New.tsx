import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import NoteForm from './NoteForm';
import { NotesData, Tag } from './App';

export type NewNoteProps = {
    onSubmit: (note: NotesData) => void,
    allTags: Tag[],
    addTag: (tag: Tag) => void
}

export default function NewNote({ onSubmit, allTags, addTag }: NewNoteProps) {
    console.log("upper ", allTags);
    return <>
        <Container>
            <h1>New Note</h1>
            <Row>
                <Col>
                    <NoteForm onSubmit={onSubmit} allTags={allTags} addTag={addTag} />
                </Col>
            </Row>
        </Container>
    </>
}