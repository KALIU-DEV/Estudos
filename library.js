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
    menuPosition: { x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 },
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

// SVG Icons
const Icons = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  modules: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.2l.07-.08z"/></svg>`,
  search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  toggle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="16" cy="12" r="2"/></svg>`,
  slider: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><circle cx="16" cy="12" r="3"/></svg>`,
  button: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="9" width="18" height="6" rx="2"/></svg>`,
  action: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  arrow: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`,
  subtab1: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  subtab2: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
};

class UI {
  static init() {
    const panel = document.createElement("div");
    panel.id = "aiCodePanel";
    Object.assign(panel.style, {
      position: "fixed", left: `${AICODE.cfg.menuPosition.x}px`, top: `${AICODE.cfg.menuPosition.y}px`,
      width: "900px", height: "620px",
      background: `rgba(28, 28, 32, ${AICODE.cfg.menuOpacity})`, backdropFilter: "blur(20px)",
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
        .ai-win-btn:hover { opacity: 0.8; }
        
        .ai-main-layout { display: flex; height: 100%; width: 100%; }
        
        /* Sidebar */
        .ai-sidebar { width: 240px; background: rgba(0, 0, 0, 0.35); backdrop-filter: blur(10px); border-right: 0.5px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; padding: 52px 12px 20px 12px; }
        .ai-logo { display: flex; align-items: center; gap: 10px; padding: 0 12px 20px 12px; margin-bottom: 20px; border-bottom: 0.5px solid rgba(255,255,255,0.08); }
        .ai-logo-icon { width: 28px; height: 28px; background: ${AICODE.cfg.themeColor}; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; }
        .ai-logo-text { font-size: 18px; font-weight: 700; color: #fff; }
        .ai-logo-version { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        
        .ai-nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 8px; cursor: pointer; transition: all 0.15s ease; color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500; margin-bottom: 4px; }
        .ai-nav-item:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); }
        .ai-nav-item.active { background: rgba(255,255,255,0.12); color: #fff; }
        .ai-nav-item.active .ai-nav-icon { color: ${AICODE.cfg.themeColor}; }
        .ai-nav-icon { width: 20px; display: flex; align-items: center; justify-content: center; }
        
        /* Content Area */
        .ai-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .ai-content-header { padding: 20px 24px 12px 24px; border-bottom: 0.5px solid rgba(255,255,255,0.08); }
        .ai-content-title { font-size: 22px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
        .ai-content-subtitle { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; }
        
        /* Search Bar */
        .ai-search-bar { padding: 12px 24px; border-bottom: 0.5px solid rgba(255,255,255,0.06); }
        .ai-search-input { width: 100%; background: rgba(0,0,0,0.3); border: 0.5px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px 8px 36px; color: #fff; font-size: 13px; font-family: inherit; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: 12px center; }
        .ai-search-input:focus { outline: none; border-color: ${AICODE.cfg.themeColor}; }
        
        /* Subtabs */
        .ai-subtabs { display: flex; gap: 4px; padding: 12px 24px; border-bottom: 0.5px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.15); }
        .ai-subtab { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.15s ease; color: rgba(255,255,255,0.6); font-size: 12px; font-weight: 500; background: transparent; border: none; font-family: inherit; }
        .ai-subtab:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); }
        .ai-subtab.active { background: ${AICODE.cfg.themeColor}20; color: ${AICODE.cfg.themeColor}; }
        
        /* Two Column Layout */
        .ai-two-columns { display: flex; flex: 1; overflow: hidden; gap: 1px; background: rgba(0,0,0,0.1); }
        .ai-column { flex: 1; overflow-y: auto; padding: 16px; background: transparent; }
        .ai-column::-webkit-scrollbar { width: 4px; }
        .ai-column::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .ai-column::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
        
        /* Module Cards */
        .ai-module { background: rgba(0, 0, 0, 0.25); border-radius: 10px; margin-bottom: 16px; overflow: hidden; }
        .ai-module-header { padding: 12px 16px; background: rgba(255,255,255,0.03); border-bottom: 0.5px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; }
        .ai-module-title { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 0.5px; }
        .ai-module-desc { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        
        /* Items */
        .ai-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 0.5px solid rgba(255,255,255,0.04); }
        .ai-item:last-child { border-bottom: none; }
        .ai-item-left { flex: 1; }
        .ai-item-label { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85); display: flex; align-items: center; gap: 8px; }
        .ai-item-desc { font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        
        /* Actions Grid */
        .ai-actions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 12px; }
        .ai-action-btn { background: rgba(255,255,255,0.06); border: 0.5px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px; text-align: center; cursor: pointer; transition: all 0.15s ease; color: rgba(255,255,255,0.7); font-size: 12px; }
        .ai-action-btn:hover { background: rgba(255,255,255,0.12); transform: translateY(-1px); }
        
        /* Switch */
        .ai-switch { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
        .ai-switch input { opacity: 0; width: 0; height: 0; }
        .ai-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.2); transition: .2s; border-radius: 22px; }
        .ai-slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 2px; bottom: 2px; background-color: white; transition: .2s; border-radius: 50%; }
        input:checked + .ai-slider { background: ${AICODE.cfg.themeColor}; }
        input:checked + .ai-slider:before { transform: translateX(18px); }
        
        /* Slider */
        .ai-range { width: 120px; height: 4px; -webkit-appearance: none; background: rgba(255,255,255,0.2); border-radius: 2px; outline: none; }
        .ai-range::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: white; cursor: pointer; }
        
        /* Button */
        .ai-button { background: ${AICODE.cfg.themeColor}; border: none; border-radius: 6px; padding: 6px 16px; color: white; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s ease; }
        .ai-button:hover { opacity: 0.85; transform: scale(0.98); }
        
        /* Dropdown */
        .ai-dropdown { background: rgba(0,0,0,0.3); border: 0.5px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 6px 28px 6px 12px; font-size: 12px; color: #fff; cursor: pointer; font-family: inherit; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; }
        
        .ai-footer { padding: 10px 24px; border-top: 0.5px solid rgba(255,255,255,0.06); font-size: 10px; color: rgba(255,255,255,0.3); text-align: center; }
        .ai-footer a { color: ${AICODE.cfg.themeColor}; text-decoration: none; }
      </style>
      
      <div class="ai-window-controls">
        <div class="ai-win-btn close" id="aiCloseBtn"></div>
        <div class="ai-win-btn minimize" id="aiMinimizeBtn"></div>
        <div class="ai-win-btn maximize" id="aiMaximizeBtn"></div>
      </div>
      
      <div class="ai-main-layout">
        <div class="ai-sidebar">
          <div class="ai-logo">
            <div class="ai-logo-icon">AC</div>
            <div><div class="ai-logo-text">AICODE</div><div class="ai-logo-version">v${AICODE.ver}</div></div>
          </div>
          <div class="ai-nav-item active" data-page="main"><span class="ai-nav-icon">${Icons.dashboard}</span><span>Dashboard</span></div>
          <div class="ai-nav-item" data-page="modules"><span class="ai-nav-icon">${Icons.modules}</span><span>Modules</span></div>
          <div class="ai-nav-item" data-page="settings"><span class="ai-nav-icon">${Icons.settings}</span><span>Settings</span></div>
        </div>
        
        <div class="ai-content">
          <div class="ai-content-header">
            <div class="ai-content-title" id="contentTitle">Modules Library</div>
            <div class="ai-content-subtitle" id="contentSubtitle">Manage your modules and components</div>
          </div>
          <div class="ai-search-bar"><input type="text" class="ai-search-input" id="searchInput" placeholder="Search modules..."></div>
          <div class="ai-subtabs" id="subtabContainer">
            <button class="ai-subtab active" data-subtab="subtab1"><span class="ai-nav-icon">${Icons.subtab1}</span><span>Subtab 1</span></button>
            <button class="ai-subtab" data-subtab="subtab2"><span class="ai-nav-icon">${Icons.subtab2}</span><span>Subtab 2</span></button>
          </div>
          <div class="ai-two-columns" id="twoColumnsContainer"></div>
          <div class="ai-footer"><span>AICODE v${AICODE.ver} // <a href="#" id="creditLink">iUnknownBr</a></span></div>
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    UI.panel = panel;
    UI.renderContent();
    UI.setupDragEvents();
    UI.setupEventListeners();
  }
  
  static renderContent() {
    const container = document.getElementById('twoColumnsContainer');
    const currentSubtab = document.querySelector('.ai-subtab.active')?.dataset.subtab || 'subtab1';
    
    const content = {
      subtab1: `
        <div class="ai-column">
          <div class="ai-module">
            <div class="ai-module-header"><div class="ai-module-title">Module One</div><div class="ai-module-desc">Lorem ipsum nibh quisque</div></div>
            <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label"><span>${Icons.toggle}</span> Toggle</div><div class="ai-item-desc">Enable/disable feature</div></div><label class="ai-switch"><input type="checkbox" id="toggleOne"><span class="ai-slider"></span></label></div>
            <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label"><span>${Icons.slider}</span> Slider</div><div class="ai-item-desc">Adjust value</div></div><input type="range" min="0" max="100" value="50" class="ai-range" id="sliderOne"></div>
            <div class="ai-item"><div class="ai-item-left"><div class="ai-item-label"><span>${Icons.button}</span> Button</div><div class="ai-item-desc">Execute action</div></div><button class="ai-button" id="buttonOne">Action</button></div>
          </div>
          <div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Actions</div></div><div class="ai-actions-grid"><div class="ai-action-btn" data-action="thing1">Thing 1</div><div class="ai-action-btn" data-action="thing2">Thing 2</div><div class="ai-action-btn" data-action="thing3">Thing 3</div><div class="ai-action-btn" data-action="thing4">Thing 4</div></div></div>
        </div>
        <div class="ai-column">
          <div class="ai-module">
            <div class="ai-module-header"><div class="ai-module-title">Module Two</div><div class="ai-module-desc">Lorem ipsum nibh quisque</div></div>
            <div class="ai-actions-grid"><div class="ai-action-btn" data-action="one">One</div><div class="ai-action-btn" data-action="two">Two</div><div class="ai-action-btn" data-action="three">Three</div><div class="ai-action-btn" data-action="four">Four</div></div>
          </div>
          <div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Additional</div></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Thing 3</div><div class="ai-item-desc">Extra setting</div></div><label class="ai-switch"><input type="checkbox" id="toggleTwo"><span class="ai-slider"></span></label></div></div>
        </div>
      `,
      subtab2: `
        <div class="ai-column">
          <div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Extended Module</div><div class="ai-module-desc">Additional features</div></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Option A</div></div><label class="ai-switch"><input type="checkbox" id="optionA"><span class="ai-slider"></span></label></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Option B</div></div><label class="ai-switch"><input type="checkbox" id="optionB"><span class="ai-slider"></span></label></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Speed</div></div><input type="range" min="0" max="100" value="75" class="ai-range" id="speedRange"></div></div>
        </div>
        <div class="ai-column">
          <div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Quick Actions</div></div><div class="ai-actions-grid"><div class="ai-action-btn" data-action="quick1">Quick 1</div><div class="ai-action-btn" data-action="quick2">Quick 2</div><div class="ai-action-btn" data-action="quick3">Quick 3</div><div class="ai-action-btn" data-action="quick4">Quick 4</div></div></div>
          <div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Settings</div></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Mode</div></div><select class="ai-dropdown" id="modeSelect"><option value="auto">Auto</option><option value="manual">Manual</option><option value="hybrid">Hybrid</option></select></div></div>
        </div>
      `
    };
    
    container.innerHTML = content[currentSubtab];
    UI.bindSubtabEvents();
  }
  
  static bindSubtabEvents() {
    // Toggle One
    const toggleOne = document.getElementById('toggleOne');
    if (toggleOne) toggleOne.onchange = (e) => sendToast(`Toggle: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500);
    
    // Toggle Two
    const toggleTwo = document.getElementById('toggleTwo');
    if (toggleTwo) toggleTwo.onchange = (e) => sendToast(`Thing 3: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500);
    
    // Slider One
    const sliderOne = document.getElementById('sliderOne');
    if (sliderOne) sliderOne.oninput = (e) => console.log(`Slider value: ${e.target.value}`);
    
    // Button One
    const buttonOne = document.getElementById('buttonOne');
    if (buttonOne) buttonOne.onclick = () => sendToast('Button clicked!', 1500);
    
    // Action buttons
    document.querySelectorAll('.ai-action-btn').forEach(btn => {
      btn.onclick = () => sendToast(`Action: ${btn.textContent} executed`, 1500);
    });
    
    // Subtab 2 elements
    const optionA = document.getElementById('optionA');
    if (optionA) optionA.onchange = (e) => sendToast(`Option A: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500);
    
    const optionB = document.getElementById('optionB');
    if (optionB) optionB.onchange = (e) => sendToast(`Option B: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500);
    
    const speedRange = document.getElementById('speedRange');
    if (speedRange) speedRange.oninput = (e) => console.log(`Speed: ${e.target.value}`);
    
    const modeSelect = document.getElementById('modeSelect');
    if (modeSelect) modeSelect.onchange = (e) => sendToast(`Mode changed to: ${e.target.value}`, 1500);
  }
  
  static setupDragEvents() {
    const panel = UI.panel;
    let isDragging = false, dragStart = { x: 0, y: 0 }, panelStart = { left: 0, top: 0 };
    panel.addEventListener('mousedown', (e) => {
      if (e.target.closest('.ai-win-btn')) return;
      if (e.target.closest('.ai-nav-item')) return;
      if (e.target.closest('.ai-subtab')) return;
      if (e.target.closest('input')) return;
      if (e.target.closest('button')) return;
      if (e.target.closest('.ai-action-btn')) return;
      if (e.target.closest('.ai-dropdown')) return;
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
    // Navigation
    const navItems = document.querySelectorAll('.ai-nav-item');
    const contentTitle = document.getElementById('contentTitle');
    const contentSubtitle = document.getElementById('contentSubtitle');
    
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        const page = item.dataset.page;
        if (page === 'main') {
          contentTitle.textContent = 'Modules Library';
          contentSubtitle.textContent = 'Manage your modules and components';
          document.querySelector('.ai-search-bar').style.display = '';
          document.querySelector('.ai-subtabs').style.display = '';
          document.getElementById('twoColumnsContainer').innerHTML = '';
          UI.renderContent();
        } else if (page === 'modules') {
          contentTitle.textContent = 'Module Manager';
          contentSubtitle.textContent = 'Configure module settings';
          document.querySelector('.ai-search-bar').style.display = 'none';
          document.querySelector('.ai-subtabs').style.display = 'none';
          document.getElementById('twoColumnsContainer').innerHTML = `<div class="ai-column"><div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Module Settings</div></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Auto Complete</div></div><label class="ai-switch"><input type="checkbox" id="autoCheck"><span class="ai-slider"></span></label></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Speed</div></div><input type="range" min="0" max="3" value="0" class="ai-range" id="speedSlider"></div></div></div><div class="ai-column"><div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Security</div></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Question Spoof</div></div><label class="ai-switch"><input type="checkbox" id="spoofCheck" checked><span class="ai-slider"></span></label></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Dark Mode</div></div><label class="ai-switch"><input type="checkbox" id="darkModeCheck" checked><span class="ai-slider"></span></label></div></div></div>`;
          const autoCheck = document.getElementById('autoCheck');
          if (autoCheck) autoCheck.onchange = (e) => { AICODE.cfg.auto = e.target.checked; sendToast(`Auto Complete: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500); };
          const speedSlider = document.getElementById('speedSlider');
          if (speedSlider) speedSlider.oninput = () => { const index = parseInt(speedSlider.value); AICODE.cfg.autoSpeed = AICODE.cfg.speedOptions[index]; sendToast(`Speed: ${AICODE.cfg.autoSpeed}ms`, 1000); };
          const spoofCheck = document.getElementById('spoofCheck');
          if (spoofCheck) spoofCheck.onchange = (e) => { AICODE.cfg.questionSpoof = e.target.checked; sendToast(`Question Spoof: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500); };
          const darkModeCheck = document.getElementById('darkModeCheck');
          if (darkModeCheck && typeof DarkReader !== 'undefined') darkModeCheck.onchange = (e) => { AICODE.cfg.darkMode = e.target.checked; e.target.checked ? DarkReader.enable() : DarkReader.disable(); sendToast(`Dark Mode: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500); };
        } else if (page === 'settings') {
          contentTitle.textContent = 'Settings';
          contentSubtitle.textContent = 'Application preferences';
          document.querySelector('.ai-search-bar').style.display = 'none';
          document.querySelector('.ai-subtabs').style.display = 'none';
          document.getElementById('twoColumnsContainer').innerHTML = `<div class="ai-column"><div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Appearance</div></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Menu Opacity</div></div><input type="range" min="0.7" max="1" step="0.01" value="${AICODE.cfg.menuOpacity}" class="ai-range" id="opacitySlider" style="width: 120px;"></div></div></div><div class="ai-column"><div class="ai-module"><div class="ai-module-header"><div class="ai-module-title">Notifications</div></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Enable Notifications</div></div><label class="ai-switch"><input type="checkbox" id="notificationsCheck" ${AICODE.cfg.notificationsEnabled ? 'checked' : ''}><span class="ai-slider"></span></label></div><div class="ai-item"><div class="ai-item-left"><div class="ai-item-label">Sound Effects</div></div><label class="ai-switch"><input type="checkbox" id="soundCheck" ${AICODE.cfg.soundEffects ? 'checked' : ''}><span class="ai-slider"></span></label></div></div></div>`;
          const opacitySlider = document.getElementById('opacitySlider');
          if (opacitySlider) opacitySlider.oninput = () => { const val = parseFloat(opacitySlider.value); AICODE.cfg.menuOpacity = val; UI.panel.style.background = `rgba(28, 28, 32, ${val})`; };
          const notificationsCheck = document.getElementById('notificationsCheck');
          if (notificationsCheck) notificationsCheck.onchange = (e) => { AICODE.cfg.notificationsEnabled = e.target.checked; sendToast(`Notifications: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500); };
          const soundCheck = document.getElementById('soundCheck');
          if (soundCheck) soundCheck.onchange = (e) => { AICODE.cfg.soundEffects = e.target.checked; sendToast(`Sound Effects: ${e.target.checked ? 'Enabled' : 'Disabled'}`, 1500); };
        }
      });
    });
    
    // Subtabs
    const subtabs = document.querySelectorAll('.ai-subtab');
    subtabs.forEach(subtab => {
      subtab.addEventListener('click', () => {
        subtabs.forEach(s => s.classList.remove('active'));
        subtab.classList.add('active');
        UI.renderContent();
      });
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const modules = document.querySelectorAll('.ai-module');
        modules.forEach(module => {
          const title = module.querySelector('.ai-module-title')?.textContent.toLowerCase() || '';
          const visible = title.includes(query);
          module.style.display = visible ? 'block' : 'none';
        });
      });
    }
    
    // Window controls
    const closeBtn = document.getElementById('aiCloseBtn');
    const minimizeBtn = document.getElementById('aiMinimizeBtn');
    const maximizeBtn = document.getElementById('aiMaximizeBtn');
    let isMinimized = false;
    
    closeBtn.addEventListener('click', () => { UI.panel.style.display = 'none'; AICODE.cfg.menuVisible = false; });
    minimizeBtn.addEventListener('click', () => {
      const columns = document.getElementById('twoColumnsContainer');
      const search = document.querySelector('.ai-search-bar');
      const subtabs = document.querySelector('.ai-subtabs');
      const footer = document.querySelector('.ai-footer');
      if (!isMinimized) { UI.panel.style.height = 'auto'; columns.style.display = 'none'; search.style.display = 'none'; subtabs.style.display = 'none'; footer.style.display = 'none'; isMinimized = true; }
      else { UI.panel.style.height = '620px'; columns.style.display = ''; search.style.display = ''; subtabs.style.display = ''; footer.style.display = ''; isMinimized = false; }
    });
    maximizeBtn.addEventListener('click', () => {
      if (UI.panel.style.width === '100%') { UI.panel.style.width = '900px'; UI.panel.style.height = '620px'; UI.panel.style.left = `${AICODE.cfg.menuPosition.x}px`; UI.panel.style.top = `${AICODE.cfg.menuPosition.y}px`; UI.panel.style.borderRadius = '12px'; }
      else { UI.panel.style.left = '0'; UI.panel.style.top = '0'; UI.panel.style.width = '100%'; UI.panel.style.height = '100%'; UI.panel.style.borderRadius = '0'; }
    });
    
    // Global keybind
    window.addEventListener('keydown', (e) => { if (e.code === AICODE.cfg.menuKeybind) { if (UI.panel.style.display === 'none') { UI.panel.style.display = 'flex'; AICODE.cfg.menuVisible = true; } else if (!isMinimized) { UI.panel.style.display = 'none'; AICODE.cfg.menuVisible = false; } } });
    
    document.getElementById('creditLink').onclick = (e) => { e.preventDefault(); window.open('https://guns.lol/iunknownbr', '_blank'); };
    
    if (AICODE.cfg.darkMode && typeof DarkReader !== 'undefined') DarkReader.enable();
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
    const messages = ["AICODE ACTIVE // SECURE BYPASS", "SYSTEM PROTECTED // UNAUTHORIZED"];
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
      const response = await originalFetch.apply(this, args);
      const clone = response.clone();
      try {
        const text = await clone.text();
        let data = JSON.parse(text);
        if (data?.data?.assessmentItem?.item?.itemData && AICODE.cfg.questionSpoof) {
          let itemData = JSON.parse(data.data.assessmentItem.item.itemData);
          if (itemData.question.content[0] === itemData.question.content[0].toUpperCase()) {
            itemData.answerArea = { calculator: false };
            itemData.question.content = messages[Math.floor(Math.random() * messages.length)] + "[[radio 1]]";
            itemData.question.widgets = { "radio 1": { type: "radio", alignment: "default", static: false, graded: true, options: { choices: [{ content: "✓", correct: true }], randomize: false, multipleSelect: false } } };
            data.data.assessmentItem.item.itemData = JSON.stringify(itemData);
            sendToast("Question bypassed", 1000);
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
      if (element) { element.click(); if (element.textContent === "Mostrar resumo") sendToast("Exercise completed", 3000); }
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
