import * as ActionTypes from '../redux/ActionTypes'
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
