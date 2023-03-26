import { useEffect, useMemo, useState } from "react"
import { useMatch, useMatches, useParams, useResolvedPath } from "react-router-dom"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

import './index.css'

const statusConstansts = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE",
}

const MovieDetails = (props) => {
    const [movieDetails,updateMovieDetails] = useState({})
    const [status,setStatus] = useState(statusConstansts.initial)
    const {id} = useParams()

    useEffect(() => {
        getMovieDetails()
    },[])
    
    const getMovieDetails = async () => {
        setStatus(statusConstansts.inProgress)
        
        console.log(id)
        const getMovieDetailsApiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=fae62ec587f8bc50f34e46b6d33b41e2&language=en-US`
        const response = await fetch(getMovieDetailsApiUrl)
        // console.log(response)
        if (response.ok===true){
            const data = await response.json()
            // console.log(data)
            const updatedData = {
                id:data.id,
                imdbId:data.imdb_id,
                adult:data.adult,
                backdropPath:data.backdrop_path,
                belongsToCollection:data.belongs_to_collection,
                budget:data.budget,
                genres:data.genres,
                homepage:data.homepage,
                originalLanguage:data.original_language,
                title:data.original_title,
                overview:data.overview,
                popularity:data.popularity,
                posterPath:data.poster_path,
                productionCompanies:data.production_companies,
                releaseDate:data.release_date,
                revenue:data.revenue,
                runtime:data.runtime,
                releasedLanguages:data.spoken_languages,
                status:data.status,
                tagline:data.tagline,
                rating:data.vote_average.toFixed(1),
                voteCount:data.vote_count
            }
            console.log(updatedData)
            updateMovieDetails(updatedData)
            setStatus(statusConstansts.success)
        }else{
            setStatus(statusConstansts.failure)
        }
        
    }

    const renderMovieDetails = () => {
        const {title,backdropPath,posterPath,
                popularity,imdbId,adult,
                belongsToCollection,
                budget,genres,homepage,
                originalLanguage,
                overview,
                productionCompanies,
                releaseDate,
                revenue,runtime,releasedLanguages,
                rating,voteCount

            } = movieDetails
        return (
            <div className="movie-details-main-card" style={{backgroundImage:`linear-gradient(to right,rgba(0, 0, 0, 0.700),rgba(0, 0, 0, 0.600)),url(https://image.tmdb.org/t/p/original${backdropPath})`}}>
                {movieDetails.title}
            </div>
        )

    }

    let details
    switch (status){
        case statusConstansts.success:
            details= renderMovieDetails()
            break
            
        default:
            details= null
           
    }
    return (
        <div className='main-background'>
            <Sidebar/>
            <div className="content-container">
                <Navbar/>
                {details}
            
            </div>

        </div>
    )
}

export default MovieDetails
