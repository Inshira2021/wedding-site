import React from 'react';
import Countdown from './Countdown';
import SecretPortal from './SecretPortal';

function Hero() {
  // Use the hero image in the public folder as `public/love.jpg`
  // Place your `love.jpg` image in the project's `public/` folder.
  const bg = '/love.jpg';

  const scrollToTimeline = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="hero"
      style={{ backgroundImage: `linear-gradient(rgba(6,6,6,0.45), rgba(6,6,6,0.45)), url('${bg}')` }}
    >
      <div className="hero-inner">
        <div className="hero-center">
          <div className="hero-small">The Marriage of</div>
          <h1>
            <span className="serif">Raizan</span> <span className="amp">♥</span>{' '}
            <span className="serif">Inshira</span>
          </h1>

          <div className="hero-date">07 / 05 / 2026</div>
          <p className="hero-sub">Waiting to officially become your wife</p>

          <Countdown year={2026} month={5} day={7} />

          <div className="hero-actions">
            <a className="btn ghost" href="#timeline">
              Our Love Story
            </a>
            <a className="btn primary" href="#gallery">
              See Photos
            </a>
            <SecretPortal />
          </div>
        </div>
      </div>

      <button className="swipe" onClick={scrollToTimeline} aria-label="Scroll to timeline">
        <div className="swipe-arrow">⌃</div>
        <div className="swipe-text">Swipe Up</div>
      </button>
    </header>
  );
}

export default Hero;
