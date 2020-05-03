import React, {useRef } from "react";
import { useLoader, useFrame } from 'react-three-fiber';
import SunTextureURL from "../assets/Fire2.jpg"
import SunTextureBump from "../assets/general rough bump.jpg"
import {
    TextureLoader,
    RepeatWrapping,
    Shape,
    ExtrudeGeometry,
    BoxGeometry,
    MeshStandardMaterial,
    CylinderGeometry,
    MeshBasicMaterial
} from 'three';

export default () => {  
    const mesh = useRef();
    const FakeSphere = () => {
        const [SunTexture, Bump] = useLoader( TextureLoader, [SunTextureURL, SunTextureBump]);
        //useFrame(({ clock }) => (mesh.current.rotation.y = clock.getElapsedTime() / 4) * Math.PI)

         return (
            <mesh  
                ref={mesh} >
                <sphereBufferGeometry args={[0.7, 30, 30]} attach="geometry" />
                {/* <meshBasicMaterial color={0xCCCC00} attach="material" /> */}

                <meshStandardMaterial
                    attach='material'
                    map={SunTexture}
                    bumpMap={Bump}
                    bumpScale={0.55}
                />   
            </mesh>
        );
    };

    return (
        <group>
            <FakeSphere />
            <ambientLight intensity={0.8} />
            <pointLight intensity={1.68} position={[0, 0, 0]} /> 
        </group>
    );
};
