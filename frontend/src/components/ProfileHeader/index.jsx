import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/logo-1.png';
import profile_image from '../../assets/example_images/shelter_portrait.jpg';

const ProfileHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/my_pets">
          <img src={logoImage} width="150px" alt="Logo" />
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
              <Link className="nav-link" to="/my_pets">
                My Pets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/applications">
                Applications
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link mobile-nav-item" to="/shelter_profile_view">
                Profile
              </Link>
            </li> */}
            <li className="nav-item">
              <div className="nav-item mobile-nav-item">
                {/* <Link
                  className="nav-link"
                  to="#"
                  role="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#notifications-list"
                  aria-expanded="true"
                  aria-controls="notifications-list"
                >
                  Notifications
                </Link> */}
                <div className="collapse" id="notifications-list">
                  <div className="ms-4">
                    <Link className="nav-link" to="#">
                      No notifications...
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <hr />
            {/* <li className="nav-item">
              <Link className="nav-link mobile-nav-item" to="/index">
                Logout
              </Link>
            </li> */}
          </ul>

          <div className="ms-auto d-flex" style={{ marginRight: '6rem' }}>
            <div className="dropdown my-auto def-nav-item">
              <button className="btn" type="button" data-bs-toggle="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor"
                    class="bi bi-bell me-2 text-secondary" viewBox="0 0 16 16">
                    <path
                        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#my-html">No notifications...</a></li>
              </ul>
            </div>
            <div className="vr mx-2 def-nav-item"></div>
            <div className="dropdown my-auto def-nav-item">
              <button className="btn" type="button" data-bs-toggle="dropdown">
                <img className="rounded-circle border" src={profile_image} alt="my_image"
                  style={{ backgroundColor: "cornsilk", width: "50px", height: "50px" }} />
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/shelter_profile_view">Profile</Link></li>
                <hr />
                <li><Link className="dropdown-item" to="/index">Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfileHeader;
