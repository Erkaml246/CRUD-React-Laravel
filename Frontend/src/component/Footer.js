import React from 'react';
import '../style.css';
import Logo from '../component/foto/logo-aml.png';

function Footer(){

    return (
      <div className="main">
        <div className="footer">
          <div className="bubbles">
            {[...Array(128)].map((_, i) => (
              <div
                className="bubble"
                style={{
                  '--size': `${2 + Math.random() * 4}rem`,
                  '--distance': `${6 + Math.random() * 4}rem`,
                  '--position': `${-5 + Math.random() * 110}%`,
                  '--time': `${2 + Math.random() * 2}s`,
                  '--delay': `${-1 * (2 + Math.random() * 2)}s`,
                }}
                key={i}
              ></div>
            ))}
          </div>
          <div className="content">
            <div>
                <div>
                    <b>Galery Foto</b>
                </div>
                <div>
                    <b><h3>SMKN 6 JEMBER</h3></b>
                </div>
            </div>
            <div>
              <img
                className="image"
                src={Logo}
                alt="Logo"
              />
              <p>&copy;2024 by erkml</p>
            </div>
            </div>
            <svg style={{ position: 'fixed', top: '100vh', height: '50px' }}>
              <defs>
                <filter id="blob">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob" />
                  {/* Tambahkan elemen feComposite jika diperlukan */}
                </filter>
              </defs>
            </svg>
        </div>

      </div>
    );
}


export default Footer;
