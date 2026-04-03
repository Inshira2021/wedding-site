import React, { useEffect, useState, useMemo } from 'react';

function computeRemaining(target) {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Countdown({ year = 2026, month = 5, day = 7 }) {
  const target = useMemo(() => new Date(year, month - 1, day, 10, 0, 0), [year, month, day]);
  const [timeLeft, setTimeLeft] = useState(() => computeRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(computeRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="countdown" aria-live="polite">
      <div className="countdown-item">
        <strong>{timeLeft.days}</strong>
        <span>Days</span>
      </div>
      <div className="countdown-item">
        <strong>{String(timeLeft.hours).padStart(2, '0')}</strong>
        <span>Hours</span>
      </div>
      <div className="countdown-item">
        <strong>{String(timeLeft.minutes).padStart(2, '0')}</strong>
        <span>Minutes</span>
      </div>
      <div className="countdown-item">
        <strong>{String(timeLeft.seconds).padStart(2, '0')}</strong>
        <span>Seconds</span>
      </div>
    </div>
  );
}

export default Countdown;
