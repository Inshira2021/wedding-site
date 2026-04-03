import React, { useState, useEffect } from 'react';

const moments = [
  { date: '2025-07-21', title: 'The day he came to see me', desc: 'Where everything started — a shy hello and a hopeful smile.', photo: '/memories/memory1.jpg' },
  { date: '2025-07-23', title: 'The day I accepted my babe', desc: 'Saying yes to feeling, to us.', photo: '/memories/memory2.jpg' },
  { date: '2025-08-01', title: 'Family visited his home', desc: "My family met his — a step toward two families becoming one.", photo: '/memories/memory3.jpg' },
  { date: '2025-08-24', title: 'Aqadh function', desc: 'Our first private meeting — sacred and calm.', photo: '/memories/memory4.jpg' },
  { date: '2025-09-12', title: 'My 1st hug from my babe', desc: 'A simple hug that warmed the heart.', photo: '/memories/memory5.jpg' },
  { date: '2025-09-14', title: '1st video call', desc: 'Seeing each other across screens and feeling close.', photo: '/memories/memory6.jpg' },
  { date: '2025-10-11', title: '1st secret meetup (sunrise)', desc: 'A secret sunrise meetup full of quiet magic.', photo: '/memories/memory7.jpg' },
  { date: '2025-10-24', title: '2nd private meetup at my home', desc: 'A place I felt so comfortable and safe.', photo: '/memories/memory8.jpg' },
  { date: '2025-11-02', title: '1st formal meetup', desc: "Attending Mafasa's nikah together as an upcoming couple.", photo: '/memories/memory9.jpg' },
  { date: '2025-12-12', title: '3rd private meetup after heavy rain', desc: 'A cozy moment after the storm.', photo: '/memories/memory10.jpg' },
  { date: '2026-02-06', title: 'Birthday cake at NIBM', desc: 'He visited to share his birthday cake — sweet romance.', photo: '/memories/memory11.jpg' },
  { date: '2026-02-13', title: 'Valentines day memories', desc: 'Lunch, outing, cake — so many firsts in one beautiful day.', photo: '/memories/memory12.jpg' },
  { date: '2026-03-02', title: 'Selecting bridal dresses', desc: 'Choosing the dream dress and the beautiful beginning.', photo: '/memories/memory13.jpg' },
  { date: '2026-03-14', title: 'Eid dress exchange & dinner', desc: 'A simple hug that turned into something unforgettable.', photo: '/memories/memory14.jpg' },
];

function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === moments.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const handleImageLoad = (e) => {
    setImageDimensions({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight
    });
  };

  const currentMoment = moments[currentIndex];

  return (
    <section id="timeline" className="section timeline-section">
      <div className="timeline-header">
        <h2>Our Love Story</h2>
        <p className="timeline-subtitle">Every moment, every memory, leading to forever</p>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-container">
          {currentMoment.photo && (
            <div className="carousel-photo">
              <img 
                src={currentMoment.photo} 
                alt={currentMoment.title} 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                onLoad={handleImageLoad}
              />
              <div className="carousel-overlay"></div>
            </div>
          )}
          <div className="carousel-content">
            <div className="carousel-date">✨ {new Date(currentMoment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <h3>{currentMoment.title}</h3>
            <p>{currentMoment.desc}</p>
          </div>
          <div className="carousel-controls">
            <div className="carousel-dots-wrapper">
              {moments.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to memory ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
          <div className="carousel-counter">
            <div><span>{currentIndex + 1}</span> / <span className="total">{moments.length}</span></div>
            {imageDimensions.width > 0 && <div style={{fontSize: '0.8rem', marginTop: '6px', opacity: 0.8}}>📷 {imageDimensions.width} × {imageDimensions.height}</div>}
          </div>
        </div>
      </div>
      <p className="hint">💡 Add your memory photos to <code>public/memories/</code> folder (e.g., memory1.jpg, memory2.jpg, etc.)</p>
    </section>
  );
}

export default Timeline;
