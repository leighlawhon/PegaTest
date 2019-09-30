import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class CategoryToggle extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
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
          <DropdownItem >Travel & Registration</DropdownItem>
          <DropdownItem>Breaks & Meals</DropdownItem>
          <DropdownItem>PegaWORLD main conference events</DropdownItem>
          <DropdownItem>Mobile</DropdownItem>
          <DropdownItem>User Centered Design</DropdownItem>
          <DropdownItem>Customer Centricity</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}