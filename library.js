// ============================================
// AICODE v2.0 - Library Completa
// ============================================

(function() {
  const VERSION = "2.0";
  
  // ============================================
  // TEMA DARKER (cores inspiradas no Lua)
  // ============================================
  const Theme = {
    bg: {
      primary: "#0a0a0a",
      secondary: "#0f0f0f",
      tertiary: "#0f0f0f",
      card: "rgba(15, 15, 15, 0.7)",
      input: "rgba(18, 18, 18, 0.7)"
    },
    text: {
      primary: "#f0f0f0",
      secondary: "#b4b4b4",
      disabled: "#787878"
    },
    border: {
      primary: "#232323",
      secondary: "#8c8c8c",
      accent: "#7c4dff"
    },
    interactive: {
      hover: "#2d2d37",
      pressed: "#373741",
      selected: "rgba(124, 77, 255, 0.08)",
      tab: "#161616"
    },
    highlight: {
      purple: "#7c4dff",
      purpleDark: "#6200ea",
      green: "#4caf50",
      red: "#f44336",
      orange: "#ff9800"
    },
    apple: {
      red: "#ff4f4f",
      yellow: "#e3e85f",
      green: "#60b541"
    },
    elements: {
      button: { primary: "rgba(18, 18, 18, 0.7)", text: "#c8c8c8", thumb: "#c8c8c8" },
      toggle: { track: "rgba(18, 18, 18, 0.7)", thumb: "#787878", text: "#c8c8c8" },
      checkbox: { track: "rgba(18, 18, 18, 0.7)", thumb: "#c8c8c8", text: "#c8c8c8" },
      slider: { line: "rgba(200, 200, 200, 0.4)", track: "#c8c8c8", thumb: "#b4b4b4", text: "#c8c8c8" },
      dropdown: { primary: "rgba(18, 18, 18, 0.7)", text: "#c8c8c8" },
      input: { primary: "rgba(18, 18, 18, 0.7)", text: "#c8c8c8", placeholder: "#666666" }
    }
  };

  // ============================================
  // ÍCONES SVG (sem emojis)
  // ============================================
  const Icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="100%" height="100%"><polyline points="20 6 9 17 4 12"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="6 9 12 15 18 9"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h.01M18 16h.01"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><circle cx="12" cy="12" r="3"/></svg>',
    radio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
  };

  // ============================================
  // UTILITÁRIOS
  // ============================================
  function css(el, styles) { Object.assign(el.style, styles); return el; }
  
  function createElement(tag, styles = {}, parent = null) {
    const el = document.createElement(tag);
    css(el, styles);
    if (parent) parent.appendChild(el);
    return el;
  }

  function injectGlobalStyles() {
    if (document.getElementById('aicode-global-styles')) return;
    const style = document.createElement('style');
    style.id = 'aicode-global-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600;700&display=swap');
      
      .aic-reset, .aic-reset * {
        margin: 0; padding: 0; box-sizing: border-box;
        user-select: none;
        font-family: 'Source Code Pro', 'Courier New', monospace;
      }
      
      .aic-scroll::-webkit-scrollbar { width: 3px; }
      .aic-scroll::-webkit-scrollbar-track { background: transparent; }
      .aic-scroll::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
      
      @keyframes aic-slideInRight {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes aic-slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(120%); opacity: 0; }
      }
      @keyframes aic-fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes aic-scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // SISTEMA DE NOTIFICAÇÕES (Canto Superior Direito)
  // ============================================
  class NotificationManager {
    constructor() {
      this.container = createElement('div', {
        position: 'fixed',
        top: '15px',
        right: '15px',
        zIndex: '2147483647',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none',
        maxWidth: '320px',
        width: 'auto'
      });
      document.body.appendChild(this.container);
    }

    show({ title = '', message = '', type = 'info', duration = 4000 }) {
      const notification = createElement('div', {
        background: Theme.bg.primary,
        border: '1px solid ' + Theme.border.primary,
        borderRadius: '10px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        pointerEvents: 'auto',
        animation: 'aic-slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
        minWidth: '280px',
        position: 'relative',
        overflow: 'hidden'
      }, this.container);

      // Barra colorida lateral
      const accentColors = {
        success: Theme.highlight.green,
        error: Theme.highlight.red,
        warning: Theme.highlight.orange,
        info: Theme.highlight.purple
      };
      
      createElement('div', {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '3px',
        height: '100%',
        background: accentColors[type] || accentColors.info,
        borderRadius: '3px 0 0 3px'
      }, notification);

      // Ícone
      const iconMap = { success: 'check', error: 'close', warning: 'info', info: 'info' };
      const iconEl = createElement('div', {
        width: '24px',
        height: '24px',
        minWidth: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: accentColors[type] || accentColors.info
      }, notification);
      iconEl.innerHTML = Icons[iconMap[type]] || Icons.info;

      // Conteúdo
      const content = createElement('div', {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }, notification);

      if (title) {
        createElement('div', {
          color: Theme.text.primary,
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.3px'
        }, content).textContent = title;
      }

      if (message) {
        createElement('div', {
          color: Theme.text.secondary,
          fontSize: '11px',
          lineHeight: '1.4'
        }, content).textContent = message;
      }

      // Botão fechar
      const closeBtn = createElement('div', {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
        color: Theme.text.disabled,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s'
      }, notification);
      closeBtn.innerHTML = Icons.close;
      closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = Theme.text.primary);
      closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = Theme.text.disabled);
      closeBtn.addEventListener('click', () => this.remove(notification));

      const timer = setTimeout(() => this.remove(notification), duration);
      notification._timer = timer;

      return notification;
    }

    remove(el) {
      if (el._removing) return;
      el._removing = true;
      clearTimeout(el._timer);
      el.style.animation = 'aic-slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
    }

    success(title, message, duration) { this.show({ title, message, type: 'success', duration }); }
    error(title, message, duration) { this.show({ title, message, type: 'error', duration }); }
    warning(title, message, duration) { this.show({ title, message, type: 'warning', duration }); }
    info(title, message, duration) { this.show({ title, message, type: 'info', duration }); }
  }

  // ============================================
  // COLOR PICKER HSV
  // ============================================
  class ColorPicker {
    constructor(parent, defaultColor = '#7c4dff', callback = null) {
      this.parent = parent;
      this.callback = callback;
      this.color = this.hexToHsv(defaultColor);
      this.container = null;
      this.build();
    }

    hexToHsv(hex) {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
      let h = 0, s = max === 0 ? 0 : d / max, v = max;
      if (d !== 0) {
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
      }
      return { h, s, v };
    }

    hsvToHex(h, s, v) {
      let r, g, b;
      const i = Math.floor(h * 6), f = h * 6 - i;
      const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return '#' + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
    }

    build() {
      this.container = createElement('div', {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }, this.parent);

      // Preview da cor
      this.preview = createElement('div', {
        width: '100%',
        height: '28px',
        borderRadius: '6px',
        border: '1px solid ' + Theme.border.primary,
        transition: 'background 0.15s'
      }, this.container);

      // Canvas SV (Saturation/Value)
      this.canvas = document.createElement('canvas');
      this.canvas.width = 200;
      this.canvas.height = 100;
      css(this.canvas, {
        width: '100%',
        height: '90px',
        borderRadius: '6px',
        cursor: 'crosshair',
        display: 'block',
        border: '1px solid ' + Theme.border.primary
      });
      this.container.appendChild(this.canvas);

      // Hue Slider
      this.hueSlider = createElement('div', {
        width: '100%',
        height: '12px',
        borderRadius: '6px',
        cursor: 'pointer',
        position: 'relative',
        background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
        border: '1px solid ' + Theme.border.primary
      }, this.container);

      this.hueThumb = createElement('div', {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#ffffff',
        border: '2px solid #000000',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        left: '0%',
        pointerEvents: 'none'
      }, this.hueSlider);

      // Input HEX
      this.hexInput = createElement('input', {
        width: '100%',
        height: '26px',
        background: Theme.elements.input.primary,
        border: '1px solid ' + Theme.border.primary,
        borderRadius: '6px',
        color: Theme.text.primary,
        fontSize: '11px',
        textAlign: 'center',
        outline: 'none',
        padding: '0 8px'
      }, this.container);
      this.hexInput.value = this.hsvToHex(this.color.h, this.color.s, this.color.v);

      this.updatePreview();
      this.drawSV();
      this.updateHueThumb();
      this.setupEvents();
    }

    updatePreview() {
      const hex = this.hsvToHex(this.color.h, this.color.s, this.color.v);
      this.preview.style.background = hex;
      this.hexInput.value = hex;
      if (this.callback) this.callback(hex);
    }

    drawSV() {
      const ctx = this.canvas.getContext('2d');
      const w = this.canvas.width, h = this.canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let y = 0; y < h; y++) {
        const v = 1 - y / h;
        for (let x = 0; x < w; x++) {
          const s = x / w;
          const hex = this.hsvToHex(this.color.h, s, v);
          ctx.fillStyle = hex;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      const cx = this.color.s * w;
      const cy = (1 - this.color.v) * h;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    updateHueThumb() {
      this.hueThumb.style.left = (this.color.h * 100) + '%';
    }

    setupEvents() {
      // Canvas SV
      this.canvas.addEventListener('mousedown', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const update = (ex, ey) => {
          const x = Math.max(0, Math.min(1, (ex - rect.left) / rect.width));
          const y = Math.max(0, Math.min(1, (ey - rect.top) / rect.height));
          this.color.s = x;
          this.color.v = 1 - y;
          this.drawSV();
          this.updatePreview();
        };
        update(e.clientX, e.clientY);

        const onMove = (me) => update(me.clientX, me.clientY);
        const onUp = () => {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });

      // Hue Slider
      this.hueSlider.addEventListener('mousedown', (e) => {
        const rect = this.hueSlider.getBoundingClientRect();
        const update = (ex) => {
          const x = Math.max(0, Math.min(1, (ex - rect.left) / rect.width));
          this.color.h = x;
          this.updateHueThumb();
          this.drawSV();
          this.updatePreview();
        };
        update(e.clientX);

        const onMove = (me) => update(me.clientX);
        const onUp = () => {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });

      // Hex Input
      this.hexInput.addEventListener('change', () => {
        const hex = this.hexInput.value;
        if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
          this.color = this.hexToHsv(hex);
          this.updateHueThumb();
          this.drawSV();
          this.updatePreview();
        }
      });
    }

    getValue() { return this.hsvToHex(this.color.h, this.color.s, this.color.v); }
    setValue(hex) {
      this.color = this.hexToHsv(hex);
      this.updateHueThumb();
      this.drawSV();
      this.updatePreview();
    }
  }

  // ============================================
  // JANELA PRINCIPAL
  // ============================================
  class Window {
    constructor(settings = {}) {
      this.notifications = new NotificationManager();
      this.keyBind = settings.KeyBind || 'F2';
      this.espEnabled = false;
      this.espWindow = null;
      this.tabs = [];
      this.activeTab = null;
      this.activeSubTab = null;

      injectGlobalStyles();
      this.build();
      this.bindKey();
    }

    build() {
      // Container ScreenGui
      this.screenGui = createElement('div', {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '2147483640',
        pointerEvents: 'none'
      }, document.body);
      this.screenGui.className = 'aic-reset';

      // Window Frame
      this.panel = createElement('div', {
        position: 'absolute',
        width: '620px',
        height: '420px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        borderRadius: '10px',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        minWidth: '450px',
        minHeight: '320px',
        maxWidth: '850px',
        maxHeight: '650px',
        resize: 'both'
      }, this.screenGui);

      // Container Principal
      this.containerFuns = createElement('div', {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: Theme.bg.primary,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px ' + Theme.border.primary + ', 0 15px 50px rgba(0,0,0,0.8)'
      }, this.panel);

      this.buildLeftPanel();
      this.buildRightPanel();
      this.setupDrag();
    }

    buildLeftPanel() {
      const leftPanel = createElement('div', {
        width: '85px',
        minWidth: '85px',
        height: '100%',
        background: Theme.bg.secondary,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid ' + Theme.border.primary,
        borderRadius: '10px 0 0 10px',
        overflow: 'hidden'
      }, this.containerFuns);

      // Apple Balls + Drag
      this.ballsArea = createElement('div', {
        width: '100%',
        height: '35px',
        minHeight: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        borderBottom: '1px solid rgba(35,35,35,0.5)',
        cursor: 'move',
        position: 'relative'
      }, leftPanel);

      [Theme.apple.red, Theme.apple.yellow, Theme.apple.green].forEach((color, i) => {
        const ball = createElement('div', {
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: color,
          opacity: '0',
          transition: 'opacity 0.5s ease'
        }, this.ballsArea);
        setTimeout(() => { ball.style.opacity = '1'; }, 400 * i);
      });

      // Tabs Container
      this.tabsContainer = createElement('div', {
        flex: '1',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }, leftPanel);
      this.tabsContainer.className = 'aic-scroll';

      // User Area
      const userArea = createElement('div', {
        width: '100%',
        height: '45px',
        minHeight: '45px',
        borderTop: '1px solid rgba(35,35,35,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }, leftPanel);

      const avatarFrame = createElement('div', {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#1a1a1a',
        border: '1px solid ' + Theme.border.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }, userArea);

      const avatarIcon = createElement('div', {
        width: '20px',
        height: '20px',
        color: Theme.text.disabled
      }, avatarFrame);
      avatarIcon.innerHTML = Icons.user;
    }

    buildRightPanel() {
      const rightPanel = createElement('div', {
        flex: '1',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        overflow: 'hidden'
      }, this.containerFuns);

      // Right Tabs Frame
      this.rightTabsFrame = createElement('div', {
        width: '100%',
        height: '35px',
        minHeight: '35px',
        background: Theme.bg.secondary,
        borderBottom: '1px solid rgba(35,35,35,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        borderRadius: '0 10px 0 0',
        position: 'relative'
      }, rightPanel);

      // Título
      this.titleLabel = createElement('div', {
        color: Theme.text.primary,
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        marginLeft: 'auto',
        padding: '4px 8px',
        whiteSpace: 'nowrap'
      }, this.rightTabsFrame);
      this.titleLabel.textContent = 'AICODE v' + VERSION;

      // Container de SubTabs
      this.subTabsContainer = createElement('div', {
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        height: '100%',
        position: 'absolute',
        left: '8px',
        top: '0'
      }, this.rightTabsFrame);

      // Linha indicadora
      this.activeLine = createElement('div', {
        position: 'absolute',
        bottom: '0',
        height: '2px',
        background: Theme.highlight.purple,
        borderRadius: '2px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: '0'
      }, this.rightTabsFrame);

      // Content Area
      const contentArea = createElement('div', {
        flex: '1',
        padding: '10px',
        position: 'relative',
        overflow: 'hidden'
      }, rightPanel);

      this.tabContentsContainer = createElement('div', {
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        bottom: '10px'
      }, contentArea);
    }

    setupDrag() {
      let dragging = false;
      let offsetX = 0;
      let offsetY = 0;

      this.ballsArea.addEventListener('mousedown', (e) => {
        dragging = true;
        const rect = this.panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        this.panel.style.transition = 'none';
        this.panel.style.cursor = 'grabbing';
        e.preventDefault();
      });

      document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const parentRect = this.screenGui.getBoundingClientRect();
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        newLeft = Math.max(0, Math.min(newLeft, parentRect.width - this.panel.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, parentRect.height - this.panel.offsetHeight));

        this.panel.style.left = newLeft + 'px';
        this.panel.style.top = newTop + 'px';
        this.panel.style.transform = 'none';
        this.updateEspPosition();
      });

      document.addEventListener('mouseup', () => {
        if (dragging) {
          dragging = false;
          this.panel.style.transition = '';
          this.panel.style.cursor = '';
        }
      });
    }

    bindKey() {
      document.addEventListener('keydown', (e) => {
        if (e.key === this.keyBind || e.code === this.keyBind) {
          e.preventDefault();
          const isVisible = this.panel.style.display !== 'none';
          this.panel.style.display = isVisible ? 'none' : 'flex';
          if (this.espWindow) {
            this.espWindow.style.display = this.panel.style.display;
          }
        }
      });
    }

    updateEspPosition() {
      if (!this.espWindow) return;
      const rect = this.panel.getBoundingClientRect();
      this.espWindow.style.left = (rect.right + 10) + 'px';
      this.espWindow.style.top = rect.top + 'px';
      this.espWindow.style.height = rect.height + 'px';
    }

    showEspPreview() {
      if (this.espWindow) return;

      const rect = this.panel.getBoundingClientRect();
      this.espWindow = createElement('div', {
        position: 'fixed',
        left: (rect.right + 10) + 'px',
        top: rect.top + 'px',
        width: '300px',
        height: rect.height + 'px',
        background: Theme.bg.primary,
        borderRadius: '10px',
        border: '1px solid ' + Theme.border.primary,
        zIndex: '2147483639',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }, document.body);
      this.espWindow.className = 'aic-reset';

      // Header
      const header = createElement('div', {
        height: '30px',
        background: Theme.bg.secondary,
        borderBottom: '1px solid ' + Theme.border.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        borderRadius: '10px 10px 0 0'
      }, this.espWindow);

      createElement('div', {
        color: Theme.text.primary,
        fontSize: '11px',
        fontWeight: '700'
      }, header).textContent = 'ESP Preview';

      const closeBtn = createElement('div', {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
        color: Theme.text.disabled,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s'
      }, header);
      closeBtn.innerHTML = Icons.close;
      closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = Theme.text.primary);
      closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = Theme.text.disabled);
      closeBtn.addEventListener('click', () => {
        this.espWindow.remove();
        this.espWindow = null;
        this.espEnabled = false;
      });

      // Canvas ESP
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      css(canvas, {
        width: '100%',
        height: 'auto',
        background: '#000000',
        flex: '1'
      });

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 300, 300);

      // Desenhar boxes ESP simuladas
      const boxes = [
        { x: 100, y: 60, w: 80, h: 130, label: 'Player', color: '#4caf50' },
        { x: 200, y: 40, w: 60, h: 100, label: 'Enemy', color: '#f44336' },
        { x: 40, y: 140, w: 70, h: 110, label: 'Item', color: '#ff9800' }
      ];

      boxes.forEach(box => {
        // Box
        ctx.strokeStyle = box.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.w, box.h);

        // Cantos destacados
        const cs = 12;
        ctx.beginPath();
        ctx.moveTo(box.x, box.y + cs); ctx.lineTo(box.x, box.y); ctx.lineTo(box.x + cs, box.y);
        ctx.moveTo(box.x + box.w - cs, box.y); ctx.lineTo(box.x + box.w, box.y); ctx.lineTo(box.x + box.w, box.y + cs);
        ctx.moveTo(box.x + box.w, box.y + box.h - cs); ctx.lineTo(box.x + box.w, box.y + box.h); ctx.lineTo(box.x + box.w - cs, box.y + box.h);
        ctx.moveTo(box.x + cs, box.y + box.h); ctx.lineTo(box.x, box.y + box.h); ctx.lineTo(box.x, box.y + box.h - cs);
        ctx.stroke();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "Courier New", monospace';
        ctx.fillText(box.label, box.x + 2, box.y - 6);

        // Linha da cabeça
        ctx.beginPath();
        ctx.strokeStyle = box.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(box.x + box.w / 2, box.y);
        ctx.lineTo(box.x + box.w / 2, box.y - 20);
        ctx.stroke();
        ctx.setLineDash([]);

        // Ponto da cabeça
        ctx.beginPath();
        ctx.arc(box.x + box.w / 2, box.y - 23, 4, 0, Math.PI * 2);
        ctx.fillStyle = box.color;
        ctx.fill();
      });

      this.espWindow.appendChild(canvas);

      // Info
      createElement('div', {
        padding: '8px',
        color: Theme.text.disabled,
        fontSize: '9px',
        textAlign: 'center',
        borderTop: '1px solid ' + Theme.border.primary
      }, this.espWindow).textContent = 'ESP Preview - Real-time overlay';
    }

    hideEspPreview() {
      if (this.espWindow) {
        this.espWindow.remove();
        this.espWindow = null;
      }
      this.espEnabled = false;
    }

    // ============================================
    // API DE TABS
    // ============================================
    addTab(iconName) {
      const tabData = {
        id: 'tab-' + this.tabs.length,
        icon: iconName || 'home',
        button: null,
        content: null,
        subTabsContainer: null,
        subTabs: [],
        active: false
      };

      // Tab Button
      tabData.button = createElement('div', {
        width: '50px',
        height: '40px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid transparent',
        background: 'transparent',
        position: 'relative'
      }, this.tabsContainer);

      const iconWrapper = createElement('div', {
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: Theme.text.secondary,
        opacity: '0.6',
        transition: 'all 0.2s ease'
      }, tabData.button);
      iconWrapper.innerHTML = Icons[tabData.icon] || Icons.home;

      // Tab Content
      tabData.content = createElement('div', {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'none',
        flexDirection: 'column',
        overflow: 'hidden'
      }, this.tabContentsContainer);

      // SubTabs Wrapper
      tabData.subTabsContainer = createElement('div', {
        display: 'none',
        gap: '0',
        height: '100%',
        alignItems: 'center'
      }, this.subTabsContainer);

      // Click event
      tabData.button.addEventListener('click', () => {
        if (this.activeTab === tabData) return;

        if (this.activeTab) {
          css(this.activeTab.button, {
            background: 'transparent',
            border: '1px solid transparent',
            width: '50px',
            height: '40px'
          });
          this.activeTab.button.querySelector('div').style.opacity = '0.6';
          this.activeTab.button.querySelector('div').style.color = Theme.text.secondary;
          this.activeTab.content.style.display = 'none';
          this.activeTab.subTabsContainer.style.display = 'none';
          this.activeTab.active = false;
        }

        css(tabData.button, {
          background: Theme.interactive.selected,
          border: '1px solid ' + Theme.border.primary,
          width: '55px',
          height: '45px'
        });
        tabData.button.querySelector('div').style.opacity = '1';
        tabData.button.querySelector('div').style.color = Theme.text.primary;
        tabData.content.style.display = 'flex';
        tabData.subTabsContainer.style.display = 'flex';
        tabData.active = true;

        this.activeTab = tabData;

        if (tabData.subTabs.length > 0) {
          this.activateSubTab(tabData.subTabs[0]);
        }
      });

      this.tabs.push(tabData);

      if (this.tabs.length === 1) {
        tabData.button.click();
      }

      return {
        addSubTab: (name) => this.addSubTab(tabData, name)
      };
    }

    addSubTab(parentTab, name) {
      const subData = {
        id: 'subtab-' + parentTab.subTabs.length,
        name: name || 'SubTab',
        button: null,
        content: null,
        leftColumn: null,
        rightColumn: null,
        active: false
      };

      // SubTab Button
      subData.button = createElement('div', {
        padding: '4px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '12px',
        color: Theme.text.secondary,
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        background: 'transparent',
        height: '27px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        letterSpacing: '0.3px'
      }, parentTab.subTabsContainer);
      subData.button.textContent = subData.name;

      // SubTab Content
      subData.content = createElement('div', {
        display: 'none',
        width: '100%',
        height: '100%'
      }, parentTab.content);

      const scrollContainer = createElement('div', {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '2px',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: '12px'
      }, subData.content);
      scrollContainer.className = 'aic-scroll';

      subData.leftColumn = createElement('div', {
        width: 'calc(50% - 6px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minWidth: '220px'
      }, scrollContainer);

      subData.rightColumn = createElement('div', {
        width: 'calc(50% - 6px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minWidth: '220px'
      }, scrollContainer);

      // Click event
      subData.button.addEventListener('click', () => this.activateSubTab(subData));

      parentTab.subTabs.push(subData);

      if (parentTab.subTabs.length === 1) {
        this.activateSubTab(subData);
      }

      return {
        addSection: (header, side) => this.addSection(subData, header, side)
      };
    }

    activateSubTab(subData) {
      if (this.activeSubTab === subData) return;

      if (this.activeSubTab) {
        css(this.activeSubTab.button, {
          color: Theme.text.secondary,
          background: 'transparent'
        });
        this.activeSubTab.content.style.display = 'none';
        this.activeSubTab.active = false;
      }

      css(subData.button, {
        color: Theme.text.primary,
        background: Theme.interactive.selected
      });
      subData.content.style.display = 'block';
      subData.active = true;

      // Animar linha indicadora
      const btnRect = subData.button.getBoundingClientRect();
      const parentRect = this.rightTabsFrame.getBoundingClientRect();
      const leftPos = btnRect.left - parentRect.left;
      const width = btnRect.width;

      this.activeLine.style.opacity = '1';
      this.activeLine.style.left = leftPos + 'px';
      this.activeLine.style.width = width + 'px';

      this.activeSubTab = subData;
    }

    addSection(subData, header, side) {
      const column = side === 'right' ? subData.rightColumn : subData.leftColumn;

      const sectionWrapper = createElement('div', {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0'
      }, column);

      // Header da seção (se houver)
      if (header) {
        createElement('div', {
          fontSize: '10px',
          color: Theme.text.disabled,
          padding: '0 4px 8px 4px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontWeight: '700'
        }, sectionWrapper).textContent = header;
      }

      // Card da seção
      const sectionCard = createElement('div', {
        width: '100%',
        background: Theme.bg.card,
        borderRadius: '7px',
        border: '1px solid ' + Theme.border.primary,
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }, sectionWrapper);

      const self = this;

      return {
        addButton: (name, callback) => {
          const btn = createElement('div', {
            width: '100%',
            height: '32px',
            background: Theme.elements.button.primary,
            borderRadius: '7px',
            border: '1px solid rgba(35, 35, 35, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '12px',
            color: Theme.elements.button.text,
            letterSpacing: '0.3px',
            position: 'relative'
          }, sectionCard);
          btn.textContent = name || 'Button';

          // Thumb indicador
          const thumb = createElement('div', {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '1px solid rgba(200, 200, 200, 0.4)',
            position: 'absolute',
            right: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0.6',
            transition: 'all 0.2s ease'
          }, btn);
          createElement('div', {
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: Theme.elements.button.thumb,
            opacity: '0.6'
          }, thumb);

          btn.addEventListener('mouseenter', () => {
            btn.style.background = Theme.interactive.hover;
            btn.style.color = Theme.text.primary;
            thumb.style.opacity = '1';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.background = Theme.elements.button.primary;
            btn.style.color = Theme.elements.button.text;
            thumb.style.opacity = '0.6';
          });
          btn.addEventListener('click', () => { if (callback) callback(); });
        },

        addToggle: (name, defaultVal, callback) => {
          let toggled = defaultVal || false;

          const frame = createElement('div', {
            width: '100%',
            height: '30px',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '0 5px'
          }, sectionCard);

          createElement('span', {
            fontSize: '12px',
            color: Theme.elements.toggle.text,
            transition: 'color 0.2s ease',
            letterSpacing: '0.3px'
          }, frame).textContent = name || 'Toggle';

          const switchContainer = createElement('div', {
            width: '38px',
            height: '17px',
            background: Theme.elements.toggle.track,
            borderRadius: '7px',
            border: '1px solid rgba(35, 35, 35, 0.4)',
            position: 'relative',
            transition: 'all 0.3s ease'
          }, frame);

          const switchThumb = createElement('div', {
            width: '12px',
            height: '12px',
            background: Theme.elements.toggle.thumb,
            borderRadius: '4px',
            position: 'absolute',
            left: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }, switchContainer);

          const updateToggle = () => {
            if (toggled) {
              switchContainer.style.background = 'linear-gradient(135deg, ' + Theme.highlight.purpleDark + ', ' + Theme.highlight.purple + ')';
              switchContainer.style.borderColor = Theme.highlight.purple;
              switchThumb.style.background = '#ffffff';
              switchThumb.style.left = '22px';
            } else {
              switchContainer.style.background = Theme.elements.toggle.track;
              switchContainer.style.borderColor = 'rgba(35, 35, 35, 0.4)';
              switchThumb.style.background = Theme.elements.toggle.thumb;
              switchThumb.style.left = '2px';
            }
          };
          updateToggle();

          frame.addEventListener('click', () => {
            toggled = !toggled;
            updateToggle();
            if (callback) callback(toggled);
            self.notifications.info(name, toggled ? 'Enabled' : 'Disabled', 1500);
          });
        },

        addCheckbox: (name, defaultVal, callback) => {
          let checked = defaultVal || false;

          const frame = createElement('div', {
            width: '100%',
            height: '30px',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '0 5px'
          }, sectionCard);

          createElement('span', {
            fontSize: '12px',
            color: Theme.elements.checkbox.text,
            transition: 'color 0.2s ease',
            letterSpacing: '0.3px'
          }, frame).textContent = name || 'Checkbox';

          const box = createElement('div', {
            width: '20px',
            height: '20px',
            background: Theme.elements.checkbox.track,
            borderRadius: '5px',
            border: '1px solid rgba(35, 35, 35, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }, frame);

          const checkIcon = createElement('div', {
            width: '14px',
            height: '14px',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            color: Theme.elements.checkbox.thumb,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }, box);
          checkIcon.innerHTML = Icons.check;

          const updateCheckbox = () => {
            if (checked) {
              box.style.borderColor = Theme.highlight.purple;
              box.style.background = 'rgba(124, 77, 255, 0.15)';
              checkIcon.style.opacity = '0.8';
            } else {
              box.style.borderColor = 'rgba(35, 35, 35, 0.4)';
              box.style.background = Theme.elements.checkbox.track;
              checkIcon.style.opacity = '0';
            }
          };
          updateCheckbox();

          frame.addEventListener('click', () => {
            checked = !checked;
            updateCheckbox();
            if (callback) callback(checked);
          });
        },

        addSlider: (name, defaultVal, min, max, callback) => {
          let currentValue = defaultVal || 50;
          const mn = min || 0;
          const mx = max || 100;

          const frame = createElement('div', {
            width: '100%',
            height: '30px',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            padding: '0 5px',
            gap: '8px'
          }, sectionCard);

          createElement('span', {
            fontSize: '12px',
            color: Theme.elements.slider.text,
            whiteSpace: 'nowrap',
            minWidth: '60px',
            letterSpacing: '0.3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }, frame).textContent = name || 'Slider';

          const trackContainer = createElement('div', {
            flex: '1',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer'
          }, frame);

          const trackBg = createElement('div', {
            width: '100%',
            height: '2px',
            background: Theme.elements.slider.line,
            borderRadius: '2px',
            position: 'relative'
          }, trackContainer);

          const trackFill = createElement('div', {
            width: '50%',
            height: '100%',
            background: Theme.elements.slider.track,
            borderRadius: '2px',
            transition: 'width 0.05s ease'
          }, trackBg);

          const thumb = createElement('div', {
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: Theme.elements.slider.thumb,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.05s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.5)'
          }, trackBg);

          const valueDisplay = createElement('span', {
            fontSize: '11px',
            color: Theme.elements.slider.text,
            minWidth: '45px',
            textAlign: 'right',
            whiteSpace: 'nowrap',
            letterSpacing: '0.3px'
          }, frame);

          const updatePosition = (val) => {
            const percent = ((val - mn) / (mx - mn)) * 100;
            trackFill.style.width = percent + '%';
            thumb.style.left = percent + '%';
            valueDisplay.textContent = Math.round(val);
          };
          updatePosition(currentValue);

          const getValueFromEvent = (e) => {
            const rect = trackBg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
            return Math.round(mn + (percent / 100) * (mx - mn));
          };

          let isDragging = false;
          trackContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            currentValue = getValueFromEvent(e);
            updatePosition(currentValue);
            if (callback) callback(currentValue);
            e.preventDefault();
          });

          document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentValue = getValueFromEvent(e);
            updatePosition(currentValue);
            if (callback) callback(currentValue);
          });

          document.addEventListener('mouseup', () => { isDragging = false; });
        },

        addDropdown: (name, values, defaultVal, callback) => {
          const vals = values || [];
          let selected = defaultVal || vals[0] || '';

          const frame = createElement('div', {
            width: '100%',
            minHeight: '30px',
            background: Theme.elements.dropdown.primary,
            borderRadius: '8px',
            border: '1px solid ' + Theme.border.primary,
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.2s ease',
            overflow: 'hidden'
          }, sectionCard);

          const header = createElement('div', {
            width: '100%',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px'
          }, frame);

          const label = createElement('span', {
            fontSize: '12px',
            color: Theme.elements.dropdown.text,
            flex: '1',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '0.3px'
          }, header);
          label.textContent = (name || 'Dropdown') + ': ' + selected;

          const chevron = createElement('div', {
            width: '13px',
            height: '13px',
            color: Theme.elements.dropdown.text,
            opacity: '0.6',
            transition: 'transform 0.3s ease',
            transform: 'rotate(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }, header);
          chevron.innerHTML = Icons.chevronDown;

          const optionsContainer = createElement('div', {
            width: '100%',
            maxHeight: '0',
            overflow: 'hidden',
            borderTop: '1px solid transparent',
            padding: '0 8px',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }, frame);

          let isOpen = false;

          const buildOptions = () => {
            optionsContainer.innerHTML = '';
            vals.forEach((val) => {
              const opt = createElement('div', {
                width: '100%',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                fontSize: '12px',
                color: val === selected ? Theme.text.primary : Theme.elements.dropdown.text,
                cursor: 'pointer',
                borderRadius: '8px',
                border: '1px solid transparent',
                background: val === selected ? Theme.interactive.selected : 'transparent',
                transition: 'all 0.15s ease',
                letterSpacing: '0.3px',
                marginBottom: '2px'
              }, optionsContainer);
              opt.textContent = val;

              opt.addEventListener('mouseenter', () => {
                if (val !== selected) opt.style.background = Theme.interactive.hover;
              });
              opt.addEventListener('mouseleave', () => {
                if (val !== selected) opt.style.background = 'transparent';
              });
              opt.addEventListener('click', (e) => {
                e.stopPropagation();
                selected = val;
                label.textContent = (name || 'Dropdown') + ': ' + val;
                buildOptions();
                closeDropdown();
                if (callback) callback(val);
                self.notifications.info(name, val, 1500);
              });
            });
          };

          const openDropdown = () => {
            isOpen = true;
            const totalHeight = vals.length * 32 + 16;
            optionsContainer.style.maxHeight = totalHeight + 'px';
            optionsContainer.style.borderTop = '1px solid ' + Theme.border.primary;
            optionsContainer.style.padding = '8px';
            chevron.style.transform = 'rotate(0deg)';
            frame.style.borderColor = Theme.highlight.purple;
          };

          const closeDropdown = () => {
            isOpen = false;
            optionsContainer.style.maxHeight = '0';
            optionsContainer.style.borderTop = '1px solid transparent';
            optionsContainer.style.padding = '0 8px';
            chevron.style.transform = 'rotate(180deg)';
            frame.style.borderColor = Theme.border.primary;
          };

          buildOptions();

          header.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isOpen) closeDropdown();
            else openDropdown();
          });

          document.addEventListener('click', () => {
            if (isOpen) closeDropdown();
          });
        },

        addInput: (name, placeholder, callback) => {
          const frame = createElement('div', {
            width: '100%',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 5px'
          }, sectionCard);

          createElement('span', {
            fontSize: '12px',
            color: Theme.elements.input.text,
            whiteSpace: 'nowrap',
            minWidth: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '0.3px'
          }, frame).textContent = name || 'Input';

          const input = createElement('input', {
            flex: '1',
            height: '100%',
            background: Theme.elements.input.primary,
            border: '1px solid ' + Theme.border.primary,
            borderRadius: '6px',
            color: Theme.elements.input.text,
            fontSize: '12px',
            padding: '0 8px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }, frame);
          input.placeholder = placeholder || '';

          input.addEventListener('focus', () => input.style.borderColor = Theme.highlight.purple);
          input.addEventListener('blur', () => input.style.borderColor = Theme.border.primary);
          input.addEventListener('change', () => { if (callback) callback(input.value); });
        },

        addKeybind: (name, defaultKey, callback) => {
          let currentKey = defaultKey || 'None';
          let listening = false;

          const frame = createElement('div', {
            width: '100%',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '0 5px'
          }, sectionCard);

          createElement('span', {
            fontSize: '12px',
            color: Theme.elements.input.text,
            letterSpacing: '0.3px'
          }, frame).textContent = name || 'Keybind';

          const bindDisplay = createElement('div', {
            padding: '4px 10px',
            background: Theme.elements.input.primary,
            borderRadius: '5px',
            border: '1px solid ' + Theme.border.primary,
            fontSize: '11px',
            color: Theme.highlight.purple,
            transition: 'all 0.2s ease',
            minWidth: '60px',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }, frame);
          bindDisplay.textContent = '[' + currentKey + ']';

          frame.addEventListener('click', () => {
            if (listening) return;
            listening = true;
            bindDisplay.textContent = '[...]';
            bindDisplay.style.borderColor = Theme.highlight.purple;
            bindDisplay.style.animation = 'aic-fadeIn 0.5s infinite alternate';

            const onKeyDown = (e) => {
              if (!listening) return;
              e.preventDefault();
              e.stopPropagation();
              currentKey = e.key || e.code;
              bindDisplay.textContent = '[' + currentKey + ']';
              bindDisplay.style.borderColor = Theme.border.primary;
              bindDisplay.style.animation = '';
              listening = false;
              if (callback) callback(currentKey);
              self.notifications.info(name, 'Bound to: ' + currentKey, 1500);
              document.removeEventListener('keydown', onKeyDown);
            };

            document.addEventListener('keydown', onKeyDown);
          });
        },

        addColorPicker: (name, defaultColor, callback) => {
          const wrapper = createElement('div', {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }, sectionCard);

          if (name) {
            createElement('div', {
              fontSize: '10px',
              color: Theme.text.disabled,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '700'
            }, wrapper).textContent = name;
          }

          new ColorPicker(wrapper, defaultColor || '#7c4dff', callback);
        },

        addRadioGroup: (name, options, defaultVal, callback) => {
          let selected = defaultVal || (options[0] ? options[0].value : null);
          const radioButtons = [];

          const wrapper = createElement('div', {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }, sectionCard);

          if (name) {
            createElement('div', {
              fontSize: '10px',
              color: Theme.text.disabled,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '700',
              marginBottom: '2px'
            }, wrapper).textContent = name;
          }

          (options || []).forEach((opt) => {
            const optFrame = createElement('div', {
              width: '100%',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }, wrapper);

            const circle = createElement('div', {
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              border: '1px solid ' + Theme.border.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              minWidth: '16px'
            }, optFrame);

            const dot = createElement('div', {
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: Theme.highlight.purple,
              opacity: '0',
              transition: 'opacity 0.2s ease'
            }, circle);

            createElement('span', {
              fontSize: '12px',
              color: Theme.elements.input.text,
              letterSpacing: '0.3px'
            }, optFrame).textContent = opt.label || opt.value;

            const update = () => {
              if (selected === opt.value) {
                circle.style.borderColor = Theme.highlight.purple;
                dot.style.opacity = '1';
                optFrame.querySelector('span').style.color = Theme.text.primary;
              } else {
                circle.style.borderColor = Theme.border.secondary;
                dot.style.opacity = '0';
                optFrame.querySelector('span').style.color = Theme.elements.input.text;
              }
            };
            update();

            optFrame.addEventListener('click', () => {
              selected = opt.value;
              radioButtons.forEach(r => r.update());
              if (callback) callback(selected);
            });

            radioButtons.push({ update });
          });
        },

        addEspToggle: (name, defaultVal, callback) => {
          let enabled = defaultVal || false;

          const frame = createElement('div', {
            width: '100%',
            height: '30px',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            padding: '0 5px'
          }, sectionCard);

          createElement('span', {
            fontSize: '12px',
            color: Theme.elements.toggle.text,
            transition: 'color 0.2s ease',
            letterSpacing: '0.3px'
          }, frame).textContent = name || 'ESP Preview';

          const switchContainer = createElement('div', {
            width: '38px',
            height: '17px',
            background: Theme.elements.toggle.track,
            borderRadius: '7px',
            border: '1px solid rgba(35, 35, 35, 0.4)',
            position: 'relative',
            transition: 'all 0.3s ease'
          }, frame);

          const switchThumb = createElement('div', {
            width: '12px',
            height: '12px',
            background: Theme.elements.toggle.thumb,
            borderRadius: '4px',
            position: 'absolute',
            left: '2px',
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }, switchContainer);

          const updateToggle = () => {
            if (enabled) {
              switchContainer.style.background = 'linear-gradient(135deg, ' + Theme.highlight.purpleDark + ', ' + Theme.highlight.purple + ')';
              switchContainer.style.borderColor = Theme.highlight.purple;
              switchThumb.style.background = '#ffffff';
              switchThumb.style.left = '22px';
            } else {
              switchContainer.style.background = Theme.elements.toggle.track;
              switchContainer.style.borderColor = 'rgba(35, 35, 35, 0.4)';
              switchThumb.style.background = Theme.elements.toggle.thumb;
              switchThumb.style.left = '2px';
            }
          };
          updateToggle();

          frame.addEventListener('click', () => {
            enabled = !enabled;
            updateToggle();
            self.espEnabled = enabled;
            if (enabled) {
              self.showEspPreview();
            } else {
              self.hideEspPreview();
            }
            if (callback) callback(enabled);
          });
        }
      };
    }
  }

  // ============================================
  // EXPOSIÇÃO GLOBAL
  // ============================================
  window.AICODE = {
    VERSION,
    Window,
    NotificationManager,
    ColorPicker,
    createWindow: (settings) => new Window(settings)
  };

  console.log('[AICODE v' + VERSION + '] Library loaded successfully!');
})();

