import { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { MdDoubleArrow } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";
import { SlickCardContainer } from "./styled.js";
import Slider from "react-slick";
import "./index.css";
import { Link } from "react-router-dom";

import MoviesContext from "../../context/MoviesContext";
import Cookies from "js-cookie";

const statusConstansts = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const RecommendationsSlider = () => {
  const [trendingList, updateTrendingList] = useState([]);
  const [status, setStatus] = useState(statusConstansts.initial);
  const value = useContext(MoviesContext);

  useEffect(() => {
    getRecommendedMovies();
  }, []);

  const getRecommendedMovies = async () => {
    setStatus(statusConstansts.inProgress);
    const movieId = value.wishlist.length === 0 ? 299536 : value.wishlist[0].id;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const trendingMoviesUrl = `https://jayauthenticationserver.onrender.com/recommended?movieId=${movieId}`;
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

  const NextArrow = (props) => {
    const { onClick, className, style } = props;
    return (
      <div className="next-arrow-slick" onClick={onClick}>
        <MdDoubleArrow className="slick-arrow-icon-right" />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick, className, style } = props;
    return (
      <div className="prev-arrow-slick" onClick={onClick}>
        <MdDoubleArrow className="slick-arrow-icon-left" />
      </div>
    );
  };

  const renderTrending = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="slick-container">
        <h1 className="home-slick-heading">
          <BsFire className="home-slider-heading-icon" />
          Recommended
        </h1>
        <Slider {...settings}>
          {trendingList.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="link-style"
            >
              <SlickCardContainer
                backgroundUrl={`https://image.tmdb.org/t/p/original${movie.posterPath}`}
              >
                <div className="overlay-movie-card">
                  {/* <BsPlayFill color="#ffffff" className="movie-card-play-icon"/> */}
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
                  {/* <BsPlayFill color="#ffffff" className="movie-card-play-icon"/> */}
                </div>
              </SlickCardContainer>
            </Link>
          ))}
        </Slider>
      </div>
    );
  };

  const renderTrendingLoader = () => (
    <div className="slick-container">
      <div className="loader-container">
        <TailSpin color="red" />
      </div>
    </div>
  );

  let trending;
  switch (status) {
    case statusConstansts.success:
      trending = renderTrending();
      break;
    case statusConstansts.inProgress:
      trending = renderTrendingLoader();
      break;
    default:
      trending = null;
      break;
  }

  return <>{trending}</>;
};

export default RecommendationsSlider;
