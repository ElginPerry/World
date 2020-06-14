import * as ActionTypes from '../redux/ActionTypes'
import axios from 'axios';

export const GetResearchStats = function(dispatch, ResearchTypes)
{  
    var TechStats=
            {
                armor: 0,
                bodyArmor: 0,
                energy: 0,
                food: 0,
                infrastructure: 0,
                laser: 0,
                military: 0,
                mining: 0,
                missile: 0,
                plasma: 0,
                populationMax: 0,
                research: 0,
                shields: 0,
                weapons: 0
            };
            ResearchTypes.map((res, index) =>
            {
                TechStats.armor=TechStats.armor+(res.armor*res.bldLevel);
                TechStats.bodyArmor=TechStats.bodyArmor+(res.bodyArmor*res.bldLevel);
                TechStats.energy=TechStats.energy+(res.energy*res.bldLevel);
                TechStats.food=TechStats.food+(res.food*res.bldLevel);
                TechStats.infrastructure=TechStats.infrastructure+(res.infrastructure*res.bldLevel);
                TechStats.laser=TechStats.laser+(res.laser*res.bldLevel);
                TechStats.military=TechStats.military+(res.military*res.bldLevel);
                TechStats.mining=TechStats.mining+(res.mining*res.bldLevel);
                TechStats.missile=TechStats.missile+(res.missile*res.bldLevel);
                TechStats.plasma=TechStats.plasma+(res.plasma*res.bldLevel);
                TechStats.populationMax=TechStats.populationMax+(res.populationMax*res.bldLevel);
                TechStats.research=TechStats.research+(res.research*res.bldLevel);
                TechStats.shields=TechStats.shields+(res.shields*res.bldLevel);
                TechStats.weapons=TechStats.weapons+(res.weapons*res.bldLevel);
            })
            dispatch({type: ActionTypes.SET_RESEARCHSTATS,payload:TechStats}); 

}

export const GetPlanetStats = function(dispatch, BuildingStats, PlanetPop, ResearchStats)
{
    var planetStats=
    {
        energy: 0,
        energyCost: 0,
        energyPer: 0,
        food: 0,
        infrastructure: 0,
        infrastructureMetal: 0,
        militaryMax: 0,
        mining: 0,
        populationMax: 0,
        research: 0,
        tradeRoutes: 0
    };
    BuildingStats.map((BLG, index) =>
    {
        planetStats.energy=planetStats.energy+(BLG.energy*BLG.bldLevel);
        planetStats.energyCost=planetStats.energyCost+(BLG.energyCost*BLG.bldLevel);
        planetStats.food=planetStats.food+(BLG.food*BLG.bldLevel);
        planetStats.infrastructure=planetStats.infrastructure+(BLG.infrastructure*BLG.bldLevel);
        planetStats.militaryMax=planetStats.militaryMax+(BLG.military*BLG.bldLevel);
        planetStats.mining=planetStats.mining+(BLG.mining*BLG.bldLevel);
        planetStats.populationMax=planetStats.populationMax+(BLG.populationMax*BLG.bldLevel);
        planetStats.research=planetStats.research+(BLG.research*BLG.bldLevel);
        planetStats.tradeRoutes=planetStats.tradeRoutes+(BLG.tradeRoutes*BLG.bldLevel);
    })  

    planetStats.energy=Math.round((planetStats.energy+(planetStats.energy*ResearchStats.energy))*100)/100;
    planetStats.energy=Math.round((planetStats.energy+(planetStats.energy*(PlanetPop.energyPop/100)))*100)/100;
    planetStats.energyPer = Math.round((planetStats.energy/planetStats.energyCost>1?1:planetStats.energy/planetStats.energyCost)*100)/100;  

    planetStats.food=Math.round(((((planetStats.food)+(planetStats.food*ResearchStats.food))*planetStats.energyPer)+(planetStats.food*(PlanetPop.foodPop/100)))*100)/100;

    planetStats.infrastructureMetal=Math.round(((((planetStats.infrastructure)+(planetStats.infrastructure*ResearchStats.infrastructure))*planetStats.energyPer))*100)/100;
    planetStats.infrastructure=Math.round(((((planetStats.infrastructure)+(planetStats.infrastructure*ResearchStats.infrastructure))*planetStats.energyPer)
        +(planetStats.infrastructure*(PlanetPop.infrastructurePop/100)))*100)/100;
    planetStats.mining=Math.round(((((planetStats.mining)+(planetStats.mining*ResearchStats.mining))*planetStats.energyPer)+(planetStats.mining*(PlanetPop.metalsPop/100)))*100)/100;
    planetStats.research=Math.round(((((planetStats.research)+(planetStats.research*ResearchStats.research))*planetStats.energyPer)+(planetStats.research*(PlanetPop.researchPop/100)))*100)/100;
    
    dispatch({type: ActionTypes.SET_PLANETSTATS,payload:planetStats});
}
