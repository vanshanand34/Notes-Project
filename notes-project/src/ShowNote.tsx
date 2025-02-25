import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { Row, Col, Badge, Stack, Button, Card, Container } from "react-bootstrap";
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
        <Container className="mt-4 py-4">
        <Card className={`col-md-8 mx-auto my-4`}>
            <Card.Header className="">
                <Row className="g-4 align-items-center mb-4 col-md-12 mx-0">
                    <Col className="px-0 pt-4">
                        <Card.Title>
                            <h3>{note.title}</h3>
                        </Card.Title>

                        {note.tags.length > 0 && (
                            <Stack direction="horizontal" gap={1}>
                                {note.tags.map(
                                    tag => (
                                        <Badge bg={"primary"} key={tag.id} className={`${styles.customBadge}`}>
                                            {tag.label}
                                        </Badge>
                                    )
                                )}
                            </Stack>
                        )}
                    </Col>
                    <Col xs="auto" className="justify-content-end">
                        <Stack direction="horizontal" gap={3}>

                            <Link to="./edit"><Button variant="outline-success">Edit</Button></Link>

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
            </Card.Header>
            <Card.Body>
                <ReactMarkdown>{note.body}</ReactMarkdown>
            </Card.Body>
        </Card>
        </Container>
    )
}