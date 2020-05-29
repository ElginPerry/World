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
import {useSelector} from 'react-redux'

function PlanetList() {
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
    
    const UserID = useSelector(state => state.user.UserID);
    const [Planets, setPlanets] = useState([]); 

    useEffect(() => {                
        axios.get('http://apicall.starshipfleets.com/User/GetPlanetList/' + UserID)
        .then((response) => {            
            setPlanets(response.data);              
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    },[UserID]);

    function SetPlanet(PlanetID)
    {
        var link = "/PlanetView/" + PlanetID;
        window.location.assign(link);
    }

    return (
        <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}> 
            <div style={{height:"50px", width:"100%", textAlign:"center", color: "white"}}>Planet List</div>
            <div style={{height:"100%", width:"100%", fontSize:"14px"}}>
                {Planets.map((planet, index) => { 
                    return(
                        <div key={index} style={{height:"100px", width:"100%"}}>
                            <div  style={{height:"50px", width:"100%"}}>
                                <div  style={{height:"40px", width:"50px", border:"3px solid black", cursor: "pointer", 
                                    display: "inline-block", backgroundImage: 'url(' + Textures[planet.planetType].Texture + ')'}}
                                    onClick={e => SetPlanet(planet.planetID)}>     

                                </div>
                                <div  style={{height:"40px", width:"50px", cursor: "pointer", display: "inline-block", color: "white"}}>
                                    {planet.planetName} 
                                </div>
                            </div>
                            <div  style={{height:"50px", width:"100%"}}>
                                <div  style={{height:"40px", width:"33%", display: "inline-block", color: "white"}}>     
                                    {planet.population}
                                </div>
                                <div  style={{height:"40px", width:"33%", display: "inline-block", color: "white"}}>
                                    {planet.military} 
                                </div>
                                <div  style={{height:"40px", width:"33%", display: "inline-block", color: "white"}}>
                                    {planet.materials} 
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>           
    );
  }
  
  export default PlanetList;