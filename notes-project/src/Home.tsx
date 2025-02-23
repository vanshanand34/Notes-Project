import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack, Button, Form, Badge, Card, Modal } from 'react-bootstrap';
import { RawNote, Tag, NotesData } from './App';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useState, useMemo } from 'react';

type HomePageProps = {
    allTags: Tag[], 
    allNotes: RawNote[] ,
    updateTag: (id:string, label: string) => void,
    deleteTag: (id: string) => void
}

export default function ({ allTags, allNotes, updateTag, deleteTag }: HomePageProps) {
    // const notes: RawNote[] = JSON.parse(localStorage.getItem("NOTES")!);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // console.log(updateTag, deleteTag);

    const filteredNotes = useMemo(() => {
        return allNotes.filter(note => {
            return (
                (title == "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (
                    selectedTags.length == 0 ||
                    selectedTags.every((tag) => {
                        return note.tagIds.some(noteTag => noteTag == tag.id)
                    })
                )
            )
        })
    }, [allNotes, title, selectedTags]);


    return <>

        <Container>
            <Row className='my-4 align-items-center'>

                <Col>
                    <h2>Notes List</h2>
                </Col>

                <Col xs="auto">
                    <Stack direction='horizontal' gap={3} >
                        <Link to="new">
                            <Button variant='primary'>Create</Button>
                        </Link>
                        <Button variant='outline-secondary'
                            onClick={() => setIsEditModalOpen(true)}
                        >Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form className='my-4'>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required={true} type='text'
                                value={title} onChange={e => setTitle(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                    </Col>


                    <Col sm={10} lg={6}>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <Select isMulti
                                value={selectedTags.map(
                                    (tag: Tag) => {
                                        return { label: tag.label, value: tag.label };
                                    })}

                                onChange={
                                    tags => {
                                        setSelectedTags(
                                            tags.map(
                                                tag => {
                                                    return { label: tag.label, id: tag.label };
                                                }
                                            )
                                        );
                                    }}
                                options={allTags.map(
                                    tag => {
                                        return { label: tag.label, value: tag.label };
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
                                <Card className="h-100 text-decoration-none" as={Link} to={`/${note.id}`}>
                                    <Card.Body className="text-center">
                                        <h4 className="card-title">{note.title.toUpperCase()}</h4>
                                        <Container>
                                            {note.tagIds.map(
                                                tag => (
                                                    <Badge bg={"primary"} className="m-2" key={tag}>
                                                        {tag}
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

export type EditModalProps = {
    allTags: Tag[], 
    show: boolean, 
    handleClose: () => void ,
    updateTag: (id:string, label: string) => void,
    deleteTag: (id: string) => void
}

function EditTagsModal({ allTags, show, handleClose, updateTag, deleteTag }: EditModalProps) {
    console.log(updateTag, deleteTag);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Tags
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Stack gap={2} >
                            {allTags.map(tag => (
                                <Row key={tag.id}>
                                    <Col>
                                        <Form.Control value={tag.label} type='text'
                                        onChange={(e => updateTag(tag.id, e.target.value))} />
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant='outline-danger' onClick={() => deleteTag(tag.id)} >&times;</Button>
                                    </Col>
                                </Row>
                            ))}
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

// function useState<T>(arg0: never[]): [any, any] {
//     throw new Error('Function not implemented.');
// }
