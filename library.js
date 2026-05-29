const APP = {
  ver: "1.2.0",
  name: "KhanDestroyer",
  user: {
    id: 0
  },
  cfg: {
    mod: true,
    auto: false,
    questionSpoof: true,
    darkMode: true,
    autoSpeed: 750,
    speedOptions: [750, 1000, 1250, 1500],
    themeColor: "#7c4dff",
    menuOpacity: 0.95,
    showAnimations: true,
    soundEffects: true
  }
};

// Load external libraries
async function loadScript(url) {
  const response = await fetch(url);
  const script = await response.text();
  eval(script);
}

async function loadCss(url) {
  return new Promise(resolve => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    link.onload = resolve;
    document.head.appendChild(link);
  });
}

// Toast notification function
function sendToast(message, duration = 5000, position = "bottom") {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration,
      gravity: position,
      position: "center",
      stopOnFocus: true,
      style: { background: APP.cfg.themeColor, borderRadius: "8px" }
    }).showToast();
  } else {
    console.log("Toast:", message);
  }
}

// Audio player function
const playAudio = src => {
  if (APP.cfg.soundEffects) {
    new Audio(src).play().catch(() => {});
  }
};

// Icon SVG definitions
const Icons = {
  auto: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  speed: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  spoof: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>',
  dark: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  theme: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.2l.07-.08z"/></svg>',
  opacity: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/></svg>',
  animation: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  sound: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  stats: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
};

