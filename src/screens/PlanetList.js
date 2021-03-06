import React, { useEffect, useState} from 'react';
import '../App.css';
import PlanetTextureURL1 from "../assets/gas.jpg"
import PlanetTextureBump1 from "../assets/gas.jpg"
import PlanetTextureURL2 from "../assets/gasred.jpg"
import PlanetTextureBump2 from "../assets/gasred.jpg"
import PlanetTextureURL3 from "../assets/Earth-hires.jpg"
import PlanetTextureBump3 from "../assets/earthBump.jpg"
import PlanetTextureURL4 from "../assets/generalrock.jpg"
import PlanetTextureBump4 from "../assets/generalroughbump.jpg"
import PlanetTextureURL5 from "../assets/lava.jpg"
import PlanetTextureBump5 from "../assets/lavabump.jpg"
import PlanetTextureURL6 from "../assets/jungle.jpg"
import PlanetTextureBump6 from "../assets/junglecutout.jpg"
import PlanetTextureURL7 from "../assets/mountainworld.jpg"
import PlanetTextureBump7 from "../assets/rockworldbump.jpg"
import PlanetTextureURL8 from "../assets/marsmap1k.jpg"
import PlanetTextureBump8 from "../assets/marsbump1k.jpg"
import PlanetTextureURL9 from "../assets/neptunemap.jpg"
import PlanetTextureBump9 from "../assets/neptunemap.jpg"
import PlanetTextureURL10 from "../assets/jupitermap.jpg"
import PlanetTextureBump10 from "../assets/jupitermap.jpg"
import PlanetTextureURL11 from "../assets/plutomap1k.jpg"
import PlanetTextureBump11 from "../assets/venusbump.jpg"
import { Vector3 } from 'three';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import * as Common from "../components/Common"
import windim from "../components/WindowDimensions";
import { common } from '@material-ui/core/colors';

function PlanetList() {  
    const UserID = useSelector(state => state.user.UserID);
    const PlanetList = useSelector(state => state.planetReducer.PlanetList);
    const [Planets, setPlanets] = useState([]);
    const { width } = windim(); 
    const dispatch = useDispatch();
    const Textures = [{Texture : PlanetTextureURL1, Bump: PlanetTextureBump1, Position: new Vector3(-1.2,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL2, Bump: PlanetTextureBump2, Position: new Vector3(-.9,0,0), Radius: .1}
        ,{Texture : PlanetTextureURL3, Bump: PlanetTextureBump3, Position: new Vector3(-.6,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL4, Bump: PlanetTextureBump4, Position: new Vector3(-.3,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL5, Bump: PlanetTextureBump5, Position: new Vector3(0,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL6, Bump: PlanetTextureBump6, Position: new Vector3(.3,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL7, Bump: PlanetTextureBump7, Position: new Vector3(.6,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL8, Bump: PlanetTextureBump8, Position: new Vector3(-.3,-.4,0), Radius: .1}
        ,{Texture :PlanetTextureURL9, Bump: PlanetTextureBump9, Position: new Vector3(0,-.4,0), Radius: .1}
        ,{Texture :PlanetTextureURL10, Bump: PlanetTextureBump10, Position: new Vector3(.3,-.4,0), Radius: .1}
        ,{Texture :PlanetTextureURL11, Bump: PlanetTextureBump11, Position: new Vector3(.6,-.4,0), Radius: .1}];

    useEffect(() => {                
        Common.GetPlanetList(dispatch, UserID)
        Common.GetFleets(dispatch, UserID)
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
                {PlanetList.map((planet, index) => { 
                    return(
                        <div key={index} style={{width:"95%"}}>
                            {index == 0 &&
                            <div  style={{height:"30px", width:"100%", color:"blue", display:"flex"}}>
                                <div  style={{flex:1, height:"30px", width:"50px", display: "inline-block", borderBottom:"1px solid red"}}>     
                                      &nbsp;
                                </div>
                                <div  style={{flex:1, height:"30px", width:width > 500 ?"20%":"60%" , paddingLeft: "5px", borderBottom:"1px solid red", display: "inline-block"}}>
                                    Planet Name 
                                </div>
                                {width > 500 &&
                                <div  style={{flex:1, height:"30px", width:"20%", paddingLeft: "5px" , borderBottom:"1px solid red", display: "inline-block"}}>
                                    Population 
                                </div> 
                                }
                                {width > 500 &&
                                <div  style={{flex:1, height:"30px", width:"20%", paddingLeft: "5px" , borderBottom:"1px solid red", display: "inline-block"}}>
                                    Materials
                                </div>
                                }
                                {width > 500 &&
                                <div  style={{flex:1, height:"30px", width:"20%", paddingLeft: "5px" , borderBottom:"1px solid red", display: "inline-block"}}>
                                    Military 
                                </div>
                                }   
                                {width > 500 &&
                                <div  style={{flex:1, height:"30px", width:"20%", paddingLeft: "5px" , borderBottom:"1px solid red", display: "inline-block"}}>
                                    Harvest 
                                </div>
                                }                              
                            </div>
                            }
                            <div  style={{height:"45px", width:"100%", color: "white", display:"flex", cursor: "pointer"}} onClick={e => SetPlanet(planet.planetID)}>
                                <div  style={{flex:1, height:"40px", width:"50px", boxShadow:"0 2px 0 0 gray", 
                                    display: "inline-block"}}>     
                                      <img src={Textures[planet.planetType].Texture} height="35px" width="45px" ></img>
                                </div>
                                <div  style={{flex:1,height:"40px", width:width > 500 ?"20%":"60%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {planet.planetName} 
                                </div>
                                {width > 500 &&
                                <div  style={{height:"40px", width:"20%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {planet.population} 
                                </div>
                                } 
                                {width > 500 &&
                                <div  style={{flex:1,height:"40px", width:"20%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {Math.round(planet.materials*100)/100} 
                                </div>
                                }
                                {width > 500 &&
                                <div  style={{flex:1,height:"40px", width:"10%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray"}}>
                                    {planet.military} 
                                </div>
                                }
                                {width > 500 &&
                                <div  style={{flex:1,height:"40px", width:"10%", paddingLeft: "5px", display: "inline-block", boxShadow:"0 2px 0 0 gray", backgroundColor:Date.parse(planet.lastHarvest)<new Date()?'green':'red'}}>
                                     &nbsp;
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
  
  export default PlanetList;