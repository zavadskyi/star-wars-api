import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indikator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  static propTypes = {
    updateInterval: PropTypes.number.isRequired
  }

  swapiService = new SwapiService();

  state = {
    planet: {},
    isLoading: true
  };

  componentDidMount() {
    const { updateInterval } = this.props
    this.updatePlanet();
    this.interval = setInterval(() => {
      return this.updatePlanet();
    }, updateInterval);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onError = err => {
    this.setState({
      error: true,
      isLoading: false
    });
  };

  onPlanetLoaded = planet => {
    this.setState({
      planet,
      isLoading: false,
      error: false
    });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 17) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { isLoading, planet, error } = this.state;

    const hasData = !(isLoading || error);
    const errorMassege = error ? <ErrorIndicator /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className='random-planet jumbotron rounded'>
        {errorMassege}
        {spinner}
        {content}
      </div>
    );
  }
}

RandomPlanet.defaultProps = {
  updateInterval: 5000
}


const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  return (
    <>
      <img
        className='planet-image'
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt='planet'
      />
      <div>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Population</span>
            <span>{population}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
