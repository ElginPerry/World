import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <nav>
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
            </nav>
        </div>
    )
}

export default NavBar;