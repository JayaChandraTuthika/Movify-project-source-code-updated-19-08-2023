import {  useEffect, useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"


import './index.css'
import { TailSpin } from "react-loader-spinner"
import Cookies from "js-cookie"
import { RiKey2Fill} from "react-icons/ri"
import { MdOutlineMailOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const statusConstansts = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE",
}

const UserSettings = () => {
    const [usernameInput,setUsername] = useState("")
    const [passwordInput,setPassword] = useState("")
    const [emailInput,setEmail] = useState("")
    const [editting,setEditting] = useState(false)
    const [status,setStatus] = useState(statusConstansts.initial)
    const navigate = useNavigate()
    // const value = useContext(MoviesContext)
    // const {userDetails} = value
    // console.log(userDetails)
    
    useEffect(() => {
        getUserProfileDetails()
    },[])
    
    const getUserProfileDetails = async () => {
        setStatus(statusConstansts.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const options = {
            method:"GET",
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const response = await fetch("https://jayauthenticationserver.onrender.com/profile-details", options)
        const data = await response.json()
        if (response.ok===true){
            console.log(data)
            // onApiSuccess(data)
            setUsername(data.username)
            setPassword(JSON.parse(Cookies.get('userDetails')).password)
            setEmail(data.email)
            setStatus(statusConstansts.success)
        }else{
            console.log(data)
            setStatus(statusConstansts.failure)
            // onApiFailure(data.message)
        }
    }

    
    const renderLoader = () => (
        <div className="header">
            <div className="loader-container">
                <TailSpin color="red"/>
            </div>
        </div>
    )

    const onSaveSettings = async () => {
        setEditting(!editting)
        const jwtToken =Cookies.get('jwt_token')
        const user = {
            username:usernameInput,
            password:passwordInput,
            email:emailInput
        }
        const options = {
            method:"PUT",
            headers:{
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        }
        const response = await fetch("https://jayauthenticationserver.onrender.com/update-profile", options)
        const data = await response.json()
        console.log(data)
        if (response.ok===true ){
            Cookies.remove('jwt_token')
            Cookies.remove('userDetails')
            navigate('/login')
            
        }

    }

    const renderProfileDetails = () => {
        // const {password} = JSON.parse(Cookies.get('userDetails'))
        return (
            <div className="profile-container">
                <div className="detail-item-1">
                    <AiOutlineUser className="details-icon-style"/>
                    <div className="details-text">
                        <p className="details-name">
                            USERNAME
                        </p>
                        <div className="input-edit-container">
                            {
                                editting ? <input type="text" className="detail-item-feild-input" 
                                value={usernameInput}
                                onChange={(e) => setUsername(e.target.value)}
                                /> :<p className="detail-item-feild-text">{usernameInput}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="detail-item-1">
                    <RiKey2Fill className="details-icon-style"/>
                    <div className="details-text">
                        <p className="details-name">
                            PASSWORD
                        </p>
                        <div className="input-edit-container">
                            {
                                editting ? <input type="text" className="detail-item-feild-input" 
                                        value={passwordInput}
                                        onChange={(e) => setPassword(e.target.value)}
                                        /> :<p className="detail-item-feild-text">{passwordInput}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="detail-item-1">
                    <MdOutlineMailOutline className="details-icon-style"/>
                    <div className="details-text">
                        <p className="details-name">
                            EMAIL
                        </p>
                        <div className="input-edit-container">
                            {
                                editting ? <input type="text" className="detail-item-feild-input" 
                                            value={emailInput}
                                            onChange={(e) => setEmail(e.target.value)}
                                            /> :<p className="detail-item-feild-text">{emailInput}</p>
                            }
                        </div>
                    </div>
                </div>
                {
                    editting? <><button type="button" className="save-profile-details-btn" onClick={onSaveSettings}>
                                Save & Logout
                                </button>
                                <button type="button" className="cancel-edit-profile-details-btn" onClick={() => setEditting(!editting)}>
                                Cancel
                                </button>
                                </>
                                :
                            <button type="button" className="edit-profile-details-btn" onClick={() => setEditting(!editting)}>
                            Edit
                            </button>
                }
            </div>
        )
    }

    let details

    switch(status){
        case statusConstansts.success:
            details = renderProfileDetails()
            break
        case statusConstansts.inProgress:
            details = renderLoader()
            break
        default:
            details = null
            break
    }
    
    
    // console.log("return executed")
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

export default UserSettings
