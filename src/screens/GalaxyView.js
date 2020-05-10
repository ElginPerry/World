import React, {Suspense, useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {useSelector} from 'react-redux';
import windim from "../components/WindowDimensions";

function GalaxyView() {
    const Galaxy = 1;
    const [posts, setPosts] = useState({});
    const [uniqueSectors, setSectors] = useState([]);
    const UserID = useSelector(state => state.user.UserID);
    const { height, width } = windim();

  
    useEffect(() => {
        axios.get("http://apicall.starshipfleets.com/Planet/GetGalaxy/" + Galaxy)
        .then((response) => {
            setPosts(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {  
        });
    },[Galaxy]);

    useEffect(() => {
        if (posts.length > 0)
        {
            const sectors = posts.map(x => x.sector);
            setSectors([...new Set(sectors)]);
        }
    },[posts]);

    function SectorClick(Sector)
    {
        var link = "/SectorView/" + Galaxy + "/" + Sector;
        window.location.assign(link);
    }

    function DisplaySector(sector, index)
    {     
        const thisSector =  posts.filter((item) => item.sector === sector);
        if (width < 400)
        {
            var sysmycnt = thisSector.filter((item) => item.owner === UserID ).length;
            var sysother = thisSector.filter((item) => item.owner !== UserID && item.owner !== 0).length;
            var star = sysmycnt>0 && sysother>0 ? 'orange' : sysmycnt>0 ? 'green' : sysother>0 ? 'red' : 'lightblue';
            return <div style={{width: "100%", height: "100%", textAlign: "center", color: star}}> {thisSector.length}</div>;  
        }
        else
        {

            var SectorOBJs = [];
            for (var sys = 1; sys <= 9; sys++) {
                var syscnt = thisSector.filter((item) => item.sysPosition === sys).length;
                var sysmycnt = thisSector.filter((item) => item.owner === UserID && item.sysPosition === sys).length;
                var sysother = thisSector.filter((item) => item.owner !== UserID && item.owner !== 0 && item.sysPosition === sys).length;

                var star = syscnt>0 && sysmycnt>0 && sysother>0 ? 'orange' : syscnt>0 && sysmycnt>0 ? 'green' : 
                        syscnt>0 && sysmycnt===0 && sysother > 0 ? 'red' : syscnt>0 ? 'lightblue' : 'black';
                
                var symbol = syscnt>0 && sysmycnt>0 ? 'w' : syscnt>0 ? 'o' : 'x';

                SectorOBJs.push(
                    <div key={index+'divS'+sys} style={{width: "30%", height: "30%", display: 'inline-block', textAlign: "center", 
                backgroundColor: 'black', color: star}}>{symbol}</div>
                ) 
            }
            return <div style={{width: "100%", height: "100%"}}> {SectorOBJs}</div>; 
        }
        
    }

    function DisplayGalaxy()
    {
        var SysOBJs = [];
        {uniqueSectors.map((sector, index) => {
             SysOBJs.push(                                                                         
                <div key={index+'div'} style={{ width: "11%", height: "11%", display: 'inline-block', cursor: "pointer",
                backgroundColor: 'black', borderColor: 'white', borderWidth: "1px", borderStyle: "solid"}}  
                onClick={() => SectorClick(sector)}> 
                    {DisplaySector(sector, index)}
                </div>                     
            );
        })}
        return SysOBJs;
    }   

    return (
        <div style={{height:"90%", width:"100%"}} >
                <Suspense fallback={<div>Loading....</div>}>
                    {uniqueSectors.length > 0 &&
                        DisplayGalaxy()
                    }
                </Suspense>
        </div>  
    );
  }
  
  export default GalaxyView;
  