import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import windim from "../components/WindowDimensions";
import GetShipDesigns from './Common'
import "../styles/stylesheet.css"

function Header() {
    const UserID = useSelector(state => state.user.UserID);
    const ShipDesigns = useSelector(state => state.shipReducer.ShipDesigns)
    const ShipHulls = useSelector(state => state.shipReducer.ShipDesigns)
    const ShipPods = useSelector(state => state.shipReducer.ShipDesigns)
    const BuildingStats = useSelector(state => state.planetReducer.BuildingStats)
    const ResearchTypes = useSelector(state => state.planetReducer.ResearchTypes)
    const ResearchStats = useSelector(state => state.planetReducer.ResearchStats);
    const { height, width } = windim();

    useEffect(()=>{
        if (ShipDesigns.length ==0)
        {
            //GetShipDesigns();
        }
        else
        {
            //console.log(BuildingStats.length)
        }
    },[UserID])

    return (
            <div>
            </div>
        )
    }
    
    export default Header;