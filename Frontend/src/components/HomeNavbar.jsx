import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <span className="navbar-brand fw-bold">
          Trust Management
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link btn btn-warning text-dark px-3 ms-2"
                to="/login"
              >
                Login
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;