// ============================================
// AICODE v2.0 - Library Completa
// ============================================

const AICODE_LIB = (() => {
  const VERSION = "2.0";
  const APP = { name: "AICODE", ver: VERSION };
  
  // ============================================
  // TEMA
  // ============================================
  const T = {
    bg: { primary: "#080808", secondary: "#0d0d0d", card: "#111111", input: "#0f0f0f" },
    text: { primary: "#e8e8e8", secondary: "#a0a0a0", disabled: "#666666" },
    border: { primary: "#1a1a1a", secondary: "#2a2a2a", accent: "#7c4dff" },
    accent: { main: "#7c4dff", dark: "#6200ea", light: "#9d7dff" },
    hover: "#1a1a1a",
    apple: { red: "#ff5f57", yellow: "#febc2e", green: "#28c840" }
  };

  // ============================================
  // ÍCONES SVG
  // ============================================
  const I = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h.01M18 16h.01"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/><circle cx="12" cy="12" r="3"/></svg>',
    radio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
  };

  // ============================================
  // UTILITÁRIOS CSS
  // ============================================
  function css(el, styles) { Object.assign(el.style, styles); return el; }
  function addClass(el, cls) { el.className += ' ' + cls; return el; }
  
  function injectBaseStyles() {
    if (document.getElementById('aicode-base')) return;
    const s = document.createElement('style');
    s.id = 'aicode-base';
    s.textContent = `
      .aic-reset,.aic-reset *{margin:0;padding:0;box-sizing:border-box;user-select:none;font-family:'Courier New',monospace}
      .aic-scroll::-webkit-scrollbar{width:3px}.aic-scroll::-webkit-scrollbar-track{background:transparent}.aic-scroll::-webkit-scrollbar-thumb{background:#1a1a1a;border-radius:2px}
      @keyframes aic-notif-in{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}
      @keyframes aic-notif-out{from{transform:translateX(0);opacity:1}to{transform:translateX(120%);opacity:0}}
      @keyframes aic-fade-in{from{opacity:0}to{opacity:1}}
      @keyframes aic-scale-in{from{transform:scale(0.9);opacity:0}to{transform:scale(1);opacity:1}}
    `;
    document.head.appendChild(s);
  }

  // ============================================
  // NOTIFICAÇÕES (Canto Superior Direito)
  // ============================================
  class Notifications {
    constructor() {
      this.container = document.createElement('div');
      css(this.container, {
        position: 'fixed', top: '10px', right: '10px', zIndex: '2147483647',
        display: 'flex', flexDirection: 'column', gap: '6px',
        pointerEvents: 'none', maxWidth: '300px'
      });
      document.body.appendChild(this.container);
    }
    
    show({ title='', message='', type='info', duration=4000 }) {
      const el = document.createElement('div');
      css(el, {
        background: T.bg.primary, border: '1px solid ' + T.border.primary, borderRadius: '10px',
        padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px',
        pointerEvents: 'auto', animation: 'aic-notif-in 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        boxShadow: '0 8px 25px rgba(0,0,0,0.7)', minWidth: '250px', position: 'relative', overflow: 'hidden'
      });
      
      const colors = { success: '#28c840', error: '#ff5f57', warning: '#febc2e', info: T.accent.main };
      const bar = document.createElement('div');
      css(bar, { position: 'absolute', left: '0', top: '0', width: '3px', height: '100%', background: colors[type] || colors.info, borderRadius: '3px 0 0 3px' });
      el.appendChild(bar);
      
      const ic = document.createElement('div');
      ic.innerHTML = I[type === 'success' ? 'check' : type === 'error' ? 'close' : type === 'warning' ? 'star' : 'home'];
      css(ic, { width: '20px', height: '20px', minWidth: '20px', color: colors[type], display: 'flex', alignItems: 'center', justifyContent: 'center' });
      el.appendChild(ic);
      
      const ct = document.createElement('div');
      css(ct, { flex: '1', display: 'flex', flexDirection: 'column', gap: '3px' });
      if (title) { const t = document.createElement('div'); t.textContent = title; css(t, { color: T.text.primary, fontSize: '12px', fontWeight: '700' }); ct.appendChild(t); }
      if (message) { const m = document.createElement('div'); m.textContent = message; css(m, { color: T.text.secondary, fontSize: '10px', lineHeight: '1.3' }); ct.appendChild(m); }
      el.appendChild(ct);
      
      const cls = document.createElement('div');
      cls.innerHTML = I.close;
      css(cls, { width: '14px', height: '14px', cursor: 'pointer', color: T.text.disabled });
      cls.onclick = () => this.remove(el);
      el.appendChild(cls);
      
      this.container.appendChild(el);
      const timer = setTimeout(() => this.remove(el), duration);
      el._timer = timer;
      return el;
    }
    
    remove(el) {
      if (el._removing) return;
      el._removing = true;
      clearTimeout(el._timer);
      el.style.animation = 'aic-notif-out 0.25s cubic-bezier(0.16,1,0.3,1) forwards';
      setTimeout(() => { if (el.parentNode) el.remove(); }, 250);
    }
  }

  // ============================================
  // COLOR PICKER HSV
  // ============================================
  class ColorPicker {
    constructor(parent, defaultColor = '#7c4dff', callback = null) {
      this.parent = parent;
      this.color = this.hexToHsv(defaultColor);
      this.callback = callback;
      this.build();
    }
    
    hexToHsv(hex) {
      let r = parseInt(hex.slice(1,3), 16) / 255;
      let g = parseInt(hex.slice(3,5), 16) / 255;
      let b = parseInt(hex.slice(5,7), 16) / 255;
      let max = Math.max(r,g,b), min = Math.min(r,g,b), d = max-min;
      let h = 0, s = max === 0 ? 0 : d/max, v = max;
      if (d !== 0) {
        if (max === r) h = ((g-b)/d + (g<b?6:0)) / 6;
        else if (max === g) h = ((b-r)/d + 2) / 6;
        else h = ((r-g)/d + 4) / 6;
      }
      return { h, s, v };
    }
    
    hsvToHex(h, s, v) {
      let r, g, b;
      const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r=v; g=t; b=p; break;
        case 1: r=q; g=v; b=p; break;
        case 2: r=p; g=v; b=t; break;
        case 3: r=p; g=q; b=v; break;
        case 4: r=t; g=p; b=v; break;
        case 5: r=v; g=p; b=q; break;
      }
      return '#' + [r,g,b].map(x => Math.round(x*255).toString(16).padStart(2,'0')).join('');
    }
    
    build() {
      this.container = document.createElement('div');
      css(this.container, { width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' });
      
      // Preview
      this.preview = document.createElement('div');
      css(this.preview, { width: '100%', height: '25px', borderRadius: '6px', border: '1px solid '+T.border.secondary, transition: 'background 0.1s' });
      this.container.appendChild(this.preview);
      
      // SV Canvas
      this.canvas = document.createElement('canvas');
      this.canvas.width = 200; this.canvas.height = 100;
      css(this.canvas, { width: '100%', height: '80px', borderRadius: '6px', cursor: 'crosshair', display: 'block' });
      this.container.appendChild(this.canvas);
      
      // Hue Slider
      this.hueSlider = document.createElement('div');
      css(this.hueSlider, { width: '100%', height: '10px', borderRadius: '5px', cursor: 'pointer', position: 'relative', background: 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)' });
      this.hueThumb = document.createElement('div');
      css(this.hueThumb, { width: '14px', height: '14px', borderRadius: '50%', background: '#fff', border: '2px solid #000', position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', left: '0%' });
      this.hueSlider.appendChild(this.hueThumb);
      this.container.appendChild(this.hueSlider);
      
      // Input hex
      this.hexInput = document.createElement('input');
      css(this.hexInput, { width: '100%', height: '24px', background: T.bg.input, border: '1px solid '+T.border.secondary, borderRadius: '6px', color: T.text.primary, fontSize: '11px', textAlign: 'center', outline: 'none' });
      this.hexInput.value = this.hsvToHex(this.color.h, this.color.s, this.color.v);
      this.container.appendChild(this.hexInput);
      
      this.updatePreview();
      this.drawSV();
      this.updateHueThumb();
      
      // Events
      this.setupEvents();
      
      this.parent.appendChild(this.container);
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
      ctx.clearRect(0,0,w,h);
      
      // Desenhar gradiente SV
      for (let y = 0; y < h; y++) {
        const v = 1 - y / h;
        for (let x = 0; x < w; x++) {
          const s = x / w;
          const hex = this.hsvToHex(this.color.h, s, v);
          ctx.fillStyle = hex;
          ctx.fillRect(x, y, 1, 1);
        }
      }
      
      // Cursor
      const cx = this.color.s * w, cy = (1 - this.color.v) * h;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI*2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI*2);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    updateHueThumb() {
      this.hueThumb.style.left = (this.color.h * 100) + '%';
    }
    
    setupEvents() {
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
        
        const onMove = (me) => { update(me.clientX, me.clientY); };
        const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
      
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
        
        const onMove = (me) => { update(me.clientX); };
        const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
      
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
    setValue(hex) { this.color = this.hexToHsv(hex); this.updateHueThumb(); this.drawSV(); this.updatePreview(); }
  }

  // ============================================
  // JANELA PRINCIPAL
  // ============================================
  class Window {
    constructor(settings = {}) {
      this.notifs = new Notifications();
      this.keyBind = settings.KeyBind || 'F2';
      this.espEnabled = false;
      this.espPreviewWindow = null;
      this.tabs = [];
      this.activeTab = null;
      this.activeSubTab = null;
      
      injectBaseStyles();
      this.build();
      this.bindKey();
    }
    
    build() {
      // Main panel
      this.panel = document.createElement('div');
      addClass(this.panel, 'aic-reset');
      css(this.panel, {
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '620px', height: '420px', background: T.bg.primary, borderRadius: '10px',
        display: 'flex', flexDirection: 'row', zIndex: '2147483640',
        boxShadow: '0 0 0 1px '+T.border.primary+', 0 20px 60px rgba(0,0,0,0.9)',
        overflow: 'hidden', minWidth: '450px', minHeight: '320px',
        maxWidth: '850px', maxHeight: '650px', resize: 'both'
      });
      
      // Left Panel
      const left = document.createElement('div');
      css(left, { width: '85px', minWidth: '85px', height: '100%', background: T.bg.secondary, display: 'flex', flexDirection: 'column', borderRight: '1px solid '+T.border.primary, borderRadius: '10px 0 0 10px' });
      
      // Balls + Drag
      const balls = document.createElement('div');
      css(balls, { height: '35px', minHeight: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', borderBottom: '1px solid '+T.border.primary, cursor: 'move' });
      [T.apple.red, T.apple.yellow, T.apple.green].forEach((c, i) => {
        const b = document.createElement('div');
        css(b, { width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: '0', transition: 'opacity 0.5s' });
        balls.appendChild(b);
        setTimeout(() => b.style.opacity = '1', 400*i);
      });
      left.appendChild(balls);
      
      this.tabsContainer = document.createElement('div');
      css(this.tabsContainer, { flex: '1', overflowY: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' });
      addClass(this.tabsContainer, 'aic-scroll');
      left.appendChild(this.tabsContainer);
      
      // Avatar
      const ua = document.createElement('div');
      css(ua, { height: '45px', minHeight: '45px', borderTop: '1px solid '+T.border.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' });
      const av = document.createElement('div');
      av.innerHTML = I.user;
      css(av, { width: '24px', height: '24px', borderRadius: '50%', background: T.border.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.text.disabled, padding: '4px' });
      ua.appendChild(av);
      left.appendChild(ua);
      
      this.panel.appendChild(left);
      
      // Right Panel
      const right = document.createElement('div');
      css(right, { flex: '1', height: '100%', display: 'flex', flexDirection: 'column' });
      
      // Top bar
      const topBar = document.createElement('div');
      css(topBar, { height: '35px', minHeight: '35px', background: T.bg.secondary, borderBottom: '1px solid '+T.border.primary, display: 'flex', alignItems: 'center', padding: '0 10px', borderRadius: '0 10px 0 0' });
      
      this.subTabsContainer = document.createElement('div');
      css(this.subTabsContainer, { display: 'flex', alignItems: 'center', gap: '2px', height: '100%' });
      topBar.appendChild(this.subTabsContainer);
      
      const title = document.createElement('div');
      title.textContent = APP.name + ' v' + VERSION;
      css(title, { color: T.text.primary, fontSize: '12px', fontWeight: '700', marginLeft: 'auto', letterSpacing: '0.5px' });
      topBar.appendChild(title);
      
      right.appendChild(topBar);
      
      // Content
      const contentArea = document.createElement('div');
      css(contentArea, { flex: '1', padding: '10px', position: 'relative', overflow: 'hidden' });
      this.tabContentContainer = document.createElement('div');
      css(this.tabContentContainer, { position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px' });
      contentArea.appendChild(this.tabContentContainer);
      right.appendChild(contentArea);
      
      this.panel.appendChild(right);
      document.body.appendChild(this.panel);
      
      // Drag
      let dragging = false, ox = 0, oy = 0;
      balls.addEventListener('mousedown', (e) => {
        dragging = true;
        const r = this.panel.getBoundingClientRect();
        ox = e.clientX - r.left; oy = e.clientY - r.top;
        this.panel.style.transition = 'none';
        e.preventDefault();
      });
      document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        let l = e.clientX - ox, t = e.clientY - oy;
        l = Math.max(0, Math.min(l, window.innerWidth - this.panel.offsetWidth));
        t = Math.max(0, Math.min(t, window.innerHeight - this.panel.offsetHeight));
        this.panel.style.left = l + 'px';
        this.panel.style.top = t + 'px';
        this.panel.style.transform = 'none';
        this.updateEspPosition();
      });
      document.addEventListener('mouseup', () => { dragging = false; this.panel.style.transition = ''; });
    }
    
    bindKey() {
      document.addEventListener('keydown', (e) => {
        if (e.key === this.keyBind || e.code === this.keyBind) {
          e.preventDefault();
          this.panel.style.display = this.panel.style.display === 'none' ? 'flex' : 'none';
          if (this.espPreviewWindow) {
            this.espPreviewWindow.style.display = this.panel.style.display;
          }
        }
      });
    }
    
    updateEspPosition() {
      if (!this.espPreviewWindow) return;
      const r = this.panel.getBoundingClientRect();
      this.espPreviewWindow.style.left = (r.right + 10) + 'px';
      this.espPreviewWindow.style.top = r.top + 'px';
    }
    
    showEspPreview() {
      if (this.espPreviewWindow) return;
      
      this.espPreviewWindow = document.createElement('div');
      addClass(this.espPreviewWindow, 'aic-reset');
      const r = this.panel.getBoundingClientRect();
      css(this.espPreviewWindow, {
        position: 'fixed', left: (r.right + 10) + 'px', top: r.top + 'px',
        width: '300px', height: '420px', background: T.bg.primary, borderRadius: '10px',
        border: '1px solid '+T.border.primary, zIndex: '2147483639',
        boxShadow: '0 10px 30px rgba(0,0,0,0.6)', display: 'flex',
        flexDirection: 'column', overflow: 'hidden'
      });
      
      const header = document.createElement('div');
      css(header, { height: '30px', background: T.bg.secondary, borderBottom: '1px solid '+T.border.primary, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', borderRadius: '10px 10px 0 0' });
      const ht = document.createElement('div');
      ht.textContent = 'ESP Preview';
      css(ht, { color: T.text.primary, fontSize: '11px', fontWeight: '700' });
      header.appendChild(ht);
      const cls = document.createElement('div');
      cls.innerHTML = I.close;
      css(cls, { width: '14px', height: '14px', cursor: 'pointer', color: T.text.disabled });
      cls.onclick = () => { this.espPreviewWindow.remove(); this.espPreviewWindow = null; this.espEnabled = false; };
      header.appendChild(cls);
      this.espPreviewWindow.appendChild(header);
      
      const canvas = document.createElement('canvas');
      canvas.width = 300; canvas.height = 300;
      css(canvas, { width: '100%', height: 'auto', background: '#000', flex: '1' });
      
      // Desenhar ESP demo
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 300, 300);
      
      // Simular ESP boxes
      const boxes = [
        { x: 100, y: 80, w: 80, h: 120, label: 'Player' },
        { x: 200, y: 50, w: 60, h: 90, label: 'Enemy' },
        { x: 50, y: 150, w: 70, h: 100, label: 'Item' }
      ];
      
      boxes.forEach(box => {
        ctx.strokeStyle = box.label === 'Player' ? '#28c840' : box.label === 'Enemy' ? '#ff5f57' : '#febc2e';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.w, box.h);
        
        // Corner highlights
        const cSize = 10;
        ctx.beginPath();
        ctx.moveTo(box.x, box.y + cSize); ctx.lineTo(box.x, box.y); ctx.lineTo(box.x + cSize, box.y);
        ctx.moveTo(box.x + box.w - cSize, box.y); ctx.lineTo(box.x + box.w, box.y); ctx.lineTo(box.x + box.w, box.y + cSize);
        ctx.moveTo(box.x + box.w, box.y + box.h - cSize); ctx.lineTo(box.x + box.w, box.y + box.h); ctx.lineTo(box.x + box.w - cSize, box.y + box.h);
        ctx.moveTo(box.x + cSize, box.y + box.h); ctx.lineTo(box.x, box.y + box.h); ctx.lineTo(box.x, box.y + box.h - cSize);
        ctx.stroke();
        
        // Label
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.fillText(box.label, box.x + 2, box.y - 5);
      });
      
      this.espPreviewWindow.appendChild(canvas);
      
      const info = document.createElement('div');
      css(info, { padding: '10px', color: T.text.secondary, fontSize: '10px', textAlign: 'center', borderTop: '1px solid '+T.border.primary });
      info.textContent = 'ESP Preview - Real-time rendering';
      this.espPreviewWindow.appendChild(info);
      
      document.body.appendChild(this.espPreviewWindow);
    }
    
    hideEspPreview() {
      if (this.espPreviewWindow) {
        this.espPreviewWindow.remove();
        this.espPreviewWindow = null;
        this.espEnabled = false;
      }
    }
    
    // ============================================
    // TABS API
    // ============================================
    addTab(iconName) {
      const tab = { button: null, content: null, subTabsContainer: null, subTabs: [] };
      
      tab.button = document.createElement('div');
      tab.button.innerHTML = I[iconName] || I.home;
      css(tab.button, { width: '50px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid transparent', background: 'transparent', color: T.text.secondary, opacity: '0.5' });
      
      tab.content = document.createElement('div');
      css(tab.content, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'none' });
      
      tab.subTabsContainer = document.createElement('div');
      css(tab.subTabsContainer, { display: 'none', alignItems: 'center', height: '100%' });
      
      tab.button.onclick = () => {
        if (this.activeTab === tab) return;
        if (this.activeTab) {
          css(this.activeTab.button, { background: 'transparent', border: '1px solid transparent', width: '50px', height: '40px', opacity: '0.5', color: T.text.secondary });
          this.activeTab.content.style.display = 'none';
          this.activeTab.subTabsContainer.style.display = 'none';
        }
        css(tab.button, { background: 'rgba(124,77,255,0.08)', border: '1px solid '+T.border.secondary, width: '55px', height: '45px', opacity: '1', color: T.text.primary });
        tab.content.style.display = 'block';
        tab.subTabsContainer.style.display = 'flex';
        this.activeTab = tab;
        if (tab.subTabs.length > 0) this._activateSubTab(tab.subTabs[0]);
      };
      
      this.tabsContainer.appendChild(tab.button);
      this.tabContentContainer.appendChild(tab.content);
      this.subTabsContainer.appendChild(tab.subTabsContainer);
      this.tabs.push(tab);
      if (this.tabs.length === 1) tab.button.click();
      
      return { addSubTab: (name) => this._addSubTab(tab, name) };
    }
    
    _addSubTab(parentTab, name) {
      const sub = { button: null, content: null, leftColumn: null, rightColumn: null };
      
      sub.button = document.createElement('div');
      sub.button.textContent = name;
      css(sub.button, { padding: '4px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', color: T.text.secondary, transition: 'all 0.2s', whiteSpace: 'nowrap', height: '25px', display: 'flex', alignItems: 'center' });
      
      sub.content = document.createElement('div');
      css(sub.content, { display: 'none', width: '100%', height: '100%' });
      
      const scroll = document.createElement('div');
      css(scroll, { width: '100%', height: '100%', overflowY: 'auto', padding: '2px', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '10px' });
      addClass(scroll, 'aic-scroll');
      
      sub.leftColumn = document.createElement('div');
      css(sub.leftColumn, { width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' });
      sub.rightColumn = document.createElement('div');
      css(sub.rightColumn, { width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' });
      
      scroll.appendChild(sub.leftColumn);
      scroll.appendChild(sub.rightColumn);
      sub.content.appendChild(scroll);
      
      sub.button.onclick = () => this._activateSubTab(sub);
      
      parentTab.subTabsContainer.appendChild(sub.button);
      parentTab.content.appendChild(sub.content);
      parentTab.subTabs.push(sub);
      if (parentTab.subTabs.length === 1) this._activateSubTab(sub);
      
      return { addSection: (header, side) => this._addSection(sub, header, side) };
    }
    
    _activateSubTab(sub) {
      if (this.activeSubTab === sub) return;
      if (this.activeSubTab) {
        css(this.activeSubTab.button, { color: T.text.secondary, background: 'transparent' });
        this.activeSubTab.content.style.display = 'none';
      }
      css(sub.button, { color: T.text.primary, background: 'rgba(124,77,255,0.1)' });
      sub.content.style.display = 'block';
      this.activeSubTab = sub;
    }
    
    _addSection(subData, header, side) {
      const column = side === 'right' ? subData.rightColumn : subData.leftColumn;
      
      const wrapper = document.createElement('div');
      css(wrapper, { width: '100%', display: 'flex', flexDirection: 'column', gap: '0' });
      
      if (header) {
        const h = document.createElement('div');
        h.textContent = header;
        css(h, { fontSize: '9px', color: T.text.disabled, padding: '0 4px 8px 4px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700' });
        wrapper.appendChild(h);
      }
      
      const card = document.createElement('div');
      css(card, { width: '100%', background: T.bg.card, borderRadius: '7px', border: '1px solid '+T.border.primary, padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' });
      wrapper.appendChild(card);
      column.appendChild(wrapper);
      
      const self = this;
      
      return {
        addButton: (name, cb) => {
          const btn = document.createElement('div');
          btn.textContent = name;
          css(btn, { width: '100%', height: '32px', background: T.bg.input, borderRadius: '7px', border: '1px solid '+T.border.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '11px', color: T.text.secondary, transition: 'all 0.15s' });
          btn.onmouseenter = () => { btn.style.background = T.hover; btn.style.color = T.text.primary; btn.style.borderColor = T.border.accent; };
          btn.onmouseleave = () => { btn.style.background = T.bg.input; btn.style.color = T.text.secondary; btn.style.borderColor = T.border.secondary; };
          btn.onclick = () => { if (cb) cb(); };
          card.appendChild(btn);
        },
        
        addToggle: (name, def, cb) => {
          let v = def || false;
          const f = document.createElement('div');
          css(f, { width: '100%', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' });
          const l = document.createElement('span');
          l.textContent = name;
          css(l, { fontSize: '11px', color: T.text.secondary });
          f.appendChild(l);
          
          const sw = document.createElement('div');
          css(sw, { width: '36px', height: '16px', background: T.bg.input, borderRadius: '8px', border: '1px solid '+T.border.secondary, position: 'relative', transition: 'all 0.25s' });
          const th = document.createElement('div');
          css(th, { width: '12px', height: '12px', background: T.text.disabled, borderRadius: '3px', position: 'absolute', left: '1px', top: '50%', transform: 'translateY(-50%)', transition: 'all 0.25s' });
          sw.appendChild(th);
          
          const update = () => {
            if (v) { sw.style.background = 'linear-gradient(135deg,'+T.accent.dark+','+T.accent.main+')'; sw.style.borderColor = T.accent.main; th.style.background = '#fff'; th.style.left = '21px'; }
            else { sw.style.background = T.bg.input; sw.style.borderColor = T.border.secondary; th.style.background = T.text.disabled; th.style.left = '1px'; }
          };
          update();
          
          f.onclick = () => { v = !v; update(); if (cb) cb(v); self.notifs.info(name, v ? 'Enabled' : 'Disabled', 1500); };
          f.appendChild(sw);
          card.appendChild(f);
        },
        
        addCheckbox: (name, def, cb) => {
          let v = def || false;
          const f = document.createElement('div');
          css(f, { width: '100%', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' });
          const l = document.createElement('span');
          l.textContent = name;
          css(l, { fontSize: '11px', color: T.text.secondary });
          f.appendChild(l);
          
          const box = document.createElement('div');
          css(box, { width: '18px', height: '18px', background: T.bg.input, borderRadius: '4px', border: '1px solid '+T.border.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' });
          const ic = document.createElement('div');
          ic.innerHTML = I.check;
          css(ic, { width: '12px', height: '12px', opacity: '0', transition: 'opacity 0.25s', color: T.text.primary });
          box.appendChild(ic);
          
          const update = () => {
            if (v) { box.style.borderColor = T.accent.main; box.style.background = 'rgba(124,77,255,0.15)'; ic.style.opacity = '1'; }
            else { box.style.borderColor = T.border.secondary; box.style.background = T.bg.input; ic.style.opacity = '0'; }
          };
          update();
          
          f.onclick = () => { v = !v; update(); if (cb) cb(v); };
          f.appendChild(box);
          card.appendChild(f);
        },
        
        addSlider: (name, def, min, max, cb) => {
          let val = def || 50;
          const mn = min || 0, mx = max || 100;
          
          const f = document.createElement('div');
          css(f, { width: '100%', height: '28px', display: 'flex', alignItems: 'center', gap: '8px' });
          
          const l = document.createElement('span');
          l.textContent = name;
          css(l, { fontSize: '11px', color: T.text.secondary, whiteSpace: 'nowrap', minWidth: '55px', overflow: 'hidden', textOverflow: 'ellipsis' });
          f.appendChild(l);
          
          const track = document.createElement('div');
          css(track, { flex: '1', height: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' });
          
          const bg = document.createElement('div');
          css(bg, { width: '100%', height: '2px', background: T.border.secondary, borderRadius: '2px', position: 'relative' });
          
          const fill = document.createElement('div');
          css(fill, { width: '50%', height: '100%', background: T.accent.main, borderRadius: '2px', transition: 'width 0.05s' });
          bg.appendChild(fill);
          
          const thumb = document.createElement('div');
          css(thumb, { width: '12px', height: '12px', borderRadius: '50%', background: T.text.primary, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', transition: 'left 0.05s', boxShadow: '0 1px 3px rgba(0,0,0,0.5)' });
          bg.appendChild(thumb);
          track.appendChild(bg);
          
          const disp = document.createElement('span');
          css(disp, { fontSize: '10px', color: T.text.secondary, minWidth: '35px', textAlign: 'right' });
          disp.textContent = Math.round(val);
          f.appendChild(disp);
          
          const updatePos = (v) => {
            const pct = ((v-mn)/(mx-mn))*100;
            fill.style.width = pct + '%';
            thumb.style.left = pct + '%';
            disp.textContent = Math.round(v);
          };
          updatePos(val);
          
          const getVal = (e) => { const r = bg.getBoundingClientRect(); const pct = Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100)); return Math.round(mn+(pct/100)*(mx-mn)); };
          
          let dragging = false;
          track.onmousedown = (e) => { dragging = true; val = getVal(e); updatePos(val); if (cb) cb(val); e.preventDefault(); };
          document.onmousemove = (e) => { if (dragging) { val = getVal(e); updatePos(val); if (cb) cb(val); } };
          document.onmouseup = () => { dragging = false; };
          
          f.appendChild(track);
          card.appendChild(f);
        },
        
        addDropdown: (name, values, def, cb) => {
          const vals = values || [];
          let sel = def || vals[0] || '';
          
          const f = document.createElement('div');
          css(f, { width: '100%', minHeight: '30px', background: T.bg.input, borderRadius: '7px', border: '1px solid '+T.border.secondary, cursor: 'pointer', position: 'relative', transition: 'all 0.2s', overflow: 'hidden' });
          
          const hdr = document.createElement('div');
          css(hdr, { height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' });
          
          const hdrLbl = document.createElement('span');
          hdrLbl.textContent = name + ': ' + sel;
          css(hdrLbl, { fontSize: '11px', color: T.text.secondary, flex: '1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
          hdr.appendChild(hdrLbl);
          
          const chev = document.createElement('div');
          chev.innerHTML = I.chevronDown;
          css(chev, { width: '12px', height: '12px', color: T.text.disabled, transition: 'transform 0.25s', transform: 'rotate(180deg)' });
          hdr.appendChild(chev);
          
          const opts = document.createElement('div');
          css(opts, { width: '100%', maxHeight: '0', overflow: 'hidden', borderTop: '1px solid transparent', padding: '0 8px', transition: 'all 0.3s' });
          
          let open = false;
          
          const buildOpts = () => {
            opts.innerHTML = '';
            vals.forEach(v => {
              const o = document.createElement('div');
              o.textContent = v;
              css(o, { width: '100%', height: '28px', display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: '11px', color: v===sel?T.text.primary:T.text.secondary, cursor: 'pointer', borderRadius: '6px', background: v===sel?'rgba(124,77,255,0.08)':'transparent', transition: 'all 0.15s', marginBottom: '2px' });
              o.onmouseenter = () => { if (v!==sel) o.style.background = T.hover; };
              o.onmouseleave = () => { if (v!==sel) o.style.background = 'transparent'; };
              o.onclick = (e) => { e.stopPropagation(); sel = v; hdrLbl.textContent = name+': '+v; buildOpts(); close(); if (cb) cb(v); self.notifs.info(name, v, 1500); };
              opts.appendChild(o);
            });
          };
          buildOpts();
          
          const openDd = () => { open = true; opts.style.maxHeight = (vals.length*30+16)+'px'; opts.style.borderTop = '1px solid '+T.border.secondary; opts.style.padding = '8px'; chev.style.transform = 'rotate(0deg)'; f.style.borderColor = T.accent.main; };
          const close = () => { open = false; opts.style.maxHeight = '0'; opts.style.borderTop = '1px solid transparent'; opts.style.padding = '0 8px'; chev.style.transform = 'rotate(180deg)'; f.style.borderColor = T.border.secondary; };
          
          hdr.onclick = (e) => { e.stopPropagation(); open ? close() : openDd(); };
          document.addEventListener('click', () => { if (open) close(); });
          
          f.appendChild(hdr);
          f.appendChild(opts);
          card.appendChild(f);
        },
        
        addInput: (name, placeholder, cb) => {
          const f = document.createElement('div');
          css(f, { width: '100%', height: '28px', display: 'flex', alignItems: 'center', gap: '8px' });
          
          const l = document.createElement('span');
          l.textContent = name;
          css(l, { fontSize: '11px', color: T.text.secondary, whiteSpace: 'nowrap', minWidth: '55px', overflow: 'hidden', textOverflow: 'ellipsis' });
          f.appendChild(l);
          
          const inp = document.createElement('input');
          inp.placeholder = placeholder || '';
          css(inp, { flex: '1', height: '100%', background: T.bg.input, border: '1px solid '+T.border.secondary, borderRadius: '6px', color: T.text.primary, fontSize: '11px', padding: '0 8px', outline: 'none', transition: 'border-color 0.2s' });
          inp.onfocus = () => inp.style.borderColor = T.accent.main;
          inp.onblur = () => inp.style.borderColor = T.border.secondary;
          inp.onchange = () => { if (cb) cb(inp.value); };
          f.appendChild(inp);
          card.appendChild(f);
        },
        
        addKeybind: (name, def, cb) => {
          let key = def || 'None';
          let listening = false;
          
          const f = document.createElement('div');
          css(f, { width: '100%', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' });
          
          const l = document.createElement('span');
          l.textContent = name;
          css(l, { fontSize: '11px', color: T.text.secondary });
          f.appendChild(l);
          
          const bind = document.createElement('div');
          bind.textContent = '[' + key + ']';
          css(bind, { padding: '3px 8px', background: T.bg.input, borderRadius: '5px', border: '1px solid '+T.border.secondary, fontSize: '10px', color: T.accent.main, transition: 'all 0.2s', minWidth: '60px', textAlign: 'center' });
          f.appendChild(bind);
          
          f.onclick = () => {
            listening = true;
            bind.textContent = '[...]';
            bind.style.borderColor = T.accent.main;
            bind.style.animation = 'aic-fade-in 0.5s infinite alternate';
            
            const onKey = (e) => {
              if (!listening) return;
              e.preventDefault();
              e.stopPropagation();
              key = e.key || e.code;
              bind.textContent = '[' + key + ']';
              bind.style.borderColor = T.border.secondary;
              bind.style.animation = '';
              listening = false;
              if (cb) cb(key);
              document.removeEventListener('keydown', onKey);
            };
            document.addEventListener('keydown', onKey);
          };
          
          card.appendChild(f);
        },
        
        addColorPicker: (name, def, cb) => {
          const f = document.createElement('div');
          css(f, { width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' });
          
          if (name) {
            const l = document.createElement('span');
            l.textContent = name;
            css(l, { fontSize: '10px', color: T.text.disabled, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' });
            f.appendChild(l);
          }
          
          new ColorPicker(f, def || '#7c4dff', cb);
          card.appendChild(f);
        },
        
        addRadioGroup: (name, options, def, cb) => {
          let sel = def || (options[0] ? options[0].value : null);
          const group = [];
          
          const wrapper = document.createElement('div');
          css(wrapper, { width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' });
          
          if (name) {
            const l = document.createElement('span');
            l.textContent = name;
            css(l, { fontSize: '10px', color: T.text.disabled, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '2px' });
            wrapper.appendChild(l);
          }
          
          (options || []).forEach(opt => {
            const optF = document.createElement('div');
            css(optF, { width: '100%', height: '24px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' });
            
            const circle = document.createElement('div');
            css(circle, { width: '14px', height: '14px', borderRadius: '50%', border: '1px solid '+T.border.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', minWidth: '14px' });
            
            const dot = document.createElement('div');
            css(dot, { width: '8px', height: '8px', borderRadius: '50%', background: T.accent.main, opacity: '0', transition: 'opacity 0.2s' });
            circle.appendChild(dot);
            
            const lbl = document.createElement('span');
            lbl.textContent = opt.label || opt.value;
            css(lbl, { fontSize: '11px', color: T.text.secondary });
            
            const update = () => {
              if (sel === opt.value) {
                circle.style.borderColor = T.accent.main;
                dot.style.opacity = '1';
                lbl.style.color = T.text.primary;
              } else {
                circle.style.borderColor = T.border.secondary;
                dot.style.opacity = '0';
                lbl.style.color = T.text.secondary;
              }
            };
            update();
            
            optF.onclick = () => {
              sel = opt.value;
              group.forEach(g => g.update());
              if (cb) cb(sel);
            };
            
            optF.appendChild(circle);
            optF.appendChild(lbl);
            wrapper.appendChild(optF);
            group.push({ update });
          });
          
          card.appendChild(wrapper);
        },
        
        addEspToggle: (name, def, cb) => {
          let v = def || false;
          const f = document.createElement('div');
          css(f, { width: '100%', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' });
          const l = document.createElement('span');
          l.textContent = name || 'ESP Preview';
          css(l, { fontSize: '11px', color: T.text.secondary });
          f.appendChild(l);
          
          const sw = document.createElement('div');
          css(sw, { width: '36px', height: '16px', background: T.bg.input, borderRadius: '8px', border: '1px solid '+T.border.secondary, position: 'relative', transition: 'all 0.25s' });
          const th = document.createElement('div');
          css(th, { width: '12px', height: '12px', background: T.text.disabled, borderRadius: '3px', position: 'absolute', left: '1px', top: '50%', transform: 'translateY(-50%)', transition: 'all 0.25s' });
          sw.appendChild(th);
          
          const update = () => {
            if (v) { sw.style.background = 'linear-gradient(135deg,'+T.accent.dark+','+T.accent.main+')'; sw.style.borderColor = T.accent.main; th.style.background = '#fff'; th.style.left = '21px'; }
            else { sw.style.background = T.bg.input; sw.style.borderColor = T.border.secondary; th.style.background = T.text.disabled; th.style.left = '1px'; }
          };
          update();
          
          f.onclick = () => {
            v = !v;
            update();
            self.espEnabled = v;
            if (v) { self.showEspPreview(); }
            else { self.hideEspPreview(); }
            if (cb) cb(v);
          };
          f.appendChild(sw);
          card.appendChild(f);
        }
      };
    }
  }
  
  // ============================================
  // EXPORT
  // ============================================
  return { Window, Notifications, ColorPicker, VERSION };
})();

// ============================================
// DEMO - INICIALIZAÇÃO AUTOMÁTICA
// ============================================
(function demo() {
  if (typeof Toastify === 'undefined') {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
    s.onload = () => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
      document.head.appendChild(l);
      initDemo();
    };
    document.head.appendChild(s);
  } else {
    initDemo();
  }
  
  function initDemo() {
    const win = new AICODE_LIB.Window({ KeyBind: 'F2' });
    win.notifs.success('AICODE', 'Library v' + AICODE_LIB.VERSION + ' loaded!', 3000);
    
    // Home Tab
    const homeTab = win.addTab('home');
    
    // General SubTab
    const general = homeTab.addSubTab('General');
    
    const controls = general.addSection('Controls', 'left');
    controls.addButton('Execute Script', () => win.notifs.info('Script', 'Executed successfully!', 2000));
    controls.addButton('Clear Console', () => console.clear());
    controls.addToggle('Mod Mode', true, (v) => console.log('Mod:', v));
    controls.addCheckbox('Auto Inject', false, (v) => console.log('Auto:', v));
    
    const values = general.addSection('Values', 'right');
    values.addSlider('Volume', 75, 0, 100, (v) => console.log('Volume:', v));
    values.addSlider('FOV', 90, 30, 120, (v) => console.log('FOV:', v));
    values.addDropdown('Mode', ['Legit', 'Rage', 'Semi-Rage', 'Closet'], 'Legit', (v) => console.log('Mode:', v));
    values.addInput('Custom Text', 'Type here...', (v) => console.log('Input:', v));
    
    // ESP SubTab
    const esp = homeTab.addSubTab('ESP');
    
    const espSettings = esp.addSection('ESP Settings', 'left');
    espSettings.addEspToggle('Enable ESP', false, (v) => console.log('ESP:', v));
    espSettings.addToggle('Box ESP', true, (v) => console.log('Box:', v));
    espSettings.addToggle('Skeleton', false, (v) => console.log('Skeleton:', v));
    espSettings.addToggle('Health Bar', true, (v) => console.log('Health:', v));
    espSettings.addToggle('Name Tags', true, (v) => console.log('Names:', v));
    
    const espColors = esp.addSection('Colors', 'right');
    espColors.addColorPicker('Box Color', '#28c840', (v) => console.log('Box color:', v));
    espColors.addColorPicker('Skeleton Color', '#ffffff', (v) => console.log('Skel color:', v));
    espColors.addRadioGroup('Target', [
      { label: 'Enemies', value: 'enemies' },
      { label: 'All Players', value: 'all' },
      { label: 'NPCs Only', value: 'npcs' }
    ], 'enemies', (v) => console.log('Target:', v));
    
    // Settings Tab
    const settingsTab = win.addTab('settings');
    const config = settingsTab.addSubTab('Config');
    
    const binds = config.addSection('Keybinds', 'left');
    binds.addKeybind('Menu Toggle', 'F2', (k) => console.log('Menu bind:', k));
    binds.addKeybind('Panic Key', 'F8', (k) => console.log('Panic:', k));
    binds.addKeybind('ESP Toggle', 'F3', (k) => console.log('ESP bind:', k));
    
    const theme = config.addSection('Theme', 'right');
    theme.addColorPicker('Accent Color', '#7c4dff', (v) => console.log('Accent:', v));
    theme.addSlider('Opacity', 100, 50, 100, (v) => console.log('Opacity:', v));
    theme.addRadioGroup('Font', [
      { label: 'Monospace', value: 'mono' },
      { label: 'Sans-Serif', value: 'sans' }
    ], 'mono', (v) => console.log('Font:', v));
    
    // User Tab
    const userTab = win.addTab('user');
    const profile = userTab.addSubTab('Profile');
    
    const info = profile.addSection('Account', 'left');
    info.addInput('Username', 'Player', (v) => console.log('User:', v));
    info.addButton('Save Profile', () => win.notifs.success('Profile', 'Saved!', 2000));
    info.addCheckbox('Remember Me', true, (v) => console.log('Remember:', v));
    
    const about = profile.addSection('About', 'right');
    about.addButton('Check Updates', () => win.notifs.info('Update', 'You are up to date!', 2000));
    
    // Code Tab
    const codeTab = win.addTab('code');
    const tools = codeTab.addSubTab('Tools');
    
    const scripts = tools.addSection('Script Hub', 'left');
    scripts.addButton('Load Script', () => win.notifs.info('Script', 'Loading...', 2000));
    scripts.addButton('Unload All', () => win.notifs.warning('Scripts', 'All unloaded!', 2000));
    scripts.addDropdown('Presets', ['Aimbot', 'ESP', 'Farm', 'Fly'], 'Aimbot', (v) => console.log('Preset:', v));
    
    console.log('[AICODE v' + AICODE_LIB.VERSION + '] Demo loaded!');
  }
})();
