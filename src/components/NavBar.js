import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import styles from '../styles/stylesheet.css'

function NavBar() {
    const UserEmail = useSelector(state => state.user.UserEmail);
    return (
        <div style={{alignItems:"center", width:"100%", margin:"auto"}}>
            <ul>
                <li>
                    <Link to="/PlanetList">Planet List</Link>
                </li>
                <li>
                    <Link to="/PlanetDetail">Planet Detail</Link>
                </li>
                <li>
                    <Link to="/">Login</Link>
                </li>
            </ul>
            <div>
                {UserEmail}
            </div>
        </div>
    )
}

export default NavBar;