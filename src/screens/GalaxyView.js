import React, {Suspense, useEffect, useState, useRef, useCallback } from "react";
import { useLoader, Canvas, useThree } from 'react-three-fiber';
import SunTextureURL from "../assets/Fire2.jpg"
import SunTextureBump from "../assets/generalroughbump.jpg"
import BlueSunTextureURL from "../assets/gas.jpg"
import {TextureLoader, Vector3} from 'three';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Environment from "../components/Planet/Enviroment";
import windim from "../components/WindowDimensions";
import "../styles/stylesheet.css"

function GalaxyView(props){   
    const [posts, setPosts] = useState({});    
    const [selectSector, setselectSector] = useState(false);    
    const [selectZoom, setselectZoom] = useState(new Vector3(0,0,5)); 
    const [uniqueSYSPOS, setSYSPOS] = useState([{}]); 
    var {Galaxy} = props.match.params;     
    const { width } = windim();
    var SYSPOS = ([]); 
    const cam = useRef();  
    const panesPoints = [-.9,-.7,-.5,-.3,-.1,.1,.3,.5,.7,.9]; 
    var SunTexture = new TextureLoader().load( SunTextureURL );
    var Bump = new TextureLoader().load( SunTextureBump );
    var BlueSunTexture = new TextureLoader().load( BlueSunTextureURL );
    const UserID = useSelector(state => state.user.UserID);


    
    useEffect(() => {
        axios.get("http://apicall.starshipfleets.com/Planet/GetGalaxy/" + (Galaxy??1))
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
            posts.map((item,index) => {
                if (item.owner == UserID)
                {                    
                    if (SYSPOS.filter(obj => obj.xSysPosition == item.xSysPosition && obj.sector == item.sector ).length == 0)
                    {                        
                        SYSPOS.push({xSysPosition: item.xSysPosition, ySysPosition: item.ySysPosition, sector: item.sector, System: item.system, Owner: item.owner});
                    }
                    else if (SYSPOS.filter(obj => obj.xSysPosition == item.xSysPosition && obj.sector == item.sector).Owner != UserID) 
                    {
                        const mySystem = SYSPOS.find(obj => obj.xSysPosition == item.xSysPosition && obj.sector == item.sector);
                        mySystem.Owner = UserID
                    }   
                }
                else if (SYSPOS.filter(obj => obj.xSysPosition == item.xSysPosition && obj.sector == item.sector ).length == 0)
                    SYSPOS.push({xSysPosition: item.xSysPosition, ySysPosition: item.ySysPosition, sector: item.sector, System: item.system, Owner: item.owner});
            })
            setSYSPOS([...new Set(SYSPOS)]);
            console.log(SYSPOS)
        }
    },[posts]);

    function GetPosition(xposition, yposition, sector)
    {
        var xpos = ((((('' +sector).substr(0,1)-5) * 10))/100*2) + (xposition/10000);
        var ypos = ((((('' +sector).substr(1)-5) * 10))/100*2) + (yposition/10000);
        return new Vector3(xpos,ypos,0);       
    }
    
    const SysSphere = (props) => {        
        const position = GetPosition(props.xSysPosition, props.ySysPosition, props.sector); 
        const UseTexture = props.Owner == UserID ? BlueSunTexture : SunTexture;
        return (             
            <mesh   
                    position={position}  onClick={() => PlanetClick( props.sector, props.System )}>  
                    <sphereBufferGeometry args={[.005, 10, 10]} attach="geometry" />   
                    <meshStandardMaterial
                        attach='material'
                        map={UseTexture}
                        bumpMap={Bump}
                        color="white"
                        bumpScale={0.55}
                    />   
            </mesh>
        );
    };

    const DrawPane = (props) => {
        const [isHovered, setIsHovered] = useState(false);
        const onHover = useCallback(        
            (e, value) => {
              e.stopPropagation();
              setIsHovered(value);
            },
            [setIsHovered]        
          );

        return (             
            <mesh   
                    position={props.pos}  
                    onClick={() => {ZoomClick(new Vector3(props.pos.x, props.pos.y, 5))}}
                    scale={[1, 1, 1]}       
                    onPointerOver={e => onHover(e, true)}
                    onPointerOut={e => onHover(e, false)}>
                    <boxBufferGeometry attach="geometry" args={[.2, .2, .001]} />
                    <meshStandardMaterial
                        attach="material"
                        opacity={isHovered ? 0.2 : 0.0} 
                        transparent                  
                    />
            </mesh>
        );
    };

    const SectorPane = (props) => {
        var panes = [];
        panesPoints.map((xpoint, index) => {
            const xindex = index;
            panesPoints.map((ypoint, index) => {
                var panePos = new Vector3(xpoint,ypoint,.1);
                panes.push(
                    <DrawPane key={xindex+"S"+index} pos={panePos} />
                )
            });
        });
        return panes;
    }

    const Lines = (props) => {   
        var rows = [];
        for (var x = 0; x < 11; x++) {
            rows.push(
                <mesh key={"c" + x}  
                position={[1-(x/5),0,.12]} 
                scale={[1, 1, 1]} transparent>  
                    <boxBufferGeometry attach="geometry" args={[.001, 2, .00001]} />
                    <meshStandardMaterial
                        attach="material"
                        color="gray"
                        transparency=".2"
                    />
                </mesh>
            );
        }

        for (var y = 0; y < 11; y++) {
            rows.push(
                <mesh key={"r" + y}  
                position={[0,1-(y/5),.12]}  
                scale={[1, 1, 1]} transparent>  
                    <boxBufferGeometry attach="geometry" args={[2, .001, .00001]} />
                    <meshStandardMaterial
                        attach="material"
                        color="gray"
                    />
                </mesh>
            );
        }
        return (                     
            rows
        );
    };

    function CamComponent() {
        var zoomSet = width<400 ? 6 : 3;
        const zoom = selectSector ? zoomSet : 1;
        const pos = selectSector ? selectZoom : new Vector3(0,0,5);
        const { camera } = useThree()
        camera.aspect = 1; 
        camera.zoom = zoom;
        camera.position.set(pos.x,pos.y,pos.z);
        camera.updateProjectionMatrix();
        return <mesh />
    }

    function PlanetClick(sector, System)
    {
        var link = "/SystemView/" + (Galaxy??1) + "/" + (sector??'11') + "/" + System;
        window.location.assign(link);
    }

    function ZoomClick(Position)
    {
        setselectSector(true)
        setselectZoom(Position)  
    }

    function BacktoGalaxy(){
        setselectSector(false);
    }

    return (
        <div style={{height:"90%", width:"100%", textAlign: "center", position: "relative" }} >
            <div className="button" onClick={BacktoGalaxy} >
                    Back to Galaxy
            </div>
            <div style={{height:"90%", width:"95%", borderWidth:"2", borderColor:"black", display:"inline-block"}}> 
            <Canvas
                camera={{fov:25,
                aspect: 1,
                near: 0.1,
                far: 1000,
                ref: {cam}
            }}>                
                <Suspense fallback={<group/>}>
                    {uniqueSYSPOS.length > 1 &&
                        uniqueSYSPOS.map((item, index) => { 
                            return(
                                    <group key={"g" + index}>
                                        <SysSphere key={"p" + index} index={index} xSysPosition={item.xSysPosition} ySysPosition={item.ySysPosition} sector={item.sector} System={item.System} Owner={item.Owner} />
                                    </group>                                    
                                ); 
                        })
                    }
                    <ambientLight intensity={2.8} />                    
                    <Environment />
                    <CamComponent />
                    <SectorPane />
                    <Lines />
                </Suspense> 
            </Canvas>
            </div>
            {/* <div style={{position: "absolute", display: "block", zindex: "99", left: "5%", top: "5%", height:"10%", width:"10%", backgroundColor:"yellow"}}>
            </div> */} 
        </div>  
    );
};

export default GalaxyView;




