import React, {useState} from 'react';
import windim from "../WindowDimensions";
import { useSelector } from 'react-redux';
import ShipDetailDisplay from "../Details/ShipDetailDisplay"
import "../../styles/stylesheet.css"


function ShipDisplay(props) {
    const [popup, setPopup] = useState(false);
    const { width } = windim();
    const [bg, setBg] = useState({});    
    const BuildingStats = useSelector(state => state.planetReducer.BuildingStats);
    const ShipQueList = useSelector(state => state.planetReducer.shipQue)
    const ShipDesigns = useSelector(state => state.shipReducer.ShipDesigns);
    const planet = useSelector(state => state.planetReducer.Planet)

    function ShowInfo(name)
    {
        setBg(ShipDesigns.filter(x => x.designName == name));
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

    function canBuild(design)
    {
        if (BuildingStats.length>0)
        {
            if (
                design.materialCost
                <
                Math.round(planet.materials*100)/100
                &&
                design.militaryCost
                <=
                planet.military
                &&
                BuildingStats.find( x => x.buildingID == 7).bldLevel 
                >=
                design.shipYardLevel
            )
            {    
                if (ShipQueList.length >= 4)
                {
                    return false
                }
                else
                    return true
            }
            else
                return false
        }
        else
            return false  
    }



    return (
        <div style={{display:"inline-block", height:"90%", width:"100%", verticalAlign:"top", 
        padding:"20px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>
            <div style={{width:"100%", paddingLeft: "5px"}}>
                {ShipDesigns.length > 0 &&
                    ShipDesigns.map((design, index) => { 
                        return(
                            <div key={"g" + index}>
                                {index==0 &&
                                <div style={{fontSize: "10px", paddingBottom: "10px"}}>
                                    <div style={{display: "inline-block", width: "30%", borderBottom: '1px solid red'}}>
                                        Name
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'SY Level' : 'L'}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", borderBottom: '1px solid red'}}>
                                        {width>450 ? 'Military' : 'P'}
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
                                    <div style={{display: "inline-block", width: "30%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue', cursor:"pointer"}} onClick={() => ShowInfo(design.designName)}>
                                        {design.designName}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {design.shipYardLevel}
                                    </div>
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {design.militaryCost}
                                    </div> 
                                    <div style={{display: "inline-block", width: "10%", fontSize: width>450 ? "12px" : "10px", borderBottom: '1px solid blue'}}>
                                        {design.materialCost}
                                    </div>  
                                    <div style={{display: "inline-block", width: "25%", fontSize: width>450 ? "12px" : "10px", paddingRight: "5px", borderBottom: '1px solid blue'}}>
                                        {
                                            durDisplay(
                                                Math.round(design.materialCost/props.GetCon())<30?30:
                                                Math.round(design.materialCost/props.GetCon())
                                            )
                                        }
                                    </div>
                                    {
                                         canBuild(design)
                                         &&
                                         <div style={{textAlign: "center", display: "inline-block", backgroundColor:'#228B22', width: "15%", 
                                         fontSize: width>450 ? "12px" : "10px", cursor:"pointer"}} 
                                         onClick={() => 
                                             props.ShipStart(
                                                Math.round(design.materialCost/props.GetCon())<30?30:
                                                Math.round(design.materialCost/props.GetCon())
                                             , design.shipDesignID
                                             , design.materialCost
                                             , design.movement
                                             )
                                             }>
                                            {width>450 ? 'Build' : ' + '}
                                        </div> 
                                    } 
                                    {
                                         !canBuild(design)
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
                <ShipDetailDisplay bg={bg} HideInfo={HideInfo} />
            </div>           
        </div>

    )
}

export default ShipDisplay;