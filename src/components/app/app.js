import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';
import StarshipDetails from '../sw-components/starship-details';

import './app.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />
            <Switch>
              <Route path='/' exact render={() => <h2>Welcome to StarDB</h2>} />
              <Route path='/people/:id?' component={PeoplePage} />
              <Route path='/planets' component={PlanetsPage} />
              <Route path='/starships' exact component={StarshipsPage} />
              <Route
                path='/starships/:id'
                render={({ match }) => {
                  return <StarshipDetails itemId={match.params.id} />;
                }}
              />
              <Route
                path='/login'
                render={() => (
                  <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                )}
              />
              <Route
                path='/secret'
                render={() => <SecretPage isLoggedIn={isLoggedIn} />}
              />
             <Route render={()=><h2>Page not found</h2>}/>
            </Switch>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
