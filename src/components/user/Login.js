import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/createContext';
import { doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { fetchUserData } = useContext(UserContext);  // Get fetchUserData from context
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const res = await doApiMethod('auth/login', 'POST', data);
    if (res.token) {
      localStorage.setItem('token', res.token);
      alert('Login successful!');
      await fetchUserData();  // Fetch user data after successful login
      navigate("/create");

    } else {
      alert('Login failed');
    }
  };


  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
