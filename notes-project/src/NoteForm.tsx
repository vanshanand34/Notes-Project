import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Stack, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Tag, NotesData } from './App';
import styles from "./NotesList.module.css"


export type NoteFormProps = {
    onSubmit: (note: NotesData) => void,
    allTags: Tag[],
    addTag: (tag: Tag) => void
} & Partial<NotesData>


export default function (
    { onSubmit, allTags, addTag, title = "", body = "", tags = [] }: NoteFormProps
) {

    const titleElement = useRef<HTMLInputElement>(null);
    const markdownElement = useRef<HTMLTextAreaElement>(null);

    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const navigate = useNavigate();

    function handleSave(e: React.FormEvent) {
        e.preventDefault();

        const noteCreated: NotesData = {
            title: titleElement.current?.value!,
            body: markdownElement.current?.value!,
            tags: selectedTags
        }
        onSubmit(noteCreated);
        navigate("/");
    }

    return (
        <Form>
            <Row className='g-3'>
                <Col sm={12} lg={6}>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            defaultValue={title} 
                            required={true} 
                            type='text' 
                            ref={titleElement} 
                            className={`${styles.customFormInput}`}
                        />
                    </Form.Group>
                </Col>

                <Col sm={12} lg={6}>
                    <Form.Group controlId='tags'>

                        <Form.Label>Tags</Form.Label>

                        <CreatableSelect isMulti
                            onCreateOption={
                                label => {
                                    const newTag: Tag = { id: Date.now().toString(), label: label }
                                    addTag(newTag)
                                    setSelectedTags(tags => [...tags, newTag])
                                }
                            }
                            value={
                                selectedTags.map(
                                    tag => { return { label: tag.label, value: tag.id } }
                                )
                            }

                            onChange={
                                tags => {
                                    setSelectedTags(
                                        tags.map(
                                            tag => { return { label: tag.label, id: tag.value } }
                                        )
                                    )
                                }
                            }

                            options={
                                allTags.map(
                                    tag => { return { label: tag.label, value: tag.id } }
                                )
                            }
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className='my-4'>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        defaultValue={body}
                        required={true}
                        as='textarea'
                        rows={15}
                        ref={markdownElement}
                        className={`${styles.customFormInput}`}
                    />
                </Form.Group>
            </Row>

            <Stack direction='horizontal' gap={3} className='justify-content-end'>
                <Button className='px-4' onClick={handleSave} type='submit'>
                    Save
                </Button>
                <Link to="..">
                    <Button variant='btn btn-outline-secondary px-4'>Close</Button>
                </Link>
            </Stack>

        </Form>
    )
}