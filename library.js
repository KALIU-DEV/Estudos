// ============================================
// AICODE v2.0 - Menu Flutuante
// ============================================

const APP = {
  name: "AICODE",
  ver: "2.0",
  cfg: {
    auto: false,
    questionSpoof: true,
    darkMode: true,
    autoSpeed: 750,
    speedOptions: [750, 1000, 1250, 1500]
  }
};

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

function sendToast(message, duration = 3000) {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration: duration,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: { 
        background: "#0a0a0a",
        borderRadius: "8px",
        fontFamily: "'Courier New', monospace",
        fontSize: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
      }
    }).showToast();
  }
}

// ============================================
// CLASSE UI - MENU FLUTUANTE
// ============================================

class UI {
  static init() {
    const panel = document.createElement("div");
    panel.id = "aicode-panel";

    Object.assign(panel.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "620px",
      height: "400px",
      background: "#0a0a0a",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "row",
      zIndex: "2147483647",
      boxShadow: "0 0 0 1px #232323, 0 15px 50px rgba(0,0,0,0.8)",
      fontFamily: "'Courier New', 'Source Code Pro', monospace",
      overflow: "hidden",
      resize: "both",
      minWidth: "400px",
      minHeight: "300px",
      maxWidth: "800px",
      maxHeight: "600px"
    });

    // ============================================
    // PAINEL ESQUERDO
    // ============================================
    const leftPanel = document.createElement("div");
    Object.assign(leftPanel.style, {
      width: "85px",
      minWidth: "85px",
      height: "100%",
      background: "#0f0f0f",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #232323",
      borderRadius: "10px 0 0 10px"
    });

    // Bolinhas + Drag
    const ballsArea = document.createElement("div");
    Object.assign(ballsArea.style, {
      width: "100%",
      height: "35px",
      minHeight: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      borderBottom: "1px solid rgba(35,35,35,0.5)",
      cursor: "move"
    });

    ["#ff4f4f", "#e3e85f", "#60b541"].forEach((color, i) => {
      const ball = document.createElement("div");
      Object.assign(ball.style, {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: color,
        opacity: "0",
        transition: "opacity 0.5s ease"
      });
      ballsArea.appendChild(ball);
      setTimeout(() => { ball.style.opacity = "1"; }, 400 * i);
    });
    leftPanel.appendChild(ballsArea);

    // Tabs
    const tabsContainer = document.createElement("div");
    Object.assign(tabsContainer.style, {
      flex: "1",
      overflowY: "auto",
      padding: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    });
    tabsContainer.style.cssText += "; scrollbar-width: thin; scrollbar-color: #1a1a1a transparent;";
    leftPanel.appendChild(tabsContainer);