class UI {
  static init() {
    const panel = document.createElement("div");
    panel.id = "khanDestroyer-panel";
    
    Object.assign(panel.style, {
      position: "fixed",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      width: "340px",
      background: `rgba(18, 18, 24, ${APP.cfg.menuOpacity})`,
      backdropFilter: "blur(12px)",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      zIndex: "9999",
      boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${APP.cfg.themeColor}33`,
      border: "none",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: "hidden",
      transition: APP.cfg.showAnimations ? "all 0.3s ease" : "none"
    });
    
    panel.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .kd-header {
          background: linear-gradient(135deg, ${APP.cfg.themeColor}20, ${APP.cfg.themeColor}05);
          padding: 16px 20px;
          cursor: pointer;
          border-bottom: 1px solid ${APP.cfg.themeColor}40;
          position: relative;
        }
        
        .kd-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          letter-spacing: -0.3px;
        }
        
        .kd-version {
          font-size: 10px;
          background: ${APP.cfg.themeColor}40;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 500;
          font-family: monospace;
        }
        
        .kd-collapse-icon {
          font-size: 12px;
          transition: transform 0.3s ease;
          opacity: 0.6;
        }
        
        .kd-collapse-icon.collapsed {
          transform: rotate(-90deg);
        }
        
        .kd-tabs {
          display: flex;
          padding: 8px 12px 0 12px;
          gap: 4px;
          background: rgba(0,0,0,0.2);
        }
        
        .kd-tab {
          flex: 1;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
          transition: all 0.2s ease;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        
        .kd-tab:hover {
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
        }
        
        .kd-tab.active {
          color: #fff;
          background: rgba(255,255,255,0.1);
          border-bottom: 2px solid ${APP.cfg.themeColor};
        }
        
        .kd-content {
          padding: 16px;
          max-height: 520px;
          overflow-y: auto;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        
        .kd-content.collapsed {
          max-height: 0;
          opacity: 0;
          padding: 0 16px;
        }
        
        .kd-section {
          margin-bottom: 20px;
          animation: fadeInUp 0.3s ease;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .kd-section-title {
          color: rgba(255,255,255,0.5);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .kd-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          margin: 2px 0;
          color: #fff;
          font-size: 12px;
        }
        
        .kd-option-label {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .kd-icon {
          width: 20px;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: ${APP.cfg.themeColor};
        }
        
        /* Modern Switch */
        .kd-switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 22px;
        }
        
        .kd-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .kd-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255,255,255,0.15);
          transition: .3s;
          border-radius: 22px;
        }
        
        .kd-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        
        input:checked + .kd-slider {
          background: ${APP.cfg.themeColor};
        }
        
        input:checked + .kd-slider:before {
          transform: translateX(18px);
        }
        
        /* Color Picker */
        .kd-color-preview {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: ${APP.cfg.themeColor};
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid rgba(255,255,255,0.2);
        }
        
        .kd-color-preview:hover {
          transform: scale(1.05);
          border-color: rgba(255,255,255,0.5);
        }
        
        .kd-color-input {
          position: absolute;
          opacity: 0;
          width: 32px;
          height: 32px;
          cursor: pointer;
        }
        
        /* Slider */
        .kd-slider-control {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .kd-range {
          flex: 1;
          height: 3px;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.15);
          border-radius: 3px;
          outline: none;
        }
        
        .kd-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${APP.cfg.themeColor};
          cursor: pointer;
          transition: 0.2s;
        }
        
        .kd-range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        
        .kd-value {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          min-width: 35px;
          text-align: right;
          font-family: monospace;
        }
        
        /* Preset Colors */
        .kd-presets {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          flex-wrap: wrap;
        }
        
        .kd-preset {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }
        
        .kd-preset:hover {
          transform: scale(1.08);
        }
        
        .kd-preset.active {
          border-color: white;
          box-shadow: 0 0 8px rgba(255,255,255,0.3);
        }
        
        /* Stats Cards */
        .kd-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
        }
        
        .kd-stat-card {
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .kd-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: ${APP.cfg.themeColor};
          font-family: monospace;
        }
        
        .kd-stat-label {
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .kd-footer {
          padding: 10px 16px;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          font-family: monospace;
        }
        
        .kd-footer a {
          color: ${APP.cfg.themeColor};
          text-decoration: none;
        }
        
        .kd-footer a:hover {
          text-decoration: underline;
        }
        
        /* Scrollbar */
        .kd-content::-webkit-scrollbar {
          width: 3px;
        }
        
        .kd-content::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        
        .kd-content::-webkit-scrollbar-thumb {
          background: ${APP.cfg.themeColor};
          border-radius: 3px;
        }
        
        button {
          background: none;
          border: none;
        }
        
        .kd-info-text {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          text-align: center;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
      </style>
      
      <div class="kd-header">
        <h3>
          <span>KHANDESTROYER</span>
          <span class="kd-version">v${APP.ver}</span>
        </h3>
      </div>
      
      <div class="kd-tabs">
        <button class="kd-tab active" data-tab="main">
          <span class="kd-icon">${Icons.auto}</span>
          <span>CORE</span>
        </button>
        <button class="kd-tab" data-tab="appearance">
          <span class="kd-icon">${Icons.theme}</span>
          <span>APPEARANCE</span>
        </button>
        <button class="kd-tab" data-tab="stats">
          <span class="kd-icon">${Icons.stats}</span>
          <span>STATS</span>
        </button>
      </div>
      
      <div class="kd-content">
        <!-- Core Tab -->
        <div class="kd-tab-content" data-tab="main" style="display: block;">
          <div class="kd-section">
            <div class="kd-section-title">
              <span>${Icons.auto}</span>
              <span>AUTOMATION</span>
            </div>
            <div class="kd-option">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.auto}</span>
                <span>Auto Complete</span>
              </div>
              <label class="kd-switch">
                <input type="checkbox" id="autoCheck">
                <span class="kd-slider"></span>
              </label>
            </div>
            
            <div class="kd-option" id="speedControlContainer" style="display: none;">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.speed}</span>
                <span>Processing Speed</span>
              </div>
              <div class="kd-slider-control">
                <input type="range" min="0" max="3" value="0" class="kd-range" id="speedSlider">
                <span class="kd-value" id="speedValue">750ms</span>
              </div>
            </div>
          </div>
          
          <div class="kd-section">
            <div class="kd-section-title">
              <span>${Icons.spoof}</span>
              <span>SECURITY</span>
            </div>
            <div class="kd-option">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.spoof}</span>
                <span>Question Spoofing</span>
              </div>
              <label class="kd-switch">
                <input type="checkbox" id="spoofCheck" checked>
                <span class="kd-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="kd-section">
            <div class="kd-section-title">
              <span>${Icons.dark}</span>
              <span>DISPLAY</span>
            </div>
            <div class="kd-option">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.dark}</span>
                <span>Dark Mode</span>
              </div>
              <label class="kd-switch">
                <input type="checkbox" id="darkModeCheck" checked>
                <span class="kd-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Appearance Tab -->
        <div class="kd-tab-content" data-tab="appearance" style="display: none;">
          <div class="kd-section">
            <div class="kd-section-title">
              <span>${Icons.theme}</span>
              <span>ACCENT COLOR</span>
            </div>
            <div class="kd-option">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.theme}</span>
                <span>Primary Color</span>
              </div>
              <div style="position: relative;">
                <div class="kd-color-preview" id="colorPreview"></div>
                <input type="color" id="colorPicker" class="kd-color-input" value="${APP.cfg.themeColor}">
              </div>
            </div>
            <div class="kd-presets" id="colorPresets">
              <div class="kd-preset" style="background: #7c4dff;" data-color="#7c4dff"></div>
              <div class="kd-preset" style="background: #ff4757;" data-color="#ff4757"></div>
              <div class="kd-preset" style="background: #00d2d3;" data-color="#00d2d3"></div>
              <div class="kd-preset" style="background: #feca57;" data-color="#feca57"></div>
              <div class="kd-preset" style="background: #48dbfb;" data-color="#48dbfb"></div>
              <div class="kd-preset" style="background: #ff9ff3;" data-color="#ff9ff3"></div>
            </div>
          </div>
          
          <div class="kd-section">
            <div class="kd-section-title">
              <span>${Icons.opacity}</span>
              <span>VISUAL SETTINGS</span>
            </div>
            <div class="kd-option">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.opacity}</span>
                <span>Menu Opacity</span>
              </div>
              <div class="kd-slider-control">
                <input type="range" min="0.7" max="1" step="0.01" value="${APP.cfg.menuOpacity}" class="kd-range" id="opacitySlider">
                <span class="kd-value" id="opacityValue">${Math.round(APP.cfg.menuOpacity * 100)}%</span>
              </div>
            </div>
            <div class="kd-option">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.animation}</span>
                <span>Animations</span>
              </div>
              <label class="kd-switch">
                <input type="checkbox" id="animationCheck" ${APP.cfg.showAnimations ? 'checked' : ''}>
                <span class="kd-slider"></span>
              </label>
            </div>
            <div class="kd-option">
              <div class="kd-option-label">
                <span class="kd-icon">${Icons.sound}</span>
                <span>Sound Effects</span>
              </div>
              <label class="kd-switch">
                <input type="checkbox" id="soundCheck" ${APP.cfg.soundEffects ? 'checked' : ''}>
                <span class="kd-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Stats Tab -->
        <div class="kd-tab-content" data-tab="stats" style="display: none;">
          <div class="kd-section">
            <div class="kd-section-title">
              <span>${Icons.stats}</span>
              <span>PERFORMANCE</span>
            </div>
            <div class="kd-stats">
              <div class="kd-stat-card">
                <div class="kd-stat-value" id="questionsBypassed">0</div>
                <div class="kd-stat-label">Questions Bypassed</div>
              </div>
              <div class="kd-stat-card">
                <div class="kd-stat-value" id="autoCompletions">0</div>
                <div class="kd-stat-label">Auto Completions</div>
              </div>
              <div class="kd-stat-card">
                <div class="kd-stat-value" id="uptime">0s</div>
                <div class="kd-stat-label">Uptime</div>
              </div>
              <div class="kd-stat-card">
                <div class="kd-stat-value" id="successRate">100%</div>
                <div class="kd-stat-label">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div class="kd-info-text">
            STATISTICS RESET ON PAGE RELOAD
          </div>
        </div>
      </div>
      
      <div class="kd-footer">
        <span>KHANDESTROYER // <a href="#" id="creditLink">iUnknownBr</a></span>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    // Initialize stats
    UI.stats = {
      questionsBypassed: 0,
      autoCompletions: 0,
      startTime: Date.now()
    };
    
    // Setup event listeners
    this.setupEventListeners(panel);
    
    // Initialize theme
    this.updateThemeColors(APP.cfg.themeColor);
  }
  
  static updateStats(type) {
    if (type === 'bypass') {
      UI.stats.questionsBypassed++;
      const el = document.getElementById('questionsBypassed');
      if (el) el.textContent = UI.stats.questionsBypassed;
    } else if (type === 'complete') {
      UI.stats.autoCompletions++;
      const el = document.getElementById('autoCompletions');
      if (el) el.textContent = UI.stats.autoCompletions;
    }
    
    // Update success rate
    const total = UI.stats.questionsBypassed + UI.stats.autoCompletions;
    const rate = total > 0 ? Math.round((UI.stats.autoCompletions / total) * 100) : 100;
    const rateEl = document.getElementById('successRate');
    if (rateEl) rateEl.textContent = `${rate}%`;
    
    // Update uptime
    setInterval(() => {
      const uptimeEl = document.getElementById('uptime');
      if (uptimeEl) {
        const seconds = Math.floor((Date.now() - UI.stats.startTime) / 1000);
        if (seconds < 60) uptimeEl.textContent = `${seconds}s`;
        else if (seconds < 3600) uptimeEl.textContent = `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
        else uptimeEl.textContent = `${Math.floor(seconds / 3600)}h`;
      }
    }, 1000);
  }
  
  static updateThemeColors(color) {
    const style = document.createElement('style');
    style.id = 'kd-dynamic-styles';
    const oldStyle = document.getElementById('kd-dynamic-styles');
    if (oldStyle) oldStyle.remove();
    
    style.textContent = `
      .kd-tab.active { border-bottom-color: ${color} !important; }
      input:checked + .kd-slider { background: ${color} !important; }
      .kd-range::-webkit-slider-thumb { background: ${color} !important; }
      .kd-icon { color: ${color} !important; }
      .kd-stat-value { color: ${color} !important; }
      .kd-footer a { color: ${color} !important; }
      .kd-content::-webkit-scrollbar-thumb { background: ${color} !important; }
      .kd-header { border-bottom-color: ${color}40 !important; }
    `;
    document.head.appendChild(style);
  }
  
  static setupEventListeners(panel) {
    // Header collapse
    const header = panel.querySelector('.kd-header');
    const content = panel.querySelector('.kd-content');
    
    header.addEventListener('click', () => {
      content.classList.toggle('collapsed');
      sendToast(content.classList.contains('collapsed') ? 'Menu minimized' : 'Menu expanded', 1000);
    });
    
    // Tab switching
    const tabs = panel.querySelectorAll('.kd-tab');
    const tabContents = panel.querySelectorAll('.kd-tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        tabContents.forEach(content => {
          content.style.display = content.dataset.tab === tabId ? 'block' : 'none';
        });
      });
    });
    
    // Auto complete
    const autoCheck = document.getElementById('autoCheck');
    const speedContainer = document.getElementById('speedControlContainer');
    
    autoCheck.onchange = event => {
      APP.cfg.auto = event.target.checked;
      speedContainer.style.display = APP.cfg.auto ? 'flex' : 'none';
      sendToast(APP.cfg.auto ? 'Auto Complete enabled' : 'Auto Complete disabled', 2000);
    };
    
    // Speed slider
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const initialIndex = APP.cfg.speedOptions.indexOf(APP.cfg.autoSpeed);
    speedSlider.value = initialIndex >= 0 ? initialIndex : 0;
    
    speedSlider.oninput = () => {
      const index = parseInt(speedSlider.value);
      const speed = APP.cfg.speedOptions[index];
      APP.cfg.autoSpeed = speed;
      speedValue.textContent = speed + 'ms';
    };
    
    speedSlider.onchange = () => {
      const index = parseInt(speedSlider.value);
      const speed = APP.cfg.speedOptions[index];
      sendToast(`Speed changed to ${speed}ms`, 2000);
    };
    
    // Question Spoof
    document.getElementById('spoofCheck').onchange = event => {
      APP.cfg.questionSpoof = event.target.checked;
      sendToast(APP.cfg.questionSpoof ? 'Question Spoofing enabled' : 'Question Spoofing disabled', 2000);
    };
    
    // Dark Mode
    document.getElementById('darkModeCheck').onchange = event => {
      APP.cfg.darkMode = event.target.checked;
      if (typeof DarkReader !== 'undefined') {
        if (APP.cfg.darkMode) {
          DarkReader.enable();
          sendToast('Dark Mode enabled', 2000);
        } else {
          DarkReader.disable();
          sendToast('Dark Mode disabled', 2000);
        }
      }
    };
    
    // Color picker
    const colorPicker = document.getElementById('colorPicker');
    const colorPreview = document.getElementById('colorPreview');
    
    colorPicker.onchange = event => {
      const color = event.target.value;
      APP.cfg.themeColor = color;
      colorPreview.style.background = color;
      this.updateThemeColors(color);
      sendToast('Theme color updated', 1500);
    };
    
    // Color presets
    const presets = panel.querySelectorAll('.kd-preset');
    presets.forEach(preset => {
      preset.addEventListener('click', () => {
        const color = preset.dataset.color;
        APP.cfg.themeColor = color;
        colorPicker.value = color;
        colorPreview.style.background = color;
        this.updateThemeColors(color);
        sendToast('Theme preset applied', 1500);
      });
    });
    
    // Opacity slider
    const opacitySlider = document.getElementById('opacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    
    opacitySlider.oninput = () => {
      const value = parseFloat(opacitySlider.value);
      APP.cfg.menuOpacity = value;
      opacityValue.textContent = Math.round(value * 100) + '%';
      document.getElementById('khanDestroyer-panel').style.background = `rgba(18, 18, 24, ${value})`;
    };
    
    // Animations
    document.getElementById('animationCheck').onchange = event => {
      APP.cfg.showAnimations = event.target.checked;
      sendToast(APP.cfg.showAnimations ? 'Animations enabled' : 'Animations disabled', 1500);
    };
    
    // Sound effects
    document.getElementById('soundCheck').onchange = event => {
      APP.cfg.soundEffects = event.target.checked;
      sendToast(APP.cfg.soundEffects ? 'Sound effects enabled' : 'Sound effects disabled', 1500);
    };
    
    // Credit link
    document.getElementById('creditLink').onclick = (e) => {
      e.preventDefault();
      window.open('https://guns.lol/iunknownbr', '_blank');
    };
    
    // Enable dark mode by default
    if (APP.cfg.darkMode && typeof DarkReader !== 'undefined') {
      DarkReader.enable();
    }
    
    // Initialize preview
    if (colorPreview) colorPreview.style.background = APP.cfg.themeColor;
  }
}

