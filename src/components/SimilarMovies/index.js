
import { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './index.css'
import { SlickCardContainer } from './styled.js'

const statusConstansts = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE",
}

const SimilarMovies = (props) => {
    const [similarMoviesList,updateSimilarMovies] = useState([statusConstansts.initial])
    const [status,updateStatus] = useState()
    const {movieId} = props
    useEffect(() => {
        getSimilarMovies()
    },[])

    
    const getSimilarMovies = async () => {
        updateStatus(statusConstansts.inProgress)
        const response = await fetch (`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=fae62ec587f8bc50f34e46b6d33b41e2&language=en-US&page=1`)
        if (response.ok===true){
            const data = await response.json()
            const updatedData = data.results.map(e => ({
                id:e.id,
                title:e.title,
                rating:e.vote_average.toFixed(1),
                genreIds:e.genre_ids,
                backdropPath:e.backdrop_path,
                posterPath:e.poster_path,
                overview:e.overview,
                releaseDate:e.release_date,
                votesCount:e.vote_count
            }))
            updateSimilarMovies(updatedData)
            updateStatus(statusConstansts.success)
        }
    }
    const renderSimilarMovies = () => (
            <>
                <h1 className='similar-movies-heading'>Similar Movies</h1>
                <ul className='similar-movies-list'>
                {similarMoviesList.map(movie => (
                    <Link to={`/movies/${movie.id}`} key={movie.id} className="link-style">
                        <SlickCardContainer  backgroundUrl={`https://image.tmdb.org/t/p/original${movie.posterPath}`}>
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
                    </Link>
            
        ))}
                </ul>

            </>
        
    )



    

    switch (status) {
        case statusConstansts.success:
            return renderSimilarMovies()
            
        default:
            return null
    }

    

}

export default SimilarMovies