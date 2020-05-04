import React, {Suspense} from 'react';
import logo from '../logo.svg';
import { Canvas } from "react-three-fiber";
import Planet from "../components/PlanetDisplay";
import Lights from "../components/Lights";
import Environment from "../components/Enviroment";
import '../App.css';
import PlanetTextureURL1 from "../assets/gas.jpg"
import PlanetTextureBump1 from "../assets/gas.jpg"
import PlanetTextureURL2 from "../assets/gas red.jpg"
import PlanetTextureBump2 from "../assets/gas red.jpg"
import PlanetTextureURL3 from "../assets/Earth-hires.jpg"
import PlanetTextureBump3 from "../assets/earthBump.jpg"
import PlanetTextureURL4 from "../assets/general rock.jpg"
import PlanetTextureBump4 from "../assets/general rough bump.jpg"

function PlanetList(props) {
    //const planetType = props.planetType ?? 2;
    const { planetType } = props.match.params ?? 2;
    return (
        <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>        
            <Canvas 
                camera={{fov:25,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 1000
            }}>
                <Suspense fallback={<group />}>
                <Planet planetType={planetType} radius={.3} isDetail={true}/>
                    <Lights />
                    <Environment />
                </Suspense> 
            </Canvas>
        </div>   
    );
  }
  
  export default PlanetList;
  