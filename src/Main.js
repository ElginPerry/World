import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PlanetList from './screens/PlanetList';
import ShipDesign from './screens/ShipDesgn';
import PlanetType from './screens/PlanetTypes';
import PlanetDetail from './screens/PlanetDetail';
import PlanetTypeDetail from './screens/PlaneTypeDetail';
import GalaxyView from './screens/GalaxyView';
import SystemView from './screens/SystemView';
import NavBar from './components/NavBar';
import Login from './screens/Login';
import Header from './components/Header';
import FleetList from './screens/FleetList';

const Main = () => {
    return (
        <div style={{height:"100%"}}>
            <Header/>
            <Router >
            <div style={{height:"10%", minHeight:"50px"}}>
                <NavBar/>
            </div>
            <div style={{height:"90%", minHeight:"300px", overflow:"auto"}}> 
                <Switch>
                    <Route exact path="/GalaxyView/:Galaxy?" component={GalaxyView} />
                    <Route path="/SystemView/:Galaxy?/:sectorNumber?/:systemNumber?" component={SystemView} />
                    <Route exact path="/PlanetList" component={PlanetList} />
                    <Route exact path="/FleetList" component={FleetList} />
                    <Route exact path="/PlanetTypes" component={PlanetType} />
                    <Route path="/PlanetTypeDetail/:planetType?" component={PlanetTypeDetail} />
                    <Route path="/PlanetView/:planetID?" component={PlanetDetail} />
                    <Route path="/ShipDesign" component={ShipDesign} />
                    <Route path="/Logout/:logout?" component={Login} /> 
                    <Route path="/" component={Login} /> 
                </Switch>                
            </div>
            </Router >
        </div>
    )
}

export default Main