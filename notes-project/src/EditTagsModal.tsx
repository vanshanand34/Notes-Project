import { Modal, Stack, Row, Col, Button, Form } from "react-bootstrap";
import { Tag } from "./App";
import styles from "./NotesList.module.css"

export type EditModalProps = {
    allTags: Tag[],
    show: boolean,
    handleClose: () => void,
    updateTag: (id: string, label: string) => void,
    deleteTag: (id: string) => void
}

export default function EditTagsModal({ allTags, show, handleClose, updateTag, deleteTag }: EditModalProps) {
    console.log(updateTag, deleteTag);
    return (
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
                                    <Form.Control
                                        value={tag.label}
                                        type='text'
                                        onChange={(e => updateTag(tag.id, e.target.value))}
                                        className={`${styles.customFormInput}`}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button 
                                        variant='outline-danger' 
                                        onClick={() => deleteTag(tag.id)}
                                    >
                                        &times;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
