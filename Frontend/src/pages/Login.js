// Login.js
import React, { useState } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    onLogin(username, password);
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          <br />
          <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <p className="message">
            Not registered? <Link to="/register">Buat Akun</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
