import React from 'react';
import { toggleCollapse } from '../../modules/agenda/actions'
import { connect } from "react-redux";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.props.toggleCollapse(e.target.checked);
  }
  render() {
    return (
      <>
        <div className='custom-control custom-switch m-4'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='customSwitches'
            onClick={this.onClick}
            readOnly
          />
          <label className='custom-control-label' htmlFor='customSwitches'>
            {this.props.label}
          </label>
        </div>
      </>
    );
  }
};
const mapDispatchToProps = dispatch => {
  return {
    toggleCollapse: (bool) => dispatch(toggleCollapse(bool)),
  }

};

export default connect(null, mapDispatchToProps)(Toggle);
