/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';

class ModalBodyText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <>
        <p>
          {this.props.event.description}
        </p>
        <hr />
        <div className="row">
          <div className="col-3">
            <img src={this.props.event.speakerImage} alt={this.props.event.speakerName} />
            <p className="speaker-name">{this.props.event.speakerName}</p>
          </div>
          <div className="col-6">
            <p className="speaker-bio">{this.props.event.speakerBio}</p>
          </div>
        </div>
      </ >
    );
  }
}

export default ModalBodyText;



