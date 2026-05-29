const AICODE = {
  ver: "2.0.0",
  name: "AICODE",
  cfg: {
    mod: true,
    auto: false,
    questionSpoof: true,
    darkMode: true,
    autoSpeed: 750,
    speedOptions: [750, 1000, 1250, 1500],
    themeColor: "#007aff",
    menuOpacity: 0.92,
    showAnimations: true,
    soundEffects: true,
    menuKeybind: "KeyM",
    menuPosition: { x: window.innerWidth - 420, y: window.innerHeight / 2 - 320 },
    menuVisible: true,
    sidebarExpanded: true,
    notificationsEnabled: true,
    animationsSpeed: 0.2
  },
  stats: {
    questionsBypassed: 0,
    autoCompletions: 0,
    startTime: Date.now()
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

function sendToast(message, duration = 4000, position = "bottom") {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration,
      gravity: position,
      position: "center",
      stopOnFocus: true,
      style: { background: "#2c2c2e", borderRadius: "12px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", fontSize: "13px", backdropFilter: "blur(20px)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }
    }).showToast();
  } else {
    console.log("Toast:", message);
  }
}

const playAudio = src => {
  if (AICODE.cfg.soundEffects) {
    new Audio(src).play().catch(() => {});
  }
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
  
  getColorHex() {
    const rgb = this.hsvToRgb(this.hue, this.saturation, this.value);
    return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
  }
  
  getColor() {
    const rgb = this.getRgb();
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha})`;
  }
  
  getRgb() {
    return this.hsvToRgb(this.hue, this.saturation, this.value);
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
      if (rect.width > 0) {
        const x = this.saturation * rect.width;
        const y = (1 - this.value) * rect.height;
        svCursor.style.left = `${x}px`;
        svCursor.style.top = `${y}px`;
        svPanel.style.backgroundColor = this.hsvToRgbHex(this.hue, 1, 1);
      }
    }
    
    if (hueTrack && hueCursor && hueTrack.getBoundingClientRect().width > 0) {
      const rect = hueTrack.getBoundingClientRect();
      hueCursor.style.left = `${this.hue * rect.width}px`;
    }
    
    if (alphaTrack && alphaCursor && alphaTrack.getBoundingClientRect().width > 0) {
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
  
  createUI() {
    this.container.innerHTML = `
      <style>
        .hsv-color-preview {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: ${this.getColorHex()};
          margin-bottom: 12px;
          border: 2px solid rgba(255,255,255,0.15);
        }
        .hsv-hue-slider, .hsv-alpha-slider { margin: 12px 0; }
        .hsv-slider-label {
          font-size: 11px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          font-weight: 500;
        }
        .hsv-slider-track {
          height: 6px;
          border-radius: 3px;
          position: relative;
          cursor: pointer;
        }
        .hsv-hue-track {
          background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
        }
        .hsv-sv-panel {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 10px;
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
          border-radius: 10px;
          pointer-events: none;
        }
        .hsv-sv-cursor {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 2px solid white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        }
        .hsv-hue-cursor, .hsv-alpha-cursor {
          position: absolute;
          width: 3px;
          height: 100%;
          background: white;
          border-radius: 2px;
          transform: translateX(-50%);
          pointer-events: none;
          box-shadow: 0 0 2px rgba(0,0,0,0.3);
        }
        .hsv-rgb-inputs {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }
        .hsv-rgb-input { flex: 1; }
        .hsv-rgb-input input {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 6px;
          color: white;
          font-size: 11px;
          text-align: center;
          font-family: monospace;
        }
        .hsv-rgb-input label {
          font-size: 9px;
          color: rgba(255,255,255,0.5);
          display: block;
          text-align: center;
          margin-bottom: 3px;
          text-transform: uppercase;
        }
      </style>
      <div class="hsv-sv-panel" id="hsvSvPanel"><div class="hsv-sv-cursor" id="hsvSvCursor"></div></div>
      <div class="hsv-hue-slider">
        <div class="hsv-slider-label"><span>Hue</span><span>${Math.round(this.hue * 360)}°</span></div>
        <div class="hsv-slider-track hsv-hue-track" id="hsvHueTrack"><div class="hsv-hue-cursor" id="hsvHueCursor"></div></div>
      </div>
      <div class="hsv-alpha-slider" id="hsvAlphaContainer">
        <div class="hsv-slider-label"><span>Alpha</span><span>${Math.round(this.alpha * 100)}%</span></div>
        <div class="hsv-slider-track hsv-alpha-track" id="hsvAlphaTrack"><div class="hsv-alpha-cursor" id="hsvAlphaCursor"></div></div>
      </div>
      <div class="hsv-color-preview" id="hsvColorPreview"></div>
      <div class="hsv-rgb-inputs">
        <div class="hsv-rgb-input"><label>R</label><input type="number" id="hsvRInput" min="0" max="255" value="${this.getRgb().r}"></div>
        <div class="hsv-rgb-input"><label>G</label><input type="number" id="hsvGInput" min="0" max="255" value="${this.getRgb().g}"></div>
        <div class="hsv-rgb-input"><label>B</label><input type="number" id="hsvBInput" min="0" max="255" value="${this.getRgb().b}"></div>
      </div>
      <div class="hsv-rgb-inputs">
        <div class="hsv-rgb-input" style="flex: 2"><label>HEX</label><input type="text" id="hsvHexInput" value="${this.getColorHex()}"></div>
      </div>
    `;
    this.setupEvents();
    this.updateUI();
  }
  
  setupEvents() {
    const svPanel = document.getElementById('hsvSvPanel');
    const hueTrack = document.getElementById('hsvHueTrack');
    const alphaTrack = document.getElementById('hsvAlphaTrack');
    const rInput = document.getElementById('hsvRInput');
    const gInput = document.getElementById('hsvGInput');
    const bInput = document.getElementById('hsvBInput');
    const hexInput = document.getElementById('hsvHexInput');
    
    let isDraggingSV = false, isDraggingHue = false, isDraggingAlpha = false;
    
    if (svPanel) {
      svPanel.addEventListener('mousedown', (e) => { isDraggingSV = true; this.updateSV(e); });
      window.addEventListener('mousemove', (e) => { if (isDraggingSV) this.updateSV(e); });
      window.addEventListener('mouseup', () => { isDraggingSV = false; });
    }
    if (hueTrack) {
      hueTrack.addEventListener('mousedown', (e) => { isDraggingHue = true; this.updateHue(e); });
      window.addEventListener('mousemove', (e) => { if (isDraggingHue) this.updateHue(e); });
      window.addEventListener('mouseup', () => { isDraggingHue = false; });
    }
    if (alphaTrack) {
      alphaTrack.addEventListener('mousedown', (e) => { isDraggingAlpha = true; this.updateAlpha(e); });
      window.addEventListener('mousemove', (e) => { if (isDraggingAlpha) this.updateAlpha(e); });
      window.addEventListener('mouseup', () => { isDraggingAlpha = false; });
    }
    
    if (rInput) {
      rInput.addEventListener('change', () => {
        const rgb = this.hexToRgb(this.getColorHex());
        const hsv = this.rgbToHsv(parseInt(rInput.value), parseInt(gInput.value), parseInt(bInput.value));
        this.hue = hsv.h; this.saturation = hsv.s; this.value = hsv.v;
        this.updateUI();
      });
    }
    if (hexInput) {
      hexInput.addEventListener('change', () => {
        const rgb = this.hexToRgb(hexInput.value);
        const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
        this.hue = hsv.h; this.saturation = hsv.s; this.value = hsv.v;
        this.updateUI();
      });
    }
    [rInput, gInput, bInput].forEach(inp => {
      if (inp) inp.addEventListener('change', () => { this.updateUI(); });
    });
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
    this.hue = hsv.h; this.saturation = hsv.s; this.value = hsv.v;
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
      width: "780px",
      height: "560px",
      background: `rgba(30, 30, 35, ${AICODE.cfg.menuOpacity})`,
      backdropFilter: "blur(20px)",
      borderRadius: "12px",
      display: AICODE.cfg.menuVisible ? "flex" : "none",
      flexDirection: "column",
      zIndex: "9999",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.1)",
      border: "none",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      overflow: "hidden",
      cursor: "default"
    });
    
    panel.innerHTML = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        /* MacOS Window Controls */
        .ai-window-controls {
          position: absolute;
          top: 16px;
          left: 16px;
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .ai-win-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .ai-win-btn.close { background: #ff5f56; }
        .ai-win-btn.minimize { background: #ffbd2e; }
        .ai-win-btn.maximize { background: #27c93f; }
        .ai-win-btn.close:hover { background: #ff5f56; opacity: 0.8; }
        .ai-win-btn.minimize:hover { background: #ffbd2e; opacity: 0.8; }
        .ai-win-btn.maximize:hover { background: #27c93f; opacity: 0.8; }
        
        /* Main Layout */
        .ai-main-layout {
          display: flex;
          height: 100%;
          width: 100%;
        }
        
        /* Sidebar */
        .ai-sidebar {
          width: 220px;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-right: 0.5px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          padding: 60px 12px 20px 12px;
        }
        
        .ai-sidebar-header {
          padding: 0 12px 20px 12px;
          margin-bottom: 20px;
          border-bottom: 0.5px solid rgba(255,255,255,0.08);
        }
        
        .ai-sidebar-logo {
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(135deg, #fff, ${AICODE.cfg.themeColor});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .ai-sidebar-version {
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
        }
        
        .ai-tabs-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .ai-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-weight: 500;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
        
        .ai-tab-btn:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.9);
        }
        
        .ai-tab-btn.active {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
        
        .ai-tab-btn.active .ai-tab-icon {
          color: ${AICODE.cfg.themeColor};
        }
        
        .ai-tab-icon {
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Content Area */
        .ai-content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .ai-content-header {
          padding: 20px 24px 12px 24px;
          border-bottom: 0.5px solid rgba(255,255,255,0.08);
        }
        
        .ai-content-title {
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.3px;
        }
        
        .ai-content-subtitle {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-top: 4px;
        }
        
        .ai-sections-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }
        
        .ai-sections-container::-webkit-scrollbar {
          width: 6px;
        }
        .ai-sections-container::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
        }
        .ai-sections-container::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 3px;
        }
        
        .ai-section {
          margin-bottom: 28px;
        }
        
        .ai-section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        
        .ai-section-icon {
          width: 24px;
          height: 24px;
          background: rgba(255,255,255,0.08);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .ai-section-title {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .ai-section-content {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
          padding: 4px 0;
        }
        
        .ai-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 0.5px solid rgba(255,255,255,0.05);
        }
        .ai-item:last-child { border-bottom: none; }
        
        .ai-item-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
        }
        
        .ai-item-desc {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-top: 2px;
        }
        
        /* Switch (MacOS Style) */
        .ai-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .ai-switch input { opacity: 0; width: 0; height: 0; }
        .ai-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255,255,255,0.2);
          transition: .2s;
          border-radius: 24px;
        }
        .ai-slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: .2s;
          border-radius: 50%;
        }
        input:checked + .ai-slider { background: ${AICODE.cfg.themeColor}; }
        input:checked + .ai-slider:before { transform: translateX(20px); }
        
        /* Slider */
        .ai-range {
          width: 140px;
          height: 4px;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
          outline: none;
        }
        .ai-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        /* Input (MacOS Style) */
        .ai-input {
          background: rgba(0,0,0,0.3);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 6px 10px;
          color: #fff;
          font-size: 12px;
          font-family: inherit;
          width: 120px;
          transition: all 0.15s ease;
        }
        .ai-input:focus {
          outline: none;
          border-color: ${AICODE.cfg.themeColor};
          box-shadow: 0 0 0 2px ${AICODE.cfg.themeColor}30;
        }
        
        /* Keybind */
        .ai-keybind {
          background: rgba(0,0,0,0.3);
          border: 0.5px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          padding: 4px 12px;
          font-size: 11px;
          font-family: monospace;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .ai-keybind.active {
          border-color: ${AICODE.cfg.themeColor};
          color: #fff;
        }
        
        /* Color Preview */
        .ai-color-preview {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid rgba(255,255,255,0.15);
          transition: all 0.15s ease;
        }
        .ai-color-preview:hover { transform: scale(1.05); border-color: rgba(255,255,255,0.3); }
        
        /* Stats Cards */
        .ai-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .ai-stat-card {
          background: rgba(0,0,0,0.25);
          border-radius: 10px;
          padding: 14px;
          text-align: center;
        }
        .ai-stat-value {
          font-size: 28px;
          font-weight: 700;
          color: ${AICODE.cfg.themeColor};
          font-family: monospace;
        }
        .ai-stat-label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        /* Modal */
        .ai-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        .ai-modal-content {
          background: rgba(30, 30, 35, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          width: 340px;
          padding: 20px;
          border: 0.5px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .ai-modal-header {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ai-modal-close {
          cursor: pointer;
          opacity: 0.6;
          font-size: 18px;
        }
        .ai-modal-close:hover { opacity: 1; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .ai-footer {
          padding: 12px 24px;
          border-top: 0.5px solid rgba(255,255,255,0.06);
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          text-align: center;
        }
        .ai-footer a {
          color: ${AICODE.cfg.themeColor};
          text-decoration: none;
        }
      </style>
      
      <!-- MacOS Window Controls -->
      <div class="ai-window-controls">
        <div class="ai-win-btn close" id="aiCloseBtn"></div>
        <div class="ai-win-btn minimize" id="aiMinimizeBtn"></div>
        <div class="ai-win-btn maximize" id="aiMaximizeBtn"></div>
      </div>
      
      <div class="ai-main-layout">
        <!-- Sidebar with Tabs -->
        <div class="ai-sidebar">
          <div class="ai-sidebar-header">
            <div class="ai-sidebar-logo">AICODE</div>
            <div class="ai-sidebar-version">Version ${AICODE.ver}</div>
          </div>
          <div class="ai-tabs-container">
            <button class="ai-tab-btn active" data-tab="core">
              <span class="ai-tab-icon">⚡</span>
              <span>Core Engine</span>
            </button>
            <button class="ai-tab-btn" data-tab="automation">
              <span class="ai-tab-icon">🤖</span>
              <span>Automation</span>
            </button>
            <button class="ai-tab-btn" data-tab="visual">
              <span class="ai-tab-icon">🎨</span>
              <span>Appearance</span>
            </button>
            <button class="ai-tab-btn" data-tab="security">
              <span class="ai-tab-icon">🔒</span>
              <span>Security</span>
            </button>
            <button class="ai-tab-btn" data-tab="stats">
              <span class="ai-tab-icon">📊</span>
              <span>Statistics</span>
            </button>
          </div>
        </div>
        
        <!-- Content Area -->
        <div class="ai-content-area">
          <div class="ai-content-header">
            <div class="ai-content-title" id="contentTitle">Core Engine</div>
            <div class="ai-content-subtitle" id="contentSubtitle">Main system control panel</div>
          </div>
          
          <div class="ai-sections-container" id="sectionsContainer">
            <!-- Core Tab Content -->
            <div class="ai-tab-content" data-tab="core" style="display: block;">
              <div class="ai-section">
                <div class="ai-section-header">
                  <div class="ai-section-icon">⚙️</div>
                  <div class="ai-section-title">System Status</div>
                </div>
                <div class="ai-section-content">
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Menu Active</span>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="menuActiveCheck" checked>
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Dark Mode</span>
                      <div class="ai-item-desc">System-wide dark theme</div>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="darkModeCheck" checked>
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Animations</span>
                      <div class="ai-item-desc">Smooth UI transitions</div>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="animationCheck" ${AICODE.cfg.showAnimations ? 'checked' : ''}>
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Automation Tab Content -->
            <div class="ai-tab-content" data-tab="automation" style="display: none;">
              <div class="ai-section">
                <div class="ai-section-header">
                  <div class="ai-section-icon">🤖</div>
                  <div class="ai-section-title">Auto Complete</div>
                </div>
                <div class="ai-section-content">
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Enable Auto Complete</span>
                      <div class="ai-item-desc">Automatically complete exercises</div>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="autoCheck">
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                  <div class="ai-item" id="speedControlItem" style="display: none;">
                    <div class="ai-item-label">
                      <span>Processing Speed</span>
                      <div class="ai-item-desc">Delay between actions (ms)</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <input type="range" min="0" max="3" value="0" class="ai-range" id="speedSlider">
                      <span style="font-size: 11px; color: rgba(255,255,255,0.6); min-width: 45px;" id="speedValue">750ms</span>
                    </div>
                  </div>
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Sound Effects</span>
                      <div class="ai-item-desc">Play sounds on completion</div>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="soundCheck" ${AICODE.cfg.soundEffects ? 'checked' : ''}>
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="ai-section">
                <div class="ai-section-header">
                  <div class="ai-section-icon">⌨️</div>
                  <div class="ai-section-title">Custom Settings</div>
                </div>
                <div class="ai-section-content">
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Custom Delay</span>
                      <div class="ai-item-desc">Custom processing delay (ms)</div>
                    </div>
                    <input type="number" class="ai-input" id="customDelayInput" value="750" style="width: 80px;">
                  </div>
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Max Retries</span>
                      <div class="ai-item-desc">Maximum retry attempts</div>
                    </div>
                    <input type="number" class="ai-input" id="maxRetriesInput" value="3" style="width: 60px;" min="1" max="10">
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Visual Tab Content -->
            <div class="ai-tab-content" data-tab="visual" style="display: none;">
              <div class="ai-section">
                <div class="ai-section-header">
                  <div class="ai-section-icon">🎨</div>
                  <div class="ai-section-title">Theme Settings</div>
                </div>
                <div class="ai-section-content">
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Accent Color</span>
                      <div class="ai-item-desc">Primary UI color</div>
                    </div>
                    <div class="ai-color-preview" id="colorPreviewBtn" style="background: ${AICODE.cfg.themeColor}"></div>
                  </div>
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Menu Opacity</span>
                      <div class="ai-item-desc">Window transparency</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <input type="range" min="0.7" max="1" step="0.01" value="${AICODE.cfg.menuOpacity}" class="ai-range" id="opacitySlider" style="width: 100px;">
                      <span style="font-size: 11px; color: rgba(255,255,255,0.6); min-width: 40px;" id="opacityValue">${Math.round(AICODE.cfg.menuOpacity * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="ai-section">
                <div class="ai-section-header">
                  <div class="ai-section-icon">⌨️</div>
                  <div class="ai-section-title">Keybinds</div>
                </div>
                <div class="ai-section-content">
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Menu Toggle</span>
                      <div class="ai-item-desc">Show/hide menu</div>
                    </div>
                    <div class="ai-keybind" id="keybindBtn">${AICODE.cfg.menuKeybind.replace('Key', '')}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Security Tab Content -->
            <div class="ai-tab-content" data-tab="security" style="display: none;">
              <div class="ai-section">
                <div class="ai-section-header">
                  <div class="ai-section-icon">🔒</div>
                  <div class="ai-section-title">Security Features</div>
                </div>
                <div class="ai-section-content">
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Question Spoofing</span>
                      <div class="ai-item-desc">Bypass question detection</div>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="spoofCheck" checked>
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Anti-Detection</span>
                      <div class="ai-item-desc">Hide script activity</div>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="antiDetectCheck" checked>
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                  <div class="ai-item">
                    <div class="ai-item-label">
                      <span>Console Cleaner</span>
                      <div class="ai-item-desc">Auto-clear console logs</div>
                    </div>
                    <label class="ai-switch">
                      <input type="checkbox" id="consoleCleanCheck" checked>
                      <span class="ai-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Stats Tab Content -->
            <div class="ai-tab-content" data-tab="stats" style="display: none;">
              <div class="ai-section">
                <div class="ai-section-header">
                  <div class="ai-section-icon">📊</div>
                  <div class="ai-section-title">Performance Statistics</div>
                </div>
                <div class="ai-stats-grid">
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
                    <div class="ai-stat-label">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="ai-footer">
            <span>AICODE v${AICODE.ver} // <a href="#" id="creditLink">iUnknownBr</a></span>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    UI.panel = panel;
    UI.setupDragEvents();
    UI.setupEventListeners();
    UI.updateThemeColors(AICODE.cfg.themeColor);
    UI.startUptimeCounter();
    
    // Custom cursor for draggable area
    const dragHandle = document.getElementById('aiCloseBtn')?.parentElement;
    if (dragHandle) dragHandle.style.cursor = 'grab';
  }
  
  static setupDragEvents() {
    const panel = UI.panel;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let panelStart = { left: 0, top: 0 };
    
    // Make the entire header area draggable (excluding buttons)
    panel.addEventListener('mousedown', (e) => {
      if (e.target.closest('.ai-win-btn')) return;
      if (e.target.closest('.ai-tab-btn')) return;
      if (e.target.closest('input')) return;
      if (e.target.closest('button')) return;
      
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
    // Tab switching
    const tabs = document.querySelectorAll('.ai-tab-btn');
    const tabContents = document.querySelectorAll('.ai-tab-content');
    const contentTitle = document.getElementById('contentTitle');
    const contentSubtitle = document.getElementById('contentSubtitle');
    
    const tabInfo = {
      core: { title: 'Core Engine', subtitle: 'Main system control panel' },
      automation: { title: 'Automation', subtitle: 'Auto complete and processing settings' },
      visual: { title: 'Appearance', subtitle: 'Theme and visual customization' },
      security: { title: 'Security', subtitle: 'Anti-detection and bypass features' },
      stats: { title: 'Statistics', subtitle: 'Performance and usage metrics' }
    };
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        tabContents.forEach(content => {
          content.style.display = content.dataset.tab === tabId ? 'block' : 'none';
        });
        if (tabInfo[tabId]) {
          contentTitle.textContent = tabInfo[tabId].title;
          contentSubtitle.textContent = tabInfo[tabId].subtitle;
        }
      });
    });
    
    // Window Controls
    const closeBtn = document.getElementById('aiCloseBtn');
    const minimizeBtn = document.getElementById('aiMinimizeBtn');
    const maximizeBtn = document.getElementById('aiMaximizeBtn');
    let isMinimized = false;
    let originalHeight = '560px';
    
    closeBtn.addEventListener('click', () => {
      UI.panel.style.display = 'none';
      AICODE.cfg.menuVisible = false;
      sendToast('Menu hidden. Press ' + AICODE.cfg.menuKeybind.replace('Key', '') + ' to show', 2000);
    });
    
    minimizeBtn.addEventListener('click', () => {
      const content = document.getElementById('sectionsContainer');
      const header = document.querySelector('.ai-content-header');
      const footer = document.querySelector('.ai-footer');
      if (!isMinimized) {
        originalHeight = UI.panel.style.height;
        UI.panel.style.height = 'auto';
        content.style.display = 'none';
        header.style.display = 'none';
        footer.style.display = 'none';
        isMinimized = true;
      } else {
        UI.panel.style.height = originalHeight;
        content.style.display = '';
        header.style.display = '';
        footer.style.display = '';
        isMinimized = false;
      }
      sendToast(isMinimized ? 'Window minimized' : 'Window restored', 1000);
    });
    
    maximizeBtn.addEventListener('click', () => {
      if (UI.panel.style.width === '100%') {
        UI.panel.style.width = '780px';
        UI.panel.style.height = '560px';
        UI.panel.style.left = `${AICODE.cfg.menuPosition.x}px`;
        UI.panel.style.top = `${AICODE.cfg.menuPosition.y}px`;
        UI.panel.style.borderRadius = '12px';
      } else {
        AICODE.cfg.menuPosition = { x: parseInt(UI.panel.style.left), y: parseInt(UI.panel.style.top) };
        UI.panel.style.left = '0';
        UI.panel.style.top = '0';
        UI.panel.style.width = '100%';
        UI.panel.style.height = '100%';
        UI.panel.style.borderRadius = '0';
      }
    });
    
    // Auto Complete
    const autoCheck = document.getElementById('autoCheck');
    const speedControlItem = document.getElementById('speedControlItem');
    autoCheck.onchange = event => {
      AICODE.cfg.auto = event.target.checked;
      speedControlItem.style.display = AICODE.cfg.auto ? 'flex' : 'none';
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
      const customDelay = document.getElementById('customDelayInput');
      if (customDelay) customDelay.value = speed;
    };
    
    // Custom Delay Input
    const customDelayInput = document.getElementById('customDelayInput');
    if (customDelayInput) {
      customDelayInput.onchange = () => {
        let val = parseInt(customDelayInput.value);
        if (isNaN(val)) val = 750;
        val = Math.max(100, Math.min(3000, val));
        AICODE.cfg.autoSpeed = val;
        const index = AICODE.cfg.speedOptions.findIndex(s => s === val);
        if (index !== -1) speedSlider.value = index;
        speedValue.textContent = val + 'ms';
        sendToast(`Speed changed to ${val}ms`, 1500);
      };
    }
    
    // Max Retries
    const maxRetriesInput = document.getElementById('maxRetriesInput');
    if (maxRetriesInput) {
      maxRetriesInput.onchange = () => {
        let val = parseInt(maxRetriesInput.value);
        if (isNaN(val)) val = 3;
        val = Math.max(1, Math.min(10, val));
        sendToast(`Max retries set to ${val}`, 1500);
      };
    }
    
    // Dark Mode
    document.getElementById('darkModeCheck').onchange = event => {
      AICODE.cfg.darkMode = event.target.checked;
      if (typeof DarkReader !== 'undefined') {
        AICODE.cfg.darkMode ? DarkReader.enable() : DarkReader.disable();
        sendToast(AICODE.cfg.darkMode ? 'Dark Mode enabled' : 'Dark Mode disabled', 2000);
      }
    };
    
    // Animations
    document.getElementById('animationCheck').onchange = event => {
      AICODE.cfg.showAnimations = event.target.checked;
    };
    
    // Sound Effects
    document.getElementById('soundCheck').onchange = event => {
      AICODE.cfg.soundEffects = event.target.checked;
      sendToast(AICODE.cfg.soundEffects ? 'Sound effects enabled' : 'Sound effects disabled', 1500);
    };
    
    // Question Spoof
    document.getElementById('spoofCheck').onchange = event => {
      AICODE.cfg.questionSpoof = event.target.checked;
      sendToast(AICODE.cfg.questionSpoof ? 'Question Spoofing enabled' : 'Question Spoofing disabled', 2000);
    };
    
    // Anti Detection
    document.getElementById('antiDetectCheck').onchange = event => {
      sendToast(event.target.checked ? 'Anti-detection enabled' : 'Anti-detection disabled', 1500);
    };
    
    // Console Cleaner
    document.getElementById('consoleCleanCheck').onchange = event => {
      if (event.target.checked) console.clear();
      sendToast(event.target.checked ? 'Console cleaner enabled' : 'Console cleaner disabled', 1500);
    };
    
    // Menu Active
    document.getElementById('menuActiveCheck').onchange = event => {
      if (!event.target.checked) {
        UI.panel.style.display = 'none';
        AICODE.cfg.menuVisible = false;
      }
    };
    
    // Opacity
    const opacitySlider = document.getElementById('opacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    opacitySlider.oninput = () => {
      const value = parseFloat(opacitySlider.value);
      AICODE.cfg.menuOpacity = value;
      opacityValue.textContent = Math.round(value * 100) + '%';
      UI.panel.style.background = `rgba(30, 30, 35, ${value})`;
    };
    
    // Color Picker
    const colorPreviewBtn = document.getElementById('colorPreviewBtn');
    colorPreviewBtn.addEventListener('click', () => UI.showColorPickerModal());
    
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
    
    // Global keybind
    window.addEventListener('keydown', (e) => {
      if (e.code === AICODE.cfg.menuKeybind) {
        if (UI.panel.style.display === 'none') {
          UI.panel.style.display = 'flex';
          AICODE.cfg.menuVisible = true;
          sendToast('Menu shown', 1000);
        } else if (!isMinimized) {
          UI.panel.style.display = 'none';
          AICODE.cfg.menuVisible = false;
          sendToast('Menu hidden', 1000);
        }
      }
    });
    
    // Credit link
    document.getElementById('creditLink').onclick = (e) => {
      e.preventDefault();
      window.open('https://guns.lol/iunknownbr', '_blank');
    };
    
    // Console cleaner interval
    setInterval(() => {
      if (document.getElementById('consoleCleanCheck')?.checked) {
        console.clear();
      }
    }, 10000);
    
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
      .ai-tab-btn.active .ai-tab-icon { color: ${color} !important; }
      input:checked + .ai-slider { background: ${color} !important; }
      .ai-stat-value { color: ${color} !important; }
      .ai-footer a { color: ${color} !important; }
      .ai-input:focus { border-color: ${color} !important; box-shadow: 0 0 0 2px ${color}30 !important; }
      .ai-keybind.active { border-color: ${color} !important; }
    `;
    document.head.appendChild(style);
  }
  
  static startUptimeCounter() {
    setInterval(() => {
      const uptimeEl = document.getElementById('uptime');
      if (uptimeEl) {
        const seconds = Math.floor((Date.now() - AICODE.stats.startTime) / 1000);
        if (seconds < 60) uptimeEl.textContent = `${seconds}s`;
        else if (seconds < 3600) uptimeEl.textContent = `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
        else uptimeEl.textContent = `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
      }
    }, 1000);
  }
  
  static updateStats(type) {
    if (type === 'bypass') {
      AICODE.stats.questionsBypassed++;
      const el = document.getElementById('questionsBypassed');
      if (el) el.textContent = AICODE.stats.questionsBypassed;
    } else if (type === 'complete') {
      AICODE.stats.autoCompletions++;
      const el = document.getElementById('autoCompletions');
      if (el) el.textContent = AICODE.stats.autoCompletions;
    }
    const total = AICODE.stats.questionsBypassed + AICODE.stats.autoCompletions;
    const rate = total > 0 ? Math.round((AICODE.stats.autoCompletions / total) * 100) : 100;
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
      "SYSTEM PROTECTED // UNAUTHORIZED",
      "AICODE v2.0 // ENGINE ONLINE"
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
