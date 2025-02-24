import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import NoteForm from './NoteForm';
import { NotesData, Tag } from './App';
import { useNote } from './NoteLayout';

export type EditNoteProps = {
    onSubmit: (id: string, note: NotesData) => void,
    allTags: Tag[],
    addTag: (tag: Tag) => void,
}

export default function EditNote(
    { onSubmit, allTags, addTag }: EditNoteProps
) {
    const note = useNote();
    return (
            <Container className='p-4'>
                <Row className="my-4">
                    <h1>Edit Note</h1>
                </Row>
                <Row>
                    <Col>
                        <NoteForm
                            title={note.title}
                            body={note.body}
                            tags={note.tags}
                            onSubmit={(data) => onSubmit(note.id, data)}
                            allTags={allTags}
                            addTag={addTag} />
                    </Col>
                </Row>
            </Container>
    )
}