import React, {Suspense, useEffect, useState } from "react";
import { useLoader } from 'react-three-fiber';
import SunTextureURL from "../assets/Fire2.jpg"
import SunTextureBump from "../assets/generalroughbump.jpg"
import {TextureLoader, Vector3} from 'three';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Environment from "../components/Enviroment";
import { Canvas } from "react-three-fiber";
import windim from "../components/WindowDimensions";
import Button from '@material-ui/core/Button';

function SectorView(props){   
    const [posts, setPosts] = useState({});    
    const UserID = useSelector(state => state.user.UserID);
    const [uniqueSYSPOS, setSYSPOS] = useState([]); 
    var {sectorNumber, Galaxy} = props.match.params; 
    const { height, width } = windim();
    
    useEffect(() => {
        axios.get("http://apicall.starshipfleets.com/Planet/GetSector/" + (Galaxy??1) + "/" + (sectorNumber??'11'))
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
            const SYSPOS = posts.map(x => x.sysPosition);
            setSYSPOS([...new Set(SYSPOS)]);
        }
    },[posts]);

    function PlanetClick(sysPosition)
    {
        var link = "/SystemView/" + (Galaxy??1) + "/" + (sectorNumber??'11') + "/" + sysPosition;
        window.location.assign(link);
    }

    function GetPosition(pos)
    {
        switch(pos) {
            case 1:
                return new Vector3(-.7,.7,0);  
            case 2:
                return new Vector3(0,.7,0); 
            case 3:
                return new Vector3(.7,.7,0); 
            case 4:
                return new Vector3(-.7,0,0);  
            case 5:
                return new Vector3(0,0,0); 
            case 6:
                return new Vector3(.7,0,0); 
            case 7:
                return new Vector3(-.7,-.7,0);  
            case 8:
                return new Vector3(0,-.7,0); 
            case 9:
                return new Vector3(.7,-.7,0);                
            default:
                return new Vector3(.0,.0,0); 
          }
    }
    
    const SysSphere = (props) => {        
        const position = GetPosition(props.sysPosition);
        const [SunTexture, Bump] = useLoader( TextureLoader, [SunTextureURL, SunTextureBump]);
        return (             
            <mesh   
                    position={position}  onClick={() => PlanetClick( props.sysPosition )}>  
                    <sphereBufferGeometry args={[.1, 10, 10]} attach="geometry" />   
                    <meshStandardMaterial
                        attach='material'
                        map={SunTexture}
                        bumpMap={Bump}
                        bumpScale={0.55}
                    />   
            </mesh>
        );
    };

    const OwnerSphere = (props) => {  
        const System = posts.filter(x => x.galaxy==(Galaxy??1) && x.sector === (sectorNumber??'11') && x.sysPosition === props.sysPosition)      
        const position = GetPosition(props.sysPosition);
        const color = System.filter(x => x.owner === UserID).length > 0 ? "lime" : "black";
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
        const System = posts.filter(x => x.galaxy==(Galaxy??1) && x.sector === (sectorNumber??'11') && x.sysPosition === props.sysPosition)
        const position = GetPosition(props.sysPosition);
        const color = System.filter(x => x.owner === UserID).length > 0 ? "blue" : "black";
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
        const System = posts.filter(x => x.galaxy==(Galaxy??1) && x.sector === (sectorNumber??'11') && x.sysPosition === props.sysPosition)      
        const position = GetPosition(props.sysPosition);
        const color = System.filter(x => x.owner === UserID).length > 0 ? "red" : "black";
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


    const DisplaySector = (props) => {
        const width = props.width;
        const height = props.height;
        return (            
            <Canvas 
                camera={{fov:props.fov,
                aspect: width/height,
                near: 0.1,
                far: 1000
            }}>                
                <Suspense fallback={<group/>}>
                    {uniqueSYSPOS.length > 0 &&
                        uniqueSYSPOS.map((sysPosition, index) => { 
                            return(
                                    <group key={"g" + index}>
                                        <SysSphere key={"p" + index} index={index} sysPosition={sysPosition} />
                                        <OwnerSphere key={"o" + index} index={index} sysPosition={sysPosition} />
                                        <ShipSphere key={"s" + index} index={index} sysPosition={sysPosition} />
                                        <OpponentSphere key={"op" + index} index={index} sysPosition={sysPosition} />
                                    </group>                                    
                                ); 
                        })
                    }
                    <ambientLight intensity={0.5} />
                    <pointLight intensity={1.8} position={[.8, .8, .2]} />
                    <Environment />
                </Suspense> 
            </Canvas>
        )
    };

    function BacktoGalaxy(){
        window.location.assign("/GalaxyView");
    }

    return (
        <div style={{height:"90%", width:"100%", textAlign: "center" }} >
            <div>
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    id="btgBtn"
                    onClick={()=>BacktoGalaxy()}
                >
                    Back to Galaxy
                </Button>
            </div>
            <div style={{height:"75%", width:"95%", borderWidth:"2", borderColor:"black", display:"inline-block"}}> 
                <DisplaySector fov={width<420 ? "45" : "25"} width={width} height={height}/>                  
            </div>
        </div>  
    );
};

export default SectorView;




