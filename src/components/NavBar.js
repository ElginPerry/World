import React from 'react'
import {useSelector} from 'react-redux'
import "../styles/stylesheet.css"
import windim from "../components/WindowDimensions";

function NavBar() {
    const UserEmail = useSelector(state => state.user.UserEmail);
    const { height, width } = windim();
    return (
        <div style={{width:300, display:"flex"}}>
            <div style={{width:140,flex:1}}>
                <nav>
                    <ul id='menu'>                   
                        <li><a className='prett' href='#' title='Menu'>MENU</a>
                        {UserEmail &&
                        <ul className='menus'>
                            <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>Planets</a>
                            <ul className='submenu'>
                                <li><a href="/PlanetList" title="Sub Menu">Planet List</a></li>
                                <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                                <li><a href="/SystemView" title="Sub Menu">System</a></li>
                            
                                <li><a href="/Logout/lo" title="Sub Menu">Logout</a></li>
                            </ul>
                            </li>
                            <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>Ships</a>
                            <ul className='submenu'>
                                <li><a href="/ShipDesign" title="Sub Menu">Ship Design</a></li>
                                <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                                <li><a href="/SystemView" title="Sub Menu">System</a></li>
                                <li><a href="/" title="Sub Menu">Login</a></li>
                            </ul>                    
                            </li>
                            <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>Info</a>
                            <ul className='submenu'>
                                <li><a href="/PlanetTypes" title="Sub Menu">Planet Types</a></li>
                                <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                                <li><a href="/SystemView" title="Sub Menu">System</a></li>
                                <li><a href="/" title="Sub Menu">Login</a></li>
                            </ul>
                            </li>                        
                        </ul>
                        }
                        {!UserEmail &&
                        <ul className='menus'>
                            <li className='has-submenu'><a className='prett' href='#' title='Dropdown 1'>Info</a>
                            <ul className='submenu'>
                                <li><a href="/PlanetTypes" title="Sub Menu">Planet Types</a></li>
                                <li><a href="/GalaxyView" title="Sub Menu">Galaxy</a></li>
                                <li><a href="/SystemView" title="Sub Menu">System</a></li>
                                <li><a href="/" title="Sub Menu">Login</a></li>
                            </ul>
                            </li>                        
                        </ul>
                        }
                        </li>
                    </ul>
                </nav>
            </div>  
            <div style={{width:160,flex:1, display:"flex", color:"white",padding: "20px 15px 0 15px"}}>
                <div style={{flex:1, width:140, display:"inline-block", fontFamily:"Impact, Charcoal"}}>Starshipfleets.Com</div> 
                <div style={{flex:1, width:20, display:"inline-block"}}>&nbsp;<span style={{backgroundColor:UserEmail?"green":"red"}}>&nbsp;&nbsp;&nbsp;</span></div>
            </div>          
        </div>
    )
}

export default NavBar;