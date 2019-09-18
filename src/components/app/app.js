import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import ErrorBoundry from '../error-boundry';

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';

import './app.css';

export default class App extends Component {
  state = {
    swapiService: new DummySwapiService()
  };

  onServiceChange = () =>{
    this.setState(({swapiService})=>{
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService

      return{
        swapiService: new Service()
      }
    })
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Header onServiceChange={this.onServiceChange} />
          <PersonDetails itemId={5} />
          <PlanetDetails itemId={5} />
          <StarshipDetails itemId={5} />
          <PersonList />
          <PlanetList />
          <StarshipList />
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
