/**
 * Agenda
 *
 * This is the page we show when the user visits /agenda/
 *
 */

import React from 'react';
import NavigationComponent from '../../components/navigation';
import PageHeaderComponent from '../../components/pageHeader';
import AgendaTableComponent from '../../components/agendaTable';
import Spinner from '../../components/spinner';

export default class AgendaPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      data: [],
    }
  }
  timer = null
  componentDidMount() {
    this.timer = setTimeout(() => {
      fetch('https://api.myjson.com/bins/1e3r5d')
        .then(response => response.json())
        .then(data => {
          this.setState({
            data,
            loaded: true,
          })
        });
    }, 2000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (
      <div>
        <NavigationComponent />
        <PageHeaderComponent title="Agenda" />
        {this.state.loaded ? <AgendaTableComponent title="Design Track" data={this.state.data} /> : <Spinner />}
      </div >
    );
  }
}
