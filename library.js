// ============================================
// AICODE v2.0 - Library Completa (CORRIGIDA)
// ============================================

(function() {
  const VERSION = "2.0";
  
  // Tema
  const T = {
    bg: { primary: "#0a0a0a", secondary: "#0f0f0f", card: "#111111", input: "#0f0f0f" },
    text: { primary: "#e8e8e8", secondary: "#a0a0a0", disabled: "#666666" },
    border: { primary: "#1a1a1a", secondary: "#2a2a2a", accent: "#7c4dff" },
    accent: { main: "#7c4dff", dark: "#6200ea", light: "#9d7dff" },
    hover: "#1a1a1a",
    apple: { red: "#ff5f57", yellow: "#febc2e", green: "#28c840" }
  };

  // Ícones SVG inline
  const I = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="100%" height="100%"><polyline points="20 6 9 17 4 12"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><polyline points="6 9 12 15 18 9"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="100%" height="100%"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  };

  function css(el, styles) { Object.assign(el.style, styles); return el; }

  // Estilos globais
  function injectStyles() {
    if (document.getElementById('aic-styles')) return;
    const s = document.createElement('style');
    s.id = 'aic-styles';
    s.textContent = `
      .aic-reset,.aic-reset *{margin:0;padding:0;box-sizing:border-box;user-select:none;font-family:'Courier New',monospace}
      .aic-scroll::-webkit-scrollbar{width:3px}.aic-scroll::-webkit-scrollbar-track{background:transparent}.aic-scroll::-webkit-scrollbar-thumb{background:#1a1a1a;border-radius:2px}
      @keyframes aic-notif-in{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}
      @keyframes aic-notif-out{from{transform:translateX(0);opacity:1}to{transform:translateX(120%);opacity:0}}
    `;
    document.head.appendChild(s);
  }

  // Notificações
  class Notifications {
    constructor() {
      this.c = document.createElement('div');
      css(this.c, {position:'fixed',top:'10px',right:'10px',zIndex:'2147483647',display:'flex',flexDirection:'column',gap:'8px',pointerEvents:'none',maxWidth:'300px'});
      document.body.appendChild(this.c);
    }
    show({title='',message='',type='info',duration=4000}) {
      const el = document.createElement('div');
      css(el, {background:T.bg.primary,border:'1px solid '+T.border.primary,borderRadius:'10px',padding:'12px 14px',display:'flex',alignItems:'flex-start',gap:'10px',pointerEvents:'auto',animation:'aic-notif-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards',boxShadow:'0 8px 25px rgba(0,0,0,0.7)',minWidth:'250px',position:'relative',overflow:'hidden'});
      const colors = {success:'#28c840',error:'#ff5f57',warning:'#febc2e',info:T.accent.main};
      const bar = document.createElement('div');
      css(bar, {position:'absolute',left:'0',top:'0',width:'3px',height:'100%',background:colors[type]||colors.info,borderRadius:'3px 0 0 3px'});
      el.appendChild(bar);
      const ic = document.createElement('div');
      ic.innerHTML = I[type==='success'?'check':type==='error'?'close':'info'];
      css(ic, {width:'20px',height:'20px',minWidth:'20px',color:colors[type],display:'flex',alignItems:'center',justifyContent:'center'});
      el.appendChild(ic);
      const ct = document.createElement('div');
      css(ct, {flex:'1',display:'flex',flexDirection:'column',gap:'3px'});
      if(title){const t=document.createElement('div');t.textContent=title;css(t,{color:T.text.primary,fontSize:'12px',fontWeight:'700'});ct.appendChild(t);}
      if(message){const m=document.createElement('div');m.textContent=message;css(m,{color:T.text.secondary,fontSize:'10px',lineHeight:'1.3'});ct.appendChild(m);}
      el.appendChild(ct);
      const cls = document.createElement('div');
      cls.innerHTML = I.close;
      css(cls, {width:'14px',height:'14px',cursor:'pointer',color:T.text.disabled});
      cls.onclick = () => this.remove(el);
      el.appendChild(cls);
      this.c.appendChild(el);
      const timer = setTimeout(() => this.remove(el), duration);
      el._timer = timer;
      return el;
    }
    remove(el) {
      if(el._removing)return;
      el._removing=true;
      clearTimeout(el._timer);
      el.style.animation='aic-notif-out 0.25s cubic-bezier(0.16,1,0.3,1) forwards';
      setTimeout(()=>{if(el.parentNode)el.remove();},250);
    }
  }

  // ColorPicker HSV
  class ColorPicker {
    constructor(parent, def, cb) {
      this.parent = parent;
      this.cb = cb;
      this.color = this.hexToHsv(def||'#7c4dff');
      this.build();
    }
    hexToHsv(hex) {
      let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
      let max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
      let h=0,s=max===0?0:d/max,v=max;
      if(d!==0){if(max===r)h=((g-b)/d+(g<b?6:0))/6;else if(max===g)h=((b-r)/d+2)/6;else h=((r-g)/d+4)/6;}
      return {h,s,v};
    }
    hsvToHex(h,s,v) {
      let r,g,b;
      const i=Math.floor(h*6),f=h*6-i,p=v*(1-s),q=v*(1-f*s),t=v*(1-(1-f)*s);
      switch(i%6){case 0:r=v;g=t;b=p;break;case 1:r=q;g=v;b=p;break;case 2:r=p;g=v;b=t;break;case 3:r=p;g=q;b=v;break;case 4:r=t;g=p;b=v;break;case 5:r=v;g=p;b=q;break;}
      return '#'+[r,g,b].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');
    }
    build() {
      this.container = document.createElement('div');
      css(this.container, {width:'100%',display:'flex',flexDirection:'column',gap:'6px'});
      this.preview = document.createElement('div');
      css(this.preview, {width:'100%',height:'25px',borderRadius:'6px',border:'1px solid '+T.border.secondary});
      this.container.appendChild(this.preview);
      this.canvas = document.createElement('canvas');
      this.canvas.width=200;this.canvas.height=100;
      css(this.canvas, {width:'100%',height:'80px',borderRadius:'6px',cursor:'crosshair',display:'block'});
      this.container.appendChild(this.canvas);
      this.hueSlider = document.createElement('div');
      css(this.hueSlider, {width:'100%',height:'10px',borderRadius:'5px',cursor:'pointer',position:'relative',background:'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)'});
      this.hueThumb = document.createElement('div');
      css(this.hueThumb, {width:'14px',height:'14px',borderRadius:'50%',background:'#fff',border:'2px solid #000',position:'absolute',top:'50%',transform:'translate(-50%,-50%)',left:'0%'});
      this.hueSlider.appendChild(this.hueThumb);
      this.container.appendChild(this.hueSlider);
      this.hexInput = document.createElement('input');
      css(this.hexInput, {width:'100%',height:'24px',background:T.bg.input,border:'1px solid '+T.border.secondary,borderRadius:'6px',color:T.text.primary,fontSize:'11px',textAlign:'center',outline:'none'});
      this.hexInput.value = this.hsvToHex(this.color.h,this.color.s,this.color.v);
      this.container.appendChild(this.hexInput);
      this.updatePreview();
      this.drawSV();
      this.updateHueThumb();
      this.setupEvents();
      this.parent.appendChild(this.container);
    }
    updatePreview() {
      const hex = this.hsvToHex(this.color.h,this.color.s,this.color.v);
      this.preview.style.background = hex;
      this.hexInput.value = hex;
      if(this.cb)this.cb(hex);
    }
    drawSV() {
      const ctx=this.canvas.getContext('2d'),w=this.canvas.width,h=this.canvas.height;
      ctx.clearRect(0,0,w,h);
      for(let y=0;y<h;y++){const v=1-y/h;for(let x=0;x<w;x++){const s=x/w;ctx.fillStyle=this.hsvToHex(this.color.h,s,v);ctx.fillRect(x,y,1,1);}}
      const cx=this.color.s*w,cy=(1-this.color.v)*h;
      ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.strokeStyle='#000';ctx.lineWidth=1;ctx.stroke();
    }
    updateHueThumb(){this.hueThumb.style.left=(this.color.h*100)+'%';}
    setupEvents() {
      this.canvas.addEventListener('mousedown',(e)=>{
        const rect=this.canvas.getBoundingClientRect();
        const update=(ex,ey)=>{const x=Math.max(0,Math.min(1,(ex-rect.left)/rect.width)),y=Math.max(0,Math.min(1,(ey-rect.top)/rect.height));this.color.s=x;this.color.v=1-y;this.drawSV();this.updatePreview();};
        update(e.clientX,e.clientY);
        const onMove=(me)=>update(me.clientX,me.clientY);
        const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};
        document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
      });
      this.hueSlider.addEventListener('mousedown',(e)=>{
        const rect=this.hueSlider.getBoundingClientRect();
        const update=(ex)=>{const x=Math.max(0,Math.min(1,(ex-rect.left)/rect.width));this.color.h=x;this.updateHueThumb();this.drawSV();this.updatePreview();};
        update(e.clientX);
        const onMove=(me)=>update(me.clientX);
        const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);};
        document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
      });
      this.hexInput.addEventListener('change',()=>{
        const hex=this.hexInput.value;
        if(/^#[0-9a-fA-F]{6}$/.test(hex)){this.color=this.hexToHsv(hex);this.updateHueThumb();this.drawSV();this.updatePreview();}
      });
    }
  }

  // Window Principal
  class Window {
    constructor(settings={}) {
      this.notifs = new Notifications();
      this.keyBind = settings.KeyBind || 'F2';
      this.espEnabled = false;
      this.espWindow = null;
      this.tabs = [];
      this.activeTab = null;
      this.activeSubTab = null;
      injectStyles();
      this.build();
      this.bindKey();
    }

    build() {
      this.panel = document.createElement('div');
      this.panel.className = 'aic-reset';
      css(this.panel, {
        position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
        width:'620px',height:'420px',background:T.bg.primary,borderRadius:'10px',
        display:'flex',flexDirection:'row',zIndex:'2147483640',
        boxShadow:'0 0 0 1px '+T.border.primary+',0 20px 60px rgba(0,0,0,0.9)',
        overflow:'hidden',minWidth:'450px',minHeight:'320px',maxWidth:'850px',maxHeight:'650px',resize:'both'
      });

      // Left
      const left = document.createElement('div');
      css(left, {width:'85px',minWidth:'85px',height:'100%',background:T.bg.secondary,display:'flex',flexDirection:'column',borderRight:'1px solid '+T.border.primary,borderRadius:'10px 0 0 10px'});
      
      const balls = document.createElement('div');
      css(balls, {height:'35px',minHeight:'35px',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px',borderBottom:'1px solid '+T.border.primary,cursor:'move'});
      [T.apple.red,T.apple.yellow,T.apple.green].forEach((c,i)=>{
        const b = document.createElement('div');
        css(b, {width:'7px',height:'7px',borderRadius:'50%',background:c,opacity:'0',transition:'opacity 0.5s'});
        balls.appendChild(b);
        setTimeout(()=>b.style.opacity='1',400*i);
      });
      left.appendChild(balls);
      
      this.tabsContainer = document.createElement('div');
      css(this.tabsContainer, {flex:'1',overflowY:'auto',padding:'8px',display:'flex',flexDirection:'column',gap:'8px'});
      this.tabsContainer.className = 'aic-scroll';
      left.appendChild(this.tabsContainer);
      
      const ua = document.createElement('div');
      css(ua, {height:'45px',minHeight:'45px',borderTop:'1px solid '+T.border.primary,display:'flex',alignItems:'center',justifyContent:'center'});
      const av = document.createElement('div');
      av.innerHTML = I.user;
      css(av, {width:'24px',height:'24px',borderRadius:'50%',background:T.border.primary,display:'flex',alignItems:'center',justifyContent:'center',color:T.text.disabled,padding:'4px'});
      ua.appendChild(av);
      left.appendChild(ua);
      
      this.panel.appendChild(left);
      
      // Right
      const right = document.createElement('div');
      css(right, {flex:'1',height:'100%',display:'flex',flexDirection:'column'});
      
      const topBar = document.createElement('div');
      css(topBar, {height:'35px',minHeight:'35px',background:T.bg.secondary,borderBottom:'1px solid '+T.border.primary,display:'flex',alignItems:'center',padding:'0 10px',borderRadius:'0 10px 0 0'});
      
      this.subTabsContainer = document.createElement('div');
      css(this.subTabsContainer, {display:'flex',alignItems:'center',gap:'2px',height:'100%'});
      topBar.appendChild(this.subTabsContainer);
      
      const title = document.createElement('div');
      title.textContent = 'AICODE v'+VERSION;
      css(title, {color:T.text.primary,fontSize:'12px',fontWeight:'700',marginLeft:'auto',letterSpacing:'0.5px'});
      topBar.appendChild(title);
      
      right.appendChild(topBar);
      
      const contentArea = document.createElement('div');
      css(contentArea, {flex:'1',padding:'10px',position:'relative',overflow:'hidden'});
      this.tabContentContainer = document.createElement('div');
      css(this.tabContentContainer, {position:'absolute',top:'10px',left:'10px',right:'10px',bottom:'10px'});
      contentArea.appendChild(this.tabContentContainer);
      right.appendChild(contentArea);
      
      this.panel.appendChild(right);
      document.body.appendChild(this.panel);
      
      // Drag
      let dragging=false,ox=0,oy=0;
      balls.addEventListener('mousedown',(e)=>{
        dragging=true;
        const r=this.panel.getBoundingClientRect();
        ox=e.clientX-r.left;oy=e.clientY-r.top;
        this.panel.style.transition='none';
        e.preventDefault();
      });
      document.addEventListener('mousemove',(e)=>{
        if(!dragging)return;
        let l=e.clientX-ox,t=e.clientY-oy;
        l=Math.max(0,Math.min(l,window.innerWidth-this.panel.offsetWidth));
        t=Math.max(0,Math.min(t,window.innerHeight-this.panel.offsetHeight));
        this.panel.style.left=l+'px';this.panel.style.top=t+'px';this.panel.style.transform='none';
        this.updateEspPos();
      });
      document.addEventListener('mouseup',()=>{dragging=false;this.panel.style.transition='';});
    }

    bindKey() {
      document.addEventListener('keydown',(e)=>{
        if(e.key===this.keyBind||e.code===this.keyBind){
          e.preventDefault();
          const v=this.panel.style.display!=='none';
          this.panel.style.display=v?'none':'flex';
          if(this.espWindow)this.espWindow.style.display=this.panel.style.display;
        }
      });
    }

    updateEspPos() {
      if(!this.espWindow)return;
      const r=this.panel.getBoundingClientRect();
      this.espWindow.style.left=(r.right+10)+'px';
      this.espWindow.style.top=r.top+'px';
      this.espWindow.style.height=r.height+'px';
    }

    showEsp() {
      if(this.espWindow)return;
      const r=this.panel.getBoundingClientRect();
      this.espWindow=document.createElement('div');
      this.espWindow.className='aic-reset';
      css(this.espWindow, {position:'fixed',left:(r.right+10)+'px',top:r.top+'px',width:'300px',height:r.height+'px',background:T.bg.primary,borderRadius:'10px',border:'1px solid '+T.border.primary,zIndex:'2147483639',boxShadow:'0 10px 30px rgba(0,0,0,0.6)',display:'flex',flexDirection:'column',overflow:'hidden'});
      
      const hdr=document.createElement('div');
      css(hdr, {height:'30px',background:T.bg.secondary,borderBottom:'1px solid '+T.border.primary,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 10px',borderRadius:'10px 10px 0 0'});
      const ht=document.createElement('div');
      ht.textContent='ESP Preview';css(ht,{color:T.text.primary,fontSize:'11px',fontWeight:'700'});
      hdr.appendChild(ht);
      const cls=document.createElement('div');
      cls.innerHTML=I.close;
      css(cls,{width:'14px',height:'14px',cursor:'pointer',color:T.text.disabled});
      cls.onclick=()=>{this.espWindow.remove();this.espWindow=null;this.espEnabled=false;};
      hdr.appendChild(cls);
      this.espWindow.appendChild(hdr);
      
      const canvas=document.createElement('canvas');
      canvas.width=300;canvas.height=300;
      css(canvas,{width:'100%',height:'auto',background:'#000',flex:'1'});
      const ctx=canvas.getContext('2d');
      ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,300,300);
      const boxes=[{x:100,y:60,w:80,h:130,l:'Player',c:'#28c840'},{x:200,y:40,w:60,h:100,l:'Enemy',c:'#ff5f57'},{x:40,y:140,w:70,h:110,l:'Item',c:'#febc2e'}];
      boxes.forEach(b=>{
        ctx.strokeStyle=b.c;ctx.lineWidth=2;ctx.strokeRect(b.x,b.y,b.w,b.h);
        const cs=12;
        ctx.beginPath();
        ctx.moveTo(b.x,b.y+cs);ctx.lineTo(b.x,b.y);ctx.lineTo(b.x+cs,b.y);
        ctx.moveTo(b.x+b.w-cs,b.y);ctx.lineTo(b.x+b.w,b.y);ctx.lineTo(b.x+b.w,b.y+cs);
        ctx.moveTo(b.x+b.w,b.y+b.h-cs);ctx.lineTo(b.x+b.w,b.y+b.h);ctx.lineTo(b.x+b.w-cs,b.y+b.h);
        ctx.moveTo(b.x+cs,b.y+b.h);ctx.lineTo(b.x,b.y+b.h);ctx.lineTo(b.x,b.y+b.h-cs);
        ctx.stroke();
        ctx.fillStyle='#fff';ctx.font='10px monospace';ctx.fillText(b.l,b.x+2,b.y-5);
      });
      this.espWindow.appendChild(canvas);
      
      const info=document.createElement('div');
      css(info,{padding:'8px',color:T.text.disabled,fontSize:'9px',textAlign:'center',borderTop:'1px solid '+T.border.primary});
      info.textContent='ESP Preview - Real-time overlay';
      this.espWindow.appendChild(info);
      document.body.appendChild(this.espWindow);
    }

    hideEsp() {
      if(this.espWindow){this.espWindow.remove();this.espWindow=null;}
      this.espEnabled=false;
    }

    // Tabs API
    addTab(icon) {
      const tab={button:null,content:null,subTabsContainer:null,subTabs:[]};
      tab.button=document.createElement('div');
      tab.button.innerHTML=I[icon]||I.home;
      css(tab.button,{width:'50px',height:'40px',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all 0.2s',border:'1px solid transparent',background:'transparent',color:T.text.secondary,opacity:'0.5'});
      tab.content=document.createElement('div');
      css(tab.content,{position:'absolute',top:'0',left:'0',width:'100%',height:'100%',display:'none'});
      tab.subTabsContainer=document.createElement('div');
      css(tab.subTabsContainer,{display:'none',alignItems:'center',height:'100%'});
      
      tab.button.onclick=()=>{
        if(this.activeTab===tab)return;
        if(this.activeTab){
          css(this.activeTab.button,{background:'transparent',border:'1px solid transparent',width:'50px',height:'40px',opacity:'0.5',color:T.text.secondary});
          this.activeTab.content.style.display='none';
          this.activeTab.subTabsContainer.style.display='none';
        }
        css(tab.button,{background:'rgba(124,77,255,0.08)',border:'1px solid '+T.border.secondary,width:'55px',height:'45px',opacity:'1',color:T.text.primary});
        tab.content.style.display='block';
        tab.subTabsContainer.style.display='flex';
        this.activeTab=tab;
        if(tab.subTabs.length>0)this.activateSubTab(tab.subTabs[0]);
      };
      
      this.tabsContainer.appendChild(tab.button);
      this.tabContentContainer.appendChild(tab.content);
      this.subTabsContainer.appendChild(tab.subTabsContainer);
      this.tabs.push(tab);
      if(this.tabs.length===1)tab.button.click();
      return {addSubTab:(n)=>this.addSubTab(tab,n)};
    }

    addSubTab(parent,name) {
      const sub={button:null,content:null,left:null,right:null};
      sub.button=document.createElement('div');
      sub.button.textContent=name;
      css(sub.button,{padding:'4px 10px',borderRadius:'8px',cursor:'pointer',fontSize:'11px',color:T.text.secondary,transition:'all 0.2s',whiteSpace:'nowrap',height:'25px',display:'flex',alignItems:'center'});
      sub.content=document.createElement('div');
      css(sub.content,{display:'none',width:'100%',height:'100%'});
      const scroll=document.createElement('div');
      css(scroll,{width:'100%',height:'100%',overflowY:'auto',padding:'2px',display:'flex',flexWrap:'wrap',alignContent:'flex-start',gap:'12px'});
      scroll.className='aic-scroll';
      sub.left=document.createElement('div');
      css(sub.left,{width:'calc(50% - 6px)',display:'flex',flexDirection:'column',gap:'12px',minWidth:'220px'});
      sub.right=document.createElement('div');
      css(sub.right,{width:'calc(50% - 6px)',display:'flex',flexDirection:'column',gap:'12px',minWidth:'220px'});
      scroll.appendChild(sub.left);scroll.appendChild(sub.right);
      sub.content.appendChild(scroll);
      
      sub.button.onclick=()=>this.activateSubTab(sub);
      
      parent.subTabsContainer.appendChild(sub.button);
      parent.content.appendChild(sub.content);
      parent.subTabs.push(sub);
      if(parent.subTabs.length===1)this.activateSubTab(sub);
      return {addSection:(h,s)=>this.addSection(sub,h,s)};
    }

    activateSubTab(sub) {
      if(this.activeSubTab===sub)return;
      if(this.activeSubTab){
        css(this.activeSubTab.button,{color:T.text.secondary,background:'transparent'});
        this.activeSubTab.content.style.display='none';
      }
      css(sub.button,{color:T.text.primary,background:'rgba(124,77,255,0.1)'});
      sub.content.style.display='block';
      this.activeSubTab=sub;
    }

    addSection(subData,header,side) {
      const col=side==='right'?subData.right:subData.left;
      const wrap=document.createElement('div');
      css(wrap,{width:'100%',display:'flex',flexDirection:'column',gap:'0'});
      if(header){
        const h=document.createElement('div');
        h.textContent=header;
        css(h,{fontSize:'9px',color:T.text.disabled,padding:'0 4px 8px 4px',textTransform:'uppercase',letterSpacing:'1.5px',fontWeight:'700'});
        wrap.appendChild(h);
      }
      const card=document.createElement('div');
      css(card,{width:'100%',background:T.bg.card,borderRadius:'7px',border:'1px solid '+T.border.primary,padding:'10px',display:'flex',flexDirection:'column',gap:'10px'});
      wrap.appendChild(card);
      col.appendChild(wrap);
      
      const self=this;
      return {
        addButton:(n,cb)=>{
          const b=document.createElement('div');
          b.textContent=n;
          css(b,{width:'100%',height:'32px',background:T.bg.input,borderRadius:'7px',border:'1px solid '+T.border.secondary,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'11px',color:T.text.secondary,transition:'all 0.15s'});
          b.onmouseenter=()=>{b.style.background=T.hover;b.style.color=T.text.primary;b.style.borderColor=T.border.accent;};
          b.onmouseleave=()=>{b.style.background=T.bg.input;b.style.color=T.text.secondary;b.style.borderColor=T.border.secondary;};
          b.onclick=()=>{if(cb)cb();};
          card.appendChild(b);
        },
        addToggle:(n,d,cb)=>{
          let v=d||false;
          const f=document.createElement('div');
          css(f,{width:'100%',height:'28px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'});
          const l=document.createElement('span');l.textContent=n;css(l,{fontSize:'11px',color:T.text.secondary});f.appendChild(l);
          const sw=document.createElement('div');
          css(sw,{width:'36px',height:'16px',background:T.bg.input,borderRadius:'8px',border:'1px solid '+T.border.secondary,position:'relative',transition:'all 0.25s'});
          const th=document.createElement('div');
          css(th,{width:'12px',height:'12px',background:T.text.disabled,borderRadius:'3px',position:'absolute',left:'1px',top:'50%',transform:'translateY(-50%)',transition:'all 0.25s'});
          sw.appendChild(th);
          const up=()=>{if(v){sw.style.background='linear-gradient(135deg,'+T.accent.dark+','+T.accent.main+')';sw.style.borderColor=T.accent.main;th.style.background='#fff';th.style.left='21px';}else{sw.style.background=T.bg.input;sw.style.borderColor=T.border.secondary;th.style.background=T.text.disabled;th.style.left='1px';}};
          up();
          f.onclick=()=>{v=!v;up();if(cb)cb(v);self.notifs.info(n,v?'Enabled':'Disabled',1500);};
          f.appendChild(sw);card.appendChild(f);
        },
        addCheckbox:(n,d,cb)=>{
          let v=d||false;
          const f=document.createElement('div');
          css(f,{width:'100%',height:'28px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'});
          const l=document.createElement('span');l.textContent=n;css(l,{fontSize:'11px',color:T.text.secondary});f.appendChild(l);
          const box=document.createElement('div');
          css(box,{width:'18px',height:'18px',background:T.bg.input,borderRadius:'4px',border:'1px solid '+T.border.secondary,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.25s'});
          const ic=document.createElement('div');ic.innerHTML=I.check;
          css(ic,{width:'12px',height:'12px',opacity:'0',transition:'opacity 0.25s',color:T.text.primary});
          box.appendChild(ic);
          const up=()=>{if(v){box.style.borderColor=T.accent.main;box.style.background='rgba(124,77,255,0.15)';ic.style.opacity='1';}else{box.style.borderColor=T.border.secondary;box.style.background=T.bg.input;ic.style.opacity='0';}};
          up();
          f.onclick=()=>{v=!v;up();if(cb)cb(v);};
          f.appendChild(box);card.appendChild(f);
        },
        addSlider:(n,d,mn,mx,cb)=>{
          let v=d||50;const min=mn||0,max=mx||100;
          const f=document.createElement('div');
          css(f,{width:'100%',height:'28px',display:'flex',alignItems:'center',gap:'8px'});
          const l=document.createElement('span');l.textContent=n;css(l,{fontSize:'11px',color:T.text.secondary,whiteSpace:'nowrap',minWidth:'55px'});f.appendChild(l);
          const tr=document.createElement('div');
          css(tr,{flex:'1',height:'16px',display:'flex',alignItems:'center',cursor:'pointer',position:'relative'});
          const bg=document.createElement('div');
          css(bg,{width:'100%',height:'2px',background:T.border.secondary,borderRadius:'2px',position:'relative'});
          const fl=document.createElement('div');
          css(fl,{width:'50%',height:'100%',background:T.accent.main,borderRadius:'2px',transition:'width 0.05s'});
          bg.appendChild(fl);
          const th=document.createElement('div');
          css(th,{width:'12px',height:'12px',borderRadius:'50%',background:T.text.primary,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',transition:'left 0.05s',boxShadow:'0 1px 3px rgba(0,0,0,0.5)'});
          bg.appendChild(th);tr.appendChild(bg);
          const disp=document.createElement('span');
          css(disp,{fontSize:'10px',color:T.text.secondary,minWidth:'35px',textAlign:'right'});disp.textContent=Math.round(v);f.appendChild(disp);
          const up=(val)=>{const p=((val-min)/(max-min))*100;fl.style.width=p+'%';th.style.left=p+'%';disp.textContent=Math.round(val);};
          up(v);
          const gv=(e)=>{const r=bg.getBoundingClientRect();const p=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));return Math.round(min+(p/100)*(max-min));};
          let dr=false;
          tr.onmousedown=(e)=>{dr=true;v=gv(e);up(v);if(cb)cb(v);e.preventDefault();};
          document.onmousemove=(e)=>{if(dr){v=gv(e);up(v);if(cb)cb(v);}};
          document.onmouseup=()=>{dr=false;};
          f.appendChild(tr);card.appendChild(f);
        },
        addDropdown:(n,vals,d,cb)=>{
          const values=vals||[];let sel=d||values[0]||'';
          const f=document.createElement('div');
          css(f,{width:'100%',minHeight:'30px',background:T.bg.input,borderRadius:'7px',border:'1px solid '+T.border.secondary,cursor:'pointer',position:'relative',transition:'all 0.2s',overflow:'hidden'});
          const hdr=document.createElement('div');
          css(hdr,{height:'30px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 8px'});
          const hdrLbl=document.createElement('span');
          hdrLbl.textContent=n+': '+sel;
          css(hdrLbl,{fontSize:'11px',color:T.text.secondary,flex:'1',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'});
          hdr.appendChild(hdrLbl);
          const chev=document.createElement('div');
          chev.innerHTML=I.chevronDown;
          css(chev,{width:'12px',height:'12px',color:T.text.disabled,transition:'transform 0.25s',transform:'rotate(180deg)'});
          hdr.appendChild(chev);
          const opts=document.createElement('div');
          css(opts,{width:'100%',maxHeight:'0',overflow:'hidden',borderTop:'1px solid transparent',padding:'0 8px',transition:'all 0.3s'});
          let open=false;
          const build=()=>{
            opts.innerHTML='';
            values.forEach(v=>{
              const o=document.createElement('div');
              o.textContent=v;
              css(o,{width:'100%',height:'28px',display:'flex',alignItems:'center',padding:'0 8px',fontSize:'11px',color:v===sel?T.text.primary:T.text.secondary,cursor:'pointer',borderRadius:'6px',background:v===sel?'rgba(124,77,255,0.08)':'transparent',transition:'all 0.15s',marginBottom:'2px'});
              o.onmouseenter=()=>{if(v!==sel)o.style.background=T.hover;};
              o.onmouseleave=()=>{if(v!==sel)o.style.background='transparent';};
              o.onclick=(e)=>{e.stopPropagation();sel=v;hdrLbl.textContent=n+': '+v;build();close();if(cb)cb(v);self.notifs.info(n,v,1500);};
              opts.appendChild(o);
            });
          };
          build();
          const opDd=()=>{open=true;opts.style.maxHeight=(values.length*30+16)+'px';opts.style.borderTop='1px solid '+T.border.secondary;opts.style.padding='8px';chev.style.transform='rotate(0deg)';f.style.borderColor=T.accent.main;};
          const close=()=>{open=false;opts.style.maxHeight='0';opts.style.borderTop='1px solid transparent';opts.style.padding='0 8px';chev.style.transform='rotate(180deg)';f.style.borderColor=T.border.secondary;};
          hdr.onclick=(e)=>{e.stopPropagation();open?close():opDd();};
          document.addEventListener('click',()=>{if(open)close();});
          f.appendChild(hdr);f.appendChild(opts);card.appendChild(f);
        },
        addInput:(n,p,cb)=>{
          const f=document.createElement('div');
          css(f,{width:'100%',height:'28px',display:'flex',alignItems:'center',gap:'8px'});
          const l=document.createElement('span');l.textContent=n;css(l,{fontSize:'11px',color:T.text.secondary,whiteSpace:'nowrap',minWidth:'55px'});f.appendChild(l);
          const inp=document.createElement('input');
          inp.placeholder=p||'';
          css(inp,{flex:'1',height:'100%',background:T.bg.input,border:'1px solid '+T.border.secondary,borderRadius:'6px',color:T.text.primary,fontSize:'11px',padding:'0 8px',outline:'none',transition:'border-color 0.2s'});
          inp.onfocus=()=>inp.style.borderColor=T.accent.main;
          inp.onblur=()=>inp.style.borderColor=T.border.secondary;
          inp.onchange=()=>{if(cb)cb(inp.value);};
          f.appendChild(inp);card.appendChild(f);
        },
        addKeybind:(n,d,cb)=>{
          let key=d||'None',listening=false;
          const f=document.createElement('div');
          css(f,{width:'100%',height:'28px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'});
          const l=document.createElement('span');l.textContent=n;css(l,{fontSize:'11px',color:T.text.secondary});f.appendChild(l);
          const bd=document.createElement('div');
          bd.textContent='['+key+']';
          css(bd,{padding:'3px 8px',background:T.bg.input,borderRadius:'5px',border:'1px solid '+T.border.secondary,fontSize:'10px',color:T.accent.main,transition:'all 0.2s',minWidth:'60px',textAlign:'center'});
          f.appendChild(bd);
          f.onclick=()=>{
            listening=true;bd.textContent='[...]';bd.style.borderColor=T.accent.main;
            const onKey=(e)=>{if(!listening)return;e.preventDefault();e.stopPropagation();key=e.key||e.code;bd.textContent='['+key+']';bd.style.borderColor=T.border.secondary;listening=false;if(cb)cb(key);self.notifs.info(n,'Bound: '+key,1500);document.removeEventListener('keydown',onKey);};
            document.addEventListener('keydown',onKey);
          };
          card.appendChild(f);
        },
        addColorPicker:(n,d,cb)=>{
          const w=document.createElement('div');
          css(w,{width:'100%',display:'flex',flexDirection:'column',gap:'4px'});
          if(n){const l=document.createElement('div');l.textContent=n;css(l,{fontSize:'9px',color:T.text.disabled,textTransform:'uppercase',letterSpacing:'1px',fontWeight:'700'});w.appendChild(l);}
          new ColorPicker(w,d||'#7c4dff',cb);
          card.appendChild(w);
        },
        addRadioGroup:(n,opts,d,cb)=>{
          let sel=d||(opts[0]?opts[0].value:null);
          const group=[];
          const w=document.createElement('div');
          css(w,{width:'100%',display:'flex',flexDirection:'column',gap:'4px'});
          if(n){const l=document.createElement('div');l.textContent=n;css(l,{fontSize:'9px',color:T.text.disabled,textTransform:'uppercase',letterSpacing:'1px',fontWeight:'700',marginBottom:'2px'});w.appendChild(l);}
          (opts||[]).forEach(o=>{
            const of=document.createElement('div');
            css(of,{width:'100%',height:'24px',display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'});
            const cir=document.createElement('div');
            css(cir,{width:'14px',height:'14px',borderRadius:'50%',border:'1px solid '+T.border.secondary,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s',minWidth:'14px'});
            const dot=document.createElement('div');
            css(dot,{width:'8px',height:'8px',borderRadius:'50%',background:T.accent.main,opacity:'0',transition:'opacity 0.2s'});
            cir.appendChild(dot);
            const lb=document.createElement('span');
            lb.textContent=o.label||o.value;css(lb,{fontSize:'11px',color:T.text.secondary});
            const up=()=>{
              if(sel===o.value){cir.style.borderColor=T.accent.main;dot.style.opacity='1';lb.style.color=T.text.primary;}
              else{cir.style.borderColor=T.border.secondary;dot.style.opacity='0';lb.style.color=T.text.secondary;}
            };
            up();
            of.onclick=()=>{sel=o.value;group.forEach(g=>g.up());if(cb)cb(sel);};
            of.appendChild(cir);of.appendChild(lb);w.appendChild(of);
            group.push({up});
          });
          card.appendChild(w);
        },
        addEspToggle:(n,d,cb)=>{
          let v=d||false;
          const f=document.createElement('div');
          css(f,{width:'100%',height:'28px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'});
          const l=document.createElement('span');l.textContent=n||'ESP Preview';css(l,{fontSize:'11px',color:T.text.secondary});f.appendChild(l);
          const sw=document.createElement('div');
          css(sw,{width:'36px',height:'16px',background:T.bg.input,borderRadius:'8px',border:'1px solid '+T.border.secondary,position:'relative',transition:'all 0.25s'});
          const th=document.createElement('div');
          css(th,{width:'12px',height:'12px',background:T.text.disabled,borderRadius:'3px',position:'absolute',left:'1px',top:'50%',transform:'translateY(-50%)',transition:'all 0.25s'});
          sw.appendChild(th);
          const up=()=>{if(v){sw.style.background='linear-gradient(135deg,'+T.accent.dark+','+T.accent.main+')';sw.style.borderColor=T.accent.main;th.style.background='#fff';th.style.left='21px';}else{sw.style.background=T.bg.input;sw.style.borderColor=T.border.secondary;th.style.background=T.text.disabled;th.style.left='1px';}};
          up();
          f.onclick=()=>{v=!v;up();self.espEnabled=v;if(v)self.showEsp();else self.hideEsp();if(cb)cb(v);};
          f.appendChild(sw);card.appendChild(f);
        }
      };
    }
  }

  window.AICODE = { Window, Notifications, ColorPicker, VERSION, createWindow: (s) => new Window(s) };
  console.log('[AICODE v'+VERSION+'] Library loaded!');
})();

// ============================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================
(function() {
  if (typeof AICODE === 'undefined') { console.error('AICODE not loaded'); return; }
  
  const win = AICODE.createWindow({ KeyBind: 'F2' });
  win.notifs.info('AICODE', 'Library v' + AICODE.VERSION + ' loaded!', 3000);

  // Home Tab
  const home = win.addTab('home');
  const general = home.addSubTab('General');
  
  const ctrl = general.addSection('Controls', 'left');
  ctrl.addButton('Execute', () => win.notifs.info('Script', 'Executed!', 1500));
  ctrl.addToggle('Enable Mod', false, (v) => console.log('Mod:', v));
  ctrl.addCheckbox('Auto Start', true, (v) => console.log('Auto:', v));
  
  const vals = general.addSection('Values', 'right');
  vals.addSlider('Volume', 75, 0, 100, (v) => console.log('Volume:', v));
  vals.addDropdown('Mode', ['Easy', 'Normal', 'Hard'], 'Normal', (v) => console.log('Mode:', v));
  vals.addInput('Username', 'Player', (v) => console.log('Input:', v));
  vals.addKeybind('Action Key', 'E', (k) => console.log('Key:', k));
  
  // ESP SubTab
  const esp = home.addSubTab('ESP');
  const espS = esp.addSection('ESP Settings', 'left');
  espS.addEspToggle('Enable ESP', false, (v) => console.log('ESP:', v));
  espS.addToggle('Box ESP', true, (v) => console.log('Box:', v));
  espS.addToggle('Skeleton', false, (v) => console.log('Skel:', v));
  espS.addColorPicker('Box Color', '#28c840', (v) => console.log('Color:', v));
  espS.addRadioGroup('Target', [{label:'Enemies',value:'enemies'},{label:'All',value:'all'}], 'enemies', (v) => console.log('Target:', v));
  
  // Settings Tab
  const set = win.addTab('settings');
  const cfg = set.addSubTab('Config');
  const theme = cfg.addSection('Theme', 'left');
  theme.addColorPicker('Accent', '#7c4dff', (v) => console.log('Accent:', v));
  theme.addSlider('Opacity', 100, 50, 100, (v) => console.log('Opacity:', v));
  theme.addRadioGroup('Font', [{label:'Mono',value:'mono'},{label:'Sans',value:'sans'}], 'mono', (v) => console.log('Font:', v));
  
  console.log('[AICODE] Demo loaded successfully!');
})();
