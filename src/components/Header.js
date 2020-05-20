import React from 'react'
import {useSelector} from 'react-redux'
import windim from "../components/WindowDimensions";
import "../styles/stylesheet.css"

function Header() {
    const UserEmail = useSelector(state => state.user.UserEmail);
    const { height, width } = windim();
    return (
            <div>
                <div style={{color:"white", backgroundColor:"green", display:"inline-block", padding:"5px"}}>
                    {width<450 ? 'SF-' : 'StarShipFleets.com: '}
                </div>
                <div style={{color:"white", backgroundColor:"green", display:"inline-block", padding:"5px"}}>{UserEmail}</div>
            </div>
        )
    }
    
    export default Header;