import { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { SlickCardContainer } from "./styled";

import "./index.css";
import { TailSpin } from "react-loader-spinner";
import { waitFor } from "@testing-library/react";
import Cookies from "js-cookie";

const statusConstansts = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Popular = () => {
  const [status, setStatus] = useState(statusConstansts.initial);
  const [popularMovies, updatePopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  // console.log(searchText)

  useEffect(() => {
    async function getSearchResults() {
      setStatus(statusConstansts.inProgress);
      const jwtToken = Cookies.get("jwt_token");
      // console.log(jwtToken);
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const popularApiUrl = `https://jayauthenticationserver.onrender.com/popular?page=${page}`;
      const response = await fetch(popularApiUrl, options);
      // console.log(response)
      if (response.ok === true) {
        const data = await response.json();
        // console.log(data)
        const pagesAvailable = data.total_pages;
        const totalResults = data.total_results;
        const updatedData = data.results.map((e) => ({
          id: e.id,
          title: e.title,
          rating: e.vote_average.toFixed(1),
          genreIds: e.genre_ids,
          backdropPath: e.backdrop_path,
          posterPath: e.poster_path,
          overview: e.overview,
          releaseDate: e.release_date,
          votesCount: e.vote_count,
        }));
        // console.log(updatedData)
        const timerId = setTimeout(() => {
          updatePopularMovies(updatedData);
          setMaxPages(pagesAvailable);
          setStatus(statusConstansts.success);
        }, 1000);
      } else {
        setStatus(statusConstansts.failure);
      }
    }

    getSearchResults();
  }, [page]);

  const onClickIncreasePageNumber = () => {
    if (page < maxPages) {
      setPage(page + 1);
    }
  };

  const onClickReducePageNumber = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const delay = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), time);
    });
  };

  const renderSearchResults = () => (
    <>
      <ul className="similar-movies-list">
        {popularMovies.map((movie, i) => {
          return (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="link-style"
            >
              <SlickCardContainer
                delay={i * 0.2}
                backgroundUrl={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
              >
                <div className="overlay-movie-card">
                  <p className="movie-card-title">{movie.title}</p>
                  <p className="rating-votes">
                    <AiFillStar className="star-icon" />
                    {movie.rating}
                    <BsFillSuitHeartFill className="heart-icon" />{" "}
                    {movie.votesCount}
                  </p>
                  <p className="movie-card-description">{movie.overview}</p>
                  <button type="button" className="movie-card-btn">
                    See Details >
                  </button>
                </div>
              </SlickCardContainer>
            </Link>
          );
        })}
      </ul>
      {popularMovies.length > 15 && (
        <div className="pages-container">
          <button
            className="page-button"
            type="button"
            onClick={onClickReducePageNumber}
          >
            Prev
          </button>
          <span className="page-number-primary">{page}</span>
          <span className="page-number-secondary">{page + 1}</span>
          <span className="page-number-secondary">{page + 2}</span>
          <button
            className="page-button"
            type="button"
            onClick={onClickIncreasePageNumber}
          >
            Next
          </button>
        </div>
      )}
    </>
  );

  const renderLoader = () => (
    <div className="header">
      <div className="loader-container">
        <TailSpin color="red" />
      </div>
    </div>
  );

  let results;

  switch (status) {
    case statusConstansts.success:
      results = renderSearchResults();
      break;
    case statusConstansts.inProgress:
      results = renderLoader();
      break;
    default:
      results = null;
  }

  return (
    <div className="main-background">
      <Sidebar />
      <div className="content-container">
        <Navbar />
        {results}
      </div>
    </div>
  );
};

export default Popular;
