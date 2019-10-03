import React from 'react';
import { Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { showHideDay } from '../../../modules/agenda/actions';
import { updateDays } from '../../../modules/global/actions';

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
    if (event.target.innerText === 'Full Agenda') {
      let daysObj = this.props.days;
      for (let [key, value] of Object.entries(daysObj)) {
        daysObj[key] = true;
      }
      this.props.showHideDay(event.target.innerText);
    } else {
      this.props.showHideDay(event.target.innerText, true);
    }
    console.log(this.props)
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  }

  render() {
    console.log(this.props)
    return (
      <Container>
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="pi-btn-primary">
          <DropdownToggle caret>{this.state.value}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.select}>Full Agenda</DropdownItem>
            {Object.keys(this.props.days).map((item, index) => {
              const date = new Date(parseInt(item));
              return <DropdownItem
                onClick={this.select}
                key={"days" + index}>
                {date.toLocaleString('default', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
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
    showHideDay: (text, flag) => dispatch(showHideDay(text, flag)),
    updateDays: (daysObj) => dispatch(updateDays(daysObj)),
  }
};

const mapStateToProps = state => ({
  days: state.global.days,
  hideSpace: state.agenda.hideSpace
});


export default connect(mapStateToProps, mapDispatchToProps)(DayToggle);
