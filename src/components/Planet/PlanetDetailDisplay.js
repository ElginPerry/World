import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import Planet from "./PlanetDisplay";
import Lights from "./Lights";
import Environment from "./Enviroment";
import windim from "../WindowDimensions";
import imgMetal from '../../assets/Metals.png'
import imgResearch from '../../assets/Research.png'
import imgFood from '../../assets/Food.png'
import imgEnergy from '../../assets/Energy.png'
import imgPopulation from '../../assets/Population.png'
import imgMaterials from '../../assets/Materials.png'
import imgIndustry from '../../assets/Industry.png'
import imgProdMetals from '../../assets/ProdMetals.png'
import BuildTimer from './BuildTimer'
import ResearchTimer from './BuildTimer'
import ShipTimer from './BuildTimer'
import "../../styles/stylesheet.css"

const PlanetDetailDisplay = (props) => { 
    const [planet, setPlanet] = useState(props.planet);
    const [PlanetStats, setPlanetStats] = useState(props.PlanetStats);
    const [bomeYD, setbomeYD] = useState(0);
    const [energyUsed, setenergyUsed] = useState(0);
    const PTid = props.PTid;
    const [BuildingStats, setBuildingStats] = useState(props.BuildingStats);
    const { width } = windim();
    const [bldName, setbldName] = useState('');
    const [researchName, setresearchName] = useState('');
    const [shipName, setshipName] = useState(''); 
    const [bldduration, setBldDuration] = useState(new Date());
    const [resduration, setResDuration] = useState(new Date());
    const [shpduration, setShpDuration] = useState(new Date());

    useEffect(() => {
        setshipName(props.shipName);
      }, [props.shipName]);

    useEffect(() => {
        setShpDuration(props.shpduration);
    }, [props.shpduration]);

    useEffect(() => {
        setresearchName(props.researchName);
      }, [props.researchName]);

    useEffect(() => {
        setResDuration(props.resduration);
    }, [props.resduration]);

    useEffect(() => {
        setbldName(props.bldName);
      }, [props.bldName]);

    useEffect(() => {
        setBldDuration(props.bldduration);
    }, [props.bldduration]);

    useEffect(() => {
        setPlanet(props.planet);
      }, [props.planet]);

    useEffect(() => {
        setPlanetStats(props.PlanetStats);
      }, [props.PlanetStats]);

    useEffect(() => {
        setBuildingStats(props.BuildingStats);
      }, [props.BuildingStats]);

    useEffect(() => {
        if (props.BuildingStats.length> 0)
        {
            setbomeYD(BuildingStats.filter(x => x.name == "Biodome")[0].populationMax);
            setenergyUsed(
                planet.energy*BuildingStats.filter(x => x.name == "Power Plant")[0].energyCost +
                planet.research*BuildingStats.filter(x => x.name == "Research Lab")[0].energyCost +
                planet.metals*BuildingStats.filter(x => x.name == "Mine")[0].energyCost +
                planet.food*BuildingStats.filter(x => x.name == "Farm")[0].energyCost +
                planet.factories*BuildingStats.filter(x => x.name == "Factory")[0].energyCost +
                planet.bioDomes*BuildingStats.filter(x => x.name == "Biodome")[0].energyCost 
            ); 
        }
    }, [BuildingStats, planet]) 

    function RemoveBuilding(item)
    {
        props.setbldName('');
    }

    function RemoveResearch(item)
    {
        props.setresearchName('');
    }

    function RemoveShip(item)
    {
        props.setshipName('');     
    }

    return (
        <div style={{height:"100%"}}>
            {!isNaN(PlanetStats.Metals) &&
            <div style={{height:"100%", width:"100%", display:"inline-block"}}>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black"}}>
                    <div style={{width:"50%", height:"120px", display:"inline-block"}}>           
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
                    <div style={{width:"50%", display:"inline-block", verticalAlign:"top"}}>
                        <div style={{padding:"5px"}}><BuildTimer timeUp={RemoveBuilding} Date={bldduration} buildingName={bldName} /> </div>
                        <div style={{padding:"5px"}}><ResearchTimer timeUp={RemoveResearch} Date={resduration} buildingName={researchName} /></div>
                        <div style={{padding:"5px"}}><ShipTimer timeUp={RemoveShip} Date={shpduration} buildingName={shipName} /></div>
                    </div>
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
                            <img className="planetDetailImg" src={imgEnergy} alt="Energy Remaining" title="Energy Remaining" />
                            {width>500 && 'Energy Remaining'}
                        </div>
                        <div className="planetDetailData">
                            {Math.round((PlanetStats.Energy-energyUsed)*100)/100?? 'NA'}
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
                            {planet.population ? planet.population + "/" + (planet.bioDomes*bomeYD) : 'NA'}
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