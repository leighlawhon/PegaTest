import React from 'react';
import AgendaHeaderComponent from './agendaHeader';
import { map, chain, forEach } from 'lodash';
import './agendaTable.scss';
import { connect } from "react-redux";
import Section from './section';
import { dayInPast } from './helpers';
import { showHideDay } from '../../modules/agenda/actions';
import { updateDays } from '../../modules/global/actions';

import Spinner from '../spinner';

class AgendaTableComponent extends React.Component {

  constructor(props) {
    super(props);
    this.parseHeight = this.parseHeight.bind(this);
    this.dayInPast = dayInPast.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, prevState)
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
            <Section key={"section" + index} parseHeight={this.parseHeight} event={event} /> || null
          )
        } else {
          sessions.push(
            <Section key={"section" + index} parseHeight={this.parseHeight} event={event} /> || null
          )
        }
      });
      const firstStartTime = new Date(session.events[0].startTime);
      const earliestStartTime = new Date(firstStartTime.getTime());
      earliestStartTime.setHours(7);
      earliestStartTime.setMinutes(0);
      if (
        firstStartTime.getTime() !== earliestStartTime.getTime()
        && this.props.agenda.dayShowing === 'Full Agenda'
        && this.props.agenda.categoryShowing === 'Full Agenda'
      ) {
        startBuffer.push((
          <div className={"row " + this.dayInPast(firstStartTime)} key="startBuffer">
            <div className="start-buffer border col">
              <div className="d-none d-sm-block" style={{ height: this.parseHeight(earliestStartTime, firstStartTime) + 'px' }}></div>
            </div>
          </div>
        ));
      }

      return (
        <div className="fadeIn animated" >
          {!this.props.hideSpace ? startBuffer : null}
          <div className="row ">
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
        return <Section key={"section" + index} parseHeight={this.parseHeight} event={event} isTrack="true"></Section> || null
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
  showHideDay(title) {
    console.log(this.props);
    this.props.showHideDay(title);
  }
  render() {
    const getModifiedDate = (title) => {
      const titleDate = new Date(title);
      return { date: titleDate.getDate(), day: titleDate.toLocaleString('default', { weekday: 'short' }) };
    }
    return (
      <div className="container ">
        <AgendaHeaderComponent title={this.props.title} />
        <div className={this.props.agenda.expandClass + " row bg-white p-3"}>
          {!this.props.isFetching ?
            this.props.data.map((session, index) => {
              const sesstionTitleDate = new Date(session.title).getTime();
              return (
                <div
                  key={"session" + index}
                  className={!this.props.days[sesstionTitleDate] || this.props.fakeCurrentTime > sesstionTitleDate ? "empty animated fadeInUpBig" : "col-lg  animated fadeInUpBig"}
                >
                  <div
                    className={" header row bg-blue text-center " + (this.props.days[sesstionTitleDate] ? 'full' : 'faded')}
                    onClick={() => this.showHideDay(session.title)}
                  >
                    <h2 className="col mt-1 mb-0">{(getModifiedDate(session.title)).date} </h2>
                    <p className="mb-0 dayLabel">{(getModifiedDate(session.title)).day} </p>
                  </div>
                  {(this.props.days[sesstionTitleDate]) ?
                    this.parseEvents(session, index) : null
                  }
                </div>
              )
            }
            ) : <Spinner />
          }
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  screenWidth: state.global.screenWidth,
  agenda: state.agenda,
  fakeCurrentTime: state.global.fakeCurrentTime,
  data: state.global.data,
  isFetching: state.global.isFetching,
  days: state.global.days,
  hideSpace: state.agenda.hideSpace,
  expandClass: state.expandClass,
});

const mapDispatchToProps = dispatch => {
  return {
    showHideDay: (value) => dispatch(showHideDay(value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AgendaTableComponent);
