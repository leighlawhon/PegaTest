import React from 'react';
import { Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toggleCategory } from '../../../modules/agenda/actions'
import { connect } from "react-redux";

class CategoryToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      value: "Category"
    };
  }

  toggle(event) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  select(event) {
    this.props.toggleCategory(event.target.innerText);
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }
  render() {
    return (
      <Container>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="pi-btn-primary">
          <DropdownToggle caret>{this.state.value}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.select}>Full Agenda</DropdownItem>
            <DropdownItem onClick={this.select}>Travel & Registration</DropdownItem>
            <DropdownItem onClick={this.select}>Breaks & Meals</DropdownItem>
            <DropdownItem onClick={this.select}>PegaWORLD</DropdownItem>
            <DropdownItem onClick={this.select}>Mobile</DropdownItem>
            <DropdownItem onClick={this.select}>User Centered Design</DropdownItem>
            <DropdownItem onClick={this.select}>Customer Centricity</DropdownItem>
            <DropdownItem onClick={this.select}>Special Events</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Container>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    toggleCategory: (text) => dispatch(toggleCategory(text)),
  }

};

export default connect(null, mapDispatchToProps)(CategoryToggle);
