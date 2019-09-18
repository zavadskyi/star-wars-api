import React from 'react';
import ItemList from '../item-list';
import  {withData, withSwapiService}  from '../hoc-helper';



const withChildFunction = (Wrapped, fn)=>{
    return((props)=>{
        return <Wrapped {...props}>
            {fn}
        </Wrapped>
    })
}
const renderName = ({name}) => <span>{name}</span>
const renderModelAndName = ({name, model})=> <span>{name} ({model})</span>

const mapPersonMethodsToProps = (swapiService)=>({
    getData: swapiService.getAllPeople
})

const mapPlanetMethodsToProps = (swapiService)=>({
    getData: swapiService.getAllPlanets
})

const mapStarshipMethodsToProps = (swapiService)=>({
    getData: swapiService.getAllStarships
})

const PersonList = withSwapiService(withData( withChildFunction(ItemList, renderName)), mapPersonMethodsToProps);
const PlanetList = withSwapiService(withData( withChildFunction(ItemList, renderName)), mapPlanetMethodsToProps);
const StarshipList =withSwapiService(withData( withChildFunction(ItemList,renderModelAndName)), mapStarshipMethodsToProps);

export { PersonList, PlanetList, StarshipList };
