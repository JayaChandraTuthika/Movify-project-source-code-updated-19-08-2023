import { useContext, useState } from 'react'
import {BsSearchHeartFill,BsPersonCircle} from 'react-icons/bs'
import {MdNotificationsActive} from 'react-icons/md'
import Popup from 'reactjs-popup'
// import {IoPersonCircleSharp} from 'react-icons/io'
// import {CgProfile} from 'react-icons/cg'
import { Link,useNavigate, useResolvedPath } from "react-router-dom"
import MoviesContext from '../../context/MoviesContext'

import './index.css'
import Cookies from 'js-cookie'


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
    const onkeyDownSearch = (event) => {
        // console.log(event.key)
        if (event.key === "Enter"){
            onChangesearchText(searchvalue)
            navigate('/search')
        }
    }

    const onLogout = () => {
        Cookies.remove('jwt_token')
        Cookies.remove('userDetails')
        navigate('/login')
    }
    
    return (
        <nav className="navbar-container">
            <div className="search-input-container">
            <input type="text" className="search-input-field" placeholder="Enter Movie Name To Search"
                value = {searchvalue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={onkeyDownSearch}
            />
            <button type="button" className="search-input-btn" onClick={onNavigateSearch}><BsSearchHeartFill className='search-icon-btn'/></button>

            </div>
                <span className="nav-link">
                    
                    <Popup
                        trigger={<MdNotificationsActive className='profile-icon'/>}
                        modal
                        className='logout-popup'
                    >
                        {close => (
                            <div className='popup-box'>
                            <h1 className='pp-heading'>This feature is coming soon</h1>
                            <div className='pp-btn-container'>
                                <button onClick={close} className='pp-close-btn'>Close</button>
                                
                            </div>
                            </div>
                            
                        )}
                    </Popup>
                </span>
                <span to="/" className="nav-link">
                    <Popup
                        trigger={<BsPersonCircle className='profile-icon'/>}
                        modal
                        className='logout-popup'
                    >
                        {close => (
                            <div className='popup-box'>
                            <h1 className='pp-heading'>This feature is coming soon</h1>
                            <div className='pp-btn-container'>
                                <button onClick={close} className='pp-close-btn'>Close</button>
                                
                            </div>
                            </div>
                            
                        )}
                    </Popup>
                </span>
        </nav>
    )
}

export default Navbar