// ============================================
// DEMO AUTOMÁTICA (remova em produção)
// ============================================
(function() {
  // Carregar Toastify
  if (typeof Toastify === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
    script.onload = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
      document.head.appendChild(link);
      runDemo();
    };
    document.head.appendChild(script);
  } else {
    runDemo();
  }

  function runDemo() {
    const win = new AICODE.Window({ KeyBind: 'F2' });
    win.notifications.success('AICODE', 'Library v' + AICODE.VERSION + ' carregada!', 3000);

    // Tab Home
    const homeTab = win.addTab('home');
    const generalSubTab = homeTab.addSubTab('General');

    const controlsSection = generalSubTab.addSection('Controls', 'left');
    controlsSection.addButton('Execute', () => console.log('Executed!'));
    controlsSection.addButton('Refresh', () => win.notifications.info('Refresh', 'Updated!', 1500));
    controlsSection.addToggle('Enable Mod', false, (v) => console.log('Mod:', v));
    controlsSection.addCheckbox('Auto Start', true, (v) => console.log('Auto:', v));

    const valuesSection = generalSubTab.addSection('Values', 'right');
    valuesSection.addSlider('Volume', 75, 0, 100, (v) => console.log('Volume:', v));
    valuesSection.addDropdown('Mode', ['Easy', 'Normal', 'Hard'], 'Normal', (v) => console.log('Mode:', v));
    valuesSection.addInput('Username', 'Player', (v) => console.log('User:', v));
    valuesSection.addKeybind('Action Key', 'E', (k) => console.log('Key:', k));

    // SubTab ESP
    const espSubTab = homeTab.addSubTab('ESP');
    const espSection = espSubTab.addSection('ESP Settings', 'left');
    espSection.addEspToggle('Enable ESP', false, (v) => console.log('ESP:', v));
    espSection.addToggle('Box ESP', true, (v) => console.log('Box:', v));
    espSection.addToggle('Skeleton', false, (v) => console.log('Skeleton:', v));
    espSection.addColorPicker('Box Color', '#4caf50', (v) => console.log('Color:', v));
    espSection.addRadioGroup('Target', [
      { label: 'Enemies', value: 'enemies' },
      { label: 'All Players', value: 'all' },
      { label: 'NPCs', value: 'npcs' }
    ], 'enemies', (v) => console.log('Target:', v));

    // Tab Settings
    const settingsTab = win.addTab('settings');
    const configSubTab = settingsTab.addSubTab('Config');
    const themeSection = configSubTab.addSection('Theme', 'left');
    themeSection.addColorPicker('Accent', '#7c4dff', (v) => console.log('Accent:', v));
    themeSection.addSlider('Opacity', 100, 50, 100, (v) => console.log('Opacity:', v));
    themeSection.addRadioGroup('Font', [
      { label: 'Monospace', value: 'mono' },
      { label: 'Sans', value: 'sans' }
    ], 'mono', (v) => console.log('Font:', v));
  }
})();
