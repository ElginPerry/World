import React from 'react'
import {useSelector} from 'react-redux'
import "../styles/stylesheet.css"

function Header() {
    const UserEmail = useSelector(state => state.user.UserEmail);
    return (
            <div>
                <div style={{color:"white", backgroundColor:"green", display:"inline-block", padding:"5px"}}>StarShipFleets.com :</div>
                <div style={{color:"white", backgroundColor:"green", display:"inline-block", padding:"5px"}}>{UserEmail}</div>
            </div>
        )
    }
    
    export default Header;