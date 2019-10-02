import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toggleCategory } from '../../../modules/agenda/actions'
import { connect } from "react-redux";

class CategoryToggle extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle(event) {
    this.props.toggleCategory(event.target.innerText);
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Category
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem >Full Agenda</DropdownItem>
          <DropdownItem >Travel & Registration</DropdownItem>
          <DropdownItem>Breaks & Meals</DropdownItem>
          <DropdownItem>PegaWORLD</DropdownItem>
          <DropdownItem>Mobile</DropdownItem>
          <DropdownItem>User Centered Design</DropdownItem>
          <DropdownItem>Customer Centricity</DropdownItem>
          <DropdownItem>Special Events</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    toggleCategory: (text) => dispatch(toggleCategory(text)),
  }

};

export default connect(null, mapDispatchToProps)(CategoryToggle);
