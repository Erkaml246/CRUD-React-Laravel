import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "../style.css";

const fotoData = [
  { id: 1, src: 'https://i.pinimg.com/564x/20/0e/23/200e231abb64f92a1afd15e50c348955.jpg', alt: 'Foto 1' },
  { id: 2, src: 'https://i.pinimg.com/564x/93/2d/78/932d782e0a3cca505e814f021f51c4bc.jpg', alt: 'Foto 2' },
  { id: 3, src: 'https://i.pinimg.com/564x/0d/6c/a0/0d6ca0e317dc0f9b2005269793ca5b19.jpg', alt: 'Foto 3' },
  { id: 4, src: 'https://i.pinimg.com/564x/53/a2/ca/53a2ca232a45c4ccbf80dc033d252494.jpg', alt: 'Foto 4' },
  { id: 5, src: 'https://i.pinimg.com/564x/27/3c/c4/273cc47695af8d62c66de08a635e4f0f.jpg', alt: 'Foto 5' },
  { id: 6, src: 'https://i.pinimg.com/564x/da/7d/39/da7d39125d7c9663599030d6fb80ad03.jpg', alt: 'Foto 6' }
  // Tambahkan lebih banyak objek foto jika diperlukan
];

const Home = () => {
  return (
    <div className="container">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="20px">
          {fotoData.map((foto) => (
            <div key={foto.id} className="foto-item">
              <img src={foto.src} alt={foto.alt}/>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Home;
