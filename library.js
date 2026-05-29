const AICODE = {
  ver: "2.0.0",
  name: "AICODE",
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
    soundEffects: true,
    menuKeybind: "KeyM",
    menuPosition: { x: window.innerWidth - 380, y: window.innerHeight / 2 - 300 },
    menuVisible: true
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
      style: { background: AICODE.cfg.themeColor, borderRadius: "8px" }
    }).showToast();
  } else {
    console.log("Toast:", message);
  }
}

// Audio player function
const playAudio = src => {
  if (AICODE.cfg.soundEffects) {
    new Audio(src).play().catch(() => {});
  }
};

// Icon SVG definitions
const Icons = {
  auto: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  speed: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  spoof: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>',
  dark: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  theme: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.2l.07-.08z"/></svg>',
  opacity: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/></svg>',
  animation: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  sound: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  stats: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  keybind: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
  move: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
  close: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  minimize: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>'
};

class ColorPickerHSV {
  constructor(container, initialColor, onColorChange) {
    this.container = container;
    this.onColorChange = onColorChange;
    this.hue = 0;
    this.saturation = 1;
    this.value = 1;
    this.alpha = 1;
    
    this.init(initialColor);
  }
  
  init(initialColor) {
    // Parse initial color
    if (initialColor) {
      const rgb = this.hexToRgb(initialColor);
      const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
      this.hue = hsv.h;
      this.saturation = hsv.s;
      this.value = hsv.v;
    }
    
    this.createUI();
  }
  
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }
  
  rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h, s, v };
  }
  
  hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      default: r = v; g = p; b = q; break;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }
  
  createUI() {
    this.container.innerHTML = `
      <style>
        .hsv-color-preview {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          background: ${this.getColorHex()};
          margin-bottom: 12px;
          border: 2px solid rgba(255,255,255,0.2);
        }
        .hsv-hue-slider, .hsv-alpha-slider {
          margin: 10px 0;
        }
        .hsv-slider-label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 5px;
          display: flex;
          justify-content: space-between;
        }
        .hsv-slider-track {
          height: 8px;
          border-radius: 4px;
          position: relative;
          cursor: pointer;
        }
        .hsv-hue-track {
          background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
        }
        .hsv-sv-panel {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 8px;
          position: relative;
          cursor: crosshair;
          margin-bottom: 12px;
          background: linear-gradient(to right, white, transparent);
        }
        .hsv-sv-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent, black);
          border-radius: 8px;
          pointer-events: none;
        }
        .hsv-sv-cursor {
          position: absolute;
          width: 10px;
          height: 10px;
          border: 2px solid white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          box-shadow: 0 0 4px rgba(0,0,0,0.5);
        }
        .hsv-hue-cursor, .hsv-alpha-cursor {
          position: absolute;
          width: 4px;
          height: 100%;
          background: white;
          border-radius: 2px;
          transform: translateX(-50%);
          pointer-events: none;
          box-shadow: 0 0 2px rgba(0,0,0,0.5);
        }
        .hsv-alpha-track {
          background: linear-gradient(to right, transparent, ${this.getColorHex()});
        }
        .hsv-rgb-inputs {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }
        .hsv-rgb-input {
          flex: 1;
        }
        .hsv-rgb-input input {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 4px 6px;
          color: white;
          font-size: 11px;
          text-align: center;
        }
        .hsv-rgb-input label {
          font-size: 9px;
          color: rgba(255,255,255,0.5);
          display: block;
          text-align: center;
          margin-bottom: 2px;
        }
      </style>
      <div class="hsv-sv-panel" id="hsvSvPanel">
        <div class="hsv-sv-cursor" id="hsvSvCursor"></div>
      </div>
      <div class="hsv-hue-slider">
        <div class="hsv-slider-label">
          <span>Hue</span>
          <span>${Math.round(this.hue * 360)}°</span>
        </div>
        <div class="hsv-slider-track hsv-hue-track" id="hsvHueTrack">
          <div class="hsv-hue-cursor" id="hsvHueCursor"></div>
        </div>
      </div>
      <div class="hsv-saturation-value">
        <div class="hsv-slider-label">
          <span>Saturation: ${Math.round(this.saturation * 100)}%</span>
          <span>Value: ${Math.round(this.value * 100)}%</span>
        </div>
      </div>
      <div class="hsv-alpha-slider" id="hsvAlphaContainer">
        <div class="hsv-slider-label">
          <span>Alpha</span>
          <span>${Math.round(this.alpha * 100)}%</span>
        </div>
        <div class="hsv-slider-track hsv-alpha-track" id="hsvAlphaTrack">
          <div class="hsv-alpha-cursor" id="hsvAlphaCursor"></div>
        </div>
      </div>
      <div class="hsv-color-preview" id="hsvColorPreview"></div>
      <div class="hsv-rgb-inputs">
        <div class="hsv-rgb-input">
          <label>R</label>
          <input type="number" id="hsvRInput" min="0" max="255" value="${this.getRgb().r}">
        </div>
        <div class="hsv-rgb-input">
          <label>G</label>
          <input type="number" id="hsvGInput" min="0" max="255" value="${this.getRgb().g}">
        </div>
        <div class="hsv-rgb-input">
          <label>B</label>
          <input type="number" id="hsvBInput" min="0" max="255" value="${this.getRgb().b}">
        </div>
      </div>
      <div class="hsv-rgb-inputs">
        <div class="hsv-rgb-input" style="flex: 2">
          <label>HEX</label>
          <input type="text" id="hsvHexInput" value="${this.getColorHex()}">
        </div>
      </div>
    `;
    
    this.setupEvents();
    this.updateUI();
  }
  
  getColorHex() {
    const rgb = this.hsvToRgb(this.hue, this.saturation, this.value);
    return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
  }
  
  getRgb() {
    return this.hsvToRgb(this.hue, this.saturation, this.value);
  }
  
  getColor() {
    const rgb = this.getRgb();
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha})`;
  }
  
  updateUI() {
    const svPanel = document.getElementById('hsvSvPanel');
    const svCursor = document.getElementById('hsvSvCursor');
    const hueCursor = document.getElementById('hsvHueCursor');
    const alphaCursor = document.getElementById('hsvAlphaCursor');
    const colorPreview = document.getElementById('hsvColorPreview');
    const alphaTrack = document.getElementById('hsvAlphaTrack');
    const hueTrack = document.getElementById('hsvHueTrack');
    
    if (svPanel && svCursor) {
      const rect = svPanel.getBoundingClientRect();
      const x = this.saturation * rect.width;
      const y = (1 - this.value) * rect.height;
      svCursor.style.left = `${x}px`;
      svCursor.style.top = `${y}px`;
      svPanel.style.backgroundColor = this.hsvToRgbHex(this.hue, 1, 1);
    }
    
    if (hueTrack && hueCursor) {
      const rect = hueTrack.getBoundingClientRect();
      hueCursor.style.left = `${this.hue * rect.width}px`;
    }
    
    if (alphaTrack && alphaCursor) {
      const rect = alphaTrack.getBoundingClientRect();
      alphaCursor.style.left = `${this.alpha * rect.width}px`;
      alphaTrack.style.background = `linear-gradient(to right, transparent, ${this.getColorHex()})`;
    }
    
    if (colorPreview) {
      colorPreview.style.background = this.getColor();
    }
    
    const rgb = this.getRgb();
    const rInput = document.getElementById('hsvRInput');
    const gInput = document.getElementById('hsvGInput');
    const bInput = document.getElementById('hsvBInput');
    const hexInput = document.getElementById('hsvHexInput');
    
    if (rInput) rInput.value = rgb.r;
    if (gInput) gInput.value = rgb.g;
    if (bInput) bInput.value = rgb.b;
    if (hexInput) hexInput.value = this.getColorHex();
    
    if (this.onColorChange) {
      this.onColorChange(this.getColor(), this.getColorHex());
    }
  }
  
  hsvToRgbHex(h, s, v) {
    const rgb = this.hsvToRgb(h, s, v);
    return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
  }
  
  setupEvents() {
    const svPanel = document.getElementById('hsvSvPanel');
    const hueTrack = document.getElementById('hsvHueTrack');
    const alphaTrack = document.getElementById('hsvAlphaTrack');
    const rInput = document.getElementById('hsvRInput');
    const gInput = document.getElementById('hsvGInput');
    const bInput = document.getElementById('hsvBInput');
    const hexInput = document.getElementById('hsvHexInput');
    
    let isDraggingSV = false;
    let isDraggingHue = false;
    let isDraggingAlpha = false;
    
    if (svPanel) {
      svPanel.addEventListener('mousedown', (e) => {
        isDraggingSV = true;
        this.updateSV(e);
      });
      window.addEventListener('mousemove', (e) => {
        if (isDraggingSV) this.updateSV(e);
      });
      window.addEventListener('mouseup', () => {
        isDraggingSV = false;
      });
    }
    
    if (hueTrack) {
      hueTrack.addEventListener('mousedown', (e) => {
        isDraggingHue = true;
        this.updateHue(e);
      });
      window.addEventListener('mousemove', (e) => {
        if (isDraggingHue) this.updateHue(e);
      });
      window.addEventListener('mouseup', () => {
        isDraggingHue = false;
      });
    }
    
    if (alphaTrack) {
      alphaTrack.addEventListener('mousedown', (e) => {
        isDraggingAlpha = true;
        this.updateAlpha(e);
      });
      window.addEventListener('mousemove', (e) => {
        if (isDraggingAlpha) this.updateAlpha(e);
      });
      window.addEventListener('mouseup', () => {
        isDraggingAlpha = false;
      });
    }
    
    if (rInput) {
      rInput.addEventListener('change', () => {
        const rgb = this.hexToRgb(this.getColorHex());
        const hsv = this.rgbToHsv(parseInt(rInput.value), parseInt(gInput.value), parseInt(bInput.value));
        this.hue = hsv.h;
        this.saturation = hsv.s;
        this.value = hsv.v;
        this.updateUI();
      });
    }
    
    if (hexInput) {
      hexInput.addEventListener('change', () => {
        const rgb = this.hexToRgb(hexInput.value);
        const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
        this.hue = hsv.h;
        this.saturation = hsv.s;
        this.value = hsv.v;
        this.updateUI();
      });
    }
  }
  
  updateSV(e) {
    const svPanel = document.getElementById('hsvSvPanel');
    const rect = svPanel.getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    let y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    this.saturation = x / rect.width;
    this.value = 1 - (y / rect.height);
    this.updateUI();
  }
  
  updateHue(e) {
    const hueTrack = document.getElementById('hsvHueTrack');
    const rect = hueTrack.getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    this.hue = x / rect.width;
    this.updateUI();
  }
  
  updateAlpha(e) {
    const alphaTrack = document.getElementById('hsvAlphaTrack');
    const rect = alphaTrack.getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    this.alpha = x / rect.width;
    this.updateUI();
  }
  
  setColor(hex) {
    const rgb = this.hexToRgb(hex);
    const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
    this.hue = hsv.h;
    this.saturation = hsv.s;
    this.value = hsv.v;
    this.updateUI();
  }
}

class UI {
  static init() {
    const panel = document.createElement("div");
    panel.id = "aiCodePanel";
    
    Object.assign(panel.style, {
      position: "fixed",
      left: `${AICODE.cfg.menuPosition.x}px`,
      top: `${AICODE.cfg.menuPosition.y}px`,
      width: "360px",
      background: `rgba(14, 14, 18, ${AICODE.cfg.menuOpacity})`,
      backdropFilter: "blur(16px)",
      borderRadius: "12px",
      display: AICODE.cfg.menuVisible ? "flex" : "none",
      flexDirection: "column",
      zIndex: "9999",
      boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${AICODE.cfg.themeColor}40`,
      border: "none",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      overflow: "hidden",
      transition: AICODE.cfg.showAnimations ? "all 0.2s ease" : "none",
      cursor: "default",
      userSelect: "none"
    });
    
    panel.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .ai-header {
          background: linear-gradient(135deg, ${AICODE.cfg.themeColor}20, ${AICODE.cfg.themeColor}05);
          padding: 12px 16px;
          border-bottom: 1px solid ${AICODE.cfg.themeColor}40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: move;
        }
        
        .ai-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .ai-logo {
          width: 28px;
          height: 28px;
          background: ${AICODE.cfg.themeColor};
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }
        
        .ai-title {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.3px;
        }
        
        .ai-version {
          font-size: 9px;
          background: ${AICODE.cfg.themeColor}30;
          padding: 2px 6px;
          border-radius: 8px;
          font-family: monospace;
        }
        
        .ai-header-actions {
          display: flex;
          gap: 8px;
        }
        
        .ai-action-btn {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: rgba(255,255,255,0.6);
        }
        
        .ai-action-btn:hover {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
        }
        
        .ai-tabs {
          display: flex;
          padding: 8px 12px 0 12px;
          gap: 4px;
          background: rgba(0,0,0,0.2);
        }
        
        .ai-tab {
          flex: 1;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
          transition: all 0.2s ease;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          letter-spacing: 0.5px;
        }
        
        .ai-tab:hover {
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
        }
        
        .ai-tab.active {
          color: #fff;
          background: rgba(255,255,255,0.1);
          border-bottom: 2px solid ${AICODE.cfg.themeColor};
        }
        
        .ai-content {
          padding: 16px;
          max-height: 480px;
          overflow-y: auto;
        }
        
        .ai-content.collapsed {
          display: none;
        }
        
        .ai-section {
          margin-bottom: 20px;
        }
        
        .ai-section-title {
          color: rgba(255,255,255,0.4);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .ai-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          margin: 2px 0;
          color: #fff;
          font-size: 12px;
        }
        
        .ai-option-label {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .ai-icon {
          width: 20px;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: ${AICODE.cfg.themeColor};
        }
        
        .ai-switch {
          position: relative;
          display: inline-block;
          width: 38px;
          height: 20px;
        }
        
        .ai-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .ai-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255,255,255,0.15);
          transition: .3s;
          border-radius: 20px;
        }
        
        .ai-slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        
        input:checked + .ai-slider {
          background: ${AICODE.cfg.themeColor};
        }
        
        input:checked + .ai-slider:before {
          transform: translateX(18px);
        }
        
        .ai-slider-control {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .ai-range {
          flex: 1;
          height: 3px;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.15);
          border-radius: 3px;
          outline: none;
        }
        
        .ai-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${AICODE.cfg.themeColor};
          cursor: pointer;
          transition: 0.2s;
        }
        
        .ai-value {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          min-width: 35px;
          text-align: right;
          font-family: monospace;
        }
        
        .ai-keybind-input {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 11px;
          color: #fff;
          font-family: monospace;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 80px;
          text-align: center;
        }
        
        .ai-keybind-input.active {
          border-color: ${AICODE.cfg.themeColor};
          background: ${AICODE.cfg.themeColor}20;
        }
        
        .ai-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
        }
        
        .ai-stat-card {
          background: rgba(255,255,255,0.04);
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .ai-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: ${AICODE.cfg.themeColor};
          font-family: monospace;
        }
        
        .ai-stat-label {
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .ai-footer {
          padding: 10px 16px;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          font-size: 9px;
          color: rgba(255,255,255,0.3);
          font-family: monospace;
        }
        
        .ai-footer a {
          color: ${AICODE.cfg.themeColor};
          text-decoration: none;
        }
        
        .ai-content::-webkit-scrollbar {
          width: 3px;
        }
        
        .ai-content::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        
        .ai-content::-webkit-scrollbar-thumb {
          background: ${AICODE.cfg.themeColor};
          border-radius: 3px;
        }
        
        .ai-badge {
          background: ${AICODE.cfg.themeColor}20;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 9px;
          color: ${AICODE.cfg.themeColor};
        }
        
        .ai-color-preview {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.2);
          transition: all 0.2s ease;
        }
        
        .ai-color-preview:hover {
          transform: scale(1.05);
          border-color: rgba(255,255,255,0.5);
        }
        
        .ai-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        
        .ai-modal-content {
          background: rgba(20, 20, 25, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 16px;
          width: 320px;
          padding: 20px;
          border: 1px solid ${AICODE.cfg.themeColor}40;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .ai-modal-header {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #fff;
        }
        
        .ai-modal-close {
          float: right;
          cursor: pointer;
          opacity: 0.6;
        }
        
        .ai-modal-close:hover { opacity: 1; }
      </style>
      
      <div class="ai-header" id="aiDragHandle">
        <div class="ai-header-left">
          <div class="ai-logo">AC</div>
          <span class="ai-title">AICODE</span>
          <span class="ai-version">v${AICODE.ver}</span>
        </div>
        <div class="ai-header-actions">
          <div class="ai-action-btn" id="aiMinimizeBtn">${Icons.minimize}</div>
          <div class="ai-action-btn" id="aiCloseBtn">${Icons.close}</div>
        </div>
      </div>
      
      <div class="ai-tabs">
        <button class="ai-tab active" data-tab="core">
          <span class="ai-icon">${Icons.auto}</span>
          <span>CORE</span>
        </button>
        <button class="ai-tab" data-tab="visual">
          <span class="ai-icon">${Icons.theme}</span>
          <span>VISUAL</span>
        </button>
        <button class="ai-tab" data-tab="stats">
          <span class="ai-icon">${Icons.stats}</span>
          <span>STATS</span>
        </button>
      </div>
      
      <div class="ai-content" id="aiContent">
        <!-- Core Tab -->
        <div class="ai-tab-content" data-tab="core" style="display: block;">
          <div class="ai-section">
            <div class="ai-section-title">
              <span>${Icons.auto}</span>
              <span>AUTOMATION</span>
            </div>
            <div class="ai-option">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.auto}</span>
                <span>Auto Complete</span>
              </div>
              <label class="ai-switch">
                <input type="checkbox" id="autoCheck">
                <span class="ai-slider"></span>
              </label>
            </div>
            <div class="ai-option" id="speedControlContainer" style="display: none;">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.speed}</span>
                <span>Process Speed</span>
              </div>
              <div class="ai-slider-control">
                <input type="range" min="0" max="3" value="0" class="ai-range" id="speedSlider">
                <span class="ai-value" id="speedValue">750ms</span>
              </div>
            </div>
          </div>
          
          <div class="ai-section">
            <div class="ai-section-title">
              <span>${Icons.spoof}</span>
              <span>SECURITY</span>
            </div>
            <div class="ai-option">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.spoof}</span>
                <span>Question Spoof</span>
              </div>
              <label class="ai-switch">
                <input type="checkbox" id="spoofCheck" checked>
                <span class="ai-slider"></span>
              </label>
            </div>
            <div class="ai-option">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.dark}</span>
                <span>Dark Mode</span>
              </div>
              <label class="ai-switch">
                <input type="checkbox" id="darkModeCheck" checked>
                <span class="ai-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Visual Tab -->
        <div class="ai-tab-content" data-tab="visual" style="display: none;">
          <div class="ai-section">
            <div class="ai-section-title">
              <span>${Icons.theme}</span>
              <span>APPEARANCE</span>
            </div>
            <div class="ai-option">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.theme}</span>
                <span>Accent Color</span>
              </div>
              <div class="ai-color-preview" id="colorPreviewBtn" style="background: ${AICODE.cfg.themeColor}"></div>
            </div>
            <div class="ai-option">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.opacity}</span>
                <span>Opacity</span>
              </div>
              <div class="ai-slider-control">
                <input type="range" min="0.7" max="1" step="0.01" value="${AICODE.cfg.menuOpacity}" class="ai-range" id="opacitySlider">
                <span class="ai-value" id="opacityValue">${Math.round(AICODE.cfg.menuOpacity * 100)}%</span>
              </div>
            </div>
            <div class="ai-option">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.animation}</span>
                <span>Animations</span>
              </div>
              <label class="ai-switch">
                <input type="checkbox" id="animationCheck" ${AICODE.cfg.showAnimations ? 'checked' : ''}>
                <span class="ai-slider"></span>
              </label>
            </div>
          </div>
          
          <div class="ai-section">
            <div class="ai-section-title">
              <span>${Icons.keybind}</span>
              <span>CONTROLS</span>
            </div>
            <div class="ai-option">
              <div class="ai-option-label">
                <span class="ai-icon">${Icons.keybind}</span>
                <span>Menu Toggle</span>
              </div>
              <div class="ai-keybind-input" id="keybindBtn">${AICODE.cfg.menuKeybind.replace('Key', '')}</div>
            </div>
          </div>
        </div>
        
        <!-- Stats Tab -->
        <div class="ai-tab-content" data-tab="stats" style="display: none;">
          <div class="ai-section">
            <div class="ai-section-title">
              <span>${Icons.stats}</span>
              <span>PERFORMANCE</span>
            </div>
            <div class="ai-stats">
              <div class="ai-stat-card">
                <div class="ai-stat-value" id="questionsBypassed">0</div>
                <div class="ai-stat-label">Bypassed</div>
              </div>
              <div class="ai-stat-card">
                <div class="ai-stat-value" id="autoCompletions">0</div>
                <div class="ai-stat-label">Completed</div>
              </div>
              <div class="ai-stat-card">
                <div class="ai-stat-value" id="uptime">0s</div>
                <div class="ai-stat-label">Uptime</div>
              </div>
              <div class="ai-stat-card">
                <div class="ai-stat-value" id="successRate">100%</div>
                <div class="ai-stat-label">Success</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="ai-footer">
        <span>AICODE v${AICODE.ver} // <a href="#" id="creditLink">iUnknownBr</a></span>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    UI.stats = {
      questionsBypassed: 0,
      autoCompletions: 0,
      startTime: Date.now()
    };
    
    UI.panel = panel;
    UI.setupDragEvents();
    UI.setupEventListeners();
    UI.startUptimeCounter();
    UI.updateThemeColors(AICODE.cfg.themeColor);
  }
  
  static setupDragEvents() {
    const dragHandle = document.getElementById('aiDragHandle');
    const panel = UI.panel;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let panelStart = { left: 0, top: 0 };
    
    dragHandle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.ai-header-actions')) return;
      isDragging = true;
      dragStart = { x: e.clientX, y: e.clientY };
      panelStart = {
        left: parseInt(panel.style.left),
        top: parseInt(panel.style.top)
      };
      panel.style.cursor = 'grabbing';
      e.preventDefault();
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      let newLeft = panelStart.left + dx;
      let newTop = panelStart.top + dy;
      newLeft = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, newLeft));
      newTop = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, newTop));
      panel.style.left = `${newLeft}px`;
      panel.style.top = `${newTop}px`;
      AICODE.cfg.menuPosition = { x: newLeft, y: newTop };
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
      panel.style.cursor = '';
    });
  }
  
  static setupEventListeners() {
    // Minimize
    const minimizeBtn = document.getElementById('aiMinimizeBtn');
    let isMinimized = false;
    minimizeBtn.addEventListener('click', () => {
      const content = document.getElementById('aiContent');
      isMinimized = !isMinimized;
      content.classList.toggle('collapsed');
      sendToast(isMinimized ? 'Menu minimized' : 'Menu expanded', 1000);
    });
    
    // Close/Hide
    const closeBtn = document.getElementById('aiCloseBtn');
    closeBtn.addEventListener('click', () => {
      UI.panel.style.display = 'none';
      AICODE.cfg.menuVisible = false;
      sendToast('Menu hidden. Press ' + AICODE.cfg.menuKeybind.replace('Key', '') + ' to show', 2000);
    });
    
    // Tabs
    const tabs = document.querySelectorAll('.ai-tab');
    const tabContents = document.querySelectorAll('.ai-tab-content');
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
    
    // Auto Complete
    const autoCheck = document.getElementById('autoCheck');
    const speedContainer = document.getElementById('speedControlContainer');
    autoCheck.onchange = event => {
      AICODE.cfg.auto = event.target.checked;
      speedContainer.style.display = AICODE.cfg.auto ? 'flex' : 'none';
      sendToast(AICODE.cfg.auto ? 'Auto Complete enabled' : 'Auto Complete disabled', 2000);
    };
    
    // Speed Slider
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    const initialIndex = AICODE.cfg.speedOptions.indexOf(AICODE.cfg.autoSpeed);
    speedSlider.value = initialIndex >= 0 ? initialIndex : 0;
    speedSlider.oninput = () => {
      const index = parseInt(speedSlider.value);
      const speed = AICODE.cfg.speedOptions[index];
      AICODE.cfg.autoSpeed = speed;
      speedValue.textContent = speed + 'ms';
    };
    
    // Spoof
    document.getElementById('spoofCheck').onchange = event => {
      AICODE.cfg.questionSpoof = event.target.checked;
      sendToast(AICODE.cfg.questionSpoof ? 'Question Spoof enabled' : 'Question Spoof disabled', 2000);
    };
    
    // Dark Mode
    document.getElementById('darkModeCheck').onchange = event => {
      AICODE.cfg.darkMode = event.target.checked;
      if (typeof DarkReader !== 'undefined') {
        AICODE.cfg.darkMode ? DarkReader.enable() : DarkReader.disable();
        sendToast(AICODE.cfg.darkMode ? 'Dark Mode enabled' : 'Dark Mode disabled', 2000);
      }
    };
    
    // Opacity
    const opacitySlider = document.getElementById('opacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    opacitySlider.oninput = () => {
      const value = parseFloat(opacitySlider.value);
      AICODE.cfg.menuOpacity = value;
      opacityValue.textContent = Math.round(value * 100) + '%';
      UI.panel.style.background = `rgba(14, 14, 18, ${value})`;
    };
    
    // Animations
    document.getElementById('animationCheck').onchange = event => {
      AICODE.cfg.showAnimations = event.target.checked;
      UI.panel.style.transition = AICODE.cfg.showAnimations ? 'all 0.2s ease' : 'none';
    };
    
    // Color Picker Modal
    const colorPreviewBtn = document.getElementById('colorPreviewBtn');
    colorPreviewBtn.addEventListener('click', () => {
      UI.showColorPickerModal();
    });
    
    // Keybind
    const keybindBtn = document.getElementById('keybindBtn');
    let isListening = false;
    keybindBtn.addEventListener('click', () => {
      if (isListening) return;
      isListening = true;
      keybindBtn.classList.add('active');
      keybindBtn.textContent = '...';
      const handler = (e) => {
        if (e.code.startsWith('Key')) {
          AICODE.cfg.menuKeybind = e.code;
          keybindBtn.textContent = e.code.replace('Key', '');
          keybindBtn.classList.remove('active');
          isListening = false;
          window.removeEventListener('keydown', handler);
          sendToast(`Menu keybind changed to ${e.code.replace('Key', '')}`, 2000);
        }
      };
      window.addEventListener('keydown', handler);
      setTimeout(() => {
        if (isListening) {
          keybindBtn.textContent = AICODE.cfg.menuKeybind.replace('Key', '');
          keybindBtn.classList.remove('active');
          isListening = false;
        }
      }, 5000);
    });
    
    // Global keybind for menu toggle
    window.addEventListener('keydown', (e) => {
      if (e.code === AICODE.cfg.menuKeybind) {
        if (UI.panel.style.display === 'none') {
          UI.panel.style.display = 'flex';
          AICODE.cfg.menuVisible = true;
          sendToast('Menu shown', 1000);
        } else {
          UI.panel.style.display = 'none';
          AICODE.cfg.menuVisible = false;
        }
      }
    });
    
    // Credit link
    document.getElementById('creditLink').onclick = (e) => {
      e.preventDefault();
      window.open('https://guns.lol/iunknownbr', '_blank');
    };
    
    // Init dark mode
    if (AICODE.cfg.darkMode && typeof DarkReader !== 'undefined') {
      DarkReader.enable();
    }
  }
  
  static showColorPickerModal() {
    const modal = document.createElement('div');
    modal.className = 'ai-modal';
    modal.innerHTML = `
      <div class="ai-modal-content">
        <div class="ai-modal-header">
          <span>Color Picker</span>
          <span class="ai-modal-close" id="modalClose">✕</span>
        </div>
        <div id="hsvColorPickerContainer"></div>
      </div>
    `;
    document.body.appendChild(modal);
    
    const container = document.getElementById('hsvColorPickerContainer');
    const picker = new ColorPickerHSV(container, AICODE.cfg.themeColor, (color, hex) => {
      AICODE.cfg.themeColor = hex;
      const preview = document.getElementById('colorPreviewBtn');
      if (preview) preview.style.background = hex;
      UI.updateThemeColors(hex);
      sendToast('Theme color updated', 1500);
    });
    
    const closeBtn = modal.querySelector('#modalClose');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  }
  
  static updateThemeColors(color) {
    const style = document.createElement('style');
    style.id = 'ai-dynamic-styles';
    const oldStyle = document.getElementById('ai-dynamic-styles');
    if (oldStyle) oldStyle.remove();
    style.textContent = `
      .ai-tab.active { border-bottom-color: ${color} !important; }
      input:checked + .ai-slider { background: ${color} !important; }
      .ai-range::-webkit-slider-thumb { background: ${color} !important; }
      .ai-icon { color: ${color} !important; }
      .ai-stat-value { color: ${color} !important; }
      .ai-footer a { color: ${color} !important; }
      .ai-content::-webkit-scrollbar-thumb { background: ${color} !important; }
      .ai-header { border-bottom-color: ${color}40 !important; }
      .ai-logo { background: ${color} !important; }
      .ai-keybind-input.active { border-color: ${color} !important; background: ${color}20 !important; }
    `;
    document.head.appendChild(style);
  }
  
  static startUptimeCounter() {
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
    const total = UI.stats.questionsBypassed + UI.stats.autoCompletions;
    const rate = total > 0 ? Math.round((UI.stats.autoCompletions / total) * 100) : 100;
    const rateEl = document.getElementById('successRate');
    if (rateEl) rateEl.textContent = `${rate}%`;
  }
}

