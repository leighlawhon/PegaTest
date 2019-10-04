/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import NavigationComponent from '../../components/navigation';
import { connect } from "react-redux";
import backgroundImage from '../../images/mask-group-1-2@1x.png';
import './homePage.scss'

class HomePage extends React.Component {

  render() {
    let background;

    if (this.props.screenWidth >= 600) {
      background = (
        <div className="video-background">
          <div className="overlay"></div>
          <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop" alt="video geometric background">
            <source src="Technology_Background.mp4" type="video/mp4" />
          </video>
        </div>
      )
    } else {
      background = (
        <div className="image-background">
          <img src={backgroundImage} alt="geometric background" />
        </div>
      )
    }
    return (
      <div>
        <NavigationComponent />
        {background}
      </div >
    );
  }
}

const mapStateToProps = state => {
  return ({
    screenWidth: state.global.screenWidth,
  });
}

export default connect(mapStateToProps, null)(HomePage);
