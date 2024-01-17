import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1F4172' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">Gallery Foto</Link>
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
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
