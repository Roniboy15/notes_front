import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { doApiMethod } from '../../services/apiService.js';
import DOMPurify from 'dompurify';
import stringSimilarity from 'string-similarity';
import './css/NoteView.css'

const NotesViewer = () => {
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const firstNoteRef = useRef(null); // Create a ref


  useEffect(() => {
    getTopics();
  }, []);

  useEffect(() => {
    if (topic) {
      getNotes();
    }
  }, [topic, startDate, endDate]);

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

    // Add start and end parameters only when both are not null
    if (startDate && endDate) {
      url += `?start=${startDate}&end=${endDate}`;
    }

    try {
      let data = await doApiMethod(url, "GET");
      setNotes(data);
    } catch (err) {
      console.log(err);
    }
  };


  const findSimilarNotes = (noteIndex) => {
    const noteContents = notes.map(note => note.content.toLowerCase());
    const targetNote = noteContents[noteIndex];
    const similarities = stringSimilarity.findBestMatch(targetNote, noteContents);

    const sortedIndexes = similarities.ratings
      .sort((a, b) => b.rating - a.rating)
      .map(rating => noteContents.indexOf(rating.target));

    const sortedNotes = sortedIndexes.map(index => notes[index]);

    setNotes(sortedNotes);
    // Scroll to the first note
    firstNoteRef.current.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <Container className='p-3'>
      <Row className="justify-content-md-center">
        <Col xs={12} md={10}>
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
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </Form.Group>
          <h2>{notes.length}</h2>
          <ListGroup className="mt-4">
            {notes.map((note, index) => (
              <ListGroup.Item
                key={index}
                className='mt-3 position-relative'
                ref={index === 0 ? firstNoteRef : null} // Set the ref to the first note
              > {/* Applied position-relative */}
                {note.author ?
                  <div>
                    <div className='text-center'>{note.author}</div>
                    <hr></hr>
                  </div>
                  : ''}
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}></div>
                <button className='btn btn-outline-success p-1 mb-2 me-2 button-corner' onClick={() => findSimilarNotes(index)}>Compare</button> {/* Applied button-corner */}
              </ListGroup.Item>
            ))}
          </ListGroup>

        </Col>
      </Row>
    </Container>
  );
}

export default NotesViewer;
