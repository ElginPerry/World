import React, {useEffect, useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import windim from "../WindowDimensions";
import axios from 'axios';
import "../../styles/stylesheet.css"

const FocusDisplay = (props) => { 
    const PlanetID = props.planetID;
    const UserID = props.UserID;
    const [pops, setpops] = useState(props.PlanetPop);
    const [bldName, setbldName] = useState(props.bldName);
    const [researchName, setresearchName] = useState(props.researchName);
    const [shipName, setshipName] = useState(props.shipName);
    const { width } = windim();
   
    useEffect(() => {
        setbldName(props.bldName);
    }, [props.bldName]);
 
    useEffect(() => {
        setresearchName(props.researchName);
    }, [props.researchName]);

    useEffect(() => {
        setshipName(props.shipName);
    }, [props.shipName]);       

    useEffect(() => {
        setpops(props.PlanetPop);
    }, [props.PlanetPop]);

    function TotalPops(newValue, oldValue)
    {
        var totals =pops.metalsPop+pops.researchPop+pops.foodPop+pops.energyPop+pops.infrastructurePop+pops.infrastructurePopMetal;
        if (totals==100 && newValue > oldValue)
        {
            return oldValue;
        }
        else if (totals<100 && newValue > oldValue)
        {
            var dif = 100-totals;
            if (totals+(newValue-oldValue)> 100)
                return oldValue+dif;
            else
                return newValue;    
        }
        else
        {
            return newValue;
        }    
    }

    const FoodPopChange = (event, newValue) => {        
        newValue = TotalPops(newValue, pops.foodPop);
        setpops({metalsPop:pops.metalsPop, researchPop:pops.researchPop, foodPop:newValue, 
            energyPop:pops.energyPop, infrastructurePop:pops.infrastructurePop, infrastructurePopMetal:pops.infrastructurePopMetal});
    }

    const InfrastructureMetalPopChange = (event, newValue) => {        
        newValue = TotalPops(newValue, pops.infrastructurePopMetal);
        setpops({metalsPop:pops.metalsPop, researchPop:pops.researchPop, foodPop:pops.foodPop, 
            energyPop:pops.energyPop, infrastructurePop:pops.infrastructurePop, infrastructurePopMetal:newValue});
    }

    const InfrastructurePopChange = (event, newValue) => {        
        newValue = TotalPops(newValue, pops.infrastructurePop);
        setpops({metalsPop:pops.metalsPop, researchPop:pops.researchPop, foodPop:pops.foodPop, 
            energyPop:pops.energyPop, infrastructurePop:newValue, infrastructurePopMetal:pops.infrastructurePopMetal});
    }

    const ResearchPopChange = (event, newValue) => {        
        newValue = TotalPops(newValue, pops.researchPop);
        setpops({metalsPop:pops.metalsPop, researchPop:newValue, foodPop:pops.foodPop, 
            energyPop:pops.energyPop, infrastructurePop:pops.infrastructurePop, infrastructurePopMetal:pops.infrastructurePopMetal});
    }

    const EnergyPopChange = (event, newValue) => {        
        newValue = TotalPops(newValue, pops.energyPop);
        setpops({metalsPop:pops.metalsPop, researchPop:pops.researchPop, foodPop:pops.foodPop, 
            energyPop:newValue, infrastructurePop:pops.infrastructurePop, infrastructurePopMetal:pops.infrastructurePopMetal});
    }

    function Save()
    {
        var totals =pops.metalsPop+pops.researchPop+pops.foodPop+pops.energyPop+pops.infrastructurePop+pops.infrastructurePopMetal;
        if (totals!= 100)
        {
            alert("Total focus should be 100.");
            return;
        }
        props.save(pops);
        axios.post('http://apicall.starshipfleets.com/Planet/UpdatePlanetPop',
        {
            PlanetID:PlanetID,
            InfrastructurePop:pops.infrastructurePop,
            InfrastructurePopMetal:pops.infrastructurePopMetal,
            EnergyPop:pops.energyPop,
            MetalsPop:pops.metalsPop,
            FoodPop:pops.foodPop,
            ResearchPop:pops.researchPop,
            Owner:UserID
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
        props.setTab(1);        
    }

    return (
        <div style={{padding:"20px", fontSize:width>400?'14px': '12px'}}>
            <Grid container spacing={2} alignItems="center">
                Food
            </Grid>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{width:"80%"}}>
                    <Slider
                        value={typeof pops.foodPop === 'number' ? pops.foodPop : 0}
                        onChange={FoodPopChange}                       
                        min={0}
                        step={1}
                        max={100}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                    />
                </Grid>
                <Grid item style={{width:"20%"}}>
                    <div className="sliderText">
                        {typeof pops.foodPop === 'number' ? pops.foodPop : 0}                        
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
                Material Production
            </Grid>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{width:"80%"}}>
                    <Slider
                        value={typeof pops.infrastructurePopMetal === 'number' ? pops.infrastructurePopMetal : 0}
                        onChange={InfrastructureMetalPopChange}                       
                        min={0}
                        step={1}
                        max={100}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                    />
                </Grid>
                <Grid item style={{width:"20%"}}>
                    <div className="sliderText">
                        {typeof pops.infrastructurePopMetal === 'number' ? pops.infrastructurePopMetal : 0}                        
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
                Construction
            </Grid>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{width:"80%"}}>
                    <Slider
                        value={typeof pops.infrastructurePop === 'number' ? pops.infrastructurePop : 0}
                        onChange={InfrastructurePopChange}                       
                        min={0}
                        step={1}
                        max={100}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                        disabled={bldName + shipName + researchName == '' ? false : true }
                    />
                </Grid>
                <Grid item style={{width:"20%"}}>
                    <div className="sliderText">
                        {typeof pops.infrastructurePop === 'number' ? pops.infrastructurePop : 0}                        
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
                Research
            </Grid>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{width:"80%"}}>
                    <Slider
                        value={typeof pops.researchPop === 'number' ? pops.researchPop : 0}
                        onChange={ResearchPopChange}                       
                        min={0}
                        step={1}
                        max={100}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                    />
                </Grid>
                <Grid item style={{width:"20%"}}>
                    <div className="sliderText">
                        {typeof pops.researchPop === 'number' ? pops.researchPop : 0}                        
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
                Energy Production
            </Grid>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{width:"80%"}}>
                    <Slider
                        value={typeof pops.energyPop === 'number' ? pops.energyPop : 0}
                        onChange={EnergyPopChange}                       
                        min={0}
                        step={1}
                        max={100}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                    />
                </Grid>
                <Grid item style={{width:"20%"}}>
                    <div className="sliderText">
                        {typeof pops.energyPop === 'number' ? pops.energyPop : 0}                        
                    </div>
                </Grid>
            </Grid>
            <div style={{width: "30%", padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "#228B22", cursor: "pointer"}} onClick={() => Save()}>
                SAVE
            </div>                                         
        </div>

    )};

    export default FocusDisplay
