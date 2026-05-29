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
    notificationsEnabled: true,
    menuKeybind: "KeyM",
    language: "en",
    fpsLimit: 60,
    menuPosition: { x: window.innerWidth / 2 - 410, y: window.innerHeight / 2 - 290 },
    menuVisible: true
  },
  stats: {
    questionsBypassed: 0,
    autoCompletions: 0,
    startTime: Date.now(),
    fps: 0,
    ping: 0
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

function sendToast(message, duration = 4000) {
  if (typeof Toastify !== 'undefined' && AICODE.cfg.notificationsEnabled) {
    Toastify({
      text: message,
      duration,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: { background: "#2c2c2e", borderRadius: "12px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: "13px", backdropFilter: "blur(20px)", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }
    }).showToast();
  }
}

const playAudio = src => {
  if (AICODE.cfg.soundEffects) {
    new Audio(src).play().catch(() => {});
  }
};

// SVG Icons (no emojis)
const Icons = {
  core: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  automation: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>`,
  appearance: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.2l.07-.08z"/></svg>`,
  security: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  statistics: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.2l.07-.08z"/></svg>`,
  auto: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  speed: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  sound: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  dark: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  theme: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.2l.07-.08z"/></svg>`,
  opacity: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/></svg>`,
  keybind: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>`,
  spoof: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>`,
  anti: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  console: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  notifications: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  language: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  fps: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  reset: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
};

// Language translations
const translations = {
  en: {
    windowTitle: "AICODE", version: "Version", core: "Core Engine", automation: "Automation",
    appearance: "Appearance", security: "Security", statistics: "Statistics", settings: "Settings",
    autoComplete: "Auto Complete", autoCompleteDesc: "Automatically complete exercises",
    processingSpeed: "Processing Speed", speedDesc: "Delay between actions (ms)",
    soundEffects: "Sound Effects", soundDesc: "Play sounds on completion",
    darkMode: "Dark Mode", darkModeDesc: "System-wide dark theme",
    accentColor: "Accent Color", accentDesc: "Primary UI color",
    menuOpacity: "Menu Opacity", opacityDesc: "Window transparency",
    menuToggle: "Menu Toggle", toggleDesc: "Show/hide menu",
    questionSpoof: "Question Spoofing", spoofDesc: "Bypass question detection",
    antiDetection: "Anti-Detection", antiDesc: "Hide script activity",
    consoleCleaner: "Console Cleaner", consoleDesc: "Auto-clear console logs",
    questionsBypassed: "Bypassed", autoCompletions: "Completed", uptime: "Uptime", successRate: "Success Rate",
    fps: "FPS", ping: "Ping (ms)", notifications: "Notifications", notificationsDesc: "Show toast notifications",
    language: "Language", animations: "Animations", resetSettings: "Reset Settings", confirmReset: "Reset all settings to default?",
    fpsLimit: "FPS Limit", limitDesc: "Maximum frame rate", systemStatus: "System Status", performance: "Performance",
    actions: "Actions", audio: "Audio", themeSettings: "Theme Settings", keybinds: "Keybinds",
    securityFeatures: "Security Features", performanceStats: "Performance Statistics"
  },
  pt: {
    windowTitle: "AICODE", version: "Versão", core: "Motor Principal", automation: "Automação",
    appearance: "Aparência", security: "Segurança", statistics: "Estatísticas", settings: "Configurações",
    autoComplete: "Auto Completar", autoCompleteDesc: "Completa exercícios automaticamente",
    processingSpeed: "Velocidade", speedDesc: "Atraso entre ações (ms)",
    soundEffects: "Efeitos Sonoros", soundDesc: "Toca sons ao completar",
    darkMode: "Modo Escuro", darkModeDesc: "Tema escuro do sistema",
    accentColor: "Cor de Destaque", accentDesc: "Cor primária da interface",
    menuOpacity: "Opacidade", opacityDesc: "Transparência da janela",
    menuToggle: "Tecla do Menu", toggleDesc: "Mostrar/esconder menu",
    questionSpoof: "Ofuscação", spoofDesc: "Contorna detecção de questões",
    antiDetection: "Anti-Detecção", antiDesc: "Esconde atividade do script",
    consoleCleaner: "Limpar Console", consoleDesc: "Limpa console automaticamente",
    questionsBypassed: "Contornadas", autoCompletions: "Completadas", uptime: "Ativo há", successRate: "Taxa de Sucesso",
    fps: "FPS", ping: "Ping (ms)", notifications: "Notificações", notificationsDesc: "Mostrar notificações",
    language: "Idioma", animations: "Animações", resetSettings: "Resetar Configurações", confirmReset: "Resetar todas as configurações?",
    fpsLimit: "Limite de FPS", limitDesc: "Taxa máxima de quadros", systemStatus: "Status do Sistema", performance: "Performance",
    actions: "Ações", audio: "Áudio", themeSettings: "Configurações de Tema", keybinds: "Teclas de Atalho",
    securityFeatures: "Recursos de Segurança", performanceStats: "Estatísticas de Performance"
  }
};

function t(key) { return translations[AICODE.cfg.language][key] || translations.en[key] || key; }

// FPS Counter
class FPSCounter {
  constructor() {
    this.fps = 0;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.start();
  }
  start() {
    const update = () => {
      this.frameCount++;
      const now = performance.now();
      const delta = now - this.lastTime;
      if (delta >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / delta);
        this.frameCount = 0;
        this.lastTime = now;
        const fpsEl = document.getElementById('statsFps');
        if (fpsEl) fpsEl.textContent = this.fps;
        AICODE.stats.fps = this.fps;
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
  getFPS() { return this.fps; }
}

// Ping Counter
async function measurePing() {
  const start = performance.now();
  try {
    await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-cache' });
    const ping = Math.round(performance.now() - start);
    const pingEl = document.getElementById('statsPing');
    if (pingEl) pingEl.textContent = ping;
    AICODE.stats.ping = ping;
  } catch(e) {}
  setTimeout(measurePing, 5000);
}

class ColorPickerHSV {
  constructor(container, initialColor, onColorChange) {
    this.container = container;
    this.onColorChange = onColorChange;
    this.hue = 0; this.saturation = 1; this.value = 1; this.alpha = 1;
    this.init(initialColor);
  }
  
  init(initialColor) {
    if (initialColor) {
      const rgb = this.hexToRgb(initialColor);
      const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
      this.hue = hsv.h; this.saturation = hsv.s; this.value = hsv.v;
    }
    this.createUI();
  }
  
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
  }
  
  rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) h = 0;
    else {
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
  
  getRgb() { return this.hsvToRgb(this.hue, this.saturation, this.value); }
  
  updateUI() {
    const svPanel = document.getElementById('hsvSvPanel');
    const svCursor = document.getElementById('hsvSvCursor');
    const hueCursor = document.getElementById('hsvHueCursor');
    const alphaCursor = document.getElementById('hsvAlphaCursor');
    const colorPreview = document.getElementById('hsvColorPreview');
    const alphaTrack = document.getElementById('hsvAlphaTrack');
    const hueTrack = document.getElementById('hsvHueTrack');
    
    if (svPanel && svCursor && svPanel.getBoundingClientRect().width > 0) {
      const rect = svPanel.getBoundingClientRect();
      svCursor.style.left = `${this.saturation * rect.width}px`;
      svCursor.style.top = `${(1 - this.value) * rect.height}px`;
      svPanel.style.backgroundColor = this.hsvToRgbHex(this.hue, 1, 1);
    }
    if (hueTrack && hueCursor && hueTrack.getBoundingClientRect().width > 0) {
      hueCursor.style.left = `${this.hue * hueTrack.getBoundingClientRect().width}px`;
    }
    if (alphaTrack && alphaCursor && alphaTrack.getBoundingClientRect().width > 0) {
      alphaCursor.style.left = `${this.alpha * alphaTrack.getBoundingClientRect().width}px`;
      alphaTrack.style.background = `linear-gradient(to right, transparent, ${this.getColorHex()})`;
    }
    if (colorPreview) colorPreview.style.background = this.getColor();
    
    const rgb = this.getRgb();
    ['hsvRInput', 'hsvGInput', 'hsvBInput'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.value = i === 0 ? rgb.r : i === 1 ? rgb.g : rgb.b;
    });
    const hexInput = document.getElementById('hsvHexInput');
    if (hexInput) hexInput.value = this.getColorHex();
    if (this.onColorChange) this.onColorChange(this.getColor(), this.getColorHex());
  }
  
  hsvToRgbHex(h, s, v) {
    const rgb = this.hsvToRgb(h, s, v);
    return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
  }
  
  createUI() {
    this.container.innerHTML = `
      <style>
        .hsv-color-preview { width: 50px; height: 50px; border-radius: 10px; background: ${this.getColorHex()}; margin-bottom: 12px; border: 2px solid rgba(255,255,255,0.15); }
        .hsv-hue-slider, .hsv-alpha-slider { margin: 12px 0; }
        .hsv-slider-label { font-size: 11px; color: rgba(255,255,255,0.6); margin-bottom: 6px; display: flex; justify-content: space-between; font-weight: 500; }
        .hsv-slider-track { height: 6px; border-radius: 3px; position: relative; cursor: pointer; }
        .hsv-hue-track { background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000); }
        .hsv-sv-panel { width: 100%; aspect-ratio: 1; border-radius: 10px; position: relative; cursor: crosshair; margin-bottom: 12px; background: linear-gradient(to right, white, transparent); }
        .hsv-sv-panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to bottom, transparent, black); border-radius: 10px; pointer-events: none; }
        .hsv-sv-cursor { position: absolute; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; box-shadow: 0 0 4px rgba(0,0,0,0.3); }
        .hsv-hue-cursor, .hsv-alpha-cursor { position: absolute; width: 3px; height: 100%; background: white; border-radius: 2px; transform: translateX(-50%); pointer-events: none; }
        .hsv-rgb-inputs { display: flex; gap: 8px; margin-top: 12px; }
        .hsv-rgb-input { flex: 1; }
        .hsv-rgb-input input { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 6px; color: white; font-size: 11px; text-align: center; font-family: monospace; }
        .hsv-rgb-input label { font-size: 9px; color: rgba(255,255,255,0.5); display: block; text-align: center; margin-bottom: 3px; text-transform: uppercase; }
      </style>
      <div class="hsv-sv-panel" id="hsvSvPanel"><div class="hsv-sv-cursor" id="hsvSvCursor"></div></div>
      <div class="hsv-hue-slider"><div class="hsv-slider-label"><span>Hue</span><span>${Math.round(this.hue * 360)}°</span></div><div class="hsv-slider-track hsv-hue-track" id="hsvHueTrack"><div class="hsv-hue-cursor" id="hsvHueCursor"></div></div></div>
      <div class="hsv-alpha-slider" id="hsvAlphaContainer"><div class="hsv-slider-label"><span>Alpha</span><span>${Math.round(this.alpha * 100)}%</span></div><div class="hsv-slider-track hsv-alpha-track" id="hsvAlphaTrack"><div class="hsv-alpha-cursor" id="hsvAlphaCursor"></div></div></div>
      <div class="hsv-color-preview" id="hsvColorPreview"></div>
      <div class="hsv-rgb-inputs"><div class="hsv-rgb-input"><label>R</label><input type="number" id="hsvRInput" min="0" max="255" value="${this.getRgb().r}"></div><div class="hsv-rgb-input"><label>G</label><input type="number" id="hsvGInput" min="0" max="255" value="${this.getRgb().g}"></div><div class="hsv-rgb-input"><label>B</label><input type="number" id="hsvBInput" min="0" max="255" value="${this.getRgb().b}"></div></div>
      <div class="hsv-rgb-inputs"><div class="hsv-rgb-input" style="flex: 2"><label>HEX</label><input type="text" id="hsvHexInput" value="${this.getColorHex()}"></div></div>
    `;
    this.setupEvents();
    this.updateUI();
  }
  
  setupEvents() {
    const svPanel = document.getElementById('hsvSvPanel');
    const hueTrack = document.getElementById('hsvHueTrack');
    const alphaTrack = document.getElementById('hsvAlphaTrack');
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
    if (hexInput) hexInput.addEventListener('change', () => { const rgb = this.hexToRgb(hexInput.value); const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b); this.hue = hsv.h; this.saturation = hsv.s; this.value = hsv.v; this.updateUI(); });
  }
  
  updateSV(e) {
    const rect = document.getElementById('hsvSvPanel').getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    let y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    this.saturation = x / rect.width;
    this.value = 1 - (y / rect.height);
    this.updateUI();
  }
  updateHue(e) {
    const rect = document.getElementById('hsvHueTrack').getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    this.hue = x / rect.width;
    this.updateUI();
  }
  updateAlpha(e) {
    const rect = document.getElementById('hsvAlphaTrack').getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    this.alpha = x / rect.width;
    this.updateUI();
  }
  setColor(hex) { const rgb = this.hexToRgb(hex); const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b); this.hue = hsv.h; this.saturation = hsv.s; this.value = hsv.v; this.updateUI(); }
}

// Small info window (FPS, Ping, Time)
class InfoWindow {
  static create() {
    const window = document.createElement("div");
    window.id = "aiInfoWindow";
    Object.assign(window.style, {
      position: "fixed", bottom: "16px", right: "16px",
      background: "rgba(30, 30, 35, 0.85)", backdropFilter: "blur(16px)",
      borderRadius: "12px", padding: "10px 16px", zIndex: "9998",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontSize: "11px", color: "rgba(255,255,255,0.8)",
      border: "0.5px solid rgba(255,255,255,0.1)",
      display: "flex", gap: "16px", cursor: "move", userSelect: "none"
    });
    window.innerHTML = `
      <div style="display: flex; gap: 16px;">
        <div><span style="color: ${AICODE.cfg.themeColor}">●</span> FPS: <span id="infoFps">0</span></div>
        <div><span style="color: ${AICODE.cfg.themeColor}">●</span> Ping: <span id="infoPing">0</span>ms</div>
        <div><span style="color: ${AICODE.cfg.themeColor}">●</span> Uptime: <span id="infoUptime">0s</span></div>
      </div>
    `;
    document.body.appendChild(window);
    
    let isDragging = false, dragStart = { x: 0, y: 0 }, windowStart = { right: 16, bottom: 16 };
    window.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStart = { x: e.clientX, y: e.clientY };
      const rect = window.getBoundingClientRect();
      windowStart = { right: window.innerWidth - rect.right, bottom: window.innerHeight - rect.bottom };
      window.style.cursor = 'grabbing';
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      let newRight = windowStart.right + (dragStart.x - e.clientX);
      let newBottom = windowStart.bottom + (dragStart.y - e.clientY);
      newRight = Math.max(8, Math.min(window.innerWidth - 100, newRight));
      newBottom = Math.max(8, Math.min(window.innerHeight - 60, newBottom));
      window.style.right = `${newRight}px`;
      window.style.bottom = `${newBottom}px`;
    });
    window.addEventListener('mouseup', () => { isDragging = false; window.style.cursor = ''; });
    return window;
  }
  static update(fps, ping, uptime) {
    const fpsEl = document.getElementById('infoFps');
    const pingEl = document.getElementById('infoPing');
    const uptimeEl = document.getElementById('infoUptime');
    if (fpsEl) fpsEl.textContent = fps;
    if (pingEl) pingEl.textContent = ping;
    if (uptimeEl) uptimeEl.textContent = uptime;
  }
}

class UI {
  static init() {
    const panel = document.createElement("div");
    panel.id = "aiCodePanel";
    Object.assign(panel.style, {
      position: "fixed", left: `${AICODE.cfg.menuPosition.x}px`, top: `${AICODE.cfg.menuPosition.y}px`,
      width: "840px", height: "580px",
      background: `rgba(30, 30, 35, ${AICODE.cfg.menuOpacity})`, backdropFilter: "blur(20px)",
      borderRadius: "12px", display: AICODE.cfg.menuVisible ? "flex" : "none",
      flexDirection: "column", zIndex: "9999",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.1)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", overflow: "hidden"
    });
    
    panel.innerHTML = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .ai-window-controls { position: absolute; top: 14px; left: 14px; display: flex; gap: 8px; z-index: 10; }
        .ai-win-btn { width: 12px; height: 12px; border-radius: 50%; transition: all 0.2s ease; cursor: pointer; }
        .ai-win-btn.close { background: #ff5f56; }
        .ai-win-btn.minimize { background: #ffbd2e; }
        .ai-win-btn.maximize { background: #27c93f; }
        .ai-win-btn.close:hover, .ai-win-btn.minimize:hover, .ai-win-btn.maximize:hover { opacity: 0.8; }
        .ai-main-layout { display: flex; height: 100%; width: 100%; }
        .ai-sidebar-left { width: 240px; background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(10px); border-right: 0.5px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; padding: 52px 12px 20px 12px; }
        .ai-sidebar-logo { padding: 0 12px 20px 12px; margin-bottom: 20px; border-bottom: 0.5px solid rgba(255,255,255,0.08); }
        .ai-logo-text { font-size: 20px; font-weight: 700; background: linear-gradient(135deg, #fff, ${AICODE.cfg.themeColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ai-logo-version { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 4px; }
        .ai-tabs-container { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .ai-tab-btn { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; transition: all 0.15s ease; color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500; background: transparent; border: none; width: 100%; text-align: left; font-family: inherit; }
        .ai-tab-btn:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); }
        .ai-tab-btn.active { background: rgba(255,255,255,0.12); color: #fff; }
        .ai-tab-btn.active .ai-tab-icon { color: ${AICODE.cfg.themeColor}; }
        .ai-tab-icon { width: 20px; display: flex; align-items: center; justify-content: center; }
        .ai-content-right { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .ai-content-header { padding: 20px 24px 12px 24px; border-bottom: 0.5px solid rgba(255,255,255,0.08); }
        .ai-content-title { font-size: 22px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
        .ai-content-subtitle { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; }
        .ai-sections-container { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; gap: 24px; }
        .ai-sections-container::-webkit-scrollbar { width: 6px; }
        .ai-sections-container::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
        .ai-sections-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
        .ai-column { flex: 1; display: flex; flex-direction: column; gap: 24px; }
        .ai-section { background: rgba(0, 0, 0, 0.25); border-radius: 10px; overflow: hidden; }
        .ai-section-header { padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 0.5px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; }
        .ai-section-title { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px; }
        .ai-section-content { padding: 4px 0; }
        .ai-item { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 0.5px solid rgba(255,255,255,0.04); }
        .ai-item:last-child { border-bottom: none; }
        .ai-item-left { flex: 1; }
        .ai-item-label { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); }
        .ai-item-desc { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .ai-switch { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; }
        .ai-switch input { opacity: 0; width: 0; height: 0; }
        .ai-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.2); transition: .2s; border-radius: 24px; }
        .ai-slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 2px; bottom: 2px; background-color: white; transition: .2s; border-radius: 50%; }
        input:checked + .ai-slider { background: ${AICODE.cfg.themeColor}; }
        input:checked + .ai-slider:before { transform: translateX(20px); }
        .ai-range { width: 120px; height: 4px; -webkit-appearance: none; background: rgba(255,255,255,0.2); border-radius: 2px; outline: none; }
        .ai-range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: white; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.2); }
        .ai-dropdown { position: relative; display: inline-block; }
        .ai-dropdown-btn { background: rgba(0,0,0,0.3); border: 0.5px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 6px 28px 6px 12px; font-size: 12px; color: #fff; cursor: pointer; font-family: inherit; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; }
        .ai-dropdown-btn:hover { background: rgba(255,255,255,0.1); }
        .ai-color-preview { width: 32px; height: 32px; border-radius: 8px; cursor: pointer; border: 2px solid rgba(255,255,255,0.15); transition: all 0.15s ease; }
        .ai-color-preview:hover { transform: scale(1.05); }
        .ai-keybind { background: rgba(0,0,0,0.3); border: 0.5px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 4px 12px; font-size: 11px; font-family: monospace; color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.15s ease; }
        .ai-keybind.active { border-color: ${AICODE.cfg.themeColor}; color: #fff; background: ${AICODE.cfg.themeColor}20; }
        .ai-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 12px; }
        .ai-stat-card { background: rgba(0,0,0,0.2); border-radius: 8px; padding: 14px; text-align: center; }
        .ai-stat-value { font-size: 28px; font-weight: 700; color: ${AICODE.cfg.themeColor}; font-family: monospace; }
        .ai-stat-label { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
        .ai-footer { padding: 10px 24px; border-top: 0.5px solid rgba(255,255,255,0.06); font-size: 10px; color: rgba(255,255,255,0.3); text-align: center; }
        .ai-footer a { color: ${AICODE.cfg.themeColor}; text-decoration: none; }
        .ai-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 10000; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.2s ease; }
        .ai-modal-content { background: rgba(30, 30, 35, 0.98); backdrop-filter: blur(20px); border-radius: 16px; width: 340px; padding: 20px; border: 0.5px solid rgba(255,255,255,0.1); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .ai-modal-header { font-size: 15px; font-weight: 600; margin-bottom: 16px; color: #fff; display: flex; justify-content: space-between; align-items: center; }
        .ai-modal-close { cursor: pointer; opacity: 0.6; font-size: 18px; }
        .ai-modal-close:hover { opacity: 1; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        button.ai-reset-btn { background: rgba(255,255,255,0.08); border: none; padding: 6px 14px; border-radius: 6px; color: #ff5f56; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.15s ease; }
        button.ai-reset-btn:hover { background: rgba(255,255,255,0.15); }
      </style>
      
      <div class="ai-window-controls">
        <div class="ai-win-btn close" id="aiCloseBtn"></div>
        <div class="ai-win-btn minimize" id="aiMinimizeBtn"></div>
        <div class="ai-win-btn maximize" id="aiMaximizeBtn"></div>
      </div>
      
      <div class="ai-main-layout">
        <div class="ai-sidebar-left">
          <div class="ai-sidebar-logo">
            <div class="ai-logo-text">AICODE</div>
            <div class="ai-logo-version">${t('version')} ${AICODE.ver}</div>
          </div>
          <div class="ai-tabs-container">
            <button class="ai-tab-btn active" data-tab="core"><span class="ai-tab-icon">${Icons.core}</span><span>${t('core')}</span></button>
            <button class="ai-tab-btn" data-tab="automation"><span class="ai-tab-icon">${Icons.automation}</span><span>${t('automation')}</span></button>
            <button class="ai-tab-btn" data-tab="appearance"><span class="ai-tab-icon">${Icons.appearance}</span><span>${t('appearance')}</span></button>
            <button class="ai-tab-btn" data-tab="security"><span class="ai-tab-icon">${Icons.security}</span><span>${t('security')}</span></button>
            <button class="ai-tab-btn" data-tab="statistics"><span class="ai-tab-icon">${Icons.statistics}</span><span>${t('statistics')}</span></button>
            <button class="ai-tab-btn" data-tab="settings"><span class="ai-tab-icon">${Icons.settings}</span><span>${t('settings')}</span></button>
          </div>
        </div>
        
        <div class="ai-content-right">
          <div class="ai-content-header">
            <div class="ai-content-title" id="contentTitle">${t('core')}</div>
            <div class="ai-content-subtitle" id="contentSubtitle">Main system control panel</div>
          </div>
          <div class="ai-sections-container" id="sectionsContainer"></div>
          <div class="ai-footer"><span>AICODE v${AICODE.ver} // <a href="#" id="creditLink">iUnknownBr</a></span></div>
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    UI.panel = panel;
    UI.loadTabContents();
    UI.setupDragEvents();
    UI.setupEventListeners();
    UI.updateThemeColors(AICODE.cfg.themeColor);
    
    const fpsCounter = new FPSCounter();
    InfoWindow.create();
    measurePing();
    
    setInterval(() => {
      const seconds = Math.floor((Date.now() - AICODE.stats.startTime) / 1000);
      let uptimeStr = seconds < 60 ? `${seconds}s` : seconds < 3600 ? `${Math.floor(seconds / 60)}m ${seconds % 60}s` : `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
      InfoWindow.update(fpsCounter.getFPS(), AICODE.stats.ping, uptimeStr);
      const uptimeEl = document.getElementById('statsUptime');
      if (uptimeEl) uptimeEl.textContent = uptimeStr;
      const fpsStatEl = document.getElementById('statsFps');
      if (fpsStatEl) fpsStatEl.textContent = fpsCounter.getFPS();
    }, 1000);
  }
  
  static loadTabContents() {
    const container = document.getElementById('sectionsContainer');
    const tabsData = {
      core: `
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.core} ${t('systemStatus')}</div></div>
            <div class="ai-section-content">
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Menu Active</div><div class="ai-item-desc">Enable/disable menu visibility</div></div><label class="ai-switch"><input type="checkbox" id="menuActiveCheck" checked><span class="ai-slider"></span></label></div>
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('darkMode')}</div><div class="ai-item-desc">${t('darkModeDesc')}</div></div><label class="ai-switch"><input type="checkbox" id="darkModeCheck" checked><span class="ai-slider"></span></label></div>
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('animations')}</div><div class="ai-item-desc">Smooth UI transitions</div></div><label class="ai-switch"><input type="checkbox" id="animationCheck" ${AICODE.cfg.showAnimations ? 'checked' : ''}><span class="ai-slider"></span></label></div>
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('notifications')}</div><div class="ai-item-desc">${t('notificationsDesc')}</div></div><label class="ai-switch"><input type="checkbox" id="notificationsCheck" ${AICODE.cfg.notificationsEnabled ? 'checked' : ''}><span class="ai-slider"></span></label></div>
            </div></div>
        </div>
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.fps} ${t('performance')}</div></div>
            <div class="ai-section-content">
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('fpsLimit')}</div><div class="ai-item-desc">${t('limitDesc')}</div></div><input type="range" min="30" max="240" value="${AICODE.cfg.fpsLimit}" class="ai-range" id="fpsLimitSlider" style="width: 100px;"></div>
            </div></div>
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.reset} ${t('actions')}</div></div>
            <div class="ai-section-content"><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('resetSettings')}</div><div class="ai-item-desc">Reset all to defaults</div></div><button class="ai-reset-btn" id="resetSettingsBtn">Reset</button></div></div></div>
        </div>
      `,
      automation: `
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.auto} ${t('autoComplete')}</div></div>
            <div class="ai-section-content">
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Enable</div><div class="ai-item-desc">${t('autoCompleteDesc')}</div></div><label class="ai-switch"><input type="checkbox" id="autoCheck"><span class="ai-slider"></span></label></div>
              <div class="ai-item" id="speedControlItem" style="display: none;"><div class="ai-item-left"><div class="ai-item-label">${t('processingSpeed')}</div><div class="ai-item-desc">${t('speedDesc')}</div></div><input type="range" min="0" max="3" value="0" class="ai-range" id="speedSlider" style="width: 100px;"></div>
            </div></div>
        </div>
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.sound} ${t('audio')}</div></div>
            <div class="ai-section-content"><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('soundEffects')}</div><div class="ai-item-desc">${t('soundDesc')}</div></div><label class="ai-switch"><input type="checkbox" id="soundCheck" ${AICODE.cfg.soundEffects ? 'checked' : ''}><span class="ai-slider"></span></label></div></div></div>
        </div>
      `,
      appearance: `
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.theme} ${t('themeSettings')}</div></div>
            <div class="ai-section-content">
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('accentColor')}</div><div class="ai-item-desc">${t('accentDesc')}</div></div><div class="ai-color-preview" id="colorPreviewBtn" style="background: ${AICODE.cfg.themeColor}"></div></div>
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('menuOpacity')}</div><div class="ai-item-desc">${t('opacityDesc')}</div></div><input type="range" min="0.7" max="1" step="0.01" value="${AICODE.cfg.menuOpacity}" class="ai-range" id="opacitySlider" style="width: 100px;"></div>
            </div></div>
        </div>
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.keybind} ${t('keybinds')}</div></div>
            <div class="ai-section-content"><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('menuToggle')}</div><div class="ai-item-desc">${t('toggleDesc')}</div></div><div class="ai-keybind" id="keybindBtn">${AICODE.cfg.menuKeybind.replace('Key', '')}</div></div></div></div>
        </div>
      `,
      security: `
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.spoof} ${t('securityFeatures')}</div></div>
            <div class="ai-section-content">
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('questionSpoof')}</div><div class="ai-item-desc">${t('spoofDesc')}</div></div><label class="ai-switch"><input type="checkbox" id="spoofCheck" checked><span class="ai-slider"></span></label></div>
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('antiDetection')}</div><div class="ai-item-desc">${t('antiDesc')}</div></div><label class="ai-switch"><input type="checkbox" id="antiDetectCheck" checked><span class="ai-slider"></span></label></div>
              <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('consoleCleaner')}</div><div class="ai-item-desc">${t('consoleDesc')}</div></div><label class="ai-switch"><input type="checkbox" id="consoleCleanCheck" checked><span class="ai-slider"></span></label></div>
            </div></div>
        </div>
        <div class="ai-column"></div>
      `,
      statistics: `
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.statistics} ${t('performanceStats')}</div></div>
            <div class="ai-stats-grid">
              <div class="ai-stat-card"><div class="ai-stat-value" id="questionsBypassed">0</div><div class="ai-stat-label">${t('questionsBypassed')}</div></div>
              <div class="ai-stat-card"><div class="ai-stat-value" id="autoCompletions">0</div><div class="ai-stat-label">${t('autoCompletions')}</div></div>
              <div class="ai-stat-card"><div class="ai-stat-value" id="statsUptime">0s</div><div class="ai-stat-label">${t('uptime')}</div></div>
              <div class="ai-stat-card"><div class="ai-stat-value" id="successRate">100%</div><div class="ai-stat-label">${t('successRate')}</div></div>
              <div class="ai-stat-card"><div class="ai-stat-value" id="statsFps">0</div><div class="ai-stat-label">${t('fps')}</div></div>
              <div class="ai-stat-card"><div class="ai-stat-value" id="statsPing">0</div><div class="ai-stat-label">${t('ping')}</div></div>
            </div></div>
        </div>
        <div class="ai-column"></div>
      `,
      settings: `
        <div class="ai-column">
          <div class="ai-section"><div class="ai-section-header"><div class="ai-section-title">${Icons.language} ${t('language')}</div></div>
            <div class="ai-section-content"><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">${t('language')}</div></div><div class="ai-dropdown"><select id="languageSelect" class="ai-dropdown-btn"><option value="en" ${AICODE.cfg.language === 'en' ? 'selected' : ''}>English</option><option value="pt" ${AICODE.cfg.language === 'pt' ? 'selected' : ''}>Português</option></select></div></div></div></div>
        </div>
        <div class="ai-column"></div>
      `
    };
    
    container.innerHTML = tabsData.core;
    window.tabContents = tabsData;
  }
  
  static setupDragEvents() {
    const panel = UI.panel;
    let isDragging = false, dragStart = { x: 0, y: 0 }, panelStart = { left: 0, top: 0 };
    panel.addEventListener('mousedown', (e) => {
      if (e.target.closest('.ai-win-btn')) return;
      if (e.target.closest('.ai-tab-btn')) return;
      if (e.target.closest('input')) return;
      if (e.target.closest('button')) return;
      if (e.target.closest('.ai-keybind')) return;
      if (e.target.closest('.ai-dropdown-btn')) return;
      isDragging = true;
      dragStart = { x: e.clientX, y: e.clientY };
      panelStart = { left: parseInt(panel.style.left), top: parseInt(panel.style.top) };
      panel.style.cursor = 'grabbing';
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      let newLeft = Math.max(0, Math.min(window.innerWidth - panel.offsetWidth, panelStart.left + (e.clientX - dragStart.x)));
      let newTop = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, panelStart.top + (e.clientY - dragStart.y)));
      panel.style.left = `${newLeft}px`;
      panel.style.top = `${newTop}px`;
      AICODE.cfg.menuPosition = { x: newLeft, y: newTop };
    });
    window.addEventListener('mouseup', () => { isDragging = false; panel.style.cursor = ''; });
  }
  
  static setupEventListeners() {
    const tabs = document.querySelectorAll('.ai-tab-btn');
    const container = document.getElementById('sectionsContainer');
    const contentTitle = document.getElementById('contentTitle');
    const contentSubtitle = document.getElementById('contentSubtitle');
    const tabTitles = { core: 'Core Engine', automation: 'Automation', appearance: 'Appearance', security: 'Security', statistics: 'Statistics', settings: 'Settings' };
    const tabSubtitles = { core: 'Main system control panel', automation: 'Auto complete and processing settings', appearance: 'Theme and visual customization', security: 'Anti-detection and bypass features', statistics: 'Performance and usage metrics', settings: 'Application preferences' };
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (window.tabContents && window.tabContents[tabId]) container.innerHTML = window.tabContents[tabId];
        contentTitle.textContent = t(tabTitles[tabId]?.toLowerCase().replace(' ', '')) || tabTitles[tabId];
        contentSubtitle.textContent = tabSubtitles[tabId];
        UI.rebindEvents();
      });
    });
    
    UI.rebindEvents();
    
    const closeBtn = document.getElementById('aiCloseBtn');
    const minimizeBtn = document.getElementById('aiMinimizeBtn');
    const maximizeBtn = document.getElementById('aiMaximizeBtn');
    let isMinimized = false;
    
    closeBtn.addEventListener('click', () => { UI.panel.style.display = 'none'; AICODE.cfg.menuVisible = false; sendToast('Menu hidden', 2000); });
    minimizeBtn.addEventListener('click', () => {
      const container = document.getElementById('sectionsContainer');
      const header = document.querySelector('.ai-content-header');
      const footer = document.querySelector('.ai-footer');
      if (!isMinimized) { UI.panel.style.height = 'auto'; container.style.display = 'none'; header.style.display = 'none'; footer.style.display = 'none'; isMinimized = true; }
      else { UI.panel.style.height = '580px'; container.style.display = ''; header.style.display = ''; footer.style.display = ''; isMinimized = false; }
    });
    maximizeBtn.addEventListener('click', () => {
      if (UI.panel.style.width === '100%') { UI.panel.style.width = '840px'; UI.panel.style.height = '580px'; UI.panel.style.left = `${AICODE.cfg.menuPosition.x}px`; UI.panel.style.top = `${AICODE.cfg.menuPosition.y}px`; UI.panel.style.borderRadius = '12px'; }
      else { UI.panel.style.left = '0'; UI.panel.style.top = '0'; UI.panel.style.width = '100%'; UI.panel.style.height = '100%'; UI.panel.style.borderRadius = '0'; }
    });
    
    document.getElementById('creditLink').onclick = (e) => { e.preventDefault(); window.open('https://guns.lol/iunknownbr', '_blank'); };
    
    // Keybind global
    window.addEventListener('keydown', (e) => { if (e.code === AICODE.cfg.menuKeybind) { if (UI.panel.style.display === 'none') { UI.panel.style.display = 'flex'; AICODE.cfg.menuVisible = true; } else if (!isMinimized) { UI.panel.style.display = 'none'; AICODE.cfg.menuVisible = false; } } });
    
    if (AICODE.cfg.darkMode && typeof DarkReader !== 'undefined') DarkReader.enable();
    setInterval(() => { if (document.getElementById('consoleCleanCheck')?.checked) console.clear(); }, 10000);
  }
  
  static rebindEvents() {
    const autoCheck = document.getElementById('autoCheck');
    const speedControlItem = document.getElementById('speedControlItem');
    if (autoCheck) autoCheck.onchange = (e) => { AICODE.cfg.auto = e.target.checked; speedControlItem.style.display = AICODE.cfg.auto ? 'flex' : 'none'; sendToast(AICODE.cfg.auto ? 'Auto Complete enabled' : 'Auto Complete disabled', 2000); };
    
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    if (speedSlider) {
      const initialIndex = AICODE.cfg.speedOptions.indexOf(AICODE.cfg.autoSpeed);
      speedSlider.value = initialIndex >= 0 ? initialIndex : 0;
      speedSlider.oninput = () => { const index = parseInt(speedSlider.value); AICODE.cfg.autoSpeed = AICODE.cfg.speedOptions[index]; if (speedValue) speedValue.textContent = AICODE.cfg.autoSpeed + 'ms'; };
    }
    
    const darkModeCheck = document.getElementById('darkModeCheck');
    if (darkModeCheck) darkModeCheck.onchange = (e) => { AICODE.cfg.darkMode = e.target.checked; if (typeof DarkReader !== 'undefined') AICODE.cfg.darkMode ? DarkReader.enable() : DarkReader.disable(); sendToast(AICODE.cfg.darkMode ? 'Dark Mode enabled' : 'Dark Mode disabled', 2000); };
    
    const animationCheck = document.getElementById('animationCheck');
    if (animationCheck) animationCheck.onchange = (e) => { AICODE.cfg.showAnimations = e.target.checked; };
    
    const notificationsCheck = document.getElementById('notificationsCheck');
    if (notificationsCheck) notificationsCheck.onchange = (e) => { AICODE.cfg.notificationsEnabled = e.target.checked; sendToast(AICODE.cfg.notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled', 1500); };
    
    const soundCheck = document.getElementById('soundCheck');
    if (soundCheck) soundCheck.onchange = (e) => { AICODE.cfg.soundEffects = e.target.checked; sendToast(AICODE.cfg.soundEffects ? 'Sound effects enabled' : 'Sound effects disabled', 1500); };
    
    const spoofCheck = document.getElementById('spoofCheck');
    if (spoofCheck) spoofCheck.onchange = (e) => { AICODE.cfg.questionSpoof = e.target.checked; sendToast(AICODE.cfg.questionSpoof ? 'Question Spoofing enabled' : 'Question Spoofing disabled', 2000); };
    
    const menuActiveCheck = document.getElementById('menuActiveCheck');
    if (menuActiveCheck) menuActiveCheck.onchange = (e) => { if (!e.target.checked) { UI.panel.style.display = 'none'; AICODE.cfg.menuVisible = false; } };
    
    const opacitySlider = document.getElementById('opacitySlider');
    if (opacitySlider) opacitySlider.oninput = () => { const value = parseFloat(opacitySlider.value); AICODE.cfg.menuOpacity = value; UI.panel.style.background = `rgba(30, 30, 35, ${value})`; };
    
    const colorPreviewBtn = document.getElementById('colorPreviewBtn');
    if (colorPreviewBtn) colorPreviewBtn.addEventListener('click', () => UI.showColorPickerModal());
    
    const keybindBtn = document.getElementById('keybindBtn');
    if (keybindBtn) {
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
        setTimeout(() => { if (isListening) { keybindBtn.textContent = AICODE.cfg.menuKeybind.replace('Key', ''); keybindBtn.classList.remove('active'); isListening = false; } }, 5000);
      });
    }
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) languageSelect.onchange = (e) => { AICODE.cfg.language = e.target.value; sendToast(`Language changed to ${e.target.value === 'en' ? 'English' : 'Português'}`, 1500); UI.loadTabContents(); UI.rebindEvents(); };
    
    const resetBtn = document.getElementById('resetSettingsBtn');
    if (resetBtn) resetBtn.onclick = () => { if (confirm('Reset all settings to default?')) location.reload(); };
    
    const fpsLimitSlider = document.getElementById('fpsLimitSlider');
    if (fpsLimitSlider) fpsLimitSlider.onchange = () => { AICODE.cfg.fpsLimit = parseInt(fpsLimitSlider.value); };
  }
  
  static showColorPickerModal() {
    const modal = document.createElement('div');
    modal.className = 'ai-modal';
    modal.innerHTML = `<div class="ai-modal-content"><div class="ai-modal-header"><span>Color Picker</span><span class="ai-modal-close" id="modalClose">✕</span></div><div id="hsvColorPickerContainer"></div></div>`;
    document.body.appendChild(modal);
    const container = document.getElementById('hsvColorPickerContainer');
    new ColorPickerHSV(container, AICODE.cfg.themeColor, (color, hex) => {
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
      .ai-logo-text { background: linear-gradient(135deg, #fff, ${color}); -webkit-background-clip: text; background-clip: text; }
      .ai-keybind.active { border-color: ${color} !important; background: ${color}20 !important; }
    `;
    document.head.appendChild(style);
  }
  
  static updateStats(type) {
    if (type === 'bypass') { AICODE.stats.questionsBypassed++; const el = document.getElementById('questionsBypassed'); if (el) el.textContent = AICODE.stats.questionsBypassed; }
    else if (type === 'complete') { AICODE.stats.autoCompletions++; const el = document.getElementById('autoCompletions'); if (el) el.textContent = AICODE.stats.autoCompletions; }
    const total = AICODE.stats.questionsBypassed + AICODE.stats.autoCompletions;
    const rate = total > 0 ? Math.round((AICODE.stats.autoCompletions / total) * 100) : 100;
    const rateEl = document.getElementById('successRate'); if (rateEl) rateEl.textContent = `${rate}%`;
  }
}

class Core {
  static async loadExternalLibraries() {
    try {
      await loadCss("https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css");
      await loadScript("https://cdn.jsdelivr.net/npm/toastify-js");
      await loadScript("https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js");
      if (typeof DarkReader !== 'undefined') { DarkReader.setFetchMethod(window.fetch); if (AICODE.cfg.darkMode) DarkReader.enable(); }
      console.clear();
    } catch (error) { console.error("Error loading libraries:", error); }
  }
  
  static init() { this.setupMod(); this.setupAuto(); }
  
  static setupMod() {
    const messages = ["AICODE ACTIVE // SECURE BYPASS", "SYSTEM PROTECTED // UNAUTHORIZED", "AICODE v2.0 // ENGINE ONLINE"];
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
            itemData.question.widgets = { "radio 1": { type: "radio", alignment: "default", static: false, graded: true, options: { choices: [{ content: "✓", correct: true }], randomize: false, multipleSelect: false, displayCount: null, hasNoneOfTheAbove: false, onePerLine: true, deselectEnabled: false } } };
            data.data.assessmentItem.item.itemData = JSON.stringify(itemData);
            sendToast("Question bypassed", 1000);
            if (UI.updateStats) UI.updateStats('bypass');
            return new Response(JSON.stringify(data), { status: response.status, statusText: response.statusText, headers: response.headers });
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
      if (element) { element.click(); if (element.textContent === "Mostrar resumo") { sendToast("Exercise completed", 3000); if (UI.updateStats) UI.updateStats('complete'); playAudio("https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav"); } }
      return !!element;
    }
    async function processElements() {
      if (!AICODE.cfg.auto) return;
      for (const className of classNames) { findAndClickByClass(className); await delay(AICODE.cfg.autoSpeed / 5); }
      const checkAnswerButton = document.querySelector(checkAnswerSelector);
      if (checkAnswerButton) { checkAnswerButton.click(); await delay(AICODE.cfg.autoSpeed / 5); }
    }
    while (true) { await processElements(); await delay(AICODE.cfg.autoSpeed / 3); }
  }
}

async function initApp() {
  try {
    await Core.loadExternalLibraries();
    UI.init();
    Core.init();
    console.log(`AICODE v${AICODE.ver} initialized`);
    sendToast(`AICODE v${AICODE.ver} active`, 2000);
  } catch (error) { console.error("Initialization error:", error); }
}

initApp();
