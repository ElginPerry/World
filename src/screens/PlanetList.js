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
import PlanetTextureURL5 from "../assets/lava.jpg"
import PlanetTextureBump5 from "../assets/lava bump.jpg"
import PlanetTextureURL6 from "../assets/jungle.jpg"
import PlanetTextureBump6 from "../assets/jungle cutout.jpg"
import PlanetTextureURL7 from "../assets/mountain world.jpg"
import PlanetTextureBump7 from "../assets/rock world bump.jpg"
import { Vector3 } from 'three';

function PlanetList() {
    const Textures = [{Texture : PlanetTextureURL1, Bump: PlanetTextureBump1, Position: new Vector3(-1.2,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL2, Bump: PlanetTextureBump2, Position: new Vector3(-.9,0,0), Radius: .1}
        ,{Texture : PlanetTextureURL3, Bump: PlanetTextureBump3, Position: new Vector3(-.6,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL4, Bump: PlanetTextureBump4, Position: new Vector3(-.3,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL5, Bump: PlanetTextureBump5, Position: new Vector3(0,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL6, Bump: PlanetTextureBump6, Position: new Vector3(.3,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL7, Bump: PlanetTextureBump7, Position: new Vector3(.6,0,0), Radius: .1}];

    return (
        <div style={{height:"100%", borderWidth:"2", borderColor:"black"}}>        
            <Canvas 
                camera={{fov:25,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 1000
            }}>
                <Suspense fallback={<group />}>
                    {Textures.map((texture, index) => {
                        return(<Planet key={index} planetType={index} radius={texture.radius}/>);
                    })}
                    <Lights />
                    <Environment />
                </Suspense> 
            </Canvas>
        </div>    
    );
  }
  
  export default PlanetList;
  