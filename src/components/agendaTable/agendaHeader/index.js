import React from 'react';
import DayToggle from '../dayToggle';
import CategoryToggle from '../categoryToggle';
import Toggle from '../../toggle'
export default class AgendaHeaderComponent extends React.Component {
  render() {
    return (
      <div className="" >
        <div className="row">
          <h1 className="col">{this.props.title}</h1>
          <ul className="nav justify-content-end">
            <li className="" >
              <Toggle label="Collapsed" />
            </li>
            <li className="nav-item m-4">
              <DayToggle />
            </li>
            <li className="nav-item m-4">
              <CategoryToggle />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}