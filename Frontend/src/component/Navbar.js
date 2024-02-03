import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from '../component/foto/logo-aml.png';

function Navbar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);


    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1F4172' }}>
            <div className="container">
                <div className="navbar-brand" to="/">
                    <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '15px' }} />
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>GAFOML</span>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> 
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className={`nav-item ${activeLink === "/" ? "active" : ""}`}>
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className={`nav-item ${activeLink === "/albums" ? "active" : ""}`}>
                            <Link className="nav-link" to="/albums">Album</Link>
                        </li>
                        <li className={`nav-item ${activeLink === "/fotos" ? "active" : ""}`}>
                            <Link className="nav-link" to="/fotos">Foto</Link>
                        </li>
                        <li className={`nav-item ${activeLink === "/users" ? "active" : ""}`}>
                            <Link className="nav-link" to="/users">User</Link>
                        </li>
                        <li className={`nav-item ${activeLink === "/login" ? "active" : ""}`}>
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    );
}

export default Navbar;
