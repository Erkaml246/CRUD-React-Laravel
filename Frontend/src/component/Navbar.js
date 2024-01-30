import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Logo from '../component/foto/logo-aml.png';

function Navbar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const handleSearch = () => {
        // Add search logic based on your application needs
        console.log("Searching for:", searchQuery);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1F4172' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '15px' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gallery</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" />
                    <div className="d-flex justify-content-start align-items-center">
                        <div className="input-group" style={{ borderRadius: '20px' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', width: '400px' }} 
                            />
                            <button className="btn btn-outline-light" type="button" onClick={handleSearch} style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
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
