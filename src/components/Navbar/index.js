import { useContext, useState } from 'react'
import {BsSearchHeartFill,BsPersonCircle} from 'react-icons/bs'
import {MdNotificationsActive} from 'react-icons/md'
// import {IoPersonCircleSharp} from 'react-icons/io'
// import {CgProfile} from 'react-icons/cg'
import { Link,useNavigate, useResolvedPath } from "react-router-dom"
import MoviesContext from '../../context/MoviesContext'

import './index.css'


const Navbar = () => {
    const value = useContext(MoviesContext)
    const {searchText,onChangesearchText} = value
    const [searchvalue,setSearchValue] = useState(searchText)
    
    
    const navigate = useNavigate()
    
    // console.log(searchText)
    const onNavigateSearch = () => {
        onChangesearchText(searchvalue)
        navigate('/search')
    }
    

    return (
        <nav className="navbar-container">
            <div className="search-input-container">
            <input type="text" className="search-input-field" placeholder="Enter Movie Name To Search"
                value = {searchvalue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <button type="button" className="search-input-btn" onClick={onNavigateSearch}><BsSearchHeartFill className='search-icon-btn'/></button>

            </div>
                <Link className="nav-link">
                    <MdNotificationsActive className='profile-icon'/>
                </Link>
                <Link className="nav-link">
                    <BsPersonCircle className='profile-icon'/>
                </Link>
        </nav>
    )
}

export default Navbar