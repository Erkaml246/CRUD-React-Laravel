import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Mengimpor SweetAlert
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        onLogin(data.user, data.access_token);

        // Menampilkan SweetAlert ketika berhasil login
        Swal.fire({
          title: 'Login Successful!',
          icon: 'success',
          timer: 2000, // Tampilkan selama 2 detik
          showConfirmButton: false,
        });

        // Navigasi ke halaman album
        navigate('/album');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);

        // Menampilkan SweetAlert ketika login gagal
        Swal.fire({
          title: 'Login Failed',
          text: errorData.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleLogin} method="POST">
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
          <button type="submit">Login</button>
          <p className="message">
            Not registered? <Link to="/register">Buat Akun</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
