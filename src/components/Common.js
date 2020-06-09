import React, {useEffect, useState} from 'react';
import PlanetDetailDisplay from "../components/Planet/PlanetDetailDisplay";
import FocusDisplay from "../components/Planet/FocusDisplay";
import BuildDisplay from "../components/Planet/BuildDisplay";
import ShipDisplay from "../components/Planet/ShipDisplay";
import ResearchDisplay from "../components/Planet/ResearchDisplay";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';
import windim from "../components/WindowDimensions";
import imgResearch from '../assets/Research.png'
import imgBuildings from '../assets/Buildings.png'
import imgShips from '../assets/Ships.png'
import imgWorld from '../assets/World.png'
import "../styles/stylesheet.css"

function Common(props) {
    const dispatch = useDispatch();
    const UserID = useSelector(state => state.user.UserID);
    const BuildingStats = useSelector(state => state.planetReducer.BuildingStats)
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes)
    const ResearchStats = useSelector(state => state.planetReducer.ResearchStats)

    // function UpdatePlanetHarvest(pop, mil, mats)
    // {  
    //     console.log(pop + ":" + mil + ":" + mats)
    //     pop = pop=0?0:pop>1?1:-1
    //     mil = mil=0?0:mil>1?1:-1
               
    //     axios.post('http://apicall.starshipfleets.com/Planet/UpdatePlanetHarvest',
    //     {
    //         PlanetID: planetID,
    //         Owner: UserID,
    //         Population: pop,
    //         Materials: mats,
    //         Military: mil
    //     })
    //     .then((response) => {  
    //         UpdatePlanet(response.data);
    //     })
    //     .catch(function (error) {
    //     })
    //     .finally(function () {  
    //     });
    // }

    function GetShipHulls()
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

   function GetShipPods()
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
    
    const GetShipDesigns = function()
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
}

export default Common;