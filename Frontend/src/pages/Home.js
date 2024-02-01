import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";
import { FaComment, FaHeart } from "react-icons/fa";
import "../style.css";

const Home = () => {
  const [foto, setFoto] = useState([]);

  useEffect(() => {
    // Ambil data foto dari API Laravel
    axios.get("http://localhost:8000/api/foto")
      .then(response => {
        setFoto(response.data.foto);
      })
      .catch(error => {
        console.error("Error fetching photos:", error);
      });
  }, []); // useEffect dijalankan hanya sekali setelah komponen dipasang

  const handleLike = (fotoID) => {
    axios.post(`http://localhost:8000/api/like/${fotoID}`)
      .then(response => {
        const updatedFoto = foto.map(f => {
          if (f.FotoID === fotoID) {
            return { ...f, likes: response.data.likes };
          }
          return f;
        });
        setFoto(updatedFoto);
      })
      .catch(error => {
        console.error("Error liking photo:", error);
      });
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 350: 2, 600: 3, 900: 4, 1200: 5 }}>
        <Masonry gutter="10px">
          {foto.map((foto, index) => (
            <div key={foto.FotoId} className="foto-item">
              <img src={`http://localhost:8000/${foto.LokasiFile}`} alt={foto.JudulFoto} />
              <p>{foto.JudulFoto}</p>
              <div onClick={() => handleLike(foto.FotoID)}>
                <FaHeart color={foto.liked ? 'red' : 'black'} /> {foto.likes}
              </div>
              <div>
                <FaComment/>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Home;
