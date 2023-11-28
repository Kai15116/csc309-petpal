import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/headerStyles.css'; 
import logoImage from '../assets/images/logo-1.png'; 


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logoImage} width="150" alt="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <form
                className=""
                role="search"
                style={{ width: '400px', minWidth: '35%', maxWidth: '90%' }}
                action="/searchpage"
                
              >
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search here..."
                    aria-label="Search"
                    aria-describedby="search-btn"
                    required
                  />
                  <button className="btn btn-outline-success" type="submit" id="search-btn">
                    Search
                  </button>
                </div>
              </form>
            </li>
          </ul>
          <div className="ms-auto">
            <Link to="/login" className="nav-item btn btn btn-outline-primary me-2 def-nav-item" role="button">
              Login
            </Link>
            <Link to="/signup" className="nav-item btn btn-primary def-nav-item" role="button">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

