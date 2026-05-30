// ============================================
// AICODE v2.0 - Menu Flutuante
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

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

function sendToast(message, duration = 3000, position = "bottom") {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration,
      gravity: position,
      position: "center",
      stopOnFocus: true,
      style: { background: "#0a0a0a", borderRadius: "8px" }
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
      top: "15px",
      right: "20px",
      width: "220px",
      background: "linear-gradient(160deg, #0a0a0a, #0f0f0f)",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      zIndex: "2147483647",
      boxShadow: "0 8px 25px rgba(0,0,0,0.7), 0 0 0 1px rgba(35,35,35,0.8)",
      maxWidth: "95%",
      fontFamily: "'Courier New', monospace",
      border: "1px solid #232323"
    });

    panel.innerHTML = `
      <style>
        .aicode-header {
          color: #f0f0f0;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          padding: 12px 10px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #232323;
          letter-spacing: 0.5px;
          user-select: none;
          transition: background 0.2s;
        }
        .aicode-header:hover {
          background: rgba(255,255,255,0.03);
        }
        .aicode-header::after {
          content: "▼";
          font-size: 9px;
          margin-left: 8px;
          transition: transform 0.3s ease;
          color: #b4b4b4;
        }
        .aicode-header.collapsed::after {
          transform: rotate(-90deg);
        }
        .aicode-version {
          color: #787878;
          font-size: 10px;
          font-weight: normal;
          margin-left: 6px;
          background: #1a1a1a;
          padding: 2px 7px;
          border-radius: 8px;
        }
        .aicode-content {
          transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.25s ease;
          max-height: 400px;
          opacity: 1;
          overflow: hidden;
          padding: 8px 0;
        }
        .aicode-content.collapsed {
          max-height: 0;
          opacity: 0;
          padding: 0;
        }
        .aicode-opt {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #f0f0f0;
          padding: 10px 15px;
          margin: 2px 8px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .aicode-opt:hover {
          background: #1a1a1a;
        }
        .aicode-opt span {
          font-size: 12px;
          color: #c8c8c8;
        }
        .aicode-switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }
        .aicode-switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }
        .aicode-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #232323;
          transition: 0.3s;
          border-radius: 20px;
          border: 1px solid #333;
        }
        .aicode-slider::before {
          content: "";
          position: absolute;
          height: 14px;
          width: 14px;
          left: 2px;
          bottom: 2px;
          background: #787878;
          transition: 0.3s;
          border-radius: 50%;
        }
        .aicode-switch input:checked + .aicode-slider {
          background: linear-gradient(135deg, #6200ea, #7c4dff);
          border-color: #7c4dff;
        }
        .aicode-switch input:checked + .aicode-slider::before {
          transform: translateX(20px);
          background: #f0f0f0;
        }
        .aicode-speed-section {
          display: none;
          padding: 5px 15px 10px 15px;
          margin: 0 8px;
        }
        .aicode-speed-section.visible {
          display: block;
        }
        .aicode-speed-label {
          font-size: 11px;
          color: #b4b4b4;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
        }
        .aicode-speed-value {
          color: #7c4dff;
          font-weight: bold;
        }
        .aicode-speed-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 4px;
          background: #232323;
          outline: none;
          border: 1px solid #333;
        }
        .aicode-speed-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6200ea, #7c4dff);
          cursor: pointer;
          border: 1px solid #7c4dff;
        }
        .aicode-credit {
          color: #555;
          font-size: 10px;
          text-align: center;
          padding: 10px;
          border-top: 1px solid #1a1a1a;
          margin-top: 5px;
          letter-spacing: 0.5px;
        }
      </style>

      <div class="aicode-header">
        <span>${APP.name}</span>
        <span class="aicode-version">v${APP.ver}</span>
      </div>

      <div class="aicode-content">
        <div class="aicode-opt">
          <span>Auto Complete</span>
          <label class="aicode-switch">
            <input type="checkbox" id="autoCheck">
            <span class="aicode-slider"></span>
          </label>
        </div>

        <div class="aicode-speed-section" id="speedSection">
          <div class="aicode-speed-label">
            <span>Velocidade</span>
            <span class="aicode-speed-value" id="speedValue">750ms</span>
          </div>
          <input type="range" min="0" max="3" value="0" class="aicode-speed-slider" id="speedSlider">
        </div>

        <div class="aicode-opt">
          <span>Question Spoof</span>
          <label class="aicode-switch">
            <input type="checkbox" id="spoofCheck" checked>
            <span class="aicode-slider"></span>
          </label>
        </div>

        <div class="aicode-opt">
          <span>Dark Mode</span>
          <label class="aicode-switch">
            <input type="checkbox" id="darkModeCheck" checked>
            <span class="aicode-slider"></span>
          </label>
        </div>

        <div class="aicode-credit">by AICODE Team</div>
      </div>
    `;

    document.body.appendChild(panel);

    // ============================================
    // EVENTOS E INTERAÇÕES
    // ============================================

    const header = panel.querySelector(".aicode-header");
    const content = panel.querySelector(".aicode-content");
    const autoCheck = panel.querySelector("#autoCheck");
    const speedSection = panel.querySelector("#speedSection");
    const speedSlider = panel.querySelector("#speedSlider");
    const speedValue = panel.querySelector("#speedValue");
    const spoofCheck = panel.querySelector("#spoofCheck");
    const darkModeCheck = panel.querySelector("#darkModeCheck");

    // Colapsar/Expandir menu
    header.addEventListener("click", () => {
      header.classList.toggle("collapsed");
      content.classList.toggle("collapsed");
      const isCollapsed = header.classList.contains("collapsed");
      localStorage.setItem("aicode-collapsed", isCollapsed);
      sendToast(isCollapsed ? "📁 Menu recolhido" : "📂 Menu expandido", 1200);
    });

    // Restaurar estado colapsado
    if (localStorage.getItem("aicode-collapsed") === "true") {
      header.classList.add("collapsed");
      content.classList.add("collapsed");
    }

    // Auto Complete
    autoCheck.addEventListener("change", () => {
      APP.cfg.auto = autoCheck.checked;
      speedSection.classList.toggle("visible", APP.cfg.auto);
      sendToast(APP.cfg.auto ? "✅ Auto Complete Ativado" : "❌ Auto Complete Desativado", 2000);
    });

    // Slider de velocidade
    speedSlider.addEventListener("input", () => {
      const speed = APP.cfg.speedOptions[parseInt(speedSlider.value)];
      APP.cfg.autoSpeed = speed;
      speedValue.textContent = speed + "ms";
    });

    speedSlider.addEventListener("change", () => {
      const speed = APP.cfg.speedOptions[parseInt(speedSlider.value)];
      sendToast(`⏱ Velocidade: ${speed}ms`, 1500);
    });

    // Question Spoof
    spoofCheck.addEventListener("change", () => {
      APP.cfg.questionSpoof = spoofCheck.checked;
      sendToast(APP.cfg.questionSpoof ? "✅ Question Spoof Ativado" : "❌ Question Spoof Desativado", 2000);
    });

    // Dark Mode
    darkModeCheck.addEventListener("change", () => {
      APP.cfg.darkMode = darkModeCheck.checked;
      sendToast(APP.cfg.darkMode ? "🌙 Dark Mode Ativado" : "☀️ Dark Mode Desativado", 2000);
    });

    // Definir valor inicial do slider
    const initialIndex = APP.cfg.speedOptions.indexOf(APP.cfg.autoSpeed);
    speedSlider.value = initialIndex >= 0 ? initialIndex : 0;
    speedValue.textContent = APP.cfg.autoSpeed + "ms";

    console.log(`🚀 ${APP.name} v${APP.ver} iniciado!`);
  }
}

// ============================================
// INICIALIZAÇÃO
// ============================================

function initApp() {
  try {
    // Carregar Toastify dinamicamente se necessário
    if (typeof Toastify === 'undefined') {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/toastify-js";
      script.onload = () => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css";
        document.head.appendChild(link);
        UI.init();
        sendToast(`🚀 ${APP.name} v${APP.ver} pronto!`, 2500);
      };
      document.head.appendChild(script);
    } else {
      UI.init();
      sendToast(`🚀 ${APP.name} v${APP.ver} pronto!`, 2500);
    }
  } catch (error) {
    console.error("Erro ao iniciar:", error);
  }
}

initApp();
