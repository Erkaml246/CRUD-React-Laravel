// Fotodetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import "../style.css";

const Fotodetail = () => {
  const [foto, setFoto] = useState({});
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const { FotoID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (FotoID) {
          const response = await axios.get(`http://localhost:8000/api/foto/${FotoID}`);
          const fetchedFoto = response.data.foto;

          if (fetchedFoto) {
            setFoto(fetchedFoto);
            setUsername(fetchedFoto.Username);
          } else {
            // Photo not found, show SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Foto Tidak Ada!',
            });
          }
        }
      } catch (error) {
        console.error("Error fetching photo details:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [FotoID]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here

    // Update the comments state or send the comment to the server
  };

  return (
    <div className="container">
      <div className="back-button-container">
        <Link to="/" className="back-button">
          <FaArrowLeft style={{ fontSize: '26px' }} />
        </Link>
      </div>
      <div className="fotodetail-container">
        <div className="photo-details">
          <div className="foto-box">
            <img src={`http://localhost:8000/${foto.LokasiFile}`} alt={foto.JudulFoto} />
          </div>
          <div className="details-comment-box">
            <div className="details-container">
              <div style={{ textAlign: 'center' }}>
                <h2>{foto.JudulFoto}</h2>
              </div>
              <p className="username">{username}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Add like functionality here if needed */}
              </div>
            </div>
            <div className="comments-container">
              <h3>Komentar</h3>
              <div>
                {/* Iterate through comments and display them */}
                {foto.comments && foto.comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <p className="comment-text">{comment.username}: {comment.text}</p>
                  </div>
                ))}
              </div>
              <hr className="comment-separator" />
              <div className="new-comment-container">
                <form onSubmit={handleFormSubmit} className="position-relative">
                  <div className="chat-input-container">
                    <textarea
                      className="chat-input no-border"
                      rows="1"
                      placeholder="Type a message..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary btn-sm chat-send-btn" style={{ cursor: "pointer" }}>
                      <FaPaperPlane style={{ alignItems: "center" }} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Fotodetail;
