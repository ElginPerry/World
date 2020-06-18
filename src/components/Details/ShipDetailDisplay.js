import React, {useState, useEffect} from 'react';
import windim from "../WindowDimensions";
import { useSelector } from 'react-redux';
import "../../styles/stylesheet.css"


function ShipDetailDisplay(props) {
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes);
    const [bg, setBg] = useState([]);  

    useEffect(() => {
        setBg(props.bg);
      }, [props.bg]);

    function getTechName(techID)
    {
        var TechName
        ResearchTypes.filter(x => x.technologyID == techID).map(x => (TechName=x.name )); 
        return TechName;
    }


    return (
        <div>
            <div style={{textAlign: "center", display: "inline-block", width:"100%", paddingBottom: "10px", borderBottom: '1px solid red'}}>
                    {bg.length> 0 && bg[0].designName}
            </div>
            {bg.length> 0 && bg[0].materialCost>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Material Cost:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].materialCost}
                </div>
            </div>
            }
            {bg.length> 0 && bg[0].militaryCost>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Military Cost:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].militaryCost}
                </div>
            </div>
            }
            {bg.length> 0 && bg[0].armor>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Armor:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].armor}
                </div>
            </div>
            }
            {bg.length> 0 && bg[0].shields>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Shields:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].shields}
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
                    {bg[0].missile}
                </div>
            </div>
            }
            {bg.length> 0 && bg[0].plasma>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Plasma:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].plasma}
                </div>
            </div>
            }
            {bg.length> 0 && bg[0].movement>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Movement:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].movement}
                </div>
            </div>
            }  
            {bg.length> 0 && bg[0].bays>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Bays:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].bays}
                </div>
            </div>
            }                  
            {bg.length> 0 && bg[0].colony>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Colony:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg[0].colony}
                </div>
            </div>
            }  
            {bg.length> 0 && bg[0].shipYardLevel>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Research Needed:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {getTechName(bg[0].shipYardLevel)}
                </div>
            </div>
            }
            {bg.length> 0 && bg[0].shipYardLevel>0 &&
            <div>
                <div style={{textAlign: "left", display: "inline-block", width:"65%", paddingLeft: "5px"}}>
                    Ship Yard Level:
                </div>
                <div style={{textAlign: "center", display: "inline-block", width:"35%", color:"gold"}}>
                    {bg.length> 0 && bg[0].shipYardLevel}
                </div>
            </div>
            }
            <div>
                <div style={{textAlign: "center", width:"100%", padding: "15px"}} onClick={() => props.HideInfo()}>
                    CLOSE
                </div>
            </div>
        </div>
    )
}

export default ShipDetailDisplay;