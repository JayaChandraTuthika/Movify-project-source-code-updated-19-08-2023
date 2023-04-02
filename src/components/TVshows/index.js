import { useContext, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import MoviesContext from '../../context/MoviesContext'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { SlickCardContainer } from './styled'

import './index.css'

const statusConstansts = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE",
}


const TVshows = () => {
    
    const [status,setStatus] = useState(statusConstansts.initial)
    const [tvShows,updateTvShows] = useState([])
    const [page,setPage] = useState(1)
    const [maxPages,setMaxPages] = useState(1)
    // console.log(searchText)

    const tvShowsApiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=fae62ec587f8bc50f34e46b6d33b41e2&language=en-US&page=${page}`

    useEffect(() => {
        async function getSearchResults(){
            setStatus(statusConstansts.inProgress)
            const response = await fetch(tvShowsApiUrl)
            // console.log(response)
            if (response.ok===true){
                const data = await response.json()
                console.log(data)
                const pagesAvailable = data.total_pages
                const totalResults = data.total_results
                const updatedData = data.results.map(e=> ({
                    id:e.id,
                    title:e.name,
                    rating:e.vote_average.toFixed(1),
                    genreIds:e.genre_ids,
                    backdropPath:e.backdrop_path,
                    posterPath:e.poster_path,
                    overview:e.overview,
                    releaseDate:e.first_air_date,
                    votesCount:e.vote_count
                }))
                // console.log(updatedData)
                updateTvShows(updatedData)
                setMaxPages(pagesAvailable)
                setStatus(statusConstansts.success)
            }else{
                setStatus(statusConstansts.failure)
            }


        }
        
        getSearchResults()

    },[page])

    const onClickIncreasePageNumber= () => {
        if (page < maxPages){
            setPage(page+1)
        }
    }

    const onClickReducePageNumber = () => {
        if (page > 1){
            setPage(page-1)
        }
    }


    const renderTvShows = () => (
        <>
        <ul className='similar-movies-list'>
                {tvShows.map(show => (
                    <Link to={`/tv/${show.id}`} key={show.id} className="link-style">
                        <SlickCardContainer  backgroundUrl={`https://image.tmdb.org/t/p/original${show.posterPath}`}>
                            <div className="overlay-movie-card">
                                    <p className="movie-card-title">{show.title}</p>
                                    <p className="rating-votes">
                                        <AiFillStar className="star-icon"/>{show.rating} 
                                        <BsFillSuitHeartFill className="heart-icon"/> {show.votesCount}
                                    </p>
                                    <p className="movie-card-description">{show.overview}</p>
                                    <button type="button" className="movie-card-btn">See Details ></button>
                            </div>
                            
                        </SlickCardContainer>
                    </Link>
            
        ))}
                </ul>
                {
                    tvShows.length > 15 && <div className='pages-container'>
                    <button className='page-button' type="button" onClick={onClickReducePageNumber}>Prev</button>
                        <span className='page-number-primary'>{page}</span>
                        {maxPages >= 2 && <span className='page-number-secondary'>{page+1}</span>}
                        {maxPages >= 3 && <span className='page-number-secondary'>{page+2}</span>}
                    <button className='page-button' type="button" onClick={onClickIncreasePageNumber}>Next</button>
                </div>
                }
            
            </>
    )

    let results

    switch (status){
        case statusConstansts.success:
            results = renderTvShows()
            break
        default:
            results = null
    }

    return (
        <div className='main-background'>
            <Sidebar/>
            <div className="content-container">
                <Navbar/>
                {results}
                
                
            </div>

        </div>

    )
}


export default TVshows