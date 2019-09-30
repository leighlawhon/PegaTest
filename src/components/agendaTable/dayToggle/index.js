import React from 'react';
import { Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toggleDay } from '../../../containers/Agenda/actions'
import { connect } from "react-redux";

class DayToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      value: "Day"
    };
  }
  componentDidMount() {
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.props.toggleDay(event.target.innerText)
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
    console.log(this.props)
  }

  render() {
    return (
      <Container>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{this.state.value}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.select}>Today</DropdownItem>
            <DropdownItem onClick={this.select}>Full Agenda</DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem onClick={this.select}>Sunday 3</DropdownItem>
            <DropdownItem onClick={this.select}>Monday 4</DropdownItem>
            <DropdownItem onClick={this.select}>Tuesday 5</DropdownItem>
            <DropdownItem onClick={this.select}>Wednesday 6</DropdownItem>
            <DropdownItem onClick={this.select}>Thursday 4</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log(state); return ({
    ...state
  });
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDay: (text) => dispatch(toggleDay(text)),
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(DayToggle);
