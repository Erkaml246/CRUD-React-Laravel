import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [alamat, setAlamat] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name, // Change to match your server's expected field names
          Username: username,
          Password: password,
          Email: email,
          NamaLengkap: namaLengkap,
          Alamat: alamat,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        onRegister(data.user, data.access_token);

        // Show SweetAlert for successful registration
        Swal.fire({
          title: 'Registration Successful!',
          icon: 'success',
          timer: 2000, // Display for 2 seconds
          showConfirmButton: false,
        });

        // Navigate to the login page after successful registration
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);

        // Show SweetAlert for failed registration
        Swal.fire({
          title: 'Registration Failed',
          text: errorData.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleRegister} method="POST">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />
          <button type="submit">Create</button>
          <p className="message">
            Sudah Punya Akun? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
