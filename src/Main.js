import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, browserHistory } from 'react-router-dom'
import PlanetList from './screens/PlanetList';
import PlanetDetail from './screens/PlanetDetail'
import LoginUser from './redux/Actions/LoginActionCreators';
import NavBar from './components/NavBar';
import Login from './screens/Login';

const Main = () => {
    const dispatch = useDispatch()

    //useEffect(() => {
        // Modify the redux store: Dispatch a function with the proper data which triggers redux to update
        //dispatch(LoginUser('35842969', '{435435-35-3523-2-324255'))
    //}, [])

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