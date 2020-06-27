import React, {useEffect, useState} from 'react';
import "../styles/stylesheet.css"
import { useSelector, useDispatch } from 'react-redux';
import windim from "../components/WindowDimensions";
import ArrivalTimer from '../components/Planet/BuildTimer'
import * as Common from "../components/Common"
import * as Calcs from "../components/Calcs"

const FleetDetail = (props) => {
    const dispatch = useDispatch();
    const UserID = useSelector(state => state.user.UserID);
    const planetFleets = useSelector(state => state.shipReducer.PlanetFleets);
    const planet = useSelector(state => state.planetReducer.Planet);
    const ShipDesigns = useSelector(state => state.shipReducer.ShipDesigns);
    const selectedFleet = useSelector(state => state.shipReducer.SelectedFleet);
    const { width } = windim();
    const [popup, setPopup] = useState(false);   
    var LastUserFleets = new Date()

    useEffect(() => {
        Common.GetPlanetFleets(dispatch, UserID, selectedFleet.planetID)
    },[selectedFleet])
    
    function FleetList()
    {
        window.location.assign("/FleetList");
    }

    function SetPlanet(PlanetID)
    {
        var link = "/PlanetView/" + PlanetID;
        window.location.assign(link);
    }

    function FleetArrived(fleetID)
    {
        if (LastUserFleets.getTime() + 1000 < new Date())
        {
            LastUserFleets = new Date()
            Common.GetPlanetFleets(dispatch, UserID, planet.planetID)
        }
    }

    function ShowMerge()
    {
        setPopup(true)
    }
    
    function HideMerge()
    {
        setPopup(false)
    }

    function Merge(fleet)
    {
        alert(selectedFleet.fleetID + ":" + fleet.fleetID)
    }
    
    function RepairCost(fleet, designs)
    {
        return Calcs.RepairCost(fleet, designs)
    }

    return (
        <div > 
            <div style={{color:"white", textAlign:"center"}} >
                {selectedFleet && 
                <div style={{paddingTop:5}}>
                    <div style={{fontSize: "12px", cursor:"pointer", width: 90, display:"inline-block", backgroundColor:"green", border:"2px solid black"}}
                            onClick={() => FleetList()}>
                                Fleet List                                      
                    </div> 
                    <div style={{fontSize: "12px", cursor:"pointer", width: 90, display:"inline-block", backgroundColor:"green", border:"2px solid black"}}
                            onClick={() => ShowMerge()}>
                                Merge                                      
                    </div>
                    <div style={{fontSize: "12px", cursor:"pointer", width: 90, display:"inline-block", backgroundColor:"green", border:"2px solid black"}}
                            onClick={() => SetPlanet(selectedFleet.planetID)}>
                                Goto Planet                                      
                    </div>               
                    <div style={{fontSize: "10px", width: "100%", paddingTop:5}}>
                        {"Bay Mass Open: " + Calcs.FightersBays(selectedFleet, ShipDesigns)}                                      
                    </div>
                    <div style={{fontSize: "10px", width: "100%", paddingTop:5}}>
                        {"Repair Cost: Military-" + RepairCost(selectedFleet, ShipDesigns).militaryCost + " Materials-" + RepairCost(selectedFleet, ShipDesigns).materialCost}                                      
                    </div>
                </div>
                } 
                {selectedFleet &&
                    selectedFleet.ships.map((ship, index) => { 
                    return(
                        <div key={"g" + index} style={{width:"100%", textAlign:"center", paddingTop:5 }}>
                            {selectedFleet && index==0 &&
                            <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%", borderBottom: '1px solid red'}}>
                                <div style={{ width: "20%", display:"inline-block"}}>
                                    Name
                                </div> 
                                {width>450 &&
                                <div style={{ width: "30%", display:"inline-block"}}>  
                                    <div style={{ width: "40%", display:"inline-block"}}>
                                        #
                                    </div> 
                                    <div style={{ width: "30%", display:"inline-block"}}>
                                        Move
                                    </div>  
                                    <div style={{width: "30%", display:"inline-block"}}>
                                        Colony                                                                                
                                    </div>
                                </div> 
                                } 
                                <div style={{ fontSize: "10px", width: "50%", display:"inline-block"}}>
                                    Split
                                </div>                                   
                            </div>
                            }
                            <div style={{flex:1 ,width:"95%", paddingBottom: "2px" }}>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "20%", textAlign:"center"}}>                                       
                                    {ship.designName}                                        
                                </div>
                                {width>450 &&
                                <div style={{ width: "30%", display:"inline-block"}}>                                  
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "40%", textAlign:"center"}}>
                                        {ship.effectiveNumber + '/' + ship.actualNumber}                                  
                                    </div> 
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "30%", textAlign:"center"}}>
                                        {ship.movement}                                  
                                    </div> 
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "30%", textAlign:"center"}}>
                                        {ship.colony}                                      
                                    </div>
                                </div>
                                }
                                <div style={{fontSize: "10px", display:"inline-block", width: "50%"}}>
                                    Split
                                </div> 
                            </div>                                                                                            
                        </div>    
                        ); 
                    })                                        
                }
            </div>


            <div className="popupShips" style={{display:popup ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', overflow:"auto", 
                fontSize: width>450 ? "12px" : "10px", color:"white", textAlign:"center"}}>
                {planetFleets.filter(x => x.fleetID != selectedFleet.fleetID).map((fleet, index) => { 
                    return(
                        <div key={index} style={{width:"95%"}}>
                            {index == 0 &&
                            <div  style={{height:"30px", width:"100%", color:"gold", display:"flex"}}>
                                <div  style={{flex:1, height:"20px", width:width > 500 ?"30%":"60%" , paddingLeft: "5px", borderBottom:"1px solid red", display: "inline-block"}}>
                                    Fleet Name 
                                </div>
                                {width > 500 &&
                                <div  style={{flex:1, height:"20px", width:"30%", paddingLeft: "5px" , borderBottom:"1px solid red", display: "inline-block"}}>
                                    Materials 
                                </div> 
                                }
                                <div style={{flex:1, height:"20px", width:"30%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                        
                                </div>                            
                            </div>
                            }
                            <div  style={{width:"100%", color: "white", display:"flex"}} >
                                <div  style={{flex:1, width:width > 500 ?"30%":"60%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {fleet.fleetName} 
                                </div>
                                {width > 500 &&
                                <div  style={{flex:1, width:"30%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {fleet.ships.reduce((sum, ship) => {
                                                return sum + ShipDesigns.find( x => x.shipDesignID==ship.designID).materialCost * ship.effectiveNumber},0)} 
                                </div>
                                }
                                <div style={{flex:1, width:"30%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray", backgroundColor:"green"
                                    , cursor:"pointer"}} onClick={() => Merge(fleet)}>
                                        Merge
                                </div> 
                            </div>                            
                        </div>
                    );
                })}
                <div style={{paddingTop:25}}>
                    <div style={{flex:1, width:110, backgroundColor:"green", cursor:"pointer"}} onClick={() => HideMerge()}>
                            Close
                    </div> 
                </div>
            </div>

        </div>

        
    )};

export default FleetDetail