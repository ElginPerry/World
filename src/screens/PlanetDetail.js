import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import Planet from "../components/PlanetDisplay";
import Lights from "../components/Lights";
import Environment from "../components/Enviroment";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';
import windim from "../components/WindowDimensions";
import imgMetal from '../assets/Metals.png'
import imgResearch from '../assets/Research.png'
import imgFood from '../assets/Food.png'
import imgEnergy from '../assets/Energy.png'
import imgPopulation from '../assets/Population.png'
import imgMaterials from '../assets/Materials.png'
import imgIndustry from '../assets/Industry.png'
import imgBuildings from '../assets/Buildings.png'
import imgShips from '../assets/Ships.png'
import imgWorld from '../assets/World.png'
import "../styles/stylesheet.css"

var buildno = 1;

function PlanetDetail(props) {
    const dispatch = useDispatch();
    var { planetType, planetID } =  props.match.params;
    const StatePT = useSelector(state => state.planetTypeReducer.textureNo);
    const UserID = useSelector(state => state.user.UserID);
    const [tab, setTab] = useState(1);    
    const [planet, setPlanet] = useState({});
    const [posts, setPosts] = useState({}); 
    const [PTid, setPTid] = useState(planetType ?? StatePT ?? 2);
    const { height, width } = windim();

    useEffect(() => {
        axios.get('http://apicall.starshipfleets.com/Planet/GetPlanetTypeDetailCall/' + PTid)
        .then((response) => {
            setPosts(response.data);
            dispatch({type: ActionTypes.SET_PLANETDETAIL,payload:response.data});
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    },[PTid]);

    useEffect(() => {
        if (planetID)
        {
            axios.get('http://apicall.starshipfleets.com/Planet/GetPlanet/' + planetID + '/' + UserID)
            .then((response) => {
                setPlanet(response.data);
                dispatch({type: ActionTypes.SET_PLANET,payload:response.data});
                setPTid(response.data.planetType);
                console.log(response.data);
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[planetID]);

    function BacktoSystem(){
        var link = "/SystemView/" + (planet.galaxy??1) + "/" + (planet.sector??'11') + "/" + (planet.xSysPosition??1);
        window.location.assign(link);
    }

    function ChangeTab(t)
    {
        setTab(t);
    }

    return (
        <div style={{height:"100%", width:"100%", textAlign: "center", color: "white"}} >
            <div className="button" onClick={BacktoSystem} >
                    Back to System
            </div>   
            <div style={{display:"inline-block", height:"85%", width:"100%", verticalAlign:"top", 
            padding:"10px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>
                <div style={{padding: "5PX"}}>{planet.planetName}</div>
                <div className={tab==1?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(1)}>
                    <img className="planetDetalImg" src={imgWorld} alt="Planet" title="Planet" />
                    {width>500 ? 'Planet' : ''}
                </div>
                <div className={tab==2?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(2)}>
                    <img className="planetDetalImg" src={imgBuildings} alt="Buildings" title="Buildings" />                    
                    {width>500 ? 'Buildings' : ''}
                </div>
                <div className={tab==3?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(3)}>
                    <img className="planetDetalImg" src={imgResearch} alt="Research" title="Research" />
                    {width>500 ? 'Research' : ''}
                </div>
                <div className={tab==4?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(4)}>
                    <img className="planetDetalImg" src={imgShips} alt="Ships" title="Ships" />
                    {width>500 ? 'Ships' : ''}
                </div>


                <div>
                    {tab==1 && 
                        <div>
                            <div style={{height:"50%", width:"100%", borderWidth:"2", borderColor:"black", display:"inline-block"}}>
                                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black"}}>            
                                    <Canvas 
                                        camera={{fov:25,
                                        aspect: window.innerWidth / window.innerHeight,
                                        near: 0.1,
                                        far: 1000
                                    }}>
                                        <Suspense fallback={<group />}>
                                            <Planet planetType={PTid} radius={.3} isDetail={true} />
                                            <Lights />
                                            <Environment />
                                        </Suspense> 
                                    </Canvas>
                                </div>
                                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                                    <div style={{display:"inline-block"}}>
                                        <div style={{padding:"5px",color:"blue"}}>
                                            Galaxy
                                        </div> 
                                        <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                                            {planet.galaxy}
                                        </div>
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <div style={{padding:"5px",color:"blue"}}>
                                            Sector 
                                        </div>
                                        <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                                            {planet.sector}
                                        </div> 
                                    </div>
                                    <div style={{display:"inline-block"}}>
                                        <div style={{padding:"5px",color:"blue"}}>
                                            Moon 
                                        </div>
                                        <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                                            {planet.moon ? "True" : "False"}
                                        </div> 
                                    </div>
                                </div>
                                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                                    <div className="planetDetalStats">
                                        <div>
                                            <img className="planetDetalImg" src={imgMetal} alt="Metals" title="Metals" />
                                        </div>
                                        <div>
                                            {planet.metals ?? 'NA'}
                                        </div>
                                    </div>
                                    <div className="planetDetalStats">
                                        <div>
                                            <img className="planetDetalImg" src={imgResearch} alt="Research" title="Research" />
                                        </div>
                                        <div>
                                            {planet.research ?? 'NA'}
                                        </div>
                                    </div>
                                    <div className="planetDetalStats">
                                        <div>
                                            <img className="planetDetalImg" src={imgFood} alt="Food" title="Food" />
                                        </div>
                                        <div>
                                            {planet.food ?? 'NA'}
                                        </div>
                                    </div>                                        
                                    <div className="planetDetalStats">
                                        <div>
                                            <img className="planetDetalImg" src={imgEnergy} alt="Energy" title="Energy" />
                                        </div>
                                        <div>
                                            {planet.energy ?? '99.9'}
                                        </div>
                                    </div>                                        
                                </div>
                                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                                    <div className="planetDetalStats">
                                        <div>
                                            <img className="planetDetalImg" src={imgPopulation} alt="Population" title="Population" />
                                        </div>
                                        <div>
                                            {planet.population ?? '999999'}
                                        </div>
                                    </div>
                                    <div className="planetDetalStats">
                                        <div>
                                            <img className="planetDetalImg" src={imgMaterials} alt="Materials" title="Materials" />
                                        </div>
                                        <div>
                                            {planet.materials ?? '999999'}
                                        </div>
                                    </div>
                                    <div className="planetDetalStats">
                                        <div>
                                            <img className="planetDetalImg" src={imgIndustry} alt="Industry" title="Industry" />
                                        </div>
                                        <div>
                                            {planet.industry ?? '99.9'}
                                        </div>
                                    </div>          
                                </div>                
                            </div>     
                        </div>}
                    {tab==2 && <div>Buildings</div>}
                    {tab==3 && <div>Research</div>}
                    {tab==4 && <div>Ships</div>}
                </div>                    
            </div>            
        </div>
    );
  }
  
  export default PlanetDetail;
  