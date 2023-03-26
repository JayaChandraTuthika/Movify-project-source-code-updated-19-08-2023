import { useContext } from 'react'
import {BsSearchHeartFill} from 'react-icons/bs'
import { Link } from "react-router-dom"
import MoviesContext from '../../context/MoviesContext'

import './index.css'


const Navbar = () => {
    const value = useContext(MoviesContext)
    const {searchText,onChangesearchText} = value
    // console.log(searchText)

    return (
        <nav className="navbar-container">
            <div className="search-input-container">
            <input type="text" className="search-input-field" placeholder="Enter Movie Name To Search"
                value = {searchText}
                onChange={e => onChangesearchText(e.target.value)}
            />
            <button type="button" className="search-input-btn"><BsSearchHeartFill className='search-icon-btn'/></button>

            </div>

                
                <Link className="nav-link">
                    Search
                </Link>
                <Link className="nav-link">
                    Profile
                </Link>
                
                
            
        </nav>
    )
}

export default Navbar