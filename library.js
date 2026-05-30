// ============================================
// AICODE v2.0 - Menu Flutuante Centralizado
// Estilo inspirado no tema Darker da Lib Lua
// ============================================

const APP = {
  name: "AICODE",
  ver: "2.0",
  cfg: {
    mod: true,
    auto: false,
    questionSpoof: true,
    darkMode: true,
    autoSpeed: 750,
    speedOptions: [750, 1000, 1250, 1500]
  }
};

function sendToast(message, duration = 3000, position = "bottom") {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration,
      gravity: position,
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

class UI {
  static init() {
    // ============================================
    // CONTAINER PRINCIPAL - SCREEN GUI
    // ============================================
    const screenGui = document.createElement("div");
    screenGui.id = "aicode-screengui";
    Object.assign(screenGui.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "2147483647",
      pointerEvents: "none",
      fontFamily: "'Courier New', 'Source Code Pro', monospace",
      userSelect: "none"
    });
    document.body.appendChild(screenGui);

    // ============================================
    // JANELA PRINCIPAL (Window)
    // ============================================
    const windowFrame = document.createElement("div");
    windowFrame.id = "aicode-window";
    Object.assign(windowFrame.style, {
      position: "absolute",
      width: "580px",
      height: "380px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      borderRadius: "10px",
      pointerEvents: "auto",
      display: "flex",
      flexDirection: "row",
      overflow: "hidden"
    });
    screenGui.appendChild(windowFrame);

    // Container interno com background
    const containerFuns = document.createElement("div");
    Object.assign(containerFuns.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "#0a0a0a",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      boxShadow: "0 0 0 1px #232323, 0 10px 40px rgba(0,0,0,0.8)"
    });
    windowFrame.appendChild(containerFuns);

    // ============================================
    // PAINEL ESQUERDO (Left Frame)
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
      borderRadius: "10px 0 0 10px",
      overflow: "hidden"
    });
    containerFuns.appendChild(leftPanel);

    // Área das bolinhas (Apple Balls style) + Drag handle
    const leftBallsArea = document.createElement("div");
    Object.assign(leftBallsArea.style, {
      width: "100%",
      height: "35px",
      minHeight: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      borderBottom: "1px solid #1a1a1a",
      cursor: "move",
      position: "relative"
    });
    leftPanel.appendChild(leftBallsArea);

    // Bolinhas estilo Apple (Red, Yellow, Green)
    const balls = [
      { color: "#ff4f4f", delay: 0 },
      { color: "#e3e85f", delay: 0.4 },
      { color: "#60b541", delay: 0.8 }
    ];

    balls.forEach((ball, index) => {
      const ballEl = document.createElement("div");
      Object.assign(ballEl.style, {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: ball.color,
        opacity: "0",
        transition: "opacity 0.5s ease"
      });
      leftBallsArea.appendChild(ballEl);

      setTimeout(() => {
        ballEl.style.opacity = "1";
      }, ball.delay * 1000);
    });

    // Área das Tabs
    const leftTabsArea = document.createElement("div");
    Object.assign(leftTabsArea.style, {
      width: "100%",
      flex: "1",
      overflowY: "auto",
      overflowX: "hidden",
      padding: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      scrollbarWidth: "none"
    });
    leftPanel.appendChild(leftTabsArea);

    // Área do usuário (inferior)
    const leftUserArea = document.createElement("div");
    Object.assign(leftUserArea.style, {
      width: "100%",
      height: "45px",
      minHeight: "45px",
      borderTop: "1px solid #1a1a1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    });
    leftPanel.appendChild(leftUserArea);

    // Avatar placeholder
    const avatarFrame = document.createElement("div");
    Object.assign(avatarFrame.style, {
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "#1a1a1a",
      border: "1px solid #232323",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    });
    leftUserArea.appendChild(avatarFrame);

    const avatarImg = document.createElement("div");
    Object.assign(avatarImg.style, {
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, #1a1a1a, #2d2d37)",
      borderRadius: "50%"
    });
    avatarFrame.appendChild(avatarImg);

    // ============================================
    // PAINEL DIREITO (Right Frame)
    // ============================================
    const rightPanel = document.createElement("div");
    Object.assign(rightPanel.style, {
      flex: "1",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "transparent",
      overflow: "hidden"
    });
    containerFuns.appendChild(rightPanel);

    // Barra superior direita (Right Tabs Frame)
    const rightTabsFrame = document.createElement("div");
    Object.assign(rightTabsFrame.style, {
      width: "100%",
      height: "35px",
      minHeight: "35px",
      background: "#0f0f0f",
      borderBottom: "1px solid #1a1a1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 8px",
      borderRadius: "0 10px 0 0",
      position: "relative"
    });
    rightPanel.appendChild(rightTabsFrame);

    // Título
    const titleLabel = document.createElement("div");
    Object.assign(titleLabel.style, {
      color: "#f0f0f0",
      fontSize: "13px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      marginLeft: "auto",
      padding: "4px 8px",
      whiteSpace: "nowrap"
    });
    titleLabel.textContent = APP.name;
    rightTabsFrame.appendChild(titleLabel);

    // Container dos botões de sub-tabs
    const subTabsContainer = document.createElement("div");
    Object.assign(subTabsContainer.style, {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      height: "100%",
      position: "absolute",
      left: "8px",
      top: "0"
    });
    rightTabsFrame.appendChild(subTabsContainer);

    // Linha indicadora de sub-tab ativa
    const activeLine = document.createElement("div");
    Object.assign(activeLine.style, {
      position: "absolute",
      bottom: "0",
      height: "2px",
      background: "#7c4dff",
      borderRadius: "2px",
      transition: "all 0.3s ease",
      opacity: "0"
    });
    rightTabsFrame.appendChild(activeLine);

    // Container de conteúdo direito
    const rightContent = document.createElement("div");
    Object.assign(rightContent.style, {
      flex: "1",
      padding: "7px",
      overflow: "hidden",
      position: "relative"
    });
    rightPanel.appendChild(rightContent);

    // ============================================
    // SISTEMA DE TABS E SUBTABS
    // ============================================
    
    const tabsData = [];
    let activeTab = null;
    let activeSubTab = null;

    // Container de conteúdo das tabs
    const tabContentsContainer = document.createElement("div");
    Object.assign(tabContentsContainer.style, {
      position: "absolute",
      top: "7px",
      left: "7px",
      right: "7px",
      bottom: "7px"
    });
    rightContent.appendChild(tabContentsContainer);

    // Função para criar ícones CSS (simples, sem emojis)
    function createIconSVG(name) {
      const icons = {
        home: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        settings: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
        user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
        code: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
        star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`,
        chevronDown: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`
      };
      return icons[name] || icons.home;
    }

    // Função para criar uma Tab
    function createTab(tabConfig) {
      const tabId = tabConfig.id || `tab-${tabsData.length}`;
      
      const tabButton = document.createElement("div");
      Object.assign(tabButton.style, {
        width: "55px",
        height: "45px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid transparent",
        background: "transparent",
        position: "relative"
      });

      const iconWrapper = document.createElement("div");
      Object.assign(iconWrapper.style, {
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#b4b4b4",
        opacity: "0.6",
        transition: "all 0.2s ease"
      });
      iconWrapper.innerHTML = createIconSVG(tabConfig.icon || "home");
      tabButton.appendChild(iconWrapper);

      // Container de conteúdo da tab
      const tabContent = document.createElement("div");
      Object.assign(tabContent.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "none",
        flexDirection: "column",
        overflow: "hidden"
      });
      tabContentsContainer.appendChild(tabContent);

      // Container de sub-tabs da tab
      const tabSubTabs = document.createElement("div");
      Object.assign(tabSubTabs.style, {
        display: "none",
        gap: "0",
        height: "100%",
        alignItems: "center"
      });
      subTabsContainer.appendChild(tabSubTabs);

      const tabData = {
        id: tabId,
        button: tabButton,
        icon: iconWrapper,
        content: tabContent,
        subTabsContainer: tabSubTabs,
        subTabs: [],
        active: false
      };

      // Scroll container para seções
      const scrollContainer = document.createElement("div");
      Object.assign(scrollContainer.style, {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "1px",
        scrollbarWidth: "thin",
        scrollbarColor: "#1a1a1a transparent",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: "10px"
      });
      tabContent.appendChild(scrollContainer);

      // Coluna esquerda
      const leftColumn = document.createElement("div");
      Object.assign(leftColumn.style, {
        width: "calc(50% - 5px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "200px"
      });
      scrollContainer.appendChild(leftColumn);

      // Coluna direita
      const rightColumn = document.createElement("div");
      Object.assign(rightColumn.style, {
        width: "calc(50% - 5px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "200px"
      });
      scrollContainer.appendChild(rightColumn);

      tabData.leftColumn = leftColumn;
      tabData.rightColumn = rightColumn;

      // Evento de clique na tab
      tabButton.addEventListener("click", () => {
        if (activeTab === tabData) return;
        
        // Desativar tab anterior
        if (activeTab) {
          activeTab.button.style.background = "transparent";
          activeTab.button.style.border = "1px solid transparent";
          activeTab.button.style.width = "50px";
          activeTab.button.style.height = "40px";
          activeTab.icon.style.opacity = "0.6";
          activeTab.icon.style.color = "#b4b4b4";
          activeTab.content.style.display = "none";
          activeTab.subTabsContainer.style.display = "none";
          activeTab.active = false;
          
          // Esconder sub-tabs da tab anterior
          while (subTabsContainer.children.length > 0) {
            // Mantemos apenas os containers das outras tabs
          }
        }

        // Ativar nova tab
        tabData.button.style.background = "rgba(124, 77, 255, 0.08)";
        tabData.button.style.border = "1px solid #232323";
        tabData.button.style.width = "55px";
        tabData.button.style.height = "45px";
        tabData.icon.style.opacity = "1";
        tabData.icon.style.color = "#f0f0f0";
        tabData.content.style.display = "flex";
        tabData.active = true;

        // Mostrar sub-tabs da tab ativa
        Array.from(subTabsContainer.children).forEach(child => {
          child.style.display = "none";
        });
        tabData.subTabsContainer.style.display = "flex";

        // Ativar primeira sub-tab se existir
        if (tabData.subTabs.length > 0 && activeSubTab !== tabData.subTabs[0]) {
          activateSubTab(tabData.subTabs[0], tabData);
        }

        activeTab = tabData;
      });

      leftTabsArea.appendChild(tabButton);
      tabsData.push(tabData);

      // Ativar primeira tab automaticamente
      if (tabsData.length === 1) {
        tabButton.click();
      }

      return tabData;
    }

    // Função para criar SubTab
    function createSubTab(tabData, subTabConfig) {
      const subTabId = subTabConfig.id || `subtab-${tabData.subTabs.length}`;
      
      const subTabButton = document.createElement("div");
      Object.assign(subTabButton.style, {
        padding: "4px 10px",
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
      subTabButton.textContent = subTabConfig.name || "SubTab";

      const subTabContent = document.createElement("div");
      Object.assign(subTabContent.style, {
        display: "none",
        width: "100%",
        height: "100%"
      });

      // Scroll container para seções da sub-tab
      const subScrollContainer = document.createElement("div");
      Object.assign(subScrollContainer.style, {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "1px",
        scrollbarWidth: "thin",
        scrollbarColor: "#1a1a1a transparent",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: "10px"
      });
      subTabContent.appendChild(subScrollContainer);

      const subLeftColumn = document.createElement("div");
      Object.assign(subLeftColumn.style, {
        width: "calc(50% - 5px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "200px"
      });
      subScrollContainer.appendChild(subLeftColumn);

      const subRightColumn = document.createElement("div");
      Object.assign(subRightColumn.style, {
        width: "calc(50% - 5px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: "200px"
      });
      subScrollContainer.appendChild(subRightColumn);

      tabData.content.appendChild(subTabContent);

      const subTabData = {
        id: subTabId,
        button: subTabButton,
        content: subTabContent,
        leftColumn: subLeftColumn,
        rightColumn: subRightColumn,
        parentTab: tabData,
        sections: [],
        active: false
      };

      subTabButton.addEventListener("click", () => {
        activateSubTab(subTabData, tabData);
      });

      tabData.subTabsContainer.appendChild(subTabButton);
      tabData.subTabs.push(subTabData);

      // Ativar primeira sub-tab
      if (tabData.subTabs.length === 1) {
        activateSubTab(subTabData, tabData);
      }

      return subTabData;
    }

    function activateSubTab(subTabData, tabData) {
      if (activeSubTab === subTabData) return;

      // Desativar sub-tab anterior
      if (activeSubTab && activeSubTab.parentTab === tabData) {
        activeSubTab.button.style.color = "#b4b4b4";
        activeSubTab.button.style.background = "transparent";
        activeSubTab.content.style.display = "none";
        activeSubTab.active = false;
      }

      // Ativar nova sub-tab
      subTabData.button.style.color = "#f0f0f0";
      subTabData.button.style.background = "rgba(124, 77, 255, 0.1)";
      subTabData.content.style.display = "block";
      subTabData.active = true;

      // Animar linha indicadora
      const btnRect = subTabData.button.getBoundingClientRect();
      const parentRect = rightTabsFrame.getBoundingClientRect();
      const leftPos = btnRect.left - parentRect.left;
      const width = btnRect.width;

      activeLine.style.opacity = "1";
      activeLine.style.left = leftPos + "px";
      activeLine.style.width = width + "px";

      activeSubTab = subTabData;
    }

    // Função para criar Seção
    function createSection(subTabData, sectionConfig) {
      const side = sectionConfig.side || "left";
      const column = side === "left" ? subTabData.leftColumn : subTabData.rightColumn;

      const sectionWrapper = document.createElement("div");
      Object.assign(sectionWrapper.style, {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0"
      });

      // Header da seção (se houver)
      if (sectionConfig.header) {
        const headerEl = document.createElement("div");
        Object.assign(headerEl.style, {
          fontSize: "11px",
          color: "#787878",
          padding: "0 4px 4px 4px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "bold"
        });
        headerEl.textContent = sectionConfig.header;
        sectionWrapper.appendChild(headerEl);
      }

      // Card da seção
      const sectionCard = document.createElement("div");
      Object.assign(sectionCard.style, {
        width: "100%",
        background: "rgba(15, 15, 15, 0.7)",
        borderRadius: "7px",
        border: "1px solid #232323",
        padding: "8px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      });
      sectionWrapper.appendChild(sectionCard);

      column.appendChild(sectionWrapper);

      const sectionData = {
        wrapper: sectionWrapper,
        card: sectionCard,
        elements: []
      };

      // ============================================
      // ELEMENTOS DA SEÇÃO
      // ============================================

      // Botão
      sectionData.addButton = function(btnConfig) {
        const btnFrame = document.createElement("div");
        Object.assign(btnFrame.style, {
          width: "100%",
          height: "30px",
          background: "rgba(18, 18, 18, 0.7)",
          borderRadius: "7px",
          border: "1px solid rgba(35, 35, 35, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: "0 8px",
          transition: "all 0.2s ease",
          position: "relative",
          overflow: "hidden"
        });

        const btnLabel = document.createElement("span");
        Object.assign(btnLabel.style, {
          fontSize: "12px",
          color: "#c8c8c8",
          transition: "color 0.2s ease"
        });
        btnLabel.textContent = btnConfig.name || "Button";
        btnFrame.appendChild(btnLabel);

        // Ícone de ação
        const actionIcon = document.createElement("div");
        Object.assign(actionIcon.style, {
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          border: "1px solid rgba(200, 200, 200, 0.4)",
          position: "absolute",
          right: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: "0.6",
          transition: "all 0.2s ease"
        });
        const innerDot = document.createElement("div");
        Object.assign(innerDot.style, {
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#c8c8c8",
          opacity: "0.6"
        });
        actionIcon.appendChild(innerDot);
        btnFrame.appendChild(actionIcon);

        // Hover effects
        btnFrame.addEventListener("mouseenter", () => {
          btnFrame.style.background = "rgba(45, 45, 55, 0.7)";
          btnLabel.style.color = "#f0f0f0";
          actionIcon.style.opacity = "1";
        });
        btnFrame.addEventListener("mouseleave", () => {
          btnFrame.style.background = "rgba(18, 18, 18, 0.7)";
          btnLabel.style.color = "#c8c8c8";
          actionIcon.style.opacity = "0.6";
        });

        btnFrame.addEventListener("click", () => {
          if (btnConfig.callback) btnConfig.callback();
        });

        sectionCard.appendChild(btnFrame);
        return btnFrame;
      };

      // Toggle
      sectionData.addToggle = function(toggleConfig) {
        const toggleFrame = document.createElement("div");
        Object.assign(toggleFrame.style, {
          width: "100%",
          height: "30px",
          background: "transparent",
          borderRadius: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          padding: "0 5px"
        });

        const toggleLabel = document.createElement("span");
        Object.assign(toggleLabel.style, {
          fontSize: "12px",
          color: "#c8c8c8",
          transition: "color 0.2s ease"
        });
        toggleLabel.textContent = toggleConfig.name || "Toggle";
        toggleFrame.appendChild(toggleLabel);

        // Switch container
        const switchContainer = document.createElement("div");
        Object.assign(switchContainer.style, {
          width: "38px",
          height: "17px",
          background: "rgba(18, 18, 18, 0.7)",
          borderRadius: "7px",
          border: "1px solid rgba(35, 35, 35, 0.4)",
          position: "relative",
          cursor: "pointer",
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

        let isToggled = toggleConfig.default || false;

        function updateToggle() {
          if (isToggled) {
            switchContainer.style.background = "linear-gradient(135deg, #6200ea, #7c4dff)";
            switchContainer.style.borderColor = "#7c4dff";
            switchThumb.style.background = "#f0f0f0";
            switchThumb.style.left = "22px";
          } else {
            switchContainer.style.background = "rgba(18, 18, 18, 0.7)";
            switchContainer.style.borderColor = "rgba(35, 35, 35, 0.4)";
            switchThumb.style.background = "#787878";
            switchThumb.style.left = "2px";
          }
        }

        updateToggle();

        toggleFrame.addEventListener("click", () => {
          isToggled = !isToggled;
          updateToggle();
          if (toggleConfig.callback) toggleConfig.callback(isToggled);
        });

        toggleFrame.appendChild(switchContainer);
        sectionCard.appendChild(toggleFrame);
        return { frame: toggleFrame, getValue: () => isToggled, setValue: (v) => { isToggled = v; updateToggle(); } };
      };

      // Checkbox
      sectionData.addCheckbox = function(checkConfig) {
        const checkFrame = document.createElement("div");
        Object.assign(checkFrame.style, {
          width: "100%",
          height: "30px",
          background: "transparent",
          borderRadius: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          padding: "0 5px"
        });

        const checkLabel = document.createElement("span");
        Object.assign(checkLabel.style, {
          fontSize: "12px",
          color: "#c8c8c8",
          transition: "color 0.2s ease"
        });
        checkLabel.textContent = checkConfig.name || "Checkbox";
        checkFrame.appendChild(checkLabel);

        const checkBox = document.createElement("div");
        Object.assign(checkBox.style, {
          width: "20px",
          height: "20px",
          background: "rgba(18, 18, 18, 0.7)",
          borderRadius: "5px",
          border: "1px solid rgba(35, 35, 35, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          position: "relative"
        });

        const checkIcon = document.createElement("div");
        Object.assign(checkIcon.style, {
          width: "14px",
          height: "14px",
          opacity: "0",
          transition: "opacity 0.3s ease",
          color: "#c8c8c8"
        });
        checkIcon.innerHTML = createIconSVG("check");
        checkBox.appendChild(checkIcon);

        let isChecked = checkConfig.default || false;

        function updateCheckbox() {
          if (isChecked) {
            checkBox.style.borderColor = "#7c4dff";
            checkBox.style.background = "rgba(124, 77, 255, 0.15)";
            checkIcon.style.opacity = "0.8";
          } else {
            checkBox.style.borderColor = "rgba(35, 35, 35, 0.4)";
            checkBox.style.background = "rgba(18, 18, 18, 0.7)";
            checkIcon.style.opacity = "0";
          }
        }

        updateCheckbox();

        checkFrame.addEventListener("click", () => {
          isChecked = !isChecked;
          updateCheckbox();
          if (checkConfig.callback) checkConfig.callback(isChecked);
        });

        checkFrame.appendChild(checkBox);
        sectionCard.appendChild(checkFrame);
        return { frame: checkFrame, getValue: () => isChecked, setValue: (v) => { isChecked = v; updateCheckbox(); } };
      };

      // Slider
      sectionData.addSlider = function(sliderConfig) {
        const sliderFrame = document.createElement("div");
        Object.assign(sliderFrame.style, {
          width: "100%",
          height: "30px",
          background: "transparent",
          borderRadius: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5px",
          gap: "8px"
        });

        const sliderLabel = document.createElement("span");
        Object.assign(sliderLabel.style, {
          fontSize: "12px",
          color: "#c8c8c8",
          whiteSpace: "nowrap",
          minWidth: "50px"
        });
        sliderLabel.textContent = sliderConfig.name || "Slider";
        sliderFrame.appendChild(sliderLabel);

        // Container da linha e track
        const trackContainer = document.createElement("div");
        Object.assign(trackContainer.style, {
          flex: "1",
          height: "20px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          cursor: "pointer"
        });

        const trackBg = document.createElement("div");
        Object.assign(trackBg.style, {
          width: "100%",
          height: "2px",
          background: "rgba(200, 200, 200, 0.4)",
          borderRadius: "2px",
          position: "relative"
        });
        trackContainer.appendChild(trackBg);

        const trackFill = document.createElement("div");
        Object.assign(trackFill.style, {
          width: "50%",
          height: "100%",
          background: "rgba(200, 200, 200, 0.8)",
          borderRadius: "2px",
          position: "absolute",
          top: "0",
          left: "0",
          transition: "width 0.1s ease"
        });
        trackBg.appendChild(trackFill);

        const thumb = document.createElement("div");
        Object.assign(thumb.style, {
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "#c8c8c8",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "left 0.1s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.5)"
        });
        trackBg.appendChild(thumb);

        const valueDisplay = document.createElement("span");
        Object.assign(valueDisplay.style, {
          fontSize: "11px",
          color: "#c8c8c8",
          minWidth: "40px",
          textAlign: "right",
          whiteSpace: "nowrap"
        });
        valueDisplay.textContent = sliderConfig.default || "50";
        sliderFrame.appendChild(valueDisplay);

        const min = sliderConfig.min || 0;
        const max = sliderConfig.max || 100;
        let currentValue = sliderConfig.default || 50;

        function updateSliderPosition(value) {
          const percent = ((value - min) / (max - min)) * 100;
          trackFill.style.width = percent + "%";
          thumb.style.left = percent + "%";
          valueDisplay.textContent = sliderConfig.displayMethod === "Percent" 
            ? Math.round(percent) + "%" 
            : Math.round(value);
        }

        updateSliderPosition(currentValue);

        function getValueFromEvent(e) {
          const rect = trackBg.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
          return min + (percent / 100) * (max - min);
        }

        let isDragging = false;

        trackContainer.addEventListener("mousedown", (e) => {
          isDragging = true;
          currentValue = getValueFromEvent(e);
          updateSliderPosition(currentValue);
          if (sliderConfig.callback) sliderConfig.callback(currentValue);
        });

        document.addEventListener("mousemove", (e) => {
          if (isDragging) {
            currentValue = getValueFromEvent(e);
            updateSliderPosition(currentValue);
            if (sliderConfig.callback) sliderConfig.callback(currentValue);
          }
        });

        document.addEventListener("mouseup", () => {
          isDragging = false;
        });

        sliderFrame.appendChild(trackContainer);
        sectionCard.appendChild(sliderFrame);
        return { frame: sliderFrame, getValue: () => currentValue, setValue: (v) => { currentValue = v; updateSliderPosition(v); } };
      };

      // Dropdown
      sectionData.addDropdown = function(dropConfig) {
        const dropdownFrame = document.createElement("div");
        Object.assign(dropdownFrame.style, {
          width: "100%",
          minHeight: "30px",
          background: "rgba(18, 18, 18, 0.7)",
          borderRadius: "8px",
          border: "1px solid #232323",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.2s ease",
          overflow: "hidden"
        });

        const dropdownHeader = document.createElement("div");
        Object.assign(dropdownHeader.style, {
          width: "100%",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px"
        });

        const dropdownLabel = document.createElement("span");
        Object.assign(dropdownLabel.style, {
          fontSize: "12px",
          color: "#c8c8c8",
          flex: "1",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        });
        const defaultVal = dropConfig.default || (dropConfig.values ? dropConfig.values[0] : "Select");
        dropdownLabel.textContent = (dropConfig.name || "Dropdown") + ": " + defaultVal;
        dropdownHeader.appendChild(dropdownLabel);

        const chevronIcon = document.createElement("div");
        Object.assign(chevronIcon.style, {
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
        chevronIcon.innerHTML = createIconSVG("chevronDown");
        dropdownHeader.appendChild(chevronIcon);

        dropdownFrame.appendChild(dropdownHeader);

        // Lista de opções
        const optionsContainer = document.createElement("div");
        Object.assign(optionsContainer.style, {
          width: "100%",
          maxHeight: "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          borderTop: "1px solid transparent",
          transition: "all 0.3s ease"
        });
        dropdownFrame.appendChild(optionsContainer);

        let isOpen = false;
        let selectedValue = dropConfig.default || (dropConfig.values ? dropConfig.values[0] : null);

        function buildOptions() {
          optionsContainer.innerHTML = "";
          if (!dropConfig.values) return;

          dropConfig.values.forEach((val, index) => {
            const optionEl = document.createElement("div");
            Object.assign(optionEl.style, {
              width: "100%",
              height: "30px",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              fontSize: "12px",
              color: val === selectedValue ? "#f0f0f0" : "#c8c8c8",
              cursor: "pointer",
              borderRadius: "8px",
              border: "1px solid transparent",
              background: val === selectedValue ? "rgba(124, 77, 255, 0.08)" : "transparent",
              transition: "all 0.15s ease"
            });
            optionEl.textContent = val;

            optionEl.addEventListener("mouseenter", () => {
              if (val !== selectedValue) {
                optionEl.style.background = "rgba(45, 45, 55, 0.5)";
              }
            });
            optionEl.addEventListener("mouseleave", () => {
              if (val !== selectedValue) {
                optionEl.style.background = "transparent";
              }
            });

            optionEl.addEventListener("click", (e) => {
              e.stopPropagation();
              selectedValue = val;
              dropdownLabel.textContent = (dropConfig.name || "Dropdown") + ": " + val;
              buildOptions();
              closeDropdown();
              if (dropConfig.callback) dropConfig.callback(val);
            });

            optionsContainer.appendChild(optionEl);
          });
        }

        buildOptions();

        function openDropdown() {
          isOpen = true;
          optionsContainer.style.maxHeight = (dropConfig.values.length * 30 + 16) + "px";
          optionsContainer.style.borderTop = "1px solid #232323";
          optionsContainer.style.padding = "8px";
          chevronIcon.style.transform = "rotate(0deg)";
          dropdownFrame.style.borderColor = "#7c4dff";
        }

        function closeDropdown() {
          isOpen = false;
          optionsContainer.style.maxHeight = "0";
          optionsContainer.style.borderTop = "1px solid transparent";
          optionsContainer.style.padding = "0 8px";
          chevronIcon.style.transform = "rotate(180deg)";
          dropdownFrame.style.borderColor = "#232323";
        }

        dropdownHeader.addEventListener("click", (e) => {
          e.stopPropagation();
          if (isOpen) {
            closeDropdown();
          } else {
            openDropdown();
          }
        });

        document.addEventListener("click", () => {
          if (isOpen) closeDropdown();
        });

        sectionCard.appendChild(dropdownFrame);
        return { 
          frame: dropdownFrame, 
          getValue: () => selectedValue,
          setValue: (v) => { 
            selectedValue = v; 
            dropdownLabel.textContent = (dropConfig.name || "Dropdown") + ": " + v;
            buildOptions();
          }
        };
      };

      subTabData.sections.push(sectionData);
      return sectionData;
    }

    // ============================================
    // DRAG (Arrastar janela)
    // ============================================
    let isDraggingWindow = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    leftBallsArea.addEventListener("mousedown", (e) => {
      isDraggingWindow = true;
      const rect = windowFrame.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
      windowFrame.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDraggingWindow) return;
      const parentRect = screenGui.getBoundingClientRect();
      let newLeft = e.clientX - dragOffsetX;
      let newTop = e.clientY - dragOffsetY;
      
      newLeft = Math.max(0, Math.min(newLeft, parentRect.width - windowFrame.offsetWidth));
      newTop = Math.max(0, Math.min(newTop, parentRect.height - windowFrame.offsetHeight));
      
      windowFrame.style.left = newLeft + "px";
      windowFrame.style.top = newTop + "px";
      windowFrame.style.transform = "none";
    });

    document.addEventListener("mouseup", () => {
      if (isDraggingWindow) {
        isDraggingWindow = false;
        windowFrame.style.transition = "";
      }
    });

    // ============================================
    // DEMONSTRAÇÃO - Criando Tabs e Seções
    // ============================================

    // Tab Home
    const homeTab = createTab({ id: "home", icon: "home" });
    
    const generalSubTab = createSubTab(homeTab, { id: "general", name: "General" });
    const settingsSubTab = createSubTab(homeTab, { id: "settings", name: "Settings" });

    // Seções da General
    const controlsSection = createSection(generalSubTab, { header: "Controls", side: "left" });
    controlsSection.addButton({ name: "Click Me!", callback: () => sendToast("Button clicked!", 1500) });
    controlsSection.addToggle({ name: "Enable Feature", default: false, callback: (v) => sendToast("Toggle: " + v, 1500) });
    controlsSection.addCheckbox({ name: "Check this", default: true, callback: (v) => sendToast("Checkbox: " + v, 1500) });

    const valuesSection = createSection(generalSubTab, { header: "Values", side: "right" });
    valuesSection.addSlider({ name: "Volume", default: 50, min: 0, max: 100, displayMethod: "Percent", callback: (v) => sendToast("Slider: " + v, 1500) });
    valuesSection.addDropdown({ name: "Options", values: ["Option 1", "Option 2", "Option 3"], default: "Option 1", callback: (v) => sendToast("Dropdown: " + v, 1500) });

    // Seções da Settings
    const advancedSection = createSection(settingsSubTab, { header: "Advanced", side: "left" });
    advancedSection.addToggle({ name: "Mod Mode", default: APP.cfg.mod, callback: (v) => { APP.cfg.mod = v; sendToast("Mod: " + v, 1500); } });
    advancedSection.addToggle({ name: "Auto Complete", default: APP.cfg.auto, callback: (v) => { APP.cfg.auto = v; sendToast("Auto: " + v, 1500); } });

    const speedSection = createSection(settingsSubTab, { header: "Speed", side: "right" });
    speedSection.addSlider({ 
      name: "Auto Speed", 
      default: 750, 
      min: 750, 
      max: 1500, 
      displayMethod: "Value",
      callback: (v) => { APP.cfg.autoSpeed = v; sendToast("Speed: " + v + "ms", 1500); }
    });

    // Tab User
    const userTab = createTab({ id: "user", icon: "user" });
    const profileSubTab = createSubTab(userTab, { id: "profile", name: "Profile" });

    const infoSection = createSection(profileSubTab, { header: "Info", side: "left" });
    infoSection.addButton({ name: "Refresh", callback: () => sendToast("Profile refreshed!", 1500) });
    infoSection.addCheckbox({ name: "Show Avatar", default: true, callback: (v) => sendToast("Avatar: " + v, 1500) });

    // Tab Code
    const codeTab = createTab({ id: "code", icon: "code" });
    const toolsSubTab = createSubTab(codeTab, { id: "tools", name: "Tools" });

    const toolsSection = createSection(toolsSubTab, { header: "Scripts", side: "left" });
    toolsSection.addButton({ name: "Execute", callback: () => sendToast("Script executed!", 1500) });
    toolsSection.addDropdown({ name: "Presets", values: ["Script A", "Script B", "Script C"], default: "Script A", callback: (v) => sendToast("Preset: " + v, 1500) });

    console.log(`[${APP.name} v${APP.ver}] Menu iniciado com sucesso!`);
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
