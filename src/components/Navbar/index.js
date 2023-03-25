
import { Link } from "react-router-dom"

import './index.css'


const Navbar = () => {
    

    return (
        <nav className="navbar-container">
            
            
                <Link className="nav-link">
                    Search
                </Link>
                <Link className="nav-link">
                    Profile
                </Link>
                <button className="logout-btn">
                    Logout
                </button>
                
            
        </nav>
    )
}

export default Navbar