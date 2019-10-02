import React from 'react';
import sessionData from '../../json/Pega_test.json';
import AgendaHeaderComponent from './agendaHeader';
import { map, chain, forEach } from 'lodash';
import './agendaTable.scss';
import { connect } from "react-redux";
import { iconHelper, categoryClassHelper } from './helpers';

class AgendaTableComponent extends React.Component {
  fakeCurrentTime = new Date("Nov 2 2019 12:00 PM");

  constructor(props) {
    super(props);
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
      if (firstStartTime.getTime() !== earliestStartTime.getTime() && this.props.agenda.dayShowing === 'Full Agenda') {
        startBuffer.push((
          <div className="row">
            <div className="start-buffer border col">
              <div className="start-buffer d-none d-sm-block" style={{ height: this.parseHeight(earliestStartTime, firstStartTime) + 'px' }}></div>
            </div>
          </div>
        ));
      }

      return (
        <div className="" >
          {startBuffer}
          <div className="row">
            <div className="sessions col ">{sessions}</div>
          </div>
          <div className="row">
            <div className="specialEvents col ">{specialEvents}</div>
          </div>
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
        return this.section(event, true);
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

  parseHeight(startDate, endDate) {
    if (
      endDate !== null && this.props.agenda.dayShowing === 'Full Agenda' &&
      this.props.screenWidth >= 600
    ) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      const diffTime = Math.abs(date2 - date1);
      const diffMinutes = Math.ceil(diffTime / (1000 * 60)) / 15;
      return diffMinutes * 70;
    } else {
      return 200;
    }
  }
  section(event, isTrack = false) {
    if (event.category === this.props.agenda.categoryShowing || this.props.agenda.categoryShowing === 'Full Agenda') {
      const iconClass = iconHelper(event.category);
      let details;
      if (this.props.agenda.dayShowing !== 'Full Agenda') {
        details = (<div className="col white-border details">
          {'Lorem'}
        </div>)
      }
      if (isTrack) {
        return (
          <div className="col">
            <div className={categoryClassHelper(event.category) + ' border row'} style={{ height: this.parseHeight(event.startTime, event.endTime) + 'px', minHeight: '200px' }}>
              <div className="col p-1 text-center">
                <div className="track">{event.track}</div>
                <h3 className="mb-0 mt-1">
                  <a href="#">{event.title}</a>
                </h3>
                <p className="m-0">{this.parseTime(event.startTime, event.endTime)}</p>
                <p className="m-0">{event.location}</p>
                {event.category !== "Special Events" ? <span className={iconClass + " icon "}></span> : null}
              </div>
            </div>
            {details}
          </div >
        )
      } else {
        return (
          <div className="row ">
            <div className={categoryClassHelper(event.category) + ' border col p-1 text-center'} style={{ height: this.parseHeight(event.startTime, event.endTime) + 'px' }}>
              <h3 className="m-0">
                <a href="#">{event.title}</a>
              </h3>
              <p className="m-0">{this.parseTime(event.startTime, event.endTime)}</p>
              <p className="m-0">{event.location}</p>
              {event.category !== "Special Events" ? <span className={iconClass + " icon "}></span> : null}
            </div>
            {details}
          </div>
        )
      }

    }
  }

  render() {
    return (
      <div className="container ">
        <AgendaHeaderComponent title={this.props.title} />
        <div className="row bg-white p-3">
          {sessionData.map((session, index) => {
            if (session.title === this.props.agenda.dayShowing || this.props.agenda.dayShowing === 'Full Agenda') {
              return (
                <div className={"col-sm  animated slideInLeft"} >
                  <div className=" header row bg-blue">
                    <h2 className="col m-1">{session.title} </h2>
                  </div>
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

const mapStateToProps = state => ({
  screenWidth: state.global.screenWidth,
  agenda: state.agenda,
  toggleCollapse: state.toggleCollapse,
});


export default connect(mapStateToProps, null)(AgendaTableComponent);
