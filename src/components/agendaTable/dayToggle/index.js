import React from 'react';
import { Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toggleDay } from '../../../modules/agenda/actions'
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
    console.log(event.target.innerText);
    this.props.toggleDay(event.target.innerText);
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
            {Object.keys(this.props.days).map((item, index) => {
              const date = new Date(parseInt(item));
              return <DropdownItem
                onClick={this.select}
                key={"days" + index}>
                {date.toLocaleString('default', { weekday: 'short', month: 'short', day: 'numeric' })}
              </DropdownItem>
            })}
          </DropdownMenu>
        </ButtonDropdown>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDay: (text) => dispatch(toggleDay(text)),
  }
};

const mapStateToProps = state => ({
  days: state.global.days
});


export default connect(mapStateToProps, mapDispatchToProps)(DayToggle);
