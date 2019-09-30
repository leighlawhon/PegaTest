/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import NavigationComponent from '../../components/navigation';
import './homePage.scss'

export default function HomePage() {
  return (
    <div>
      <NavigationComponent />
      <div className="video-background">
        <div className="overlay"></div>
        <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
          <source src="Technology_Background.mp4" type="video/mp4" />
        </video>
      </div>

    </div>
  );
}
