import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import {
  BsFillSuitHeartFill,
  BsFillPlayFill,
  BsBookmarkPlus,
  BsBookmarkCheckFill,
} from "react-icons/bs";

import { TailSpin } from "react-loader-spinner";

import MoviesContext from "../../context/MoviesContext";
import Navbar from "../Navbar";
import TrendingSlider from "../TrengingSlider/index.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./index.css";
import Sidebar from "../Sidebar";
import UpcomingSlider from "../UpcomingSlider";
import Cookies from "js-cookie";

const statusConstansts = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const HomePoster = () => {
  const [trendingList, updateTrendingList] = useState([]);
  const [status, setStatus] = useState(statusConstansts.initial);
  const navigate = useNavigate();

  useEffect(() => {
    getTrendingMovies();
  }, []);
  const value = useContext(MoviesContext);
  const { wishlist, toggleWishListItem } = value;
  // console.log(wishlist)

  const getTrendingMovies = async () => {
    setStatus(statusConstansts.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    // console.log(jwtToken);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const trendingMoviesUrl =
      "https://jayauthenticationserver.onrender.com/trending";
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
      // console.log(updatedData)
      updateTrendingList(updatedData);
      setStatus(statusConstansts.success);
    } else {
      setStatus(statusConstansts.failure);
    }
  };

  const renderHeader = () => (
    <div className="header">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        swipeable={true}
        transitionTime={2}
        infiniteLoop={true}
        showStatus={false}
        width={"97%"}
      >
        {trendingList.map((movie) => (
          <div
            key={movie.id}
            className="poster-image"
            style={{
              backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.700),rgba(0, 0, 0, 0.600)),url(https://image.tmdb.org/t/p/original${movie.backdropPath})`,
            }}
          >
            <h1 className="poster-title">{movie.title}</h1>
            <p className="poster-overview">{movie.overview}</p>
            <p className="rating-votes">
              <AiFillStar className="star-icon" />
              {movie.rating}
              <BsFillSuitHeartFill className="heart-icon" /> {movie.votesCount}
            </p>
            <div className="poster-buttons-container">
              <button
                type="button"
                className="poster-watchnow-btn"
                onClick={() => navigate(`/movies/${movie.id}`)}
              >
                <BsFillPlayFill className="play-icon" />
                Watch Now
              </button>
              <button
                type="button"
                className={`poster-save-btn`}
                onClick={() => toggleWishListItem(movie)}
              >
                {wishlist.includes(movie) ? (
                  <BsBookmarkCheckFill className="play-icon" />
                ) : (
                  <BsBookmarkPlus className="play-icon" />
                )}
                {wishlist.includes(movie) ? "Wishlisted" : "Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );

  const renderHeaderLoader = () => (
    <div className="header">
      <div className="loader-container">
        <TailSpin color="red" />
      </div>
    </div>
  );

  let header;
  switch (status) {
    case statusConstansts.success:
      header = renderHeader();
      break;
    case statusConstansts.inProgress:
      header = renderHeaderLoader();
      break;
    default:
      header = null;
      break;
  }

  return header;
};

export default HomePoster;
