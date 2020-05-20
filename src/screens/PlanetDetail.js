import React, {Suspense, useEffect, useState} from 'react';
import PlanetDetailDisplay from "../components/Planet/PlanetDetailDisplay";
import FocusDisplay from "../components/Planet/FocusDisplay";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';
import windim from "../components/WindowDimensions";
import imgResearch from '../assets/Research.png'
import imgBuildings from '../assets/Buildings.png'
import imgShips from '../assets/Ships.png'
import imgWorld from '../assets/World.png'
import imgBackArrow from '../assets/backarrow.png'
import "../styles/stylesheet.css"

var buildno = 1;

function PlanetDetail(props) {
    const dispatch = useDispatch();
    var { planetType, planetID } =  props.match.params;
    const StatePT = useSelector(state => state.planetTypeReducer.textureNo);
    const UserID = useSelector(state => state.user.UserID);
    const [tab, setTab] = useState(1);    
    const [planet, setPlanet] = useState({});
    const [PlanetOwner, setPlanetOwner] = useState(); 
    const [Barren, setBarren] = useState(true); 
    const [PTid, setPTid] = useState(planetType ?? StatePT ?? 2);
    const { height, width } = windim();
    const [PlanetStats, setPlanetStats] = useState({Metals:0, Research:0, Food:0, Energy:0, Infrastructure:0, InfrastructureMetal:0}); 
    const [PlanetPop, setPlanetPop] = useState({metalsPop:0, researchPop:0, foodPop:0, energyPop:0, infrastructurePop:0, infrastructureMetalPop:0})

    useEffect(() => {
        if (planetID)
        {
            axios.get('http://apicall.starshipfleets.com/Planet/GetPlanet/' + planetID + '/' + UserID)
            .then((response) => {
                setPlanet(response.data);
                dispatch({type: ActionTypes.SET_PLANET,payload:response.data});
                setPlanetOwner(response.data.owner);
                setPTid(response.data.planetType);
                setBarren(response.data.barren);  
                console.log(response.data);
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[planetID]);

    useEffect(() => {
        if (planetID)
        {
            setPlanetStats(
            {
                Metals: Math.round(((planet.metals*planet.ptMining)+((PlanetPop.metalsPop/100)*(planet.metals*planet.ptMining)))*100)/100
                ,Research: Math.round(((planet.research*planet.ptResearch)+((PlanetPop.researchPop/100)*(planet.research*planet.ptResearch)))*100)/100
                ,Food:  Math.round(((planet.food*planet.ptFood)+((PlanetPop.foodPop/100)*(planet.food*planet.ptFood)))*100)/100
                ,Energy: Math.round(((planet.energy*planet.ptEnergy)+((PlanetPop.energyPop/100)*(planet.energy*planet.ptEnergy)))*100)/100
                ,Infrastructure: Math.round(((planet.factories*planet.ptInfrastructure)+((PlanetPop.infrastructurePop/100)*(planet.factories*planet.ptInfrastructure)))*100)/100
                ,InfrastructureMetal: Math.round(
                    ((planet.factories*planet.ptInfrastructure)+((PlanetPop.infrastructurePopMetal/100)*(planet.factories*planet.ptInfrastructure)))*
                    (Math.round(((planet.metals*planet.ptMining)+((PlanetPop.metalsPop/100)*(planet.metals*planet.ptMining)))*100)/100)
                    *100)/100
            });
        }
    },[PlanetPop]); 
    
    useEffect(() => {
        if (planetID)
        {
            console.log(planet.metalsPop)
            setPlanetPop(
                {
                    metalsPop: planet.metalsPop
                    ,researchPop: planet.researchPop
                    ,foodPop: planet.foodPop
                    ,energyPop: planet.energyPop
                    ,infrastructurePop: planet.infrastructurePop
                    ,infrastructurePopMetal: planet.infrastructurePopMetal
                });
        }
    },[planet]);  
  
    function BacktoSystem(){
        var link = "/SystemView/" + (planet.galaxy??1) + "/" + (planet.sector??'11') + "/" + (planet.xSysPosition??1);
        window.location.assign(link);
    }

    function ChangeTab(t)
    {
        setTab(t);
    }

    function ChangeName()
    {
        alert(planet.planetName);
    }

    function Colonize()
    {
        axios.post('http://apicall.starshipfleets.com/Planet/ColonizePlanet', 
        { 
            Owner: UserID,
            PlanetID: planet.planetID,
            Population: 3,
            Materials: 25
        })
        .then((response) => {
            setPlanet(response.data);
            dispatch({type: ActionTypes.SET_PLANET,payload:response.data});
            setPlanetOwner(response.data.owner);            
            console.log(response.data);
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });

    }
    
    return (
        <div style={{height:"100%", width:"100%", textAlign: "center", color: "white"}} >
            <div style={{ height:"90%", width:"100%", verticalAlign:"top", 
                padding:"10px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>
                <div style={{padding: "5px"}}>
                    <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "#228B22", cursor: "pointer"}} onClick={() => BacktoSystem()}>Back</div>
                    <div style={{width:"100px", padding: "5px", fontSize: "12px", display: "inline-block", cursor: "pointer", title: "Back to System"}} onClick={ChangeName}>
                        {planet.planetName}
                    </div>
                    {PlanetOwner == UserID &&
                        <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "mediumblue", cursor: "pointer"}} onClick={() => ChangeTab(5)}>Focus</div>
                    }
                    {PlanetOwner == 0 && !Barren &&
                        <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "mediumblue", cursor: "pointer"}} onClick={() => Colonize()}>Colonize</div>
                    }
                </div>
                <div className={tab==1?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(1)}>
                    <img className="planetDetailImg" src={imgWorld} alt="Planet" title="Planet" />
                    {width>500 ? 'Planet' : ''}
                </div>
                <div className={tab==2?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(2)}>
                    <img className="planetDetailImg" src={imgBuildings} alt="Buildings" title="Buildings" />                    
                    {width>500 ? 'Buildings' : ''}
                </div>
                <div className={tab==3?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(3)}>
                    <img className="planetDetailImg" src={imgResearch} alt="Research" title="Research" />
                    {width>500 ? 'Research' : ''}
                </div>
                <div className={tab==4?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(4)}>
                    <img className="planetDetailImg" src={imgShips} alt="Ships" title="Ships" />
                    {width>500 ? 'Ships' : ''}
                </div>
                <div>
                    <div style={{position:tab==1?'relative':'absolute', top:tab==1?0:-3000}}>
                        <PlanetDetailDisplay planet={planet} PlanetStats={PlanetStats} PTid={PTid} />
                    </div>
                    <div style={{display:tab==5?'block':'none'}}>    
                        <FocusDisplay PlanetPop={PlanetPop} planetID={planetID} UserID={UserID} save={setPlanetPop} />
                    </div>
                    <div style={{display:tab==2?'block':'none'}}>Buildings</div>
                    <div style={{display:tab==3?'block':'none'}}>Research</div>
                    <div style={{display:tab==4?'block':'none'}}>Ships</div>
                </div>                 
            </div>            
        </div>
    );
  }
  
  export default PlanetDetail;
  