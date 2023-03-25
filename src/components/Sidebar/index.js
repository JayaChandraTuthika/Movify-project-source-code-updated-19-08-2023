import { Link } from 'react-router-dom'

import './index.css'

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <h1>
                Logo
            </h1>
            <p className='side-bar-menu-heading'>
                Menu
            </p>
            <Link className='sidebar-links'>Home</Link>
            <Link className='sidebar-links'>Popular</Link>
            <Link className='sidebar-links'>TV Shows</Link>
            <Link className='sidebar-links'>Wishlisted</Link>
            <div className='sidebar-bottom-container'>
            <p className='side-bar-menu-heading'>General</p>
            <Link className='sidebar-links'>Settings</Link>
            <Link className='sidebar-links'>Log out</Link>
            </div>
            
        </div>
    )
}

export default Sidebar