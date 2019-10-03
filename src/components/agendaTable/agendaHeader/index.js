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
          <h1 className={largeScreen ? "col-xs pl-2" : "w-100 text-center mb-3 pl-2 mt-2"}>{this.props.title}</h1>
          <ul className={largeScreen ? "nav justify-content-end mt-4" : "nav margin-auto mb-3"}>
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