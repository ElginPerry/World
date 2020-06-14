import * as ActionTypes from '../redux/ActionTypes'
import * as Calcs from '../components/Calcs'
import axios from 'axios';

export const  GetShipHulls = function(dispatch)
{         
    axios.get('http://apicall.starshipfleets.com/Ships/GetShipHulls')
    .then((response) => {   
        dispatch({type: ActionTypes.SET_SHIPHULLS,payload:response.data});
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
};

export const GetShipPods = function(dispatch)
{             
    axios.get('http://apicall.starshipfleets.com/Ships/GetShipPods')
    .then((response) => { 
        dispatch({type: ActionTypes.SET_SHIPPODS,payload:response.data});       
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
};

export const GetShipDesigns = function(dispatch, UserID)
{             
    axios.get('http://apicall.starshipfleets.com/Ships/GetShipDesignbyUser/' + UserID)
    .then((response) => { 
        dispatch({type: ActionTypes.SET_SHIPDESIGNS,payload:response.data});           
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
};

export const GetGalaxy = function(dispatch, GalaxyID)
{    
    axios.get("http://apicall.starshipfleets.com/Planet/GetGalaxy/" + GalaxyID)
    .then((response) => {
        var action;
        if (GalaxyID==1)
        {
            action = ActionTypes.SET_GALAXY1;
        }
        else if (GalaxyID==2)
        {
            action = ActionTypes.SET_GALAXY2;
        }
        else if (GalaxyID==3)
        {
            action = ActionTypes.SET_GALAXY2;
        }
        dispatch({type: action,payload:response.data});
        return response.data        
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {  
    });
}

export const GetFleets = function(dispatch,UserID)
{
    axios.get('http://apicall.starshipfleets.com/Ships/GetUserFleets/' + UserID)
    .then((response) => { 
        dispatch({type: ActionTypes.SET_USERFLEETS,payload:response.data}); 
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
}

export const GetUserDesigns = function(dispatch, UserID)
{
    axios.get('http://apicall.starshipfleets.com/Ships/GetShipDesignbyUser/' + UserID)
    .then((response) => { 
        dispatch({type: ActionTypes.SET_SHIPDESIGNS,payload:response.data});
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
}

export const MoveFleet = function(dispatch,UserID, FleetID, PlanetID)
{
    axios.get('http://apicall.starshipfleets.com/Ships/MoveFleet/' + UserID + '/' + FleetID + '/' + PlanetID)
    .then((response) => { 
        dispatch({type: ActionTypes.SET_USERFLEETS,payload:response.data}); 
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
}

export const durDisplay = function(totalSeconds)
{
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function pad(num) {
    var s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
}


export const GetBuildingStats = function(dispatch, PlanetID)
{
    axios.get('http://apicall.starshipfleets.com/Planet/GetBuildingTypes/' + PlanetID)
    .then((response) => {
        dispatch({type: ActionTypes.SET_BUILDINGSTATS,payload:response.data});        
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
}

export const GetResearchTypes = function(dispatch, UserID)
{
    axios.get('http://apicall.starshipfleets.com/Research/GetResearchTypes/' + UserID)
    .then((response) => {
        dispatch({type: ActionTypes.SET_RESEARCHTYPES,payload:response.data});                
    })
    .catch(function (error) {
    })
    .finally(function () {  
    });
}

