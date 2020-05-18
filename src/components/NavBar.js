import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import "../styles/stylesheet.css"

function NavBar() {
    const UserEmail = useSelector(state => state.user.UserEmail);
    return (
        <div>
            <nav>
                <ul id='menu'>                   
                    <li><a className='prett' href='#' title='Menu'>MENU</a>
                    <ul className='menus'>
                        <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>Planets</a>
                        <ul className='submenu'>
                            <li><a href="/PlanetList" title="Sub Menu">Planet List</a></li>
                            <li><a href="/PlanetDetail" title="Sub Menu">Planet Detail</a></li>
                            <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                            <li><a href="/SectorView" title="Sub Menu">Sector</a></li>
                            <li><a href="/SystemView" title="Sub Menu">System</a></li>
                            {UserEmail &&
                            <li><a href="/Logout/lo" title="Sub Menu">Logout</a></li>
                            }
                            {!UserEmail &&
                            <li><a href="/" title="Sub Menu">Login</a></li>
                            }
                        </ul>
                        </li>
                        <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>Ships</a>
                        <ul className='submenu'>
                            <li><a href="/PlanetList" title="Sub Menu">Planet List</a></li>
                            <li><a href="/PlanetDetail" title="Sub Menu">Planet Detail</a></li>
                            <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                            <li><a href="/SectorView" title="Sub Menu">Sector</a></li>
                            <li><a href="/SystemView" title="Sub Menu">System</a></li>
                            <li><a href="/" title="Sub Menu">Login</a></li>
                        </ul>
                        </li>
                        <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>Info</a>
                        <ul className='submenu'>
                            <li><a href="/PlanetList" title="Sub Menu">Planet List</a></li>
                            <li><a href="/PlanetDetail" title="Sub Menu">Planet Detail</a></li>
                            <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                            <li><a href="/SectorView" title="Sub Menu">Sector</a></li>
                            <li><a href="/SystemView" title="Sub Menu">System</a></li>
                            <li><a href="/" title="Sub Menu">Login</a></li>
                        </ul>
                        </li>                        
                    </ul>
                    </li>
                    <li><a className='prett' href='#' title='Menu'>SETTING</a>
                    <ul className='menus'>
                        <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>USER</a>
                        <ul className='submenu'>
                            <li><a href="/PlanetList" title="Sub Menu">Planet List</a></li>
                            <li><a href="/PlanetDetail" title="Sub Menu">Planet Detail</a></li>
                            <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                            <li><a href="/SectorView" title="Sub Menu">Sector</a></li>
                            <li><a href="/SystemView" title="Sub Menu">System</a></li>
                            <li><a href="/" title="Sub Menu">Login</a></li>
                        </ul>
                        </li>
                    </ul>
                    </li>                    
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;