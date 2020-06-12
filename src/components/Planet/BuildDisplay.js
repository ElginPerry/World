import React, {useState} from 'react';
import windim from "../WindowDimensions";
import { useSelector } from 'react-redux';
import "../../styles/stylesheet.css"


function BuildDisplay(props) {
    const [popup, setPopup] = useState(false);
    const { width } = windim();
    const [bg, setBg] = useState({});
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes);
    const BuildingStats = useSelector(state => state.planetReducer.BuildingStats);
    const BuildingQueList = useSelector(state => state.planetReducer.buildingQue)
    const planet = useSelector(state => state.planetReducer.Planet)

    function ShowInfo(name)
    {
        setBg(BuildingStats.filter(x => x.name == name));
        setPopup(true)
    }

    function HideInfo()
    {
        setPopup(false)
    }

    function pad(num) {
        var s = num+"";
        while (s.length < 2) s = "0" + s;
        return s;
    }

    function durDisplay(totalSeconds)
    {
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    }

    function canBuild(building)
    {
        if (
            building.materialCost+((building.bldLevel+building.quedLevel)*building.materialCost*2.5)
            <
            Math.round(planet.materials*100)/100
            &&
            building.populationCost
            <=
            planet.population
        )
        {    
            if (BuildingQueList.length >= 4)
            {
                return false
            }
            else
                return true
        }
        else
            return false    
    }

    function getTechName(techID)
    {
        var TechName
        ResearchTypes.filter(x => x.technologyID == techID).map(x => (TechName=x.name )); 
        return TechName;
    }

    return (
        <div style={{display:"inline-block", height:"90%", width:"100%", verticalAlign:"top", 
        padding:"20px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>
            <div style={{width:"100%", paddingLeft: "5px"}}>
                {BuildingStats.length > 0 &&
                    BuildingStats.filter(x => x.showFlag).map((building, index) => { 
                        return(
                            <div key={"g" + index}>
                                {index==0 &&
                                <div style={{fontSize: "10px", paddingBottom: "10px"}}>
                                    <div style={{display: "inline-block", width: "30%", borderBottom: '1px solid red'}}>
                                        Name
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Level' : 'L'}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Population' : 'P'}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Materials' : 'M'}
                                    </div>  
                                    <div style={{display: "inline-block", width: "25%", paddingRight: "5px", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Build Time' : 'BT'}
                                    </div>
                                    <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%"}}>
                                    </div>                                         
                                </div>
                                }
                                <div style={{paddingBottom: "10px"}}>
                                    <div style={{display: "inline-block", width: "30%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue', cursor:"pointer"}} onClick={() => ShowInfo(building.name)}>
                                        {building.name}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {building.bldLevel}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {building.populationCost}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {building.materialCost+((building.quedLevel*2)*building.materialCost*2.5)}
                                    </div>  
                                    <div style={{display: "inline-block", width: "25%", fontSize: width>450 ? "12px" : "10px", paddingRight: "5px", borderBottom: '1px solid blue'}}>
                                        {
                                            durDisplay(
                                                Math.round(((building.productionCost+((building.quedLevel*2)*building.productionCost))*15)/props.GetCon())<30?30:
                                                Math.round(((building.productionCost+((building.quedLevel*2)*building.productionCost))*15)/props.GetCon())
                                            )
                                        }
                                    </div>
                                    {
                                         canBuild(building)
                                         &&
                                         <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%", 
                                         fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
                                         onClick={() => 
                                             props.BuildingStart(
                                                 Math.round(((building.productionCost+((building.quedLevel*2)*building.productionCost))*15)/props.GetCon())<30?30:
                                                 Math.round(((building.productionCost+((building.quedLevel*2)*building.productionCost))*15)/props.GetCon())
                                             , building.buildingID
                                             ,building.materialCost+((building.quedLevel*2)*building.materialCost*2.5)
                                             )
                                             }>
                                            {width>450 ? 'Build' : ' + '}
                                        </div> 
                                    } 
                                    {
                                         !canBuild(building)
                                         &&
                                         <div style={{textAlign: "center", display: "inline-block", backgroundColor:'red', width: "15%", 
                                         fontSize: width>450 ? "12px" : "10px"}} 
                                         >
                                            {width>450 ? 'Not Avaulable' : ' ! '}
                                        </div> 
                                    }                                                                            
                                </div>
                            </div>
                        ); 
                    })
                }
            </div> 
            <div className="popup" style={{display:popup ? 'block' : 'none', backgroundColor:'gray', border: '1px solid blue', overflow:"auto", fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
            onClick={() => HideInfo()}>
                <div style={{textAlign: "center", display: "inline-block", width:"100%", paddingBottom: "10px", borderBottom: '1px solid red'}}>
                    {bg.length> 0 && bg[0].name}
                </div>
                {bg.length> 0 && bg[0].energy>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Energy:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].energy}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].food>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Food:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].food}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].infrastructure>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Infrastructure:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].infrastructure}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].mining>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Mining:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].mining}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].populationMax>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Population Max:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].populationMax}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].research>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Research:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].research}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].energyCost>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Energy Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].energyCost}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].populationCost>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Population Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].populationCost}
                    </div>
                </div>
                }                       
                {bg.length> 0 && bg[0].techID>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Research Needed:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {getTechName(bg[0].techID)}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].techLevel>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Research Level:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].techLevel}
                    </div>
                </div>
                }
                <div>
                    <div style={{textAlign: "center", width:"100%", padding: "15px"}} onClick={() => HideInfo()}>
                        CLOSE
                    </div>
                </div>
            </div>           
        </div>

    )
}

export default BuildDisplay;