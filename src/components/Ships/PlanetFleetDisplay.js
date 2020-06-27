import React, {useEffect, useState} from 'react';
import "../../styles/stylesheet.css"
import { useSelector, useDispatch } from 'react-redux';
import windim from "../WindowDimensions";
import ArrivalTimer from '../Planet/BuildTimer'
import * as Common from "../Common"
import * as Calcs from "../Calcs"

const PlanetDetailDisplay = (props) => {
    const dispatch = useDispatch();
    const UserID = useSelector(state => state.user.UserID);
    const planetFleets = useSelector(state => state.shipReducer.PlanetFleets);
    const planet = useSelector(state => state.planetReducer.Planet);
    const ShipDesigns = useSelector(state => state.shipReducer.ShipDesigns);
    const selectedFleet = useSelector(state => state.shipReducer.SelectedFleet);
    const { width } = windim();
    const [popup, setPopup] = useState(false);
    var LastUserFleets = new Date()

    function ShipInfo(fleet)
    {
        Common.SetSelectedFleet(dispatch, fleet)
        setPopup(true)
    }

    function FleetManage(fleet)
    {
        Common.SetSelectedFleet(dispatch, fleet)
        window.location.assign("/FleetDetail");
    }

    function HideInfo()
    {
        setPopup(false)
    }

    function FleetArrived(fleetID)
    {
        if (LastUserFleets.getTime() + 1000 < new Date())
        {
            LastUserFleets = new Date()
            Common.GetPlanetFleets(dispatch, UserID, planet.planetID)
        }
    }

    function AttackFleet(fleet)
    {
        alert(fleet.fleetID)
    }    

    return (
        <div >            
            {planetFleets.length > 0 && ShipDesigns.length > 0 &&
                planetFleets.map((fleet, index) => { 
                return(
                    <div key={"g" + index} style={{width:"100%", textAlign:"center", paddingTop:5 }}>
                        {index==0 &&
                        <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%", borderBottom: '1px solid red'}}>
                            <div style={{ width: "45%", display:"inline-block"}}>
                                Name
                            </div>   
                            <div style={{ width: "45%", display:"inline-block"}}>
                                Material Cost
                            </div>  
                            <div style={{display:"inline-block", width: "10%"}}>                                                                                
                            </div>                                     
                        </div>
                        }
                        {index>=0 &&
                        <div style={{flex:1 ,width:"95%", paddingBottom: "2px" }}>
                            <div style={{fontSize: "10px", display:"inline-block",  width: "45%", textAlign:"center", color:fleet.userID==UserID?'lime':'red'
                            , cursor:fleet.userID==UserID?"pointer":"default"}}
                            onClick={() => fleet.userID==UserID?ShipInfo(fleet):false}
                            >
                                <div style={{display:fleet.status==0?"block":"none"}}>
                                    {fleet.fleetName}
                                </div>                                
                                <div style={{display:fleet.status==1?"block":"none"}}>
                                    {<ArrivalTimer key={index} timeUp={() => FleetArrived(fleet.fleetID)} Date={new Date(Date.parse(fleet.arrival))} buildingName={fleet.fleetName}/>} 
                                </div>                                       
                            </div>
                            <div style={{fontSize: "10px", display:"inline-block",  width: "45%", textAlign:"center"}}>
                                    {fleet.materialCost}
                            </div>                             
                            <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:fleet.userID==UserID?"green":"red"
                                    , cursor:fleet.userID==UserID?"pointer":"default"}}
                                onClick={() => fleet.userID==UserID?FleetManage(fleet):AttackFleet(fleet)}>
                                    {fleet.userID==UserID?width>450 ? 'Manage' : 'M': width>450 ? 'Attack' : 'A'}                                       
                            </div> 
                        </div>
                        }                                                              
                    </div>    
                    ); 
                })
            }

            <div className="popupShips" style={{display:popup ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
                onClick={() => HideInfo()}>

                {selectedFleet.ships &&
                    selectedFleet.ships.map((ship, index) => { 
                    return(
                        <div key={"g" + index} style={{width:"100%", textAlign:"center", paddingTop:5 }}>
                            {selectedFleet && index==0 &&
                            <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%", borderBottom: '1px solid red'}}>
                                <div style={{ width: "40%", display:"inline-block"}}>
                                    Name
                                </div>  
                                <div style={{ width: "25%", display:"inline-block"}}>
                                    #
                                </div> 
                                <div style={{ width: "15%", display:"inline-block"}}>
                                    Move
                                </div>  
                                <div style={{display:"inline-block", width: "20%"}}>
                                    Colony                                                                                
                                </div>                                     
                            </div>
                            }
                            <div style={{flex:1 ,width:"95%", paddingBottom: "2px" }}>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "40%", textAlign:"center"}}>                                       
                                    {ship.designName}                                        
                                </div>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "25%", textAlign:"center"}}>
                                    {ship.effectiveNumber + '/' + ship.actualNumber}                                  
                                </div> 
                                <div style={{fontSize: "10px", display:"inline-block",  width: "15%", textAlign:"center"}}>
                                    {ship.movement}                                  
                                </div> 
                                <div style={{fontSize: "10px", display:"inline-block",  width: "15%", textAlign:"center"}}>
                                    {ship.colony}                                      
                                </div>
                            </div>                                                                                            
                        </div>    
                        ); 
                    })                                        
                } 
                {selectedFleet.ships &&               
                <div style={{fontSize: "10px", width: "100%", paddingTop:5}}>
                    {selectedFleet && "Bay Mass Open: " + Calcs.FightersBays(selectedFleet, ShipDesigns)}                                      
                </div>
                } 
                <div style={{fontSize: "10px", width: "100%", cursor:"pointer", paddingTop:25}}
                        onClick={() => HideInfo()}>
                            CLOSE                                      
                </div>  
            </div>    
        </div>
    )};

export default PlanetDetailDisplay

