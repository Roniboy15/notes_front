import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { doApiMethod } from '../../services/apiService.js';
import DOMPurify from 'dompurify';

const NotesViewer = () => {
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics();
  }, []);

  useEffect(() => {
    if (topic) {
      getNotes();
    }
  }, [topic]);

  const getTopics = async () => {
    try {
      const data = await doApiMethod("topics", "GET");
      setTopics(data);
    } catch (err) {
      console.log(err);
    }
  }

  const getNotes = async () => {
    let url = `notes/${topic}`;
    try {
      let data = await doApiMethod(url, "GET");
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container className='p-3'>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2>View Notes</h2>
          <Form.Group controlId="topic">
            <Form.Label>Topic</Form.Label>
            <Form.Control as="select" name="topic" value={topic} onChange={e => setTopic(e.target.value)} required>
              <option value="">Select a topic</option>
              {topics.map((topic, index) => (
                <option value={topic._id} key={index}>{topic.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <ListGroup className="mt-4">
            {notes.map((note, index) => (
              <ListGroup.Item key={index}>
                {note.author ?
                  <div className='text-center'>{note.author}</div>
                  : ''}
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}></div>

              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default NotesViewer;
