import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { BiHomeAlt, BiStar, BiLogOut } from "react-icons/bi";
import { ImDisplay } from "react-icons/im";
import { RiBookmark3Line } from "react-icons/ri";
import { MdOutlineClose, MdOutlineSettings } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
// import { IoClose } from "react-icons/io";
// import { PureComponent, useMemo } from 'react'
import Popup from "reactjs-popup";

import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [activeTab, changeActiveTab] = useState("");
  const [showMdSidebar, toggleSidebar] = useState(false);
  const path = useResolvedPath();
  const { pathname } = path;
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("memo executed")
    setTimeout(() => {
      if (pathname === "/") {
        changeActiveTab("home");
        // console.log('now')
      } else if (pathname === "/popular") {
        changeActiveTab("popular");
      } else if (pathname === "/tvshows") {
        changeActiveTab("tvshows");
      } else if (pathname === "/wishlisted") {
        changeActiveTab("wishlist");
      }
    }, 300);
  }, [pathname]);
  // console.log('side bar')

  const onLogout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("userDetails");
    navigate("/login");
  };

  const toggleMdSidebar = () => {
    toggleSidebar(!showMdSidebar);
  };

  return (
    <>
      <div className="sidebar-container-lg">
        <h1 className="logo-text-sidebar">
          <img
            src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1679769378/Movify-project-resources/Logo_M_hqvhm5.png"
            alt=""
            className="logo-image-sidebar"
          />
          OVIFY
        </h1>
        <p className="side-bar-menu-heading">Menu</p>
        <hr className="sidebar-separator-line" />
        <Link
          className={`sidebar-links ${
            activeTab === "home" ? "active-tab" : ""
          }`}
          to="/"
        >
          <BiHomeAlt className="side-bar-option-icon" />
          Home
        </Link>
        <Link
          className={`sidebar-links ${
            activeTab === "popular" ? "active-tab" : ""
          }`}
          to="/popular"
        >
          <BiStar className="side-bar-option-icon" />
          Popular
        </Link>
        <Link
          className={`sidebar-links ${
            activeTab === "tvshows" ? "active-tab" : ""
          }`}
          to="/tvshows"
        >
          <ImDisplay className="side-bar-option-icon" />
          TV Shows
        </Link>
        <Link
          className={`sidebar-links ${
            activeTab === "wishlist" ? "active-tab" : ""
          }`}
          to="/wishlisted"
        >
          <RiBookmark3Line className="side-bar-option-icon" />
          Wishlisted
        </Link>
        <div className="sidebar-bottom-container">
          <p className="side-bar-menu-heading">General</p>
          <hr className="sidebar-separator-line" />
          <Link to="/settings" className="sidebar-links">
            <MdOutlineSettings className="side-bar-option-icon" />
            Settings
          </Link>
          <Popup
            trigger={
              <button type="button" className="sidebar-links">
                <BiLogOut className="side-bar-option-icon" />
                Log out
              </button>
            }
            modal
            className="logout-popup"
          >
            {(close) => (
              <div className="popup-box">
                <h1 className="pp-heading">Are you sure want to logout?</h1>
                <div className="pp-btn-container">
                  <button onClick={close} className="pp-close-btn">
                    Close
                  </button>
                  <button onClick={onLogout} className="pp-confirm-btn">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
      {!showMdSidebar && (
        <button
          type="button"
          className="sidebar-s-btn"
          onClick={toggleMdSidebar}
        >
          <GiHamburgerMenu className="side-bar-option-icon" />
        </button>
      )}

      <div
        className={`sidebar-container-md ${
          showMdSidebar ? "" : "hide-md-sidebar"
        }`}
      >
        <button
          type="button"
          className="sidebar-h-btn"
          onClick={toggleMdSidebar}
        >
          <MdOutlineClose className="side-bar-option-icon" />
        </button>
        {/* <p className="side-bar-menu-heading">Menu</p> */}
        <hr className="sidebar-separator-line" />
        <Link
          className={`sidebar-links ${
            activeTab === "home" ? "md-active-tab" : ""
          }`}
          to="/"
        >
          <BiHomeAlt className="side-bar-option-icon" />
        </Link>
        <Link
          className={`sidebar-links ${
            activeTab === "popular" ? "md-active-tab" : ""
          }`}
          to="/popular"
        >
          <BiStar className="side-bar-option-icon" />
        </Link>
        <Link
          className={`sidebar-links ${
            activeTab === "tvshows" ? "md-active-tab" : ""
          }`}
          to="/tvshows"
        >
          <ImDisplay className="side-bar-option-icon" />
        </Link>
        <Link
          className={`sidebar-links ${
            activeTab === "wishlist" ? "md-active-tab" : ""
          }`}
          to="/wishlisted"
        >
          <RiBookmark3Line className="side-bar-option-icon" />
        </Link>
        <div className="sidebar-bottom-container">
          {/* <p className="side-bar-menu-heading">General</p> */}
          <hr className="sidebar-separator-line" />
          <Link to="/settings" className="sidebar-links">
            <MdOutlineSettings className="side-bar-option-icon" />
          </Link>
          <Popup
            trigger={
              <button type="button" className="sidebar-links">
                <BiLogOut className="side-bar-option-icon" />
              </button>
            }
            modal
            className="logout-popup"
          >
            {(close) => (
              <div className="popup-box">
                <h1 className="pp-heading">Are you sure want to logout?</h1>
                <div className="pp-btn-container">
                  <button onClick={close} className="pp-close-btn">
                    Close
                  </button>
                  <button onClick={onLogout} className="pp-confirm-btn">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
