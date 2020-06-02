import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import windim from "../components/WindowDimensions";
import "../styles/stylesheet.css"

function Header() {
    const UserEmail = useSelector(state => state.user.UserEmail);
    const BuildingStats = useSelector(state => state.planetReducer.BuildingStats)
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes)
    const ResearchStats = useSelector(state => state.planetReducer.ResearchStats);
    const { height, width } = windim();

    useEffect(()=>{
        if (BuildingStats.length ==0)
        {
            alert(0)
        }
        else
        {
            console.log(BuildingStats.length)
        }
    })

    return (
            <div>
            </div>
        )
    }
    
    export default Header;