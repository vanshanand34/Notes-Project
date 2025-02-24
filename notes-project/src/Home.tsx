import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack, Button, Form, Badge, Card } from 'react-bootstrap';
import { Tag } from './App';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useState, useMemo } from 'react';
import EditTagsModal from './EditTagsModal';
import styles from './NotesList.module.css';

type SimplifiedNote = {
    tags: Tag[],
    title: string,
    id: string
}
type HomePageProps = {
    allTags: Tag[],
    allNotes: SimplifiedNote[],
    updateTag: (id: string, label: string) => void,
    deleteTag: (id: string) => void
}

export default function (
    { allTags, allNotes, updateTag, deleteTag }: HomePageProps
) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const filteredNotes = useMemo(() => {

        return allNotes.filter(note => {
            return (
                (title == "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (
                    selectedTags.length == 0 ||
                    selectedTags.every((tag) => {
                        return note.tags.some(noteTag => noteTag.id == tag.id)
                    })
                )
            )
        })
    }, [allNotes, title, selectedTags]);


    return <>

        <Container className="p-4">
            <Row className='my-4 align-items-center'>
                <Col><h2>Notes List</h2></Col>
                <Col xs="auto">
                    <Stack direction='horizontal' gap={3} >
                        <Link to="new">
                            <Button variant='primary'>Create</Button>
                        </Link>
                        <Button variant='outline-secondary' onClick={() => setIsEditModalOpen(true)}>
                            Edit Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <Form className='my-4'>
                <Row>
                    <Col xs={12} lg={6}>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required={true} type='text'
                                value={title} onChange={e => setTitle(e.target.value)}
                                className={`${styles.customFormInput} ${styles.customInput}`}
                                id="myCustomForm"
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={12} lg={6}>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <Select isMulti
                                value={
                                    selectedTags.map(
                                        (tag: Tag) => {
                                            return { label: tag.label, value: tag.id };
                                        }
                                    )
                                }

                                onChange={
                                    tags => {
                                        setSelectedTags(
                                            tags.map(
                                                tag => { return { label: tag.label, id: tag.value } }
                                            )
                                        );
                                    }
                                }
                                options={allTags.map(
                                    tag => {
                                        return { label: tag.label, value: tag.id };
                                    }
                                )}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row className='g-2 justify-content-center'>
                {
                    filteredNotes.map((note) => {
                        return (
                            <Col xs={12} sm={6} md={4} lg={3} key={note.id}>
                                <Card className={`h-100 text-decoration-none`} as={Link} to={`/${note.id}`}>
                                    <Card.Body className="text-center">
                                        <h4 className="card-title">{note.title.toUpperCase()}</h4>
                                        <Container>
                                            {note.tags.map(
                                                tag => (
                                                    <Badge bg={"primary"} className="m-2" key={tag.id}>
                                                        {tag.label}
                                                    </Badge>
                                                )
                                            )
                                            }
                                        </Container>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

            <EditTagsModal
                show={isEditModalOpen}
                handleClose={() => setIsEditModalOpen(false)}
                allTags={allTags}
                updateTag={updateTag}
                deleteTag={deleteTag}
            />
        </Container>
    </>
}
