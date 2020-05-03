    import React, {
        useMemo,
        useRef,
        useState,
        useEffect,
        useCallback
    } from "react";
    import { random } from "lodash";
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
    import PlanetTextureURL1 from "../assets/gas.jpg"
    import PlanetTextureBump1 from "../assets/gas.jpg"
    import PlanetTextureURL2 from "../assets/gas red.jpg"
    import PlanetTextureBump2 from "../assets/gas red.jpg"
    import PlanetTextureURL3 from "../assets/Earth-hires.jpg"
    import PlanetTextureBump3 from "../assets/earthBump.jpg"
    import PlanetTextureURL4 from "../assets/general rock.jpg"
    import PlanetTextureBump4 from "../assets/general rough bump.jpg"
    import { useLoader, useFrame } from 'react-three-fiber';
  
  export default () => {
    const mesh = useRef();
    const time = useRef(0);
  
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
  
    const isActiveRef = useRef(isActive);
  
    // position
    const position = useMemo(() => {
        //return [random(-3, 3, true), random(-3, 3, true), random(-3, 3, true)];
        return [random(-3, 3, true), random(-3, 3, true), 2];
    }, []);
  
    // random time mod factor
    const timeMod = useMemo(() => random(0.1, 4, true), []);
  
    // color
    const color = isHovered ? 0xe5d54d : (isActive ? 0xf7e7e5 : 0xf95b3c);
  
    //useEffect of the activeState
    useEffect(() => {
      isActiveRef.current = isActive;
    }, [isActive]);
  
    // raf loop
    useFrame(() => {
      mesh.current.rotation.y += 0.01 * timeMod;
      if (isActiveRef.current) {
        time.current += 0.03;
        mesh.current.position.y = position[1] + Math.sin(time.current) * 0.4;
      }
    });
  
    // Events
    const onHover = useCallback(
      (e, value) => {
        e.stopPropagation();
        setIsHovered(value);
      },
      [setIsHovered]
    );
  
    const onClick = useCallback(
      e => {
        e.stopPropagation();
        setIsActive(v => !v);
      },
      [setIsActive]
    );

    const [planetTexture, Bump] = useLoader( TextureLoader, [PlanetTextureURL1, PlanetTextureBump1]);
    //planetTexture.wrapS = RepeatWrapping;
    //planetTexture.wrapT = RepeatWrapping;
    //planetTexture.offset.set(0, 0);
    //planetTexture.repeat.set(3, 6);
    //useFrame(({ clock }) => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z = Math.cos(clock.getElapsedTime() / 8) * Math.PI))
    useFrame(({ clock }) => (mesh.current.rotation.y = clock.getElapsedTime() / 4) * Math.PI)
  
    return (
            <group>
                <mesh
                    ref={mesh}
                    //position={position}
                    position={[-3, 0, 0]}
                    onClick={e => onClick(e)}
                    onPointerOver={e => onHover(e, true)}
                    onPointerOut={e => onHover(e, false)}
                >
                    <sphereBufferGeometry args={[0.7, 15, 15]} attach="geometry" /> 

                    {/* <boxBufferGeometry attach="geometry" args={[0.047, 0.5, 0.29]} /> */}
                    {/* <meshStandardMaterial
                        attach="material"
                        color={color}
                        roughness={0.6}
                        metalness={0.1}
                    /> */}

                    <meshStandardMaterial
                        attach='material'
                        //color={0xffffff}
                        //roughness={0.25}
                        //metalness={0}
                        map={planetTexture}
                        bumpMap={Bump}
                        bumpScale={0.25}
                    />   
                </mesh>
            </group>
    );
  };