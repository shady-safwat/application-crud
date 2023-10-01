import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../../redux/user/userSlice";

function Navbar() {
  // allUsers: Array of user objects
  const allUsers= useSelector((state) => state.user.users);
  // Declare a new state variable, which we'll call "search"
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUser(search));
  }, [dispatch, search]);
  return (
    // Define Navbar 
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        {/* Define navbar-brand */}
        <a className="navbar-brand fw-bold" href="#Logo">
          CRUD App
        </a>
        {/* Define button toggler to show offcanvas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Define menu icon */}
          <AiOutlineMenu className="menu-icon h1" />
        </button>
        {/* Define offcanvas */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          {/* Define offcanvas header */}
          <div className="offcanvas-header">
            {/* Define offcanvas title */}
            <h5 className="offcanvas-title  fw-bold" id="offcanvasExampleLabel">
              CRUD App
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          {/* Define offcanvas body */}
          <div className="offcanvas-body">
            <ul className="navbar-nav me-auto mb-lg-0 fw-bold">
              {/* -- Define nav link add users -- */}
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Add Users
                </Link>
              </li>
              {/* -- Define nav link all users and show length of the users -- */}
              <li className="nav-item">
                <Link to="/read" className="nav-link">
                  All Users ({allUsers.length})
                </Link>
              </li>
            </ul>
            {/* -- Define form search -- */}
            <input
              className="search form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)} //The onChange event detects when the value of an input search changes
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
