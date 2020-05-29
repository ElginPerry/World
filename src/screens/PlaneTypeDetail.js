import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import Planet from "../components/Planet/PlanetDisplay";
import Lights from "../components/Planet/Lights";
import Environment from "../components/Planet/Enviroment";
import axios from 'axios';
import "../styles/stylesheet.css"

const PlanetTypeDetail = (props) => {
    const [Type, setType] = useState({});
    var {planetType} =  props.match.params;

    useEffect(() => {                
        axios.get('http://apicall.starshipfleets.com/Planet/GetPlanetTypeDetailCall/' + planetType)
        .then((response) => {
            console.log(response.data)
            setType(response.data);              
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    },[planetType]);

    function GotoType(Pid) {        
        var link = "/PlanetTypes";
        window.location.assign(link);
    }


    return (
        <div >            
            <div style={{height:"100%", width:"100%", display:"inline-block", position: "relative"}}>
                <div className="button" onClick={e => GotoType()} >Planet Types</div>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black"}}>
                    <div style={{width:"100%", height:"140px"}}>           
                        <Canvas 
                            camera={{fov:25,
                            aspect: window.innerWidth / window.innerHeight,
                            near: 0.1,
                            far: 1000
                        }}>
                            <Suspense fallback={<group />}>
                                <Planet planetType={planetType} radius={.3} isDetail={true} />
                                <Lights />
                                <Environment />
                            </Suspense> 
                        </Canvas>
                    </div>
                </div>           
                <div >
                    <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"14px", color:"white"}}>
                        <div style={{display:"inline-block"}}>
                            <div style={{padding:"5px",color:"blue"}}>
                                Type
                            </div> 
                            <div style={{padding:"5px", boxShadow:"2px 2px 0 0 gray" }}>
                                {Type.typeName}
                            </div>
                        </div>
                        <div style={{display:"inline-block"}}>
                            <div style={{padding:"5px",color:"blue"}}>
                                Energy 
                            </div>
                            <div style={{padding:"5px", boxShadow:"2px 2px 0 0 gray" }}>
                                {Type.energy}
                            </div> 
                        </div>
                        <div style={{display:"inline-block"}}>
                            <div style={{padding:"5px",color:"blue"}}>
                                Metals 
                            </div>
                            <div style={{padding:"5px", boxShadow:"2px 2px 0 0 gray" }}>
                                {Type.mining}
                            </div> 
                        </div>
                        <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"14px", color:"white"}}>
                            <div style={{display:"inline-block"}}>
                                <div style={{padding:"5px",color:"blue"}}>
                                    Research 
                                </div>
                                <div style={{padding:"5px", boxShadow:"2px 2px 0 0 gray" }}>
                                    {Type.research}
                                </div> 
                            </div>  
                            <div style={{display:"inline-block"}}>
                                <div style={{padding:"5px",color:"blue"}}>
                                    Infrastructure 
                                </div>
                                <div style={{padding:"5px", boxShadow:"2px 2px 0 0 gray" }}>
                                    {Type.infrastructure}
                                </div> 
                            </div>  
                            <div style={{display:"inline-block"}}>
                                <div style={{padding:"5px",color:"blue"}}>
                                    Barren 
                                </div>
                                <div style={{padding:"5px", boxShadow:"2px 2px 0 0 gray" }}>
                                    {Type.barren ? "True" : "False"}
                                </div> 
                            </div> 
                        </div>                                 
                    </div>                                        
                </div>  
            </div> 
        </div>    
    )};
    
  export default PlanetTypeDetail