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
    const [PlanetPop, setPlanetPop] = useState(props.PlanetPop);
    const [popUsed, setpopUsed] = useState(0);
    const PTid = props.PTid;
    const [BuildingStats, setBuildingStats] = useState(props.BuildingStats);
    const [duration, setDuration] = useState(new Date());
    const { width } = windim();
    const [bg, setBg] = useState({});
    const BuildingQue = useSelector(state => state.planetReducer.buildingQue);
    const [BuildingQueList, setBuildingQueList] = useState(props.BuildingQueList)

    useEffect(() => {
        setPlanet(props.planet);
      }, [props.planet]);

    useEffect(() => {
        setBuildingQueList(props.BuildingQueList);
    }, [props.BuildingQueList]);

    useEffect(() => {
        setPlanetPop(props.PlanetPop);
      }, [props.PlanetPop]);
      
    useEffect(() => {
        setPlanetStats(props.PlanetStats);
      }, [props.PlanetStats]);

    useEffect(() => {
        setBuildingStats(props.BuildingStats);
      }, [props.BuildingStats]);

    function ShowInfo(name)
    {
        setBg(BuildingStats.filter(x => x.name == name));
        setPopup(true)
    }

    function HideInfo()
    {
        setPopup(false)
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
                                        {building.bldLevel}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px"}}>
                                        {building.populationCost}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px"}}>
                                        {building.materialCost+((building.bldLevel+building.quedLevel)*building.materialCost*2.5)}
                                    </div>  
                                    <div style={{display: "inline-block", width: "25%", fontSize: width>450 ? "12px" : "10px", paddingRight: "5px"}}>
                                        {
                                            durDisplay(
                                                Math.round(((building.productionCost+((building.bldLevel+building.quedLevel)*building.productionCost))*15)/props.GetCon())<30?30:
                                                Math.round(((building.productionCost+((building.bldLevel+building.quedLevel)*building.productionCost))*15)/props.GetCon())
                                            )
                                        }
                                    </div>
                                    <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%", 
                                        fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
                                        onClick={() => 
                                            props.BuildThing(
                                                Math.round(((building.productionCost+((building.bldLevel+building.quedLevel)*building.productionCost))*15)/props.GetCon())<30?30:
                                                Math.round(((building.productionCost+((building.bldLevel+building.quedLevel)*building.productionCost))*15)/props.GetCon())
                                            , building.name
                                            , building.buildingID
                                            ,building.materialCost+((building.bldLevel+building.quedLevel)*building.materialCost*2.5))
                                            }>
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