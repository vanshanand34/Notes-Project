import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import NoteForm from './NoteForm';
import { NotesData, Tag } from './App';

export type NewNoteProps = {
    onSubmit: (note: NotesData) => void,
    allTags: Tag[],
    addTag: (tag: Tag) => void
}

export default function NewNote(
    { onSubmit, allTags, addTag }: NewNoteProps
) {

    return <>
        <Container className='p-4'>
            <Row className='mb-2'>
            <h1>New Note</h1>
            </Row>
            <Row>
                <Col>
                    <NoteForm onSubmit={onSubmit} allTags={allTags} addTag={addTag} />
                </Col>
            </Row>
        </Container>
    </>
}