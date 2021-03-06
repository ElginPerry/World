import React, {Suspense, useEffect, useState, useRef } from "react";
import { useLoader, useFrame, useThree, Canvas } from 'react-three-fiber';
import {TextureLoader, Vector3} from 'three';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import Environment from "../components/Planet/Enviroment";
import windim from "../components/WindowDimensions";
import * as Common from "../components/Common"
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
import PlanetTextureURL0 from "../assets/uranusmap.jpg"
import "../styles/stylesheet.css"

function SectorView(props){ 
    const dispatch = useDispatch();
    const [posts, setPosts] = useState({});    
    const UserID = useSelector(state => state.user.UserID);
    const userFleets = useSelector(state => state.shipReducer.UserFleets);
    const systemFleets = useSelector(state => state.shipReducer.SystemFleets)
    const PlanetList = useSelector(state => state.planetReducer.PlanetList);
    const [uniqueSystem, setSystems] = useState([]);
    const [sectorFleets, setsectorFleets] = useState([]);
    const [sectorPlanets, setsectorPlanets] = useState([]);
    const { height, width } = windim();
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
 
    var {sectorNumber, Galaxy, systemNumber} = props.match.params; 

    useEffect(() => {
        setsectorFleets(userFleets.filter(x => x.sector == sectorNumber))
    },[userFleets])

    useEffect(() => {
        setsectorPlanets(PlanetList.filter(x => x.sector == sectorNumber))
    },[PlanetList])

    useEffect(() => {
        axios.get("http://apicall.starshipfleets.com/Planet/GetSystem/" + (Galaxy??1) + "/" + (sectorNumber??'11') + '/' + (systemNumber??1))
        .then((response) => {
            setPosts(response.data);                                    
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {  
        });
    },[Galaxy]);

    useEffect(() => {
        if (posts.length > 0)
        {
            setSystems(posts.filter(x => x.system == (systemNumber??1)));
        }
        Common.GetSystemFleets(dispatch, systemNumber)
    },[posts]);


    function PlanetClick(PlanetID)
    {
        var link = "/PlanetView/" + PlanetID;
        window.location.assign(link); 
    }

    function GetPosition(pos, sub)
    {
        switch(pos) {
            case 1:                
                return new Vector3(-.8,.8-((sub-1)*.2),0);  
            case 2:
                return new Vector3(0,.8-((sub-1)*.2),0); 
            case 3:
                return new Vector3(.8,.8-((sub-1)*.2),0); 
            case 4:
                return new Vector3(-.8,-.2-((sub-1)*.2),0);  
            case 5:
                return new Vector3(0,-.2-((sub-1)*.2),0); 
            case 6:
                return new Vector3(.8,-.2-((sub-1)*.2),0); 
            case 7:
                return new Vector3(-.8,-.8-((sub-1)*.2),0);  
            case 8:
                return new Vector3(0,-.8-((sub-1)*.2),0); 
            case 9:
                return new Vector3(.8,-.8-((sub-1)*.2),0);                
            default:
                return new Vector3(.0,.0,0); 
          }
    }
    
    const Planet = (props) => {
        const refs = useRef([React.createRef(), React.createRef(), React.createRef(), 
            React.createRef(), React.createRef(), React.createRef(), React.createRef(), 
            React.createRef(), React.createRef(), React.createRef(), React.createRef(), 
            React.createRef(), React.createRef(), React.createRef(), React.createRef(),
            React.createRef(), React.createRef(), React.createRef(), React.createRef(), 
            React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
         
        const position = GetPosition(props.planet.position, props.planet.subPosition);
        var texture = sectorPlanets.length > 0 || sectorFleets.length > 0  ? Textures[props.planet.planetType].Texture : PlanetTextureURL0
        var bump = sectorPlanets.length > 0 || sectorFleets.length > 0 ? Textures[props.planet.planetType].Bump : PlanetTextureURL0
        const [planetTexture, Bump] = useLoader( TextureLoader, [texture, bump]);
        const radius = props.planet.subPosition == 1 ? .1 : .05;
        var speed = props.planet.moon ? 2 : 8
        useFrame(({ clock }) => (refs.current[props.index].current.rotation.y = clock.getElapsedTime() / speed) * Math.PI); 
        return (             
            <mesh   ref={refs.current[props.index]}                    
                    position={position}  onClick={(sectorNumber) => PlanetClick(props.planet.planetID)}>  
                    <sphereBufferGeometry args={[radius, 10, 10]} attach="geometry" />   
                    <meshStandardMaterial
                        attach='material'
                        map={planetTexture}
                        bumpMap={Bump}
                        bumpScale={0.55}
                    />   
            </mesh>
        );
    };

    const OwnerSphere = (props) => {        
        const position = GetPosition(props.planet.position, props.planet.subPosition);
        const color = (props.planet.owner == UserID) ? "lime" : "black";
            return (             
                <mesh  position={[position.x+.15,position.y,position.z]}>  
                        <boxBufferGeometry args={[0.02, 0.05, 0.00001]} attach="geometry" />   
                        <meshStandardMaterial
                            attach='material'
                            color={color}
                        />   
                </mesh>
            );
    };

    const ShipSphere = (props) => {        
        const position = GetPosition(props.planet.position, props.planet.subPosition);
        const color = (userFleets.find(x => x.planetID == props.planet.planetID && x.status == 0)) ? "blue" : "black";
            return (             
                <mesh  position={[position.x+.2,position.y,position.z]}>  
                        <boxBufferGeometry args={[0.02, 0.05, 0.00001]} attach="geometry" />   
                        <meshStandardMaterial
                            attach='material'
                            color={color}
                        />   
                </mesh>
            );
    };

    const OpponentSphere = (props) => {        
        const position = GetPosition(props.planet.position, props.planet.subPosition);        
        const color = (systemFleets.length > 0 && systemFleets.find(x => x.userID != UserID && x.planetID==props.planet.planetID)) ? "red" : "black";
            return (             
                <mesh  position={[position.x+.25,position.y,position.z]}>  
                        <boxBufferGeometry args={[0.02, 0.05, 0.00001]} attach="geometry" />   
                        <meshStandardMaterial
                            attach='material'
                            color={color}
                        />   
                </mesh>
            );
    };

    function CamComponent() {
        const { camera } = useThree()
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        return <mesh />
    }

    function BacktoGalaxy(){
        window.location.assign("/GalaxyView/"+ (Galaxy??1));
    }

    return (
        <div style={{height:"90%", width:"100%", textAlign: "center"}}>
            <div>
                <div className="button" onClick={BacktoGalaxy} style={{display:"inline-block"}}>
                        Back to Galaxy
                </div>
                <div onClick={BacktoGalaxy} style={{display:"inline-block", color:"gold"}}>
                        -- Gal:{Galaxy} Sec:{sectorNumber} Sys:{systemNumber} --
                </div>
            </div>
            <div style={{height:"75%", width:"95%", borderWidth:"2", borderColor:"black", display:"inline-block"}}>        
                <Canvas 
                    camera={{fov:25,
                    aspect: 1, //window.innerWidth / window.innerHeight,
                    near: 0.1,
                    far: 1000
                }}>
                    <Suspense fallback={<group/>}>
                        {uniqueSystem.length > 0 &&
                            uniqueSystem.map((planet, index) => { 
                                return(
                                        <group key={"g" + index}>
                                        <Planet key={"p" + index} index={index} planet={planet} />
                                        <OwnerSphere key={"O" + index} index={index} planet={planet} />
                                        <ShipSphere key={"s" + index} index={index} planet={planet} />
                                        <OpponentSphere key={"Op" + index} index={index} planet={planet} />
                                        </group>
                                    ); 
                            })
                        }
                        <ambientLight intensity={0.8} />
                        <pointLight intensity={1.1} position={[.6, .6, .2]} />
                        <CamComponent />
                        <Environment />
                    </Suspense> 
                </Canvas>
            </div>
        </div>  
    );
};

export default SectorView;