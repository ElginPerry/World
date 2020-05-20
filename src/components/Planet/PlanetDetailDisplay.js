import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import Planet from "../PlanetDisplay";
import Lights from "../Lights";
import Environment from "../Enviroment";
import windim from "../WindowDimensions";
import imgMetal from '../../assets/Metals.png'
import imgResearch from '../../assets/Research.png'
import imgFood from '../../assets/Food.png'
import imgEnergy from '../../assets/Energy.png'
import imgPopulation from '../../assets/Population.png'
import imgMaterials from '../../assets/Materials.png'
import imgIndustry from '../../assets/Industry.png'
import imgProdMetals from '../../assets/ProdMetals.png'
import "../../styles/stylesheet.css"

const PlanetDetailDisplay = (props) => { 
    const planet = props.planet;
    const [PlanetStats, setPlanetStats] = useState(props.PlanetStats);
    const PTid = props.PTid;
    const { height, width } = windim();

    useEffect(() => {
        setPlanetStats(props.PlanetStats);
      }, [props.PlanetStats]);

    return (
        <div>
            {!isNaN(PlanetStats.Metals) &&
            <div style={{height:"50%", width:"100%", borderWidth:"2", borderColor:"black", display:"inline-block"}}>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black"}}>            
                    <Canvas 
                        camera={{fov:25,
                        aspect: window.innerWidth / window.innerHeight,
                        near: 0.1,
                        far: 1000
                    }}>
                        <Suspense fallback={<group />}>
                            <Planet planetType={PTid} radius={.3} isDetail={true} />
                            <Lights />
                            <Environment />
                        </Suspense> 
                    </Canvas>
                </div>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                    <div style={{display:"inline-block"}}>
                        <div style={{padding:"5px",color:"blue"}}>
                            Galaxy
                        </div> 
                        <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                            {planet.galaxy}
                        </div>
                    </div>
                    <div style={{display:"inline-block"}}>
                        <div style={{padding:"5px",color:"blue"}}>
                            Sector 
                        </div>
                        <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                            {planet.sector}
                        </div> 
                    </div>
                    <div style={{display:"inline-block"}}>
                        <div style={{padding:"5px",color:"blue"}}>
                            Moon 
                        </div>
                        <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                            {planet.moon ? "True" : "False"}
                        </div> 
                    </div>
                    <div style={{display:"inline-block"}}>
                        <div style={{padding:"5px",color:"blue"}}>
                            Barren 
                        </div>
                        <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                            {planet.barren ? "True" : "False"}
                        </div> 
                    </div>                                   
                </div>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgMetal} alt="Metals" title="Metals" />
                            {width>450 && 'Metals'}
                        </div>
                        <div className="planetDetailData">
                            {PlanetStats.Metals?? 'NA'}
                        </div>
                    </div>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgResearch} alt="Research" title="Research" />
                            {width>450 && 'Research'}
                        </div>
                        <div className="planetDetailData">
                            {PlanetStats.Research?? 'NA'}
                        </div>
                    </div>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgFood} alt="Food" title="Food" />
                            {width>450 && 'Food'}
                        </div>
                        <div className="planetDetailData">
                            {PlanetStats.Food?? 'NA'}
                        </div>
                    </div>                                        
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgEnergy} alt="Energy" title="Energy" />
                            {width>450 && 'Energy'}
                        </div>
                        <div className="planetDetailData">
                            {PlanetStats.Energy?? 'NA'}
                        </div>
                    </div>                                        
                </div>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgPopulation} alt="Population" title="Population" />
                            {width>500 && 'Population'}
                        </div>
                        <div className="planetDetailData">
                            {planet.population ? planet.population + "/" + (planet.bioDomes*10) : 'NA'}
                        </div>
                    </div>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgMaterials} alt="Materials" title="Materials" />
                            {width>500 && 'Materials'}
                        </div>
                        <div className="planetDetailData">
                            {planet.materials ?? 'NA'}
                        </div>
                    </div>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgIndustry} alt="Construction" title="Construction" />
                            {width>500 && 'Construction'}
                        </div>
                        <div className="planetDetailData">
                            {PlanetStats.Infrastructure?? 'NA'}
                        </div>
                    </div>  
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgProdMetals} alt="Material Production" title="Material Production" />
                            {width>500 && 'Production'}
                        </div>
                        <div className="planetDetailData">
                            {PlanetStats.InfrastructureMetal?? 'NA'}
                        </div>
                    </div> 
                </div>                
            </div> 
            }    
        </div>    
    )};
    
  export default PlanetDetailDisplay