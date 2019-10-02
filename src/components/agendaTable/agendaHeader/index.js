import React from 'react';
import DayToggle from '../dayToggle';
import CategoryToggle from '../categoryToggle';
import { connect } from "react-redux";

class AgendaHeaderComponent extends React.Component {
  render() {
    const largeScreen = this.props.screenWidth >= 540;
    return (
      <div className="" >
        <div className="row">
          <h1 className={largeScreen ? "col-xs" : "col-xs text-center mb-2"}>{this.props.title}</h1>
          <ul className={largeScreen ? "nav justify-content-end m-4" : "nav margin-auto mb-3"}>
            <li className="nav-item ">
              <DayToggle />
            </li>
            <li className="nav-item ">
              <CategoryToggle />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  screenWidth: state.global.screenWidth,
});

export default connect(mapStateToProps, null)(AgendaHeaderComponent);