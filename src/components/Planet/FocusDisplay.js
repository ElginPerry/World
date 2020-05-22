import React, {useEffect, useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import windim from "../WindowDimensions";
import axios from 'axios';
import imgMetal from '../../assets/Metals.png'
import imgResearch from '../../assets/Research.png'
import imgFood from '../../assets/Food.png'
import imgEnergy from '../../assets/Energy.png'
import imgPopulation from '../../assets/Population.png'
import imgMaterials from '../../assets/Materials.png'
import imgIndustry from '../../assets/Industry.png'
import imgProdMetals from '../../assets/ProdMetals.png'
import "../../styles/stylesheet.css"

const FocusDisplay = (props) => { 
    const PlanetID = props.planetID;
    const UserID = props.UserID;
    const [pops, setpops] = useState(props.PlanetPop);
    const [PlanetStats, setPlanetStats] = useState(props.PlanetStats);
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

    useEffect(() => {
        setPlanetStats(props.PlanetStats);
    }, [props.PlanetStats]);

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

    const MetalPopChange = (event, newValue) => {        
        newValue = TotalPops(newValue, pops.metalsPop);
        setpops({metalsPop:newValue, researchPop:pops.researchPop, foodPop:pops.foodPop, 
            energyPop:pops.energyPop, infrastructurePop:pops.infrastructurePop, infrastructurePopMetal:pops.infrastructurePopMetal});
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
            props.setPlanetStats(response.data);
        })
        .catch(function (error) {
        })
        .finally(function () {  
        });
        props.setTab(1);        
    }

    function Reset()
    {
        setpops(props.PlanetPop);  
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
                Metal
            </Grid>
            <Grid container spacing={2} alignItems="center">
                <Grid style={{width:"80%"}}>
                    <Slider
                        value={typeof pops.metalsPop === 'number' ? pops.metalsPop : 0}
                        onChange={MetalPopChange}                       
                        min={0}
                        step={1}
                        max={100}
                        valueLabelDisplay="auto"
                        aria-labelledby="non-linear-slider"
                    />
                </Grid>
                <Grid item style={{width:"20%"}}>
                    <div className="sliderText">
                        {typeof pops.metalsPop === 'number' ? pops.metalsPop : 0}                        
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
            <div style={{width: "100%", textAlign:"left"}}>
                <div style={{width:"100%", verticalAlign:"top", padding:"5px", backgroundColor:"black", fontWeight:"bold", textAlign: "center", fontSize:"12px"}}>
                    <div style={{width:"200px", display:"inline-block"}}>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgMetal} alt="Metals" title="Metals" /> 
                            {width>450 && 'Metals'}                               
                        </div>
                        <div className="planetDetailData">
                            {(Math.round(
                                (PlanetStats.mining+(PlanetStats.mining*(pops.metalsPop/100)))                                
                                *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                *100)/100)?? 'NA'}
                        </div>
                    </div>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgResearch} alt="Research" title="Research" />
                            {width>450 && 'Res'}                                
                        </div>
                        <div className="planetDetailData">
                            {(Math.round(
                                (PlanetStats.research+(PlanetStats.research*(pops.researchPop/100)))
                                *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                *100)/100)?? 'NA'}
                        </div>
                    </div>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgFood} alt="Food" title="Food" />
                            {width>450 && 'Food'}                               
                        </div>
                        <div className="planetDetailData">
                            {(Math.round(
                                (PlanetStats.food+(PlanetStats.food*(pops.foodPop/100)))
                                *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)    
                                *100)/100)?? 'NA'}
                        </div>
                    </div>
                    </div>                
                    
                    <div style={{width:"200px", display:"inline-block"}}>
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgEnergy} alt="Energy Remaining" title="Energy Remaining" />
                            {width>450 && 'Energy'}
                        </div>
                        <div className="planetDetailData">
                            {(Math.round(                                
                                (PlanetStats.energy+(PlanetStats.energy*(pops.energyPop/100)))  
                                /PlanetStats.energyCost)*100) +'%' ?? 'NA'}
                        </div>
                    </div> 
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgIndustry} alt="Construction" title="Construction" />
                            {width>500 && 'Con'}
                        </div>
                        <div className="planetDetailData">
                            {(Math.round(
                                (PlanetStats.infrastructure+(PlanetStats.infrastructure*(pops.infrastructurePop/100)))
                                *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                *100)/100)?? 'NA'}
                        </div>
                    </div>  
                    <div className="planetDetailStats">
                        <div>
                            <img className="planetDetailImg" src={imgProdMetals} alt="Material Production" title="Material Production" />
                            {width>500 && 'Prod'}
                        </div>
                        <div className="planetDetailData">
                            {(Math.round(
                                (PlanetStats.infrastructure)
                                *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)
                                *
                                (PlanetStats.mining+(PlanetStats.mining*(pops.metalsPop/100)))                                
                                *(PlanetStats.energy/PlanetStats.energyCost>1?1:PlanetStats.energy/PlanetStats.energyCost)                                
                                *100)/100) ?? 'NA'}
                        </div>
                    </div> 
                    </div>            



                </div>
                {(props.PlanetPop.energyPop!=pops.energyPop || props.PlanetPop.foodPop!=pops.foodPop || props.PlanetPop.infrastructurePop!=pops.infrastructurePop 
                || props.PlanetPop.metalsPop!=pops.metalsPop || props.PlanetPop.researchPop!=pops.researchPop ) &&
                    <div>
                        <div style={{width: "100px", padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "#228B22", cursor: "pointer", textAlign:"center"}} onClick={() => Save()}>
                            SAVE
                        </div> 
                        <div style={{width: "100px", padding: "5px", fontSize: "12px", display: "inline-block", backgroundColor: "blue", cursor: "pointer", textAlign:"center"}} onClick={() => Reset()}>
                            RESET
                        </div> 
                    </div>        
                } 
            </div>                                           
        </div>

    )};

    export default FocusDisplay
