import React, {useState} from 'react';
import windim from "../WindowDimensions";
import { useSelector } from 'react-redux';
import "../../styles/stylesheet.css"


function ResearchDisplay(props) {
    const [popup, setPopup] = useState(false);
    const { width } = windim();
    const [bg, setBg] = useState({}); 
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes);
    const ResearchQueList = useSelector(state => state.planetReducer.researchQue)

    function ShowInfo(name)
    {
        setBg(ResearchTypes.filter(x => x.name == name));
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

    function canResearch(tech)
    {
        var NeededLevel
        ResearchTypes.filter(x => x.technologyID == tech.techID).map(x => (NeededLevel=x.bldLevel )); 
        if (NeededLevel >= tech.techLevel || tech.techID == 0)
        {
            if (ResearchQueList.length >= 4)
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
                {ResearchTypes.length > 0 &&
                    ResearchTypes.map((tech, index) => { 
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
                                        {width>450 ? 'Research' : 'R'}
                                    </div>                                     
                                    <div style={{display: "inline-block", width: "25%", paddingRight: "5px", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Build Time' : 'BT'}
                                    </div>
                                    <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%"}}>
                                    </div>                                         
                                </div>
                                }
                                <div style={{paddingBottom: "10px"}}>
                                    <div style={{display: "inline-block", width: "30%", fontSize: width>450 ? "12px" : "10px", cursor:"pointer", borderBottom: '1px solid blue'}} onClick={() => ShowInfo(tech.name)}>
                                        {tech.name}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {tech.bldLevel}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {tech.technologyCost}
                                    </div>  
                                    <div style={{display: "inline-block", width: "25%", fontSize: width>450 ? "12px" : "10px", paddingRight: "5px", borderBottom: '1px solid blue'}}>
                                        {
                                            durDisplay(
                                                Math.round(((tech.technologyCost+((tech.bldLevel+tech.quedLevel)*tech.technologyCost))*15)/props.GetResearch())<30?30:
                                                Math.round(((tech.technologyCost+((tech.bldLevel+tech.quedLevel)*tech.technologyCost))*15)/props.GetResearch())
                                            )
                                        }
                                    </div>
                                    {
                                         canResearch(tech)
                                         &&
                                         <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%", 
                                         fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
                                         onClick={() => 
                                             props.ResearchStart(
                                                Math.round(((tech.technologyCost+((tech.bldLevel+tech.quedLevel)*tech.technologyCost))*15)/props.GetResearch())<30?30:
                                                Math.round(((tech.technologyCost+((tech.bldLevel+tech.quedLevel)*tech.technologyCost))*15)/props.GetResearch())
                                                ,tech.technologyID
                                                ,tech.technologyCost+((tech.bldLevel+tech.quedLevel)*tech.technologyCost*2.5)
                                             )
                                             }>
                                            {width>450 ? 'Build' : ' + '}
                                        </div> 
                                    } 
                                    {
                                         !canResearch(tech)
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
                {bg.length> 0 && bg[0].military>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Military:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].military}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].laser>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Laser:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg[0].laser}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].missile>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Missile:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].missile}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].plasma>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Plasma:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].plasma}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].shields>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Shields:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].shields}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].armor>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Armor:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].armor}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].bodyArmor>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Boby Armor:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].bodyArmor}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].weapons>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Weapons:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].weapons}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].technologyCost>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Technology Cost:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && bg[0].technologyCost}
                    </div>
                </div>
                }
                {bg.length> 0 && bg[0].techID>0 &&
                <div>
                    <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                        Research Needed:
                    </div>
                    <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                        {bg.length> 0 && getTechName(bg[0].techID)}
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

export default ResearchDisplay;