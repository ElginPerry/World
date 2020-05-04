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
    import PlanetTextureURL5 from "../assets/lava.jpg"
    import PlanetTextureBump5 from "../assets/lava bump.jpg"
    import PlanetTextureURL6 from "../assets/jungle.jpg"
    import PlanetTextureBump6 from "../assets/jungle cutout.jpg"
    import PlanetTextureURL7 from "../assets/mountain world.jpg"
    import PlanetTextureBump7 from "../assets/rock world bump.jpg"
    import { useLoader, useFrame } from 'react-three-fiber';
    import { Vector3 } from 'three';
  
    export default function PlanetList(props) {
    const Textures = [{Texture : PlanetTextureURL1, Bump: PlanetTextureBump1, Position: new Vector3(-1.2,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL2, Bump: PlanetTextureBump2, Position: new Vector3(-.9,0,0), Radius: .1}
        ,{Texture : PlanetTextureURL3, Bump: PlanetTextureBump3, Position: new Vector3(-.6,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL4, Bump: PlanetTextureBump4, Position: new Vector3(-.3,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL5, Bump: PlanetTextureBump5, Position: new Vector3(0,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL6, Bump: PlanetTextureBump6, Position: new Vector3(.3,0,0), Radius: .1}
        ,{Texture :PlanetTextureURL7, Bump: PlanetTextureBump7, Position: new Vector3(.6,0,0), Radius: .1}];

    const mesh = useRef();
    const time = useRef(0);
  
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
  
    const isActiveRef = useRef(isActive);
    const isDetail = props.isDetail ?? false;
    const PlanetType = props.planetType ?? 2;
  
    // position
    // const position = useMemo(() => {
    //     //return [random(-3, 3, true), random(-3, 3, true), random(-3, 3, true)];
    //     return [random(-3, 3, true), random(-3, 3, true), 0];
    // }, []);
  
    // random time mod factor
    const timeMod = useMemo(() => random(0.1, 4, true), []);
  
    // radius
    const radius = !isDetail ? .1 : .4;
  
    //useEffect of the activeState
    useEffect(() => {
      isActiveRef.current = isActive;
    }, [isActive]);

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
            //e.stopPropagation();
            //     setIsActive(v => !v);
            //   },
            //   [setIsActive],
            if (!isDetail)
            {
                var link = "/PlanetDetail/" + PlanetType;
                window.location.assign(link);
            }
        }
    );

    const [planetTexture, Bump] = useLoader( TextureLoader, [Textures[PlanetType].Texture, Textures[PlanetType].Bump]);
    useFrame(({ clock }) => (mesh.current.rotation.y = clock.getElapsedTime() / 4) * Math.PI)
  
    return (
            <group>
                <mesh
                    ref={mesh}
                    //position={position}
                    position={!isDetail ? Textures[PlanetType].Position : new Vector3(0,0,0)}
                    onClick={e => onClick(e)}
                    onPointerOver={e => onHover(e, true)}
                    onPointerOut={e => onHover(e, false)}
                >
                    <sphereBufferGeometry args={[radius, 128, 128]} attach="geometry" /> 

                    {/* <boxBufferGeometry attach="geometry" args={[0.047, 0.5, 0.29]} /> */}
                    {/* <meshStandardMaterial
                        attach="material"
                        color={color}
                        roughness={0.6}
                        metalness={0.1}
                    /> */}

                    <meshStandardMaterial
                        attach='material'
                        metalness={0}
                        map={planetTexture}
                        bumpMap={Bump}
                        bumpScale={0.25}
                    />   
                </mesh>
            </group>
    );
  };