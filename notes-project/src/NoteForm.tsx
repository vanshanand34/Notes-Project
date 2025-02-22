import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Col, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';

export default function () {
    return <>
        <Container>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required={true} type='text'></Form.Control>
                        </Form.Group>
                    </Col>


                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            {/* <Form.Control required={true} type='text'></Form.Control> */}
                            <CreatableSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='my-4'>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control required={true} as='textarea' rows={15} className='border border-primary hover:border-secondary' />
                    </Form.Group>
                </Row>

            </Form>
        </Container>
    </>
}