import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import {useSelector, useDispatch} from 'react-redux'
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
import HarvestTimer from './HarvestTimer'
import "../../styles/stylesheet.css"

const PlanetDetailDisplay = (props) => { 
    const [planet, setPlanet] = useState(props.planet);
    const [PlanetPop, setPlanetPop] = useState(props.PlanetPop);
    const [PlanetStats, setPlanetStats] = useState(props.PlanetStats);
    const [tab, settab] = useState(props.tab);
    const PTid = props.PTid; 
    const { width } = windim();
    const [bldName, setbldName] = useState('');
    const [researchName, setresearchName] = useState('');
    const [shipName, setshipName] = useState(''); 
    const [bldduration, setBldDuration] = useState(new Date());
    const [resduration, setResDuration] = useState(new Date());
    const [shpduration, setShpDuration] = useState(new Date());
    const [harvestduration, setharvestduration] = useState(new Date());
    const [ShowHarvestButton, setShowHarvestButton] = useState(false);
    const [ShowBuildingQue, setShowBuildingQue] = useState(false);
    const [BuildingQueList, setBuildingQueList] = useState(props.BuildingQueList)
    const [ShipQueList, setShipQueList] = useState(props.ShipQueList)
    const [ResearchQueList, setResearchQueList] = useState(props.ResearchQueList)

    useEffect(() => {
        settab(props.tab);
    }, [props.tab]);

    useEffect(() => {
        setshipName(props.shipName);
    }, [props.shipName]);

    useEffect(() => {
        setBuildingQueList(props.BuildingQueList);
    }, [props.BuildingQueList]);

    useEffect(() => {
        setShipQueList(props.ShipQueList);
    }, [props.ShipQueList]);

    useEffect(() => {
        setResearchQueList(props.ResearchQueList);
    }, [props.ResearchQueList]);

    useEffect(() => {
        setharvestduration(props.harvestduration);
    }, [props.harvestduration]);

    useEffect(() => {
        HarvestButtonDisplay();
    })

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
        setPlanetPop(props.PlanetPop);
    }, [props.PlanetPop]); 

    function HarvestButtonDisplay()
    {
        if (+harvestduration - +new Date()>0)
        {
            setShowHarvestButton(false)
        }
        else
            setShowHarvestButton(true)
    }

    function BuildingQueDisplay()
    {
        setShowBuildingQue(!ShowBuildingQue);
    }

    function RemoveBuilding(item)
    {
        props.setbldName('');
        props.BuildingQue(item);
    }

    function RemoveResearch(item)
    {
        props.setresearchName('');
    }

    function RemoveShip(item)
    {
        props.setshipName('');     
    }

    function FormatDate(CompleteDate)
    {
        var ts_hms = new Date(Date.parse(CompleteDate));
        return ts_hms.getFullYear() + '-' + 
        ("0" + (ts_hms.getMonth() + 1)).slice(-2) + '-' + 
        ("0" + (ts_hms.getDate())).slice(-2) + ' ' +
        ("0" + ts_hms.getHours()).slice(-2) + ':' +
        ("0" + ts_hms.getMinutes()).slice(-2) + ':' +
        ("0" + ts_hms.getSeconds()).slice(-2);
    }



    return (
        <div >            
            <div style={{height:"100%", width:"100%", display:"inline-block", position: "relative"}}>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black"}}>
                    <div style={{width:"30%", height:"120px", display:"inline-block"}}>           
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
                    <div style={{width:"60%", display:"inline-block", verticalAlign:"top"}}>
                        <div style={{padding:"5px",display:tab == 1 || tab == 2? "block" : "none"}} ><BuildTimer timeUp={RemoveBuilding} Date={bldduration} buildingName={bldName} /> </div>


                        <div style={{display:tab == 2? "block" : "none", width:"95%", border:"1px solid gray" }}>
                            {BuildingQueList.length > 0 &&
                                BuildingQueList.map((building, index) => { 
                                return(
                                    <div key={"g" + index} style={{width:"100%", textAlign:"center" }}>
                                        {index==0 &&
                                        <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%"}}>
                                            <div style={{ width: "30%", borderBottom: '1px solid red', display:"inline-block"}}>
                                                Name
                                            </div>   
                                            <div style={{ width: "70%", borderBottom: '1px solid red', display:"inline-block"}}>
                                                Completed
                                            </div>                                       
                                        </div>
                                        }
                                        {index>0 &&
                                        <div style={{width:"95%", paddingBottom: "2px" }}>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "30%"}}>                                       
                                                    {building.buildingName}                                          
                                            </div>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "60%"}}>
                                                    {FormatDate(building.completetionDate)}                                       
                                            </div> 
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"red"}}>
                                                    {width>450 ? 'Cancel' : 'C'}                                       
                                            </div>
                                        </div>
                                        }                                                              
                                    </div>    
                                    ); 
                                })
                            }                    
                        </div>

                        <div style={{padding:"5px",display:tab == 1 || tab == 3? "block" : "none"}}><ResearchTimer timeUp={RemoveResearch} Date={resduration} buildingName={researchName} /></div>
                        <div style={{display:tab == 3? "block" : "none", width:"95%", border:"1px solid gray" }}>
                            {ResearchQueList.length > 0 &&
                                ResearchQueList.map((research, index) => { 
                                return(
                                    <div key={"g" + index} style={{width:"100%", textAlign:"center" }}>
                                        {index==0 &&
                                        <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%"}}>
                                            <div style={{ width: "30%", borderBottom: '1px solid red', display:"inline-block"}}>
                                                Name
                                            </div>   
                                            <div style={{ width: "70%", borderBottom: '1px solid red', display:"inline-block"}}>
                                                Completed
                                            </div>                                       
                                        </div>
                                        }
                                        {index>0 &&
                                        <div style={{width:"95%", paddingBottom: "2px" }}>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "30%"}}>                                       
                                                    {research.buildingName}                                          
                                            </div>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "60%"}}>
                                                    {FormatDate(research.completetionDate)}                                       
                                            </div> 
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"red"}}>
                                                    {width>450 ? 'Cancel' : 'C'}                                       
                                            </div>
                                        </div>
                                        }                                                              
                                    </div>    
                                    ); 
                                })
                            }
                        </div>

                        <div style={{padding:"5px",display:tab == 1 || tab == 4? "block" : "none"}}><ShipTimer timeUp={RemoveShip} Date={shpduration} buildingName={shipName} /></div>                    
                        <div style={{display:tab == 4? "block" : "none", width:"95%", border:"1px solid gray" }}>
                            {ShipQueList.length > 0 &&
                                ShipQueList.map((ship, index) => { 
                                return(
                                    <div key={"g" + index} style={{width:"100%", textAlign:"center" }}>
                                        {index==0 &&
                                        <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%"}}>
                                            <div style={{ width: "30%", borderBottom: '1px solid red', display:"inline-block"}}>
                                                Name
                                            </div>   
                                            <div style={{ width: "70%", borderBottom: '1px solid red', display:"inline-block"}}>
                                                Completed
                                            </div>                                       
                                        </div>
                                        }
                                        {index>0 &&
                                        <div style={{width:"95%", paddingBottom: "2px" }}>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "30%"}}>                                       
                                                    {ship.buildingName}                                          
                                            </div>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "60%"}}>
                                                    {FormatDate(ship.completetionDate)}                                       
                                            </div> 
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"red"}}>
                                                    {width>450 ? 'Cancel' : 'C'}                                       
                                            </div>
                                        </div>
                                        }                                                              
                                    </div>    
                                    ); 
                                })
                            }                     
                        </div>
                    </div>
                </div>
                <div className={width>450?"harvesttimer":"harvesttimerSmall"}>
                    <div style={{padding:"5px",display:ShowHarvestButton? "block" : "none", color:"gold"}}  onClick={() => props.UpdatePlanetHarvest(
                        (Math.round(
                            (PlanetStats.food+(PlanetStats.food*(PlanetPop.foodPop/100)))
                            *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)    
                            ))>planet.population?1:-1                           
                        ,
                        (Math.round(
                            (PlanetStats.infrastructure)
                            *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                            *
                            (PlanetStats.mining+(PlanetStats.mining*(PlanetPop.metalsPop/100)))                                
                            *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)                                
                            *100)/100)
                        )} >Harvest
                    </div>
                    <div style={{padding:"5px",display:!ShowHarvestButton? "block" : "none"}}><HarvestTimer timeUp={HarvestButtonDisplay} Date={harvestduration} buildingName="" /></div>                    
                </div>               
                <div style={{display:tab == 1? "block" : "none" }}>
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
                                {(Math.round(
                                    (PlanetStats.mining+(PlanetStats.mining*(PlanetPop.metalsPop/100)))                                
                                    *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                    *100)/100)?? 'NA'}
                            </div>
                        </div>
                        <div className="planetDetailStats">
                            <div>
                                <img className="planetDetailImg" src={imgResearch} alt="Research" title="Research" />
                                {width>450 && 'Research'}
                            </div>
                            <div className="planetDetailData">
                                {(Math.round(
                                    (PlanetStats.research+(PlanetStats.research*(PlanetPop.researchPop/100)))
                                    *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                    *100)/100)?? 'NA'}
                            </div>
                        </div>
                        <div className="planetDetailStats">
                            <div>
                                <img className="planetDetailImg" src={imgFood} alt="Food" title="Food" />
                                {width>450 && 'Food'}
                            </div>
                            <div className="planetDetailData">
                                {(Math.round(
                                    (PlanetStats.food+(PlanetStats.food*(PlanetPop.foodPop/100)))
                                    *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)    
                                    *100)/100)?? 'NA'}
                            </div>
                        </div>                                        
                        <div className="planetDetailStats">
                            <div>
                                <img className="planetDetailImg" src={imgEnergy} alt="Energy Remaining" title="Energy Remaining" />
                                {width>450 && 'Energy'}
                            </div>
                            <div className="planetDetailData">
                                {(Math.round(                                
                                    (PlanetStats.energy+(PlanetStats.energy*(PlanetPop.energyPop/100)))  
                                    /PlanetStats.energyCost)*100) +'%' ?? 'NA'}
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
                                {planet.population ? planet.population + '/' + PlanetStats.populationMax : 'NA'}
                            </div>
                        </div>
                        <div className="planetDetailStats">
                            <div>
                                <img className="planetDetailImg" src={imgMaterials} alt="Materials" title="Materials" />
                                {width>500 && 'Materials'}
                            </div>
                            <div className="planetDetailData">
                                {!isNaN(Math.round(planet.materials*100)/100) ? Math.round(planet.materials*100)/100 :'NA'}
                            </div>
                        </div>
                        <div className="planetDetailStats">
                            <div>
                                <img className="planetDetailImg" src={imgIndustry} alt="Construction" title="Construction" />
                                {width>500 && 'Construction'}
                            </div>
                            <div className="planetDetailData">
                                {(Math.round(
                                    (PlanetStats.infrastructure+(PlanetStats.infrastructure*(PlanetPop.infrastructurePop/100)))
                                    *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                    *100)/100)?? 'NA'}
                            </div>
                        </div>  
                        <div className="planetDetailStats">
                            <div>
                                <img className="planetDetailImg" src={imgProdMetals} alt="Material Production" title="Material Production" />
                                {width>500 && 'Production'}
                            </div>
                            <div className="planetDetailData">
                                {(Math.round(
                                    (PlanetStats.infrastructure)
                                    *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                    *
                                    (PlanetStats.mining+(PlanetStats.mining*(PlanetPop.metalsPop/100)))                                
                                    *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)                                
                                    *100)/100) ?? 'NA'}
                            </div>
                        </div> 
                    </div>
                </div>


                <div className="popup" style={{display:ShowBuildingQue ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', 
                overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} >
                    <div>
                    {BuildingQueList.length > 0 &&
                        BuildingQueList.map((building, index) => { 
                        return(
                            <div key={"g" + index}>
                                {index==0 &&
                                <div style={{fontSize: "10px", paddingBottom: "10px"}}>
                                    <div style={{ width: "30%", borderBottom: '1px solid red'}}>
                                        Name
                                    </div>                                         
                                </div>
                                }
                                 <div style={{fontSize: "10px", paddingBottom: "10px"}}>
                                    <div style={{ width: "30%"}}>
                                        {building.buildingName}
                                    </div>                                         
                                </div>
                                <div style={{fontSize: "10px", paddingBottom: "10px"}}>
                                    <div style={{ width: "50%"}}>
                                        {FormatDate(building.completetionDate)}
                                    </div>                                         
                                </div>                                                               
                            </div>    
                            ); 
                        })
                    }                    
                    </div>
                    <div>
                        <div style={{textAlign: "center", width:"100%", padding: "15px"}} onClick={() => BuildingQueDisplay()}>
                            CLOSE
                        </div>
                    </div>
                </div>           




            </div> 
        </div>    
    )};
    
  export default PlanetDetailDisplay