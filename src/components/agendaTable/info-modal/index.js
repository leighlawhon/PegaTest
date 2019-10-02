/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ModalBodyText from '../info-modal/ModalBodyText';

class InfoModal extends React.Component {
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
      <div>
        <Button onClick={this.toggle} className="btn btn-link">{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.event.title}</ModalHeader>
          <ModalBody>
            <ModalBodyText event={this.props.event} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Done</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

export default InfoModal;