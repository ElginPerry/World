import React, {useEffect, useState} from 'react';
import PlanetDetailDisplay from "../components/Planet/PlanetDetailDisplay";
import FocusDisplay from "../components/Planet/FocusDisplay";
import BuildDisplay from "../components/Planet/BuildDisplay";
import ShipDisplay from "../components/Planet/ShipDisplay";
import ResearchDisplay from "../components/Planet/ResearchDisplay";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import * as Common from "../components/Common"
import * as Calcs from '../components/Calcs'
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
    const ShipDesigns = useSelector(state => state.shipReducer.ShipDesigns)
    const PlanetPop = useSelector(state => state.planetReducer.PlanetPop)
    const ResearchStats = useSelector(state => state.planetReducer.ResearchStats);
    const planet = useSelector(state => state.planetReducer.Planet);
    const UserFleets = useSelector(state => state.shipReducer.UserFleets);
    const PlanetList = useSelector(state => state.planetReducer.PlanetList);
    const hulls = useSelector(state => state.shipReducer.ShipHulls);
    const Pods = useSelector(state => state.shipReducer.ShipPods);

    const dispatch = useDispatch();
    var { planetType, planetID } =  props.match.params;
    const [tab, setTab] = useState(1);
    const [Barren, setBarren] = useState(true); 
    const [RunBldQueList, setRunBldQueList] = useState(true); 
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
    const [moveTo, setmoveTo] = useState(false);    
    const [sectorFleets, setsectorFleets] = useState([]);
    const [sectorPlanets, setsectorPlanets] = useState([]);   
    const [colonyShip, setcolonyShip] = useState(false);  

    
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
        if (hulls.length==0)
            Common.GetShipHulls(dispatch);    
    },[planetID]);

    useEffect(() => {   
        if (Pods.length==0)             
            Common.GetShipPods(dispatch);
    },[planetID]);

    useEffect(() => {
        Common.GetUserDesigns(dispatch, UserID)
    },[planet]); 

    useEffect(() => {
        Common.GetFleets(dispatch,UserID)
        Common.GetPlanetFleets(dispatch,UserID,planet.planetID)
    },[planet, ShipQueList]); 
    
    useEffect(() => {
        setsectorFleets(UserFleets.filter(x => x.sector == planet.sector))
        var colony = 0
        UserFleets.filter(x => x.planetID == planet.planetID && x.status == 0).map((fleet,index)=> {
            if (Math.max(...fleet.ships.map(o => o.colony)) >colony)
            {
                colony = Math.max(...fleet.ships.map(o => o.colony));
            }            
        })
        setcolonyShip(colony>0)
    },[UserFleets], [planet])

    useEffect(() => {
        setsectorPlanets(PlanetList.filter(x => x.sector == planet.sector))
    },[PlanetList], [planet])

    useEffect(() => {
        if (planet.planetID > 0 && RunBldQueList && planet.owner == UserID)
        {  
            axios.get('http://apicall.starshipfleets.com/Planet/GetBuildingQueue/' + planetID + "/" + UserID )
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
            Common.GetBuildingStats(dispatch,planetID)
        }
    },[BuildingQueList]);

    useEffect(() => {
        if (planet.planetID > 0 )
        {            
            Common.GetResearchTypes(dispatch,UserID)
        }
    },[ResearchQueList]);

     useEffect(() => {
        if (planet.planetID > 0)
        {
            Calcs.GetResearchStats(dispatch,ResearchTypes);           
        }
    },[ResearchTypes]);

    useEffect(() => {
        if (planet.planetID > 0)
        {  
            BuildingQueDisplay();
            Calcs.GetPlanetStats(dispatch, BuildingStats, PlanetPop, ResearchStats);
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
                const name = ShipDesigns.filter(x => x.shipDesignID == ShipQueList[0].buildingID)[0].designName;
                setshipName(name);
                setShpDuration(new Date(Date.parse(ShipQueList[0].completetionDate)));
                setShipQueID(ShipQueList[0].buildQueID);
            }
        }
    }

    function BuildingStart(prod, buildingID, mats){       
        AddBuildingQue(prod, buildingID, mats);
    }

    function ResearchStart(prod, buildingID, mats){
        AddResearchQue(prod, buildingID, mats);
    }

    function ShipStart(prod, buildingID, mats, movement){
        console.log("Movement :" + movement)
        AddShipQue(prod, buildingID, mats, movement);
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
            UpdatePlanet(response.data);             
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
            UpdatePlanet(response.data);         
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function AddShipQue(prod, buildingID, mats, movement)
    {         
        console.log("Movement :" + movement)   
        axios.post('http://apicall.starshipfleets.com/Ships/AddShipQueue',
        {
            PlanetID: planetID,
            UserID: UserID,
            BuildingID: buildingID,
            Seconds: prod,
            MaterialCost: mats,
            Movement: movement
        })
        .then((response) => {            
            UpdatePlanet(response.data);            
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function UpdatePlanetHarvest(pop, mil, mats)
    {  
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

    function UpdatePlanet(data)
    {
        dispatch({type: ActionTypes.SET_PLANET,payload:data});
        setRunBldQueList(true);
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

    function BuildingQue()
    {
        setRunBldQueList(true);
    } 

    function BacktoSystem(){
        var link = "/SystemView/" + (planet.galaxy??1) + "/" + (planet.sector??'11') + "/" + (planet.system??1);
        window.location.assign(link);
    }

    function BacktoGalaxy(){
        var link = "/GalaxyView/" + (planet.galaxy??1);
        window.location.assign(link);
    }

    function ChangeTab(t)
    {
        setTab(t);
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
            UpdatePlanet(response.data)
            Common.GetPlanetList(dispatch, UserID)
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }
    
    function selectMoveTo()
    {
        setmoveTo(true)
    }

    function HideFleets()
    {
        setmoveTo(false)
    }

    function Distance(fleet)
    {
        var xdis = Math.pow(fleet.xSysPosition-planet.xSysPosition,2)
        var ydis = Math.pow(fleet.ySysPosition-planet.ySysPosition,2)
        return Math.round((Math.sqrt(xdis+ydis))*10)/10
    }

    function Movement(fleet)
    { 
        if (Calcs.FightersBays(fleet, ShipDesigns)>=0)
        {
            return Math.min(...fleet.ships.filter(x => x.hull >= 500).map(o => o.movement)); 
        } 
        else
        {
            return Math.min(...fleet.ships.map(o => o.movement)); 
        }
               
    }
    
    function SelectFleet(fleet)
    {
        Common.MoveFleet(dispatch,UserID, fleet.fleetID, planetID);
        setmoveTo(false)
    }

    function SelectPlanet(PlanetID)
    {
        var link = "/PlanetView/" + PlanetID;
        window.location.assign(link);
    }
    
    return (
        <div style={{height:"90%", width:"100%", textAlign: "center", color: "white"}} >
            <div style={{ height:"100%", width:"100%", verticalAlign:"top", backgroundColor:'black',
                padding:"10px", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>
                <div style={{padding: "5px"}}>
                    <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "mediumblue", cursor: "pointer"}} onClick={() => selectMoveTo()}>
                        Move To
                    </div>
                    <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "#228B22", cursor: "pointer"}} onClick={() => BacktoSystem()}>
                        {width>500 ? 'System' : 'S'}
                    </div>
                    <div style={{width:"130px", padding: "5px", fontSize: "12px", display: "inline-block", cursor: "pointer", title: "Back to System"}}>                        
                       
                        <select  style={{width:120}} onChange={(e) => SelectPlanet(e.target.value)} value={planet.planetID} >                                
                            {PlanetList.map((planet, index) => <option key={index} value={planet.planetID}>{planet.planetName}</option>)}
                        </select>
                    </div>
                    {planet.owner == UserID &&
                        <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "mediumblue", cursor: "pointer"}} 
                        onClick={() => ChangeTab(5)}>Focus</div>
                    }
                    {planet.owner == 0 && !Barren && colonyShip &&
                        <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "mediumblue", cursor: "pointer"}} 
                        onClick={() => Colonize()}>Colonize</div>
                    }
                    <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "#228B22", cursor: "pointer"}} onClick={() => BacktoGalaxy()}>
                        {width>500 ? 'Galaxy' : 'G'}
                    </div>
                </div>
                {planet.owner == UserID &&
                    <div className={tab==1?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(1)}>
                        <img className="planetDetailImg" src={imgWorld} alt="Planet" title="Planet" />
                        {width>500 ? 'Planet' : ''}
                    </div>
                }
                {planet.owner == UserID &&
                    <div className={tab==2?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(2)}>
                        <img className="planetDetailImg" src={imgBuildings} alt="Buildings" title="Buildings" />                    
                        {width>500 ? 'Buildings' : ''}
                    </div>
                }
                {planet.owner == UserID &&
                    <div className={tab==3?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(3)}>
                        <img className="planetDetailImg" src={imgResearch} alt="Research" title="Research" />
                        {width>500 ? 'Research' : ''}
                    </div>
                }
                {planet.owner == UserID &&
                    <div className={tab==4?"tab-button-Active":"tab-button-Inactive"} onClick={() => ChangeTab(4)}>
                        <img className="planetDetailImg" src={imgShips} alt="Ships" title="Ships" />
                        {width>500 ? 'Ships' : ''}
                    </div>
                }
                <div style={{width:"100%", height:"85%", overflow:"auto"}}>
                    <div>
                        <PlanetDetailDisplay bldName={bldName} bldduration={bldduration} researchName={researchName} resduration={resduration} 
                        shpduration={shpduration} shipName={shipName} setshipName={setshipName} setresearchName={setresearchName} setbldName={setbldName} 
                        tab={tab} BuildingQue={BuildingQue} UpdatePlanetHarvest={UpdatePlanetHarvest} harvestduration={harvestduration} GetCon={GetCon}/>
                    </div>
                    {planet.owner == UserID &&
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
                            <ShipDisplay ShipStart={ShipStart}  GetCon={GetCon} />
                        </div>
                    </div>
                    }
                </div>                 
            </div>

            <div className="popupShips" style={{display:moveTo ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', 
            overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}}>
                {UserFleets.length > 0 && ShipDesigns.length > 0 &&
                    UserFleets.filter(x => x.planetID != planetID && x.status == 0).map((fleet, index) => { 
                    return(
                        <div key={"g" + index} style={{width:"100%", textAlign:"center", paddingTop:5 }}>
                            {index==0 &&
                            <div style={{fontSize: "10px", paddingBottom: "3px", width:"95%", borderBottom: '1px solid red'}}>
                                <div style={{ width: "25%", display:"inline-block"}}>
                                    Name
                                </div>   
                                <div style={{ width: "20%", display:"inline-block"}}>
                                    Material Cost
                                </div>  
                                <div style={{ width: "20%", display:"inline-block"}}>
                                    Distance
                                </div>
                                <div style={{ width: "25%", display:"inline-block"}}>
                                    Time
                                </div>                                  
                                <div style={{display:"inline-block", width: "10%"}}>                                                                                
                                </div>                                     
                            </div>
                            }
                            {index>=0 &&
                            <div style={{flex:1 ,width:"95%", paddingBottom: "2px" }}>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "25%", textAlign:"center"}}>                                       
                                        {fleet.fleetName}                                          
                                </div>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "20%", textAlign:"center"}}>
                                        {fleet.ships.reduce((sum, ship) => {
                                                return sum + ShipDesigns.find( x => x.shipDesignID==ship.designID).materialCost * ship.effectiveNumber},0)}                                       
                                </div>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "20%", textAlign:"center"}}>
                                        {Distance(fleet)}                                       
                                </div>
                                <div style={{fontSize: "10px", display:"inline-block",  width: "25%", textAlign:"center"}}>
                                        {Movement(fleet)>0? Common.durDisplay(Math.round(Distance(fleet)/Movement(fleet))>=30?
                                        Math.round(Distance(fleet)/Movement(fleet))
                                        :30): 'NA'}                                       
                                </div>                                 
                                <div style={{fontSize: "10px", display:Movement(fleet)>0?"inline-block":"none",  width: "10%", backgroundColor:"green", cursor:"pointer"}}
                                    onClick={() => SelectFleet(fleet)}>
                                        {width>450 ? 'Select' : 'S'}                                       
                                </div>
                                <div style={{fontSize: "10px", display:Movement(fleet)>0?'none':"inline-block",  width: "10%", backgroundColor:"red"}}>
                                        NA                                      
                                </div>
                            </div>
                            }
                        </div>    
                        ); 
                    })
                } 
                <div>
                    <div style={{textAlign: "center", width:"100%", padding: "15px"}} onClick={() => HideFleets()}>
                        CLOSE
                    </div>
                </div> 
            </div>

        </div>
    );
  }
  
  export default PlanetDetail;
  