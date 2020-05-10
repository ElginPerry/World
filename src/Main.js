import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PlanetList from './screens/PlanetList';
import PlanetDetail from './screens/PlanetDetail';
import GalaxyView from './screens/GalaxyView';
import SectorView from './screens/SectorView';
import SystemView from './screens/SystemView';
import NavBar2 from './components/NavBar2';
import Login from './screens/Login';

const Main = () => {
    return (
        <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>
            <Router >
            <div style={{height:"15%"}}>
                <NavBar2/>
            </div>
            <div style={{height:"85%"}}> 
                <Switch>
                    <Route exact path="/GalaxyView" component={GalaxyView} />
                    <Route path="/SectorView/:Galaxy?/:sectorNumber?" component={SectorView} />
                    <Route path="/SystemView/:Galaxy?/:sectorNumber?/:systemNumber?" component={SystemView} />
                    <Route exact path="/PlanetList" component={PlanetList} />
                    <Route path="/PlanetDetail/:planetType?" component={PlanetDetail} />
                    <Route path="/" component={Login} />                     
                </Switch>                
            </div>
            </Router >
        </div>
    )
}

export default Main