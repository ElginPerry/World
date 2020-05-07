import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import Planet from "../components/PlanetDisplay";
import Lights from "../components/Lights";
import Environment from "../components/Enviroment";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';

function PlanetList(props) {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState({});    
    var { planetType } =  props.match.params;
    const StatePT = useSelector(state => state.planetTypeReducer.textureNo);
    const PTid = planetType ?? StatePT ?? 2;

    useEffect(() => {
        axios.get('http://apicall.starshipfleets.com/Planet/GetPlanetTypeDetailCall/' + PTid)
        .then((response) => {
            setPosts(response.data);
            dispatch({type: ActionTypes.SET_PLANETDETAIL,payload:response.data});
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
    },[PTid]);

    return (
        <div style={{height:"100%", width:"100%"}} >
            <div style={{height:"50%", width:"50%", borderWidth:"2", borderColor:"black", display:"inline-block"}}>        
                <Canvas 
                    camera={{fov:25,
                    aspect: window.innerWidth / window.innerHeight,
                    near: 0.1,
                    far: 1000
                }}>
                    <Suspense fallback={<group />}>
                    <Planet planetType={PTid} radius={.3} isDetail={true}/>
                        <Lights />
                        <Environment />
                    </Suspense> 
                </Canvas>
            </div> 
            <div style={{display:"inline-block", height:"50%", width:"50%", verticalAlign:"top", padding:"20px", backgroundColor:"lightblue", fontWeight:"bold"}}>
                <div style={{padding:"5px"}}>
                    <span style={{color:"blue"}}>Type Name:</span> {posts.typeName}
                </div> 
                <div style={{padding:"5px"}}>
                    <span style={{color:"blue"}}>Intrastructure:</span> {posts.intrastructure}
                </div> 
                <div style={{padding:"5px"}}>
                    <span style={{color:"blue"}}>Mining:</span> {posts.mining}
                </div> 
                <div style={{padding:"5px"}}>
                    <span style={{color:"blue"}}>Research:</span> {posts.research}
                </div> 
                <div style={{padding:"5px"}}>
                    <span style={{color:"blue"}}>Energy:</span> {posts.energy}
                </div> 
                <div style={{padding:"5px"}}>
                    <span style={{color:"blue"}}>Barren:</span> {posts.barren ? 'True' : 'False'}
                </div>                
            </div> 
        </div>
    );
  }
  
  export default PlanetList;
  