import React, {useRef } from "react";
import { useLoader } from 'react-three-fiber';
import SunTextureURL from "../../assets/Fire2.jpg"
import SunTextureBump from "../../assets/generalroughbump.jpg"
import {TextureLoader, Vector3} from 'three';

function Lights(){  
    const mesh = useRef();
    const FakeSphere = () => {
        const [SunTexture, Bump] = useLoader( TextureLoader, [SunTextureURL, SunTextureBump]);
          return (
            <mesh  
                ref={mesh} position={new Vector3(1.2,1.2,0)}>                    
                    <sphereBufferGeometry args={[0.5, 50, 50]} attach="geometry" />   
                    <meshStandardMaterial
                    attach='material'
                    map={SunTexture}
                    position={[0,0,0]}
                    bumpMap={Bump}
                    bumpScale={0.55}
                />   
            </mesh>
        );
    };

    return (
        <group>
            <FakeSphere />
            <ambientLight intensity={0.4} />
            <pointLight intensity={1.2} position={[.8, .8, .2]} />    
        </group>
    );
};

export default Lights;
