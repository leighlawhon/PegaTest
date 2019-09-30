import React from 'react';
import sessionData from '../../json/Pega_test.json';
import AgendaHeaderComponent from './agendaHeader';
import { map, chain, forEach } from 'lodash';
import './agendaTable.scss';
import { connect } from "react-redux";

class AgendaTableComponent extends React.Component {
  fakeCurrentTime = new Date("Nov 2 2019 12:00 PM");
  componentDidMount() {
    console.log(this.props, 'table')
  }
  currentTimeToggle(startTime) {
    // const currentMonth = this.fakeCurrentTime.getMonth();
    // const startMonth = startTime.getMonth();
    // const currentDay = this.fakeCurrentTime.geDay();
    // const startDay = startTime.geDay();

    // currentMonth === startMonth && currentDay === startDay ? "show" : "hide"
  }
  parseEvents(session, index) {
    // If day is Wednesaday
    if (index === 3) {
      // create a array by 15min chunk
      const groupedEvent = this.createEventsArray(session.events);
      // split the tracks
      return this.parseTracks(groupedEvent)
    } else {
      let sessions = [], specialEvents = [], startBuffer = [];
      forEach(session.events, (event, index) => {
        if (event.category === 'SpecialEvent') {
          specialEvents.push(
            this.section(event)
          )
        } else {
          sessions.push(
            this.section(event)
          )
        }
      });
      const firstStartTime = new Date(session.events[0].startTime);
      const earliestStartTime = new Date(firstStartTime.getTime());
      earliestStartTime.setHours(7);
      earliestStartTime.setMinutes(0);

      if (firstStartTime >= earliestStartTime) {
        console.log(earliestStartTime, firstStartTime)
        startBuffer.push((<div className="startBuffer" style={{ height: this.parseWidth(earliestStartTime, firstStartTime) + 'px' }}></div>));
      }
      return (
        <div className="row" >
          <div className="startBuffer ">{startBuffer}</div>
          <div className="sessions ">{sessions}</div>
          <div className="specialEvents ">{specialEvents}</div>
        </div>
      )
    }
  }

  createEventsArray(events) {

    var dateGroups = chain(events)
      .groupBy((obj) => { return Math.ceil(+(new Date(obj.startTime).getTime()) / (1000 * 60 * 15)) })
      .sortBy((v, k) => { return k; })
      .value();
    return dateGroups
  }

  parseTracks(groupedEvents) {
    return map(groupedEvents, (group, i) => {
      const newGroup = map(group, (event) => {
        if (group.length === 1) {
          return this.section(event);
        } else {
          return this.section(event);
        }
      });
      return (<div className="row">{newGroup}</div>)
    })
  }

  parseTime(startDate, endDate) {
    const startTime = new Date(startDate);
    let endTime = endDate !== null ? new Date(endDate) : null;
    const parsedStartTime = startTime.getHours() + ':' + (startTime.getMinutes() < 10 ? '0' + startTime.getMinutes() : startTime.getMinutes());
    let parsedEndTime;
    if (endDate !== null) {
      parsedEndTime = '–' + endTime.getHours() + ':' + (endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes());
    } else {
      // console.log('null')
      parsedEndTime = '';
    }

    return parsedStartTime + parsedEndTime;

  }

  parseWidth(startDate, endDate) {
    if (endDate !== null) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      const diffTime = Math.abs(date2 - date1);
      const diffMinutes = Math.ceil(diffTime / (1000 * 60)) / 15;
      return diffMinutes * 50;
    } else {
      return 100;
    }
  }
  section(event, addClass) {
    return (
      <div className={event.category + ' border col ' + addClass} style={{ height: this.parseWidth(event.startTime, event.endTime) + 'px' }}>
        <h3>{event.title}</h3>
        <p>{this.parseTime(event.startTime, event.endTime)}</p>
        <p>{event.location}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <AgendaHeaderComponent />
        <div className="row">
          {sessionData.map((session, index) => {
            if (session.title === this.props.agendaReducer.agendaShowing || this.props.agendaReducer.agendaShowing === 'Full Agenda') {
              return (
                <div className={"col"} >
                  <div className=" border header">{session.title}</div>
                  {
                    this.parseEvents(session, index)
                  }
                </div>
              )
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state); return ({
    ...state
  });
}

export default connect(mapStateToProps, null)(AgendaTableComponent);
