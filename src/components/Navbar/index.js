import { useContext, useState } from "react";
import { BsSearchHeartFill, BsPersonCircle } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { MdNotificationsActive } from "react-icons/md";
import Popup from "reactjs-popup";
// import {IoPersonCircleSharp} from 'react-icons/io'
// import {CgProfile} from 'react-icons/cg'
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";

import "./index.css";
import Cookies from "js-cookie";

const Navbar = () => {
  const value = useContext(MoviesContext);
  const { searchText, onChangesearchText } = value;
  const [searchvalue, setSearchValue] = useState(searchText);
  const [searchbarVisible, toggleSearchBar] = useState(false);
  const navigate = useNavigate();

  // console.log(searchText)
  const onNavigateSearch = () => {
    onChangesearchText(searchvalue);
    navigate("/search");
  };
  const onkeyDownSearch = (event) => {
    // console.log(event.key)
    if (event.key === "Enter") {
      onChangesearchText(searchvalue);
      navigate("/search");
    }
  };

  return (
    <>
      <nav className="navbar-container">
        <div
          className={`search-input-container ${
            searchbarVisible && "slide-down-searchbar"
          }`}
        >
          <input
            type="search"
            className={`search-input-field`}
            placeholder="Enter Movie Name To Search"
            value={searchvalue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={onkeyDownSearch}
          />
          <button
            type="button"
            className="search-input-btn"
            onClick={onNavigateSearch}
          >
            <BsSearchHeartFill className="search-icon-btn" />
          </button>
        </div>
        <h1
          className={`logo-text-navbar ${
            searchbarVisible ? "hide-nav-logo" : ""
          }`}
        >
          <img
            src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1679769378/Movify-project-resources/Logo_M_hqvhm5.png"
            alt=""
            className="logo-image-sidebar"
          />
          OVIFY
        </h1>
        <button
          className="nav-md-search-unlock-btn"
          onClick={() => {
            toggleSearchBar(!searchbarVisible);
          }}
        >
          <BiSearchAlt className="nav-md-search-unlock-btn-icon" />
        </button>
        <span className="nav-link">
          <Popup
            trigger={<MdNotificationsActive className="profile-icon" />}
            modal
            className="logout-popup"
          >
            {(close) => (
              <div className="popup-box">
                <h1 className="pp-heading">This feature is coming soon</h1>
                <div className="pp-btn-container">
                  <button onClick={close} className="pp-close-btn">
                    Close
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </span>
        <span className="nav-link">
          <Popup
            trigger={<BsPersonCircle className="profile-icon" />}
            modal
            className="logout-popup"
          >
            {(close) => (
              <div className="popup-box">
                <h1 className="pp-heading">This feature is coming soon</h1>
                <div className="pp-btn-container">
                  <button onClick={close} className="pp-close-btn">
                    Close
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </span>
      </nav>
    </>
  );
};

export default Navbar;
