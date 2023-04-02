import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {AiFillStar} from 'react-icons/ai'
import {BsFillSuitHeartFill,BsFillPlayFill,BsBookmarkPlus, BsBookmarkCheckFill} from 'react-icons/bs'

import  {TailSpin } from 'react-loader-spinner'

import MoviesContext from "../../context/MoviesContext"
import Navbar from '../Navbar'
import TrendingSlider from "../TrengingSlider/index.js"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './index.css'
import Sidebar from "../Sidebar";
import UpcomingSlider from "../UpcomingSlider"
import { MdDoubleArrow } from "react-icons/md"
import HomePoster from "../HomePoster"

const statusConstansts = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE",
}

const Home = () => {
    // console.log('home')
    return (
        <div className='main-background'>
            <Sidebar/>
            <div className="content-container">
            <Navbar/>
            <HomePoster/>
            <TrendingSlider/>
            <UpcomingSlider/>
            </div>

        </div>
    )
}

export default Home
