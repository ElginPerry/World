    import React, {useRef} from "react";
    import {
        TextureLoader,
        Vector3
    } from 'three';    
    import PlanetTextureURL1 from "../../assets/gas.jpg"
    import PlanetTextureBump1 from "../../assets/gas.jpg"
    import PlanetTextureURL2 from "../../assets/gasred.jpg"
    import PlanetTextureBump2 from "../../assets/gasred.jpg"
    import PlanetTextureURL3 from "../../assets/Earth-hires.jpg"
    import PlanetTextureBump3 from "../../assets/earthBump.jpg"
    import PlanetTextureURL4 from "../../assets/generalrock.jpg"
    import PlanetTextureBump4 from "../../assets/RockBump3.jpg"
    import PlanetTextureURL5 from "../../assets/lava.jpg"
    import PlanetTextureBump5 from "../../assets/lavabump.jpg"
    import PlanetTextureURL6 from "../../assets/jungle.jpg"
    import PlanetTextureBump6 from "../../assets/junglecutout.jpg"
    import PlanetTextureURL7 from "../../assets/mountainworld.jpg"
    import PlanetTextureBump7 from "../../assets/rockworldbump.jpg"
    import PlanetTextureURL8 from "../../assets/marsmap1k.jpg"
    import PlanetTextureBump8 from "../../assets/marsbump1k.jpg"
    import PlanetTextureURL9 from "../../assets/neptunemap.jpg"
    import PlanetTextureBump9 from "../../assets/neptunemap.jpg"
    import PlanetTextureURL10 from "../../assets/jupitermap.jpg"
    import PlanetTextureBump10 from "../../assets/jupitermap.jpg"
    import PlanetTextureURL11 from "../../assets/plutomap1k.jpg"
    import PlanetTextureBump11 from "../../assets/plutomap1k.jpg"
    import { useLoader, useFrame } from 'react-three-fiber'

    const PlanetDisplay = (props) => {   
        const Textures = [{Texture : PlanetTextureURL1, Bump: PlanetTextureBump1, Position: new Vector3(-.3,.6,0), Radius: .1}
            ,{Texture :PlanetTextureURL2, Bump: PlanetTextureBump2, Position: new Vector3(0,.6,0), Radius: .1}
            ,{Texture : PlanetTextureURL3, Bump: PlanetTextureBump3, Position: new Vector3(.3,.6,0), Radius: .1}
            ,{Texture :PlanetTextureURL4, Bump: PlanetTextureBump4, Position: new Vector3(-.3,.2,0), Radius: .1}
            ,{Texture :PlanetTextureURL5, Bump: PlanetTextureBump5, Position: new Vector3(0,.2,0), Radius: .1}
            ,{Texture :PlanetTextureURL6, Bump: PlanetTextureBump6, Position: new Vector3(.3,.2,0), Radius: .1}
            ,{Texture :PlanetTextureURL7, Bump: PlanetTextureBump7, Position: new Vector3(-.3,-.2,0), Radius: .1}
            ,{Texture :PlanetTextureURL8, Bump: PlanetTextureBump8, Position: new Vector3(0,-.2,0), Radius: .1}
            ,{Texture :PlanetTextureURL9, Bump: PlanetTextureBump9, Position: new Vector3(.3,-.2,0), Radius: .1}
            ,{Texture :PlanetTextureURL10, Bump: PlanetTextureBump10, Position: new Vector3(-.2,-.6,0), Radius: .1}
            ,{Texture :PlanetTextureURL11, Bump: PlanetTextureBump11, Position: new Vector3(.2,-.6,0), Radius: .1}];

        const mesh = useRef();    
        const isDetail = props.isDetail ?? false;
        const PlanetType = props.planetType ?? 2;
        const radius = !isDetail ? .1 : .7;
        
        function onClick(e) {
            if (!isDetail)
            {
                props.setPlanet(PlanetType);
            }
        };

        const [planetTexture, Bump] = useLoader( TextureLoader, [Textures[PlanetType].Texture, Textures[PlanetType].Bump]);
        useFrame(({ clock }) => (mesh.current.rotation.y = clock.getElapsedTime() / 4) * Math.PI);   
    
        return (
                <group>
                    <mesh
                        ref={mesh}
                        position={!isDetail ? Textures[PlanetType].Position : new Vector3(0,0,0)}
                        onClick={e => onClick(e)}
                    >                    
                        <sphereBufferGeometry args={[radius, 30, 30]} attach="geometry" /> 
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

  export default PlanetDisplay