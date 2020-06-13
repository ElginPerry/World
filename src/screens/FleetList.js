import React, { useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import windim from "../components/WindowDimensions";
import * as Common from "../components/Common"

function FleetList() {  
    const UserID = useSelector(state => state.user.UserID);
    const PlanetList = useSelector(state => state.planetReducer.PlanetList);
    const userFleets = useSelector(state => state.shipReducer.UserFleets);
    const ShipDesigns = useSelector(state => state.shipReducer.ShipDesigns)
    const { width } = windim(); 
    const dispatch = useDispatch();

    useEffect(() => {                
        Common.GetFleets(dispatch,UserID)
        Common.GetUserDesigns(dispatch, UserID)
    },[UserID]);

    function SetPlanet(PlanetID)
    {
        var link = "/PlanetView/" + PlanetID;
        window.location.assign(link);
    }

    return (
        <div style={{width:"95%", borderWidth:"2", borderColor:"black", textAlign:"center"}}> 
            <div style={{height:"50px", width:"100%", textAlign:"center", color: "gold", fontSize:"18px"}}>Planet List</div>
            <div style={{width:"100%", fontSize:"14px", textAlign:"center"}}>
                {userFleets.map((fleet, index) => { 
                    return(
                        <div key={index} style={{width:"95%"}}>
                            {index == 0 &&
                            <div  style={{height:"30px", width:"100%", color:"blue", display:"flex"}}>
                                <div  style={{flex:1, height:"30px", width:"50px", display: "inline-block", borderBottom:"1px solid red"}}>     
                                    Planet ID
                                </div>
                                <div  style={{flex:1, height:"30px", width:width > 500 ?"20%":"60%" , paddingLeft: "5px", borderBottom:"1px solid red", display: "inline-block"}}>
                                    Fleet Name 
                                </div>
                                {width > 500 &&
                                <div  style={{flex:1, height:"30px", width:"20%", paddingLeft: "5px" , borderBottom:"1px solid red", display: "inline-block"}}>
                                    Materials 
                                </div> 
                                }                           
                            </div>
                            }
                            <div  style={{height:"45px", width:"100%", color: "white", display:"flex", cursor: "pointer"}} onClick={e => SetPlanet(fleet.planetID)}>
                                <div  style={{flex:1, height:"40px", width:"50px", boxShadow:"0 2px 0 0 gray", 
                                    display: "inline-block"}}>     
                                    {fleet.planetID}
                                </div>
                                <div  style={{flex:1,height:"40px", width:width > 500 ?"20%":"60%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {fleet.fleetName} 
                                </div>
                                {width > 500 &&
                                <div  style={{flex:1, height:"40px", width:"20%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {fleet.ships.reduce((sum, ship) => {
                                                return sum + ShipDesigns.find( x => x.shipDesignID==ship.designID).materialCost * ship.effectiveNumber},0)} 
                                </div>
                                } 
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>           
    );
  }
  
  export default FleetList;