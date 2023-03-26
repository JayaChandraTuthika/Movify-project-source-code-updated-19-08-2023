import { Link } from 'react-router-dom'
import {BiHomeAlt,BiStar,BiLogOut} from 'react-icons/bi'
import {ImDisplay} from 'react-icons/im'
import {RiBookmark3Line} from 'react-icons/ri'
import {MdOutlineSettings} from 'react-icons/md'

import './index.css'

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <h1 className='logo-text-sidebar'>
                <img src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1679769378/Movify-project-resources/Logo_M_hqvhm5.png" 
                alt="" 
                className='logo-image-sidebar'/>OVIFY
            </h1>
            <p className='side-bar-menu-heading'>
                Menu
            </p>
            <Link className='sidebar-links'><BiHomeAlt className='side-bar-option-icon'/>Home</Link>
            <Link className='sidebar-links'><BiStar className='side-bar-option-icon'/>Popular</Link>
            <Link className='sidebar-links'><ImDisplay className='side-bar-option-icon'/>TV Shows</Link>
            <Link className='sidebar-links'><RiBookmark3Line className='side-bar-option-icon'/>Wishlisted</Link>
            <div className='sidebar-bottom-container'>
            <p className='side-bar-menu-heading'>General</p>
            <Link className='sidebar-links'><MdOutlineSettings className='side-bar-option-icon'/>Settings</Link>
            <Link className='sidebar-links'><BiLogOut className='side-bar-option-icon'/>Log out</Link>
            </div>
            
        </div>
    )
}

export default Sidebar