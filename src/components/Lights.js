import React, {useRef } from "react";
import { useLoader, useFrame } from 'react-three-fiber';
import SunTextureURL from "../assets/Fire2.jpg"
import SunTextureBump from "../assets/general rough bump.jpg"
import {
    Vector3,
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
                <sphereBufferGeometry args={[0.1, 50, 50]} attach="geometry" />
                {/* <meshBasicMaterial color={0xCCCC00} attach="material" /> */}

                <meshStandardMaterial
                    attach='material'
                    map={SunTexture}
                    position={[0, 0, 0]}
                    bumpMap={Bump}
                    bumpScale={0.55}
                />   
            </mesh>
        );
    };

    return (
        <group>
            {/* <FakeSphere /> */}
            <ambientLight intensity={0.4} />
            <pointLight intensity={.7} position={[0, 3, 0]} /> 
            {/* <pointLight intensity={0.9} position={[1, 1, 0]} /> */}
            {/* <rectAreaLight intensity={3} position={[0, 10, -10]} width={30} height={30} onUpdate={self => self.lookAt(new Vector3(0, 0, 0))} /> */}
   
        </group>
    );
};
