import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
import {AiFillStar} from 'react-icons/ai'
import {BsFillSuitHeartFill} from 'react-icons/bs'
import {BiCameraMovie} from 'react-icons/bi'
import {RiMovie2Fill} from 'react-icons/ri'
import {MdMovieFilter} from 'react-icons/md'
import  {TailSpin } from 'react-loader-spinner'
import { SlickCardContainer } from "./styled.js"
import Slider from "react-slick";

import './index.css'


const statusConstansts = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE",
}

const UpcomingSlider = () => {
    const [upcomingList,updateUpcomingList] = useState([])
    const [status,setStatus] = useState(statusConstansts.initial)

    useEffect(() => {
        getUpcomingMovies()
        
    },[])

    const getUpcomingMovies = async () => {
        setStatus(statusConstansts.inProgress)
        const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=fae62ec587f8bc50f34e46b6d33b41e2&language=en-US&page=1"
        const response = await fetch(upcomingMoviesUrl)
        // console.log(response)
        if (response.ok===true){
            const data = await response.json()
            // console.log(data)
            const updatedData = data.results.map(each=>({
                id:each.id,
                title:each.title,
                rating:each.vote_average.toFixed(1),
                genreIds:each.genre_ids,
                backdropPath:each.backdrop_path,
                posterPath:each.poster_path,
                overview:each.overview,
                releaseDate:each.release_date,
                votesCount:each.vote_count
            }))
            console.log(updatedData)
            updateUpcomingList(updatedData)
            setStatus(statusConstansts.success)
        }else{
            setStatus(statusConstansts.failure)
        }
        
    }

    const renderUpcoming = () => {
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
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        }

        return <div className="slick-container">
            <Slider {...settings}>
      
        {upcomingList.map(movie => (
            <SlickCardContainer key={movie.id} backgroundUrl={`https://image.tmdb.org/t/p/original${movie.posterPath}`}>
                <div className="overlay-movie-card">
                        <p className="movie-card-title">{movie.title}</p>
                        <p className="rating-votes">
                            <AiFillStar className="star-icon"/>{movie.rating} 
                            <BsFillSuitHeartFill className="heart-icon"/> {movie.votesCount}
                        </p>
                        <p className="movie-card-description">{movie.overview}</p>
                        <button type="button" className="movie-card-btn">See Details ></button>
                </div>
                
            </SlickCardContainer>
        ))}
        
      
    </Slider>
        </div>
    }

    const renderUpcomingLoader = () => (<div className="slick-container">
            <div className="loader-container">
                <TailSpin color="red"/>
            </div>
        </div>)
    

    let upcoming
    switch (status) {
        case statusConstansts.success:
            upcoming = renderUpcoming()
            break;
        case statusConstansts.inProgress:
            upcoming = renderUpcomingLoader()
            break
        default:
            upcoming = null
            break;

    }

    return (
        <>
        <h1 className="home-slick-heading"><MdMovieFilter className="home-slider-heading-icon"/>Upcoming</h1>
            {upcoming}
        </>
        
            
            
        
    )
}

export default UpcomingSlider
