// ============================================
// AICODE LIBRARY v2.0
// ============================================

const AICODE = (() => {
  const VERSION = "2.0";
  const FOLDER = "AICODE";
  
  // Configurações padrão
  const DEFAULT_THEME = {
    Background: {
      Primary: "#0a0a0a",
      Secondary: "#0f0f0f",
      Tertiary: "#0f0f0f",
      Card: "rgba(15, 15, 15, 0.7)"
    },
    Text: {
      Primary: "#f0f0f0",
      Secondary: "#b4b4b4",
      Disabled: "#787878"
    },
    Border: {
      Primary: "#232323",
      Secondary: "#8c8c8c"
    },
    Interactive: {
      Hover: "#2d2d37",
      Pressed: "#373741",
      Selected: "rgba(124, 77, 255, 0.08)",
      Tab: "#161616"
    },
    Highlight: {
      Purple: "#7c4dff",
      PurpleDark: "#6200ea",
      Green: "#4caf50",
      Red: "#f44336",
      Orange: "#ff9800"
    },
    Apple: {
      Red: "#ff4f4f",
      Yellow: "#e3e85f",
      Green: "#60b541"
    },
    Elements: {
      Button: {
        Primary: "rgba(18, 18, 18, 0.7)",
        Text: "#c8c8c8",
        Thumb: "#c8c8c8"
      },
      Toggle: {
        Primary: "transparent",
        Track: "rgba(18, 18, 18, 0.7)",
        Thumb: "#787878",
        Text: "#c8c8c8"
      },
      Checkbox: {
        Primary: "transparent",
        Track: "rgba(18, 18, 18, 0.7)",
        Thumb: "#c8c8c8",
        Text: "#c8c8c8"
      },
      Slider: {
        Primary: "transparent",
        Text: "#c8c8c8",
        Display: "#c8c8c8",
        Thumb: "#b4b4b4",
        Track: "#c8c8c8",
        Line: "rgba(200, 200, 200, 0.4)"
      },
      Dropdown: {
        Primary: "rgba(18, 18, 18, 0.7)",
        Text: "#c8c8c8",
        Thumb: "#f0f0f0"
      }
    }
  };

  // ============================================
  // UTILITÁRIOS
  // ============================================
  
  const TweenService = {
    animate(element, properties, duration = 0.3, easing = "ease") {
      return new Promise((resolve) => {
        const transitions = [];
        const originalStyles = {};
        
        for (const [prop, value] of Object.entries(properties)) {
          const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
          originalStyles[cssProp] = element.style[cssProp];
          transitions.push(`${cssProp} ${duration}s ${easing}`);
        }
        
        element.style.transition = transitions.join(', ');
        
        requestAnimationFrame(() => {
          for (const [prop, value] of Object.entries(properties)) {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            element.style[cssProp] = value;
          }
        });
        
        setTimeout(() => {
          element.style.transition = '';
          resolve();
        }, duration * 1000);
      });
    },
    
    fadeIn(element, duration = 0.3) {
      element.style.opacity = '0';
      element.style.display = '';
      return this.animate(element, { opacity: '1' }, duration);
    },
    
    fadeOut(element, duration = 0.3) {
      return this.animate(element, { opacity: '0' }, duration).then(() => {
        element.style.display = 'none';
      });
    }
  };

  // ============================================
  // GERENCIADOR DE ICONES SVG
  // ============================================
  
  const Icons = {
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    
    user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="100%" height="100%"><polyline points="20 6 9 17 4 12"/></svg>`,
    
    chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="6 9 12 15 18 9"/></svg>`,
    
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2" width="100%" height="100%"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" width="100%" height="100%"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
  };

  function getIcon(name) {
    return Icons[name] || Icons.home;
  }

  // ============================================
  // ESTILOS GLOBAIS
  // ============================================
  
  function injectGlobalStyles() {
    if (document.getElementById('aicode-global-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'aicode-global-styles';
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600;700&display=swap');
      
      .aicode-reset, .aicode-reset * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
        font-family: 'Source Code Pro', 'Courier New', monospace;
      }
      
      .aicode-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .aicode-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .aicode-scrollbar::-webkit-scrollbar-thumb {
        background: #1a1a1a;
        border-radius: 2px;
      }
      
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
      
      @keyframes aicode-fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      
      @keyframes aicode-scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // ============================================
  // NOTIFICAÇÕES (Canto Superior Direito)
  // ============================================
  
  class NotificationManager {
    constructor() {
      this.container = null;
      this.notifications = [];
      this.init();
    }
    
    init() {
      this.container = document.createElement('div');
      this.container.id = 'aicode-notifications';
      Object.assign(this.container.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: '2147483647',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        maxWidth: '350px'
      });
      document.body.appendChild(this.container);
    }
    
    show({ title = '', message = '', type = 'info', duration = 4000 }) {
      const notifEl = document.createElement('div');
      Object.assign(notifEl.style, {
        background: '#0a0a0a',
        border: '1px solid #232323',
        borderRadius: '10px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        pointerEvents: 'auto',
        animation: 'aicode-slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        minWidth: '280px',
        position: 'relative',
        overflow: 'hidden'
      });

      // Linha colorida lateral
      const accentColors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#7c4dff'
      };
      
      const accentBar = document.createElement('div');
      Object.assign(accentBar.style, {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '3px',
        height: '100%',
        background: accentColors[type] || accentColors.info,
        borderRadius: '3px 0 0 3px'
      });
      notifEl.appendChild(accentBar);

      // Ícone
      const iconContainer = document.createElement('div');
      Object.assign(iconContainer.style, {
        width: '24px',
        height: '24px',
        minWidth: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
      const iconMap = { success: 'success', error: 'error', warning: 'warning', info: 'info' };
      iconContainer.innerHTML = getIcon(iconMap[type] || 'info');
      notifEl.appendChild(iconContainer);

      // Conteúdo
      const contentEl = document.createElement('div');
      Object.assign(contentEl.style, {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      });

      if (title) {
        const titleEl = document.createElement('div');
        titleEl.textContent = title;
        Object.assign(titleEl.style, {
          color: '#f0f0f0',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.3px'
        });
        contentEl.appendChild(titleEl);
      }

      if (message) {
        const msgEl = document.createElement('div');
        msgEl.textContent = message;
        Object.assign(msgEl.style, {
          color: '#b4b4b4',
          fontSize: '11px',
          lineHeight: '1.4'
        });
        contentEl.appendChild(msgEl);
      }

      notifEl.appendChild(contentEl);

      // Botão fechar
      const closeBtn = document.createElement('div');
      closeBtn.innerHTML = getIcon('close');
      Object.assign(closeBtn.style, {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
        color: '#787878',
        transition: 'color 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
      closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#f0f0f0');
      closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = '#787878');
      closeBtn.addEventListener('click', () => this.remove(notifEl));
      notifEl.appendChild(closeBtn);

      this.container.appendChild(notifEl);

      // Timer para remover
      const timer = setTimeout(() => this.remove(notifEl), duration);
      notifEl._timer = timer;

      return notifEl;
    }
    
    remove(notifEl) {
      if (notifEl._removing) return;
      notifEl._removing = true;
      
      clearTimeout(notifEl._timer);
      
      notifEl.style.animation = 'aicode-slideOutRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      
      setTimeout(() => {
        if (notifEl.parentNode) {
          notifEl.remove();
        }
      }, 300);
    }
    
    success(title, message, duration) { this.show({ title, message, type: 'success', duration }); }
    error(title, message, duration) { this.show({ title, message, type: 'error', duration }); }
    warning(title, message, duration) { this.show({ title, message, type: 'warning', duration }); }
    info(title, message, duration) { this.show({ title, message, type: 'info', duration }); }
  }

  // ============================================
  // DIÁLOGOS (Centro da Tela)
  // ============================================
  
  class DialogManager {
    constructor() {
      this.overlay = null;
      this.init();
    }
    
    init() {
      this.overlay = document.createElement('div');
      this.overlay.id = 'aicode-dialog-overlay';
      Object.assign(this.overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.6)',
        zIndex: '2147483646',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
      });
      document.body.appendChild(this.overlay);
    }
    
    show({ title = '', content = '', buttons = [], width = '420px' }) {
      return new Promise((resolve) => {
        this.overlay.style.display = 'flex';
        this.overlay.style.animation = 'aicode-fadeIn 0.2s ease forwards';
        
        const dialogEl = document.createElement('div');
        Object.assign(dialogEl.style, {
          background: '#0a0a0a',
          border: '1px solid #232323',
          borderRadius: '14px',
          padding: '24px',
          width: width,
          maxWidth: '90vw',
          maxHeight: '80vh',
          overflowY: 'auto',
          animation: 'aicode-scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        });
        
        // Header
        if (title) {
          const headerEl = document.createElement('div');
          Object.assign(headerEl.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          });
          
          const titleEl = document.createElement('div');
          titleEl.textContent = title;
          Object.assign(titleEl.style, {
            color: '#f0f0f0',
            fontSize: '16px',
            fontWeight: '700',
            letterSpacing: '0.5px'
          });
          headerEl.appendChild(titleEl);
          
          const closeBtn = document.createElement('div');
          closeBtn.innerHTML = getIcon('close');
          Object.assign(closeBtn.style, {
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            color: '#787878',
            transition: 'color 0.2s'
          });
          closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#f0f0f0');
          closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = '#787878');
          headerEl.appendChild(closeBtn);
          
          dialogEl.appendChild(headerEl);
        }
        
        // Content
        if (typeof content === 'string') {
          const contentEl = document.createElement('div');
          contentEl.textContent = content;
          Object.assign(contentEl.style, {
            color: '#b4b4b4',
            fontSize: '13px',
            lineHeight: '1.6',
            letterSpacing: '0.2px'
          });
          dialogEl.appendChild(contentEl);
        } else if (content instanceof HTMLElement) {
          dialogEl.appendChild(content);
        }
        
        // Buttons
        if (buttons.length > 0) {
          const btnContainer = document.createElement('div');
          Object.assign(btnContainer.style, {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
          });
          
          buttons.forEach((btn) => {
            const btnEl = document.createElement('button');
            btnEl.textContent = btn.text || 'OK';
            Object.assign(btnEl.style, {
              padding: '10px 20px',
              borderRadius: '8px',
              border: btn.primary ? 'none' : '1px solid #232323',
              background: btn.primary ? 'linear-gradient(135deg, #6200ea, #7c4dff)' : 'rgba(25, 25, 25, 0.7)',
              color: btn.primary ? '#fff' : '#c8c8c8',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              fontFamily: "'Source Code Pro', 'Courier New', monospace",
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease'
            });
            
            btnEl.addEventListener('mouseenter', () => {
              if (btn.primary) {
                btnEl.style.transform = 'translateY(-1px)';
                btnEl.style.boxShadow = '0 4px 15px rgba(124, 77, 255, 0.3)';
              } else {
                btnEl.style.background = 'rgba(45, 45, 55, 0.7)';
              }
            });
            
            btnEl.addEventListener('mouseleave', () => {
              btnEl.style.transform = '';
              btnEl.style.boxShadow = '';
              if (!btn.primary) {
                btnEl.style.background = 'rgba(25, 25, 25, 0.7)';
              }
            });
            
            btnEl.addEventListener('click', () => {
              this.close();
              resolve(btn.value !== undefined ? btn.value : btn.text);
            });
            
            btnContainer.appendChild(btnEl);
          });
          
          dialogEl.appendChild(btnContainer);
        }
        
        this.overlay.appendChild(dialogEl);
        this._currentDialog = dialogEl;
        
        // Click outside to close
        this.overlay.addEventListener('click', (e) => {
          if (e.target === this.overlay) {
            this.close();
            resolve(null);
          }
        });
      });
    }
    
    close() {
      if (this._currentDialog) {
        this._currentDialog.style.animation = 'aicode-fadeOut 0.2s ease forwards';
        setTimeout(() => {
          if (this._currentDialog && this._currentDialog.parentNode) {
            this._currentDialog.remove();
          }
          this._currentDialog = null;
          if (this.overlay.children.length === 0) {
            this.overlay.style.display = 'none';
          }
        }, 200);
      }
    }
    
    alert(title, message) {
      return this.show({
        title,
        content: message,
        buttons: [{ text: 'OK', primary: true, value: 'ok' }]
      });
    }
    
    confirm(title, message) {
      return this.show({
        title,
        content: message,
        buttons: [
          { text: 'Cancel', value: false },
          { text: 'Confirm', primary: true, value: true }
        ]
      });
    }
    
    prompt(title, placeholder = '') {
      return new Promise((resolve) => {
        const inputEl = document.createElement('input');
        inputEl.placeholder = placeholder;
        Object.assign(inputEl.style, {
          width: '100%',
          padding: '10px 14px',
          background: 'rgba(18, 18, 18, 0.7)',
          border: '1px solid #232323',
          borderRadius: '8px',
          color: '#f0f0f0',
          fontSize: '13px',
          fontFamily: "'Source Code Pro', 'Courier New', monospace",
          outline: 'none',
          transition: 'border-color 0.2s'
        });
        inputEl.addEventListener('focus', () => inputEl.style.borderColor = '#7c4dff');
        inputEl.addEventListener('blur', () => inputEl.style.borderColor = '#232323');
        
        this.show({
          title,
          content: inputEl,
          buttons: [
            { text: 'Cancel', value: null },
            { text: 'Submit', primary: true, value: 'submit' }
          ]
        }).then((result) => {
          resolve(result === 'submit' ? inputEl.value : null);
        });
      });
    }
  }

  // ============================================
  // WINDOW (Janela Principal)
  // ============================================
  
  class Window {
    constructor(settings = {}) {
      this.settings = Object.assign({
        Title: 'AICODE',
        Theme: DEFAULT_THEME,
        ShowUserInfo: false,
        AcrylicBlur: true,
        Button: false,
        Size: { width: 580, height: 380 },
        KeyBind: null
      }, settings);
      
      this.tabs = [];
      this.activeTab = null;
      this.activeSubTab = null;
      this.notifications = new NotificationManager();
      this.dialogs = new DialogManager();
      
      injectGlobalStyles();
      this.build();
    }
    
    build() {
      // ScreenGui
      this.screenGui = document.createElement('div');
      this.screenGui.className = 'aicode-reset';
      Object.assign(this.screenGui.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '2147483640',
        pointerEvents: 'none',
        fontFamily: "'Source Code Pro', 'Courier New', monospace"
      });
      document.body.appendChild(this.screenGui);
      
      // Window Frame
      this.windowFrame = document.createElement('div');
      Object.assign(this.windowFrame.style, {
        position: 'absolute',
        width: this.settings.Size.width + 'px',
        height: this.settings.Size.height + 'px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        borderRadius: '10px',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'
      });
      this.screenGui.appendChild(this.windowFrame);
      
      // Container Principal
      this.containerFuns = document.createElement('div');
      Object.assign(this.containerFuns.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: this.settings.Theme.Background.Primary,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px ' + this.settings.Theme.Border.Primary + ', 0 15px 50px rgba(0,0,0,0.7)',
        backdropFilter: this.settings.AcrylicBlur ? 'blur(2px)' : 'none'
      });
      this.windowFrame.appendChild(this.containerFuns);
      
      this.buildLeftPanel();
      this.buildRightPanel();
      this.setupDrag();
      
      // KeyBind
      if (this.settings.KeyBind) {
        document.addEventListener('keydown', (e) => {
          if (e.key === this.settings.KeyBind || e.code === this.settings.KeyBind) {
            this.toggleVisibility();
          }
        });
      }
    }
    
    buildLeftPanel() {
      const leftPanel = document.createElement('div');
      Object.assign(leftPanel.style, {
        width: '85px',
        minWidth: '85px',
        height: '100%',
        background: this.settings.Theme.Background.Secondary,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid ' + this.settings.Theme.Border.Primary,
        borderRadius: '10px 0 0 10px',
        overflow: 'hidden'
      });
      
      // Apple Balls + Drag Area
      const ballsArea = document.createElement('div');
      Object.assign(ballsArea.style, {
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
      });
      
      // Bolinhas
      const appleColors = [this.settings.Theme.Apple.Red, this.settings.Theme.Apple.Yellow, this.settings.Theme.Apple.Green];
      appleColors.forEach((color, i) => {
        const ball = document.createElement('div');
        Object.assign(ball.style, {
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: color,
          opacity: '0',
          transition: 'opacity 0.5s ease'
        });
        ballsArea.appendChild(ball);
        setTimeout(() => { ball.style.opacity = '1'; }, 400 * i);
      });
      
      leftPanel.appendChild(ballsArea);
      
      // Tabs Area
      this.tabsContainer = document.createElement('div');
      Object.assign(this.tabsContainer.style, {
        width: '100%',
        flex: '1',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      });
      this.tabsContainer.className = 'aicode-scrollbar';
      leftPanel.appendChild(this.tabsContainer);
      
      // User Area
      const userArea = document.createElement('div');
      Object.assign(userArea.style, {
        width: '100%',
        height: '45px',
        minHeight: '45px',
        borderTop: '1px solid rgba(35,35,35,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
      
      const avatarFrame = document.createElement('div');
      Object.assign(avatarFrame.style, {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#1a1a1a',
        border: '1px solid ' + this.settings.Theme.Border.Primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      });
      
      const avatarInner = document.createElement('div');
      Object.assign(avatarInner.style, {
        width: '20px',
        height: '20px',
        color: '#787878'
      });
      avatarInner.innerHTML = getIcon('user');
      avatarFrame.appendChild(avatarInner);
      userArea.appendChild(avatarFrame);
      
      leftPanel.appendChild(userArea);
      
      this.leftPanel = leftPanel;
      this.ballsArea = ballsArea;
      this.containerFuns.appendChild(leftPanel);
    }
    
    buildRightPanel() {
      const rightPanel = document.createElement('div');
      Object.assign(rightPanel.style, {
        flex: '1',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        overflow: 'hidden'
      });
      
      // Tabs Frame (barra superior)
      const rightTabsFrame = document.createElement('div');
      Object.assign(rightTabsFrame.style, {
        width: '100%',
        height: '35px',
        minHeight: '35px',
        background: this.settings.Theme.Background.Secondary,
        borderBottom: '1px solid rgba(35,35,35,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        borderRadius: '0 10px 0 0',
        position: 'relative'
      });
      
      // Título
      this.titleLabel = document.createElement('div');
      Object.assign(this.titleLabel.style, {
        color: this.settings.Theme.Text.Primary,
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        marginLeft: 'auto',
        padding: '4px 8px',
        whiteSpace: 'nowrap'
      });
      this.titleLabel.textContent = this.settings.Title;
      rightTabsFrame.appendChild(this.titleLabel);
      
      // Container de SubTabs
      this.subTabsContainer = document.createElement('div');
      Object.assign(this.subTabsContainer.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        height: '100%',
        position: 'absolute',
        left: '8px',
        top: '0'
      });
      rightTabsFrame.appendChild(this.subTabsContainer);
      
      // Linha indicadora
      this.activeLine = document.createElement('div');
      Object.assign(this.activeLine.style, {
        position: 'absolute',
        bottom: '0',
        height: '2px',
        background: this.settings.Theme.Highlight.Purple,
        borderRadius: '2px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: '0'
      });
      rightTabsFrame.appendChild(this.activeLine);
      
      // Content Area
      this.rightContent = document.createElement('div');
      Object.assign(this.rightContent.style, {
        flex: '1',
        padding: '7px',
        overflow: 'hidden',
        position: 'relative'
      });
      
      this.tabContentsContainer = document.createElement('div');
      Object.assign(this.tabContentsContainer.style, {
        position: 'absolute',
        top: '7px',
        left: '7px',
        right: '7px',
        bottom: '7px'
      });
      this.rightContent.appendChild(this.tabContentsContainer);
      
      rightPanel.appendChild(rightTabsFrame);
      rightPanel.appendChild(this.rightContent);
      
      this.rightTabsFrame = rightTabsFrame;
      this.containerFuns.appendChild(rightPanel);
    }
    
    setupDrag() {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;
      
      this.ballsArea.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = this.windowFrame.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        this.windowFrame.style.transition = 'none';
        this.windowFrame.style.cursor = 'grabbing';
        e.preventDefault();
      });
      
      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const parentRect = this.screenGui.getBoundingClientRect();
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;
        
        newLeft = Math.max(0, Math.min(newLeft, parentRect.width - this.windowFrame.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, parentRect.height - this.windowFrame.offsetHeight));
        
        this.windowFrame.style.left = newLeft + 'px';
        this.windowFrame.style.top = newTop + 'px';
        this.windowFrame.style.transform = 'none';
      });
      
      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          this.windowFrame.style.transition = '';
          this.windowFrame.style.cursor = '';
        }
      });
    }
    
    toggleVisibility() {
      const isVisible = this.windowFrame.style.display !== 'none';
      this.windowFrame.style.display = isVisible ? 'none' : '';
    }
    
    addTab(settings = {}) {
      const tabData = {
        id: settings.id || 'tab-' + this.tabs.length,
        icon: settings.icon || 'home',
        button: null,
        content: null,
        subTabsContainer: null,
        subTabs: [],
        active: false
      };
      
      // Tab Button
      const tabButton = document.createElement('div');
      Object.assign(tabButton.style, {
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
      });
      
      const iconWrapper = document.createElement('div');
      Object.assign(iconWrapper.style, {
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: this.settings.Theme.Text.Secondary,
        opacity: '0.6',
        transition: 'all 0.2s ease'
      });
      iconWrapper.innerHTML = getIcon(tabData.icon);
      tabButton.appendChild(iconWrapper);
      
      // Tab Content
      const tabContent = document.createElement('div');
      Object.assign(tabContent.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'none',
        flexDirection: 'column',
        overflow: 'hidden'
      });
      this.tabContentsContainer.appendChild(tabContent);
      
      // SubTabs Container
      const subTabsWrapper = document.createElement('div');
      Object.assign(subTabsWrapper.style, {
        display: 'none',
        gap: '0',
        height: '100%',
        alignItems: 'center'
      });
      this.subTabsContainer.appendChild(subTabsWrapper);
      
      tabData.button = tabButton;
      tabData.content = tabContent;
      tabData.subTabsContainer = subTabsWrapper;
      
      // Click Event
      tabButton.addEventListener('click', () => {
        if (this.activeTab === tabData) return;
        
        if (this.activeTab) {
          this.activeTab.button.style.background = 'transparent';
          this.activeTab.button.style.border = '1px solid transparent';
          this.activeTab.button.style.width = '50px';
          this.activeTab.button.style.height = '40px';
          this.activeTab.button.querySelector('div').style.opacity = '0.6';
          this.activeTab.button.querySelector('div').style.color = this.settings.Theme.Text.Secondary;
          this.activeTab.content.style.display = 'none';
          this.activeTab.subTabsContainer.style.display = 'none';
          this.activeTab.active = false;
        }
        
        tabData.button.style.background = this.settings.Theme.Interactive.Selected;
        tabData.button.style.border = '1px solid ' + this.settings.Theme.Border.Primary;
        tabData.button.style.width = '55px';
        tabData.button.style.height = '45px';
        tabData.button.querySelector('div').style.opacity = '1';
        tabData.button.querySelector('div').style.color = this.settings.Theme.Text.Primary;
        tabData.content.style.display = 'flex';
        tabData.subTabsContainer.style.display = 'flex';
        tabData.active = true;
        
        this.activeTab = tabData;
        
        if (tabData.subTabs.length > 0) {
          this.activateSubTab(tabData.subTabs[0]);
        }
      });
      
      this.tabsContainer.appendChild(tabButton);
      this.tabs.push(tabData);
      
      if (this.tabs.length === 1) {
        tabButton.click();
      }
      
      return {
        addSubTab: (subSettings) => this.addSubTab(tabData, subSettings)
      };
    }
    
    addSubTab(parentTab, settings = {}) {
      const subData = {
        id: settings.id || 'subtab-' + parentTab.subTabs.length,
        name: settings.name || 'SubTab',
        button: null,
        content: null,
        leftColumn: null,
        rightColumn: null,
        sections: [],
        active: false
      };
      
      // SubTab Button
      const subButton = document.createElement('div');
      subButton.textContent = subData.name;
      Object.assign(subButton.style, {
        padding: '4px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '12px',
        color: this.settings.Theme.Text.Secondary,
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        background: 'transparent',
        height: '27px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        letterSpacing: '0.3px'
      });
      
      // SubTab Content
      const subContent = document.createElement('div');
      Object.assign(subContent.style, {
        display: 'none',
        width: '100%',
        height: '100%'
      });
      
      const scrollContainer = document.createElement('div');
      Object.assign(scrollContainer.style, {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '1px',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: '10px'
      });
      scrollContainer.className = 'aicode-scrollbar';
      
      const leftCol = document.createElement('div');
      Object.assign(leftCol.style, {
        width: 'calc(50% - 5px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '220px'
      });
      
      const rightCol = document.createElement('div');
      Object.assign(rightCol.style, {
        width: 'calc(50% - 5px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '220px'
      });
      
      scrollContainer.appendChild(leftCol);
      scrollContainer.appendChild(rightCol);
      subContent.appendChild(scrollContainer);
      
      subData.button = subButton;
      subData.content = subContent;
      subData.leftColumn = leftCol;
      subData.rightColumn = rightCol;
      
      subButton.addEventListener('click', () => this.activateSubTab(subData));
      
      parentTab.subTabsContainer.appendChild(subButton);
      parentTab.content.appendChild(subContent);
      parentTab.subTabs.push(subData);
      
      if (parentTab.subTabs.length === 1) {
        this.activateSubTab(subData);
      }
      
      return {
        addSection: (secSettings) => this.addSection(subData, secSettings)
      };
    }
    
    activateSubTab(subData) {
      if (this.activeSubTab === subData) return;
      
      if (this.activeSubTab) {
        this.activeSubTab.button.style.color = this.settings.Theme.Text.Secondary;
        this.activeSubTab.button.style.background = 'transparent';
        this.activeSubTab.content.style.display = 'none';
        this.activeSubTab.active = false;
      }
      
      subData.button.style.color = this.settings.Theme.Text.Primary;
      subData.button.style.background = this.settings.Theme.Interactive.Selected;
      subData.content.style.display = 'block';
      subData.active = true;
      
      // Animar linha
      const btnRect = subData.button.getBoundingClientRect();
      const parentRect = this.rightTabsFrame.getBoundingClientRect();
      this.activeLine.style.opacity = '1';
      this.activeLine.style.left = (btnRect.left - parentRect.left) + 'px';
      this.activeLine.style.width = btnRect.width + 'px';
      
      this.activeSubTab = subData;
    }
    
    addSection(subData, settings = {}) {
      const side = settings.side || 'left';
      const column = side === 'left' ? subData.leftColumn : subData.rightColumn;
      
      const sectionWrapper = document.createElement('div');
      Object.assign(sectionWrapper.style, {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0'
      });
      
      // Header
      if (settings.header) {
        const headerEl = document.createElement('div');
        headerEl.textContent = settings.header;
        Object.assign(headerEl.style, {
          fontSize: '10px',
          color: this.settings.Theme.Text.Disabled,
          padding: '0 4px 6px 4px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          fontWeight: '700'
        });
        sectionWrapper.appendChild(headerEl);
      }
      
      // Card
      const sectionCard = document.createElement('div');
      Object.assign(sectionCard.style, {
        width: '100%',
        background: this.settings.Theme.Background.Card,
        borderRadius: '7px',
        border: '1px solid ' + this.settings.Theme.Border.Primary,
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      });
      sectionWrapper.appendChild(sectionCard);
      
      column.appendChild(sectionWrapper);
      
      const self = this;
      
      return {
        addButton: (cfg) => self.createButton(sectionCard, cfg),
        addToggle: (cfg) => self.createToggle(sectionCard, cfg),
        addCheckbox: (cfg) => self.createCheckbox(sectionCard, cfg),
        addSlider: (cfg) => self.createSlider(sectionCard, cfg),
        addDropdown: (cfg) => self.createDropdown(sectionCard, cfg)
      };
    }
    
    // ============================================
    // ELEMENTOS DA SEÇÃO
    // ============================================
    
    createButton(parent, config = {}) {
      const btnFrame = document.createElement('div');
      Object.assign(btnFrame.style, {
        width: '100%',
        height: '30px',
        background: this.settings.Theme.Elements.Button.Primary,
        borderRadius: '7px',
        border: '1px solid rgba(35, 35, 35, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '0 8px',
        transition: 'all 0.2s ease',
        position: 'relative'
      });
      
      const label = document.createElement('span');
      label.textContent = config.name || 'Button';
      Object.assign(label.style, {
        fontSize: '12px',
        color: this.settings.Theme.Elements.Button.Text,
        transition: 'color 0.2s ease',
        letterSpacing: '0.3px'
      });
      btnFrame.appendChild(label);
      
      // Thumb (indicador visual)
      const thumb = document.createElement('div');
      Object.assign(thumb.style, {
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
      });
      const thumbInner = document.createElement('div');
      Object.assign(thumbInner.style, {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: this.settings.Theme.Elements.Button.Thumb,
        opacity: '0.6'
      });
      thumb.appendChild(thumbInner);
      btnFrame.appendChild(thumb);
      
      btnFrame.addEventListener('mouseenter', () => {
        btnFrame.style.background = this.settings.Theme.Interactive.Hover;
        label.style.color = this.settings.Theme.Text.Primary;
        thumb.style.opacity = '1';
      });
      
      btnFrame.addEventListener('mouseleave', () => {
        btnFrame.style.background = this.settings.Theme.Elements.Button.Primary;
        label.style.color = this.settings.Theme.Elements.Button.Text;
        thumb.style.opacity = '0.6';
      });
      
      btnFrame.addEventListener('click', () => {
        if (config.callback) config.callback();
      });
      
      parent.appendChild(btnFrame);
      return btnFrame;
    }
    
    createToggle(parent, config = {}) {
      const frame = document.createElement('div');
      Object.assign(frame.style, {
        width: '100%',
        height: '30px',
        background: 'transparent',
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: '0 5px'
      });
      
      const label = document.createElement('span');
      label.textContent = config.name || 'Toggle';
      Object.assign(label.style, {
        fontSize: '12px',
        color: this.settings.Theme.Elements.Toggle.Text,
        transition: 'color 0.2s ease',
        letterSpacing: '0.3px'
      });
      frame.appendChild(label);
      
      const switchContainer = document.createElement('div');
      Object.assign(switchContainer.style, {
        width: '38px',
        height: '17px',
        background: this.settings.Theme.Elements.Toggle.Track,
        borderRadius: '7px',
        border: '1px solid rgba(35, 35, 35, 0.4)',
        position: 'relative',
        transition: 'all 0.3s ease'
      });
      
      const switchThumb = document.createElement('div');
      Object.assign(switchThumb.style, {
        width: '12px',
        height: '12px',
        background: this.settings.Theme.Elements.Toggle.Thumb,
        borderRadius: '4px',
        position: 'absolute',
        left: '2px',
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      });
      switchContainer.appendChild(switchThumb);
      
      let isToggled = config.default || false;
      
      function updateToggle() {
        if (isToggled) {
          switchContainer.style.background = 'linear-gradient(135deg, #6200ea, #7c4dff)';
          switchContainer.style.borderColor = '#7c4dff';
          switchThumb.style.background = '#f0f0f0';
          switchThumb.style.left = '22px';
        } else {
          switchContainer.style.background = this.settings.Theme.Elements.Toggle.Track;
          switchContainer.style.borderColor = 'rgba(35, 35, 35, 0.4)';
          switchThumb.style.background = this.settings.Theme.Elements.Toggle.Thumb;
          switchThumb.style.left = '2px';
        }
      }
      
      updateToggle.call(this);
      
      frame.addEventListener('click', () => {
        isToggled = !isToggled;
        updateToggle.call(this);
        if (config.callback) config.callback(isToggled);
      });
      
      frame.appendChild(switchContainer);
      parent.appendChild(frame);
      
      return {
        frame,
        getValue: () => isToggled,
        setValue: (v) => { isToggled = v; updateToggle.call(this); }
      };
    }
    
    createCheckbox(parent, config = {}) {
      const frame = document.createElement('div');
      Object.assign(frame.style, {
        width: '100%',
        height: '30px',
        background: 'transparent',
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: '0 5px'
      });
      
      const label = document.createElement('span');
      label.textContent = config.name || 'Checkbox';
      Object.assign(label.style, {
        fontSize: '12px',
        color: this.settings.Theme.Elements.Checkbox.Text,
        transition: 'color 0.2s ease',
        letterSpacing: '0.3px'
      });
      frame.appendChild(label);
      
      const checkBox = document.createElement('div');
      Object.assign(checkBox.style, {
        width: '20px',
        height: '20px',
        background: this.settings.Theme.Elements.Checkbox.Track,
        borderRadius: '5px',
        border: '1px solid rgba(35, 35, 35, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      });
      
      const checkIcon = document.createElement('div');
      Object.assign(checkIcon.style, {
        width: '14px',
        height: '14px',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        color: this.settings.Theme.Elements.Checkbox.Thumb
      });
      checkIcon.innerHTML = getIcon('check');
      checkBox.appendChild(checkIcon);
      
      let isChecked = config.default || false;
      
      function updateCheckbox() {
        if (isChecked) {
          checkBox.style.borderColor = '#7c4dff';
          checkBox.style.background = 'rgba(124, 77, 255, 0.15)';
          checkIcon.style.opacity = '0.8';
        } else {
          checkBox.style.borderColor = 'rgba(35, 35, 35, 0.4)';
          checkBox.style.background = this.settings.Theme.Elements.Checkbox.Track;
          checkIcon.style.opacity = '0';
        }
      }
      
      updateCheckbox.call(this);
      
      frame.addEventListener('click', () => {
        isChecked = !isChecked;
        updateCheckbox.call(this);
        if (config.callback) config.callback(isChecked);
      });
      
      frame.appendChild(checkBox);
      parent.appendChild(frame);
      
      return {
        frame,
        getValue: () => isChecked,
        setValue: (v) => { isChecked = v; updateCheckbox.call(this); }
      };
    }
    
    createSlider(parent, config = {}) {
      const frame = document.createElement('div');
      Object.assign(frame.style, {
        width: '100%',
        height: '30px',
        background: 'transparent',
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5px',
        gap: '8px'
      });
      
      const label = document.createElement('span');
      label.textContent = config.name || 'Slider';
      Object.assign(label.style, {
        fontSize: '12px',
        color: this.settings.Theme.Elements.Slider.Text,
        whiteSpace: 'nowrap',
        minWidth: '60px',
        letterSpacing: '0.3px'
      });
      frame.appendChild(label);
      
      const trackContainer = document.createElement('div');
      Object.assign(trackContainer.style, {
        flex: '1',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer'
      });
      
      const trackBg = document.createElement('div');
      Object.assign(trackBg.style, {
        width: '100%',
        height: '2px',
        background: this.settings.Theme.Elements.Slider.Line,
        borderRadius: '2px',
        position: 'relative'
      });
      
      const trackFill = document.createElement('div');
      Object.assign(trackFill.style, {
        width: '50%',
        height: '100%',
        background: this.settings.Theme.Elements.Slider.Track,
        borderRadius: '2px',
        transition: 'width 0.05s ease'
      });
      trackBg.appendChild(trackFill);
      
      const thumb = document.createElement('div');
      Object.assign(thumb.style, {
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        background: this.settings.Theme.Elements.Slider.Thumb,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.05s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.5)'
      });
      trackBg.appendChild(thumb);
      
      trackContainer.appendChild(trackBg);
      
      const valueDisplay = document.createElement('span');
      Object.assign(valueDisplay.style, {
        fontSize: '11px',
        color: this.settings.Theme.Elements.Slider.Display,
        minWidth: '45px',
        textAlign: 'right',
        whiteSpace: 'nowrap',
        letterSpacing: '0.3px'
      });
      frame.appendChild(valueDisplay);
      
      const min = config.min || 0;
      const max = config.max || 100;
      let currentValue = config.default || 50;
      
      function updateSliderPosition(value) {
        const percent = ((value - min) / (max - min)) * 100;
        trackFill.style.width = percent + '%';
        thumb.style.left = percent + '%';
        
        if (config.displayMethod === 'Percent') {
          valueDisplay.textContent = Math.round(percent) + '%';
        } else if (config.displayMethod === 'Degrees') {
          valueDisplay.textContent = Math.round(value) + '°';
        } else {
          valueDisplay.textContent = Math.round(value);
        }
      }
      
      updateSliderPosition(currentValue);
      
      function getValueFromEvent(e) {
        const rect = trackBg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        return min + (percent / 100) * (max - min);
      }
      
      let isDragging = false;
      
      trackContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentValue = getValueFromEvent(e);
        updateSliderPosition(currentValue);
        if (config.callback) config.callback(currentValue);
        e.preventDefault();
      });
      
      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentValue = getValueFromEvent(e);
        updateSliderPosition(currentValue);
        if (config.callback) config.callback(currentValue);
      });
      
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
      
      frame.appendChild(trackContainer);
      parent.appendChild(frame);
      
      return {
        frame,
        getValue: () => currentValue,
        setValue: (v) => { currentValue = v; updateSliderPosition(v); }
      };
    }
    
    createDropdown(parent, config = {}) {
      const frame = document.createElement('div');
      Object.assign(frame.style, {
        width: '100%',
        minHeight: '30px',
        background: this.settings.Theme.Elements.Dropdown.Primary,
        borderRadius: '8px',
        border: '1px solid ' + this.settings.Theme.Border.Primary,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s ease',
        overflow: 'hidden'
      });
      
      const header = document.createElement('div');
      Object.assign(header.style, {
        width: '100%',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px'
      });
      
      const label = document.createElement('span');
      const defaultVal = config.default || (config.values ? config.values[0] : 'Select');
      label.textContent = (config.name || 'Dropdown') + ': ' + defaultVal;
      Object.assign(label.style, {
        fontSize: '12px',
        color: this.settings.Theme.Elements.Dropdown.Text,
        flex: '1',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        letterSpacing: '0.3px'
      });
      header.appendChild(label);
      
      const chevron = document.createElement('div');
      chevron.innerHTML = getIcon('chevronDown');
      Object.assign(chevron.style, {
        width: '13px',
        height: '13px',
        color: this.settings.Theme.Elements.Dropdown.Text,
        opacity: '0.6',
        transition: 'transform 0.3s ease',
        transform: 'rotate(180deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
      header.appendChild(chevron);
      
      const optionsContainer = document.createElement('div');
      Object.assign(optionsContainer.style, {
        width: '100%',
        maxHeight: '0',
        overflow: 'hidden',
        borderTop: '1px solid transparent',
        padding: '0 8px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      });
      
      let isOpen = false;
      let selectedValue = config.default || (config.values ? config.values[0] : null);
      const values = config.values || [];
      
      function buildOptions() {
        optionsContainer.innerHTML = '';
        values.forEach((val) => {
          const optionEl = document.createElement('div');
          optionEl.textContent = val;
          Object.assign(optionEl.style, {
            width: '100%',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            fontSize: '12px',
            color: val === selectedValue ? this.settings.Theme.Text.Primary : this.settings.Theme.Elements.Dropdown.Text,
            cursor: 'pointer',
            borderRadius: '8px',
            border: '1px solid transparent',
            background: val === selectedValue ? this.settings.Theme.Interactive.Selected : 'transparent',
            transition: 'all 0.15s ease',
            letterSpacing: '0.3px',
            marginBottom: '2px'
          });
          
          optionEl.addEventListener('mouseenter', () => {
            if (val !== selectedValue) {
              optionEl.style.background = this.settings.Theme.Interactive.Hover;
            }
          });
          
          optionEl.addEventListener('mouseleave', () => {
            if (val !== selectedValue) {
              optionEl.style.background = 'transparent';
            }
          });
          
          optionEl.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedValue = val;
            label.textContent = (config.name || 'Dropdown') + ': ' + val;
            buildOptions.call(this);
            closeDropdown();
            if (config.callback) config.callback(val);
          });
          
          optionsContainer.appendChild(optionEl);
        });
      }
      
      buildOptions.call(this);
      
      function openDropdown() {
        isOpen = true;
        const totalHeight = values.length * 32 + 16;
        optionsContainer.style.maxHeight = totalHeight + 'px';
        optionsContainer.style.borderTop = '1px solid ' + this.settings.Theme.Border.Primary;
        optionsContainer.style.padding = '8px';
        chevron.style.transform = 'rotate(0deg)';
        frame.style.borderColor = this.settings.Theme.Highlight.Purple;
      }
      
      function closeDropdown() {
        isOpen = false;
        optionsContainer.style.maxHeight = '0';
        optionsContainer.style.borderTop = '1px solid transparent';
        optionsContainer.style.padding = '0 8px';
        chevron.style.transform = 'rotate(180deg)';
        frame.style.borderColor = this.settings.Theme.Border.Primary;
      }
      
      header.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isOpen) {
          closeDropdown.call(this);
        } else {
          openDropdown.call(this);
        }
      });
      
      document.addEventListener('click', () => {
        if (isOpen) closeDropdown.call(this);
      });
      
      frame.appendChild(header);
      frame.appendChild(optionsContainer);
      parent.appendChild(frame);
      
      return {
        frame,
        getValue: () => selectedValue,
        setValue: (v) => {
          selectedValue = v;
          label.textContent = (config.name || 'Dropdown') + ': ' + v;
          buildOptions.call(this);
        },
        addValue: (v) => {
          values.push(v);
          buildOptions.call(this);
        },
        removeValue: (v) => {
          const idx = values.indexOf(v);
          if (idx > -1) {
            values.splice(idx, 1);
            if (selectedValue === v) {
              selectedValue = values[0] || null;
              label.textContent = (config.name || 'Dropdown') + ': ' + (selectedValue || '');
            }
            buildOptions.call(this);
          }
        }
      };
    }
  }
  
  // ============================================
  // API PÚBLICA
  // ============================================
  
  return {
    VERSION,
    FOLDER,
    Window,
    NotificationManager,
    DialogManager,
    
    createWindow(settings = {}) {
      return new Window(settings);
    }
  };
})();
