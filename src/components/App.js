import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './misc/Header';
import Home from './user/Home';
import NoteForm from './user/NoteForm';
import NotesViewer from './user/NotesView';
import Login from './user/Login';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create" element={<NoteForm />} />
        <Route path="/view" element={<NotesViewer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
