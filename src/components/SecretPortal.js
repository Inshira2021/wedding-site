import React, { useState } from 'react';

function SecretPortal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = `My dearest love,\n\nEvery moment with you has been a beautiful step toward forever. On 07/05/2026 I will become your wife — and my heart is already home with you. Read this whenever you need a little reminder of how much I love you.\n\nAlways yours.`;

  function copyMessage() {
    const text = message;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  return (
    <>
      <button className="btn secret" onClick={() => setOpen(true)}>Open Secret Portal</button>

      {open && (
        <div className="portal-modal" role="dialog" aria-modal="true">
          <div className="portal-card">
            <h2>A love note</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
            <div className="portal-buttons" style={{ marginTop: 12 }}>
              <button className="btn ghost portal-btn" onClick={() => setOpen(false)}>Close</button>
              <button className="btn primary portal-btn" onClick={copyMessage}>{copied ? 'Copied!' : 'Copy Note'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SecretPortal;
