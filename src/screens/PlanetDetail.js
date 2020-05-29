import React, {useEffect, useState} from 'react';
import PlanetDetailDisplay from "../components/Planet/PlanetDetailDisplay";
import FocusDisplay from "../components/Planet/FocusDisplay";
import BuildDisplay from "../components/Planet/BuildDisplay";
import ShipDisplay from "../components/Planet/ShipDisplay";
import ResearchDisplay from "../components/Planet/ResearchDisplay";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';
import windim from "../components/WindowDimensions";
import imgResearch from '../assets/Research.png'
import imgBuildings from '../assets/Buildings.png'
import imgShips from '../assets/Ships.png'
import imgWorld from '../assets/World.png'
import "../styles/stylesheet.css"

function PlanetDetail(props) {
    const StatePT = useSelector(state => state.planetTypeReducer.textureNo);
    const UserID = useSelector(state => state.user.UserID);
    const BuildingQueList = useSelector(state => state.planetReducer.buildingQue)
    const ResearchQueList = useSelector(state => state.planetReducer.researchQue)
    const ShipQueList = useSelector(state => state.planetReducer.shipQue)
    const PlanetStats = useSelector(state => state.planetReducer.planetStats)
    const BuildingStats = useSelector(state => state.planetReducer.BuildingStats)
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes)
    const PlanetPop = useSelector(state => state.planetReducer.PlanetPop)
    const ResearchStats = useSelector(state => state.planetReducer.ResearchStats);
    const planet = useSelector(state => state.planetReducer.Planet);

    const dispatch = useDispatch();
    var { planetType, planetID } =  props.match.params;
    const [tab, setTab] = useState(1);
    const [PlanetOwner, setPlanetOwner] = useState(); 
    const [Barren, setBarren] = useState(true); 
    const [RunBldQueList, setRunBldQueList] = useState(true); 
    const [PTid, setPTid] = useState(planetType ?? StatePT ?? 2);
    const { width } = windim();
    const [bldduration, setBldDuration] = useState(new Date());
    const [resduration, setResDuration] = useState(new Date());
    const [shpduration, setShpDuration] = useState(new Date());
    const [harvestduration, setharvestduration] = useState(new Date());
    const [BldQueID, setBldQueID] = useState(0);
    const [ResQueID, setResQueID] = useState(0);
    const [ShipQueID, setShipQueID] = useState(0);
    const [bldName, setbldName] = useState('');
    const [researchName, setresearchName] = useState('');
    const [shipName, setshipName] = useState(''); 

    
    useEffect(() => {
        if (planetID )
        {
            setbldName('');
            setBldDuration(new Date());
            setBldQueID(0);
            setresearchName('');
            setResDuration(new Date());
            setResQueID(0);
            setshipName('');
            setShpDuration(new Date());
            setShipQueID(0);
            GetPlanet(planetID);
        }
    },[planetID]);

    useEffect(() => {
        if (planet.planetID > 0 && RunBldQueList && planet.owner == UserID)
        {  
            axios.get('http://apicall.starshipfleets.com/Planet/GetBuildingQueue/' + planetID )
            .then((response) => {
                setRunBldQueList(false);
                dispatch({type: ActionTypes.SET_PLANETBUILDQUE,payload:response.data.buildingQue});
                dispatch({type: ActionTypes.SET_PLANETSHIPQUE,payload:response.data.shipQue});
                dispatch({type: ActionTypes.SET_PLANETRESEARCHQUE,payload:response.data.researchQue});
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[planet, RunBldQueList]); 

    useEffect(() => {
        if (planet.planetID > 0 )
        {                       
            axios.get('http://apicall.starshipfleets.com/Planet/GetBuildingTypes/' + planetID)
            .then((response) => {
                dispatch({type: ActionTypes.SET_BUILDINGSTATS,payload:response.data});        
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[BuildingQueList]);

    useEffect(() => {
        if (planet.planetID > 0 )
        {            
            axios.get('http://apicall.starshipfleets.com/Research/GetResearchTypes/' + UserID)
            .then((response) => {
                dispatch({type: ActionTypes.SET_RESEARCHTYPES,payload:response.data});                
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[ResearchQueList]);

     useEffect(() => {
        if (planet.planetID > 0)
        {
            var TechStats=
            {
                armor: 0,
                bodyArmor: 0,
                energy: 0,
                food: 0,
                infrastructure: 0,
                laser: 0,
                military: 0,
                mining: 0,
                missile: 0,
                plasma: 0,
                populationMax: 0,
                research: 0,
                shields: 0,
                weapons: 0
            };
            ResearchTypes.map((res, index) =>
            {
                TechStats.armor=TechStats.armor+(res.armor*res.bldLevel);
                TechStats.bodyArmor=TechStats.bodyArmor+(res.bodyArmor*res.bldLevel);
                TechStats.energy=TechStats.energy+(res.energy*res.bldLevel);
                TechStats.food=TechStats.food+(res.food*res.bldLevel);
                TechStats.infrastructure=TechStats.infrastructure+(res.infrastructure*res.bldLevel);
                TechStats.laser=TechStats.laser+(res.laser*res.bldLevel);
                TechStats.military=TechStats.military+(res.military*res.bldLevel);
                TechStats.mining=TechStats.mining+(res.mining*res.bldLevel);
                TechStats.missile=TechStats.missile+(res.missile*res.bldLevel);
                TechStats.plasma=TechStats.plasma+(res.plasma*res.bldLevel);
                TechStats.populationMax=TechStats.populationMax+(res.populationMax*res.bldLevel);
                TechStats.research=TechStats.research+(res.research*res.bldLevel);
                TechStats.shields=TechStats.shields+(res.shields*res.bldLevel);
                TechStats.weapons=TechStats.weapons+(res.weapons*res.bldLevel);
            })
            dispatch({type: ActionTypes.SET_RESEARCHSTATS,payload:TechStats});            
        }
    },[ResearchTypes]);

    useEffect(() => {
        if (planet.planetID > 0)
        {  
            BuildingQueDisplay();
            var planetStats=
            {
                energy: 0,
                energyCost: 0,
                energyPer: 0,
                food: 0,
                infrastructure: 0,
                infrastructureMetal: 0,
                militaryMax: 0,
                mining: 0,
                populationMax: 0,
                research: 0,
                tradeRoutes: 0
            };
            BuildingStats.map((BLG, index) =>
            {
                planetStats.energy=planetStats.energy+(BLG.energy*BLG.bldLevel);
                planetStats.energyCost=planetStats.energyCost+(BLG.energyCost*BLG.bldLevel);
                planetStats.food=planetStats.food+(BLG.food*BLG.bldLevel);
                planetStats.infrastructure=planetStats.infrastructure+(BLG.infrastructure*BLG.bldLevel);
                planetStats.militaryMax=planetStats.militaryMax+(BLG.military*BLG.bldLevel);
                planetStats.mining=planetStats.mining+(BLG.mining*BLG.bldLevel);
                planetStats.populationMax=planetStats.populationMax+(BLG.populationMax*BLG.bldLevel);
                planetStats.research=planetStats.research+(BLG.research*BLG.bldLevel);
                planetStats.tradeRoutes=planetStats.tradeRoutes+(BLG.tradeRoutes*BLG.bldLevel);
            })  

            planetStats.energy=Math.round((planetStats.energy+(planetStats.energy*ResearchStats.energy))*100)/100;
            planetStats.energy=Math.round((planetStats.energy+(planetStats.energy*(PlanetPop.energyPop/100)))*100)/100;
            planetStats.energyPer = planetStats.energy/planetStats.energyCost>1?1:planetStats.energy/planetStats.energyCost;  

            planetStats.food=Math.round(((((planetStats.food)+(planetStats.food*ResearchStats.food))*planetStats.energyPer)+(planetStats.food*(PlanetPop.foodPop/100)))*100)/100;

            planetStats.infrastructureMetal=Math.round(((((planetStats.infrastructure)+(planetStats.infrastructure*ResearchStats.infrastructure))*planetStats.energyPer))*100)/100;
            planetStats.infrastructure=Math.round(((((planetStats.infrastructure)+(planetStats.infrastructure*ResearchStats.infrastructure))*planetStats.energyPer)
                +(planetStats.infrastructure*(PlanetPop.infrastructurePop/100)))*100)/100;
            planetStats.mining=Math.round(((((planetStats.mining)+(planetStats.mining*ResearchStats.mining))*planetStats.energyPer)+(planetStats.mining*(PlanetPop.metalsPop/100)))*100)/100;
            planetStats.research=Math.round(((((planetStats.research)+(planetStats.research*ResearchStats.research))*planetStats.energyPer)+(planetStats.research*(PlanetPop.researchPop/100)))*100)/100;
            
            dispatch({type: ActionTypes.SET_PLANETSTATS,payload:planetStats});
        }
    },[ResearchStats, PlanetPop]); 
  
    function BuildingQueDisplay()
    {        
        if (BuildingQueList.length > 0 && BuildingStats.length > 0)
        {          
            if (BuildingQueList[0].buildQueID != BldQueID && BuildingQueList[0].planetID == planetID)
            {
                const name = BuildingStats.filter(x => x.buildingID == BuildingQueList[0].buildingID)[0].name;
                setbldName(name);
                setBldDuration(new Date(Date.parse(BuildingQueList[0].completetionDate)));
                setBldQueID(BuildingQueList[0].buildQueID);
            }
        }
        if (ResearchQueList.length > 0 && ResearchTypes.length > 0 )
        {           
            if (ResearchQueList[0].buildQueID != ResQueID && ResearchQueList[0].planetID == planetID)
            {
                const name = ResearchTypes.filter(x => x.technologyID == ResearchQueList[0].buildingID)[0].name;
                setresearchName(name);
                setResDuration(new Date(Date.parse(ResearchQueList[0].completetionDate)));
                setResQueID(ResearchQueList[0].buildQueID);
            }
        }
        if (ShipQueList.length > 0 && BuildingStats.length > 0)
        {
            if (ShipQueList[0].buildQueID != ShipQueID && ShipQueList[0].planetID == planetID)
            {
                const name = ShipQueList.filter(x => x.technologyID == ShipQueList[0].buildingID)[0].name;
                setshipName(name);
                setShpDuration(new Date(Date.parse(ShipQueList[0].completetionDate)));
                setShipQueID(ShipQueList[0].buildQueID);
            }
        }
    }

    function GetPlanet()
    {            
        axios.get('http://apicall.starshipfleets.com/Planet/GetPlanet/' + planetID + '/' + UserID)
        .then((response) => {
            UpdatePlanet(response.data);
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function AddBuildingQue(prod, buildingID, mats)
    {            
        axios.post('http://apicall.starshipfleets.com/Planet/AddBuildingQueue',
        {
            PlanetID: planetID,
            UserID: UserID,
            BuildingID: buildingID,
            Seconds: prod,
            MaterialCost: mats
        })
        .then((response) => {            
            setRunBldQueList(true);              
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function AddResearchQue(prod, buildingID, mats)
    {            
        axios.post('http://apicall.starshipfleets.com/Research/AddResearchQueue',
        {
            PlanetID: planetID,
            UserID: UserID,
            BuildingID: buildingID,
            Seconds: prod,
            MaterialCost: mats
        })
        .then((response) => {            
            setRunBldQueList(true);            
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function UpdatePlanetHarvest(pop, mil, mats)
    {  
        console.log(pop + ":" + mil + ":" + mats)
        pop = pop=0?0:pop>1?1:-1
        mil = mil=0?0:mil>1?1:-1
               
        axios.post('http://apicall.starshipfleets.com/Planet/UpdatePlanetHarvest',
        {
            PlanetID: planetID,
            Owner: UserID,
            Population: pop,
            Materials: mats,
            Military: mil
        })
        .then((response) => {  
            UpdatePlanet(response.data);
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function UpdatePlanet(data)
    {
        dispatch({type: ActionTypes.SET_PLANET,payload:data});
        setRunBldQueList(true);
        setPlanetOwner(data.owner);
        setPTid(data.planetType);
        setBarren(data.barren); 
        if (harvestduration != data.lastHarvest)
            setharvestduration(new Date(Date.parse(data.lastHarvest)));
        dispatch({type: ActionTypes.SET_PLANETPOP,payload:
        {
            metalsPop: data.metalsPop
            ,researchPop: data.researchPop
            ,foodPop: data.foodPop
            ,energyPop: data.energyPop
            ,infrastructurePop: data.infrastructurePop
            ,infrastructurePopMetal: data.infrastructurePopMetal
        }
        });
    }

    function BuildingStart(prod, buildingID, mats){
        console.log(prod + ":" + mats)
        AddBuildingQue(prod, buildingID, mats);
    }

    function ResearchStart(prod, buildingID, mats){
        AddResearchQue(prod, buildingID, mats);
        console.log(prod + ":" + buildingID + ":" +mats)
    }

    function ShipStart(prod, buildingID, mats){
        //AddBuildingQue(prod, name, buildingID, mats);
    }

    function BuildingQue()
    {
        setRunBldQueList(true);
    } 

    function BacktoSystem(){
        var link = "/SystemView/" + (planet.galaxy??1) + "/" + (planet.sector??'11') + "/" + (planet.system??1);
        window.location.assign(link);
    }

    function ChangeTab(t)
    {
        setTab(t);
    }

    function ChangeName()
    {
        if (PlanetOwner == UserID)
        {
            alert(planet.planetName);
        }
    }

    function GetCon()
    {
        var con=(PlanetStats.infrastructure+(PlanetStats.infrastructure*(PlanetPop.infrastructurePop/100)))
            *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
        return(Math.round(
                (con+(con*ResearchStats.infrastructure))
                *100)/100);
    }

    function GetResearch()
    {
        return(Math.round(
                (PlanetStats.research+(PlanetStats.research*(PlanetPop.researchPop/100)))
                *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                *100)/100);
    }

    function Colonize()
    {
        axios.post('http://apicall.starshipfleets.com/Planet/ColonizePlanet', 
        { 
            Owner: UserID,
            PlanetID: planet.planetID,
            Population: 3,
            Materials: 25
        })
        .then((response) => {            
            dispatch({type: ActionTypes.SET_PLANET,payload:response.data});
            setPlanetOwner(response.data.owner); 
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }
    
    return (
        <div style={{height:"100%", width:"100%", textAlign: "center", color: "white"}} >
            <div style={{ height:"90%", width:"100%", verticalAlign:"top", backgroundColor:'black',
                padding:"10px", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>
                <div style={{padding: "5px"}}>
                    <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "#228B22", cursor: "pointer"}} onClick={() => BacktoSystem()}>System</div>
                    <div style={{width:"100px", padding: "5px", fontSize: "12px", display: "inline-block", cursor: "pointer", title: "Back to System"}} onClick={ChangeName}>
                        {planet.planetName??'NA'}
                    </div>
                    {PlanetOwner == UserID &&
                        <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "mediumblue", cursor: "pointer"}} 
                        onClick={() => ChangeTab(5)}>Focus</div>
                    }
                    {PlanetOwner == 0 && !Barren &&
                        <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "mediumblue", cursor: "pointer"}} 
                        onClick={() => Colonize()}>Colonize</div>
                    }
                </div>
                {PlanetOwner == UserID &&
                    <div className={tab==1?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(1)}>
                        <img className="planetDetailImg" src={imgWorld} alt="Planet" title="Planet" />
                        {width>500 ? 'Planet' : ''}
                    </div>
                }
                {PlanetOwner == UserID &&
                    <div className={tab==2?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(2)}>
                        <img className="planetDetailImg" src={imgBuildings} alt="Buildings" title="Buildings" />                    
                        {width>500 ? 'Buildings' : ''}
                    </div>
                }
                {PlanetOwner == UserID &&
                    <div className={tab==3?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(3)}>
                        <img className="planetDetailImg" src={imgResearch} alt="Research" title="Research" />
                        {width>500 ? 'Research' : ''}
                    </div>
                }
                {PlanetOwner == UserID &&
                    <div className={tab==4?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(4)}>
                        <img className="planetDetailImg" src={imgShips} alt="Ships" title="Ships" />
                        {width>500 ? 'Ships' : ''}
                    </div>
                }
                <div style={{width:"100%"}}>
                    <div>
                        <PlanetDetailDisplay bldName={bldName} bldduration={bldduration} researchName={researchName} resduration={resduration} 
                        shpduration={shpduration} shipName={shipName} setshipName={setshipName} setresearchName={setresearchName} setbldName={setbldName} 
                        tab={tab} BuildingQue={BuildingQue} UpdatePlanetHarvest={UpdatePlanetHarvest} harvestduration={harvestduration} GetCon={GetCon}/>
                    </div>
                    {PlanetOwner == UserID &&
                    <div>
                        <div style={{display:tab==5?'block':'none'}}>    
                            <FocusDisplay setTab={setTab} bldName={bldName} researchName={researchName} shipName={shipName} />
                        </div>
                        <div style={{display:tab==2?'block':'none'}}>
                            <BuildDisplay BuildingStart={BuildingStart}  GetCon={GetCon} />
                        </div>
                        <div style={{display:tab==3?'block':'none'}}>
                            <ResearchDisplay ResearchStart={ResearchStart} GetResearch={GetResearch}/>
                        </div>
                        <div style={{display:tab==4?'block':'none'}}>
                            <ShipDisplay planet={planet} PlanetStats={PlanetStats} PTid={PTid} BuildingStats={BuildingStats} UserID={UserID} PlanetID={planetID}
                            setShpDuration={setShpDuration} setshipName={setshipName}/>
                        </div>
                    </div>
                    }
                </div>                 
            </div>            
        </div>
    );
  }
  
  export default PlanetDetail;
  