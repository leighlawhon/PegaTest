import React from 'react';
import '../agendaTable.scss';
import { connect } from "react-redux";
import { iconHelper, categoryClassHelper } from '../helpers';
import InfoModal from '../info-modal';
import { dayInPast } from '../helpers';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.dayInPast = dayInPast.bind(this);
  }

  parseTime(startDate, endDate) {
    const startTime = new Date(startDate);
    let endTime = endDate !== null ? new Date(endDate) : null;
    const parsedStartTime = startTime.getHours() + ':' + (startTime.getMinutes() < 10 ? '0' + startTime.getMinutes() : startTime.getMinutes());
    let parsedEndTime;
    if (endDate !== null) {
      parsedEndTime = '–' + endTime.getHours() + ':' + (endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes());
    } else {
      parsedEndTime = '';
    }

    return parsedStartTime + parsedEndTime;

  }

  render() {
    if (this.props.event.category === this.props.agenda.categoryShowing || this.props.agenda.categoryShowing === 'Full Agenda') {
      const iconClass = iconHelper(this.props.event.category);
      const sectionMinHeight = this.props.screenWidth > 960 ? '220px' : '150px';
      const sectionHeight = !this.props.hideSpace ? this.props.parseHeight(this.props.event.startTime, this.props.event.endTime) + 'px' : 'auto';

      if (this.props.isTrack) {
        return (
          <div className={"col " + this.dayInPast(this.props.event.startTime)} key={this.props.key}>
            <div className={categoryClassHelper(this.props.event.category) + ' border row'}
              style={{ height: sectionHeight, minHeight: sectionMinHeight }}
            >
              <div className="col p-1 text-center">
                <div className="track">{this.props.event.track}</div>
                {
                  this.props.event.description ?
                    <InfoModal event={this.props.event} buttonLabel={this.props.event.title} /> :
                    <h3 className="mt-1">{this.props.event.title}</h3>
                }
                <p className="m-0">{this.parseTime(this.props.event.startTime, this.props.event.endTime)}</p>
                <p className="m-0">{this.props.event.location}</p>
                {this.props.event.category !== "Special Events" ? <span className={iconClass + " icon "}></span> : null}
              </div>

            </div>

          </div >
        )
      } else {
        return (
          <div className={"row " + this.dayInPast(this.props.event.startTime)} key={this.props.key}>
            <div
              className={categoryClassHelper(this.props.event.category) + ' border col p-1 text-center'}
              style={{ height: sectionHeight }}
            >
              {
                this.props.event.description ?
                  <InfoModal event={this.props.event} buttonLabel={this.props.event.title} /> :
                  <h3 className="mt-2">{this.props.event.title}</h3>
              }
              <p className="m-0">{this.parseTime(this.props.event.startTime, this.props.event.endTime)}</p>
              <p className="m-0">{this.props.event.location}</p>
              {this.props.event.category !== "Special Events" ? <span className={iconClass + " icon "}></span> : null}

            </div>

          </div>
        )
      }

    } else {
      return null
    }
  }
}

const mapStateToProps = state => {
  console.log(state)
  return ({
    screenWidth: state.global.screenWidth,
    agenda: state.agenda,
    fakeCurrentTime: state.global.fakeCurrentTime,
    hideSpace: state.agenda.hideSpace
  })
};


export default connect(mapStateToProps, null)(Section);
