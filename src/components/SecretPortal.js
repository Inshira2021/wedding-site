import React, { useState } from 'react';

function SecretPortal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = `My dearest love,\n\nFrom the moment you entered my life, my heart has known a new kind of happiness. You brought smiles not only to my face, but deep into my soul.\n\nAs I look forward to becoming your wife, my heart overflows with love and gratitude.\n\nI am so proud to be yours — today, tomorrow, and forever.\n\nAlways yours.`;

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
            <div className="portal-buttons" style={{ marginTop: 12, gap: 8 }}>
              <button 
                style={{
                  background: 'linear-gradient(90deg, #e85d75, #ff8da1)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 12px rgba(232,93,117,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(232,93,117,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(232,93,117,0.2)';
                }}
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button 
                style={{
                  background: 'linear-gradient(90deg, #e85d75, #ff8da1)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 12px rgba(232,93,117,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(232,93,117,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(232,93,117,0.2)';
                }}
                onClick={copyMessage}
              >
                {copied ? 'Copied!' : 'Copy Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SecretPortal;
