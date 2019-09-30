import React from 'react';
import DayToggle from '../dayToggle';
import CategoryToggle from '../categoryToggle';

export default class AgendaHeaderComponent extends React.Component {
  render() {
    return (
      <div className="" >
        <div className="row">
          <h1 className="col">Page Header</h1>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <DayToggle />
            </li>
            <li className="nav-item">
              <CategoryToggle />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}