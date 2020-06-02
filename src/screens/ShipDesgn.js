import React, { useEffect, useState} from 'react';
import axios from 'axios';
import windim from "../components/WindowDimensions";
import {useSelector, useDispatch} from 'react-redux'
import imgQuestion from '../assets/Question.png';
import "../styles/stylesheet.css"

function PlanetList() {
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes)
    const BuildingStats = useSelector(state => state.planetReducer.BuildingStats)
    const ResearchStats = useSelector(state => state.planetReducer.ResearchStats)
    const UserID = useSelector(state => state.user.UserID);
    const [Shippopup, setShipPopup] = useState(false);
    const [Hullpopup, setHullPopup] = useState(false);
    const [Hulls, setHulls] = useState([]);    
    const [Pods, setPods] = useState([]);    
    const [displayPod, setdisplayPod] = useState({});    
    const [displayHull, setdisplayHull] = useState({}); 
    const [shipyardNeeded, setshipyardNeeded] = useState(0); 
    const [activeHull, setactiveHull] = useState({});    
    const [activePods, setactivePods] = useState([]);
    const [designStats, setdesignStats] = useState({});
    const { width } = windim(); 

    useEffect(() => {                
        axios.get('http://apicall.starshipfleets.com/Ships/GetShipHulls')
        .then((response) => {            
            setHulls(response.data);                      
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    },[UserID]);

    useEffect(() => {                
        axios.get('http://apicall.starshipfleets.com/Ships/GetShipPods')
        .then((response) => { 
            setPods(response.data);            
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    },[UserID]);

    useEffect(() => {
        CalculateStats()
    },[activePods])

    useEffect(() => {
        CalculateStats()
    },[activeHull])

    function CalculateStats()
    {
        if (activeHull.numPods)
        {   var newShipYard = activeHull.buildingLevel;
            var newStats=
            {
                armor: 0,
                energy: 0,
                energyCost: 0,
                laser: 0,
                materialCost: activeHull.materialCost,
                militaryCost: 0,
                missile: 0,
                bays: 0,
                movement: 0,
                plasma: 0,
                shields: 0,         
            }

            activePods.forEach(function(pod) {
                const apod =  Pods.find(x => x.shipPodID==pod.podID)
                newStats.armor= (newStats.armor+apod.armor);
                newStats.energy= (newStats.energy+apod.energy);
                newStats.energyCost= (newStats.energyCost+apod.energyCost);
                newStats.laser= (newStats.laser+apod.laser);
                newStats.materialCost= (newStats.materialCost+apod.materialCost);
                newStats.militaryCost= (newStats.militaryCost+apod.militaryCost);
                newStats.missile= (newStats.missile+apod.missile);
                newStats.movement= (newStats.movement+apod.movement);                
                newStats.bays= (newStats.movement+apod.bays);
                newStats.plasma= (newStats.plasma+apod.plasma);
                newStats.shields= (newStats.shields+apod.shields);
                if (newShipYard < apod.buildingLevel)
                    newShipYard = apod.buildingLevel        
            })

            newStats.armor= newStats.armor+(newStats.armor*ResearchStats.armor);
            newStats.energy= newStats.energy+(newStats.energy*ResearchStats.energy);
            newStats.laser= newStats.laser+(newStats.laser*ResearchStats.laser);
            newStats.missile= newStats.missile+(newStats.missile*ResearchStats.missile);
            newStats.plasma= newStats.plasma+(newStats.plasma*ResearchStats.plasma);
            newStats.shields= newStats.shields+(newStats.shields*ResearchStats.shields);
            setdesignStats(newStats);
            setshipyardNeeded(newShipYard);

        }
        else
        {
            setdesignStats({})
            setshipyardNeeded(0);
        }
    }

    function Reset()
    {
        setactivePods([]);
        setactiveHull({});
    }
    function SelectHull(hullID)
    {
        setactivePods([]);
        setactiveHull(Hulls.find(x => x.hullID==hullID)); 
    }

    function PickPod(podID)
    { 
        if (activeHull.numPods && activePods.length < activeHull.numPods)
        {
            const addpod = Pods.find(x => x.shipPodID==podID);
            if (addpod && addpod.mass <= activeHull.hull)
            {
                var newPods = activePods;
                newPods = newPods.concat({podID:podID, podName:Pods.find(x => x.shipPodID==podID).podName});
                setactivePods(newPods) 
            }    
        }
    }

    function GetTechName(TechID)
    {
        return ResearchTypes.find(x => x.technologyID==TechID).name;
    }

    function ShipInfoPod(podID)
    { 
        setdisplayPod(Pods.find(x => x.shipPodID==podID)); 
        setShipPopup(true)
    }

    function HullInfoPod(hullID)
    { 
        setdisplayHull(Hulls.find(x => x.hullID==hullID)); 
        setHullPopup(true)
    }

    function GetBuildingName(buildingID)
    {
        return BuildingStats.find(x => x.buildingID==buildingID).name;
    }

    function ChkTechLevel(TechID, TechLevel)
    {
        const Tech = ResearchTypes.find(x => x.technologyID == TechID);
        if (!Tech)
        {
            return true;
        }
        else if (Tech.bldLevel >= TechLevel )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function ChkMass(shipPodID)
    {
        const addpod = Pods.find(x => x.shipPodID==shipPodID);
        if (addpod && addpod.mass <= activeHull.hull)
            return true;
        else
            return false;            
    }

    function RemovePod(index)
    {       
        var newPods = [...activePods];
        newPods.splice(index, 1);
        setactivePods(newPods);
    }

    function HideHullInfo()
    {
        setHullPopup(false)
    }

    function HideShipInfo()
    {
        setShipPopup(false)
    }

    function BuildDesign(status)
    {
        if (activeHull.numPods)
        {
            if ( status ==1)
            {
                alert("You still have Pods available.")
            }
            else if (status ==2)
            {
                alert("Not enough Energy to support Pods.")
            }
            else
            {
                alert("Build")
            }
        }
        else
        {
            alert("You must select a Hull.")
        }
    }

    return (
        <div>
            <div style={{display:"flex", width:680, borderWidth:"2", borderColor:"black", textAlign:"center"}}>
                <div style={{width:135, fontSize:width>400?"14px":"12px", textAlign:"center", display: "inline-block"}}>
                    <div style={{ color: "gold"}}>
                        <div style={{width:10}} ></div>
                        <div  style={{ width:100, height:30, paddingLeft: "5px"}}>
                            Pods 
                        </div>                                                                
                    </div>
                    <div style={{flex:1, border:"1px solid lightblue"}}>
                    {Pods.map((pod, index) => { 
                        return(
                            <div key={index} >
                                <div style={{width:15, display: "inline-block", backgroundColor:"darkorange", cursor:"pointer"}} onClick={e => ShipInfoPod(pod.shipPodID)}>
                                    <img src={imgQuestion} width="15px" height="15px" />
                                </div>
                                {ChkTechLevel(pod.techID,pod.techLevel) && ChkMass(pod.shipPodID) &&                            
                                <div style={{ width:100, color: "white",borderBottom:"1px solid gray", display: "inline-block"}}>
                                    <div  style={{ height:30,  marginTop: 10, cursor:"pointer"}} onClick={e => PickPod(pod.shipPodID)}> 
                                        {pod.podName} 
                                    </div>                                
                                </div>
                                }
                               {(!ChkTechLevel(pod.techID,pod.techLevel) || !ChkMass(pod.shipPodID)) &&                           
                                <div style={{ width:100, color: "red", borderBottom:"1px solid gray", display: "inline-block"}}>
                                    <div  style={{ height:30,  marginTop: 10}}> 
                                        {pod.podName} 
                                    </div>                                
                                </div>
                                }                               
                            </div>
                        );
                    })}
                    </div>
                </div>
                <div style={{flex:1, fontSize:"14px", textAlign:"center", color:"white", display: "inline-block"}}>
                    <div style={{ flex:1,color: "White"}}>
                        <div style={{width:10}} ></div>
                        <div  style={{ flex:1, height:30, padding: "5px", cursor: "pointer",
                        backgroundColor: designStats.energyCost>designStats.energy?"red":activePods.length==activeHull.numPods?"green":"darkgray"}} 
                            onClick={e => BuildDesign(activePods.length!=activeHull.numPods?1:designStats.energyCost>designStats.energy?2:3)}>
                            Save Design 
                        </div>                                                                
                    </div>
                    <div style={{flex:1, paddingBottom:"5px", border:"1px solid white"}}>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Class
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {activeHull.hullName}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Shipyard Level
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {shipyardNeeded}
                            </div>
                        </div>

                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Hull
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {activeHull.hull}
                            </div>
                        </div>                        
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Material Cost
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.materialCost}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Military Cost
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                            {designStats.militaryCost}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Energy Cost
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.energyCost}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", color: designStats.energyCost>designStats.energy?"red":"lime"}}>
                                Energy
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray", color: designStats.energyCost>designStats.energy?"red":"lime"}}>
                                {designStats.energy}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Armor
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.armor}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Shields
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.shields}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Laser
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.laser}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Missile
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                            {designStats.missile}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Plasma
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.plasma}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Bays
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.bays}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Movement
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {designStats.movement}
                            </div>
                        </div>
                        <div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block"}}>
                                Pods
                            </div>
                            <div style={{width:125,fontSize:"14px", display: "inline-block", boxShadow:"2px 2px 0 0 gray"}}>
                                {activeHull.numPods && activePods.length + "/" + activeHull.numPods}
                            </div>
                        </div>
                    </div>
                    <div style={{flex:1, color:"white", textAlign:"center", fontSize:"12px", border:"1px solid white", paddingTop:10}}>
                        <div style={{flex:1}}>
                            {
                                activePods.map((apod, index) => {
                                    return (
                                    <div key={index} style={{flex:1}}>
                                        <div style={{flex:1, width:125, display: "inline-block"}}>
                                            {apod.podName}
                                        </div>
                                        <div style={{flex:1, width:125, display: "inline-block", backgroundColor:"red", borderTop:"1px solid white"
                                            , boxShadow:"2px 2px 0 0 gray", cursor:"pointer"}}  onClick={e => RemovePod(index)}>
                                            Remove
                                        </div>
                                    </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div style={{width:135, fontSize:width>400?"14px":"12px", textAlign:"center", display: "inline-block"}}>
                    <div style={{ color: "gold", display: "inline-block"}}>
                        <div style={{width:10}} ></div>
                        <div  style={{ width:100, height:30, paddingLeft: "5px"}}>
                            Hulls 
                        </div>                                                                
                    </div>
                    <div style={{flex:1, border:"1px solid lightblue"}}>
                    {Hulls.map((hull, index) => { 
                        return(
                            <div key={index} >                                
                                {ChkTechLevel(hull.techID,hull.techLevel) &&                            
                                <div style={{ width:100, color: "white", borderBottom:"1px solid gray", display: "inline-block"}}>
                                    <div  style={{ height:30,  marginTop: 10, cursor:"pointer"}} onClick={e => SelectHull(hull.hullID)}> 
                                        {hull.hullName} 
                                    </div>                                
                                </div>
                                }
                               {!ChkTechLevel(hull.techID,hull.techLevel) &&                            
                                <div style={{ width:100, color: "red", borderBottom:"1px solid gray", display: "inline-block"}}>
                                    <div  style={{ height:30,  marginTop: 10}}> 
                                        {hull.hullName} 
                                    </div>                                
                                </div>
                                } 
                                <div style={{width:15, display: "inline-block", backgroundColor:"darkorange", cursor:"pointer"}} onClick={e => HullInfoPod(hull.hullID)}>
                                    <img src={imgQuestion} width="15px" height="15px" />
                                </div>                             
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>

            <div className="popup" style={{display:Shippopup ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
            onClick={() => HideShipInfo()}>
                <div style={{textAlign: "center", display: "inline-block", width:"100%", paddingBottom: "10px", borderBottom: '1px solid red'}}>
                    {Pods.length> 0 && displayPod.podName}
                </div>
                {Pods.length> 0 && displayPod.energyCost>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Eenergy Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.energyCost}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.materialCost>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Material Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.materialCost}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.militaryCost>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Military Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.militaryCost}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.energy>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Energy:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.energy}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.laser>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Laser:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.laser}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.missile>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Missile:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.missile}
                    </div>
                </div>
                } 
                {Pods.length> 0 && displayPod.plasma>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Plasma:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.plasma}
                    </div>
                </div>
                } 
                {Pods.length> 0 && displayPod.armor>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Armor:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.armor}
                    </div>
                </div>
                } 
                {Pods.length> 0 && displayPod.mass>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Mass Required:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.mass}
                    </div>
                </div>
                }   
                {Pods.length> 0 && displayPod.bays>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Bays:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.bays}
                    </div>
                </div>
                }                  
                {Pods.length> 0 && displayPod.shields>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Shields:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.shields}
                    </div>
                </div>
                } 
                {Pods.length> 0 && displayPod.movement>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Movement:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayPod.movement}
                    </div>
                </div>
                } 
                {Pods.length> 0 && displayPod.techID>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px", borderTop: "1px solid white"}}>
                        Research Needed:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {GetTechName(displayPod.techID)}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.techLevel>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Research Level:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {Pods.length> 0 && displayPod.techLevel}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.buildingID>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px", borderTop: "1px solid white"}}>
                        Building Needed:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        { GetBuildingName(displayPod.buildingID)}
                    </div>
                </div>
                }
                {Pods.length> 0 && displayPod.buildingLevel>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Building Level:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {Pods.length> 0 && displayPod.buildingLevel}
                    </div>
                </div>
                }                
                <div>
                    <div style={{textAlign: "center", width:"100%", padding: "15px"}} onClick={() => HideShipInfo()}>
                        CLOSE
                    </div>
                </div>
            </div> 

            <div className="popup" style={{display:Hullpopup ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
            onClick={() => HideHullInfo()}>
                <div style={{textAlign: "center", display: "inline-block", width:"100%", paddingBottom: "10px", borderBottom: '1px solid red'}}>
                    {Hulls.length> 0 && displayHull.hullName}
                </div>
                {Hulls.length> 0 && displayHull.materialCost>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Material Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayHull.materialCost}
                    </div>
                </div>
                }
                {Hulls.length> 0 && displayHull.hull>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Hull:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayHull.hull}
                    </div>
                </div>
                }
                {Hulls.length> 0 && displayHull.numPods>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Number of Pods:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {displayHull.numPods}
                    </div>
                </div>
                }              
                {Hulls.length> 0 && displayHull.techID>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px", borderTop: "1px solid white"}}>
                        Research Needed:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {GetTechName(displayHull.techID)}
                    </div>
                </div>
                }
                {Hulls.length> 0 && displayHull.techLevel>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Research Level:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {Hulls.length> 0 && displayHull.techLevel}
                    </div>
                </div>
                }
                {Hulls.length> 0 && displayHull.buildingID>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px", borderTop: "1px solid white"}}>
                        Building Needed:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        { GetBuildingName(displayHull.buildingID)}
                    </div>
                </div>
                }
                {Hulls.length> 0 && displayHull.buildingLevel>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Building Level:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {Hulls.length> 0 && displayHull.buildingLevel}
                    </div>
                </div>
                }                
                <div>
                    <div style={{textAlign: "center", width:"100%", padding: "15px"}} onClick={() => HideHullInfo()}>
                        CLOSE
                    </div>
                </div>
            </div> 
        </div>                   
    );  
  }
  
  export default PlanetList;