import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import ShipDetailDisplay from "../Details/ShipDetailDisplay"
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
import imgMilitary from '../../assets/military.png'
import imgTradeRoutes from '../../assets/traderoutes.png'
import BuildTimer from './BuildTimer'
import ResearchTimer from './BuildTimer'
import ShipTimer from './BuildTimer'
import ArrivalTimer from './BuildTimer'
import * as Common from "../Common"
import HarvestTimer from './HarvestTimer'
import "../../styles/stylesheet.css"
import { useSelector, useDispatch } from 'react-redux';

const PlanetDetailDisplay = (props) => {
    const dispatch = useDispatch();
    const [tab, settab] = useState(props.tab);
    const { width } = windim();
    const [bldName, setbldName] = useState('');
    const [researchName, setresearchName] = useState('');
    const [popup, setPopup] = useState(false);
    const [shipName, setshipName] = useState(''); 
    const [bldduration, setBldDuration] = useState(new Date());
    const [resduration, setResDuration] = useState(new Date());
    const [shpduration, setShpDuration] = useState(new Date());
    const [harvestduration, setharvestduration] = useState(new Date());
    const [ShowHarvestButton, setShowHarvestButton] = useState(false); 
    const [planetFleets, setPlanetFleets] = useState([]); 
    const planet = useSelector(state => state.planetReducer.Planet);
    const BuildingQueList = useSelector(state => state.planetReducer.buildingQue)
    const ResearchQueList = useSelector(state => state.planetReducer.researchQue)
    const ShipQueList = useSelector(state => state.planetReducer.shipQue)
    const PlanetStats = useSelector(state => state.planetReducer.planetStats ?? {energy: 0, energyCost: 1, food: 0, infrastructure: 0, mining: 0, populationMax: 0, research: 0} )
    const UserID = useSelector(state => state.user.UserID);
    const userFleets = useSelector(state => state.shipReducer.UserFleets);
    const ShipDesigns = useSelector(state => state.shipReducer.ShipDesigns);
    const PlanetList = useSelector(state => state.planetReducer.PlanetList);
    const [sectorFleets, setsectorFleets] = useState([]);
    const [arrivalFleets, setarrivalFleets] = useState([]);
    const [sectorPlanets, setsectorPlanets] = useState([]);
    const [selectedFleet, setselectedFleet] = useState();

    var LastUserFleets = new Date()

    useEffect(() => {
        settab(props.tab);
    }, [props.tab]);

    useEffect(() => {
        setshipName(props.shipName);
    }, [props.shipName]);

    useEffect(() => {
        setharvestduration(props.harvestduration);
    }, [props.harvestduration]);

    useEffect(() => {
        HarvestButtonDisplay();
    })

    useEffect(() => {
        setPlanetFleets(userFleets.filter(x => x.planetID == planet.planetID && x.status == 0))
        setsectorFleets(userFleets.filter(x => x.sector == planet.sector))
        setarrivalFleets(userFleets.filter(x => x.destination == planet.planetID && x.status == 1))
    }, [userFleets,planet])

    useEffect(() => {
        setsectorPlanets(PlanetList.filter(x => x.sector == planet.sector))
    },[PlanetList,planet])

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

    function HarvestButtonDisplay()
    {
        if (+harvestduration - +new Date()>0)
        {
            setShowHarvestButton(false)
        }
        else
            setShowHarvestButton(true)
    }

    function CancelBuilding(BId,PId)
    {
        alert(BId + ":" + PId)
    }

    function CancelResearch(BId,PId)
    {
        alert(BId + ":" + PId)
    }

    function CancelShip(BId,PId)
    {
        alert(BId + ":" + PId)
    }

    function RemoveBuilding(item)
    {
        props.setbldName('');
        props.BuildingQue();
    }

    function RemoveResearch(item)
    {
        props.setresearchName('');
        props.BuildingQue();
    }

    function RemoveShip(item)
    {
        props.setshipName(''); 
        props.BuildingQue();    
    }

    function FormatDate(CompleteDate)
    {
        var ts_hms = new Date(Date.parse(CompleteDate));
        return("0" + (ts_hms.getMonth() + 1)).slice(-2) + '-' + 
        ("0" + (ts_hms.getDate())).slice(-2) + ' ' +
        ("0" + ts_hms.getHours()).slice(-2) + ':' +
        ("0" + ts_hms.getMinutes()).slice(-2) + ':' +
        ("0" + ts_hms.getSeconds()).slice(-2);

        // return ts_hms.getFullYear() + '-' + 
        // ("0" + (ts_hms.getMonth() + 1)).slice(-2) + '-' + 
        // ("0" + (ts_hms.getDate())).slice(-2) + ' ' +
        // ("0" + ts_hms.getHours()).slice(-2) + ':' +
        // ("0" + ts_hms.getMinutes()).slice(-2) + ':' +
        // ("0" + ts_hms.getSeconds()).slice(-2);
    }

    function FleetArrived(fleetID)
    {
        if (LastUserFleets.getTime() + 1000 < new Date())
        {
            LastUserFleets = new Date()
            Common.GetFleets(dispatch, UserID)
        }
    }

    function ShipInfo(fleet)
    {
        setselectedFleet(fleet)
        setPopup(true)
    }

    function HideInfo()
    {
        setPopup(false)
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
                                <Planet planetType={planet.planetType} radius={.3} isDetail={true} isVisible={sectorPlanets.length > 0 || sectorFleets.length > 0 } />
                                <Lights />
                                <Environment />
                            </Suspense> 
                        </Canvas>
                    </div>
                    <div style={{width:"60%", display:"inline-block", verticalAlign:"top"}}>
                        <div style={{padding:"5px",display:tab == 1 || tab == 2 || tab == 5? "block" : "none"}} ><BuildTimer timeUp={RemoveBuilding} Date={bldduration} buildingName={bldName} /> </div>
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
                                        {index>=0 &&
                                        <div style={{width:"95%", paddingBottom: "2px" }}>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "30%"}}>                                       
                                                    {building.buildingName}                                          
                                            </div>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "60%"}}>
                                                    {FormatDate(building.completetionDate)}                                       
                                            </div> 
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"red", cursor:"pointer" }}  
                                                onClick={() => CancelBuilding(building.buildingID,building.planetID)}>
                                                    {width>450 ? 'Cancel' : 'C'}                                       
                                            </div>
                                        </div>
                                        }                                                              
                                    </div>    
                                    ); 
                                })
                            }                    
                        </div>

                        <div style={{padding:"5px",display:tab == 1 || tab == 3 || tab == 5? "block" : "none"}}><ResearchTimer timeUp={RemoveResearch} Date={resduration} buildingName={researchName} /></div>
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
                                        {index>=0 &&
                                        <div style={{width:"95%", paddingBottom: "2px" }}>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "30%"}}>                                       
                                                    {research.techName}                                          
                                            </div>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "60%"}}>
                                                    {FormatDate(research.completetionDate)}                                       
                                            </div> 
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"red", cursor:"pointer"}}
                                                onClick={() => CancelResearch(research.buildingID,research.planetID)}>
                                                    {width>450 ? 'Cancel' : 'C'}                                       
                                            </div>
                                        </div>
                                        }                                                              
                                    </div>    
                                    ); 
                                })
                            }
                        </div>

                        <div style={{padding:"5px",display:tab == 1 || tab == 4 || tab == 5? "block" : "none"}}><ShipTimer timeUp={RemoveShip} Date={shpduration} buildingName={shipName} /></div>                    
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
                                        {index>=0 &&
                                        <div style={{width:"95%", paddingBottom: "2px" }}>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "30%"}}>                                       
                                                    {ship.shipName}                                          
                                            </div>
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "60%"}}>
                                                    {FormatDate(ship.completetionDate)}                                       
                                            </div> 
                                            <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"red", cursor:"pointer"}}
                                                onClick={() => CancelShip(ship.buildingID,ship.planetID)}>
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
                {planet.owner == UserID &&
                <div className={width>450?"harvesttimer":"harvesttimerSmall"}>
                    <div style={{padding:"5px",display:ShowHarvestButton? "block" : "none", color:"gold"}}  onClick={() => props.UpdatePlanetHarvest(
                        PlanetStats.populationMax-planet.population                         
                        ,
                        PlanetStats.militaryMax-planet.military
                        , 
                        (Math.round(
                            (PlanetStats.infrastructureMetal*PlanetStats.mining)                                                                       
                            *100)/100)
                        )
                        } >Harvest
                    </div>                    
                    <div style={{padding:"5px",display:!ShowHarvestButton? "block" : "none"}}><HarvestTimer timeUp={HarvestButtonDisplay} Date={harvestduration} buildingName="" /></div>                    
                </div> 
                }              
                <div style={{display:tab == 1? "block" : "none" }}>
                    {planet.owner != UserID && 
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
                                Type 
                            </div>
                            <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                                {sectorPlanets.length > 0 || sectorFleets.length > 0 ? planet.typeName : 'unknown'}
                            </div> 
                        </div>                                   
                    </div>
                    }
                    {planet.owner == UserID && PlanetStats.mining &&
                    <div>
                        <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                            <div className="planetDetailStats">
                                <div>
                                    <img className="planetDetailImg" src={imgMetal} alt="Metals" title="Metals" />
                                    {width>450 && 'Metals'}
                                </div>
                                <div className="planetDetailData">
                                    {PlanetStats.mining ?? 'NA'}
                                </div>
                            </div>
                            <div className="planetDetailStats">
                                <div>
                                    <img className="planetDetailImg" src={imgResearch} alt="Research" title="Research" />
                                    {width>450 && 'Research'}
                                </div>
                                <div className="planetDetailData">
                                    {PlanetStats.research ?? 'NA'}
                                </div>
                            </div>
                            <div className="planetDetailStats">
                                <div>
                                    <img className="planetDetailImg" src={imgFood} alt="Food" title="Food" />
                                    {width>450 && 'Food'}
                                </div>
                                <div className="planetDetailData">
                                    {PlanetStats.food ?? 'NA'}
                                </div>
                            </div>                                        
                            <div className="planetDetailStats">
                                <div>
                                    <img className="planetDetailImg" src={imgEnergy} alt="Energy Remaining" title="Energy Remaining" />
                                    {width>450 && 'Energy'}
                                </div>
                                <div className="planetDetailData">
                                    {(PlanetStats.energyPer * 100)+'%' ?? 'NA'}
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
                                    {planet.population > -1 ? planet.population + '/' + PlanetStats.populationMax : 'NA'}
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
                                    {PlanetStats.infrastructure}
                                </div>
                            </div>  
                            <div className="planetDetailStats">
                                <div>
                                    <img className="planetDetailImg" src={imgProdMetals} alt="Material Production" title="Material Production" />
                                    {width>500 && 'Production'}
                                </div>
                                <div className="planetDetailData">
                                    {(Math.round(
                                        (PlanetStats.infrastructureMetal*PlanetStats.mining)                                                                       
                                        *100)/100) ?? 'NA'}
                                </div>
                            </div> 
                        </div> 
                        <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                            <div className="planetDetailStats">
                                <div>
                                    <img className="planetDetailImg" src={imgMilitary} alt="Military" title="Military" />
                                    {width>500 && 'Military'}
                                </div>
                                <div className="planetDetailData">
                                    {planet.military + "/" + PlanetStats.militaryMax ?? 'NA'}
                                </div>
                            </div>
                            <div className="planetDetailStats">
                                <div>
                                    <img className="planetDetailImg" src={imgTradeRoutes} alt="Trade Routes" title="Trade Routes" />
                                    {width>500 && 'Trade Routes'}
                                </div>
                                <div className="planetDetailData">
                                    {PlanetStats.tradeRoutes ?? 'NA'}
                                </div>
                            </div>
                        </div>
                    </div>
                    } 
                </div>
                <div style={{display:tab == 1 ? "block" : "none" }}>
                    {planetFleets.length > 0 &&
                        planetFleets.map((fleet, index) => { 
                        return(
                            <div key={"g" + index} style={{width:"100%", textAlign:"center", paddingTop:5 }}>
                                {index==0 &&
                                <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%", borderBottom: '1px solid red'}}>
                                    <div style={{ width: "45%", display:"inline-block"}}>
                                        Name
                                    </div>   
                                    <div style={{ width: "45%", display:"inline-block"}}>
                                        Material Cost
                                    </div>  
                                    <div style={{display:"inline-block", width: "10%"}}>                                                                                
                                    </div>                                     
                                </div>
                                }
                                {index>=0 &&
                                <div style={{flex:1 ,width:"95%", paddingBottom: "2px" }}>
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "45%", textAlign:"center"}}>                                       
                                            {fleet.fleetName}                                          
                                    </div>
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "45%", textAlign:"center"}}>
                                            {fleet.ships.reduce((sum, ship) => {
                                                return sum + ShipDesigns.find( x => x.shipDesignID==ship.designID).materialCost * ship.effectiveNumber},0)}                                       
                                    </div> 
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"green", cursor:"pointer"}}
                                        onClick={() => ShipInfo(fleet)}>
                                            {width>450 ? 'Details' : 'D'}                                       
                                    </div>
                                </div>
                                }                                                              
                            </div>    
                            ); 
                        })
                    }
                </div>

                <div style={{display:tab == 1 ? "block" : "none" }}>
                    {arrivalFleets.length > 0 &&
                        arrivalFleets.map((fleet, index) => { 
                        return(
                            <div key={"g" + index} style={{width:"100%", textAlign:"center", paddingTop:5 }}>
                                {planetFleets.length == 0 && index==0 &&
                                <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%", borderBottom: '1px solid red'}}>
                                    <div style={{ width: "45%", display:"inline-block"}}>
                                        Name
                                    </div>   
                                    <div style={{ width: "45%", display:"inline-block"}}>
                                        Material Cost
                                    </div>  
                                    <div style={{display:"inline-block", width: "10%"}}>                                                                                
                                    </div>                                     
                                </div>
                                }
                                <div style={{flex:1 ,width:"95%", paddingBottom: "2px" }}>
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "45%", textAlign:"center"}}>                                       
                                        <ArrivalTimer key={index} timeUp={() => FleetArrived(fleet.fleetID)} Date={new Date(Date.parse(fleet.arrival))} buildingName={fleet.fleetName}/>                                         
                                    </div>
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "45%", textAlign:"center"}}>
                                        {fleet.ships.reduce((sum, ship) => {
                                            return sum + ShipDesigns.find( x => x.shipDesignID==ship.designID).materialCost * ship.effectiveNumber},0)}                                  
                                    </div> 
                                    <div style={{fontSize: "10px", display:"inline-block",  width: "10%", backgroundColor:"green", cursor:"pointer"}}
                                        onClick={() => ShipInfo(fleet)}>
                                            {width>450 ? 'Details' : 'D'}                                       
                                    </div>
                                </div>                                                                                              
                            </div>    
                            ); 
                        })
                    }
                </div>  
            </div>

            <div className="popupShips" style={{display:popup ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
            onClick={() => HideInfo()}>

                {selectedFleet &&
                    selectedFleet.ships.map((ship, index) => { 
                    return(
                        <div key={"g" + index} style={{width:"100%", textAlign:"center", paddingTop:5 }}>
                            {selectedFleet && index==0 &&
                            <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%", borderBottom: '1px solid red'}}>
                                <div style={{ width: "40%", display:"inline-block"}}>
                                    Name
                                </div>  
                                <div style={{ width: "25%", display:"inline-block"}}>
                                    #
                                </div> 
                                <div style={{ width: "15%", display:"inline-block"}}>
                                    Move
                                </div>  
                                <div style={{display:"inline-block", width: "20%"}}>
                                    Colony                                                                                
                                </div>                                     
                            </div>
                            }
                            <div style={{flex:1 ,width:"95%", paddingBottom: "2px" }}>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "40%", textAlign:"center"}}>                                       
                                    {ship.designName}                                        
                                </div>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "25%", textAlign:"center"}}>
                                    {ship.effectiveNumber + '/' + ship.actualNumber}                                  
                                </div> 
                                <div style={{fontSize: "10px", display:"inline-block",  width: "15%", textAlign:"center"}}>
                                    {ship.movement}                                  
                                </div> 
                                <div style={{fontSize: "10px", display:"inline-block",  width: "15%", textAlign:"center"}}>
                                    {ship.colony}                                      
                                </div>
                            </div>                                                                                            
                        </div>    
                        ); 
                    })
                }
                <div style={{fontSize: "10px", width: "100%", cursor:"pointer", paddingTop:25}}
                        onClick={() => HideInfo()}>
                            CLOSE                                      
                </div>  
            </div> 
        </div>    
    )};
    
  export default PlanetDetailDisplay