/* ═══════════════════════════════════════════════════════
   BJJ FANATICS COMMUNITY — Auth Gate
   Simple client-side password protection for preview sharing.
   ═══════════════════════════════════════════════════════ */

(function() {
  // ── Configuration ──
  // Password hash (SHA-256 of "vrmy33hx")
  const VALID_HASH = 'b9e9843a7cad6777d30183ba25263932c7a78d7826c9b370f6dc7b802b9c00fa';
  const SESSION_KEY = 'bjjfc_auth';

  // Check if already authenticated this session
  if (sessionStorage.getItem(SESSION_KEY) === 'true') return;

  // ── Build the gate UI ──
  const overlay = document.createElement('div');
  overlay.id = 'authGate';
  overlay.innerHTML = `
    <style>
      #authGate {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: #0F0F1A;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      #authGate * { box-sizing: border-box; margin: 0; padding: 0; }

      .auth-card {
        width: 100%;
        max-width: 420px;
        padding: 48px 40px;
        background: linear-gradient(145deg, #1A1A2E, #16162B);
        border: 1px solid rgba(232, 168, 56, 0.15);
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(232, 168, 56, 0.05);
        text-align: center;
        animation: authSlideUp 0.5s ease;
      }

      @keyframes authSlideUp {
        from { opacity: 0; transform: translateY(30px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .auth-logo {
        width: 72px;
        height: 72px;
        border-radius: 16px;
        margin: 0 auto 20px;
        object-fit: cover;
        border: 2px solid rgba(232, 168, 56, 0.3);
      }

      .auth-title {
        font-size: 22px;
        font-weight: 800;
        color: #FFFFFF;
        margin-bottom: 6px;
        letter-spacing: -0.5px;
      }

      .auth-title span { color: #E8A838; }

      .auth-subtitle {
        font-size: 14px;
        color: rgba(255,255,255,0.45);
        margin-bottom: 32px;
        line-height: 1.5;
      }

      .auth-form { display: flex; flex-direction: column; gap: 14px; }

      .auth-input-group {
        position: relative;
        text-align: left;
      }

      .auth-input-group label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: rgba(255,255,255,0.5);
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .auth-input {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        color: #FFFFFF;
        font-size: 15px;
        font-family: inherit;
        outline: none;
        transition: all 0.2s ease;
      }

      .auth-input:focus {
        border-color: rgba(232, 168, 56, 0.5);
        background: rgba(255,255,255,0.08);
        box-shadow: 0 0 0 3px rgba(232, 168, 56, 0.1);
      }

      .auth-input::placeholder { color: rgba(255,255,255,0.25); }

      .auth-submit {
        width: 100%;
        height: 48px;
        background: linear-gradient(135deg, #E8A838, #D4952E);
        color: #1A1A2E;
        font-size: 15px;
        font-weight: 700;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        margin-top: 6px;
        letter-spacing: 0.3px;
      }

      .auth-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(232, 168, 56, 0.35);
      }

      .auth-submit:active { transform: translateY(0); }

      .auth-error {
        display: none;
        font-size: 13px;
        color: #EA4335;
        margin-top: 8px;
        animation: authShake 0.4s ease;
      }

      .auth-error.visible { display: block; }

      @keyframes authShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
      }

      .auth-footer {
        margin-top: 24px;
        font-size: 12px;
        color: rgba(255,255,255,0.25);
      }

      .auth-footer span { color: rgba(232, 168, 56, 0.6); }
    </style>

    <div class="auth-card">
      <img src="assets/logo.png" alt="BJJ Fanatics" class="auth-logo">
      <div class="auth-title">BJJ <span>Fanatics</span> Community</div>
      <div class="auth-subtitle">This is a private preview. Enter the access code to continue.</div>
      <div class="auth-form">
        <div class="auth-input-group">
          <label>Your Name</label>
          <input type="text" class="auth-input" id="authName" placeholder="Enter your name" autocomplete="name">
        </div>
        <div class="auth-input-group">
          <label>Access Code</label>
          <input type="password" class="auth-input" id="authPassword" placeholder="Enter access code" autocomplete="off">
        </div>
        <button class="auth-submit" id="authSubmit">🔓 Enter Community</button>
        <div class="auth-error" id="authError">Incorrect access code. Please try again.</div>
      </div>
      <div class="auth-footer">🔒 Private preview • <span>BJJ Fanatics</span></div>
    </div>
  `;

  // Hide page content
  document.documentElement.style.overflow = 'hidden';
  document.body.prepend(overlay);

  // ── Hash function ──
  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // ── Auth logic ──
  async function authenticate() {
    const password = document.getElementById('authPassword').value;
    const errorEl = document.getElementById('authError');

    if (!password) {
      errorEl.textContent = 'Please enter an access code.';
      errorEl.classList.add('visible');
      return;
    }

    const hash = await sha256(password);

    if (hash === VALID_HASH) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      overlay.style.animation = 'authFadeOut 0.3s ease forwards';
      setTimeout(() => {
        overlay.remove();
        document.documentElement.style.overflow = '';
      }, 300);

      // Add fade-out animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes authFadeOut {
          to { opacity: 0; transform: scale(1.02); }
        }
      `;
      document.head.appendChild(style);
    } else {
      errorEl.textContent = 'Incorrect access code. Please try again.';
      errorEl.classList.add('visible');
      document.getElementById('authPassword').value = '';
      document.getElementById('authPassword').focus();

      // Shake the card
      const card = overlay.querySelector('.auth-card');
      card.style.animation = 'authShake 0.4s ease';
      setTimeout(() => card.style.animation = '', 400);
    }
  }

  document.getElementById('authSubmit').addEventListener('click', authenticate);

  document.getElementById('authPassword').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') authenticate();
  });

  document.getElementById('authName').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('authPassword').focus();
  });

  // Focus the name field
  setTimeout(() => document.getElementById('authName').focus(), 500);
})();
