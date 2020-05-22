import React, {Suspense, useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../../redux/ActionTypes'
import axios from 'axios';
import CountdownTimer from './BuildTimer'
import windim from "../WindowDimensions";
import "../../styles/stylesheet.css"


function BuildDisplay(props) {
    const [planet, setPlanet] = useState(props.planet);
    const [PlanetStats, setPlanetStats] = useState(props.PlanetStats);
    const [userID, setUserID] = useState(props.UserID);
    const [planetID, setPlanetID] = useState(props.PlanetID);
    const [popup, setPopup] = useState(false);
    const [buildingName, setbuildingName] = useState('');    
    const [energyUsed, setenergyUsed] = useState(0);
    const [popUsed, setpopUsed] = useState(0);
    const PTid = props.PTid;
    const [BuildingStats, setBuildingStats] = useState(props.BuildingStats);
    const [duration, setDuration] = useState(new Date());
    const { width } = windim();
    const [bg, setBg] = useState({});

    useEffect(() => {
        setPlanet(props.planet);
      }, [props.planet]);

    useEffect(() => {
        setPlanetStats(props.PlanetStats);
      }, [props.PlanetStats]);

    useEffect(() => {
        setBuildingStats(props.BuildingStats);
      }, [props.BuildingStats]);

    function BuildThing(prod, name, buildingID){
        setbuildingName(name);
        setDuration(Getduration(prod));
        props.setbldName(name);
        props.setBldDuration(Getduration(prod));
        console.log(name + ":" + userID + ":" + planetID)
    }
  
    function RemoveBuild(item){
        console.log(item + ":" + userID + ":" + planetID)
      }

    function Getduration(s)
    {
        var d = new Date();
        d.setTime(d.getTime()  + (s*1000))
        return d;
    }

    function ShowInfo(name)
    {
        setBg(BuildingStats.filter(x => x.name == name));
        setPopup(true)
    }

    function HideInfo()
    {
        setPopup(false)
    }


    function getLevel(building)
    {
        switch(building){
            case "Biodome":
                return planet.bioDomes
            case "Power Plant": 
                return planet.energy
            case "Research Lab": 
                return planet.research
            case "Mine": 
                return planet.metals
            case "Farm": 
                return planet.food
            case "Factory": 
                return planet.factories
            default: return 8;    
        }
    }

    function pad(num) {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }

    function durDisplay(totalSeconds)
    {
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    }

    return (
        <div style={{display:"inline-block", height:"90%", width:"100%", verticalAlign:"top", 
        padding:"20px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>
            <div style={{margin:"auto", width:"100%", paddingTop: "10px", paddingBottom: "10px"}}>
                <div style={{textAlign: "right", width:"100%", paddingLeft: "5px", fontSize: width>450 ? "14px" : "12px"}}>    
                    <CountdownTimer timeUp={RemoveBuild} Date={duration} buildingName={buildingName} />   
                </div>       
            </div>
            <div style={{width:"100%", paddingLeft: "5px"}}>
                {BuildingStats.length > 0 &&
                    BuildingStats.map((building, index) => { 
                        return(
                            <div key={"g" + index}>
                                {index==0 &&
                                <div style={{fontSize: "10px", paddingBottom: "10px"}}>
                                    <div style={{display: "inline-block", width: "30%", borderBottom: '1px solid red'}}>
                                        Name
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Level' : 'L'}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Population' : 'P'}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Materials' : 'M'}
                                    </div>  
                                    <div style={{display: "inline-block", width: "25%", paddingRight: "5px", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Build Time' : 'BT'}
                                    </div>
                                    <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%"}}>
                                    </div>                                         
                                </div>
                                }
                                <div style={{paddingBottom: "10px"}}>
                                    <div style={{display: "inline-block", width: "30%", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} onClick={() => ShowInfo(building.name)}>
                                        {building.name}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px"}}>
                                        {getLevel(building.name)}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px"}}>
                                        {!isNaN(getLevel(building.name)) && building.populationCost}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px"}}>
                                        {!isNaN(getLevel(building.name)) &&
                                        building.materialCost+(getLevel(building.name)*building.materialCost*2.5)}
                                    </div>  
                                    <div style={{display: "inline-block", width: "25%", fontSize: width>450 ? "12px" : "10px", paddingRight: "5px"}}>
                                        {!isNaN(getLevel(building.name)) &&
                                            durDisplay(Math.round(((building.productionCost+(getLevel(building.name)*2.5*building.productionCost))/PlanetStats.Infrastructure)*10))
                                        }
                                    </div>
                                    <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%", 
                                        fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
                                        onClick={() => 
                                            BuildThing(Math.round(((building.productionCost+(getLevel(building.name)*2.5*building.productionCost))/PlanetStats.Infrastructure)*10)
                                            , building.name, building.buildingID )}>
                                        {width>450 ? 'Build' : ' + '}
                                    </div>                                         
                                </div>
                            </div>
                        ); 
                    })
                }
            </div> 
            <div className="popup" style={{display:popup ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
            onClick={() => HideInfo()}>
                <div>
                    {bg.length> 0 && bg[0].name}
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"50%", paddingLeft: "5px", borderBottom: '1px solid red'}}>
                        Name:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"50%", color:"gold", borderBottom: '1px solid red'}}>
                        {bg.length> 0 && bg[0].name}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Energy:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].energy}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Energy Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].energyCost}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Food:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].food}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Infrastructure:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].infrastructure}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Mining:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].mining}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Population Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].populationCost}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Population Max:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].populationMax}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Research:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].research}
                    </div>
                </div>
                <div>
                    <div style={{textAlign: "center", width:"100%", padding: "15px"}} onClick={() => HideInfo()}>
                        CLOSE
                    </div>
                </div>
            </div>           
        </div>

    )
}

export default BuildDisplay;