class Core {
  static async loadExternalLibraries() {
    try {
      await loadCss("https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css");
      await loadScript("https://cdn.jsdelivr.net/npm/toastify-js");
      await loadScript("https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js");
      if (typeof DarkReader !== 'undefined') {
        DarkReader.setFetchMethod(window.fetch);
        if (AICODE.cfg.darkMode) DarkReader.enable();
      }
      console.clear();
    } catch (error) {
      console.error("Error loading libraries:", error);
    }
  }
  
  static init() {
    this.setupMod();
    this.setupAuto();
  }
  
  static setupMod() {
    const messages = [
      "AICODE ACTIVE // SECURE BYPASS",
      "SYSTEM PROTECTED // UNAUTHORIZED"
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
          if (itemData.question.content[0] === itemData.question.content[0].toUpperCase() && AICODE.cfg.questionSpoof) {
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
      if (!AICODE.cfg.auto) return;
      for (const className of classNames) {
        findAndClickByClass(className);
        await delay(AICODE.cfg.autoSpeed / 5);
      }
      const checkAnswerButton = document.querySelector(checkAnswerSelector);
      if (checkAnswerButton) {
        checkAnswerButton.click();
        await delay(AICODE.cfg.autoSpeed / 5);
      }
    }
    
    while (true) {
      await processElements();
      await delay(AICODE.cfg.autoSpeed / 3);
    }
  }
}

async function initApp() {
  try {
    await Core.loadExternalLibraries();
    UI.init();
    Core.init();
    console.log(`AICODE v${AICODE.ver} initialized`);
    sendToast(`AICODE v${AICODE.ver} active`, 2000);
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

initApp();
