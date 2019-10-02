import React from 'react';
import AgendaHeaderComponent from './agendaHeader';
import { map, chain, forEach } from 'lodash';
import './agendaTable.scss';
import { connect } from "react-redux";
import Section from './section';

class AgendaTableComponent extends React.Component {
  fakeCurrentTime = new Date("Nov 2 2019 12:00 PM");

  constructor(props) {
    super(props);
    this.parseHeight = this.parseHeight.bind(this);
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
            <Section key={"section" + index} parseHeight={this.parseHeight} event={event} />
          )
        } else {
          sessions.push(
            <Section key={"section" + index} parseHeight={this.parseHeight} event={event} />
          )
        }
      });
      const firstStartTime = new Date(session.events[0].startTime);
      const earliestStartTime = new Date(firstStartTime.getTime());
      earliestStartTime.setHours(7);
      earliestStartTime.setMinutes(0);
      if (firstStartTime.getTime() !== earliestStartTime.getTime() && this.props.agenda.dayShowing === 'Full Agenda') {
        startBuffer.push((
          <div className="row" key="startBuffer">
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
      const newGroup = map(group, (event, index) => {
        return <Section key={"section" + index} parseHeight={this.parseHeight} event={event} isTrack="true"></Section>
      });
      return (<div className="row" key={"group" + i}>{newGroup}</div>)
    })
  }

  parseHeight(startDate, endDate) {
    if (
      endDate !== null &&
      this.props.agenda.dayShowing === 'Full Agenda' &&
      this.props.screenWidth > 990
    ) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      const diffTime = Math.abs(date2 - date1);
      const diffMinutes = Math.ceil(diffTime / (1000 * 60)) / 15;
      return diffMinutes * 70;
    } else {
      return 170;
    }
  }

  render() {
    return (
      <div className="container ">
        <AgendaHeaderComponent title={this.props.title} />
        <div className="row bg-white p-3">
          {this.props.data.map((session, index) => {
            if (session.title === this.props.agenda.dayShowing || this.props.agenda.dayShowing === 'Full Agenda') {
              return (
                <div key={"session" + index} className={"col-lg  animated fadeInUpBig"} >
                  <div className=" header row bg-blue">
                    <h2 className="col m-1">{session.title} </h2>
                  </div>
                  {
                    this.parseEvents(session, index)
                  }
                </div>
              )
            }
            return
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
