import React, { Component } from 'react';

import ItemDetails from '../item-details';
import ItemList from '../item-list';

import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';


export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedItem: 4
  };

  onItemSelected = id => {
    this.setState({
      selectedItem: id
    });
  };
  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.swapiService.getAllPeople}
      >
        {i => `${i.name} (${i.birthYear})`}
      </ItemList>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedItem} />
      </ErrorBoundry>
    );
    return <Row left={itemList} right={itemDetails} />;
  }
}
