// Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [alamat, setAlamat] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!name || !username || !password || !email || !namaLengkap || !alamat) {
      alert("Semua kolom harus diisi");
      return;
    }

    // Panggil fungsi onRegister untuk proses pendaftaran
    onRegister(name, username, password, email, namaLengkap, alamat);
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleRegister}>
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
          <button type="submit">
            Create
          </button>
          <p className="message">
            Sudah Punya Akun? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
