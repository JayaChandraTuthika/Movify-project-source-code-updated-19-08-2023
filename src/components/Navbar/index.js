import { useContext, useEffect, useState } from "react";
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

const statusConstansts = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Navbar = () => {
  const value = useContext(MoviesContext);
  const { searchText, onChangesearchText } = value;
  const [searchvalue, setSearchValue] = useState(searchText);
  const [searchbarVisible, toggleSearchBar] = useState(false);
  const navigate = useNavigate();
  // const [status, setStatus] = useState(statusConstansts.initial);
  const [notificationsShow, toggleNotifications] = useState(false);
  const [notificationList, updateNotificationsData] = useState([]);

  useEffect(() => {
    getRecommendedMovies();
  }, []);

  const getRecommendedMovies = async () => {
    // setStatus(statusConstansts.inProgress);
    const movieId = value.wishlist.length === 0 ? 299536 : value.wishlist[0].id;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const trendingMoviesUrl = `https://jayauthenticationserver.onrender.com/trending`;
    const response = await fetch(trendingMoviesUrl, options);
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json();
      // console.log(data)
      const updatedData = data.results.map((each) => ({
        id: each.id,
        title: each.title,
        rating: each.vote_average.toFixed(1),
        genreIds: each.genre_ids,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        overview: each.overview,
        releaseDate: each.release_date,
        votesCount: each.vote_count,
      }));
      console.log(updatedData.splice(0, 5));
      updateNotificationsData(updatedData.splice(0, 6));
      // setStatus(statusConstansts.success);
    } else {
      // setStatus(statusConstansts.failure);
    }
  };

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
          <button
            className="navbar-icon-wrapper-btn"
            onClick={() => toggleNotifications(!notificationsShow)}
          >
            <MdNotificationsActive className="profile-icon" />
            <span className="notifications-count">
              {notificationList.length}
            </span>
          </button>
          <div
            className={`notifications-container ${
              notificationsShow && "expand-notifications"
            }`}
          >
            {notificationList.map((each) => (
              <div key={each.id} className="notification-item">
                <img
                  src={`https://image.tmdb.org/t/p/original${each.posterPath}`}
                  alt="poster"
                  height="40px"
                />
                <div className="notification-item-text">
                  <h3>{each.title}</h3>
                  <p>{each.overview}</p>
                  <span>NEW</span>
                </div>
              </div>
            ))}
          </div>
          {/* <Popup
            trigger={
              <button className="navbar-icon-wrapper-btn">
                <MdNotificationsActive className="profile-icon" />
                <span className="notifications-count">
                  {notificationList.length}
                </span>
              </button>
            }
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
          </Popup> */}
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
