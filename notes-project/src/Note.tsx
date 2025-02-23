import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { Row, Col, Badge, Stack, Button, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

type NoteProps = {
    onDelete: (id: string) => void
}


export function Note({onDelete}: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();

    function handleDeleteNote(){
        // e.preventDefault();
        onDelete(note.id);
        console.log(note.id, " delted");
        navigate("/");
    }
    // console.log("note : ", note);


    return (
        <Container className="w-100">
            <Row className="align-items-center my-4 w-100 mx-0">
                <Col className="">
                    <h1>
                        {note.title}
                    </h1>
                    {note.tags.length > 0 && (
                        <Stack direction="horizontal" gap={1}>
                            {note.tags.map(
                                tag => (
                                    <Badge bg={"primary"} key={tag.id}>
                                        {tag.id}
                                    </Badge>
                                )
                            )}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto" className="justify-content-end">
                    <Stack direction="horizontal" gap={3}>
                        <Link to="./edit"><Button>Edit</Button></Link>
                        <Button variant="outline-danger" onClick={handleDeleteNote}>Delete</Button>
                        <Link to="..">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.body}</ReactMarkdown>
        </Container>)
}