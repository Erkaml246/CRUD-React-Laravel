import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Footer from "../component/Footer.js";
import "../style.css";

const Home = () => {
  const [foto, setFoto] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/foto")
      .then(response => {
        setFoto(response.data.foto.reverse());
      })
      .catch(error => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  const handleLike = (FotoID) => {
    // Implement like functionality here
  };

  return (
    <div>
    <div className="container" style={{ marginTop: "30px" }}>
      <form className="container-fluid">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <FaMagnifyingGlass style={{ color: "#81888d", cursor: "pointer" }} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Seacrh"
            aria-describedby="basic-addon1"
          />
        </div>
      </form><br />
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 350: 2, 600: 3, 900: 4, 1200: 5 }}>
        <Masonry gutter="10px">
          {foto.map((foto) => (
            <Link key={foto.FotoID} to={`/fotos/${foto.FotoID}`} className="foto-item" style={{ color: "#000", textDecoration: "none" }}>
              <img src={`http://localhost:8000/${foto.LokasiFile}`} alt={foto.JudulFoto} />
              <p>{foto.JudulFoto}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div onClick={() => handleLike(foto.FotoID)} style={{ cursor: "pointer", marginRight: '8px' }}>
                  <FaRegHeart color={foto.liked ? 'red' : 'black'} /> {foto.likes}
                </div>
                <div style={{ cursor: "pointer" }}>
                  <FaRegCommentDots />
                </div>
              </div>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div><br /><br />
    <Footer style={{ marginTop: '140px' }}/>
    </div>
  );
};

export default Home;