class Core {
  static init() {
    this.setupMod();
    this.setupAuto();
  }
  
  static async loadExternalLibraries() {
    try {
      await loadCss("https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css");
      await loadScript("https://cdn.jsdelivr.net/npm/toastify-js");
      await loadScript("https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js");
      
      if (typeof DarkReader !== 'undefined') {
        DarkReader.setFetchMethod(window.fetch);
        if (APP.cfg.darkMode) DarkReader.enable();
      }
      
      console.clear();
    } catch (error) {
      console.error("Error loading libraries:", error);
    }
  }
  
  static setupMod() {
    const messages = [
      "KHANDESTROYER ACTIVE // SYSTEM BYPASS",
      "SECURITY MODULE // UNAUTHORIZED ACCESS"
    ];
    
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
      const response = await originalFetch.apply(this, args);
      const clone = response.clone();
      
      try {
        const text = await clone.text();
        let data = JSON.parse(text);
        
        if (data?.data?.assessmentItem?.item?.itemData) {
          let itemData = JSON.parse(data.data.assessmentItem.item.itemData);
          
          if (itemData.question.content[0] === itemData.question.content[0].toUpperCase() && APP.cfg.questionSpoof) {
            itemData.answerArea = { calculator: false };
            itemData.question.content = messages[Math.floor(Math.random() * messages.length)] + "[[radio 1]]";
            itemData.question.widgets = {
              "radio 1": {
                type: "radio",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                  choices: [{ content: "✓", correct: true }],
                  randomize: false,
                  multipleSelect: false,
                  displayCount: null,
                  hasNoneOfTheAbove: false,
                  onePerLine: true,
                  deselectEnabled: false
                }
              }
            };
            
            data.data.assessmentItem.item.itemData = JSON.stringify(itemData);
            sendToast("Question bypassed", 1000);
            if (UI.updateStats) UI.updateStats('bypass');
            
            return new Response(JSON.stringify(data), {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers
            });
          }
        }
      } catch (e) {}
      