    // Avatar
    const userArea = document.createElement("div");
    Object.assign(userArea.style, {
      height: "45px",
      minHeight: "45px",
      borderTop: "1px solid rgba(35,35,35,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    });
    const avatar = document.createElement("div");
    Object.assign(avatar.style, {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "#1a1a1a",
      border: "1px solid #232323",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#787878",
      fontSize: "12px"
    });
    avatar.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    userArea.appendChild(avatar);
    leftPanel.appendChild(userArea);

    panel.appendChild(leftPanel);

    // ============================================
    // PAINEL DIREITO
    // ============================================
    const rightPanel = document.createElement("div");
    Object.assign(rightPanel.style, {
      flex: "1",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "transparent"
    });

    // Barra superior
    const topBar = document.createElement("div");
    Object.assign(topBar.style, {
      width: "100%",
      height: "35px",
      minHeight: "35px",
      background: "#0f0f0f",
      borderBottom: "1px solid rgba(35,35,35,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 10px",
      borderRadius: "0 10px 0 0"
    });

    const subTabsContainer = document.createElement("div");
    Object.assign(subTabsContainer.style, {
      display: "flex",
      alignItems: "center",
      gap: "2px",
      height: "100%"
    });
    topBar.appendChild(subTabsContainer);

    const titleLabel = document.createElement("div");
    Object.assign(titleLabel.style, {
      color: "#f0f0f0",
      fontSize: "13px",
      fontWeight: "bold",
      letterSpacing: "0.5px"
    });
    titleLabel.textContent = APP.name + " v" + APP.ver;
    topBar.appendChild(titleLabel);

    rightPanel.appendChild(topBar);

    // Área de conteúdo
    const contentArea = document.createElement("div");
    Object.assign(contentArea.style, {
      flex: "1",
      padding: "10px",
      overflow: "hidden",
      position: "relative"
    });
    rightPanel.appendChild(contentArea);

    const tabContentContainer = document.createElement("div");
    Object.assign(tabContentContainer.style, {
      position: "absolute",
      top: "10px",
      left: "10px",
      right: "10px",
      bottom: "10px"
    });
    contentArea.appendChild(tabContentContainer);

    panel.appendChild(rightPanel);
    document.body.appendChild(panel);

    // ============================================
    // DRAG DA JANELA
    // ============================================
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    ballsArea.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = panel.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      panel.style.transition = "none";
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      let newLeft = e.clientX - dragOffsetX;
      let newTop = e.clientY - dragOffsetY;
      const maxX = window.innerWidth - panel.offsetWidth;
      const maxY = window.innerHeight - panel.offsetHeight;
      newLeft = Math.max(0, Math.min(newLeft, maxX));
      newTop = Math.max(0, Math.min(newTop, maxY));
      panel.style.left = newLeft + "px";
      panel.style.top = newTop + "px";
      panel.style.transform = "none";
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        panel.style.transition = "";
      }
    });

    // ============================================
    // SISTEMA DE TABS
    // ============================================
    const tabs = [];
    let activeTab = null;
    let activeSubTab = null;

    const icons = {
      home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
      user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      code: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      star: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>',
      chevronDown: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
    };

    function addTab(iconName) {
      const tabData = {
        button: null,
        content: null,
        subTabsContainer: null,
        subTabs: []
      };

      const tabBtn = document.createElement("div");
      Object.assign(tabBtn.style, {
        width: "50px",
        height: "40px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid transparent",
        background: "transparent",
        color: "#b4b4b4",
        opacity: "0.6"
      });
      tabBtn.innerHTML = icons[iconName] || icons.home;
      
      const tabContent = document.createElement("div");
      Object.assign(tabContent.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "none"
      });

      const subTabsWrap = document.createElement("div");
      Object.assign(subTabsWrap.style, {
        display: "none",
        alignItems: "center",
        height: "100%",
        gap: "0"
      });

      tabData.button = tabBtn;
      tabData.content = tabContent;
      tabData.subTabsContainer = subTabsWrap;

      tabBtn.addEventListener("click", () => {
        if (activeTab === tabData) return;
        
        if (activeTab) {
          activeTab.button.style.background = "transparent";
          activeTab.button.style.border = "1px solid transparent";
          activeTab.button.style.width = "50px";
          activeTab.button.style.height = "40px";
          activeTab.button.style.opacity = "0.6";
          activeTab.button.style.color = "#b4b4b4";
          activeTab.content.style.display = "none";
          activeTab.subTabsContainer.style.display = "none";
        }

        tabData.button.style.background = "rgba(124,77,255,0.08)";
        tabData.button.style.border = "1px solid #232323";
        tabData.button.style.width = "55px";
        tabData.button.style.height = "45px";
        tabData.button.style.opacity = "1";
        tabData.button.style.color = "#f0f0f0";
        tabData.content.style.display = "block";
        tabData.subTabsContainer.style.display = "flex";

        activeTab = tabData;

        if (tabData.subTabs.length > 0) {
          activateSubTab(tabData.subTabs[0]);
        }
      });

      tabsContainer.appendChild(tabBtn);
      tabContentContainer.appendChild(tabContent);
      subTabsContainer.appendChild(subTabsWrap);
      
      tabs.push(tabData);

      if (tabs.length === 1) {
        tabBtn.click();
      }

      return {
        addSubTab: (name) => addSubTab(tabData, name)
      };
    }

    function addSubTab(parentTab, name) {
      const subData = {
        button: null,
        content: null,
        leftColumn: null,
        rightColumn: null
      };

      const subBtn = document.createElement("div");
      subBtn.textContent = name;
      Object.assign(subBtn.style, {
        padding: "4px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "12px",
        color: "#b4b4b4",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
        background: "transparent",
        height: "27px",
        display: "flex",
        alignItems: "center"
      });

      const subContent = document.createElement("div");
      Object.assign(subContent.style, {
        display: "none",
        width: "100%",
        height: "100%"
      });

      const scrollContainer = document.createElement("div");
      Object.assign(scrollContainer.style, {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        padding: "2px",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: "10px"
      });
      scrollContainer.style.cssText += "; scrollbar-width: thin; scrollbar-color: #1a1a1a transparent;";

      const leftCol = document.createElement("div");
      Object.assign(leftCol.style, {
        width: "calc(50% - 5px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "220px"
      });

      const rightCol = document.createElement("div");
      Object.assign(rightCol.style, {
        width: "calc(50% - 5px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "220px"
      });

      scrollContainer.appendChild(leftCol);
      scrollContainer.appendChild(rightCol);
      subContent.appendChild(scrollContainer);

      subData.button = subBtn;
      subData.content = subContent;
      subData.leftColumn = leftCol;
      subData.rightColumn = rightCol;

      subBtn.addEventListener("click", () => activateSubTab(subData));

      parentTab.subTabsContainer.appendChild(subBtn);
      parentTab.content.appendChild(subContent);
      parentTab.subTabs.push(subData);

      if (parentTab.subTabs.length === 1) {
        activateSubTab(subData);
      }

      return {
        addSection: (header, side) => addSection(subData, header, side)
      };
    }

    function activateSubTab(subData) {
      if (activeSubTab === subData) return;

      if (activeSubTab) {
        activeSubTab.button.style.color = "#b4b4b4";
        activeSubTab.button.style.background = "transparent";
        activeSubTab.content.style.display = "none";
      }

      subData.button.style.color = "#f0f0f0";
      subData.button.style.background = "rgba(124,77,255,0.1)";
      subData.content.style.display = "block";

      activeSubTab = subData;
    }

    function addSection(subData, header, side) {
      const column = side === "right" ? subData.rightColumn : subData.leftColumn;

      const wrapper = document.createElement("div");
      Object.assign(wrapper.style, {
        width: "100%",
        display: "flex",
        flexDirection: "column"
      });

      if (header) {
        const headerEl = document.createElement("div");
        headerEl.textContent = header;
        Object.assign(headerEl.style, {
          fontSize: "10px",
          color: "#787878",
          padding: "0 4px 6px 4px",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontWeight: "bold"
        });
        wrapper.appendChild(headerEl);
      }

      const card = document.createElement("div");
      Object.assign(card.style, {
        width: "100%",
        background: "rgba(15,15,15,0.7)",
        borderRadius: "7px",
        border: "1px solid #232323",
        padding: "8px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      });
      wrapper.appendChild(card);
      column.appendChild(wrapper);

      return {
        addButton: (name, callback) => {
          const btn = document.createElement("div");
          Object.assign(btn.style, {
            width: "100%",
            height: "30px",
            background: "rgba(18,18,18,0.7)",
            borderRadius: "7px",
            border: "1px solid rgba(35,35,35,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontSize: "12px",
            color: "#c8c8c8"
          });
          btn.textContent = name;
          btn.addEventListener("mouseenter", () => {
            btn.style.background = "#2d2d37";
            btn.style.color = "#f0f0f0";
          });
          btn.addEventListener("mouseleave", () => {
            btn.style.background = "rgba(18,18,18,0.7)";
            btn.style.color = "#c8c8c8";
          });
          btn.addEventListener("click", () => { if (callback) callback(); });
          card.appendChild(btn);
        },

        addToggle: (name, defaultVal, callback) => {
          let toggled = defaultVal || false;
          
          const frame = document.createElement("div");
          Object.assign(frame.style, {
            width: "100%",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "0 5px"
          });

          const label = document.createElement("span");
          label.textContent = name;
          Object.assign(label.style, {
            fontSize: "12px",
            color: "#c8c8c8"
          });
          frame.appendChild(label);

          const switchContainer = document.createElement("div");
          Object.assign(switchContainer.style, {
            width: "38px",
            height: "17px",
            background: "rgba(18,18,18,0.7)",
            borderRadius: "7px",
            border: "1px solid rgba(35,35,35,0.4)",
            position: "relative",
            transition: "all 0.3s ease"
          });

          const switchThumb = document.createElement("div");
          Object.assign(switchThumb.style, {
            width: "12px",
            height: "12px",
            background: "#787878",
            borderRadius: "4px",
            position: "absolute",
            left: "2px",
            top: "50%",
            transform: "translateY(-50%)",
            transition: "all 0.3s ease"
          });
          switchContainer.appendChild(switchThumb);

          function updateToggle() {
            if (toggled) {
              switchContainer.style.background = "linear-gradient(135deg, #6200ea, #7c4dff)";
              switchContainer.style.borderColor = "#7c4dff";
              switchThumb.style.background = "#f0f0f0";
              switchThumb.style.left = "22px";
            } else {
              switchContainer.style.background = "rgba(18,18,18,0.7)";
              switchContainer.style.borderColor = "rgba(35,35,35,0.4)";
              switchThumb.style.background = "#787878";
              switchThumb.style.left = "2px";
            }
          }
          updateToggle();

          frame.addEventListener("click", () => {
            toggled = !toggled;
            updateToggle();
            if (callback) callback(toggled);
            sendToast(name + ": " + (toggled ? "ON" : "OFF"), 1500);
          });

          frame.appendChild(switchContainer);
          card.appendChild(frame);
        },

        addCheckbox: (name, defaultVal, callback) => {
          let checked = defaultVal || false;
          
          const frame = document.createElement("div");
          Object.assign(frame.style, {
            width: "100%",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            padding: "0 5px"
          });

          const label = document.createElement("span");
          label.textContent = name;
          Object.assign(label.style, {
            fontSize: "12px",
            color: "#c8c8c8"
          });
          frame.appendChild(label);

          const box = document.createElement("div");
          Object.assign(box.style, {
            width: "20px",
            height: "20px",
            background: "rgba(18,18,18,0.7)",
            borderRadius: "5px",
            border: "1px solid rgba(35,35,35,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease"
          });

          const checkIcon = document.createElement("div");
          checkIcon.innerHTML = icons.check;
          Object.assign(checkIcon.style, {
            width: "12px",
            height: "12px",
            opacity: "0",
            transition: "opacity 0.3s ease",
            color: "#c8c8c8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          });
          box.appendChild(checkIcon);

          function updateCheckbox() {
            if (checked) {
              box.style.borderColor = "#7c4dff";
              box.style.background = "rgba(124,77,255,0.15)";
              checkIcon.style.opacity = "0.8";
            } else {
              box.style.borderColor = "rgba(35,35,35,0.4)";
              box.style.background = "rgba(18,18,18,0.7)";
              checkIcon.style.opacity = "0";
            }
          }
          updateCheckbox();

          frame.addEventListener("click", () => {
            checked = !checked;
            updateCheckbox();
            if (callback) callback(checked);
          });

          frame.appendChild(box);
          card.appendChild(frame);
        },

        addSlider: (name, defaultVal, min, max, callback) => {
          let value = defaultVal || 50;
          const mn = min || 0;
          const mx = max || 100;
          
          const frame = document.createElement("div");
          Object.assign(frame.style, {
            width: "100%",
            height: "30px",
            display: "flex",
            alignItems: "center",
            padding: "0 5px",
            gap: "8px"
          });

          const label = document.createElement("span");
          label.textContent = name;
          Object.assign(label.style, {
            fontSize: "12px",
            color: "#c8c8c8",
            whiteSpace: "nowrap",
            minWidth: "60px"
          });
          frame.appendChild(label);

          const trackContainer = document.createElement("div");
          Object.assign(trackContainer.style, {
            flex: "1",
            height: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            position: "relative"
          });

          const trackBg = document.createElement("div");
          Object.assign(trackBg.style, {
            width: "100%",
            height: "2px",
            background: "rgba(200,200,200,0.4)",
            borderRadius: "2px",
            position: "relative"
          });

          const fill = document.createElement("div");
          Object.assign(fill.style, {
            width: "50%",
            height: "100%",
            background: "#c8c8c8",
            borderRadius: "2px",
            transition: "width 0.05s ease"
          });
          trackBg.appendChild(fill);

          const thumb = document.createElement("div");
          Object.assign(thumb.style, {
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#b4b4b4",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "left 0.05s ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.5)"
          });
          trackBg.appendChild(thumb);
          trackContainer.appendChild(trackBg);

          const valueDisplay = document.createElement("span");
          Object.assign(valueDisplay.style, {
            fontSize: "11px",
            color: "#c8c8c8",
            minWidth: "40px",
            textAlign: "right"
          });
          valueDisplay.textContent = value;
          frame.appendChild(valueDisplay);

          function updatePosition(v) {
            const pct = ((v - mn) / (mx - mn)) * 100;
            fill.style.width = pct + "%";
            thumb.style.left = pct + "%";
            valueDisplay.textContent = Math.round(v);
          }
          updatePosition(value);

          function getValueFromEvent(e) {
            const rect = trackBg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
            return Math.round(mn + (pct / 100) * (mx - mn));
          }

          let dragging = false;

          trackContainer.addEventListener("mousedown", (e) => {
            dragging = true;
            value = getValueFromEvent(e);
            updatePosition(value);
            if (callback) callback(value);
            e.preventDefault();
          });

          document.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            value = getValueFromEvent(e);
            updatePosition(value);
            if (callback) callback(value);
          });

          document.addEventListener("mouseup", () => {
            dragging = false;
          });

          frame.appendChild(trackContainer);
          card.appendChild(frame);
        },

        addDropdown: (name, values, defaultVal, callback) => {
          const vals = values || [];
          let selected = defaultVal || vals[0] || "";
          
          const frame = document.createElement("div");
          Object.assign(frame.style, {
            width: "100%",
            minHeight: "30px",
            background: "rgba(18,18,18,0.7)",
            borderRadius: "8px",
            border: "1px solid #232323",
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s ease",
            overflow: "hidden"
          });

          const header = document.createElement("div");
          Object.assign(header.style, {
            width: "100%",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8px"
          });

          const headerLabel = document.createElement("span");
          headerLabel.textContent = name + ": " + selected;
          Object.assign(headerLabel.style, {
            fontSize: "12px",
            color: "#c8c8c8",
            flex: "1",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          });
          header.appendChild(headerLabel);

          const chevron = document.createElement("div");
          chevron.innerHTML = icons.chevronDown;
          Object.assign(chevron.style, {
            width: "13px",
            height: "13px",
            color: "#c8c8c8",
            opacity: "0.6",
            transition: "transform 0.3s ease",
            transform: "rotate(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          });
          header.appendChild(chevron);

          const optionsContainer = document.createElement("div");
          Object.assign(optionsContainer.style, {
            width: "100%",
            maxHeight: "0",
            overflow: "hidden",
            borderTop: "1px solid transparent",
            padding: "0 8px",
            transition: "all 0.3s ease"
          });

          let isOpen = false;

          function buildOptions() {
            optionsContainer.innerHTML = "";
            vals.forEach((val) => {
              const opt = document.createElement("div");
              opt.textContent = val;
              Object.assign(opt.style, {
                width: "100%",
                height: "30px",
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                fontSize: "12px",
                color: val === selected ? "#f0f0f0" : "#c8c8c8",
                cursor: "pointer",
                borderRadius: "8px",
                background: val === selected ? "rgba(124,77,255,0.08)" : "transparent",
                transition: "all 0.15s ease",
                marginBottom: "2px"
              });

              opt.addEventListener("mouseenter", () => {
                if (val !== selected) opt.style.background = "#2d2d37";
              });
              opt.addEventListener("mouseleave", () => {
                if (val !== selected) opt.style.background = "transparent";
              });
              opt.addEventListener("click", (e) => {
                e.stopPropagation();
                selected = val;
                headerLabel.textContent = name + ": " + val;
                buildOptions();
                closeDropdown();
                if (callback) callback(val);
                sendToast(name + ": " + val, 1500);
              });

              optionsContainer.appendChild(opt);
            });
          }

          function openDropdown() {
            isOpen = true;
            optionsContainer.style.maxHeight = (vals.length * 32 + 16) + "px";
            optionsContainer.style.borderTop = "1px solid #232323";
            optionsContainer.style.padding = "8px";
            chevron.style.transform = "rotate(0deg)";
            frame.style.borderColor = "#7c4dff";
          }

          function closeDropdown() {
            isOpen = false;
            optionsContainer.style.maxHeight = "0";
            optionsContainer.style.borderTop = "1px solid transparent";
            optionsContainer.style.padding = "0 8px";
            chevron.style.transform = "rotate(180deg)";
            frame.style.borderColor = "#232323";
          }

          buildOptions();

          header.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isOpen) closeDropdown();
            else openDropdown();
          });

          document.addEventListener("click", () => {
            if (isOpen) closeDropdown();
          });

          frame.appendChild(header);
          frame.appendChild(optionsContainer);
          card.appendChild(frame);
        }
      };
    }

    // ============================================
    // DEMO - CRIAR TABS E ELEMENTOS
    // ============================================
    
    // Tab Home
    const homeTab = addTab("home");
    
    // SubTab General
    const generalSubTab = homeTab.addSubTab("General");
    
    // Seção Controls (Left)
    const controlsSection = generalSubTab.addSection("Controls", "left");
    controlsSection.addButton("Click Me!", () => sendToast("Button clicked!", 2000));
    controlsSection.addButton("Show Message", () => sendToast("Hello from AICODE!", 2000));
    controlsSection.addToggle("Enable Feature", false, (v) => console.log("Toggle:", v));
    controlsSection.addCheckbox("Auto Save", true, (v) => console.log("Checkbox:", v));
    
    // Seção Values (Right)
    const valuesSection = generalSubTab.addSection("Values", "right");
    valuesSection.addSlider("Volume", 75, 0, 100, (v) => console.log("Volume:", v));
    valuesSection.addSlider("Speed", 50, 0, 100, (v) => console.log("Speed:", v));
    valuesSection.addDropdown("Mode", ["Easy", "Normal", "Hard", "Expert"], "Normal", (v) => console.log("Mode:", v));
    
    // SubTab Settings
    const settingsSubTab = homeTab.addSubTab("Settings");
    
    const advancedSection = settingsSubTab.addSection("Advanced", "left");
    advancedSection.addToggle("Mod Mode", APP.cfg.questionSpoof, (v) => {
      APP.cfg.questionSpoof = v;
      sendToast("Mod Mode: " + (v ? "ON" : "OFF"), 2000);
    });
    advancedSection.addToggle("Dark Mode", APP.cfg.darkMode, (v) => {
      APP.cfg.darkMode = v;
      sendToast("Dark Mode: " + (v ? "ON" : "OFF"), 2000);
    });
    advancedSection.addCheckbox("Debug", false, (v) => console.log("Debug:", v));
    
    const speedSection = settingsSubTab.addSection("Speed", "right");
    speedSection.addSlider("Auto Speed", APP.cfg.autoSpeed, 750, 1500, (v) => {
      APP.cfg.autoSpeed = v;
      sendToast("Speed: " + v + "ms", 1500);
    });
    speedSection.addToggle("Auto Complete", APP.cfg.auto, (v) => {
      APP.cfg.auto = v;
      sendToast("Auto Complete: " + (v ? "ON" : "OFF"), 2000);
    });
    speedSection.addDropdown("Preset", ["Slow", "Normal", "Fast", "Ultra"], "Normal", (v) => {
      const speeds = { "Slow": 1500, "Normal": 1000, "Fast": 750, "Ultra": 500 };
      APP.cfg.autoSpeed = speeds[v] || 1000;
      sendToast("Preset: " + v + " (" + APP.cfg.autoSpeed + "ms)", 2000);
    });
    
    // Tab Settings
    const settingsTab = addTab("settings");
    const configSubTab = settingsTab.addSubTab("Config");
    
    const aboutSection = configSubTab.addSection("About", "left");
    aboutSection.addButton("Version Info", () => sendToast(APP.name + " v" + APP.ver, 3000));
    aboutSection.addButton("Credits", () => sendToast("Made with ❤️", 3000));
    
    // Tab User
    const userTab = addTab("user");
    const profileSubTab = userTab.addSubTab("Profile");
    
    const infoSection = profileSubTab.addSection("Info", "left");
    infoSection.addButton("Login", () => sendToast("Login feature coming soon!", 2000));
    infoSection.addCheckbox("Remember Me", false, (v) => console.log("Remember:", v));

    console.log("[AICODE v" + APP.ver + "] Menu iniciado com sucesso!");
    sendToast(APP.name + " v" + APP.ver + " pronto!", 2500);
  }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

function initApp() {
  try {
    if (typeof Toastify === 'undefined') {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/toastify-js";
      script.onload = () => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css";
        document.head.appendChild(link);
        UI.init();
      };
      document.head.appendChild(script);
    } else {
      UI.init();
    }
  } catch (error) {
    console.error("Erro ao iniciar:", error);
  }
}

initApp();
