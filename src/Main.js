import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PlanetList from './screens/PlanetList';
import PlanetDetail from './screens/PlanetDetail'
import NavBar from './components/NavBar';
import Login from './screens/Login';

const Main = () => {
    return (
        <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>
            <Router >
            <div style={{height:"20%"}}>
                <NavBar/>
            </div>
            <div style={{height:"80%"}}> 
                <Switch>
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