      return response;
    };
  }
  
  static async setupAuto() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const classNames = ["_1tuo6xk", "_ssxvf9l", "_1f0fvyce", "_rz7ls7u", "_1yok8f4", "_1e5cuk2a", "_s6zfc1u", "_4i5p5ae", "_1r8cd7xe"];
    const checkAnswerSelector = "[data-testid=\"exercise-check-answer\"]";
    
    function findAndClickByClass(className) {
      const element = document.getElementsByClassName(className)[0];
      if (element) {
        element.click();
        if (element.textContent === "Mostrar resumo") {
          sendToast("Exercise completed", 3000);
          if (UI.updateStats) UI.updateStats('complete');
          playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav");
        }
      }
      return !!element;
    }
    
    async function processElements() {
      if (!APP.cfg.auto) return;
      
      for (const className of classNames) {
        findAndClickByClass(className);
        await delay(APP.cfg.autoSpeed / 5);
      }
      
      const checkAnswerButton = document.querySelector(checkAnswerSelector);
      if (checkAnswerButton) {
        checkAnswerButton.click();
        await delay(APP.cfg.autoSpeed / 5);
      }
    }
    
    while (true) {
      await processElements();
      await delay(APP.cfg.autoSpeed / 3);
    }
  }
}

// Initialize application
async function initApp() {
  try {
    await Core.loadExternalLibraries();
    UI.init();
    Core.init();
    console.log(`KhanDestroyer v${APP.ver} initialized`);
    sendToast(`KhanDestroyer v${APP.ver} active`, 2000);
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

initApp();
