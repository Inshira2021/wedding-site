import React, { useEffect, useState, useRef } from 'react';

function SlideshowModal({ images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const imageRef = useRef(null);

  useEffect(() => setIndex(startIndex), [startIndex]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') setIndex(i => Math.min(images.length - 1, i + 1));
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1));
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  if (!images || images.length === 0) return null;

  function onTouchStart(e) {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    deltaX.current = 0;
  }

  function onTouchMove(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    deltaX.current = x - startX.current;
    // allow a small translate for touch feedback
    if (imageRef.current) imageRef.current.style.transform = `translateX(${deltaX.current * 0.3}px)`;
  }

  function onTouchEnd() {
    if (Math.abs(deltaX.current) > 60) {
      if (deltaX.current < 0) setIndex(i => Math.min(images.length - 1, i + 1));
      else setIndex(i => Math.max(0, i - 1));
    }
    if (imageRef.current) imageRef.current.style.transform = '';
    deltaX.current = 0;
  }

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onClick={e => { if (e.target.classList && e.target.classList.contains('modal')) onClose(); }}
    >
      <div
        className="modal-inner"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
      >
        <div className="modal-image" ref={imageRef}>
          <img src={images[index]} alt={`Slide ${index + 1}`} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>

        <div className="modal-controls">
          <div className="modal-counter">{index + 1}/{images.length}</div>
          <div className="modal-buttons">
            <button aria-label="Previous" className="nav" onClick={() => setIndex(i => Math.max(0, i - 1))}>‹</button>
            <button aria-label="Next" className="nav" onClick={() => setIndex(i => Math.min(images.length - 1, i + 1))}>›</button>
            <button aria-label="Close" className="close" onClick={() => onClose()}>✕</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideshowModal;
