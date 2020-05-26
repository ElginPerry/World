import React, {useEffect, useState} from 'react';
import PlanetDetailDisplay from "../components/Planet/PlanetDetailDisplay";
import FocusDisplay from "../components/Planet/FocusDisplay";
import BuildDisplay from "../components/Planet/BuildDisplay";
import ShipDisplay from "../components/Planet/ShipDisplay";
import ResearchDisplay from "../components/Planet/ResearchDisplay";
import '../App.css';
import {useSelector, useDispatch, useStore} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';
import windim from "../components/WindowDimensions";
import throttle from 'lodash/throttle';
import imgResearch from '../assets/Research.png'
import imgBuildings from '../assets/Buildings.png'
import imgShips from '../assets/Ships.png'
import imgWorld from '../assets/World.png'
import "../styles/stylesheet.css"

function PlanetDetail(props) {
    const dispatch = useDispatch();
    var { planetType, planetID } =  props.match.params;
    const StatePT = useSelector(state => state.planetTypeReducer.textureNo);
    const UserID = useSelector(state => state.user.UserID);
    const store = useStore()
    const [tab, setTab] = useState(1);    
    const [planet, setPlanet] = useState({});
    const [PlanetOwner, setPlanetOwner] = useState(); 
    const [BuildingStats, setBuildingStats] = useState([]); 
    const [BuildingQueList, setBuildingQueList] = useState([]); 
    const [ResearchQueList, setResearchQueList] = useState([]); 
    const [ShipQueList, setShipQueList] = useState([]); 
    const [Barren, setBarren] = useState(true); 
    const [RunBldQueList, setRunBldQueList] = useState(true); 
    const [PTid, setPTid] = useState(planetType ?? StatePT ?? 2);
    const { width } = windim();
    const [PlanetStats, setPlanetStats] = useState({energy: 0, energyCost: 1, food: 0, infrastructure: 0, mining: 0, populationMax: 0, research: 0}); 
    const [PlanetPop, setPlanetPop] = useState({metalsPop:0, researchPop:0, foodPop:0, energyPop:0, infrastructurePop:0, infrastructureMetalPop:0})
    const [bldduration, setBldDuration] = useState(new Date());
    const [resduration, setResDuration] = useState(new Date());
    const [shpduration, setShpDuration] = useState(new Date());
    const [harvestduration, setharvestduration] = useState(new Date());
    const [BldQueID, setBldQueID] = useState(0);
    const [bldName, setbldName] = useState('');
    const [researchName, setresearchName] = useState('');
    const [shipName, setshipName] = useState(''); 
    
    useEffect(() => {
        if (planetID )
        {
            GetPlanet(planetID);
        }
    },[planetID]);

    useEffect(() => {
        if (planet.planetID > 0 && RunBldQueList)
        {  
            axios.get('http://apicall.starshipfleets.com/Planet/GetBuildingQueue/' + planetID )
            .then((response) => {
                setBuildingQueList(response.data.buildingQue??[]);
                setResearchQueList(response.data.researchQue??[]);
                setShipQueList(response.data.shipQue??[]);
                setRunBldQueList(false);
                dispatch({type: ActionTypes.SET_PLANETBUILDQUE,payload:response.data});
                console.log(response.data)                
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[planet, RunBldQueList]); 

    useEffect(() => {
        if (planetID )
        {
            BuildingQueDisplay();            
            axios.get('http://apicall.starshipfleets.com/Planet/GetBuildingTypes/' + planetID)
            .then((response) => {
                setBuildingStats(response.data);                
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[BuildingQueList]);

    useEffect(() => {
        if (planet.planetID > 0)
        {  
            axios.get('http://apicall.starshipfleets.com/Planet/GetPlanetStats/' + planetID )
            .then((response) => {
                setPlanetStats(response.data);
            })
            .catch(function (error) {
            })
            .finally(function () {  
            });
        }
    },[BuildingStats]);   

  
    function BuildingQueDisplay()
    {
        if (BuildingQueList.length > 0)
        {
            if (BuildingQueList[0].buildQueID != BldQueID)
            {
                const name = BuildingStats.filter(x => x.buildingID == BuildingQueList[0].buildingID)[0].name;
                setbldName(name);
                setBldDuration(new Date(Date.parse(BuildingQueList[0].completetionDate)));
                setBldQueID(BuildingQueList[0].buildQueID);
            }
        }
    }

    function GetPlanet()
    {            
        axios.get('http://apicall.starshipfleets.com/Planet/GetPlanet/' + planetID + '/' + UserID)
        .then((response) => {
            setPlanet(response.data);
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
            setPlanet(response.data);
            UpdatePlanet(response.data);            
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function UpdatePlanetHarvest(pop, mats)
    {  
        console.log(pop + ":" + mats)      
        axios.post('http://apicall.starshipfleets.com/Planet/UpdatePlanetHarvest',
        {
            PlanetID: planetID,
            Owner: UserID,
            Population: pop,
            Materials: mats
        })
        .then((response) => {            
            setPlanet(response.data);
            UpdatePlanet(response.data);
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    }

    function UpdatePlanet(data)
    {
        setRunBldQueList(true);
        setPlanetOwner(data.owner);
        setPTid(data.planetType);
        setBarren(data.barren); 
        if (harvestduration != data.lastHarvest)
            setharvestduration(new Date(Date.parse(data.lastHarvest)));
        setPlanetPop(
        {
            metalsPop: data.metalsPop
            ,researchPop: data.researchPop
            ,foodPop: data.foodPop
            ,energyPop: data.energyPop
            ,infrastructurePop: data.infrastructurePop
            ,infrastructurePopMetal: data.infrastructurePopMetal
        });
    }

    function BuildingStart(prod, buildingID, mats){
        console.log(prod + ":" + mats)
        AddBuildingQue(prod, buildingID, mats);
    }

    function ResearchStart(prod, buildingID, mats){
        //AddBuildingQue(prod, name, buildingID, mats);
    }

    function ShipStart(prod, buildingID, mats){
        //AddBuildingQue(prod, name, buildingID, mats);
    }

    function BuildingQue(item)
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
        return(Math.round(
                (PlanetStats.infrastructure+(PlanetStats.infrastructure*(PlanetPop.infrastructurePop/100)))
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
            setPlanet(response.data);
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
                    <div style={{padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "#228B22", cursor: "pointer"}} onClick={() => BacktoSystem()}>Back</div>
                    <div style={{width:"100px", padding: "5px", fontSize: "12px", display: "inline-block", cursor: "pointer", title: "Back to System"}} onClick={ChangeName}>
                        {planet.planetName}
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
                        <PlanetDetailDisplay planet={planet} PlanetStats={PlanetStats} PTid={PTid} BuildingStats={BuildingStats} PlanetPop={PlanetPop}
                        bldName={bldName} bldduration={bldduration} researchName={researchName} resduration={resduration} shpduration={shpduration} shipName={shipName} 
                        setshipName={setshipName} setresearchName={setresearchName} setbldName={setbldName} tab={tab} BuildingQue={BuildingQue} UpdatePlanetHarvest={UpdatePlanetHarvest}
                        harvestduration={harvestduration} BuildingQueList={BuildingQueList} ShipQueList={ShipQueList} ResearchQueList={ResearchQueList}/>
                    </div>
                    <div style={{display:tab==5?'block':'none'}}>    
                        <FocusDisplay PlanetPop={PlanetPop} planetID={planetID} UserID={UserID} save={setPlanetPop} setTab={setTab} setPlanetStats={setPlanetStats}
                        bldName={bldName} researchName={researchName} shipName={shipName} PlanetStats={PlanetStats}/>
                    </div>
                    <div style={{display:tab==2?'block':'none'}}>
                        <BuildDisplay planet={planet} PlanetStats={PlanetStats} PTid={PTid} BuildingStats={BuildingStats} UserID={UserID} PlanetID={planetID}
                        BuildingStart={BuildingStart} PlanetPop={PlanetPop} GetCon={GetCon} BuildingQueList={BuildingQueList} />
                    </div>
                    <div style={{display:tab==3?'block':'none'}}>
                        <ResearchDisplay planet={planet} PlanetStats={PlanetStats} PTid={PTid} BuildingStats={BuildingStats} UserID={UserID} PlanetID={planetID}
                        ResearchStart={ResearchStart} PlanetPop={PlanetPop} GetCon={GetCon} BuildingQueList={ResearchQueList}/>
                    </div>
                    <div style={{display:tab==4?'block':'none'}}>
                        <ShipDisplay planet={planet} PlanetStats={PlanetStats} PTid={PTid} BuildingStats={BuildingStats} UserID={UserID} PlanetID={planetID}
                        setShpDuration={setShpDuration} setshipName={setshipName}/>
                    </div>
                </div>                 
            </div>            
        </div>
    );
  }
  
  export default PlanetDetail;
  