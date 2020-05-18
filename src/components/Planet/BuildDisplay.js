import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from "react-three-fiber";
import Planet from "../components/PlanetDisplay";
import Lights from "../components/Lights";
import Environment from "../components/Enviroment";
import '../App.css';
import {useSelector, useDispatch} from 'react-redux'
import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';
import CountdownTimer from '../components/CountdownTimer'
import "../styles/stylesheet.css"

var buildno = 1;
function BuildDispaly(props) {

    function BuildThing(){
        buildno = buildno+1;
        var newBuild = {
            buildno: buildno,
            Complete: Getduration((buildno+1)*10)
        };

        setBuilds(Builds.concat(newBuild));
    }

    function RemoveBuild(item)
    {
        console.log(item);
        var newBuilds = Builds.filter(x => x.buildno != item);
        //var index = Builds.indexOf(item);         
        setBuilds(newBuilds);
    }

    function createSelectItems() {
        let items = [];         
        for (let i = 0; i <= 8; i++) {             
            items.push(<option key={i} value={i}>{i}</option>);   
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }  

    function onDropdownSelected(e) {
        console.log("THE VAL", e.target.value);
        //here you will see the current selected value of the select input
    }      

    function Getduration(s)
    {
        var d = new Date();
        d.setTime(d.getTime()  + (s*1000))
        return d;
    }

    return (
        <div style={{display:"inline-block", height:"65%", width:"65%", verticalAlign:"top", 
        padding:"20px", backgroundColor:"lightblue", fontWeight:"bold", textAlign: "center", overflow: "auto"}}>

            <select onChange={onDropdownSelected} label="Multiple Select" multiple>
                {createSelectItems()}
            </select>
            <select onChange={onDropdownSelected} label="Multiple Select" >
                {createSelectItems()}
            </select>
        
            <div className="button" onClick={() => BuildThing()} >
                Build 
            </div>
            {console.log(Builds)}
            {Builds.length > 0 &&                    
                <CountdownTimer key={"p" + Builds[0].buildno} item={Builds[0].buildno} timeUp={RemoveBuild} Date={Builds[0].Complete} />
            }
            {
                Builds.map((item, index) => {
                    if (index > 0)
                    { 
                        return(
                            <div key={"d" + item.buildno} id={"d" + item.buildno} >                                    
                                {item.buildno//item.Complete.toString("MM/DD/YYYY")
                                }  
                            </div>                                     
                        ); 
                    }
                })
            }
        </div>
    )




}

export default BuildDispaly;