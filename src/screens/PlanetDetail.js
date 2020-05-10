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
            <div style={{height:"65%", width:"50%", borderWidth:"2", borderColor:"black", display:"inline-block"}}>        
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
            <div style={{display:"inline-block", height:"65%", width:"50%", verticalAlign:"top", padding:"20px", backgroundColor:"lightblue", fontWeight:"bold", textAlign: "center"}}>
                <div style={{padding:"5px",color:"blue"}}>
                    Type Name:                    
                </div> 
                <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                    {posts.typeName}
                </div>
                <div style={{padding:"5px",color:"blue"}}>
                    Intrastructure: 
                </div>
                <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                    {posts.intrastructure}
                </div> 
                <div style={{padding:"5px",color:"blue"}}>
                    Food:
                </div>
                <div style={{boxShadow:"2px 2px 0 0 gray" }}>                    
                     {posts.food}
                </div>
                <div style={{padding:"5px",color:"blue"}}>
                    Mining: 
                </div> 
                <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                    {posts.mining}
                </div>
                <div style={{padding:"5px",color:"blue"}}>
                    Research: 
                </div> 
                <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                    {posts.research}
                </div>
                <div style={{padding:"5px",color:"blue"}}>
                    Energy: 
                </div> 
                <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                    {posts.energy}
                </div>
                <div style={{padding:"5px",color:"blue"}}>
                    Barren: 
                </div>
                <div style={{boxShadow:"2px 2px 0 0 gray" }}>
                    {posts.barren ? 'True' : 'False'}
                </div>                
            </div> 
        </div>
    );
  }
  
  export default PlanetList;
  