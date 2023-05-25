import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { doApiMethod } from '../../services/apiService.js';

//To Do:

//Author: make sure to use name of user as a default (so that one doesnt have to fill in)

const NoteForm = () => {

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let note = {
      author: author,
      content: content,
      topic: topic
    };

    let url = "notes";
    try {
      let data = await doApiMethod(url, "POST", note);
      console.log(data);
      // Reset the form
      setAuthor('');
      setContent('');
      setTopic('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className='p-3'>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className='m-2'>Create Note</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="author" className='m-2'>
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)}  />
            </Form.Group>
            <Form.Group controlId="content" className='m-2'>
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" value={content} onChange={e => setContent(e.target.value)} rows="4" required />
            </Form.Group>
            <Form.Group controlId="topic" className='m-2'>
              <Form.Label>Topic</Form.Label>
              <Form.Control type="text" name="topic" value={topic} onChange={e => setTopic(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit" className='m-2'>Save Note</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NoteForm;
