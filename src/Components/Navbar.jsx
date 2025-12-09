import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#5F9EA0" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to="/home">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            color="light"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-light"
            id="navbarContent"
          >
            <div className="d-flex gap-4 ms-auto">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/doctors"
              >
                Doctors
              </Link>

              <Link className="nav-link" to="/Appointments">
                Appointments
              </Link>

              <Link className="nav-link" to="/profile">
                Profile
              </Link>

              <Link className="nav-link" to="/">
                <button type="button" className="btn btn-outline-light">
                <i className="bi bi-box-arrow-right"></i> Log out
              </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
