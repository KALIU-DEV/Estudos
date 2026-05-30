// ============================================
// AICODE LIBRARY v2.0
// Carregamento: fetch("URL").then(t=>t.text()).then(eval);
// ============================================

(function() {
  const VERSION = "2.0";
  const FOLDER = "AICODE";
  
  // ============================================
  // INJEÇÃO DE ESTILOS GLOBAIS
  // ============================================
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600;700&display=swap');
    
    .aicode-reset, .aicode-reset * {
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      user-select: none !important;
      font-family: 'Source Code Pro', 'Courier New', monospace !important;
    }
    
    .aicode-scrollbar::-webkit-scrollbar { width: 4px; }
    .aicode-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .aicode-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
    
    @keyframes aicode-slideInRight {
      from { transform: translateX(120%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes aicode-slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(120%); opacity: 0; }
    }
    @keyframes aicode-fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes aicode-scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = globalStyles;
  document.head.appendChild(styleEl);

  // ============================================
  // TEMA PADRÃO
  // ============================================
  const THEME = {
    bg: { primary: "#0a0a0a", secondary: "#0f0f0f", card: "rgba(15,15,15,0.7)" },
    text: { primary: "#f0f0f0", secondary: "#b4b4b4", disabled: "#787878" },
    border: { primary: "#232323", secondary: "#8c8c8c" },
    interactive: { hover: "#2d2d37", selected: "rgba(124,77,255,0.08)" },
    highlight: { purple: "#7c4dff", purpleDark: "#6200ea", green: "#4caf50", red: "#f44336", orange: "#ff9800" },
    apple: { red: "#ff4f4f", yellow: "#e3e85f", green: "#60b541" }
  };

  // ============================================
  // ÍCONES SVG
  // ============================================
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="100%" height="100%"><polyline points="20 6 9 17 4 12"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="6 9 12 15 18 9"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2" width="100%" height="100%"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    warning: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" width="100%" height="100%"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    logo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
  };

  function getIcon(name) { return ICONS[name] || ICONS.home; }

  // ============================================
  // NOTIFICAÇÕES
  // ============================================
  class Notifications {
    constructor() {
      this.container = document.createElement('div');
      Object.assign(this.container.style, {
        position: 'fixed', top: '10px', right: '10px', zIndex: '2147483647',
        display: 'flex', flexDirection: 'column', gap: '8px',
        pointerEvents: 'none', maxWidth: '350px'
      });
      document.body.appendChild(this.container);
    }
    
    show({ title='', message='', type='info', duration=4000 }) {
      const el = document.createElement('div');
      Object.assign(el.style, {
        background: '#0a0a0a', border: '1px solid #232323', borderRadius: '10px',
        padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px',
        pointerEvents: 'auto', animation: 'aicode-slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        boxShadow: '0 8px 30px rgba(0,0,0,0.6)', minWidth: '280px', position: 'relative',
        overflow: 'hidden'
      });
      
      const colors = { success: '#4caf50', error: '#f44336', warning: '#ff9800', info: '#7c4dff' };
      const bar = document.createElement('div');
      Object.assign(bar.style, {
        position: 'absolute', left: '0', top: '0', width: '3px', height: '100%',
        background: colors[type] || colors.info, borderRadius: '3px 0 0 3px'
      });
      el.appendChild(bar);
      
      const iconEl = document.createElement('div');
      iconEl.innerHTML = getIcon(type === 'info' ? 'info' : type);
      Object.assign(iconEl.style, { width: '24px', height: '24px', minWidth: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' });
      el.appendChild(iconEl);
      
      const content = document.createElement('div');
      Object.assign(content.style, { flex: '1', display: 'flex', flexDirection: 'column', gap: '4px' });
      
      if (title) {
        const t = document.createElement('div');
        t.textContent = title;
        Object.assign(t.style, { color: '#f0f0f0', fontSize: '13px', fontWeight: '600' });
        content.appendChild(t);
      }
      if (message) {
        const m = document.createElement('div');
        m.textContent = message;
        Object.assign(m.style, { color: '#b4b4b4', fontSize: '11px', lineHeight: '1.4' });
        content.appendChild(m);
      }
      el.appendChild(content);
      
      const closeBtn = document.createElement('div');
      closeBtn.innerHTML = getIcon('close');
      Object.assign(closeBtn.style, { width: '16px', height: '16px', cursor: 'pointer', color: '#787878', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' });
      closeBtn.onmouseenter = () => closeBtn.style.color = '#f0f0f0';
      closeBtn.onmouseleave = () => closeBtn.style.color = '#787878';
      closeBtn.onclick = () => this.remove(el);
      el.appendChild(closeBtn);
      
      this.container.appendChild(el);
      const timer = setTimeout(() => this.remove(el), duration);
      el._timer = timer;
      return el;
    }
    
    remove(el) {
      if (el._removing) return;
      el._removing = true;
      clearTimeout(el._timer);
      el.style.animation = 'aicode-slideOutRight 0.3s cubic-bezier(0.16,1,0.3,1) forwards';
      setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
    }
    
    success(t,m,d) { this.show({title:t, message:m, type:'success', duration:d}); }
    error(t,m,d) { this.show({title:t, message:m, type:'error', duration:d}); }
    warning(t,m,d) { this.show({title:t, message:m, type:'warning', duration:d}); }
    info(t,m,d) { this.show({title:t, message:m, type:'info', duration:d}); }
  }

  // ============================================
  // DIÁLOGOS
  // ============================================
  class Dialogs {
    constructor() {
      this.overlay = document.createElement('div');
      Object.assign(this.overlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.6)', zIndex: '2147483646', display: 'none',
        alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)'
      });
      document.body.appendChild(this.overlay);
    }
    
    show({ title='', content='', buttons=[], width='420px' }) {
      return new Promise((resolve) => {
        this.overlay.style.display = 'flex';
        this.overlay.style.animation = 'aicode-fadeIn 0.2s ease forwards';
        
        const dialog = document.createElement('div');
        Object.assign(dialog.style, {
          background: '#0a0a0a', border: '1px solid #232323', borderRadius: '14px',
          padding: '24px', width, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto',
          animation: 'aicode-scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', gap: '20px'
        });
        
        if (title) {
          const header = document.createElement('div');
          Object.assign(header.style, { display: 'flex', alignItems: 'center', justifyContent: 'space-between' });
          const t = document.createElement('div');
          t.textContent = title;
          Object.assign(t.style, { color: '#f0f0f0', fontSize: '16px', fontWeight: '700' });
          header.appendChild(t);
          const close = document.createElement('div');
          close.innerHTML = getIcon('close');
          Object.assign(close.style, { width: '20px', height: '20px', cursor: 'pointer', color: '#787878' });
          close.onclick = () => { this.close(); resolve(null); };
          header.appendChild(close);
          dialog.appendChild(header);
        }
        
        if (typeof content === 'string') {
          const c = document.createElement('div');
          c.textContent = content;
          Object.assign(c.style, { color: '#b4b4b4', fontSize: '13px', lineHeight: '1.6' });
          dialog.appendChild(c);
        } else if (content instanceof HTMLElement) {
          dialog.appendChild(content);
        }
        
        if (buttons.length > 0) {
          const btnCont = document.createElement('div');
          Object.assign(btnCont.style, { display: 'flex', justifyContent: 'flex-end', gap: '10px' });
          buttons.forEach(btn => {
            const b = document.createElement('button');
            b.textContent = btn.text || 'OK';
            Object.assign(b.style, {
              padding: '10px 20px', borderRadius: '8px',
              border: btn.primary ? 'none' : '1px solid #232323',
              background: btn.primary ? 'linear-gradient(135deg, #6200ea, #7c4dff)' : 'rgba(25,25,25,0.7)',
              color: btn.primary ? '#fff' : '#c8c8c8', cursor: 'pointer',
              fontSize: '12px', fontWeight: '600',
              fontFamily: "'Source Code Pro', 'Courier New', monospace"
            });
            b.onclick = () => { this.close(); resolve(btn.value !== undefined ? btn.value : btn.text); };
            btnCont.appendChild(b);
          });
          dialog.appendChild(btnCont);
        }
        
        this.overlay.appendChild(dialog);
        this._dialog = dialog;
        this.overlay.onclick = (e) => { if (e.target === this.overlay) { this.close(); resolve(null); } };
      });
    }
    
    close() {
      if (this._dialog) {
        this._dialog.style.animation = 'aicode-fadeIn 0.2s ease reverse forwards';
        setTimeout(() => {
          if (this._dialog && this._dialog.parentNode) this._dialog.remove();
          this._dialog = null;
          if (this.overlay.children.length === 0) this.overlay.style.display = 'none';
        }, 200);
      }
    }
    
    alert(t,m) { return this.show({title:t, content:m, buttons:[{text:'OK', primary:true, value:'ok'}]}); }
    confirm(t,m) { return this.show({title:t, content:m, buttons:[{text:'Cancel', value:false}, {text:'Confirm', primary:true, value:true}]}); }
    prompt(t,p='') {
      return new Promise((resolve) => {
        const input = document.createElement('input');
        input.placeholder = p;
        Object.assign(input.style, {
          width: '100%', padding: '10px 14px', background: 'rgba(18,18,18,0.7)',
          border: '1px solid #232323', borderRadius: '8px', color: '#f0f0f0',
          fontSize: '13px', fontFamily: "'Source Code Pro', 'Courier New', monospace", outline: 'none'
        });
        this.show({title:t, content:input, buttons:[{text:'Cancel', value:null}, {text:'Submit', primary:true, value:'submit'}]})
          .then(r => resolve(r === 'submit' ? input.value : null));
      });
    }
  }

  // ============================================
  // WINDOW (JANELA PRINCIPAL)
  // ============================================
  class Window {
    constructor(settings = {}) {
      this.settings = Object.assign({
        Title: 'AICODE', Theme: THEME, ShowUserInfo: false,
        AcrylicBlur: true, Button: false, Size: { width: 580, height: 380 }, KeyBind: null
      }, settings);
      
      this.tabs = [];
      this.activeTab = null;
      this.activeSubTab = null;
      this.notifs = new Notifications();
      this.dialogs = new Dialogs();
      this.build();
    }
    
    build() {
      this.screenGui = document.createElement('div');
      this.screenGui.className = 'aicode-reset';
      Object.assign(this.screenGui.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        zIndex: '2147483640', pointerEvents: 'none'
      });
      document.body.appendChild(this.screenGui);
      
      this.windowFrame = document.createElement('div');
      Object.assign(this.windowFrame.style, {
        position: 'absolute', width: this.settings.Size.width+'px', height: this.settings.Size.height+'px',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'transparent',
        borderRadius: '10px', pointerEvents: 'auto', display: 'flex', flexDirection: 'row', overflow: 'hidden'
      });
      this.screenGui.appendChild(this.windowFrame);
      
      this.containerFuns = document.createElement('div');
      Object.assign(this.containerFuns.style, {
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
        background: THEME.bg.primary, borderRadius: '10px', display: 'flex', flexDirection: 'row',
        overflow: 'hidden', boxShadow: '0 0 0 1px '+THEME.border.primary+', 0 15px 50px rgba(0,0,0,0.7)'
      });
      this.windowFrame.appendChild(this.containerFuns);
      
      this.buildLeftPanel();
      this.buildRightPanel();
      this.setupDrag();
      
      if (this.settings.KeyBind) {
        document.addEventListener('keydown', (e) => {
          if (e.key === this.settings.KeyBind || e.code === this.settings.KeyBind) {
            this.windowFrame.style.display = this.windowFrame.style.display === 'none' ? '' : 'none';
          }
        });
      }
    }
    
    buildLeftPanel() {
      const left = document.createElement('div');
      Object.assign(left.style, {
        width: '85px', minWidth: '85px', height: '100%', background: THEME.bg.secondary,
        display: 'flex', flexDirection: 'column', borderRight: '1px solid '+THEME.border.primary,
        borderRadius: '10px 0 0 10px', overflow: 'hidden'
      });
      
      const ballsArea = document.createElement('div');
      Object.assign(ballsArea.style, {
        width: '100%', height: '35px', minHeight: '35px', display: 'flex',
        alignItems: 'center', justifyContent: 'center', gap: '5px',
        borderBottom: '1px solid rgba(35,35,35,0.5)', cursor: 'move'
      });
      [THEME.apple.red, THEME.apple.yellow, THEME.apple.green].forEach((c, i) => {
        const ball = document.createElement('div');
        Object.assign(ball.style, { width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: '0', transition: 'opacity 0.5s' });
        ballsArea.appendChild(ball);
        setTimeout(() => ball.style.opacity = '1', 400*i);
      });
      left.appendChild(ballsArea);
      
      this.tabsContainer = document.createElement('div');
      Object.assign(this.tabsContainer.style, {
        flex: '1', overflowY: 'auto', overflowX: 'hidden', padding: '8px',
        display: 'flex', flexDirection: 'column', gap: '8px'
      });
      this.tabsContainer.className = 'aicode-scrollbar';
      left.appendChild(this.tabsContainer);
      
      const userArea = document.createElement('div');
      Object.assign(userArea.style, {
        height: '45px', minHeight: '45px', borderTop: '1px solid rgba(35,35,35,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      });
      const avatar = document.createElement('div');
      Object.assign(avatar.style, {
        width: '28px', height: '28px', borderRadius: '50%', background: '#1a1a1a',
        border: '1px solid '+THEME.border.primary, display: 'flex', alignItems: 'center', justifyContent: 'center'
      });
      const avInner = document.createElement('div');
      avInner.innerHTML = getIcon('user');
      Object.assign(avInner.style, { width: '20px', height: '20px', color: '#787878' });
      avatar.appendChild(avInner);
      userArea.appendChild(avatar);
      left.appendChild(userArea);
      
      this.leftPanel = left;
      this.ballsArea = ballsArea;
      this.containerFuns.appendChild(left);
    }
    
    buildRightPanel() {
      const right = document.createElement('div');
      Object.assign(right.style, { flex: '1', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' });
      
      const tabsFrame = document.createElement('div');
      Object.assign(tabsFrame.style, {
        height: '35px', minHeight: '35px', background: THEME.bg.secondary,
        borderBottom: '1px solid rgba(35,35,35,0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between', padding: '0 8px',
        borderRadius: '0 10px 0 0', position: 'relative'
      });
      
      this.titleLabel = document.createElement('div');
      this.titleLabel.textContent = this.settings.Title;
      Object.assign(this.titleLabel.style, { color: THEME.text.primary, fontSize: '13px', fontWeight: '700', marginLeft: 'auto' });
      tabsFrame.appendChild(this.titleLabel);
      
      this.subTabsContainer = document.createElement('div');
      Object.assign(this.subTabsContainer.style, { display: 'flex', alignItems: 'center', position: 'absolute', left: '8px' });
      tabsFrame.appendChild(this.subTabsContainer);
      
      this.activeLine = document.createElement('div');
      Object.assign(this.activeLine.style, {
        position: 'absolute', bottom: '0', height: '2px', background: THEME.highlight.purple,
        borderRadius: '2px', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', opacity: '0'
      });
      tabsFrame.appendChild(this.activeLine);
      
      const contentArea = document.createElement('div');
      Object.assign(contentArea.style, { flex: '1', padding: '7px', position: 'relative', overflow: 'hidden' });
      this.tabContentsContainer = document.createElement('div');
      Object.assign(this.tabContentsContainer.style, { position: 'absolute', top: '7px', left: '7px', right: '7px', bottom: '7px' });
      contentArea.appendChild(this.tabContentsContainer);
      
      right.appendChild(tabsFrame);
      right.appendChild(contentArea);
      this.rightTabsFrame = tabsFrame;
      this.containerFuns.appendChild(right);
    }
    
    setupDrag() {
      let dragging = false, ox = 0, oy = 0;
      this.ballsArea.onmousedown = (e) => {
        dragging = true;
        const r = this.windowFrame.getBoundingClientRect();
        ox = e.clientX - r.left;
        oy = e.clientY - r.top;
        this.windowFrame.style.transition = 'none';
        this.windowFrame.style.cursor = 'grabbing';
        e.preventDefault();
      };
      document.onmousemove = (e) => {
        if (!dragging) return;
        const pr = this.screenGui.getBoundingClientRect();
        let l = e.clientX - ox, t = e.clientY - oy;
        l = Math.max(0, Math.min(l, pr.width - this.windowFrame.offsetWidth));
        t = Math.max(0, Math.min(t, pr.height - this.windowFrame.offsetHeight));
        this.windowFrame.style.left = l+'px';
        this.windowFrame.style.top = t+'px';
        this.windowFrame.style.transform = 'none';
      };
      document.onmouseup = () => { dragging = false; this.windowFrame.style.transition = ''; this.windowFrame.style.cursor = ''; };
    }
    
    addTab(settings = {}) {
      const tab = { id: settings.id||'tab-'+this.tabs.length, icon: settings.icon||'home', button: null, content: null, subTabsContainer: null, subTabs: [], active: false };
      
      tab.button = document.createElement('div');
      Object.assign(tab.button.style, {
        width: '50px', height: '40px', borderRadius: '8px', display: 'flex',
        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        transition: 'all 0.2s', border: '1px solid transparent', background: 'transparent'
      });
      const ic = document.createElement('div');
      ic.innerHTML = getIcon(tab.icon);
      Object.assign(ic.style, { width: '20px', height: '20px', color: THEME.text.secondary, opacity: '0.6', transition: 'all 0.2s' });
      tab.button.appendChild(ic);
      
      tab.content = document.createElement('div');
      Object.assign(tab.content.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'none' });
      this.tabContentsContainer.appendChild(tab.content);
      
      tab.subTabsContainer = document.createElement('div');
      Object.assign(tab.subTabsContainer.style, { display: 'none', alignItems: 'center', height: '100%' });
      this.subTabsContainer.appendChild(tab.subTabsContainer);
      
      tab.button.onclick = () => {
        if (this.activeTab === tab) return;
        if (this.activeTab) {
          Object.assign(this.activeTab.button.style, { background: 'transparent', border: '1px solid transparent', width: '50px', height: '40px' });
          this.activeTab.button.querySelector('div').style.opacity = '0.6';
          this.activeTab.button.querySelector('div').style.color = THEME.text.secondary;
          this.activeTab.content.style.display = 'none';
          this.activeTab.subTabsContainer.style.display = 'none';
        }
        Object.assign(tab.button.style, { background: THEME.interactive.selected, border: '1px solid '+THEME.border.primary, width: '55px', height: '45px' });
        tab.button.querySelector('div').style.opacity = '1';
        tab.button.querySelector('div').style.color = THEME.text.primary;
        tab.content.style.display = 'block';
        tab.subTabsContainer.style.display = 'flex';
        this.activeTab = tab;
        if (tab.subTabs.length > 0) this.activateSubTab(tab.subTabs[0]);
      };
      
      this.tabsContainer.appendChild(tab.button);
      this.tabs.push(tab);
      if (this.tabs.length === 1) tab.button.click();
      
      return { addSubTab: (s) => this.addSubTab(tab, s) };
    }
    
    addSubTab(parentTab, settings = {}) {
      const sub = { id: settings.id||'subtab-'+parentTab.subTabs.length, name: settings.name||'SubTab', button: null, content: null, leftColumn: null, rightColumn: null, active: false };
      
      sub.button = document.createElement('div');
      sub.button.textContent = sub.name;
      Object.assign(sub.button.style, {
        padding: '4px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px',
        color: THEME.text.secondary, transition: 'all 0.2s', whiteSpace: 'nowrap', height: '27px',
        display: 'flex', alignItems: 'center', fontWeight: '500'
      });
      
      sub.content = document.createElement('div');
      Object.assign(sub.content.style, { display: 'none', width: '100%', height: '100%' });
      const scroll = document.createElement('div');
      Object.assign(scroll.style, {
        width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', padding: '1px',
        display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '10px'
      });
      scroll.className = 'aicode-scrollbar';
      sub.leftColumn = document.createElement('div');
      Object.assign(sub.leftColumn.style, { width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '220px' });
      sub.rightColumn = document.createElement('div');
      Object.assign(sub.rightColumn.style, { width: 'calc(50% - 5px)', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '220px' });
      scroll.appendChild(sub.leftColumn);
      scroll.appendChild(sub.rightColumn);
      sub.content.appendChild(scroll);
      
      sub.button.onclick = () => this.activateSubTab(sub);
      
      parentTab.subTabsContainer.appendChild(sub.button);
      parentTab.content.appendChild(sub.content);
      parentTab.subTabs.push(sub);
      if (parentTab.subTabs.length === 1) this.activateSubTab(sub);
      
      return { addSection: (s) => this.addSection(sub, s) };
    }
    
    activateSubTab(sub) {
      if (this.activeSubTab === sub) return;
      if (this.activeSubTab) {
        this.activeSubTab.button.style.color = THEME.text.secondary;
        this.activeSubTab.button.style.background = 'transparent';
        this.activeSubTab.content.style.display = 'none';
      }
      sub.button.style.color = THEME.text.primary;
      sub.button.style.background = THEME.interactive.selected;
      sub.content.style.display = 'block';
      const br = sub.button.getBoundingClientRect();
      const pr = this.rightTabsFrame.getBoundingClientRect();
      this.activeLine.style.opacity = '1';
      this.activeLine.style.left = (br.left-pr.left)+'px';
      this.activeLine.style.width = br.width+'px';
      this.activeSubTab = sub;
    }
    
    addSection(subData, settings = {}) {
      const side = settings.side || 'left';
      const column = side === 'left' ? subData.leftColumn : subData.rightColumn;
      
      const wrapper = document.createElement('div');
      Object.assign(wrapper.style, { width: '100%', display: 'flex', flexDirection: 'column' });
      
      if (settings.header) {
        const h = document.createElement('div');
        h.textContent = settings.header;
        Object.assign(h.style, { fontSize: '10px', color: THEME.text.disabled, padding: '0 4px 6px 4px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700' });
        wrapper.appendChild(h);
      }
      
      const card = document.createElement('div');
      Object.assign(card.style, {
        width: '100%', background: THEME.bg.card, borderRadius: '7px',
        border: '1px solid '+THEME.border.primary, padding: '8px 10px',
        display: 'flex', flexDirection: 'column', gap: '8px'
      });
      wrapper.appendChild(card);
      column.appendChild(wrapper);
      
      const self = this;
      return {
        addButton: (c) => self._createButton(card, c),
        addToggle: (c) => self._createToggle(card, c),
        addCheckbox: (c) => self._createCheckbox(card, c),
        addSlider: (c) => self._createSlider(card, c),
        addDropdown: (c) => self._createDropdown(card, c)
      };
    }
    
    _createButton(parent, config={}) {
      const f = document.createElement('div');
      Object.assign(f.style, {
        width: '100%', height: '30px', background: 'rgba(18,18,18,0.7)', borderRadius: '7px',
        border: '1px solid rgba(35,35,35,0.4)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', cursor: 'pointer', padding: '0 8px', transition: 'all 0.2s', position: 'relative'
      });
      const l = document.createElement('span');
      l.textContent = config.name || 'Button';
      Object.assign(l.style, { fontSize: '12px', color: '#c8c8c8', transition: 'color 0.2s' });
      f.appendChild(l);
      
      const thumb = document.createElement('div');
      Object.assign(thumb.style, {
        width: '10px', height: '10px', borderRadius: '50%', border: '1px solid rgba(200,200,200,0.4)',
        position: 'absolute', right: '8px', opacity: '0.6', transition: 'all 0.2s'
      });
      f.appendChild(thumb);
      
      f.onmouseenter = () => { f.style.background = THEME.interactive.hover; l.style.color = THEME.text.primary; thumb.style.opacity = '1'; };
      f.onmouseleave = () => { f.style.background = 'rgba(18,18,18,0.7)'; l.style.color = '#c8c8c8'; thumb.style.opacity = '0.6'; };
      f.onclick = () => { if (config.callback) config.callback(); };
      parent.appendChild(f);
      return f;
    }
    
    _createToggle(parent, config={}) {
      const f = document.createElement('div');
      Object.assign(f.style, { width: '100%', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '0 5px' });
      const l = document.createElement('span');
      l.textContent = config.name || 'Toggle';
      Object.assign(l.style, { fontSize: '12px', color: '#c8c8c8' });
      f.appendChild(l);
      
      const sw = document.createElement('div');
      Object.assign(sw.style, { width: '38px', height: '17px', background: 'rgba(18,18,18,0.7)', borderRadius: '7px', border: '1px solid rgba(35,35,35,0.4)', position: 'relative', transition: 'all 0.3s' });
      const th = document.createElement('div');
      Object.assign(th.style, { width: '12px', height: '12px', background: '#787878', borderRadius: '4px', position: 'absolute', left: '2px', top: '50%', transform: 'translateY(-50%)', transition: 'all 0.3s' });
      sw.appendChild(th);
      
      let toggled = config.default || false;
      const update = () => {
        if (toggled) {
          sw.style.background = 'linear-gradient(135deg, #6200ea, #7c4dff)';
          sw.style.borderColor = '#7c4dff';
          th.style.background = '#f0f0f0';
          th.style.left = '22px';
        } else {
          sw.style.background = 'rgba(18,18,18,0.7)';
          sw.style.borderColor = 'rgba(35,35,35,0.4)';
          th.style.background = '#787878';
          th.style.left = '2px';
        }
      };
      update();
      f.onclick = () => { toggled = !toggled; update(); if (config.callback) config.callback(toggled); };
      f.appendChild(sw);
      parent.appendChild(f);
      return { getValue: () => toggled, setValue: (v) => { toggled = v; update(); } };
    }
    
    _createCheckbox(parent, config={}) {
      const f = document.createElement('div');
      Object.assign(f.style, { width: '100%', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '0 5px' });
      const l = document.createElement('span');
      l.textContent = config.name || 'Checkbox';
      Object.assign(l.style, { fontSize: '12px', color: '#c8c8c8' });
      f.appendChild(l);
      
      const box = document.createElement('div');
      Object.assign(box.style, { width: '20px', height: '20px', background: 'rgba(18,18,18,0.7)', borderRadius: '5px', border: '1px solid rgba(35,35,35,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' });
      const icon = document.createElement('div');
      icon.innerHTML = getIcon('check');
      Object.assign(icon.style, { width: '14px', height: '14px', opacity: '0', transition: 'opacity 0.3s', color: '#c8c8c8' });
      box.appendChild(icon);
      
      let checked = config.default || false;
      const update = () => {
        if (checked) {
          box.style.borderColor = '#7c4dff';
          box.style.background = 'rgba(124,77,255,0.15)';
          icon.style.opacity = '0.8';
        } else {
          box.style.borderColor = 'rgba(35,35,35,0.4)';
          box.style.background = 'rgba(18,18,18,0.7)';
          icon.style.opacity = '0';
        }
      };
      update();
      f.onclick = () => { checked = !checked; update(); if (config.callback) config.callback(checked); };
      f.appendChild(box);
      parent.appendChild(f);
      return { getValue: () => checked, setValue: (v) => { checked = v; update(); } };
    }
    
    _createSlider(parent, config={}) {
      const f = document.createElement('div');
      Object.assign(f.style, { width: '100%', height: '30px', display: 'flex', alignItems: 'center', padding: '0 5px', gap: '8px' });
      const l = document.createElement('span');
      l.textContent = config.name || 'Slider';
      Object.assign(l.style, { fontSize: '12px', color: '#c8c8c8', whiteSpace: 'nowrap', minWidth: '60px' });
      f.appendChild(l);
      
      const trackCont = document.createElement('div');
      Object.assign(trackCont.style, { flex: '1', height: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative' });
      const trackBg = document.createElement('div');
      Object.assign(trackBg.style, { width: '100%', height: '2px', background: 'rgba(200,200,200,0.4)', borderRadius: '2px', position: 'relative' });
      const fill = document.createElement('div');
      Object.assign(fill.style, { width: '50%', height: '100%', background: '#c8c8c8', borderRadius: '2px', transition: 'width 0.05s' });
      trackBg.appendChild(fill);
      const thumb = document.createElement('div');
      Object.assign(thumb.style, { width: '14px', height: '14px', borderRadius: '50%', background: '#b4b4b4', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', transition: 'left 0.05s', boxShadow: '0 1px 3px rgba(0,0,0,0.5)' });
      trackBg.appendChild(thumb);
      trackCont.appendChild(trackBg);
      
      const valDisp = document.createElement('span');
      Object.assign(valDisp.style, { fontSize: '11px', color: '#c8c8c8', minWidth: '45px', textAlign: 'right' });
      f.appendChild(valDisp);
      
      const min = config.min || 0, max = config.max || 100;
      let val = config.default || 50;
      const updatePos = (v) => {
        const pct = ((v-min)/(max-min))*100;
        fill.style.width = pct+'%';
        thumb.style.left = pct+'%';
        valDisp.textContent = config.displayMethod === 'Percent' ? Math.round(pct)+'%' : config.displayMethod === 'Degrees' ? Math.round(v)+'°' : Math.round(v);
      };
      updatePos(val);
      
      const getVal = (e) => { const r = trackBg.getBoundingClientRect(); const pct = Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100)); return min+(pct/100)*(max-min); };
      let dragging = false;
      trackCont.onmousedown = (e) => { dragging = true; val = getVal(e); updatePos(val); if (config.callback) config.callback(val); e.preventDefault(); };
      document.onmousemove = (e) => { if (dragging) { val = getVal(e); updatePos(val); if (config.callback) config.callback(val); } };
      document.onmouseup = () => { dragging = false; };
      
      f.appendChild(trackCont);
      parent.appendChild(f);
      return { getValue: () => val, setValue: (v) => { val = v; updatePos(v); } };
    }
    
    _createDropdown(parent, config={}) {
      const f = document.createElement('div');
      Object.assign(f.style, { width: '100%', minHeight: '30px', background: 'rgba(18,18,18,0.7)', borderRadius: '8px', border: '1px solid '+THEME.border.primary, cursor: 'pointer', position: 'relative', transition: 'all 0.2s', overflow: 'hidden' });
      
      const header = document.createElement('div');
      Object.assign(header.style, { height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' });
      const label = document.createElement('span');
      const defVal = config.default || (config.values ? config.values[0] : 'Select');
      label.textContent = (config.name||'Dropdown')+': '+defVal;
      Object.assign(label.style, { fontSize: '12px', color: '#c8c8c8', flex: '1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
      header.appendChild(label);
      const chev = document.createElement('div');
      chev.innerHTML = getIcon('chevronDown');
      Object.assign(chev.style, { width: '13px', height: '13px', color: '#c8c8c8', opacity: '0.6', transition: 'transform 0.3s', transform: 'rotate(180deg)' });
      header.appendChild(chev);
      
      const opts = document.createElement('div');
      Object.assign(opts.style, { width: '100%', maxHeight: '0', overflow: 'hidden', borderTop: '1px solid transparent', padding: '0 8px', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' });
      
      let open = false, selected = config.default || (config.values ? config.values[0] : null);
      const values = config.values || [];
      
      const buildOpts = () => {
        opts.innerHTML = '';
        values.forEach(v => {
          const o = document.createElement('div');
          o.textContent = v;
          Object.assign(o.style, { width: '100%', height: '30px', display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: '12px', color: v===selected?THEME.text.primary:'#c8c8c8', cursor: 'pointer', borderRadius: '8px', background: v===selected?THEME.interactive.selected:'transparent', transition: 'all 0.15s', marginBottom: '2px' });
          o.onmouseenter = () => { if (v!==selected) o.style.background = THEME.interactive.hover; };
          o.onmouseleave = () => { if (v!==selected) o.style.background = 'transparent'; };
          o.onclick = (e) => { e.stopPropagation(); selected = v; label.textContent = (config.name||'Dropdown')+': '+v; buildOpts(); close(); if (config.callback) config.callback(v); };
          opts.appendChild(o);
        });
      };
      buildOpts();
      
      const openDd = () => {
        open = true;
        opts.style.maxHeight = (values.length*32+16)+'px';
        opts.style.borderTop = '1px solid '+THEME.border.primary;
        opts.style.padding = '8px';
        chev.style.transform = 'rotate(0deg)';
        f.style.borderColor = THEME.highlight.purple;
      };
      const close = () => {
        open = false;
        opts.style.maxHeight = '0';
        opts.style.borderTop = '1px solid transparent';
        opts.style.padding = '0 8px';
        chev.style.transform = 'rotate(180deg)';
        f.style.borderColor = THEME.border.primary;
      };
      
      header.onclick = (e) => { e.stopPropagation(); open ? close() : openDd(); };
      document.addEventListener('click', () => { if (open) close(); });
      
      f.appendChild(header);
      f.appendChild(opts);
      parent.appendChild(f);
      return { getValue: () => selected, setValue: (v) => { selected = v; label.textContent = (config.name||'Dropdown')+': '+v; buildOpts(); } };
    }
  }
  
  // ============================================
  // API GLOBAL
  // ============================================
  window.AICODE = {
    VERSION,
    createWindow: (settings) => new Window(settings),
    NotificationManager: Notifications,
    DialogManager: Dialogs
  };
  
  console.log('[AICODE v'+VERSION+'] Library loaded successfully!');
})();
