import { useContext, useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import {
  BsBookmarkCheckFill,
  BsBookmarkPlus,
  BsFillSuitHeartFill,
} from "react-icons/bs";

import {
  useMatch,
  useMatches,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import SimilarMovies from "../SimilarMovies";

import "./index.css";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";

const statusConstansts = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const MovieDetails = (props) => {
  const [movieDetails, updateMovieDetails] = useState({});
  const [status, setStatus] = useState(statusConstansts.initial);
  const { id } = useParams();
  const value = useContext(MoviesContext);
  const { wishlist, toggleWishListItem } = value;

  useEffect(() => {
    async function getMovieDetails() {
      setStatus(statusConstansts.inProgress);
      // console.log(id)
      const jwtToken = Cookies.get("jwt_token");
      // console.log(jwtToken);
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const getMovieDetailsApiUrl = `https://jayauthenticationserver.onrender.com/movies/${id}`;
      const response = await fetch(getMovieDetailsApiUrl, options);
      // console.log(response)
      if (response.ok === true) {
        const data = await response.json();
        // console.log(data)
        const updatedData = {
          id: data.id,
          imdbId: data.imdb_id,
          adult: data.adult,
          backdropPath: data.backdrop_path,
          belongsToCollection: data.belongs_to_collection,
          budget: data.budget,
          genres: data.genres,
          homepage: data.homepage,
          originalLanguage: data.original_language,
          title: data.title,
          overview: data.overview,
          popularity: data.popularity,
          posterPath: data.poster_path,
          productionCompanies: data.production_companies,
          releaseDate: data.release_date,
          revenue: data.revenue,
          runtime: data.runtime,
          releasedLanguages: data.spoken_languages,
          status: data.status,
          tagline: data.tagline,
          rating: data.vote_average.toFixed(1),
          voteCount: data.vote_count,
        };
        // console.log(updatedData)
        const timerId = setTimeout(() => {
          updateMovieDetails(updatedData);
          setStatus(statusConstansts.success);
        }, 1000);
      } else {
        setStatus(statusConstansts.failure);
      }
    }
    getMovieDetails();
    // console.log("effect executed")
  }, [id]);

  const renderMovieDetails = () => {
    const {
      id,
      title,
      backdropPath,
      posterPath,
      popularity,
      imdbId,
      adult,
      belongsToCollection,
      budget,
      genres,
      homepage,
      originalLanguage,
      overview,
      productionCompanies,
      releaseDate,
      revenue,
      runtime,
      releasedLanguages,
      rating,
      voteCount,
    } = movieDetails;
    const item = wishlist.find((each) => each.id === id);
    let isWishListed;
    if (item === undefined) {
      isWishListed = false;
    } else {
      isWishListed = true;
    }

    let newRuntime =
      runtime > 60
        ? `${Math.floor(runtime / 60)}hr  ${runtime % 60}min`
        : `${runtime}min`;
    return (
      <div
        className="movie-details-main-card"
        style={{
          backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.700),rgba(0, 0, 0, 0.600)),url(https://image.tmdb.org/t/p/original${backdropPath})`,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${posterPath}`}
          className="movie-details-poster-image"
          alt="poster"
        />
        <div className="details-inner-card-1">
          <h1 className="md-title">
            {title} <span className="md-adult-tag">{adult ? "A" : "U/A"}</span>
          </h1>

          <p className="rating-votes md-rating">
            <AiFillStar className="star-icon md-icon" />
            {rating}
            <BsFillSuitHeartFill className="heart-icon md-icon" /> {voteCount}
          </p>
          <div className="wishlist-link-conatiner">
            <button
              type="button"
              className={`md-wishlist-btn`}
              onClick={() => toggleWishListItem(movieDetails)}
            >
              {isWishListed ? (
                <BsBookmarkCheckFill className="play-icon" />
              ) : (
                <BsBookmarkPlus className="play-icon" />
              )}
              {isWishListed ? "Wishlisted" : "Wishlist"}
            </button>
            <a
              className="visit-page-link"
              rel="noreferrer"
              href={homepage}
              target="_blank"
            >
              Visit official page{" "}
              <BiLinkExternal className="visit-page-link-icon" />
            </a>
          </div>
          <ul className="genre-list">
            <span className="list-category">Genre:</span>
            {genres.map((each) => (
              <li key={each.name} className="laguage-item">
                {each.name}
              </li>
            ))}
          </ul>
          <ul className="laguage-list">
            <span className="list-category">Available languages:</span>
            {releasedLanguages.map((each) => (
              <li key={each.name} className="laguage-item">
                {each.english_name}
              </li>
            ))}
          </ul>
          <hr className="separator-line" />
          <p className="md-story">STORY</p>
          <p className="md-story-overview">{overview}</p>
          <hr className="separator-line" />
          <p className="md-story">Details</p>
          <p className="md-story-overview">
            <span className="md-category-sub-heading">Released on:</span>{" "}
            {releaseDate}
            <span className="md-category-sub-heading-2">Duration:</span>{" "}
            {newRuntime}
            <span className="md-category-sub-heading-2">Popularity:</span>{" "}
            {popularity.toFixed(2)}
          </p>
          <ul className="production-list">
            <span className="list-category">Produced by:</span>
            {productionCompanies.map((each) => (
              <li key={each.name} className="producer-list-item">
                {/* <img src={`https://image.tmdb.org/t/p/original${each.logo_path}`} 
                            alt="producer"
                            className="producer-image"
                            /> */}
                {each.name}
              </li>
            ))}
          </ul>
          <p className="md-story-overview">
            <span className="md-category-sub-heading">Budget:</span>{" "}
            {(budget / 10000000).toFixed(1)} Cr
            <span className="md-category-sub-heading-2">Collection:</span>{" "}
            {(revenue / 10000000).toFixed(1)} Cr
          </p>
        </div>
      </div>
    );
  };

  const renderLoader = () => (
    <div className="header">
      <div className="loader-container">
        <TailSpin color="red" />
      </div>
    </div>
  );

  let details;
  switch (status) {
    case statusConstansts.success:
      details = renderMovieDetails();
      break;
    case statusConstansts.inProgress:
      details = renderLoader();
      break;
    default:
      details = null;
  }
  // console.log("return executed")
  return (
    <div className="main-background">
      <Sidebar />
      <div className="content-container">
        <Navbar />
        {details}
        {status === statusConstansts.success && <SimilarMovies movieId={id} />}
      </div>
    </div>
  );
};

export default MovieDetails;
