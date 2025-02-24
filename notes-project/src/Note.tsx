import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { Row, Col, Badge, Stack, Button, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import styles from "./NotesList.module.css"
import "./App.css"

type NoteProps = {
    onDelete: (id: string) => void
}


export function Note({ onDelete }: NoteProps) {

    const note = useNote();
    const navigate = useNavigate();

    return (
        <Container className={`${styles.customContainer} w-100 p-4`}>
            <Row className="align-items-center mb-4 w-100 mx-0">
                <Col className="px-0">
                    <h1>{note.title}</h1>

                    {note.tags.length > 0 && (
                        <Stack direction="horizontal" gap={1}>
                            {note.tags.map(
                                tag => (
                                    <Badge bg={"primary"} key={tag.id}>
                                        {tag.label}
                                    </Badge>
                                )
                            )}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto" className="justify-content-end">
                    <Stack direction="horizontal" gap={3}>

                        <Link to="./edit"><Button>Edit</Button></Link>

                        <Button variant="outline-danger"
                            onClick={() => {
                                onDelete(note.id);
                                navigate("/");
                            }}
                        >
                            Delete
                        </Button>

                        <Link to="..">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.body}</ReactMarkdown>
        </Container>
    )
}