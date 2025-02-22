import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import NoteForm from './NoteForm';


export default function () {
    return <>
        <Container>
            <h1>New</h1>
            <Row>
                <Col>
                    <NoteForm />
                </Col>
            </Row>
        </Container>
    </>
}