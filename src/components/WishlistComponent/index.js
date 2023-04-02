import { useContext } from "react"
import { AiFillStar } from "react-icons/ai"
import { BsFillSuitHeartFill } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import MoviesContext from "../../context/MoviesContext"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import { SlickCardContainer } from "./styled"

import './index.css'

const WishlistComponent = () => {
    const value = useContext(MoviesContext)
    const {wishlist} = value
    const navigate = useNavigate()

    const renderEmptyView = () => (
        <div className="empty-wishlist-conatainer">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" 
            alt="empty-wishlist" 
            className="empty-wishlist-image"/>
            <h1 className="no-wishlist-heading">No Movies Wishlisted</h1>
            <button type="button" className="wishlist-go-home-btn" onClick={() => navigate('/')}>Go Home</button>
        </div>
    )

        return (
            <div className='main-background'>
                <Sidebar/>
                <div className="content-container">
                    <Navbar/>
                    <h1 className='wishlist-movies-heading'>Similar Movies</h1>
                    {wishlist.length===0 && renderEmptyView()}
                    <ul className='wishlist-movies-list'>
                    {
                        wishlist.map(movie=> (
                            <Link to={movie.seasons===undefined?`/movies/${movie.id}`:`/tv/${movie.id}`} key={movie.id} className="link-style">
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
                        ))
                    }
    
                    </ul>
                </div>
    
            </div>
    
        )

    

    
}


export default WishlistComponent