import { Row, Col, Card, Container, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import {SimplifiedNote} from "./Home"
import styles from "./NotesList.module.css"

export default function NotesList({ notes }: { notes: SimplifiedNote[] }) {
    return (
        <Row className='g-2 justify-content-center'>
            {
                notes.map((note) => {
                    return (
                        <Col xs={12} sm={6} md={4} lg={3} key={note.id}>
                            <Card className={`h-100 text-decoration-none ${styles.card}`} as={Link} to={`/${note.id}`}>
                                <Card.Body className="text-center">
                                    <h4 className="card-title">{note.title.toUpperCase()}</h4>
                                    <Container>
                                        {note.tags.map(
                                            tag => (
                                                <Badge bg={"primary"} key={tag.id} className={`${styles.customBadge} m-2`} >
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

    )
}