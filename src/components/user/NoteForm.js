import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { doApiMethod } from '../../services/apiService.js';
import ReactQuill from 'react-quill'; // Importing Quill
import 'react-quill/dist/quill.snow.css'; // Importing Quill styles
import './css/NoteForm.css';
import { useContext } from 'react';
import { UserProvider } from '../../context/UserInfoContext.js';
import { UserContext } from '../../context/createContext.js';
import LoadingButton from '../general_comps/loadingButton.js';

const NoteForm = () => {

  const { user, fetchUserData } = useContext(UserContext);

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchUserData();
    setAuthor(user? user.username : '');
    fetchTopics();
  }, []);

  useEffect(()=> {
    setAuthor(user? user.username : '');

  },[user])

  const fetchTopics = async () => {
    try {
      const topicsResponse = await doApiMethod('topics', 'GET');
      setTopics(topicsResponse);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewTopicSubmit = async (event) => {
    event.preventDefault();
    setTopic(newTopic);

    let url = 'topics';
    try {
      let data = await doApiMethod(url, 'POST', { name: newTopic, userId: user._id });
      fetchTopics(); // Fetch the updated list of topics after adding new one
      setNewTopic('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {

    setIsLoading(true);

    event.preventDefault();

    let note = {
      author: author,
      content: content,
      topic: topic,
    };

    let url = 'notes';
    try {
      let data = await doApiMethod(url, 'POST', note);
      console.log(data);
      // Reset the form
      setAuthor(user? user.username : '');
      setContent('');
      setTopic('');
    } catch (err) {
      alert("Error uploading note!")
      console.log(err);
    }
    setIsLoading(false)
  };

  const handleCheckGrammar = async () => {
    try {
      const correctionResponse = await doApiMethod('notes/correct', 'POST', {
        content,
      });
  
      //Check if the response contains HTML tags.
      const htmlTagPattern = /<[^>]*>/g;
  
      //Remove HTML tags from the response.
      const filteredResponse = correctionResponse.replace(htmlTagPattern, '');
  
      if(window.confirm("Do you want to accept this change?\n" + `"${filteredResponse}"`)){
        setContent(correctionResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Container className="p-3">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h2 className="m-2">Create Note</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="author" className="m-2">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content" className="m-2">
              <Form.Label>Content</Form.Label>
              <ReactQuill theme="snow" value={content} onChange={setContent} />
              <Button variant="info" type="button" className="m-2" onClick={handleCheckGrammar}>
              Check Grammar
            </Button>
            </Form.Group>
            <Form.Group controlId="topic" className="m-2">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                as="select"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              >
                <option value="">Select a topic</option>
                {topics.map((topic, index) => (
                  <option value={topic.name} key={index}>
                    {topic.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="newTopic" className="m-2">
              <Form.Label>Add New Topic</Form.Label>
              <Form.Control
                type="text"
                name="newTopic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
              <Button variant="secondary" type="button" className="m-2" onClick={handleNewTopicSubmit}>
                Add Topic
              </Button>
            </Form.Group>
            <LoadingButton type="submit" className="m-2" isLoading={isLoading} Type={"Save"}/>
     
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NoteForm;
