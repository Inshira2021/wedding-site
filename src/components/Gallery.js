import React, { useEffect, useState } from 'react';
import SlideshowModal from './SlideshowModal';

const defaultCategories = [
  { key: 'nikah', title: 'Nikah Ceremony' },
  { key: 'waleema', title: 'Waleema Ceremony' },
  { key: 'wedding', title: 'Wedding Photos' },
];

function Gallery() {
  const [data, setData] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    const initial = {};
    defaultCategories.forEach(c => {
      const key = `gallery_${c.key}`;
      try {
        initial[c.key] = JSON.parse(localStorage.getItem(key) || '[]');
      } catch { initial[c.key] = []; }
    });
    setData(initial);
  }, []);

  function saveImages(catKey, images) {
    const key = `gallery_${catKey}`;
    localStorage.setItem(key, JSON.stringify(images));
    setData(prev => ({ ...prev, [catKey]: images }));
  }

  function handleAdd(catKey) {
    const url = prompt('Enter image URL (or leave blank to cancel)');
    if (!url) return;
    const images = [...(data[catKey] || []), url];
    saveImages(catKey, images);
  }

  function openSlideshow(catKey, idx = 0) {
    setActiveCategory(catKey);
    setModalIndex(idx);
  }

  return (
    <section id="gallery" className="section gallery">
      <h2>Photo Gallery</h2>
      <div className="gallery-grid">
        {defaultCategories.map(cat => {
          const imgs = data[cat.key] || [];
          return (
            <div key={cat.key} className="gallery-card">
              <div className="thumb">
                {imgs[0] ? <img src={imgs[0]} alt={cat.title} onError={(e)=>{e.currentTarget.style.display='none'}} /> : <div>{cat.title}</div>}
              </div>
              <strong>{cat.title}</strong>
              <div className="gallery-actions">
                <button className="btn ghost" onClick={() => handleAdd(cat.key)}>Add photo</button>
                <button className="btn primary" onClick={() => openSlideshow(cat.key, 0)} disabled={imgs.length===0}>Open slideshow</button>
              </div>
              <div style={{marginTop:8, fontSize:12, color:'#666'}}>{imgs.length} photo(s)</div>
            </div>
          );
        })}
      </div>

      {activeCategory && (
        <SlideshowModal
          images={data[activeCategory] || []}
          startIndex={modalIndex}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </section>
  );
}

export default Gallery;
