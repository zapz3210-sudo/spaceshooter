<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Stellar Vanguard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden;background:#000;color:#cfefff;font-family:'Rajdhani',system-ui,sans-serif;user-select:none;-webkit-user-select:none}
#gl,#hud{position:fixed;inset:0;width:100%;height:100%;display:block}
#hud{z-index:2}
.screen{position:fixed;inset:0;z-index:10;display:none;align-items:center;justify-content:center;background:radial-gradient(ellipse at center,rgba(3,10,24,.45),rgba(0,0,0,.82))}
.screen.on{display:flex}
.panel{position:relative;background:linear-gradient(180deg,rgba(9,22,42,.94),rgba(3,9,20,.96));border:1px solid rgba(72,229,255,.35);box-shadow:0 0 50px rgba(72,229,255,.12),inset 0 0 40px rgba(72,229,255,.05);padding:28px 34px;max-width:94vw;max-height:94vh;overflow:auto;clip-path:polygon(0 16px,16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%)}
h1,h2,h3{font-family:Orbitron,sans-serif;letter-spacing:.12em}
h2{font-size:26px;color:#7ff0ff;margin-bottom:6px}
h3{font-size:14px;color:#ffb347;margin:14px 0 8px;letter-spacing:.2em}
.sub{color:#8fb7c9;font-size:16px;letter-spacing:.08em}
.btn{font-family:Orbitron,sans-serif;font-size:14px;letter-spacing:.16em;background:rgba(72,229,255,.08);border:1px solid rgba(72,229,255,.55);color:#c6f6ff;padding:12px 26px;cursor:pointer;transition:all .15s;clip-path:polygon(0 8px,8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)}
.btn:hover{background:rgba(72,229,255,.25);box-shadow:0 0 18px rgba(72,229,255,.4);color:#fff}
.btn.primary{border-color:#ffb347;color:#ffe2b8;background:rgba(255,160,50,.12)}
.btn.primary:hover{background:rgba(255,160,50,.3);box-shadow:0 0 22px rgba(255,170,60,.45)}
.btn:disabled{opacity:.3;cursor:not-allowed;box-shadow:none}
.row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
#title{background:radial-gradient(ellipse at 50% 60%,rgba(0,0,0,0),rgba(0,0,0,.7))}
#title .wrap{text-align:center;display:flex;flex-direction:column;align-items:center;gap:18px}
#title h1{font-size:clamp(38px,7.5vw,92px);font-weight:900;background:linear-gradient(180deg,#fff 10%,#7ff0ff 55%,#2a7bd6);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 24px rgba(72,229,255,.45));line-height:1}
#title .tag{font-family:Orbitron;letter-spacing:.5em;color:#ffb347;font-size:clamp(11px,1.4vw,15px)}
.controls{display:grid;grid-template-columns:auto auto auto auto;gap:4px 18px;font-size:15px;text-align:left;margin-top:6px;color:#9fd4e6}
.controls b{color:#fff;font-weight:700;font-family:Orbitron;font-size:11px;letter-spacing:.1em;background:rgba(72,229,255,.12);padding:2px 6px;border:1px solid rgba(72,229,255,.3)}
.note{font-size:13px;color:#6f93a6;max-width:640px}
#lockPrompt{position:fixed;left:50%;top:58%;transform:translate(-50%,-50%);z-index:5;font-family:Orbitron;letter-spacing:.2em;font-size:15px;color:#fff;background:rgba(0,20,40,.7);border:1px solid #48e5ff;padding:12px 22px;display:none;pointer-events:none;animation:pulse 1.2s infinite}
@keyframes pulse{50%{opacity:.55}}
.set{display:grid;grid-template-columns:150px 220px;gap:10px 16px;align-items:center;margin:12px 0 18px;font-size:16px}
input[type=range]{width:100%;accent-color:#48e5ff}
select{background:#08182c;color:#cfefff;border:1px solid #2f6f86;padding:6px;font-family:Rajdhani;font-size:15px}
/* terminal */
#termScr .panel{width:560px;border-color:rgba(255,120,60,.55)}
#termScr h2{color:#ff9a5c}
#termBody{margin:14px 0;min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
#termStatus{font-family:Orbitron;font-size:12px;letter-spacing:.14em;color:#ffb38a;min-height:18px;text-align:center}
#termStatus.ok{color:#5dff9b}
#termStatus.bad{color:#ff5d6c}
.tcanvas{background:#020b10;border:1px solid rgba(72,229,255,.25);max-width:100%;cursor:crosshair}
.glyphs{display:grid;grid-template-columns:repeat(3,84px);gap:10px}
.glyph{height:84px;font-size:34px;background:#04141c;border:1px solid #1d5568;color:#5fd7ef;cursor:pointer;transition:all .08s;font-family:sans-serif}
.glyph.lit{background:#48e5ff;color:#001018;box-shadow:0 0 24px #48e5ff}
.glyph.bad{background:#ff3d55;color:#fff}
.dots{display:flex;gap:8px}.dots span{width:12px;height:12px;border:1px solid #48e5ff}.dots span.on{background:#48e5ff}
.sl{width:100%;display:grid;grid-template-columns:110px 1fr 54px;gap:10px;align-items:center;font-family:Orbitron;font-size:11px;letter-spacing:.1em}
/* map */
#mapScr{background:rgba(0,0,0,.92)}
#mapWrap{position:relative;width:100%;height:100%}
#mapCv{position:absolute;inset:0;width:100%;height:100%}
#mapSide{position:absolute;right:24px;top:24px;width:300px;max-width:42vw}
#mapSide .panel{padding:20px 22px}
#mapInfo{font-size:16px;line-height:1.45;margin:10px 0 16px;color:#a9d8e8}
#mapInfo .k{color:#6e95a8}
#mapHint{position:absolute;left:24px;top:22px;font-family:Orbitron;letter-spacing:.2em;font-size:13px;color:#7ff0ff}
/* shop */
#shopScr .panel{width:640px}
.upg{display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid rgba(72,229,255,.12)}
.upg .nm{font-weight:700;font-size:18px;color:#e6fbff}.upg .ds{font-size:14px;color:#7fa8ba}
.pips{display:flex;gap:3px}.pips i{width:10px;height:10px;border:1px solid #48e5ff}.pips i.on{background:#48e5ff}
.cr{font-family:Orbitron;color:#ffd27a;letter-spacing:.1em}
.btn.sm{padding:7px 14px;font-size:11px}
#errBox{position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:50;background:#000;color:#fff;font-size:18px;padding:30px;text-align:center}
.big{font-size:clamp(30px,5vw,60px);font-family:Orbitron;font-weight:900;letter-spacing:.1em}
.stats{font-size:17px;line-height:1.6;color:#a9d8e8;margin:14px 0 20px}
#lounge{position:fixed;inset:0;z-index:8;display:none;pointer-events:none}
#lounge.on{display:block}
#lounge .lp{position:absolute;pointer-events:auto;background:linear-gradient(180deg,rgba(14,14,40,.86),rgba(5,6,20,.9));border:1px solid rgba(255,140,225,.38);padding:14px 18px;box-shadow:0 0 40px rgba(255,100,220,.12)}
#lHead{top:16px;left:50%;transform:translateX(-50%);text-align:center;padding:10px 28px!important}
#lLeft{left:16px;top:96px;width:290px;bottom:16px;overflow:auto}
#lRight{right:16px;top:96px;width:340px;bottom:16px;display:flex;flex-direction:column}
#lounge h3{color:#ff9be8}
#chatLog{flex:1;overflow-y:auto;font-size:16px;line-height:1.35;padding-right:6px;user-select:text;-webkit-user-select:text}
#chatLog .m{margin:4px 0;word-wrap:break-word;overflow-wrap:anywhere}#chatLog .nm{font-weight:700}#chatLog .sys{color:#8a93c4;font-style:italic;font-size:14px}
.chatIn{display:flex;gap:8px;margin-top:10px}.chatIn input{flex:1;min-width:0}
.tin{background:#070f20;border:1px solid #3d5a8a;color:#e8fbff;padding:9px 10px;font-family:Rajdhani,sans-serif;font-size:16px;outline:none;user-select:text;-webkit-user-select:text}
.tin:focus{border-color:#ff9be8;box-shadow:0 0 12px rgba(255,155,232,.3)}
.pilot{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:16px}.pilot i{width:10px;height:10px;border-radius:50%;flex:none}.pilot .st{margin-left:auto;font-size:13px;color:#8a93c4;text-align:right}
.swatches{display:flex;gap:7px;flex-wrap:wrap}.sw{width:28px;height:28px;cursor:pointer;border:2px solid rgba(255,255,255,.15)}.sw.on{border-color:#fff;box-shadow:0 0 10px rgba(255,255,255,.6)}
.emotes{display:grid;grid-template-columns:1fr 1fr;gap:7px}.emotes .btn{padding:8px 6px;font-size:10px}
#flyChat{position:fixed;left:3%;bottom:26%;z-index:6;display:none}#flyChat input{width:min(420px,80vw)}
@media (max-width:820px){#lLeft{width:44vw}#lRight{width:46vw}}
</style>
</head>
<body>
<canvas id="gl"></canvas>
<canvas id="hud"></canvas>
<div id="lockPrompt">CLICK TO TAKE CONTROL</div>

<div id="title" class="screen on">
  <div class="wrap">
    <div class="tag">A GALAXY SEVERED · ONE PILOT</div>
    <h1>STELLAR<br>VANGUARD</h1>
    <div class="row" style="justify-content:center;margin-top:4px"><span class="sub" style="font-family:Orbitron;font-size:12px;letter-spacing:.2em">CALLSIGN</span><input id="tName" class="tin" maxlength="16" style="width:200px;text-align:center"></div>
    <div class="sub" id="tNet" style="font-size:14px">Connecting…</div>
    <div class="row" style="justify-content:center;margin-top:4px">
      <button class="btn primary" id="bNew">NEW GAME</button>
      <button class="btn" id="bCont" style="display:none">CONTINUE</button>
    </div>
    <div class="panel" style="padding:18px 26px;margin-top:8px">
      <div class="controls">
        <b>MOUSE</b><span>Aim / steer</span><b>LMB</b><span>Fire</span>
        <b>W / S</b><span>Thrust / reverse</span><b>A / D</b><span>Strafe</span>
        <b>SPACE / C</b><span>Up / down</span><b>Q / E</b><span>Roll</span>
        <b>SHIFT</b><span>Afterburner</span><b>H</b><span>Cruise drive</span>
        <b>1-6 / WHEEL</b><span>Switch weapon</span><b>F</b><span>Interact / repair</span>
        <b>M</b><span>Galaxy map</span><b>U</b><span>Station upgrades</span>
        <b>T</b><span>Lock target</span><b>ESC / P</b><span>Pause</span>
        <b>ENTER</b><span>Chat with pilots</span><b>F @ HAVEN</b><span>Dock &amp; walk inside</span>
      </div>
    </div>
    <div class="note">The mouse is captured while flying (press ESC to release it). Repair the broken relay terminals in each system to bring the jump beacons back online, collect new weapons, and push through to the Leviathan at THE MAW.</div>
  </div>
</div>

<div id="pauseScr" class="screen">
  <div class="panel" style="width:460px">
    <h2>PAUSED</h2>
    <div class="sub" id="pauseSub">Systems on standby.</div>
    <div class="set">
      <span>Mouse sensitivity</span><input type="range" id="sSens" min="0.3" max="2.5" step="0.05">
      <span>Invert Y</span><select id="sInv"><option value="0">Off</option><option value="1">On</option></select>
      <span>Mouse mode</span><select id="sMode"><option value="lock">Captured (FPS)</option><option value="free">Free cursor steering</option></select>
      <span>Volume</span><input type="range" id="sVol" min="0" max="1" step="0.05">
    </div>
    <div class="row"><button class="btn primary" id="bResume">RESUME</button><button class="btn" id="bQuit">SAVE &amp; QUIT</button></div>
  </div>
</div>

<div id="termScr" class="screen">
  <div class="panel">
    <h2 id="termTitle">TERMINAL</h2>
    <div class="sub" id="termSub">System fault detected.</div>
    <div id="termBody"></div>
    <div id="termStatus"></div>
    <div class="row" style="justify-content:center;margin-top:14px">
      <button class="btn primary" id="termDone" style="display:none">RESUME FLIGHT ▶</button>
      <button class="btn" id="termAbort">ABORT [ESC]</button>
    </div>
  </div>
</div>

<div id="mapScr" class="screen">
  <div id="mapWrap">
    <canvas id="mapCv"></canvas>
    <div id="mapHint">GALAXY MAP · SELECT A SYSTEM</div>
    <div id="mapSide"><div class="panel">
      <h2 id="mapName" style="font-size:20px">—</h2>
      <div id="mapInfo"></div>
      <div class="row"><button class="btn primary" id="bJump">ENGAGE JUMP</button><button class="btn" id="bMapClose">CLOSE [M]</button></div>
    </div></div>
  </div>
</div>

<div id="shopScr" class="screen">
  <div class="panel">
    <h2>STATION SERVICES</h2>
    <div class="row" style="justify-content:space-between"><span class="sub">Spend salvage credits on ship upgrades.</span><span class="cr" id="shopCr"></span></div>
    <div id="shopList" style="margin:12px 0"></div>
    <div class="row" id="shopSvc"></div>
    <div class="row" style="margin-top:16px"><button class="btn primary" id="bShopClose">LAUNCH [U]</button></div>
  </div>
</div>

<div id="deadScr" class="screen">
  <div class="panel" style="text-align:center;width:480px">
    <div class="big" style="color:#ff5d6c">SHIP LOST</div>
    <div class="stats" id="deadStats"></div>
    <button class="btn primary" id="bRespawn">RESPAWN</button>
  </div>
</div>

<div id="winScr" class="screen">
  <div class="panel" style="text-align:center;width:560px">
    <div class="big" style="color:#7ff0ff">GALAXY RECLAIMED</div>
    <div class="stats" id="winStats"></div>
    <div class="row" style="justify-content:center"><button class="btn primary" id="bWinCont">KEEP EXPLORING</button><button class="btn" id="bWinTitle">TITLE SCREEN</button></div>
  </div>
</div>

<div id="lounge">
  <div class="lp" id="lHead"><h2 style="color:#ff9be8;margin:0;font-size:22px">HAVEN LOUNGE</h2><div class="sub" id="lNet" style="font-size:14px"></div></div>
  <div class="lp" id="lLeft">
    <h3 style="margin-top:2px">PILOTS IN THE NETWORK</h3><div id="lPilots"></div>
    <h3>CALLSIGN</h3><input id="lName" class="tin" maxlength="16" style="width:100%">
    <h3>SHIP PAINT</h3><div class="swatches" id="lPaint"></div>
    <h3>EMOTES</h3><div class="emotes"><button class="btn sm" data-e="wave">👋 WAVE</button><button class="btn sm" data-e="spin">🕺 DANCE</button><button class="btn sm" data-e="fire">🎆 FIREWORKS</button><button class="btn sm" data-e="love">💖 HEARTS</button></div>
    <h3>VIBES</h3><button class="btn sm" id="lJuke">♫ LOUNGE FM: ON</button>
    <div class="row" style="margin-top:18px"><button class="btn primary" id="lBack">◀ BACK TO CONCOURSE</button></div>
    <div class="row" style="margin-top:10px"><button class="btn sm" id="lUndock">BOARD SHIP &amp; UNDOCK</button></div>
  </div>
  <div class="lp" id="lRight"><h3 style="margin-top:2px">HAVEN COMMS</h3><div id="chatLog"></div>
    <div class="chatIn"><input id="lChat" class="tin" maxlength="140" placeholder="Say something…"><button class="btn sm" id="lSend">SEND</button></div></div>
</div>
<div id="flyChat"><input id="fChat" class="tin" maxlength="140" placeholder="Message all pilots — Enter to send"></div>
<div id="errBox"></div>

<script>
'use strict';
// =====================================================================
//  STELLAR VANGUARD — a first-person space combat & exploration game
//  Custom WebGL2 renderer, no external libraries.
// =====================================================================
const $=id=>document.getElementById(id);
const TAU=Math.PI*2, DEG=Math.PI/180;
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const lerp=(a,b,t)=>a+(b-a)*t;
const rand=(a=0,b=1)=>a+Math.random()*(b-a);
const pick=a=>a[(Math.random()*a.length)|0];
function RNG(seed){let s=(seed>>>0)||1;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];}return a;}

// ---------- vec3 ----------
const vadd=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const vsub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const vscale=(a,s)=>[a[0]*s,a[1]*s,a[2]*s];
const vmadd=(a,b,s)=>[a[0]+b[0]*s,a[1]+b[1]*s,a[2]+b[2]*s];
const vdot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const vcross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const vlen=a=>Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
const vdist=(a,b)=>Math.sqrt((a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2);
const vnorm=a=>{const l=vlen(a);return l>1e-9?[a[0]/l,a[1]/l,a[2]/l]:[0,0,1];};
const vlerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
function randUnit(r=Math.random){const z=r()*2-1,a=r()*TAU,s=Math.sqrt(1-z*z);return[s*Math.cos(a),z,s*Math.sin(a)];}
function eul(v,rot){let[x,y,z]=v;const[rx,ry,rz]=rot;
  if(rx){const c=Math.cos(rx),s=Math.sin(rx);[y,z]=[y*c-z*s,y*s+z*c];}
  if(ry){const c=Math.cos(ry),s=Math.sin(ry);[x,z]=[x*c+z*s,-x*s+z*c];}
  if(rz){const c=Math.cos(rz),s=Math.sin(rz);[x,y]=[x*c-y*s,x*s+y*c];}
  return[x,y,z];}
function orthonorm(o){o.f=vnorm(o.f);let r=vcross(o.f,o.u);if(vlen(r)<1e-6)r=vcross(o.f,Math.abs(o.f[1])<0.9?[0,1,0]:[1,0,0]);r=vnorm(r);o.u=vnorm(vcross(r,o.f));}
const rightOf=o=>vnorm(vcross(o.f,o.u));
function localToWorld(o,v,s=1){const l=vcross(o.u,o.f);return[o.pos[0]+(l[0]*v[0]+o.u[0]*v[1]+o.f[0]*v[2])*s,o.pos[1]+(l[1]*v[0]+o.u[1]*v[1]+o.f[1]*v[2])*s,o.pos[2]+(l[2]*v[0]+o.u[2]*v[1]+o.f[2]*v[2])*s];}

// ---------- mat4 (column major) ----------
function perspective(fovy,asp,n,f){const t=1/Math.tan(fovy/2),nf=1/(n-f);return new Float32Array([t/asp,0,0,0,0,t,0,0,0,0,(f+n)*nf,-1,0,0,2*f*n*nf,0]);}
function viewMat(p,f,u){const r=vnorm(vcross(f,u));return new Float32Array([r[0],u[0],-f[0],0,r[1],u[1],-f[1],0,r[2],u[2],-f[2],0,-vdot(r,p),-vdot(u,p),vdot(f,p),1]);}
function mul4(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s;}return o;}
function modelMat(p,f,u,s){const l=vcross(u,f);return new Float32Array([l[0]*s,l[1]*s,l[2]*s,0,u[0]*s,u[1]*s,u[2]*s,0,f[0]*s,f[1]*s,f[2]*s,0,p[0],p[1],p[2],1]);}
function axisMat(p,ax,ang,s){const[x,y,z]=ax,c=Math.cos(ang),si=Math.sin(ang),t=1-c;return new Float32Array([(t*x*x+c)*s,(t*x*y+si*z)*s,(t*x*z-si*y)*s,0,(t*x*y-si*z)*s,(t*y*y+c)*s,(t*y*z+si*x)*s,0,(t*x*z+si*y)*s,(t*y*z-si*x)*s,(t*z*z+c)*s,0,p[0],p[1],p[2],1]);}

// =====================================================================
//  WEBGL
// =====================================================================
const cv=$('gl'), hudCv=$('hud'), hx=hudCv.getContext('2d');
const gl=cv.getContext('webgl2',{antialias:true,powerPreference:'high-performance'});
function fatal(msg){const e=$('errBox');e.style.display='flex';e.innerHTML=msg;throw new Error(msg);}
if(!gl) fatal('Stellar Vanguard needs WebGL 2. Try a recent Chrome, Edge or Firefox with hardware acceleration on.');

function compile(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
function program(vs,fs){const p=gl.createProgram();gl.attachShader(p,compile(gl.VERTEX_SHADER,vs));gl.attachShader(p,compile(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));
  const u={};const n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const inf=gl.getActiveUniform(p,i);u[inf.name.replace('[0]','')]=gl.getUniformLocation(p,inf.name);}
  return{p,u};}

const NOISE_GLSL=`
float h3(vec3 p){p=fract(p*vec3(.1031,.1030,.0973));p+=dot(p,p.yxz+33.33);return fract((p.x+p.y)*p.z);}
float n3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*n3(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}
`;

const MESH_VS=`#version 300 es
layout(location=0) in vec3 aP;layout(location=1) in vec3 aN;layout(location=2) in vec3 aC;layout(location=3) in float aE;
uniform mat4 uVP;uniform mat4 uM;
out vec3 vN;out vec3 vC;out vec3 vW;out float vE;
void main(){vec4 w=uM*vec4(aP,1.);vW=w.xyz;vN=mat3(uM)*aN;vC=aC;vE=aE;gl_Position=uVP*w;}`;
const MESH_FS=`#version 300 es
precision highp float;
in vec3 vN;in vec3 vC;in vec3 vW;in float vE;
uniform vec3 uSun,uSunCol,uAmb,uCam,uTint,uEmCol;uniform float uFlash,uEmMul;
out vec4 o;
void main(){vec3 n=normalize(vN);vec3 L=normalize(uSun-vW);vec3 V=normalize(uCam-vW);
 if(dot(n,V)<0.)n=-n;
 float d=max(dot(n,L),0.);vec3 base=vC*uTint;
 vec3 col=base*(uAmb+uSunCol*d);
 vec3 H=normalize(L+V);col+=uSunCol*pow(max(dot(n,H),0.),40.)*.3;
 float rim=pow(1.-max(dot(n,V),0.),3.);col+=rim*uAmb*1.2;
 col=mix(col,vC*uEmCol*uEmMul,vE);
 col+=uFlash*vec3(1.,.85,.7);
 o=vec4(col,1.);}`;

const PLANET_VS=`#version 300 es
layout(location=0) in vec3 aP;
uniform mat4 uVP;uniform mat4 uM;
out vec3 vO;out vec3 vW;out vec3 vN;
void main(){vO=aP;vec4 w=uM*vec4(aP,1.);vW=w.xyz;vN=mat3(uM)*aP;gl_Position=uVP*w;}`;
const PLANET_FS=`#version 300 es
precision highp float;
in vec3 vO;in vec3 vW;in vec3 vN;
uniform int uType;uniform vec3 uA,uB,uC,uAtm,uSun,uCam,uSunCol;uniform float uSeed,uTime,uAlpha;
out vec4 o;
${NOISE_GLSL}
void main(){
 vec3 p=normalize(vO);vec3 n=normalize(vN);vec3 V=normalize(uCam-vW);vec3 L=normalize(uSun-vW);
 vec3 sp=p*2.+vec3(uSeed);
 vec3 col;float em=0.;
 if(uType==5){float f=fbm(p*5.+vec3(uTime*.03));float g=fbm(p*13.-vec3(uTime*.05));col=mix(uA,uB,f)*(1.3+g*.9);
   float rim=pow(1.-max(dot(n,V),0.),2.);col+=uB*rim*1.4;o=vec4(col,1.);return;}
 if(uType==6){float fr=pow(1.-abs(dot(n,V)),2.5);float hx=n3(p*40.+vec3(uTime));float w=.25+.75*smoothstep(.55,.95,hx);
   o=vec4(uA*(fr*1.6+.06)*w*uAlpha,1.);return;}
 if(uType==0){float h=fbm(sp*1.5);float land=smoothstep(.49,.53,h);
   vec3 ocean=mix(uA*.5,uA,smoothstep(.3,.49,h));vec3 gr=mix(uC,uB,smoothstep(.53,.72,h));col=mix(ocean,gr,land);
   float ice=smoothstep(.78,.88,abs(p.y)+h*.15);col=mix(col,vec3(.93),ice);
   float cl=smoothstep(.5,.75,fbm(p*4.+vec3(uTime*.004,0.,0.)+vec3(uSeed*2.)));col=mix(col,vec3(1.),cl*.85);}
 else if(uType==1){float h=fbm(sp*2.);float h2=fbm(sp*7.);col=mix(uA,uB,smoothstep(.3,.7,h));col=mix(col,uC,smoothstep(.5,.75,h2)*.7);
   float cr=smoothstep(.62,.7,n3(sp*9.));col*=1.-cr*.25;}
 else if(uType==2){float w=fbm(p*vec3(1.5,4.,1.5)+vec3(uSeed));float b=p.y*7.+w*3.;col=mix(uA,uB,.5+.5*sin(b));
   col=mix(col,uC,smoothstep(.6,.95,.5+.5*sin(b*2.3+1.))*.6);
   float spot=smoothstep(.12,.0,length(vec2(atan(p.z,p.x)-1.,p.y*2.6+.6)));col=mix(col,uC*1.1,spot*.8);}
 else if(uType==3){float h=fbm(sp*2.5);float cr=1.-abs(n3(sp*8.)*2.-1.);col=mix(uA,uB,h);col=mix(col,uC,smoothstep(.86,.98,cr)*.7);}
 else{float h=fbm(sp*2.);float r=1.-abs(fbm(sp*4.)*2.-1.);col=mix(uA,uB,h);float lv=smoothstep(.88,.97,r);col=mix(col,uC,lv);em=lv;}
 float nl=dot(n,L);float d=smoothstep(-.12,.45,nl);
 vec3 lit=col*(.025+uSunCol*d*.85);
 lit+=uC*em*1.6*(1.-d*.6);
 float rim=pow(1.-max(dot(n,V),0.),2.5);lit+=uAtm*rim*(.08+smoothstep(-.3,.6,nl))*1.3;
 o=vec4(lit,1.);}`;

const RING_VS=`#version 300 es
layout(location=0) in vec3 aP;uniform mat4 uVP;uniform mat4 uM;out vec3 vO;out vec3 vW;
void main(){vO=aP;vec4 w=uM*vec4(aP,1.);vW=w.xyz;gl_Position=uVP*w;}`;
const RING_FS=`#version 300 es
precision highp float;in vec3 vO;in vec3 vW;uniform vec3 uA,uB,uSun,uSunCol,uPc;uniform float uSeed,uPr;out vec4 o;
float h1(float x){return fract(sin(x*127.1+uSeed)*43758.5453);}
float n1(float x){float i=floor(x),f=fract(x);return mix(h1(i),h1(i+1.),f*f*(3.-2.*f));}
void main(){float r=length(vO.xz);float t=(r-1.35)/(2.5-1.35);if(t<0.||t>1.)discard;
 float a=(.25+.75*n1(r*22.))*(.4+.6*n1(r*90.))*smoothstep(0.,.08,t)*smoothstep(1.,.85,t);
 vec3 c=mix(uA,uB,n1(r*9.+3.));
 vec3 L=normalize(uSun-vW);vec3 toP=uPc-vW;float tc=dot(toP,L);float sh=1.;
 if(tc>0.){float d2=dot(toP,toP)-tc*tc;if(d2<uPr*uPr)sh=.12;}
 o=vec4(c*uSunCol*(.35+.65*sh)*sh,a*.85);}`;

const SKY_VS=`#version 300 es
out vec2 vUV;void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2))*2.-1.;vUV=p;gl_Position=vec4(p,0.,1.);}`;
const SKY_FS=`#version 300 es
precision highp float;in vec2 vUV;out vec4 o;
uniform vec3 uR,uU,uF,uA,uB,uG,uSunD,uSunC;uniform vec2 uTan;uniform float uSeed;
${NOISE_GLSL}
vec3 stars(vec3 d,float sc,float th,float sz){vec3 p=d*sc;vec3 id=floor(p);vec3 f=fract(p)-.5;float h=h3(id+uSeed);if(h<th)return vec3(0.);
 vec3 off=vec3(h3(id+1.3),h3(id+2.7),h3(id+5.1))-.5;float dd=length(f-off*.5);float b=exp(-dd*dd/(sz*sz));
 vec3 c=mix(vec3(.65,.78,1.),vec3(1.,.82,.6),h3(id+9.1));return c*b*(.6+2.4*(h-th)/(1.-th));}
void main(){vec3 d=normalize(uF+uR*vUV.x*uTan.x+uU*vUV.y*uTan.y);
 vec3 col=vec3(.004,.006,.014);
 float n=fbm(d*2.1+vec3(uSeed));float n2=fbm(d*4.3-vec3(uSeed*1.3));
 float nb=smoothstep(.42,.86,n);float nb2=smoothstep(.48,.9,n2);
 col+=uA*nb*nb*.6+uB*nb2*nb2*.5+uA*uB*nb*nb2*.8;
 float g=dot(d,uG);float band=exp(-g*g*16.);col+=vec3(.42,.4,.55)*band*.13*(.3+fbm(d*7.));
 col+=stars(d,140.,.982,.16);col+=stars(d,64.,.994,.12)*1.6;col+=stars(d,250.,.972,.18)*band;
 float s=max(dot(d,uSunD),0.);col+=uSunC*(pow(s,6.)*.07+pow(s,60.)*.22);
 o=vec4(col,1.);}`;

const BB_VS=`#version 300 es
layout(location=0) in vec3 aP;layout(location=1) in vec2 aUV;layout(location=2) in vec4 aC;
uniform mat4 uVP;out vec2 vUV;out vec4 vC;
void main(){vUV=aUV;vC=aC;gl_Position=uVP*vec4(aP,1.);}`;
const BB_FS=`#version 300 es
precision highp float;in vec2 vUV;in vec4 vC;out vec4 o;
void main(){float r2=dot(vUV,vUV);if(r2>1.)discard;float a=exp(-r2*4.5)*.85+smoothstep(.16,0.,r2)*.8;o=vec4(vC.rgb*a*vC.a,1.);}`;

let PRG;
try{
  PRG={mesh:program(MESH_VS,MESH_FS),planet:program(PLANET_VS,PLANET_FS),ring:program(RING_VS,RING_FS),sky:program(SKY_VS,SKY_FS),bb:program(BB_VS,BB_FS)};
}catch(e){fatal('Shader error: '+e.message);}

// ---------- Mesh builder ----------
const SQ=[[-1,-1],[1,-1],[1,1],[-1,1]];
const HEXF=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
class MB{
  constructor(){this.p=[];this.n=[];this.c=[];this.e=[];}
  tri(a,b,c,col,em=0,ctr=null){let n=vcross(vsub(b,a),vsub(c,a));const l=vlen(n);if(l<1e-9)return;n=vscale(n,1/l);
    if(ctr){const m=[(a[0]+b[0]+c[0])/3-ctr[0],(a[1]+b[1]+c[1])/3-ctr[1],(a[2]+b[2]+c[2])/3-ctr[2]];if(vdot(n,m)<0)n=vscale(n,-1);}
    for(const v of[a,b,c]){this.p.push(v[0],v[1],v[2]);this.n.push(n[0],n[1],n[2]);this.c.push(col[0],col[1],col[2]);this.e.push(em);}}
  quad(a,b,c,d,col,em,ctr){this.tri(a,b,c,col,em,ctr);this.tri(a,c,d,col,em,ctr);}
  hexa(P,col,em=0){const ctr=[0,0,0];for(const p of P){ctr[0]+=p[0]/8;ctr[1]+=p[1]/8;ctr[2]+=p[2]/8;}for(const f of HEXF)this.quad(P[f[0]],P[f[1]],P[f[2]],P[f[3]],col,em,ctr);}
  box(c,s,col,em=0,rot=null){const P=[];for(const z of[-1,1])for(const q of SQ){let v=[q[0]*s[0],q[1]*s[1],z*s[2]];if(rot)v=eul(v,rot);P.push(vadd(v,c));}this.hexa(P,col,em);}
  taper(c,bk,fr,len,col,em=0,rot=null){const P=[];for(const[z,s]of[[-len/2,bk],[len/2,fr]])for(const q of SQ){let v=[q[0]*s[0],q[1]*s[1],z];if(rot)v=eul(v,rot);P.push(vadd(v,c));}this.hexa(P,col,em);}
  cyl(c,r1,r2,len,seg,rot,col,em=0){const T=v=>vadd(rot?eul(v,rot):v,c);const b0=T([0,0,-len/2]),b1=T([0,0,len/2]);
    for(let i=0;i<seg;i++){const a0=i/seg*TAU,a1=(i+1)/seg*TAU;
      const p=[[Math.cos(a0)*r1,Math.sin(a0)*r1,-len/2],[Math.cos(a1)*r1,Math.sin(a1)*r1,-len/2],[Math.cos(a1)*r2,Math.sin(a1)*r2,len/2],[Math.cos(a0)*r2,Math.sin(a0)*r2,len/2]].map(T);
      this.quad(p[0],p[1],p[2],p[3],col,em,c);this.tri(b0,p[0],p[1],col,em,c);this.tri(b1,p[3],p[2],col,em,c);}}
  pts(P,col,em=0){this.hexa(P,col,em);}
  rock(c,r,rng,base){const lat=8,lon=12;const K=[];for(let i=0;i<5;i++)K.push({d:randUnit(rng),f:1+rng()*3,a:(.07+rng()*.13)/(i*.6+1),ph:rng()*TAU});
    const V=[];for(let i=0;i<=lat;i++){const th=i/lat*Math.PI;V.push([]);for(let j=0;j<lon;j++){const ph=j/lon*TAU;const d=[Math.sin(th)*Math.cos(ph),Math.cos(th),Math.sin(th)*Math.sin(ph)];let rr=1;for(const k of K)rr+=k.a*Math.sin(vdot(d,k.d)*k.f*3+k.ph);V[i].push(vadd(c,vscale(d,r*rr)));}}
    for(let i=0;i<lat;i++)for(let j=0;j<lon;j++){const s=.75+rng()*.4;const col=[base[0]*s,base[1]*s,base[2]*s];this.quad(V[i][j],V[i][(j+1)%lon],V[i+1][(j+1)%lon],V[i+1][j],col,0,c);}}
}
function upload(mb){const vao=gl.createVertexArray();gl.bindVertexArray(vao);
  const mk=(arr,loc,size)=>{const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arr),gl.STATIC_DRAW);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);};
  mk(mb.p,0,3);mk(mb.n,1,3);mk(mb.c,2,3);mk(mb.e,3,1);gl.bindVertexArray(null);return{vao,count:mb.p.length/3};}

// ---------- Geometry library ----------
const GUN=[.3,.31,.35],DARK=[.14,.15,.18],RED=[1,.18,.12],ORANGE=[1,.55,.2],HULL=[.45,.47,.52];
function meshDrone(){const m=new MB();m.taper([0,0,0],[4.5,4.5],[2.3,2.3],12,GUN);m.taper([0,0,-7],[2.6,2.6],[4.5,4.5],2,DARK);
  m.box([0,0,6.3],[1.5,1.5,.5],RED,1);
  for(let k=0;k<4;k++){const a=k*Math.PI/2+Math.PI/4;m.box([Math.cos(a)*6,Math.sin(a)*6,-2],[3.2,.45,3.5],DARK,0,[0,0,a]);m.box([Math.cos(a)*9,Math.sin(a)*9,1.5],[.5,.5,2.5],RED,.8,[0,0,a]);}
  m.box([0,0,-8.1],[2,2,.3],ORANGE,1);return upload(m);}
function meshRaider(){const m=new MB();m.taper([0,0,0],[3,2.2],[.9,.7],24,GUN);m.taper([0,0,13.5],[.9,.7],[.1,.1],3,DARK);
  m.taper([0,2,4],[1.6,.7],[.7,.3],8,[.1,.25,.35],.35);
  for(const s of[-1,1]){m.pts([[3*s,-.4,-8],[16*s,-.3,-10],[16*s,.3,-10],[3*s,.4,-8],[3*s,-.4,5],[16*s,-.3,-5],[16*s,.3,-5],[3*s,.4,5]],GUN);
    m.box([16*s,0,-5],[.7,.7,5],DARK);m.box([9*s,.45,-4.5],[5,.1,.6],RED,1);
    m.box([2.2*s,0,-12.4],[1.3,1.3,.4],ORANGE,1);m.box([1.8*s,-2.5,-3],[.3,2.5,4],DARK,0,[0,0,.3*s]);}
  return upload(m);}
function meshGunship(){const m=new MB();m.taper([0,0,0],[9,6],[5,4],36,GUN);m.taper([0,0,21],[5,4],[2,2],6,DARK);
  for(const s of[-1,1]){m.box([12*s,-1,-4],[3.5,3.5,13],DARK);m.box([12*s,-1,-17.3],[2.6,2.6,.4],ORANGE,1);m.box([5*s,-4.5,19],[.8,.8,8],DARK);
    m.box([9*s,-1,-4],[3,1,6],GUN);m.box([9.2*s,3,6],[.3,1.5,8],RED,1);}
  m.box([0,0,-18.3],[5,3.5,.4],ORANGE,1);m.taper([0,7,-6],[4,1.5],[2.5,1],10,[.25,.26,.3]);m.box([0,7.6,-3],[2.6,.8,1],[.2,.6,.9],.6);m.box([0,6.3,8],[1,.3,6],RED,1);
  return upload(m);}
function meshTurret(){const m=new MB();m.cyl([0,0,0],6,8,5,10,[Math.PI/2,0,0],DARK);m.box([0,5,0],[5,3,5],GUN);
  for(const s of[-1,1])m.box([2.2*s,5,8],[.8,.8,8],DARK);m.box([0,5,5.2],[2,1,.3],RED,1);return upload(m);}
function meshBoss(){const m=new MB();const g=[.28,.27,.3],d=[.12,.11,.13];
  m.taper([0,0,0],[110,70],[70,50],500,g);m.taper([0,0,-330],[90,60],[110,70],160,d);
  for(const s of[-1,1]){m.taper([60*s,0,330],[28,42],[6,12],170,d,0,[0,-.28*s,0]);m.taper([30*s,-30,300],[18,18],[4,6],120,g,0,[.2,-.15*s,0]);
    m.cyl([135*s,0,-270],42,52,220,12,null,d);m.box([135*s,0,-382],[36,36,2],[1,.3,.15],1);
    m.box([111*s,0,40],[1,5,220],[1,.15,.1],1);m.box([80*s,72,-20],[6,6,180],d);
    for(let i=0;i<5;i++)m.taper([50*s,60,-180+i*80],[5,4],[1,1],50,d,0,[-.9,0,0]);}
  m.taper([0,95,-150],[30,25],[18,15],120,[.3,.29,.33]);m.box([0,122,-150],[24,6,32],d);m.box([0,123,-120],[14,2,1],[1,.25,.15],1);
  m.box([0,0,252],[52,36,2],[1,.2,.1],1);m.box([0,0,-412],[70,46,2],[1,.35,.15],1);
  return upload(m);}
function meshStation(){const m=new MB();const win=[1,.72,.38];
  m.cyl([0,0,0],55,55,300,16,[Math.PI/2,0,0],HULL);m.cyl([0,165,0],55,30,40,16,[Math.PI/2,0,0],DARK);m.cyl([0,-165,0],30,55,40,16,[Math.PI/2,0,0],DARK);
  const R=240,seg=32;const pt=(r,a,y)=>[r*Math.cos(a),y,r*Math.sin(a)];
  for(let i=0;i<seg;i++){if(i===5||i===6||i===19)continue;const a0=i/seg*TAU,a1=(i+1)/seg*TAU;const col=i%4===0?[.55,.32,.2]:HULL;
    m.pts([pt(R-22,a0,-16),pt(R+22,a0,-16),pt(R+22,a0,16),pt(R-22,a0,16),pt(R-22,a1,-16),pt(R+22,a1,-16),pt(R+22,a1,16),pt(R-22,a1,16)],col);
    if(i%2===0){const am=(a0+a1)/2;m.box(pt(R+22.6,am,0),[4,5,4],win,.85,[0,-am,0]);}}
  for(let k=0;k<4;k++){const a=k*TAU/4+.4;m.box(pt(R/2+28,a,0),[(R-60)/2,9,9],DARK,0,[0,-a,0]);}
  m.box([0,232,0],[8,70,8],DARK);for(const s of[-1,1]){m.box([95*s,262,0],[80,2,32],[.12,.18,.42],.15);m.box([95*s,262,0],[81,1,1],DARK);}
  m.box([0,-232,0],[3,60,3],DARK);m.box([0,-296,0],[3,3,3],[1,.2,.2],1);
  for(let k=0;k<8;k++){const a=k*TAU/8;m.box(pt(56,a,(k%2?60:-60)),[3,10,3],win,.7,[0,-a,0]);}
  m.box([0,0,95],[14,14,40],DARK);m.box([0,0,138],[20,20,3],[.2,.5,.6],.4);
  return upload(m);}
function meshTerminal(){const m=new MB();m.box([0,-6,0],[22,3,22],[.3,.32,.36]);m.box([0,-6,0],[23,1,23],[.9,.9,.9],1);
  m.box([0,4,-4],[8,10,4],[.24,.25,.29]);m.box([0,15,-2.6],[12,8,1],[.16,.16,.18],0,[-.5,0,0]);m.box([0,15.3,-1.6],[10.5,6.8,.4],[1,1,1],1,[-.5,0,0]);
  for(const s of[-1,1]){m.box([16*s,8,8],[1.4,14,1.4],[.3,.3,.32]);m.box([16*s,23,8],[2.4,2.4,2.4],[1,1,1],1);}
  m.box([-10,-1,10],[3,2,5],[.25,.25,.28]);m.box([9,-1.5,12],[4,1.5,3],[.35,.25,.18]);
  return upload(m);}
function meshBarrel(){const m=new MB();m.cyl([0,0,30],6,9,60,10,null,DARK);m.cyl([0,0,62],9,5,6,10,null,[.6,.85,1],1);m.box([0,0,0],[10,10,8],GUN);return upload(m);}
function meshCrate(){const m=new MB();m.box([0,0,0],[5,5,5],[.35,.36,.4]);for(const s of[-1,1]){m.box([0,5.05*s,0],[3.5,.1,3.5],[1,1,1],1);m.box([5.05*s,0,0],[.1,3.5,1],[1,1,1],1);m.box([0,0,5.05*s],[1,3.5,.1],[1,1,1],1);}return upload(m);}
function meshWreck(){const m=new MB();const g=[.25,.24,.22],d=[.1,.1,.11];m.taper([0,0,0],[14,10],[8,6],60,g,0,[0,0,.3]);m.taper([0,0,40],[8,6],[2,2],20,d,0,[0,0,.3]);
  m.pts([[10,-2,-20],[52,-1,-36],[52,1,-36],[10,2,-20],[10,-2,10],[52,-1,-12],[52,1,-12],[10,2,10]],g);m.box([-16,0,-6],[6,3,14],d,0,[0,.6,.4]);
  m.box([0,0,-31],[8,8,.5],[.4,.9,1],.6);return upload(m);}
function meshRocks(){const out=[];for(let k=0;k<6;k++){const r=RNG(77+k*31);const m=new MB();const b=k%3===0?[.45,.38,.32]:k%3===1?[.38,.37,.36]:[.42,.34,.28];m.rock([0,0,0],1,r,b);out.push(upload(m));}return out;}
function sphereGeo(lat,lon){const pos=[],idx=[];for(let i=0;i<=lat;i++){const th=i/lat*Math.PI;for(let j=0;j<=lon;j++){const ph=j/lon*TAU;pos.push(Math.sin(th)*Math.cos(ph),Math.cos(th),Math.sin(th)*Math.sin(ph));}}
  for(let i=0;i<lat;i++)for(let j=0;j<lon;j++){const a=i*(lon+1)+j,b=a+lon+1;idx.push(a,b,a+1,b,b+1,a+1);}
  const vao=gl.createVertexArray();gl.bindVertexArray(vao);const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pos),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(idx),gl.STATIC_DRAW);
  gl.bindVertexArray(null);return{vao,count:idx.length};}
function ringGeo(seg){const p=[];for(let i=0;i<=seg;i++){const a=i/seg*TAU,c=Math.cos(a),s=Math.sin(a);p.push(c*1.35,0,s*1.35,c*2.5,0,s*2.5);}
  const vao=gl.createVertexArray();gl.bindVertexArray(vao);const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(p),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);gl.bindVertexArray(null);return{vao,count:(seg+1)*2};}

function meshHaven(core){const m=new MB();const WH=[.84,.86,.9],G2=[.5,.52,.58],GL=[1,.78,.5],CY=[.45,.95,1],PK=[1,.42,.86];
  if(core)m.cyl([0,0,0],50,50,140,16,[Math.PI/2,0,0],WH);m.cyl([0,85,0],50,22,30,16,[Math.PI/2,0,0],G2);m.cyl([0,-85,0],22,50,30,16,[Math.PI/2,0,0],G2);
  m.cyl([0,124,0],8,78,24,20,[-Math.PI/2,0,0],WH);m.box([0,148,0],[3,24,3],G2);m.box([0,176,0],[4,4,4],PK,1);
  if(core){m.cyl([0,0,0],51.5,51.5,8,16,[Math.PI/2,0,0],PK,1);m.cyl([0,32,0],51.5,51.5,3,16,[Math.PI/2,0,0],CY,1);m.cyl([0,-32,0],51.5,51.5,3,16,[Math.PI/2,0,0],CY,1);}
  const Rr=160,seg=36;const pt=(r,a,y)=>[r*Math.cos(a),y,r*Math.sin(a)];
  for(let i=0;i<seg;i++){const a0=i/seg*TAU,a1=(i+1)/seg*TAU,am=(a0+a1)/2;m.pts([pt(Rr-14,a0,-12),pt(Rr+14,a0,-12),pt(Rr+14,a0,12),pt(Rr-14,a0,12),pt(Rr-14,a1,-12),pt(Rr+14,a1,-12),pt(Rr+14,a1,12),pt(Rr-14,a1,12)],i%3===0?[.7,.72,.78]:WH);
    m.box(pt(Rr+14.4,am,0),[3,4,4],i%4===0?PK:GL,.9,[0,-am,0]);}
  for(let k=0;k<4;k++){const a=k*TAU/4+.6;m.box(pt(Rr/2+25,a,0),[(Rr-62)/2,6,6],G2,0,[0,-a,0]);}
  for(let k=0;k<8;k++){const a=k/8*TAU+.2;m.box(pt(Rr+20,a,0),[7,11,11],G2,0,[0,-a,0]);m.box(pt(Rr+27.3,a,0),[.4,12.5,12.5],CY,1,[0,-a,0]);m.box(pt(Rr+27.5,a,0),[.4,8,8],[.06,.08,.12],0,[0,-a,0]);}
  m.box([0,-140,0],[4,60,4],G2);for(const sd of[-1,1]){m.box([110*sd,-172,0],[92,1.6,30],[.14,.2,.5],.25);m.box([110*sd,-172,0],[93,.8,1],G2);}
  return upload(m);}
function meshPShip(){const m=new MB();const H=[.86,.87,.9],D=[.2,.21,.25],E=[1,1,1];
  m.taper([0,0,0],[2.6,1.8],[1,.8],20,H);m.taper([0,0,12],[1,.8],[.15,.15],4,D);m.taper([0,1.6,3],[1.3,.8],[.6,.3],7,[.35,.8,1],.6);
  for(const sd of[-1,1]){m.pts([[2.4*sd,-.35,-7],[13*sd,-.25,-9],[13*sd,.25,-9],[2.4*sd,.35,-7],[2.4*sd,-.35,3],[13*sd,-.25,-5],[13*sd,.25,-5],[2.4*sd,.35,3]],H);
    m.box([13*sd,0,-6.5],[.5,.5,3.2],D);m.box([7.5*sd,.4,-4.5],[4.2,.1,.5],E,1);m.box([2*sd,0,-10.5],[1.2,1.2,1.6],D);m.box([2*sd,0,-12.2],[.95,.95,.2],E,1);}
  m.box([0,2.5,-7],[.3,2.2,3],H,0,[.4,0,0]);return upload(m);}
const HALL_R=46,HALL_H=7,FLOOR_Y=-3;
const DOOR_A=[0,1,2,3,4,5,6,7].map(k=>k/8*TAU+.2);
const HPLANTS=[[-12,-22],[12,-22],[-14,22],[14,22],[-38,-14],[38,-14],[-38,14],[38,14]];
function meshHall(){const m=new MB();const FL=[.15,.16,.21],FL2=[.19,.2,.26],WL=[.72,.74,.8],TR=[.28,.3,.36],CY=[.4,.95,1],PK=[1,.4,.85],WM=[1,.82,.6],SOFA=[.45,.3,.66],WOOD=[.34,.23,.16];
  const pt=(r,a,y)=>[r*Math.cos(a),y,r*Math.sin(a)];const seg=48;
  for(let ri=0;ri<5;ri++){const r0=ri*HALL_R/5,r1=(ri+1)*HALL_R/5;for(let i=0;i<seg;i++){const a0=i/seg*TAU,a1=(i+1)/seg*TAU;
    m.quad(pt(r0,a0,0),pt(r1,a0,0),pt(r1,a1,0),pt(r0,a1,0),(i+ri)%2?FL:FL2,0,[0,-5,0]);m.quad(pt(r0,a0,HALL_H),pt(r1,a0,HALL_H),pt(r1,a1,HALL_H),pt(r0,a1,HALL_H),TR,0,[0,HALL_H+5,0]);}}
  for(const[r,c,y,w]of[[12,CY,.035,.1],[30,PK,.035,.1],[9,WM,HALL_H-.06,.45],[38,WM,HALL_H-.06,.45]])for(let i=0;i<seg;i++){const a0=i/seg*TAU,a1=(i+1)/seg*TAU;
    m.quad(pt(r-w,a0,y),pt(r+w,a0,y),pt(r+w,a1,y),pt(r-w,a1,y),c,1,[0,y>1?y+5:-5,0]);}
  for(let i=0;i<seg;i++){const a0=i/seg*TAU,a1=(i+1)/seg*TAU,am=(a0+a1)/2,R=HALL_R,hw=R*Math.PI/seg;
    m.quad(pt(R,a0,0),pt(R,a1,0),pt(R,a1,1),pt(R,a0,1),WL,0,[0,3,0]);m.quad(pt(R,a0,5.6),pt(R,a1,5.6),pt(R,a1,HALL_H),pt(R,a0,HALL_H),WL,0,[0,3,0]);
    m.box(pt(R-.1,a0,3.3),[.12,2.35,.12],TR,0,[0,-a0,0]);m.box(pt(R-.25,am,1.05),[.25,.05,hw],TR,0,[0,-am,0]);m.box(pt(R-.08,am,.45),[.02,.035,hw*.9],CY,1,[0,-am,0]);m.box(pt(R-.08,am,5.55),[.02,.03,hw*.9],WM,1,[0,-am,0]);}
  for(const a of DOOR_A){const t=[-Math.sin(a),0,Math.cos(a)];
    for(const sd of[-1,1]){m.box(vadd(pt(HALL_R-.35,a,2.8),vscale(t,sd*1.9)),[.35,2.8,.22],TR,0,[0,-a,0]);m.box(vadd(pt(HALL_R-.72,a,2.8),vscale(t,sd*1.9)),[.02,2.6,.05],CY,1,[0,-a,0]);}
    m.box(pt(HALL_R-.35,a,5.85),[.35,.3,2.1],TR,0,[0,-a,0]);m.box(pt(HALL_R-.72,a,5.85),[.02,.12,1.6],PK,1,[0,-a,0]);
    m.box(pt(HALL_R-2.2,a,.02),[1.8,.015,1.5],[.25,.75,.9],.45,[0,-a,0]);}
  m.cyl([0,.55,0],3,3.3,1.1,24,[Math.PI/2,0,0],TR);m.cyl([0,1.12,0],2.9,2.9,.04,24,[Math.PI/2,0,0],CY,1);m.cyl([0,1.15,0],2.4,2.4,.03,24,[Math.PI/2,0,0],[.04,.1,.16]);
  m.cyl([0,HALL_H-.35,0],1.4,2.4,.7,16,[Math.PI/2,0,0],TR);m.cyl([0,HALL_H-.71,0],1.3,1.3,.02,16,[Math.PI/2,0,0],CY,1);
  m.box([0,.55,-28],[9,.55,.7],WOOD);m.box([0,1.12,-28],[9.3,.04,.9],[.86,.87,.92]);m.box([0,.25,-27.28],[9,.04,.02],PK,1);
  for(const y of[1.3,2,2.7])m.box([0,y,-32.4],[8,.04,.45],TR);m.box([0,2,-32.9],[8.2,1.4,.05],[.12,.1,.16]);
  {const r=RNG(55);const BC=[[1,.4,.3],[.4,1,.6],[.4,.7,1],[1,.85,.3],[1,.4,.85]];for(const y of[1.3,2,2.7])for(let x=-7.5;x<=7.5;x+=.55)if(r()<.8)m.box([x,y+.2,-32.4],[.08,.16,.08],BC[(r()*5)|0],.85);}
  for(let k=0;k<6;k++){const x=-7.5+k*3;m.cyl([x,.4,-26.4],.1,.1,.8,8,[Math.PI/2,0,0],TR);m.cyl([x,.83,-26.4],.38,.38,.09,12,[Math.PI/2,0,0],PK,.3);}
  m.box([0,.2,31],[10,.2,5],[.1,.1,.14]);m.box([0,.41,26.02],[10,.02,.03],CY,1);m.box([10.02,.41,31],[.03,.02,5],CY,1);m.box([-10.02,.41,31],[.03,.02,5],CY,1);
  m.box([0,.95,33],[2.4,.55,.6],TR);m.box([0,1.2,32.38],[2.2,.25,.02],PK,1);for(const sd of[-1,1]){m.cyl([sd,1.52,33],.42,.42,.04,14,[Math.PI/2,0,0],[.08,.08,.09]);m.cyl([sd,1.545,33],.12,.12,.02,8,[Math.PI/2,0,0],CY,1);}
  for(const sd of[-1,1]){m.box([8.5*sd,1.6,34.5],[.8,1.2,.6],[.08,.08,.1]);m.cyl([8.5*sd,2.1,33.88],.45,.45,.04,14,null,CY,1);m.cyl([8.5*sd,1,33.88],.32,.32,.04,14,null,PK,1);}
  m.box(pt(45.6,Math.PI/2,6.25),[.05,.35,7],PK,1,[0,-Math.PI/2,0]);
  for(const sx of[-1,1]){const cx=29*sx;m.box([cx+sx*3.2,.3,0],[.6,.3,4],SOFA);m.box([cx+sx*3.7,.8,0],[.15,.5,4],SOFA);
    for(const sz of[-1,1]){m.box([cx,.3,4*sz],[3,.3,.6],SOFA);m.box([cx,.8,4.5*sz],[3,.5,.15],SOFA);}
    m.box([cx,.25,0],[1.4,.25,1.8],WOOD);m.box([cx,.51,0],[1.3,.02,1.7],[.86,.86,.9]);m.box([cx,.02,0],[4.4,.015,5.2],[.22,.13,.32]);}
  for(const[x,z]of HPLANTS){m.cyl([x,.35,z],.45,.35,.7,10,[Math.PI/2,0,0],[.86,.86,.9]);m.rock([x,1.25,z],.7,RNG(((x*7+z*13)|0)+500),[.25,.62,.32]);}
  return upload(m);}
function meshAstroBody(){const m=new MB();const S=[.92,.92,.94],D=[.25,.26,.3],E=[1,1,1];
  m.box([0,1.12,0],[.25,.3,.15],S);m.box([0,.86,0],[.22,.06,.14],D);m.box([0,1.2,-.22],[.19,.24,.08],D);m.box([0,1.2,-.305],[.12,.14,.01],E,1);m.box([0,1.12,.155],[.08,.06,.01],E,1);
  m.box([0,1.62,0],[.17,.17,.17],[.96,.96,.98]);m.box([0,1.63,.168],[.13,.08,.012],E,1);m.box([0,1.82,0],[.03,.05,.03],D);return upload(m);}
function meshAstroArm(){const m=new MB();m.box([0,-.28,0],[.07,.28,.07],[.92,.92,.94]);m.box([0,-.6,0],[.065,.06,.065],[.25,.26,.3]);return upload(m);}
function meshAstroLeg(){const m=new MB();m.box([0,-.38,0],[.09,.38,.09],[.92,.92,.94]);m.box([0,-.8,.04],[.1,.05,.14],[.25,.26,.3]);return upload(m);}
const MESH={haven:meshHaven(true),havenShell:meshHaven(false),hall:meshHall(),astroBody:meshAstroBody(),astroArm:meshAstroArm(),astroLeg:meshAstroLeg(),pship:meshPShip(),drone:meshDrone(),raider:meshRaider(),gunship:meshGunship(),turret:meshTurret(),boss:meshBoss(),station:meshStation(),terminal:meshTerminal(),barrel:meshBarrel(),crate:meshCrate(),wreck:meshWreck(),rocks:meshRocks(),sphere:sphereGeo(64,96),ring:ringGeo(160)};
const skyVAO=gl.createVertexArray();

// ---------- Billboard batch ----------
const BB_MAX=20000,BB_STRIDE=9;
const bbData=new Float32Array(BB_MAX*6*BB_STRIDE);let bbN=0;
const bbVAO=gl.createVertexArray(),bbBuf=gl.createBuffer();
gl.bindVertexArray(bbVAO);gl.bindBuffer(gl.ARRAY_BUFFER,bbBuf);gl.bufferData(gl.ARRAY_BUFFER,bbData.byteLength,gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,36,0);gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,2,gl.FLOAT,false,36,12);gl.enableVertexAttribArray(2);gl.vertexAttribPointer(2,4,gl.FLOAT,false,36,20);
gl.bindVertexArray(null);
function bbV(i,p,u,v,c,a){const o=i*BB_STRIDE;bbData[o]=p[0];bbData[o+1]=p[1];bbData[o+2]=p[2];bbData[o+3]=u;bbData[o+4]=v;bbData[o+5]=c[0];bbData[o+6]=c[1];bbData[o+7]=c[2];bbData[o+8]=a;}
function bbQuad(p0,p1,p2,p3,uv,c,a){if(bbN>=BB_MAX)return;const i=bbN*6;bbN++;
  bbV(i,p0,uv[0],uv[1],c,a);bbV(i+1,p1,uv[2],uv[3],c,a);bbV(i+2,p2,uv[4],uv[5],c,a);bbV(i+3,p0,uv[0],uv[1],c,a);bbV(i+4,p2,uv[4],uv[5],c,a);bbV(i+5,p3,uv[6],uv[7],c,a);}
const UV_SPR=[-1,-1,1,-1,1,1,-1,1],UV_BEAM=[0,-1,0,1,0,1,0,-1];
function sprite(p,s,c,a=1){const r=G.cam.r,u=G.cam.u;const rx=r[0]*s,ry=r[1]*s,rz=r[2]*s,ux=u[0]*s,uy=u[1]*s,uz=u[2]*s;
  bbQuad([p[0]-rx-ux,p[1]-ry-uy,p[2]-rz-uz],[p[0]+rx-ux,p[1]+ry-uy,p[2]+rz-uz],[p[0]+rx+ux,p[1]+ry+uy,p[2]+rz+uz],[p[0]-rx+ux,p[1]-ry+uy,p[2]-rz+uz],UV_SPR,c,a);}
function beam(a,b,w,c,al=1){const ax=vsub(b,a);const tc=vsub(G.cam.pos,a);let sd=vcross(ax,tc);const l=vlen(sd);if(l<1e-6)return;sd=vscale(sd,w/l);
  bbQuad(vsub(a,sd),vadd(a,sd),vadd(b,sd),vsub(b,sd),UV_BEAM,c,al);}

// =====================================================================
//  AUDIO (synthesised)
// =====================================================================
const A={ctx:null};
function audioInit(){if(A.ctx){if(A.ctx.state!=='running')A.ctx.resume().catch(()=>{});return;}
  try{const C=window.AudioContext||window.webkitAudioContext;A.ctx=new C();}catch(e){return;}
  const c=A.ctx;A.master=c.createGain();A.master.gain.value=settings.vol;const comp=c.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;A.master.connect(comp);comp.connect(c.destination);
  A.sfx=c.createGain();A.sfx.connect(A.master);A.mus=c.createGain();A.mus.gain.value=.32;A.mus.connect(A.master);
  const len=c.sampleRate*2,buf=c.createBuffer(1,len,c.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;A.noise=buf;
  A.eng=c.createOscillator();A.eng.type='sawtooth';A.eng.frequency.value=42;A.engF=c.createBiquadFilter();A.engF.type='lowpass';A.engF.frequency.value=180;A.engG=c.createGain();A.engG.gain.value=0;
  A.eng.connect(A.engF);A.engF.connect(A.engG);A.engG.connect(A.sfx);A.eng.start();
  const n=c.createBufferSource();n.buffer=A.noise;n.loop=true;A.engNF=c.createBiquadFilter();A.engNF.type='bandpass';A.engNF.frequency.value=380;A.engNF.Q.value=.6;A.engN=c.createGain();A.engN.gain.value=0;
  n.connect(A.engNF);A.engNF.connect(A.engN);A.engN.connect(A.sfx);n.start();
  A.lo=c.createOscillator();A.lo.type='sawtooth';A.lo.frequency.value=110;A.loF=c.createBiquadFilter();A.loF.type='bandpass';A.loF.frequency.value=900;A.loG=c.createGain();A.loG.gain.value=0;A.lo.connect(A.loF);A.loF.connect(A.loG);A.loG.connect(A.sfx);A.lo.start();
  A.delay=c.createDelay(1);A.delay.delayTime.value=.5625;const fb=c.createGain();fb.gain.value=.38;A.delay.connect(fb);fb.connect(A.delay);const dl=c.createGain();dl.gain.value=.6;A.delay.connect(dl);dl.connect(A.mus);
  mus.next=c.currentTime+.2;setInterval(musicTick,100);}
function tone(f,type,dur,vol,slide,when=0,dest){if(!A.ctx)return;const c=A.ctx,t=c.currentTime+when;const o=c.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t);if(slide)o.frequency.exponentialRampToValueAtTime(slide,t+dur);
  const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(dest||A.sfx);o.start(t);o.stop(t+dur+.05);}
function noise(dur,vol,freq,q,type,slide,when=0){if(!A.ctx)return;const c=A.ctx,t=c.currentTime+when;const s=c.createBufferSource();s.buffer=A.noise;const f=c.createBiquadFilter();f.type=type||'lowpass';f.frequency.setValueAtTime(freq,t);f.Q.value=q||1;
  if(slide)f.frequency.exponentialRampToValueAtTime(slide,t+dur);const g=c.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f);f.connect(g);g.connect(A.sfx);s.start(t,Math.random()*1.5);s.stop(t+dur+.05);}
const att=p=>clamp(1-vdist(p,P.pos)/2500,0,1);
const SFX={
  pulse(){tone(1100,'square',.08,.035,260);tone(2200,'sine',.05,.02,700);},
  scatter(){noise(.3,.32,2600,.8,'lowpass',250);tone(180,'sawtooth',.16,.08,55);},
  rail(){tone(2400,'sawtooth',.45,.08,70);noise(.35,.18,7000,1,'highpass',1500);tone(90,'sine',.3,.2,40);},
  missile(){noise(.7,.16,700,1.2,'bandpass',3200);tone(300,'square',.1,.03,150);},
  nova(){tone(140,'sine',.8,.3,35);tone(700,'triangle',.45,.07,110);noise(.4,.1,1500,2,'bandpass',300);},
  eShot(p){const a=att(p);if(a>.02)tone(560+Math.random()*80,'square',.09,.022*a,170);},
  ePlasma(p){const a=att(p);if(a>.02)tone(240,'sawtooth',.18,.04*a,80);},
  hit(){tone(1500,'square',.035,.03,1000);},
  boom(size,p){const a=Math.max(.06,att(p));const v=clamp(.15+size*.012,.15,.6)*a;noise(.5+size*.025,v,1000,.7,'lowpass',50);tone(85,'sine',.5+size*.01,v*.9,28);},
  shield(){tone(320,'triangle',.16,.1,700);noise(.12,.08,3200,2,'bandpass');},
  hull(){noise(.28,.3,420,1,'lowpass',90);tone(95,'square',.22,.12,45);},
  pick(){tone(880,'sine',.08,.07);tone(1320,'sine',.14,.07,null,.06);},
  ui(){tone(1250,'sine',.05,.05);},
  good(){[523,659,784,1046].forEach((f,i)=>tone(f,'triangle',.3,.1,null,i*.09));},
  bad(){tone(190,'sawtooth',.3,.1,85);},
  alarm(){tone(880,'square',.14,.05);tone(660,'square',.14,.05,null,.17);},
  warp(){noise(3,.3,180,1,'bandpass',5000);tone(55,'sawtooth',2.7,.18,700);},
  empty(){tone(140,'square',.06,.04);},
  unlock(){[392,523,659,784,1046,1318].forEach((f,i)=>tone(f,'square',.22,.05,null,i*.07));}
};
// generative soundtrack
const CHORDS=[[57,60,64,67],[53,57,60,64],[48,52,55,59],[55,59,62,66],[50,53,57,60],[52,56,59,62]];
const PROG=[0,1,2,3,0,1,4,5];
const mtof=m=>440*Math.pow(2,(m-69)/12);
const mus={next:0,step:0,ci:-1,lounge:false};
const LOUNGE=[[60,64,67,71],[57,60,64,67],[62,65,69,72],[55,59,62,65]];
function pad(notes,t,dur){const c=A.ctx;for(const n of notes){for(const det of[-7,7]){const o=c.createOscillator();o.type='sawtooth';o.frequency.value=mtof(n-12);o.detune.value=det;
  const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=700;const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.012,t+2.2);g.gain.setValueAtTime(.012,t+dur-1.5);g.gain.linearRampToValueAtTime(.0001,t+dur+.8);
  o.connect(f);f.connect(g);g.connect(A.mus);o.start(t);o.stop(t+dur+1);}}}
function pluck(f,t,v=.05){const c=A.ctx;const o=c.createOscillator();o.type='triangle';o.frequency.value=f;const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.6);
  o.connect(g);g.connect(A.mus);g.connect(A.delay);o.start(t);o.stop(t+.7);}
function bass(f,t){const c=A.ctx;const o=c.createOscillator();o.type='square';o.frequency.value=f;const fl=c.createBiquadFilter();fl.type='lowpass';fl.frequency.setValueAtTime(900,t);fl.frequency.exponentialRampToValueAtTime(120,t+.18);
  const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.07,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(fl);fl.connect(g);g.connect(A.mus);o.start(t);o.stop(t+.25);}
function musicTick(){if(!A.ctx||A.ctx.state!=='running')return;const c=A.ctx;if(mus.next<c.currentTime)mus.next=c.currentTime+.05;
  while(mus.next<c.currentTime+.35){const t=mus.next,s=mus.step;const lg=mus.lounge;const CH=lg?LOUNGE:CHORDS,PR=lg?[0,1,2,3]:PROG;
    if(s%32===0){mus.ci=(mus.ci+1)%PR.length;pad(CH[PR[mus.ci%PR.length]],t,.1875*32);}
    const ch=CH[PR[Math.max(0,mus.ci)%PR.length]];
    if(lg){if(s%3===0&&Math.random()<.6)pluck(mtof(ch[(Math.random()*ch.length)|0]+12),t,.03);if(s%8===0)tone(58,'sine',.3,.07,40,t-c.currentTime,A.mus);if(s%8===4)noise(.06,.025,7000,1,'highpass',null,t-c.currentTime);}
    else if(s%2===0&&Math.random()<.5)pluck(mtof(ch[(Math.random()*ch.length)|0]+12*(1+((Math.random()*2)|0))),t,.035);
    if(G.combat>0&&!lg){if(s%2===0)bass(mtof(ch[0]-24+(s%8===6?12:0)),t);if(s%4===0)noise(.05,.05,8000,1,'highpass',null,t-c.currentTime);}
    mus.next+=.1875;mus.step++;}}

// =====================================================================
//  GAME DATA
// =====================================================================
const settings={sens:1,invert:false,mouseMode:'lock',vol:.7,callsign:'PILOT-'+((1000+Math.random()*9000)|0),paint:(Math.random()*8)|0,lounge:true};
try{Object.assign(settings,JSON.parse(localStorage.getItem('sv_settings')||'{}'));}catch(e){}
function saveSettings(){try{localStorage.setItem('sv_settings',JSON.stringify(settings));}catch(e){}}

const WEAPONS=[
  {id:'pulse',name:'PULSE LASER',short:'PULSE',kind:'bolt',rof:8,energy:2.2,dmg:9,speed:1300,col:[.3,.9,1],size:1.5,len:16},
  {id:'scatter',name:'SCATTER BLASTER',short:'SCATTER',kind:'bolt',rof:1.5,energy:13,dmg:7,pellets:9,spread:4.5,speed:1050,col:[1,.6,.2],size:1.4,len:10},
  {id:'seeker',name:'SEEKER MISSILES',short:'SEEKER',kind:'missile',rof:2.4,ammo:true,dmg:45,splash:30,splashR:55,speed:330,col:[1,.4,.2]},
  {id:'rail',name:'ION RAILGUN',short:'RAIL',kind:'rail',rof:.85,energy:24,dmg:85,col:[.8,.45,1],range:3500},
  {id:'lance',name:'PLASMA LANCE',short:'LANCE',kind:'lance',eps:28,dps:75,col:[.35,1,.45],range:1100},
  {id:'nova',name:'NOVA CANNON',short:'NOVA',kind:'nova',rof:.55,energy:38,dmg:110,splash:90,splashR:150,speed:520,col:[1,.35,.9],size:7}
];
const UNLOCK_ORDER=['scatter','seeker','rail','lance','nova'];
const UPG=[
  {id:'hull',name:'Reinforced Hull',desc:'+25 maximum hull integrity'},
  {id:'shield',name:'Shield Capacitor',desc:'+25 shield strength, faster recharge'},
  {id:'dmg',name:'Weapon Amplifier',desc:'+15% damage for every weapon'},
  {id:'engine',name:'Engine Tuning',desc:'+10% speed and handling'},
  {id:'energy',name:'Fusion Core',desc:'+20% weapon energy and regeneration'},
  {id:'missile',name:'Missile Rack',desc:'+6 seeker missile capacity'}];
const UPG_COST=[250,500,850,1300,1900];
const ETYPE={
  drone:{name:'SCAV DRONE',hp:28,speed:180,turn:2.5,radius:8,mesh:'drone',scale:1,dmg:4,rof:1,burst:2,proj:'laser',pspeed:760,range:1100,minDist:180,credits:20,aggro:2000,guns:[[0,0,7]],eng:[[0,0,-8.5,3]]},
  raider:{name:'RAIDER',hp:65,speed:160,turn:1.9,radius:12,mesh:'raider',scale:1,dmg:6,rof:1.2,burst:2,proj:'laser',pspeed:820,range:1200,minDist:220,credits:35,aggro:2200,guns:[[16,0,0],[-16,0,0]],eng:[[2.2,0,-13,3],[-2.2,0,-13,3]]},
  gunship:{name:'GUNSHIP',hp:240,speed:95,turn:.9,radius:24,mesh:'gunship',scale:1,dmg:8,rof:3.2,burst:4,proj:'plasma',pspeed:540,range:1400,minDist:350,orbit:600,omni:true,credits:90,aggro:2400,elite:true,guns:[[5,-4.5,27],[-5,-4.5,27]],eng:[[0,0,-19,6],[12,-1,-18,4],[-12,-1,-18,4]]},
  turret:{name:'LEVIATHAN TURRET',hp:320,speed:0,turn:3,radius:22,mesh:'turret',scale:3,dmg:10,rof:1.7,burst:3,proj:'plasma',pspeed:620,range:2000,omni:true,static:true,credits:80,aggro:99999,guns:[[0,15,48]],eng:[]},
  boss:{name:'THE LEVIATHAN',hp:6000,speed:14,turn:.07,radius:150,mesh:'boss',scale:1,credits:3000,aggro:99999,boss:true,eng:[[135,0,-390,60],[-135,0,-390,60],[0,0,-420,80]],
    spheres:[[0,0,-330,105],[0,0,-120,115],[0,0,80,105],[0,0,260,80],[135,0,-270,55],[-135,0,-270,55]]}
};
const SYS=[
  {name:'HELIOS GATE',x:.1,y:.52,star:[1,.86,.55],neb:[[.15,.3,.75],[.55,.2,.5]],lvl:0,terms:2,pt:[1,0,2]},
  {name:"KEPLER'S REACH",x:.28,y:.26,star:[.75,.85,1],neb:[[.1,.45,.6],[.25,.2,.6]],lvl:1,terms:3,pt:[3,2,1,0]},
  {name:'VESPER DRIFT',x:.3,y:.78,star:[1,.65,.4],neb:[[.6,.3,.15],[.3,.1,.4]],lvl:1,terms:3,pt:[1,2,4]},
  {name:'CINDER EXPANSE',x:.5,y:.5,star:[1,.5,.28],neb:[[.6,.18,.08],[.4,.25,.1]],lvl:2,terms:3,pt:[4,4,1,2]},
  {name:'GLACIA NEBULA',x:.52,y:.84,star:[.6,.88,1],neb:[[.1,.5,.7],[.4,.7,.9]],lvl:2,terms:3,pt:[3,3,2]},
  {name:'OBSIDIAN RIFT',x:.7,y:.24,star:[.88,.55,1],neb:[[.4,.1,.6],[.1,.15,.45]],lvl:3,terms:4,pt:[1,4,2,3]},
  {name:'TARTARUS DEEP',x:.73,y:.72,star:[1,.32,.28],neb:[[.55,.05,.1],[.25,.05,.3]],lvl:4,terms:4,pt:[4,2,1]},
  {name:'THE MAW',x:.9,y:.48,star:[.55,1,.6],neb:[[.5,.05,.08],[.15,.3,.1]],lvl:5,terms:3,pt:[2,4],boss:true}
];
const LINKS=[[0,1],[0,2],[1,3],[2,3],[2,4],[1,5],[3,5],[3,6],[4,6],[5,7],[6,7]];
const PAL={
  0:r=>({A:[.05,.2,.55],B:[.55,.5,.36],C:[.14,.38,.14],atm:[.3,.6,1]}),
  1:r=>{const t=r();return{A:[.42+t*.1,.33,.26],B:[.72,.58-t*.1,.42],C:[.28,.24,.22],atm:[.45,.32,.2]};},
  2:r=>pick([{A:[.85,.65,.45],B:[.6,.38,.26],C:[.95,.88,.75],atm:[.9,.7,.5]},{A:[.35,.5,.85],B:[.75,.85,.96],C:[.2,.28,.65],atm:[.5,.7,1]},{A:[.66,.45,.8],B:[.92,.75,.9],C:[.4,.25,.6],atm:[.8,.5,1]},{A:[.4,.7,.6],B:[.8,.9,.8],C:[.2,.4,.4],atm:[.5,1,.8]}]),
  3:r=>({A:[.72,.84,.95],B:[.95,.97,1],C:[.25,.45,.8],atm:[.6,.85,1]}),
  4:r=>({A:[.1,.07,.06],B:[.24,.17,.14],C:[1,.36,.06],atm:[1,.35,.08]})};

// =====================================================================
//  STATE
// =====================================================================
const G={state:'title',t:0,sys:null,cam:{pos:[0,0,0],f:[0,0,-1],u:[0,1,0],r:[1,0,0]},VP:null,msgs:[],title:null,shake:0,dmgFlash:0,shieldFlash:0,hitMark:0,whiteFlash:0,combat:0,
  encounterT:70,ambushT:-1,warpT:0,warpTo:-1,warpLoaded:false,fov:75,target:null,manualTarget:false,scan:null,interact:null,deathT:0,bossDeathT:-1,lockErr:0,everLocked:false,prog:null,emptyT:0};
let P=null,enemies=[],projs=[],parts=[],beams=[],pickups=[],dust=[];
const keys={};let mdx=0,mdy=0,mouseX=innerWidth/2,mouseY=innerHeight/2,mouseDown=false;

function newProgress(){return{credits:0,unlocked:{pulse:true},missiles:0,upg:{hull:0,shield:0,dmg:0,engine:0,energy:0,missile:0},cur:0,
  systems:SYS.map((s,i)=>({state:i===0?'available':'locked',terms:Array(s.terms).fill(false),scanned:[],cache:false,visited:false})),kills:0,time:0,bossDead:false,deaths:0,weapon:0};}
function save(){try{localStorage.setItem('sv_save1',JSON.stringify(G.prog));}catch(e){}}
function loadSave(){try{const s=JSON.parse(localStorage.getItem('sv_save1')||'null');if(s&&s.systems&&s.systems.length===SYS.length)return s;}catch(e){}return null;}
function stats(){const u=G.prog.upg;return{maxHull:100+u.hull*25,maxShield:100+u.shield*25,shieldRegen:22+u.shield*6,dmg:1+u.dmg*.15,eng:1+u.engine*.1,maxEnergy:100*(1+u.energy*.2),energyRegen:28*(1+u.energy*.2),maxMissiles:12+u.missile*6};}
function makePlayer(pos,f){const S=stats();const p={pos:[...pos],vel:[0,0,0],f:vnorm(f),u:[0,1,0],hull:S.maxHull,shield:S.maxShield,energy:S.maxEnergy,shieldDelay:0,cd:0,gunSide:1,boost:false,cruise:0,cruiseT:0,lanceOn:false,dead:false,roll:0,scanT:0,heat:0};orthonorm(p);return p;}

function msg(text,col='#bff4ff'){G.msgs.push({text,col,t:6});if(G.msgs.length>6)G.msgs.shift();}

// =====================================================================
//  SYSTEM GENERATION
// =====================================================================
function genSystem(i){
  const d=SYS[i],r=RNG(9001+i*7919);const W={def:d,idx:i,planets:[],asteroids:[],terminals:[],lights:[]};
  W.star={pos:[0,0,0],radius:1700+r()*900,col:d.star};
  W.galN=vnorm(randUnit(r));W.seed=r()*50;
  let dist=8000;const letters='bcdefg';
  d.pt.forEach((type,k)=>{dist+=5000+r()*4000;const ang=r()*TAU,el=(r()-.5)*.35;
    const radius=type===2?1500+r()*900:550+r()*650;const pal=PAL[type](r);
    W.planets.push({pos:[Math.cos(ang)*dist,Math.sin(el)*dist*.3,Math.sin(ang)*dist],radius,type,pal,seed:r()*40,spin:(r()-.5)*.02,ring:(type===2&&r()<.75)||(type===3&&r()<.3),
      tilt:vnorm([r()-.5,2.5,r()-.5]),name:d.name.split(' ')[0].replace(/[^A-Z]/g,'')+' '+letters[k],scanned:false});});
  const host=W.planets[Math.min(1,W.planets.length-1)];
  const away=vnorm(vadd(vnorm(host.pos),[0,.25,0]));const side=vnorm(vcross(away,[0,1,0]));
  if(!d.boss){W.station={pos:vadd(host.pos,vadd(vscale(away,host.radius+2600),vscale(side,900)))};}
  const hub=W.station?W.station.pos:vadd(host.pos,vscale(away,host.radius+4200));W.hub=hub;
  W.arrival=vadd(hub,vadd(vscale(side,-3600),vadd(vscale(away,2600),[0,500,0])));
  // asteroid field
  const fdir=vnorm(vcross(vsub(hub,W.arrival),[0,1,0]));const fc=vadd(vlerp(hub,W.arrival,.5),vscale(fdir,1700));W.fieldC=fc;
  W.haven={pos:vadd(W.arrival,vadd(vscale(fdir,-1500),[0,150,0]))};
  for(let k=0;k<150;k++){const u=randUnit(r);const rr=Math.pow(r(),.6)*2600;const p=vadd(fc,[u[0]*rr,u[1]*rr*.35,u[2]*rr]);
    if(vdist(p,W.arrival)<500||vdist(p,hub)<800)continue;const sz=r()<.08?90+r()*90:12+r()*45;
    W.asteroids.push({pos:p,radius:sz,mesh:(r()*6)|0,axis:randUnit(r),ang:r()*TAU,spin:(r()-.5)*.5});}
  W.asteroids=W.asteroids.filter(a=>vdist(a.pos,W.haven.pos)>a.radius+500);
  // terminals
  if(W.station){for(let k=0;k<d.terms;k++){const a=k/d.terms*TAU+.5+r()*.3;const out=[Math.cos(a),0,Math.sin(a)];
      W.terminals.push({pos:vadd(W.station.pos,vadd(vscale(out,305),[0,(k%2?1:-1)*8,0])),f:out,u:[0,1,0],repaired:false,game:['wires','seq','freq'][(k+i)%3],id:k});}}
  else{for(let k=0;k<d.terms;k++){const a=k/d.terms*TAU;const out=vnorm([Math.cos(a),(k%2?.25:-.2),Math.sin(a)]);const p=vadd(hub,vscale(out,2700));
      const o={pos:p,f:vnorm(out),u:[0,1,0],repaired:false,game:['wires','seq','freq'][k%3],id:k,array:true};orthonorm(o);W.terminals.push(o);}}
  // cache
  let cp;for(let tries=0;tries<20;tries++){cp=vadd(hub,vscale(randUnit(r),9000+r()*5000));if(W.planets.every(p=>vdist(p.pos,cp)>p.radius+1500))break;}
  W.cache={pos:cp,f:randUnit(r),u:[0,1,0],found:false};orthonorm(W.cache);
  return W;}

function chooseType(lvl){const r=Math.random();if(lvl===0)return r<.8?'drone':'raider';if(lvl<=2)return r<.4?'drone':r<.85?'raider':'gunship';return r<.25?'drone':r<.7?'raider':'gunship';}
function makeEnemy(type,pos,lvl){const T=ETYPE[type];const e={type,T,pos:[...pos],vel:[0,0,0],f:randUnit(),u:[0,1,0],hp:T.hp*(1+.2*lvl),maxHp:0,radius:T.radius,fireCd:rand(.5,2),burstLeft:0,burstT:0,
  state:'patrol',home:[...pos],wp:null,mode:'engage',breakT:0,breakPt:null,flash:0,lvl,skill:clamp(.45+lvl*.1,0,.95),dmgMul:1+.13*lvl,provoked:false,dead:false};
  e.maxHp=e.hp;orthonorm(e);return e;}
function spawnGroup(center,n,lvl,attack){for(let k=0;k<n;k++){const e=makeEnemy(chooseType(lvl),vadd(center,vscale(randUnit(),rand(40,160))),lvl);if(attack){e.state='attack';e.provoked=true;e.f=vnorm(vsub(P.pos,e.pos));orthonorm(e);}enemies.push(e);}}
function warpIn(p,col=[.6,.3,1]){parts.push({p:[...p],v:[0,0,0],life:.6,max:.6,s0:60,s1:5,c0:col,c1:[1,1,1],kind:'g'});for(let i=0;i<14;i++)parts.push({p:[...p],v:vscale(randUnit(),rand(80,260)),life:.5,max:.5,s0:3,s1:1,c0:col,c1:col,kind:'s'});}

function loadSystem(i,noSave){
  G.prog.cur=i;const W=genSystem(i);G.sys=W;const ps=G.prog.systems[i];ps.visited=true;if(ps.state==='locked')ps.state='available';
  W.terminals.forEach((t,k)=>t.repaired=!!ps.terms[k]);W.planets.forEach((p,k)=>p.scanned=!!ps.scanned[k]);W.cache.found=!!ps.cache;
  enemies=[];projs=[];parts=[];beams=[];pickups=[];G.target=null;G.manualTarget=false;G.ambushT=-1;
  const lvl=W.def.lvl;const groups=Math.min(6,2+lvl)-(ps.state==='completed'?1:0);
  for(let g=0;g<groups;g++){const c=g%2===0?vadd(W.hub,vscale(randUnit(),rand(1200,2600))):vadd(W.fieldC,vscale(randUnit(),rand(300,1800)));spawnGroup(c,2+((Math.random()*2)|0),lvl,false);}
  if(W.def.boss&&!G.prog.bossDead){const b=makeEnemy('boss',W.hub,lvl);b.hp=b.maxHp=ETYPE.boss.hp;b.f=vnorm(vsub(W.arrival,W.hub));b.u=[0,1,0];orthonorm(b);b.shield=W.terminals.filter(t=>!t.repaired).length;b.state='attack';b.spawnT=8;b.volleyT=10;enemies.push(b);W.boss=b;
    const TP=[[105,52,120],[-105,52,120],[105,52,-100],[-105,52,-100],[0,78,40],[0,-75,-20]];
    TP.forEach(o=>{const t=makeEnemy('turret',W.hub,lvl);t.local=o;t.parent=b;t.state='attack';enemies.push(t);});}
  const f=vnorm(vsub(W.hub,W.arrival));
  if(!P||P.dead){P=makePlayer(W.arrival,f);}else{P.pos=[...W.arrival];P.f=f;P.u=[0,1,0];orthonorm(P);P.vel=vscale(f,300);P.shield=stats().maxShield;P.cruise=0;}
  initDust();G.title={text:W.def.name,sub:W.def.boss?'FINAL SECTOR · THE LEVIATHAN WAITS':`SECTOR ${i+1} · THREAT LEVEL ${lvl+1}`,t:5};
  G.encounterT=rand(70,110);if(!noSave)save();}

// =====================================================================
//  INPUT
// =====================================================================
const isLocked=()=>document.pointerLockElement===hudCv;
const needsLock=()=>settings.mouseMode==='lock'&&!isLocked();
function lockPointer(){if(settings.mouseMode!=='lock')return;try{const r=hudCv.requestPointerLock();if(r&&r.catch)r.catch(()=>{});}catch(e){}}
function releasePointer(){if(document.pointerLockElement)try{document.exitPointerLock();}catch(e){}}
document.addEventListener('pointerlockchange',()=>{if(isLocked()){G.everLocked=true;G.lockErr=0;}else if(G.state==='play'&&settings.mouseMode==='lock'&&G.everLocked)openPause();else if(G.state==='hall'&&settings.mouseMode==='lock'&&G.everLocked)openHallMenu();});
document.addEventListener('pointerlockerror',()=>{G.lockErr++;if(G.lockErr>=3&&!G.everLocked){settings.mouseMode='free';saveSettings();msg('Mouse capture unavailable — switched to free-cursor steering','#ffb347');}});
addEventListener('keydown',e=>{if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT'))return;if(e.repeat&&e.code!=='KeyW')return;keys[e.code]=true;
  if(['Space','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();onKey(e.code);});
addEventListener('keyup',e=>{keys[e.code]=false;});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;mouseDown=false;});
hudCv.addEventListener('mousedown',e=>{audioInit();if(G.state==='docked'){G.drag=true;return;}if(G.state==='hall'){if(needsLock())lockPointer();return;}if(e.button===0){mouseDown=true;if(G.state==='play'&&needsLock())lockPointer();}if(e.button===2)cycleTarget();});
addEventListener('mouseup',e=>{if(e.button===0)mouseDown=false;G.drag=false;});
addEventListener('mousemove',e=>{if(G.drag&&G.state==='docked'&&G.orbit){G.orbit.yaw+=e.movementX*.006;G.orbit.pitch=clamp(G.orbit.pitch+e.movementY*.004,-1.2,1.2);}if(isLocked()){mdx+=e.movementX;mdy+=e.movementY;}mouseX=e.clientX;mouseY=e.clientY;});
hudCv.addEventListener('contextmenu',e=>e.preventDefault());
addEventListener('wheel',e=>{if(G.state==='play')cycleWeapon(e.deltaY>0?1:-1);else if(G.state==='docked'&&G.orbit)G.orbit.dist=clamp(G.orbit.dist*(e.deltaY>0?1.1:.9),240,1600);},{passive:true});
function onKey(code){
  if(G.state==='play'){
    if(code.startsWith('Digit')){const n=+code.slice(5)-1;if(n>=0&&n<WEAPONS.length)selectWeapon(n);}
    if(code==='KeyF')interact();
    if(code==='KeyM')openMap();
    if(code==='KeyU')openShop();
    if(code==='KeyH')toggleCruise();
    if(code==='KeyT')cycleTarget();
    if(code==='Enter'||code==='NumpadEnter')openFlyChat();
    if(code==='KeyP'||(code==='Escape'&&!isLocked()))openPause();
  }else if(G.state==='hall'){if(code==='Tab'||code==='KeyP'||code==='KeyM'||(code==='Escape'&&!isLocked()))openHallMenu();else if(code==='KeyF')hallInteract();else if(code==='Enter'||code==='NumpadEnter')openFlyChat();
    else if(code.startsWith('Digit')){const k=['wave','spin','fire','love','drink'][+code.slice(5)-1];if(k)myEmote(k);}}
  else if(G.state==='hallmenu'){if(code==='Tab'||code==='Escape'||code==='KeyM'||code==='KeyP')closeHallMenu();}
  else if(G.state==='map'){if(code==='KeyM'||code==='Escape')closeMap();}
  else if(G.state==='shop'){if(code==='KeyU'||code==='Escape')closeShop();}
  else if(G.state==='term'){if(code==='Escape')closeTerminal();}
  else if(G.state==='pause'){if(code==='KeyP'||code==='Escape')resume();}}
function selectWeapon(n){if(!G.prog.unlocked[WEAPONS[n].id]){msg(WEAPONS[n].name+' — NOT ACQUIRED','#ff8a7a');SFX.empty();return;}if(G.prog.weapon!==n){G.prog.weapon=n;SFX.ui();}}
function cycleWeapon(d){let n=G.prog.weapon;for(let k=0;k<WEAPONS.length;k++){n=(n+d+WEAPONS.length)%WEAPONS.length;if(G.prog.unlocked[WEAPONS[n].id]){selectWeapon(n);return;}}}
function cycleTarget(){if(G.state!=='play')return;const list=enemies.filter(e=>!e.dead&&vdist(e.pos,P.pos)<6000).sort((a,b)=>vdist(a.pos,P.pos)-vdist(b.pos,P.pos));
  if(!list.length){G.target=null;G.manualTarget=false;return;}const i=list.indexOf(G.target);G.target=list[(i+1)%list.length];G.manualTarget=true;SFX.ui();}

// =====================================================================
//  PLAYER
// =====================================================================
function rotShip(o,yaw,pitch,roll){let r=vnorm(vcross(o.f,o.u));
  if(yaw){o.f=vnorm(vadd(vscale(o.f,Math.cos(yaw)),vscale(r,Math.sin(yaw))));}
  if(pitch){const f=o.f,u=o.u;o.f=vnorm(vadd(vscale(f,Math.cos(pitch)),vscale(u,Math.sin(pitch))));o.u=vnorm(vsub(vscale(u,Math.cos(pitch)),vscale(f,Math.sin(pitch))));}
  orthonorm(o);r=vnorm(vcross(o.f,o.u));
  if(roll){o.u=vnorm(vadd(vscale(o.u,Math.cos(roll)),vscale(r,Math.sin(roll))));orthonorm(o);}}
function hostilesNear(d){return enemies.some(e=>!e.dead&&e.state==='attack'&&!e.T.static&&!e.T.boss&&vdist(e.pos,P.pos)<d);}
function toggleCruise(){if(P.cruise>0){P.cruise=0;msg('Cruise drive disengaged');return;}
  if(hostilesNear(1800)){msg('CRUISE INHIBITED — hostiles in range','#ff8a7a');SFX.empty();return;}
  P.cruise=1;P.cruiseT=1.3;msg('Cruise drive spooling…');tone(200,'sawtooth',1.3,.06,800);}
function updatePlayer(dt){
  const S=stats(),W=G.sys;
  let yaw=0,pitch=0,roll=0;const turnMul=(P.cruise===2?.45:1)*(.9+.1*S.eng);
  if(isLocked()){const s=settings.sens*.0021;yaw=mdx*s;pitch=-mdy*s*(settings.invert?-1:1);}
  else if(settings.mouseMode==='free'){const nx=(mouseX/innerWidth-.5)*2,ny=(mouseY/innerHeight-.5)*2;const dz=v=>Math.abs(v)<.05?0:Math.sign(v)*(Math.abs(v)-.05)/.95;
    yaw=dz(nx)*1.9*dt;pitch=-dz(ny)*1.6*dt*(settings.invert?-1:1);}
  mdx=mdy=0;
  yaw+=((keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0))*1.5*dt;pitch+=((keys.ArrowUp?1:0)-(keys.ArrowDown?1:0))*1.3*dt;
  const rollIn=(keys.KeyE?1:0)-(keys.KeyQ?1:0);P.roll=lerp(P.roll,rollIn*2.2,1-Math.exp(-dt*6));roll=P.roll*dt;
  yaw=clamp(yaw*turnMul,-.2,.2);pitch=clamp(pitch*turnMul,-.2,.2);rotShip(P,yaw,pitch,roll);
  const r=rightOf(P);
  // cruise state
  if(P.cruise===1){P.cruiseT-=dt;if(P.cruiseT<=0){P.cruise=2;msg('CRUISE DRIVE ENGAGED','#7ff0ff');noise(1.2,.12,300,1,'bandpass',2000);}}
  if(P.cruise>0){let why=null;if(hostilesNear(1800))why='HOSTILE CONTACT';
    if(W.station&&vdist(P.pos,W.station.pos)<1000)why='PROXIMITY — STATION';
    for(const p of W.planets)if(vdist(P.pos,p.pos)<p.radius+900)why='PROXIMITY — PLANET';
    if(vdist(P.pos,W.star.pos)<W.star.radius*2.2)why='STELLAR HEAT';
    if(keys.KeyS)why='MANUAL';
    if(why){P.cruise=0;msg('Cruise dropped: '+why,'#ffb347');P.vel=vscale(P.f,250);}}
  const fwd=(keys.KeyW?1:0)-(keys.KeyS?.55:0);const strafe=(keys.KeyD?1:0)-(keys.KeyA?1:0);const vert=(keys.Space?1:0)-(keys.KeyC?1:0);
  P.boost=(keys.ShiftLeft||keys.ShiftRight)&&P.energy>4&&fwd>0&&P.cruise===0;
  let desired,rate;
  if(P.cruise===2){desired=vscale(P.f,1700*S.eng);rate=.9;}
  else{const maxF=(P.boost?380:155)*S.eng;desired=vadd(vadd(vscale(P.f,fwd*maxF),vscale(r,strafe*80*S.eng)),vscale(P.u,vert*80*S.eng));rate=P.boost?1.3:1.7;if(P.boost)P.energy-=20*dt;}
  P.vel=vlerp(P.vel,desired,1-Math.exp(-dt*rate));P.pos=vmadd(P.pos,P.vel,dt);
  // collisions
  for(const p of W.planets){const d=vsub(P.pos,p.pos),l=vlen(d);if(l<p.radius+8){const n=vscale(d,1/l);P.pos=vmadd(p.pos,n,p.radius+8);const vn=vdot(P.vel,n);if(vn<0){if(vn<-60)damagePlayer(-vn*.15,null,true);P.vel=vmadd(P.vel,n,-vn*1.5);}}}
  const ds=vdist(P.pos,W.star.pos);if(ds<W.star.radius*1.6){if(Math.random()<dt*3)msg('HULL TEMPERATURE CRITICAL','#ff5d6c');damagePlayer(dt*(30+(W.star.radius*1.6-ds)*.05),null,true);}
  if(ds<W.star.radius+10){const n=vnorm(vsub(P.pos,W.star.pos));P.pos=vmadd(W.star.pos,n,W.star.radius+10);}
  for(const a of W.asteroids){const d=vsub(P.pos,a.pos),l=vlen(d),m=a.radius*.85+6;if(l<m&&l>.01){const n=vscale(d,1/l);P.pos=vmadd(a.pos,n,m);const vn=vdot(P.vel,n);if(vn<0){if(vn<-40)damagePlayer(-vn*.12,null,true);P.vel=vmadd(P.vel,n,-vn*1.6);G.shake=Math.max(G.shake,.5);}}}
  if(W.station){const q=vsub(P.pos,W.station.pos);const rad=Math.hypot(q[0],q[2]);const dr=Math.hypot(rad-240,q[1]);
    if(dr<32&&rad>1){const n=vnorm([(q[0]/rad)*(rad-240),q[1],(q[2]/rad)*(rad-240)]);P.pos=vmadd(P.pos,n,32-dr);bump(n);}
    if(rad<62&&Math.abs(q[1])<190&&rad>.01){const n=[q[0]/rad,0,q[2]/rad];P.pos=vmadd(P.pos,n,62-rad);bump(n);}}
  if(W.haven){const q=vsub(P.pos,W.haven.pos);const rad=Math.hypot(q[0],q[2]);const dr=Math.hypot(rad-160,q[1]);
    if(dr<24&&rad>1){const n=vnorm([(q[0]/rad)*(rad-160),q[1],(q[2]/rad)*(rad-160)]);P.pos=vmadd(P.pos,n,24-dr);bump(n);}
    if(rad<56&&Math.abs(q[1])<160&&rad>.01){const n=[q[0]/rad,0,q[2]/rad];P.pos=vmadd(P.pos,n,56-rad);bump(n);}}
  for(const e of enemies){if(e.dead||!e.T.boss)continue;for(const s of hitSpheres(e)){const d=vsub(P.pos,s.c),l=vlen(d);if(l<s.r+8&&l>.01){const n=vscale(d,1/l);P.pos=vmadd(s.c,n,s.r+8);bump(n);}}
    if(e.shield>0){const d=vsub(P.pos,e.pos),l=vlen(d);if(l<SHIELD_R+8){const n=vscale(d,1/l);P.pos=vmadd(e.pos,n,SHIELD_R+8);bump(n);G.shieldFlash=.6;}}}
  const sysR=60000;if(vlen(P.pos)>sysR){P.vel=vmadd(P.vel,vnorm(P.pos),-300*dt);if(Math.random()<dt)msg('Leaving system space — use the Galaxy Map [M] to jump','#ffb347');}
  // regen
  P.shieldDelay-=dt;if(P.shieldDelay<=0)P.shield=Math.min(S.maxShield,P.shield+S.shieldRegen*dt);
  if(!P.boost&&!P.lanceOn)P.energy=Math.min(S.maxEnergy,P.energy+S.energyRegen*dt);P.energy=Math.max(0,P.energy);
  playerWeapons(dt);}
function bump(n){const vn=vdot(P.vel,n);if(vn<0){if(vn<-50)damagePlayer(-vn*.1,null,true);P.vel=vmadd(P.vel,n,-vn*1.5);G.shake=Math.max(G.shake,.4);}}
function damagePlayer(dmg,src,physical){if(P.dead||G.state!=='play')return;P.shieldDelay=3;
  if(P.shield>0){const a=Math.min(P.shield,dmg);P.shield-=a;dmg-=a;G.shieldFlash=Math.min(1,G.shieldFlash+.5);if(!physical||Math.random()<.3)SFX.shield();}
  if(dmg>0){P.hull-=dmg;G.dmgFlash=Math.min(1,G.dmgFlash+.25+dmg*.02);G.shake=Math.max(G.shake,.3+dmg*.03);if(!physical||Math.random()<.4)SFX.hull();
    if(P.hull<35&&P.hull+dmg>=35){msg('WARNING — HULL INTEGRITY LOW','#ff5d6c');SFX.alarm();}}
  if(P.hull<=0)killPlayer();}
function killPlayer(){P.dead=true;P.hull=0;explode(P.pos,30,[1,.6,.3]);G.state='dying';G.deathT=1.8;P.cruise=0;P.lanceOn=false;releasePointer();G.prog.deaths++;}

// ----- Weapons -----
function muzzle(side){const r=rightOf(P);return vadd(vadd(P.pos,vscale(r,side*3.2)),vadd(vscale(P.u,-2.6),vscale(P.f,9)));}
function leadPoint(e,spd,from){let t=vdist(e.pos,from)/spd;let aim=e.pos;for(let k=0;k<3;k++){aim=vadd(e.pos,vscale(vsub(e.vel,P.vel),t));t=vdist(aim,from)/spd;}return aim;}
function aimDir(spd){const W=WEAPONS[G.prog.weapon];const tg=G.target;if(tg&&!tg.dead&&spd){const aim=leadPoint(tg,spd,P.pos);const d=vnorm(vsub(aim,P.pos));if(vdot(d,P.f)>Math.cos(3.2*DEG))return d;}
  else if(tg&&!tg.dead){const d=vnorm(vsub(tg.pos,P.pos));if(vdot(d,P.f)>Math.cos(2*DEG))return d;}return P.f;}
function playerWeapons(dt){
  const S=stats();const W=WEAPONS[G.prog.weapon];P.cd-=dt;G.emptyT-=dt;
  const firing=mouseDown&&P.cruise===0&&!needsLock();P.firingW=firing?G.prog.weapon:-1;
  if(W.kind==='lance'){if(firing&&P.energy>1){P.lanceOn=true;P.energy-=W.eps*dt;const o=muzzle(0);const d=aimDir(0);const R=raycast(o,d,W.range);let end=vmadd(o,d,R.block);
      if(R.hits.length){const h=R.hits[0];end=vmadd(o,d,h.t);damageEnemy(h.e,W.dps*S.dmg*dt,end,true);if(Math.random()<.5)spark(end,W.col,2);}
      else if(R.block<W.range&&Math.random()<.4)spark(end,W.col,1);
      const o2=vmadd(o,d,14);beams.push({a:o2,b:end,w:1.5,col:W.col,life:.001,max:.001});beams.push({a:o2,b:end,w:.5,col:[1,1,1],life:.001,max:.001});}else P.lanceOn=false;return;}
  P.lanceOn=false;
  if(!firing||P.cd>0)return;
  if(W.ammo){if(G.prog.missiles<=0){if(G.emptyT<=0){msg('NO MISSILES — find crates or restock at a station','#ff8a7a');SFX.empty();G.emptyT=1;}P.cd=.4;return;}G.prog.missiles--;}
  else{if(P.energy<W.energy){if(G.emptyT<=0){SFX.empty();G.emptyT=.4;}return;}P.energy-=W.energy;}
  P.cd=1/W.rof;const dmul=S.dmg;
  if(W.kind==='bolt'){const dir=aimDir(W.speed);P.gunSide*=-1;const n=W.pellets||1;
    for(let k=0;k<n;k++){let d=dir;if(W.spread){const r=rightOf(P);const a=Math.random()*TAU,s=Math.tan(W.spread*DEG)*Math.sqrt(Math.random());d=vnorm(vadd(d,vadd(vscale(r,Math.cos(a)*s),vscale(P.u,Math.sin(a)*s))));}
      const o=muzzle(n>1?0:P.gunSide);projs.push({p:o,prev:o,v:vadd(vscale(d,W.speed),P.vel),life:2.2,dmg:W.dmg*dmul,own:'p',col:W.col,size:W.size,len:W.len,kind:'bolt'});}
    W.id==='pulse'?SFX.pulse():SFX.scatter();flashMuzzle(W.col);}
  else if(W.kind==='missile'){P.gunSide*=-1;const o=muzzle(P.gunSide*1.3);let tg=G.target&&!G.target.dead?G.target:null;
    if(!tg){let best=-1;for(const e of enemies){if(e.dead)continue;const d=vsub(e.pos,P.pos),l=vlen(d);const c=vdot(d,P.f)/l;if(c>.8&&l<3500&&c-l/9000>best){best=c-l/9000;tg=e;}}}
    projs.push({p:o,prev:o,v:vadd(vscale(P.f,W.speed),P.vel),life:6,dmg:W.dmg*dmul,splash:W.splash*dmul,splashR:W.splashR,own:'p',col:W.col,kind:'missile',target:tg,age:0});SFX.missile();}
  else if(W.kind==='rail'){const o=muzzle(0);const d=aimDir(0);const R=raycast(o,d,W.range);let hitAny=false;
    for(const h of R.hits){damageEnemy(h.e,W.dmg*dmul,vmadd(o,d,h.t));spark(vmadd(o,d,h.t),W.col,10);hitAny=true;}
    const end=vmadd(o,d,R.block);const o2=vmadd(o,d,14);beams.push({a:o2,b:end,w:2.4,col:W.col,life:.45,max:.45});beams.push({a:o2,b:end,w:.8,col:[1,1,1],life:.3,max:.3});
    for(let k=0;k<30;k++){const t=Math.random()*Math.min(R.block,1500);parts.push({p:vmadd(o,d,t),v:vscale(randUnit(),rand(5,25)),life:.7,max:.7,s0:1.6,s1:0,c0:W.col,c1:[.3,.1,.6],kind:'g'});}
    if(R.block<W.range)spark(end,W.col,8);SFX.rail();G.shake=Math.max(G.shake,.25);flashMuzzle(W.col);}
  else if(W.kind==='nova'){const d=aimDir(W.speed);const o=muzzle(0);projs.push({p:o,prev:o,v:vadd(vscale(d,W.speed),P.vel),life:4,dmg:W.dmg*dmul,splash:W.splash*dmul,splashR:W.splashR,own:'p',col:W.col,size:W.size,kind:'nova'});SFX.nova();G.shake=Math.max(G.shake,.3);flashMuzzle(W.col);}}
function flashMuzzle(col){G.muzzle={col,t:.06};}

// =====================================================================
//  COMBAT HELPERS
// =====================================================================
const SHIELD_R=560;
function hitSpheres(e){if(e.T.spheres)return e.T.spheres.map(s=>({c:localToWorld(e,s,e.T.scale),r:s[3]*e.T.scale}));return[{c:e.pos,r:e.radius}];}
function raySphere(o,d,c,r){const oc=vsub(o,c);const b=vdot(oc,d);const cc=vdot(oc,oc)-r*r;const disc=b*b-cc;if(disc<0)return-1;const s=Math.sqrt(disc);let t=-b-s;if(t<0)t=-b+s;return t<0?-1:t;}
function segSphere(a,b,c,r){const ab=vsub(b,a);const L=vdot(ab,ab);let t=L>0?clamp(vdot(vsub(c,a),ab)/L,0,1):0;const p=vmadd(a,ab,t);const d=vsub(p,c);return vdot(d,d)<r*r?t:-1;}
function raycast(o,d,range){const W=G.sys;let block=range;
  for(const a of W.asteroids){if(vdist(a.pos,o)>range+a.radius)continue;const t=raySphere(o,d,a.pos,a.radius*.85);if(t>=0&&t<block)block=t;}
  for(const p of W.planets){const t=raySphere(o,d,p.pos,p.radius);if(t>=0&&t<block)block=t;}
  if(W.boss&&!W.boss.dead&&W.boss.shield>0){const t=raySphere(o,d,W.boss.pos,SHIELD_R);if(t>=0&&t<block&&vdist(o,W.boss.pos)>SHIELD_R){block=t;shieldHit(vmadd(o,d,t));}}
  const hits=[];for(const e of enemies){if(e.dead)continue;if(vdist(e.pos,o)>block+e.radius*4)continue;let best=-1;for(const s of hitSpheres(e)){const t=raySphere(o,d,s.c,s.r);if(t>=0&&(best<0||t<best))best=t;}if(best>=0&&best<block)hits.push({e,t:best});}
  hits.sort((a,b)=>a.t-b.t);return{hits,block};}
function shieldHit(p){parts.push({p:[...p],v:[0,0,0],life:.35,max:.35,s0:40,s1:10,c0:[.4,.8,1],c1:[.1,.3,.8],kind:'g'});G.bossShieldFlash=.5;}
function spark(p,col,n){for(let i=0;i<n;i++)parts.push({p:[...p],v:vscale(randUnit(),rand(30,160)),life:rand(.2,.5),max:.5,s0:1.4,s1:0,c0:[1,1,1],c1:col,kind:'s'});
  parts.push({p:[...p],v:[0,0,0],life:.12,max:.12,s0:6,s1:2,c0:[1,1,1],c1:col,kind:'g'});}
function explode(p,size,col=[1,.55,.2]){
  parts.push({p:[...p],v:[0,0,0],life:.22,max:.22,s0:size*5,s1:size*2,c0:[1,1,.9],c1:[1,.6,.2],kind:'g'});
  for(let i=0;i<10+size*.4;i++)parts.push({p:vmadd(p,randUnit(),size*.2),v:vscale(randUnit(),size*rand(1,5)),life:rand(.6,1.3),max:1.3,s0:size*rand(.6,1.3),s1:size*rand(1.5,2.6),c0:[1,.85,.5],c1:[.5,.1,.03],kind:'g',drag:2});
  for(let i=0;i<20+size;i++)parts.push({p:[...p],v:vscale(randUnit(),size*rand(6,18)),life:rand(.4,1.1),max:1.1,s0:size*.12+.6,s1:0,c0:[1,.95,.7],c1:col,kind:'s',drag:1});
  for(let i=0;i<6;i++)parts.push({p:[...p],v:vscale(randUnit(),size*rand(2,6)),life:rand(1.5,3),max:3,s0:size*.15+.5,s1:0,c0:[1,.5,.15],c1:[.3,.05,0],kind:'e',drag:.3});
  const d=vdist(p,P.pos);G.shake=Math.max(G.shake,clamp(size*8/(d+50),0,1.2));SFX.boom(size,p);}
function damageEnemy(e,dmg,at,silent){if(e.dead||e.dying)return;if(e.T.boss&&e.shield>0){shieldHit(at||e.pos);return;}
  e.hp-=dmg;e.flash=1;if(!e.provoked){e.provoked=true;e.state='attack';for(const o of enemies)if(!o.dead&&vdist(o.pos,e.pos)<900){o.provoked=true;o.state='attack';}}
  if(!silent||Math.random()<.08){G.hitMark=1;SFX.hit();}
  if(e.hp<=0)killEnemy(e);}
function splashDamage(p,dmg,r){for(const e of enemies){if(e.dead)continue;const d=vdist(e.pos,p)-e.radius*.5;if(d<r)damageEnemy(e,dmg*(1-Math.max(0,d)/r),p,true);}}
function killEnemy(e){e.dead=true;G.prog.kills++;const T=e.T;
  if(T.boss){bossDefeated(e);return;}
  explode(e.pos,e.radius*1.4);const cr=Math.round(T.credits*(1+e.lvl*.25));const n=Math.min(5,1+(cr/25|0));
  for(let k=0;k<n;k++)pickups.push({kind:'cr',val:Math.ceil(cr/n),pos:vmadd(e.pos,randUnit(),5),vel:vscale(randUnit(),rand(20,70)),life:40});
  if(T.elite&&Math.random()<.45||Math.random()<.06)pickups.push({kind:'crate',pos:[...e.pos],vel:vscale(randUnit(),20),life:60,f:randUnit(),u:[0,1,0],spin:rand(-1,1)});
  else if(Math.random()<.12)pickups.push({kind:'repair',pos:[...e.pos],vel:vscale(randUnit(),25),life:40});
  if(G.target===e){G.target=null;G.manualTarget=false;}}
function enemyFire(e,dir,g){const T=e.T;const o=localToWorld(e,g,T.scale);let d=dir;const sp=(1-e.skill)*.035;d=vnorm(vadd(d,vscale(randUnit(),sp)));
  const plasma=T.proj==='plasma';projs.push({p:o,prev:o,v:vadd(vscale(d,T.pspeed),plasma?[0,0,0]:e.vel),life:3,dmg:T.dmg*e.dmgMul,own:'e',col:plasma?[1,.35,.6]:[1,.25,.18],size:plasma?3.2:1.6,len:plasma?6:14,kind:plasma?'plasma':'bolt'});
  plasma?SFX.ePlasma(o):SFX.eShot(o);}

// =====================================================================
//  ENEMY AI
// =====================================================================
function steer(e,dir,spd,dt){const T=e.T;const d=vdot(e.f,dir);const ang=Math.acos(clamp(d,-1,1));
  if(ang>1e-4){const t=Math.min(1,T.turn*dt/ang);let nf=d<-.98?vnorm(vadd(e.f,vscale(e.u,.3))):vnorm(vadd(vscale(e.f,1-t),vscale(dir,t)));
    const lat=vsub(dir,vscale(e.f,d));e.f=nf;e.u=vnorm(vadd(e.u,vscale(lat,dt*2.5)));e.u=vnorm(vlerp(e.u,[0,1,0],dt*.4));}
  orthonorm(e);e.vel=vlerp(e.vel,vscale(e.f,spd),1-Math.exp(-dt*2.2));e.pos=vmadd(e.pos,e.vel,dt);}
function updateEnemy(e,dt){const T=e.T;e.flash=Math.max(0,e.flash-dt*5);
  if(T.static){const b=e.parent;if(!b||b.dead){if(!e.dead){e.dead=true;explode(e.pos,20);}return;}
    const np=localToWorld(b,e.local,1);e.vel=vscale(vsub(np,e.pos),1/Math.max(dt,1e-3));e.pos=np;
    const lead=vadd(P.pos,vscale(P.vel,vdist(e.pos,P.pos)/T.pspeed*e.skill));const d=vnorm(vsub(lead,e.pos));e.f=vnorm(vlerp(e.f,d,Math.min(1,dt*3)));e.u=b.u;orthonorm(e);
    fireLogic(e,dt,d,vdist(e.pos,P.pos));return;}
  if(T.boss){bossAI(e,dt);return;}
  {const hv=G.sys.haven;if(hv){const dh=vdist(e.pos,hv.pos);if(dh<1400){steer(e,vnorm(vsub(e.pos,hv.pos)),T.speed,dt);return;}}}
  const toP=vsub(P.pos,e.pos),dist=vlen(toP);
  if(P.dead){e.state='patrol';}
  if(e.state==='patrol'){if(!P.dead&&(dist<T.aggro||e.provoked)){e.state='attack';}
    else{if(!e.wp||vdist(e.pos,e.wp)<80)e.wp=vadd(e.home,vscale(randUnit(),rand(150,700)));steer(e,vnorm(vsub(e.wp,e.pos)),T.speed*.45,dt);return;}}
  if(dist>T.aggro*2.6&&!e.provoked){e.state='patrol';return;}
  const lead=vadd(P.pos,vscale(vsub(P.vel,e.vel),dist/T.pspeed*e.skill));const toLead=vnorm(vsub(lead,e.pos));
  let desired=toLead,spd=T.speed;
  if(e.mode==='break'){desired=vnorm(vsub(e.breakPt,e.pos));e.breakT-=dt;spd*=1.15;if(e.breakT<=0||vdist(e.pos,e.breakPt)<70)e.mode='engage';}
  else if(dist<T.minDist){e.mode='break';e.breakT=rand(1,2);const side=vnorm(vcross(toP,randUnit()));e.breakPt=vadd(e.pos,vadd(vscale(side,rand(300,600)),vscale(vnorm(toP),rand(100,300))));}
  else spd=T.speed*clamp(dist/550,.55,1);
  if(T.orbit){const tan=vnorm(vcross(toP,e.u));desired=vnorm(vadd(vscale(tan,.8),vscale(vnorm(toP),clamp((dist-T.orbit)/T.orbit,-1,1)*1.5)));spd=T.speed*(dist>T.orbit*1.5?1.3:1);}
  for(const o of enemies){if(o===e||o.dead||o.T.boss)continue;const d=vsub(e.pos,o.pos),l=vlen(d),m=e.radius+o.radius+35;if(l<m&&l>.01)desired=vnorm(vadd(desired,vscale(d,(m-l)/m*2.5/l)));}
  if(dist<e.radius+30)desired=vnorm(vadd(desired,vscale(vnorm(toP),-2)));
  const W=G.sys;for(const a of W.asteroids){const d=vsub(e.pos,a.pos),l=vlen(d);if(l<a.radius+e.radius+40&&l>.01)desired=vnorm(vadd(desired,vscale(d,1.5/l)));}
  steer(e,desired,spd,dt);
  for(const a of W.asteroids){const d=vsub(e.pos,a.pos),l=vlen(d),m=a.radius*.85+e.radius;if(l<m&&l>.01)e.pos=vmadd(a.pos,vscale(d,1/l),m);}
  fireLogic(e,dt,T.omni?toLead:e.f,dist,toLead);}
function fireLogic(e,dt,dir,dist,toLead){const T=e.T;if(P.dead)return;if(G.sys.haven&&vdist(P.pos,G.sys.haven.pos)<900)return;e.fireCd-=dt;
  const can=T.omni?dist<T.range:(vdot(e.f,toLead)>.955&&dist<T.range);
  if(e.fireCd<=0&&can&&e.burstLeft<=0){e.burstLeft=T.burst;e.burstT=0;e.fireCd=T.rof*rand(.8,1.35)/(1+e.lvl*.06);}
  if(e.burstLeft>0){e.burstT-=dt;if(e.burstT<=0){e.burstT=T.proj==='plasma'?.14:.1;e.burstLeft--;const g=T.guns[e.burstLeft%T.guns.length];enemyFire(e,vnorm(vsub(vadd(P.pos,vscale(T.omni?P.vel:vsub(P.vel,e.vel),dist/T.pspeed*e.skill)),localToWorld(e,g,T.scale))),g);}}}
function bossAI(b,dt){const toP=vsub(P.pos,b.pos),dist=vlen(toP);
  const d=vnorm(toP);const ang=Math.acos(clamp(vdot(b.f,d),-1,1));if(ang>.01){const t=Math.min(1,b.T.turn*dt/ang);b.f=vnorm(vlerp(b.f,d,t));orthonorm(b);}
  const tgt=dist>1800?b.T.speed:0;b.vel=vlerp(b.vel,vscale(b.f,tgt),dt*.3);b.pos=vmadd(b.pos,b.vel,dt);
  if(P.dead)return;
  b.spawnT-=dt;if(b.spawnT<=0){b.spawnT=b.hp<b.maxHp*.5?12:17;const n=enemies.filter(e=>!e.dead&&e.type==='drone').length;if(n<7){const mp=localToWorld(b,[0,0,300]);for(let k=0;k<2+(b.hp<b.maxHp*.5?1:0);k++){const e=makeEnemy(k%2?'raider':'drone',vmadd(mp,randUnit(),30),b.lvl);e.state='attack';e.provoked=true;e.f=b.f;orthonorm(e);e.vel=vscale(b.f,200);enemies.push(e);}msg('Leviathan launching fighters','#ff8a7a');}}
  if(b.hp<b.maxHp*.5){b.volleyT-=dt;if(b.volleyT<=0&&dist<4000){b.volleyT=7;const o=localToWorld(b,[0,0,270]);for(let k=0;k<5;k++){const dir=vnorm(vadd(vnorm(vsub(P.pos,o)),vscale(randUnit(),.12)));projs.push({p:o,prev:o,v:vscale(dir,300),life:9,dmg:22,own:'e',col:[1,.2,.5],size:12,kind:'orb',homing:.6});}SFX.nova();msg('WARNING — MAW CANNON CHARGING','#ff5d6c');}}}
function bossDefeated(b){G.prog.bossDead=true;b.dead=false;b.dying=true;G.bossDeathT=5;msg('THE LEVIATHAN IS BREAKING APART!','#7ff0ff');for(const e of enemies)if(e.parent===b&&!e.dead){e.dead=true;explode(e.pos,25);}}

// =====================================================================
//  PROJECTILES / PARTICLES / PICKUPS
// =====================================================================
function updateProjectiles(dt){const W=G.sys;
  for(const p of projs){if(p.life<=0)continue;p.prev=[...p.p];
    if(p.kind==='missile'){p.age+=dt;if(p.target&&!p.target.dead&&p.age>.15){const aim=leadPoint(p.target,Math.max(300,vlen(p.v)),p.p);const want=vnorm(vsub(aim,p.p));const cur=vnorm(p.v);const nd=vnorm(vlerp(cur,want,Math.min(1,dt*3.5)));p.v=vscale(nd,Math.min(720,vlen(p.v)+500*dt));}else p.v=vscale(vnorm(p.v),Math.min(720,vlen(p.v)+400*dt));
      if(Math.random()<.9)parts.push({p:[...p.p],v:vscale(randUnit(),8),life:.5,max:.5,s0:2.2,s1:4,c0:[1,.7,.3],c1:[.3,.1,.05],kind:'g'});}
    if(p.kind==='orb'&&p.homing){const want=vnorm(vsub(P.pos,p.p));p.v=vscale(vnorm(vlerp(vnorm(p.v),want,dt*p.homing)),vlen(p.v));}
    p.p=vmadd(p.p,p.v,dt);p.life-=dt;
    if(p.own==='x')continue;
    if(p.own==='p'){
      if(W.boss&&!W.boss.dead&&W.boss.shield>0&&vdist(p.prev,W.boss.pos)>SHIELD_R&&segSphere(p.prev,p.p,W.boss.pos,SHIELD_R)>=0){shieldHit(p.p);p.life=0;continue;}
      let hit=null;for(const e of enemies){if(e.dead)continue;if(vdist(e.pos,p.p)>e.radius*5+vlen(p.v)*dt)continue;for(const s of hitSpheres(e))if(segSphere(p.prev,p.p,s.c,s.r)>=0){hit=e;break;}if(hit)break;}
      if(hit){if(p.splash){explode(p.p,p.kind==='nova'?22:9,p.col);splashDamage(p.p,p.splash,p.splashR);}else spark(p.p,p.col,5);damageEnemy(hit,p.dmg,p.p);p.life=0;continue;}
      if(p.life<=0&&p.kind==='nova'){explode(p.p,22,p.col);splashDamage(p.p,p.splash,p.splashR);continue;}
    }else{if(!P.dead&&segSphere(p.prev,p.p,P.pos,p.kind==='orb'?18:9)>=0){damagePlayer(p.dmg,p.p);p.life=0;spark(p.p,p.col,6);if(p.kind==='orb')explode(p.p,10,p.col);continue;}}
    for(const a of W.asteroids){if(Math.abs(a.pos[0]-p.p[0])>a.radius+60)continue;if(segSphere(p.prev,p.p,a.pos,a.radius*.85)>=0){if(p.splash){explode(p.p,p.kind==='nova'?22:9,p.col);splashDamage(p.p,p.splash,p.splashR);}else spark(p.p,[.8,.6,.4],3);p.life=0;break;}}}
  projs=projs.filter(p=>p.life>0);}
function updateParticles(dt){for(const q of parts){q.life-=dt;if(q.drag)q.v=vscale(q.v,Math.exp(-q.drag*dt));q.p=vmadd(q.p,q.v,dt);}parts=parts.filter(q=>q.life>0);if(parts.length>6000)parts.splice(0,parts.length-6000);
  for(const b of beams)b.life-=dt;beams=beams.filter(b=>b.life>0);}
function updatePickups(dt){const S=stats();
  for(const k of pickups){k.life-=dt;k.vel=vscale(k.vel,Math.exp(-dt*1.2));const d=vsub(P.pos,k.pos),l=vlen(d);
    if(!P.dead&&l<(k.kind==='cr'?260:180)){k.vel=vadd(k.vel,vscale(d,dt*6/Math.max(l,1)*Math.max(200,600-l)));}
    k.pos=vmadd(k.pos,k.vel,dt);
    if(!P.dead&&l<(k.kind==='crate'?32:20)){k.life=0;
      if(k.kind==='cr'){G.prog.credits+=k.val;G.crPop=(G.crPop||0)+k.val;G.crPopT=1.5;tone(1400+Math.random()*300,'sine',.06,.04);}
      else if(k.kind==='repair'){P.hull=Math.min(S.maxHull,P.hull+25);msg('+25 HULL — nanite repair pack','#5dff9b');SFX.pick();}
      else{openCrate();}}}
  pickups=pickups.filter(k=>k.life>0);}
function nextLocked(){return UNLOCK_ORDER.find(id=>!G.prog.unlocked[id]);}
function unlockWeapon(id){G.prog.unlocked[id]=true;const i=WEAPONS.findIndex(w=>w.id===id);G.prog.weapon=i;if(id==='seeker')G.prog.missiles=Math.max(G.prog.missiles,stats().maxMissiles);
  G.title={text:'NEW WEAPON',sub:WEAPONS[i].name+` · PRESS ${i+1}`,t:4,col:'#ffb347'};SFX.unlock();msg('ACQUIRED: '+WEAPONS[i].name,'#ffb347');save();}
function openCrate(){const S=stats();const nl=nextLocked();
  if(nl&&Math.random()<.35){unlockWeapon(nl);return;}
  if(G.prog.unlocked.seeker&&G.prog.missiles<S.maxMissiles&&Math.random()<.6){const n=Math.min(S.maxMissiles-G.prog.missiles,6);G.prog.missiles+=n;msg(`+${n} SEEKER MISSILES`,'#ffb347');SFX.pick();return;}
  const c=150+G.sys.def.lvl*80;G.prog.credits+=c;msg(`Supply crate: +${c} CR`,'#ffd27a');SFX.pick();}

// =====================================================================
//  WORLD UPDATE
// =====================================================================
function initDust(){dust=[];for(let i=0;i<260;i++)dust.push(vadd(P.pos,[rand(-300,300),rand(-300,300),rand(-300,300)]));}
function updateDust(){for(const d of dust)for(let k=0;k<3;k++){const o=d[k]-P.pos[k];if(o>300)d[k]-=600;else if(o<-300)d[k]+=600;}}
function update(dt){
  G.t+=dt;G.dmgFlash=Math.max(0,G.dmgFlash-dt*1.8);G.shieldFlash=Math.max(0,G.shieldFlash-dt*2.5);G.hitMark=Math.max(0,G.hitMark-dt*5);G.whiteFlash=Math.max(0,G.whiteFlash-dt*1.2);G.shake=Math.max(0,G.shake-dt*2.5);
  G.bossShieldFlash=Math.max(0,(G.bossShieldFlash||0)-dt*2);if(G.muzzle){G.muzzle.t-=dt;if(G.muzzle.t<=0)G.muzzle=null;}if(G.crPopT>0){G.crPopT-=dt;if(G.crPopT<=0)G.crPop=0;}
  for(const m of G.msgs)m.t-=dt;G.msgs=G.msgs.filter(m=>m.t>0);if(G.title){G.title.t-=dt;if(G.title.t<=0)G.title=null;}
  const W=G.sys;for(const a of W.asteroids)a.ang+=a.spin*dt;
  netUpdate(dt);
  if(G.state==='docking'){updateDocking(dt);updateDust();updateParticles(dt);return;}
  if(inHall()){updateParticles(dt);if(G.state==='hall'&&!needsLock())updateHall(dt);G.loungeT=(G.loungeT||0)-dt;if(G.loungeT<=0){G.loungeT=1;if(G.state==='hallmenu')renderPilots();}return;}
  if(G.state==='docked'){if(!G.drag)G.orbit.yaw+=dt*.035;updateParticles(dt);G.loungeT=(G.loungeT||0)-dt;if(G.loungeT<=0){G.loungeT=1;renderPilots();}return;}
  if(G.state==='title'){rotShip(P,dt*.03,Math.sin(G.t*.1)*dt*.01,0);P.pos=vmadd(P.pos,P.f,dt*20);updateDust();updateParticles(dt);return;}
  if(G.state==='warp'){updateWarp(dt);updateDust();updateParticles(dt);return;}
  if(G.state==='dying'){G.deathT-=dt;updateParticles(dt);for(const e of enemies)if(!e.dead)updateEnemy(e,dt);updateProjectiles(dt);enemies=enemies.filter(e=>!e.dead);if(G.deathT<=0)showDead();return;}
  if(G.state!=='play'||needsLock())return;
  G.prog.time+=dt;
  updatePlayer(dt);updateDust();
  let fighting=false;
  for(const e of enemies){if(e.dead)continue;if(e.dying)continue;updateEnemy(e,dt);if(e.state==='attack'&&vdist(e.pos,P.pos)<2600)fighting=true;}
  if(fighting)G.combat=4;else G.combat=Math.max(0,G.combat-dt);
  enemies=enemies.filter(e=>!e.dead);
  updateProjectiles(dt);updateParticles(dt);updatePickups(dt);
  // boss death sequence
  if(G.bossDeathT>0){const b=W.boss;G.bossDeathT-=dt;if(Math.random()<dt*9){const s=pick(b.T.spheres);explode(localToWorld(b,vadd(s,vscale(randUnit(),s[3]*.7))),rand(25,60),[1,.5,.2]);}
    if(G.bossDeathT<=0){for(const s of b.T.spheres)explode(localToWorld(b,s),120);b.dead=true;W.boss=null;enemies=enemies.filter(e=>e!==b);G.whiteFlash=1;G.bossDeathT=-1;setTimeout(showWin,2500);
      G.prog.credits+=3000;save();}}
  // target
  if(G.target&&(G.target.dead||vdist(G.target.pos,P.pos)>7000)){G.target=null;G.manualTarget=false;}
  if(!G.manualTarget){let best=null,bs=-9;for(const e of enemies){if(e.dead||e.dying)continue;const d=vsub(e.pos,P.pos),l=vlen(d);if(l>4500)continue;const c=vdot(d,P.f)/l;const s=c-l/30000;if(c>.94&&s>bs){bs=s;best=e;}}if(best)G.target=best;else if(G.target&&vdot(vnorm(vsub(G.target.pos,P.pos)),P.f)<.7)G.target=null;}
  updateInteract(dt);updateEncounters(dt);updateAudio();}
function updateInteract(dt){const W=G.sys;G.interact=null;
  for(const t of W.terminals){if(!t.repaired&&vdist(t.pos,P.pos)<150){G.interact={kind:'term',obj:t,text:t.array?'[F] REPAIR ION LANCE ARRAY':'[F] REPAIR TERMINAL'};break;}}
  if(!G.interact&&W.haven&&vdist(W.haven.pos,P.pos)<430)G.interact={kind:'dock',text:'[F] DOCK AT HAVEN'};
  if(!G.interact&&!W.cache.found&&vdist(W.cache.pos,P.pos)<170)G.interact={kind:'cache',text:'[F] SALVAGE DERELICT CACHE'};
  if(!G.interact&&W.station&&vdist(W.station.pos,P.pos)<1600&&W.terminals.some(t=>t.repaired))G.interact={kind:'shop',text:'[U] STATION SERVICES'};
  // planet scanning
  let sp=null;for(const p of W.planets)if(!p.scanned&&vdist(p.pos,P.pos)<p.radius*2.4)sp=p;
  if(sp){if(G.scan&&G.scan.p===sp){G.scan.t+=dt;if(G.scan.t>=3){sp.scanned=true;const k=W.planets.indexOf(sp);G.prog.systems[W.idx].scanned[k]=true;const c=120+W.def.lvl*60;G.prog.credits+=c;msg(`Survey complete: ${sp.name} (+${c} CR)`,'#7ff0ff');SFX.good();G.scan=null;save();}}else G.scan={p:sp,t:0};}else G.scan=null;}
function interact(){const it=G.interact;if(!it)return;if(it.kind==='dock')startDock();else if(it.kind==='term')openTerminal(it.obj);else if(it.kind==='cache')collectCache();else if(it.kind==='shop')openShop();}
function collectCache(){const W=G.sys;W.cache.found=true;G.prog.systems[W.idx].cache=true;const c=300+W.def.lvl*150;G.prog.credits+=c;msg(`Derelict cache salvaged: +${c} CR`,'#ffd27a');
  const nl=nextLocked();if(nl)unlockWeapon(nl);else{const S=stats();G.prog.missiles=S.maxMissiles;msg('Missiles fully restocked','#ffb347');SFX.good();}explode(W.cache.pos,6,[.4,.9,1]);save();}
function updateEncounters(dt){const W=G.sys;
  if(G.ambushT>0){G.ambushT-=dt;if(G.ambushT<=0){const n=2+Math.min(4,W.def.lvl);msg('AMBUSH — hostiles dropping out of warp!','#ff5d6c');SFX.alarm();
      for(let k=0;k<n;k++){const p=vadd(P.pos,vscale(randUnit(),rand(1200,1900)));warpIn(p,[1,.3,.3]);spawnGroup(p,1,W.def.lvl,true);}}}
  G.encounterT-=dt*(P.cruise===2?2.5:1);
  if(G.encounterT<=0){G.encounterT=rand(60,100);const active=enemies.filter(e=>!e.dead&&e.state==='attack').length;
    if(active<2&&!W.def.boss&&enemies.length<16&&!(W.haven&&vdist(P.pos,W.haven.pos)<2500)){const p=vadd(P.pos,vadd(vscale(P.f,1700),vscale(randUnit(),500)));const n=2+Math.floor(W.def.lvl/2);
      if(P.cruise>0){P.cruise=0;P.vel=vscale(P.f,200);msg('INTERDICTED — pulled out of cruise!','#ff5d6c');G.shake=1;}else msg('Hostile wing inbound','#ff8a7a');
      SFX.alarm();warpIn(p,[1,.3,.3]);spawnGroup(p,n,W.def.lvl,true);}}}
function onTerminalRepaired(t){const W=G.sys,ps=G.prog.systems[W.idx];t.repaired=true;ps.terms[t.id]=true;const c=100+W.def.lvl*60;G.prog.credits+=c;
  const left=W.terminals.filter(x=>!x.repaired).length;
  if(W.boss&&!W.boss.dead){W.boss.shield=left;beams.push({a:vmadd(t.pos,t.f,-60),b:W.boss.pos,w:28,col:[.4,.8,1],life:2.5,max:2.5});beams.push({a:vmadd(t.pos,t.f,-60),b:W.boss.pos,w:8,col:[1,1,1],life:2.2,max:2.2});
    for(let k=0;k<6;k++)setTimeout(()=>{if(W.boss)explode(vmadd(W.boss.pos,randUnit(),SHIELD_R*.9),40,[.5,.8,1]);},k*300);
    if(left===0){W.boss.shield=0;W.boss.hp-=600;msg('LEVIATHAN SHIELDS DOWN — DESTROY IT!','#7ff0ff');G.title={text:'SHIELDS DOWN',sub:'THE LEVIATHAN IS VULNERABLE',t:4};}
    else msg(`Ion lance fired! Leviathan shield ${left} layer${left>1?'s':''} remaining`,'#7ff0ff');}
  else msg(`Terminal restored (+${c} CR) — ${left} remaining`,'#5dff9b');
  if(left===0&&!W.def.boss)completeSystem();else G.ambushT=2.2;save();}
function completeSystem(){const W=G.sys,ps=G.prog.systems[W.idx];if(ps.state==='completed')return;ps.state='completed';
  for(const[a,b]of LINKS){const o=a===W.idx?b:b===W.idx?a:-1;if(o>=0&&G.prog.systems[o].state==='locked')G.prog.systems[o].state='available';}
  const bonus=400+W.def.lvl*200;G.prog.credits+=bonus;
  setTimeout(()=>{G.title={text:'JUMP BEACON ONLINE',sub:`${W.def.name} RESTORED · +${bonus} CR · NEW ROUTES ON THE GALAXY MAP`,t:5,col:'#5dff9b'};SFX.good();
    const nl=nextLocked();if(nl)setTimeout(()=>unlockWeapon(nl),3500);else{const keys=Object.keys(G.prog.upg).filter(k=>G.prog.upg[k]<5);if(keys.length){const k=pick(keys);G.prog.upg[k]++;msg('Relay reward: free upgrade — '+UPG.find(u=>u.id===k).name,'#ffb347');}}save();},800);}
function updateWarp(dt){G.warpT+=dt;const t=G.warpT;P.vel=vscale(P.f,200+t*t*2500);if(!G.warpLoaded)P.pos=vmadd(P.pos,P.vel,dt*.02);
  if(t>2.0&&!G.warpLoaded){G.warpLoaded=true;loadSystem(G.warpTo);G.whiteFlash=1;P.vel=vscale(P.f,2000);}
  if(G.warpLoaded){P.vel=vlerp(P.vel,vscale(P.f,250),1-Math.exp(-dt*3));P.pos=vmadd(P.pos,P.vel,dt);}
  if(t>3.0){G.state='play';G.warpLoaded=false;if(needsLock())lockPointer();}}
function updateAudio(){if(!A.ctx)return;const sp=vlen(P.vel);const c=A.ctx.currentTime;
  A.engG.gain.setTargetAtTime(P.dead?0:.04+Math.min(sp,400)/400*.06,c,.1);A.eng.frequency.setTargetAtTime(38+Math.min(sp,1800)*.04,c,.2);A.engF.frequency.setTargetAtTime(P.boost?700:P.cruise===2?1200:220,c,.2);
  A.engN.gain.setTargetAtTime(P.dead?0:(P.boost?.12:P.cruise===2?.1:.025),c,.15);A.engNF.frequency.setTargetAtTime(P.cruise===2?1500:P.boost?900:380,c,.3);
  A.loG.gain.setTargetAtTime(P.lanceOn?.05:0,c,.03);A.lo.frequency.setTargetAtTime(100+Math.random()*20,c,.02);}

// =====================================================================
//  RENDER
// =====================================================================
let W_=0,H_=0,DPR=1;
function resize(){DPR=Math.min(devicePixelRatio||1,1.75);const w=innerWidth,h=innerHeight;if(w===W_&&h===H_)return;W_=w;H_=h;
  cv.width=Math.round(w*DPR);cv.height=Math.round(h*DPR);hudCv.width=Math.round(w*DPR);hudCv.height=Math.round(h*DPR);}
function setMeshU(u,M,tint,flash,emCol,emMul){gl.uniformMatrix4fv(u.uM,false,M);gl.uniform3fv(u.uTint,tint||[1,1,1]);gl.uniform1f(u.uFlash,flash||0);gl.uniform3fv(u.uEmCol,emCol||[1.6,1.6,1.6]);gl.uniform1f(u.uEmMul,emMul===undefined?1:emMul);}
function drawMesh(m){gl.bindVertexArray(m.vao);gl.drawArrays(gl.TRIANGLES,0,m.count);}
function visible(p,r){const d=vsub(p,G.cam.pos);return vdot(d,G.cam.f)>-r;}
function render(){
  resize();const W=G.sys;const t=G.t;
  // camera
  let targetFov=75;if(P.boost)targetFov=84;if(P.cruise===2)targetFov=92;if(G.state==='warp')targetFov=G.warpLoaded?80:75+G.warpT*25;if(G.state==='docked')targetFov=60;if(inHall())targetFov=80;G.fov=lerp(G.fov,targetFov,.08);
  const sh=G.shake*G.shake*1.6;const cam=G.cam;cam.f=vnorm(vadd(P.f,vadd(vscale(P.u,(Math.random()-.5)*sh*.02),vscale(rightOf(P),(Math.random()-.5)*sh*.02))));cam.u=P.u;
  {const o={f:cam.f,u:cam.u};orthonorm(o);cam.f=o.f;cam.u=o.u;}cam.r=vnorm(vcross(cam.f,cam.u));cam.pos=[...P.pos];
  if(G.state==='docked'&&W.haven&&G.orbit){const o=G.orbit,h=W.haven.pos;cam.pos=vadd(h,[Math.cos(o.yaw)*Math.cos(o.pitch)*o.dist,Math.sin(o.pitch)*o.dist,Math.sin(o.yaw)*Math.cos(o.pitch)*o.dist]);const q={f:vnorm(vsub(h,cam.pos)),u:[0,1,0]};orthonorm(q);cam.f=q.f;cam.u=q.u;cam.r=vnorm(vcross(cam.f,cam.u));}
  if(inHall()&&W.haven){const o=hallOrigin(),H=HALL;cam.pos=vadd(o,[H.pos[0],H.pos[1]+1.65+H.bob,H.pos[2]]);const cp=Math.cos(H.pitch);const q={f:[Math.sin(H.yaw)*cp,Math.sin(H.pitch),Math.cos(H.yaw)*cp],u:[0,1,0]};orthonorm(q);cam.f=q.f;cam.u=q.u;cam.r=vnorm(vcross(cam.f,cam.u));}
  const asp=W_/H_;const proj=perspective(G.fov*DEG,asp,inHall()?.1:2,300000);const view=viewMat(cam.pos,cam.f,cam.u);const VP=mul4(proj,view);G.VP=VP;
  gl.viewport(0,0,cv.width,cv.height);gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const sunCol=vscale(W.star.col,1.25);
  // sky
  gl.disable(gl.DEPTH_TEST);gl.depthMask(false);gl.disable(gl.BLEND);gl.disable(gl.CULL_FACE);
  {const s=PRG.sky,u=s.u;gl.useProgram(s.p);const th=Math.tan(G.fov*DEG/2);gl.uniform3fv(u.uR,cam.r);gl.uniform3fv(u.uU,cam.u);gl.uniform3fv(u.uF,cam.f);gl.uniform2f(u.uTan,th*asp,th);
    gl.uniform3fv(u.uA,W.def.neb[0]);gl.uniform3fv(u.uB,W.def.neb[1]);gl.uniform3fv(u.uG,W.galN);gl.uniform1f(u.uSeed,W.seed);gl.uniform3fv(u.uSunD,vnorm(vsub(W.star.pos,cam.pos)));gl.uniform3fv(u.uSunC,W.star.col);
    gl.bindVertexArray(skyVAO);gl.drawArrays(gl.TRIANGLES,0,3);}
  gl.enable(gl.DEPTH_TEST);gl.depthMask(true);
  // planets + star
  {const s=PRG.planet,u=s.u;gl.useProgram(s.p);gl.uniformMatrix4fv(u.uVP,false,VP);gl.uniform3fv(u.uSun,W.star.pos);gl.uniform3fv(u.uCam,cam.pos);gl.uniform3fv(u.uSunCol,sunCol);gl.uniform1f(u.uTime,t);gl.uniform1f(u.uAlpha,1);
    gl.bindVertexArray(MESH.sphere.vao);
    const st=W.star;gl.uniform1i(u.uType,5);gl.uniform3fv(u.uA,vscale(st.col,.9));gl.uniform3fv(u.uB,[1,1,.92]);gl.uniformMatrix4fv(u.uM,false,modelMat(st.pos,[0,0,1],[0,1,0],st.radius));gl.drawElements(gl.TRIANGLES,MESH.sphere.count,gl.UNSIGNED_SHORT,0);
    for(const p of W.planets){if(!visible(p.pos,p.radius))continue;const a=t*p.spin;gl.uniform1i(u.uType,p.type);gl.uniform3fv(u.uA,p.pal.A);gl.uniform3fv(u.uB,p.pal.B);gl.uniform3fv(u.uC,p.pal.C);gl.uniform3fv(u.uAtm,p.pal.atm);gl.uniform1f(u.uSeed,p.seed);
      gl.uniformMatrix4fv(u.uM,false,modelMat(p.pos,[Math.sin(a),0,Math.cos(a)],[0,1,0],p.radius));gl.drawElements(gl.TRIANGLES,MESH.sphere.count,gl.UNSIGNED_SHORT,0);}
    if(inHall()&&W.haven&&W.planets.length){const p=W.planets[((t/12)|0)%W.planets.length];gl.uniform1i(u.uType,p.type);gl.uniform3fv(u.uA,p.pal.A);gl.uniform3fv(u.uB,p.pal.B);gl.uniform3fv(u.uC,p.pal.C);gl.uniform3fv(u.uAtm,p.pal.atm);gl.uniform1f(u.uSeed,p.seed);
      gl.uniformMatrix4fv(u.uM,false,modelMat(vadd(hallOrigin(),[0,2.9,0]),[Math.sin(t*.4),0,Math.cos(t*.4)],[0,1,0],.85));gl.drawElements(gl.TRIANGLES,MESH.sphere.count,gl.UNSIGNED_SHORT,0);}}
  // meshes
  {const s=PRG.mesh,u=s.u;gl.useProgram(s.p);gl.uniformMatrix4fv(u.uVP,false,VP);gl.uniform3fv(u.uSun,W.star.pos);gl.uniform3fv(u.uSunCol,sunCol);gl.uniform3fv(u.uCam,cam.pos);gl.uniform3fv(u.uAmb,vadd(vscale(W.def.neb[0],.1),[.035,.04,.05]));
    if(W.station&&visible(W.station.pos,400)){setMeshU(u,modelMat(W.station.pos,[0,0,1],[0,1,0],1));drawMesh(MESH.station);}
    if(W.haven&&visible(W.haven.pos,300)){setMeshU(u,modelMat(W.haven.pos,[0,0,1],[0,1,0],1),null,0,null,1);drawMesh(inHall()?MESH.havenShell:MESH.haven);}
    G.shipDraws=shipPoses();for(const sd of G.shipDraws){if(!visible(sd.pos,30))continue;setMeshU(u,modelMat(sd.pos,sd.f,sd.u,SHIP_S),sd.tint,0,sd.em,1);drawMesh(MESH.pship);}
    for(const tm of W.terminals){if(!visible(tm.pos,60))continue;const ok=tm.repaired;const pulse=ok?1:.6+.4*Math.sin(t*6+tm.id);
      setMeshU(u,modelMat(tm.pos,tm.f,tm.u,1.6),null,0,ok?[.3,1.6,.6]:[1.8,.35,.2],pulse);drawMesh(MESH.terminal);
      if(tm.array&&W.boss){const d=vnorm(vsub(W.boss.pos,tm.pos));const o={f:d,u:[0,1,0]};orthonorm(o);setMeshU(u,modelMat(vmadd(tm.pos,d,-10),o.f,o.u,1.4),[.8,.85,.9],0,ok?[.5,1.4,1.8]:[.3,.3,.35]);drawMesh(MESH.barrel);}}
    if(!W.cache.found&&visible(W.cache.pos,80)){setMeshU(u,modelMat(W.cache.pos,W.cache.f,W.cache.u,1),null,0,[.5,1.4,1.8],.6+.4*Math.sin(t*3));drawMesh(MESH.wreck);}
    for(const a of W.asteroids){if(!visible(a.pos,a.radius)||vdist(a.pos,cam.pos)>40000)continue;setMeshU(u,axisMat(a.pos,a.axis,a.ang,a.radius));drawMesh(MESH.rocks[a.mesh]);}
    for(const e of enemies){if(e.dead||!visible(e.pos,e.radius*4))continue;const T=e.T;let em=1,flash=e.flash*.6;
      if(T.boss){em=e.dying?.6+Math.random()*.8:1;flash=e.flash*.15;}
      setMeshU(u,modelMat(e.pos,e.f,e.u,T.scale),null,flash,null,em);drawMesh(MESH[T.mesh]);}
    for(const k of pickups){if(k.kind!=='crate')continue;const a=t*1.5;setMeshU(u,axisMat(k.pos,vnorm([.3,1,.2]),a,1.4),null,0,[1.8,1.2,.4],.7+.3*Math.sin(t*5));drawMesh(MESH.crate);}
    if(inHall()&&W.haven){const o=hallOrigin();gl.uniform3fv(u.uSun,vadd(o,[0,6.5,0]));gl.uniform3fv(u.uSunCol,[.95,.88,.82]);gl.uniform3fv(u.uAmb,[.34,.32,.4]);
      setMeshU(u,modelMat(o,[0,0,1],[0,1,0],1),null,0,null,1);drawMesh(MESH.hall);
      for(const Rm of NET.remotes.values()){if(Rm.st!=='hall'||!Rm.hpos)continue;drawAvatar(u,vadd(o,Rm.hpos),Rm.hyaw||0,PAINT[Rm.c]||PAINT[0],Rm.hphase||0,clamp((Rm.hspeed||0)/4,0,1),Rm);}}}
  // rings
  {const s=PRG.ring,u=s.u;gl.useProgram(s.p);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);gl.uniformMatrix4fv(u.uVP,false,VP);gl.uniform3fv(u.uSun,W.star.pos);gl.uniform3fv(u.uSunCol,sunCol);
    gl.bindVertexArray(MESH.ring.vao);for(const p of W.planets){if(!p.ring||!visible(p.pos,p.radius*2.5))continue;const o={f:[0,0,1],u:p.tilt};orthonorm(o);
      gl.uniformMatrix4fv(u.uM,false,modelMat(p.pos,o.f,o.u,p.radius));gl.uniform3fv(u.uA,p.pal.B);gl.uniform3fv(u.uB,p.pal.C||p.pal.A);gl.uniform1f(u.uSeed,p.seed);gl.uniform3fv(u.uPc,p.pos);gl.uniform1f(u.uPr,p.radius);gl.drawArrays(gl.TRIANGLE_STRIP,0,MESH.ring.count);}}
  // additive
  gl.blendFunc(gl.ONE,gl.ONE);gl.depthMask(false);
  if(W.boss&&!W.boss.dead&&W.boss.shield>0){const s=PRG.planet,u=s.u;gl.useProgram(s.p);gl.uniformMatrix4fv(u.uVP,false,VP);gl.uniform3fv(u.uCam,cam.pos);gl.uniform1i(u.uType,6);gl.uniform1f(u.uTime,t);
    gl.uniform3fv(u.uA,[.3,.65,1]);gl.uniform1f(u.uAlpha,.35+.25*W.boss.shield/3+G.bossShieldFlash);gl.uniformMatrix4fv(u.uM,false,modelMat(W.boss.pos,[0,0,1],[0,1,0],SHIELD_R));gl.bindVertexArray(MESH.sphere.vao);gl.drawElements(gl.TRIANGLES,MESH.sphere.count,gl.UNSIGNED_SHORT,0);}
  buildBillboards();
  if(bbN){const s=PRG.bb;gl.useProgram(s.p);gl.uniformMatrix4fv(s.u.uVP,false,VP);gl.bindVertexArray(bbVAO);gl.bindBuffer(gl.ARRAY_BUFFER,bbBuf);gl.bufferSubData(gl.ARRAY_BUFFER,0,bbData,0,bbN*6*BB_STRIDE);gl.drawArrays(gl.TRIANGLES,0,bbN*6);}
  gl.depthMask(true);gl.disable(gl.BLEND);gl.bindVertexArray(null);
  drawHUD();}
function buildBillboards(){bbN=0;const W=G.sys,t=G.t;
  const st=W.star;sprite(st.pos,st.radius*3.2,st.col,.9);sprite(st.pos,st.radius*9,st.col,.28);
  // dust / speed streaks
  const sp=vlen(P.vel);const warp=G.state==='warp';
  for(const d of dust){const st=warp?.25:sp>900?.12:.045;const a=clamp(sp/400,.08,warp?1:.5);beam(d,vmadd(d,P.vel,-st),warp?.5:.25,warp?[.7,.85,1]:[.6,.7,.8],a);}
  if(inHall()&&W.haven){const o=hallOrigin();sprite(vadd(o,[0,2.9,0]),2.3,[.3,.8,1],.35);sprite(vadd(o,[0,1.2,0]),3.5,[.3,.8,1],.15);
    if(mus.lounge)for(let k=0;k<6;k++){const c=PAINT[(k+((t*2)|0))%PAINT.length];sprite(vadd(o,[-7.5+k*3,6.5,31]),.5+.25*Math.abs(Math.sin(t*4+k)),c,.9);}
    for(const a of DOOR_A)sprite(vadd(o,[Math.cos(a)*(HALL_R-.9),5.85,Math.sin(a)*(HALL_R-.9)]),.35,[1,.4,.85],.6);}
  if(W.haven){const h=W.haven.pos;if(Math.sin(t*3)>0)sprite(vadd(h,[0,177,0]),14,[1,.4,.85],1);for(let k=0;k<8;k++){const a=k/8*TAU+.2;sprite(vadd(h,[Math.cos(a)*190,0,Math.sin(a)*190]),7+2*Math.sin(t*2+k),[.4,.9,1],.55);}sprite(h,140,[1,.4,.85],.12);}
  for(const sd of G.shipDraws||[])for(const sx of[-2,2])sprite(localToWorld({pos:sd.pos,f:sd.f,u:sd.u},[sx,0,-12.6],SHIP_S),sd.moving?6:2.6,sd.col,.95);
  if(W.station){const sp0=W.station.pos;for(const[o,c,f]of[[[0,-296,0],[1,.2,.2],1.2],[[0,300,0],[.3,.8,1],.9],[[240,0,0],[1,.6,.2],.7],[[-240,0,0],[1,.6,.2],.7]]){const on=Math.sin(t*f*4+o[0])>0;if(on)sprite(vadd(sp0,o),18,c,.9);}}
  for(const tm of W.terminals){const c=tm.repaired?[.3,1,.5]:[1,.25,.15];for(const sx of[-16,16]){const p=localToWorld(tm,[sx,23,8],1.6);sprite(p,tm.repaired?12:8+7*Math.abs(Math.sin(t*4+tm.id)),c,1);}
    if(!tm.repaired&&Math.random()<.25)parts.push({p:localToWorld(tm,[rand(-12,12),rand(5,30),rand(-5,8)],1.6),v:vscale(randUnit(),rand(20,60)),life:.35,max:.35,s0:1,s1:0,c0:[1,.9,.5],c1:[1,.4,.1],kind:'s'});}
  if(!W.cache.found)sprite(localToWorld(W.cache,[0,0,-31]),22+6*Math.sin(t*3),[.4,.85,1],.8);
  for(const e of enemies){if(e.dead||!visible(e.pos,e.radius*4))continue;for(const g of e.T.eng){const p=localToWorld(e,g,e.T.scale);sprite(p,g[3]*e.T.scale*(1.6+Math.random()*.3),e.T.boss?[1,.3,.15]:[1,.55,.25],.9);}
    if(e.T.boss&&e.shield<=0&&!e.dying)sprite(localToWorld(e,[0,0,262]),60+20*Math.sin(t*4),[1,.2,.1],.8);}
  for(const k of pickups){if(k.kind==='cr')sprite(k.pos,4+Math.sin(t*8+k.pos[0])*.8,[1,.8,.3],1);else if(k.kind==='repair')sprite(k.pos,6,[.3,1,.5],1);else sprite(k.pos,14,[1,.7,.2],.5);}
  for(const p of projs){if(p.kind==='missile'){sprite(p.p,3.5,[1,.8,.5],1);continue;}
    if(p.kind==='nova'||p.kind==='orb'){sprite(p.p,p.size*(1.6+Math.random()*.3),p.col,1);sprite(p.p,p.size*.6,[1,1,1],1);continue;}
    const tail=vmadd(p.p,vnorm(vsub(p.v,p.own==='p'?P.vel:[0,0,0])),-p.len);beam(tail,p.p,p.size,p.col,1);beam(tail,p.p,p.size*.35,[1,1,1],.8);}
  for(const b of beams){const a=b.life/b.max;beam(b.a,b.b,b.w*(.5+.5*a),b.col,Math.min(1,a*1.5));}
  for(const q of parts){const k=1-q.life/q.max;const c=[lerp(q.c0[0],q.c1[0],k),lerp(q.c0[1],q.c1[1],k),lerp(q.c0[2],q.c1[2],k)];const s=lerp(q.s0,q.s1,k);const a=Math.min(1,q.life/q.max*1.5);
    if(q.kind==='s')beam(q.p,vmadd(q.p,q.v,-.035),Math.max(Math.min(.15,q.s0*.3),s*.5),c,a);else sprite(q.p,s,c,a);}
  if(G.muzzle){for(const sd of[-1,1])sprite(muzzle(sd),.8,G.muzzle.col,.8);}}

// =====================================================================
//  HUD
// =====================================================================
function proj(p){const m=G.VP,x=p[0],y=p[1],z=p[2];const cx=m[0]*x+m[4]*y+m[8]*z+m[12],cy=m[1]*x+m[5]*y+m[9]*z+m[13],cw=m[3]*x+m[7]*y+m[11]*z+m[15];if(cw<=.5)return null;return[(cx/cw*.5+.5)*W_,(.5-cy/cw*.5)*H_,cw];}
function edgeArrow(c,p,col,label){const d=vsub(p,G.cam.pos);const x=vdot(d,G.cam.r),y=vdot(d,G.cam.u);const a=Math.atan2(-y,x);const rx=W_*.42,ry=H_*.38;
  const px=W_/2+Math.cos(a)*rx,py=H_/2+Math.sin(a)*ry;c.save();c.translate(px,py);c.rotate(a);c.fillStyle=col;c.beginPath();c.moveTo(12,0);c.lineTo(-6,-8);c.lineTo(-2,0);c.lineTo(-6,8);c.closePath();c.fill();c.restore();
  if(label){c.fillStyle=col;c.font='600 12px Rajdhani,sans-serif';c.textAlign='center';c.fillText(label,px-Math.cos(a)*22,py-Math.sin(a)*22+4);}}
function fmtD(d){return d>=1000?(d/1000).toFixed(1)+'k':Math.round(d)+'';}
function objective(){const W=G.sys;
  if(W.def.boss&&!G.prog.bossDead){const left=W.terminals.filter(t=>!t.repaired);
    if(left.length){const n=left.reduce((a,b)=>vdist(a.pos,P.pos)<vdist(b.pos,P.pos)?a:b);return{text:`Repair ion lance arrays to breach the shield (${W.terminals.length-left.length}/${W.terminals.length})`,pos:n.pos,label:'ION ARRAY'};}
    if(W.boss)return{text:'Destroy the Leviathan',pos:W.boss.pos,label:'LEVIATHAN'};}
  if(G.prog.bossDead&&W.def.boss)return{text:'The Leviathan is destroyed. The galaxy is yours to explore.',pos:null};
  const left=W.terminals.filter(t=>!t.repaired);
  if(left.length){if(W.station&&vdist(W.station.pos,P.pos)>3200)return{text:'Fly to the derelict relay station',pos:W.station.pos,label:'STATION'};
    const n=left.reduce((a,b)=>vdist(a.pos,P.pos)<vdist(b.pos,P.pos)?a:b);return{text:`Repair relay terminals (${W.terminals.length-left.length}/${W.terminals.length})`,pos:n.pos,label:'TERMINAL'};}
  return{text:'Jump beacon online — open the Galaxy Map [M] and jump',pos:null};}
function bar(c,x,y,w,h,v,col,label,txt){c.fillStyle='rgba(255,255,255,.07)';c.fillRect(x,y,w,h);c.fillStyle=col;c.fillRect(x,y,w*clamp(v,0,1),h);
  c.strokeStyle='rgba(255,255,255,.15)';c.strokeRect(x+.5,y+.5,w-1,h-1);for(let i=1;i<10;i++){c.fillStyle='rgba(0,0,0,.35)';c.fillRect(x+w*i/10,y,1,h);}
  c.font='700 11px Orbitron,sans-serif';c.textAlign='left';c.fillStyle=col;c.fillText(label,x,y-5);c.textAlign='right';c.fillStyle='#dff';c.font='600 13px Rajdhani,sans-serif';c.fillText(txt,x+w,y-4);}
function drawHUD(){const c=hx;c.setTransform(DPR,0,0,DPR,0,0);c.clearRect(0,0,W_,H_);const w=W_,h=H_,W=G.sys,t=G.t;
  if(G.state==='title'){return;}
  if(inHall()){drawHallHUD(c,w,h);return;}
  if(G.state==='docked'){if(G.whiteFlash>0){c.fillStyle=`rgba(255,220,250,${G.whiteFlash})`;c.fillRect(0,0,w,h);}$('lockPrompt').style.display='none';return;}
  // sun glare
  {const sd=vnorm(vsub(W.star.pos,G.cam.pos));const dt=vdot(sd,G.cam.f);if(dt>.6){let occ=false;for(const p of W.planets)if(raySphere(G.cam.pos,sd,p.pos,p.radius)>=0)occ=true;
    if(!occ){const sp=proj(W.star.pos);if(sp){const a=Math.pow((dt-.6)/.4,3)*.35;const g=c.createRadialGradient(sp[0],sp[1],0,sp[0],sp[1],w*.6);g.addColorStop(0,`rgba(255,245,220,${a})`);g.addColorStop(1,'rgba(255,240,200,0)');c.fillStyle=g;c.fillRect(0,0,w,h);
      for(const k of[.5,-.3,-.7]){const fx=w/2+(sp[0]-w/2)*k,fy=h/2+(sp[1]-h/2)*k;c.fillStyle=`rgba(150,200,255,${a*.35})`;c.beginPath();c.arc(fx,fy,20+Math.abs(k)*40,0,TAU);c.fill();}}}}}
  if(G.state==='warp'){c.fillStyle=`rgba(180,220,255,${Math.min(.35,G.warpT*.1)})`;c.fillRect(0,0,w,h);c.font='900 26px Orbitron,sans-serif';c.textAlign='center';c.fillStyle='#bff4ff';c.fillText(G.warpLoaded?'':'HYPERJUMP',w/2,h*.3);
    if(G.whiteFlash>0){c.fillStyle=`rgba(255,255,255,${G.whiteFlash})`;c.fillRect(0,0,w,h);}return;}
  const S=stats();const cy=h/2,cx=w/2;
  // world markers
  if(!P.dead){
    const obj=objective();
    // enemies
    for(const e of enemies){if(e.dead||e.T.static&&e.parent&&e.parent.shield>0)continue;const d=vdist(e.pos,P.pos);if(d>5000&&!e.T.boss)continue;const sp=proj(e.pos);
      const onS=sp&&sp[0]>0&&sp[0]<w&&sp[1]>0&&sp[1]<h;if(!onS){if(d<3000||e.T.boss)edgeArrow(c,e.pos,e.state==='attack'?'rgba(255,80,80,.9)':'rgba(255,170,90,.7)');continue;}
      if(e===G.target)continue;const s=clamp(e.radius*e.T.scale*700/sp[2],6,60);c.strokeStyle=e.state==='attack'?'rgba(255,80,80,.75)':'rgba(255,170,90,.6)';c.lineWidth=1.2;c.strokeRect(sp[0]-s,sp[1]-s,s*2,s*2);}
    // target
    const tg=G.target;if(tg&&!tg.dead){const sp=proj(tg.pos);const d=vdist(tg.pos,P.pos);
      if(sp){const s=clamp((tg.T.boss?260:tg.radius*tg.T.scale)*800/sp[2],10,tg.T.boss?260:80);c.strokeStyle='#ff4d5e';c.lineWidth=2;const L=s*.45;
        for(const[sx,sy]of[[-1,-1],[1,-1],[1,1],[-1,1]]){c.beginPath();c.moveTo(sp[0]+sx*s,sp[1]+sy*(s-L));c.lineTo(sp[0]+sx*s,sp[1]+sy*s);c.lineTo(sp[0]+sx*(s-L),sp[1]+sy*s);c.stroke();}
        c.fillStyle='rgba(0,0,0,.5)';c.fillRect(sp[0]-s,sp[1]+s+6,s*2,5);c.fillStyle='#ff4d5e';c.fillRect(sp[0]-s,sp[1]+s+6,s*2*clamp(tg.hp/tg.maxHp,0,1),5);
        c.font='700 11px Orbitron,sans-serif';c.textAlign='center';c.fillStyle='#ff9aa4';c.fillText(tg.T.name+(G.manualTarget?' ◆':''),sp[0],sp[1]-s-8);c.font='600 13px Rajdhani,sans-serif';c.fillText(fmtD(d)+' m',sp[0],sp[1]+s+24);
        const Wp=WEAPONS[G.prog.weapon];if(Wp.speed&&!tg.T.boss){const lp=proj(leadPoint(tg,Wp.speed,P.pos));if(lp){c.strokeStyle='#ffdd55';c.lineWidth=1.5;c.beginPath();c.arc(lp[0],lp[1],7,0,TAU);c.stroke();c.beginPath();c.moveTo(lp[0]-11,lp[1]);c.lineTo(lp[0]-4,lp[1]);c.moveTo(lp[0]+4,lp[1]);c.lineTo(lp[0]+11,lp[1]);c.stroke();
          c.setLineDash([3,4]);c.strokeStyle='rgba(255,221,85,.35)';c.beginPath();c.moveTo(sp[0],sp[1]);c.lineTo(lp[0],lp[1]);c.stroke();c.setLineDash([]);}}}
      else edgeArrow(c,tg.pos,'#ff4d5e','TARGET');}
    // objective waypoint
    if(obj.pos){const sp=proj(obj.pos);const d=vdist(obj.pos,P.pos);const onS=sp&&sp[0]>40&&sp[0]<w-40&&sp[1]>40&&sp[1]<h*.8;
      if(onS){c.save();c.translate(sp[0],sp[1]);c.rotate(Math.PI/4);c.strokeStyle='#48e5ff';c.lineWidth=2;const s=9+Math.sin(t*4)*1.5;c.strokeRect(-s,-s,s*2,s*2);c.restore();
        c.font='700 11px Orbitron,sans-serif';c.textAlign='center';c.fillStyle='#7ff0ff';c.fillText(obj.label,sp[0],sp[1]-20);c.font='600 13px Rajdhani,sans-serif';c.fillText(fmtD(d)+' m',sp[0],sp[1]+28);}
      else edgeArrow(c,obj.pos,'#48e5ff',obj.label+' '+fmtD(d));}
    // cache signal
    if(!W.cache.found){const d=vdist(W.cache.pos,P.pos);if(d<7000){const sp=proj(W.cache.pos);if(sp&&sp[0]>0&&sp[0]<w&&sp[1]>0&&sp[1]<h){c.font='700 12px Orbitron,sans-serif';c.textAlign='center';c.fillStyle=`rgba(210,140,255,${.6+.4*Math.sin(t*5)})`;c.fillText('? SIGNAL',sp[0],sp[1]-10);c.font='600 12px Rajdhani,sans-serif';c.fillText(fmtD(d)+' m',sp[0],sp[1]+6);}}}
    if(W.haven){const sp=proj(W.haven.pos);const d=vdist(W.haven.pos,P.pos);if(sp&&sp[0]>0&&sp[0]<w&&sp[1]>0&&sp[1]<h){c.textAlign='center';c.font='700 12px Orbitron,sans-serif';c.fillStyle='#ff9be8';const dn=dockOrder().filter(k=>k!=='@me').length;
      c.fillText('HAVEN'+(dn?` · ${dn} DOCKED`:''),sp[0],sp[1]-16);c.font='600 12px Rajdhani,sans-serif';c.fillText('SAFE ZONE · '+fmtD(d)+' m',sp[0],sp[1]);}}
    for(const sd of G.shipDraws||[]){if(!sd.R)continue;const sp=proj(sd.pos);if(!sp||sp[0]<0||sp[0]>w||sp[1]<0||sp[1]>h)continue;const d=vdist(sd.pos,P.pos);if(d>15000)continue;
      c.textAlign='center';c.font='700 13px Rajdhani,sans-serif';c.fillStyle=css(sd.col);c.fillText(sd.R.name,sp[0],sp[1]-16);c.font='600 11px Rajdhani,sans-serif';c.fillText(fmtD(d)+' m',sp[0],sp[1]-4);}
    // planets labels
    for(const p of W.planets){const sp=proj(p.pos);if(!sp)continue;const d=vdist(p.pos,P.pos)-p.radius;if(d>40000||sp[0]<0||sp[0]>w||sp[1]<0||sp[1]>h)continue;c.font='600 12px Rajdhani,sans-serif';c.textAlign='center';c.fillStyle=p.scanned?'rgba(120,255,170,.6)':'rgba(180,220,240,.55)';c.fillText(p.name+(p.scanned?' ✓':' · UNSURVEYED')+' · '+fmtD(d),sp[0],sp[1]);}
    // crosshair
    const hot=tg&&!tg.dead&&vdot(vnorm(vsub(tg.pos,P.pos)),P.f)>Math.cos(3*DEG);const cc=hot?'#ff6170':'#7ff0ff';c.strokeStyle=cc;c.lineWidth=1.6;
    c.beginPath();for(let k=0;k<4;k++){const a=k*Math.PI/2+Math.PI/4;c.moveTo(cx+Math.cos(a)*9,cy+Math.sin(a)*9);c.lineTo(cx+Math.cos(a)*17,cy+Math.sin(a)*17);}c.stroke();
    c.beginPath();c.arc(cx,cy,26,-.5,.5);c.stroke();c.beginPath();c.arc(cx,cy,26,Math.PI-.5,Math.PI+.5);c.stroke();c.fillStyle=cc;c.fillRect(cx-1.5,cy-1.5,3,3);
    if(G.hitMark>0){c.strokeStyle=`rgba(255,255,255,${G.hitMark})`;c.lineWidth=2;c.beginPath();for(const[sx,sy]of[[-1,-1],[1,-1],[1,1],[-1,1]]){c.moveTo(cx+sx*6,cy+sy*6);c.lineTo(cx+sx*13,cy+sy*13);}c.stroke();}
    if(settings.mouseMode==='free'){c.strokeStyle='rgba(127,240,255,.35)';c.setLineDash([4,5]);c.beginPath();c.moveTo(cx,cy);c.lineTo(mouseX,mouseY);c.stroke();c.setLineDash([]);c.beginPath();c.arc(mouseX,mouseY,6,0,TAU);c.stroke();}
    if(WEAPONS[G.prog.weapon].kind==='lance'&&P.lanceOn){c.strokeStyle='rgba(90,255,120,.6)';c.beginPath();c.arc(cx,cy,32+Math.random()*3,0,TAU);c.stroke();}
    // prompts
    c.textAlign='center';if(G.interact){c.font='700 15px Orbitron,sans-serif';c.fillStyle=G.interact.kind==='shop'?'#ffd27a':'#ffb347';c.fillText(G.interact.text,cx,cy+70);}
    if(G.scan){const k=G.scan.t/3;c.font='700 12px Orbitron,sans-serif';c.fillStyle='#7ff0ff';c.fillText(`SURVEYING ${G.scan.p.name}`,cx,cy+100);c.fillStyle='rgba(255,255,255,.1)';c.fillRect(cx-90,cy+108,180,5);c.fillStyle='#48e5ff';c.fillRect(cx-90,cy+108,180*k,5);}
    if(G.state==='docking'){c.font='700 16px Orbitron,sans-serif';c.fillStyle='#ff9be8';c.fillText('DOCKING CLAMPS ENGAGED…',cx,cy-70);}
    if(P.cruise===1){c.font='700 14px Orbitron,sans-serif';c.fillStyle='#7ff0ff';c.fillText('CRUISE SPOOLING '+Math.round((1-P.cruiseT/1.3)*100)+'%',cx,cy-60);}
    if(G.crPop>0){c.font='700 16px Orbitron,sans-serif';c.fillStyle=`rgba(255,210,122,${Math.min(1,G.crPopT)})`;c.fillText('+'+G.crPop+' CR',cx+70,cy-30);}
  }
  drawCockpit(c,w,h,S);
  // messages
  drawMsgs(c,w,h);
  // objective + top info
  const obj=objective();c.font='700 11px Orbitron,sans-serif';c.fillStyle='#ffb347';c.textAlign='left';c.fillText('OBJECTIVE',w*.03,34);c.font='600 17px Rajdhani,sans-serif';c.fillStyle='#e8fbff';c.fillText(obj.text,w*.03,54);
  c.textAlign='right';c.font='700 12px Orbitron,sans-serif';c.fillStyle='#7ff0ff';c.fillText(W.def.name,w*.97,34);c.font='700 16px Orbitron,sans-serif';c.fillStyle='#ffd27a';c.fillText(G.prog.credits.toLocaleString()+' CR',w*.97,56);
  c.font='600 14px Rajdhani,sans-serif';c.fillStyle='#8fb7c9';c.fillText(`KILLS ${G.prog.kills} · SURVEYED ${W.planets.filter(p=>p.scanned).length}/${W.planets.length}`,w*.97,74);
  {const on=NET.state==='online';const n=1+[...NET.remotes.values()].filter(r=>r.name).length;c.fillStyle=on?'#5dff9b':'#6f8796';c.fillText(on?`● ONLINE · ${n} PILOT${n>1?'S':''}`:'○ SOLO · OFFLINE',w*.97,92);}
  if(W.boss&&!W.boss.dead){const bw=Math.min(520,w*.5);const bx=cx-bw/2;c.textAlign='center';c.font='700 13px Orbitron,sans-serif';c.fillStyle='#ff6170';c.fillText('THE LEVIATHAN'+(W.boss.shield>0?` · SHIELD ${W.boss.shield}/3`:''),cx,92);
    c.fillStyle='rgba(255,255,255,.08)';c.fillRect(bx,100,bw,8);c.fillStyle=W.boss.shield>0?'#48a9ff':'#ff3d55';c.fillRect(bx,100,bw*clamp(W.boss.hp/W.boss.maxHp,0,1),8);}
  // title
  if(G.title){const T=G.title;const a=Math.min(1,T.t,(5-T.t)*2+.2);c.globalAlpha=clamp(a,0,1);c.textAlign='center';c.font=`900 ${Math.min(52,w*.055)}px Orbitron,sans-serif`;c.fillStyle=T.col||'#e8fbff';c.shadowColor='rgba(72,229,255,.6)';c.shadowBlur=20;c.fillText(T.text,cx,h*.27);c.shadowBlur=0;
    c.font='700 14px Orbitron,sans-serif';c.fillStyle='#ffb347';c.fillText(T.sub,cx,h*.27+34);c.globalAlpha=1;}
  // vignettes
  if(G.dmgFlash>0){const g=c.createRadialGradient(cx,cy,h*.3,cx,cy,h*.9);g.addColorStop(0,'rgba(255,0,0,0)');g.addColorStop(1,`rgba(255,30,30,${G.dmgFlash*.55})`);c.fillStyle=g;c.fillRect(0,0,w,h);}
  if(G.shieldFlash>0){const g=c.createRadialGradient(cx,cy,h*.35,cx,cy,h*.85);g.addColorStop(0,'rgba(0,150,255,0)');g.addColorStop(1,`rgba(70,180,255,${G.shieldFlash*.35})`);c.fillStyle=g;c.fillRect(0,0,w,h);}
  if(P.hull<S.maxHull*.3&&!P.dead){c.fillStyle=`rgba(255,0,0,${.06+.06*Math.sin(t*6)})`;c.fillRect(0,0,w,h);}
  if(G.whiteFlash>0){c.fillStyle=`rgba(255,255,255,${G.whiteFlash})`;c.fillRect(0,0,w,h);}
  $('lockPrompt').style.display=(G.state==='play'&&needsLock())?'block':'none';}
function drawMsgs(c,w,h){c.textAlign='left';let my=h*.72;for(let i=G.msgs.length-1;i>=0;i--){const m=G.msgs[i];c.globalAlpha=Math.min(1,m.t);c.font='600 16px Rajdhani,sans-serif';c.fillStyle='rgba(0,0,0,.45)';const tw=c.measureText(m.text).width;c.fillRect(w*.03-6,my-15,tw+12,21);c.fillStyle=m.col;c.fillText(m.text,w*.03,my);my-=24;}c.globalAlpha=1;}
function wrapText(c,txt,maxW){const words=txt.split(/\s+/);const lines=[];let cur='';for(const wd of words){const tst=cur?cur+' '+wd:wd;if(c.measureText(tst).width>maxW&&cur){lines.push(cur);cur=wd;}else cur=tst;}if(cur)lines.push(cur);
  if(lines.length>3){lines.length=3;lines[2]=lines[2].slice(0,Math.max(0,lines[2].length-1))+'…';}return lines;}
function rrect(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function drawHallHUD(c,w,h){const cx=w/2,cy=h/2;const o=hallOrigin();
  for(const Rm of NET.remotes.values()){if(Rm.st!=='hall'||!Rm.hpos)continue;const head=vadd(o,vadd(Rm.hpos,[0,2.08,0]));const sp=proj(head);if(!sp)continue;const d=vdist(head,G.cam.pos);if(d>70)continue;const sc=clamp(9/d,.6,1.25);const col=css(PAINT[Rm.c]||PAINT[0]);
    c.textAlign='center';c.font=`700 ${Math.round(15*sc)}px Rajdhani,sans-serif`;c.fillStyle='rgba(0,0,0,.5)';c.fillText(Rm.name,sp[0]+1,sp[1]+1);c.fillStyle=col;c.fillText(Rm.name,sp[0],sp[1]);
    if(Rm.bubble){c.font=`600 ${Math.round(15*sc)}px Rajdhani,sans-serif`;const lines=wrapText(c,Rm.bubble.text,230*sc);const lh=17*sc;const bw=Math.max(...lines.map(l=>c.measureText(l).width))+18*sc;const bh=lines.length*lh+10*sc;const bx=sp[0]-bw/2,by=sp[1]-20*sc-bh;
      c.globalAlpha=clamp(Rm.bubble.t,0,1);c.fillStyle='rgba(12,14,34,.88)';c.strokeStyle=col;c.lineWidth=1.5;rrect(c,bx,by,bw,bh,8*sc);c.fill();c.stroke();c.beginPath();c.moveTo(sp[0]-6*sc,by+bh);c.lineTo(sp[0],by+bh+7*sc);c.lineTo(sp[0]+6*sc,by+bh);c.closePath();c.fillStyle='rgba(12,14,34,.88)';c.fill();
      c.fillStyle='#fff';lines.forEach((l,i)=>c.fillText(l,sp[0],by+4*sc+lh*(i+1)-3*sc));c.globalAlpha=1;}}
  c.fillStyle='rgba(255,255,255,.75)';c.beginPath();c.arc(cx,cy,2.5,0,TAU);c.fill();
  if(G.interact){c.textAlign='center';c.font='700 15px Orbitron,sans-serif';c.fillStyle='rgba(0,0,0,.5)';c.fillText(G.interact.text,cx+1,cy+61);c.fillStyle='#ffb347';c.fillText(G.interact.text,cx,cy+60);}
  const all=[...NET.remotes.values()].filter(r=>r.name);const here=all.filter(r=>r.st==='hall').length+1;
  c.textAlign='center';c.font='900 18px Orbitron,sans-serif';c.fillStyle='#ff9be8';c.fillText('HAVEN CONCOURSE',cx,36);
  c.font='600 14px Rajdhani,sans-serif';c.fillStyle='#d6c8f2';c.fillText(NET.state==='online'?`${here} pilot${here>1?'s':''} here · ${all.length+1} online across the galaxy`:'Offline · solo concourse',cx,56);
  c.font='600 13px Rajdhani,sans-serif';c.fillStyle='rgba(225,215,255,.6)';c.fillText('WASD walk · SHIFT run · SPACE jump · ENTER chat · 1 wave · 2 dance · 3 fireworks · 4 hearts · TAB lounge menu · F at an airlock to board your ship',cx,h-16);
  drawMsgs(c,w,h);
  if(G.whiteFlash>0){c.fillStyle=`rgba(255,225,250,${G.whiteFlash})`;c.fillRect(0,0,w,h);}
  $('lockPrompt').style.display=(G.state==='hall'&&needsLock())?'block':'none';}
function drawCockpit(c,w,h,S){const top=h*.84;const ox=(Math.random()-.5)*G.shake*4,oy=(Math.random()-.5)*G.shake*4;c.save();c.translate(ox,oy);
  // struts
  c.fillStyle='rgba(8,13,20,.92)';for(const s of[0,1]){c.save();if(s){c.translate(w,0);c.scale(-1,1);}c.beginPath();c.moveTo(-10,-10);c.lineTo(w*.035,-10);c.lineTo(w*.16,top+4);c.lineTo(w*.1,top+20);c.lineTo(-10,h*.3);c.closePath();c.fill();
    c.strokeStyle='rgba(72,229,255,.25)';c.lineWidth=1.5;c.beginPath();c.moveTo(w*.035,-10);c.lineTo(w*.16,top+4);c.stroke();c.restore();}
  c.beginPath();c.moveTo(-10,-10);c.lineTo(w+10,-10);c.lineTo(w+10,h*.018);c.quadraticCurveTo(w/2,h*.045,-10,h*.018);c.closePath();c.fill();
  // console
  const g=c.createLinearGradient(0,top-10,0,h);g.addColorStop(0,'rgba(16,26,40,.95)');g.addColorStop(1,'rgba(3,6,11,.99)');c.fillStyle=g;
  c.beginPath();c.moveTo(-10,h+10);c.lineTo(-10,top+h*.03);c.lineTo(w*.17,top);c.quadraticCurveTo(w*.5,top-h*.04,w*.83,top);c.lineTo(w+10,top+h*.03);c.lineTo(w+10,h+10);c.closePath();c.fill();
  c.strokeStyle='rgba(72,229,255,.4)';c.lineWidth=1.5;c.beginPath();c.moveTo(-10,top+h*.03);c.lineTo(w*.17,top);c.quadraticCurveTo(w*.5,top-h*.04,w*.83,top);c.lineTo(w+10,top+h*.03);c.stroke();
  c.restore();
  // bars
  const bx=w*.04,bw=Math.min(240,w*.2);let by=top+h*.06;
  bar(c,bx,by,bw,9,P.shield/S.maxShield,'#48c8ff','SHIELD',Math.round(P.shield)+'');by+=Math.max(30,h*.042);
  bar(c,bx,by,bw,9,P.hull/S.maxHull,P.hull<S.maxHull*.3?'#ff4d5e':'#ffab40','HULL',Math.round(Math.max(0,P.hull))+'');by+=Math.max(30,h*.042);
  bar(c,bx,by,bw,9,P.energy/S.maxEnergy,'#ffe14d','ENERGY',Math.round(P.energy)+'');
  // speed
  const sx=w*.04+bw+30;if(sx+120<w*.5-100){c.textAlign='left';c.font='900 30px Orbitron,sans-serif';c.fillStyle='#e8fbff';c.fillText(Math.round(vlen(P.vel)),sx,top+h*.1);c.font='700 11px Orbitron,sans-serif';c.fillStyle='#7ff0ff';c.fillText('M/S',sx,top+h*.1+16);
    c.fillStyle=P.boost?'#ffb347':P.cruise===2?'#48e5ff':'#5a7a8a';c.fillText(P.boost?'AFTERBURNER':P.cruise===2?'CRUISE DRIVE':P.cruise===1?'SPOOLING':'NOMINAL',sx,top+h*.1+32);}
  // radar
  const rr=Math.min(92,h*.12);const rx=w/2,ry=h-rr-12;
  c.fillStyle='rgba(2,14,22,.85)';c.beginPath();c.arc(rx,ry,rr,0,TAU);c.fill();c.strokeStyle='rgba(72,229,255,.45)';c.lineWidth=1.2;c.stroke();
  c.strokeStyle='rgba(72,229,255,.15)';c.beginPath();c.arc(rx,ry,rr*.5,0,TAU);c.moveTo(rx-rr,ry);c.lineTo(rx+rr,ry);c.moveTo(rx,ry-rr);c.lineTo(rx,ry+rr);c.stroke();
  c.fillStyle='rgba(72,229,255,.07)';c.beginPath();c.moveTo(rx,ry);c.arc(rx,ry,rr,-Math.PI/2-.65,-Math.PI/2+.65);c.closePath();c.fill();
  const r=rightOf(P);const RANGE=3500;const plot=(p,col,sz,shape)=>{const d=vsub(p,P.pos);const l=vlen(d);let x=vdot(d,r),y=-vdot(d,P.f),z=vdot(d,P.u);const k=Math.sqrt(Math.min(l,RANGE)/RANGE)*rr/(l||1);x*=k;y*=k;
    if(l>RANGE){const m=Math.hypot(x,y)||1;x=x/m*rr;y=y/m*rr;}c.fillStyle=col;const px=rx+x,py=ry+y;if(shape==='sq')c.fillRect(px-sz,py-sz,sz*2,sz*2);else{c.beginPath();c.arc(px,py,sz,0,TAU);c.fill();}
    if(l<RANGE&&Math.abs(z)>40){c.strokeStyle=col;c.beginPath();c.moveTo(px,py);c.lineTo(px,py+(z>0?-6:6));c.stroke();}};
  const Wd=G.sys;if(Wd.station)plot(Wd.station.pos,'#48e5ff',4,'sq');for(const tm of Wd.terminals)plot(tm.pos,tm.repaired?'#5dff9b':'#ff9a3d',2.5,'sq');
  if(!Wd.cache.found&&vdist(Wd.cache.pos,P.pos)<7000)plot(Wd.cache.pos,'#d58cff',3);
  if(Wd.haven)plot(Wd.haven.pos,'#ff9be8',4,'sq');for(const sd of G.shipDraws||[])if(sd.R)plot(sd.pos,'#5dff9b',3);
  for(const k of pickups)if(vdist(k.pos,P.pos)<RANGE)plot(k.pos,'#ffd27a',1.5);
  for(const e of enemies)if(!e.dead&&(vdist(e.pos,P.pos)<RANGE*1.5||e.T.boss))plot(e.pos,e.state==='attack'?'#ff4d5e':'#ff9a5c',e.T.boss?6:e===G.target?3.5:2.5);
  c.fillStyle='#fff';c.beginPath();c.moveTo(rx,ry-5);c.lineTo(rx-4,ry+4);c.lineTo(rx+4,ry+4);c.fill();
  // weapons
  const slotW=Math.min(70,w*.055),slotH=Math.min(40,h*.055);const wx=w*.96-slotW*6-5*6,wy=top+h*.035;
  WEAPONS.forEach((Wp,i)=>{const x=wx+i*(slotW+6);const un=G.prog.unlocked[Wp.id];const cur=i===G.prog.weapon;c.fillStyle=cur?'rgba(72,229,255,.22)':'rgba(255,255,255,.04)';c.fillRect(x,wy,slotW,slotH);
    c.strokeStyle=cur?'#7ff0ff':'rgba(72,229,255,.2)';c.lineWidth=cur?1.6:1;c.strokeRect(x+.5,wy+.5,slotW-1,slotH-1);c.textAlign='left';c.font='700 10px Orbitron,sans-serif';c.fillStyle=un?'#7ff0ff':'#3a5260';c.fillText(i+1,x+4,wy+12);
    c.textAlign='center';c.font=`700 ${slotW<60?9:10}px Orbitron,sans-serif`;c.fillStyle=un?(cur?'#fff':'#a9d8e8'):'#3a5260';c.fillText(un?Wp.short:'LOCKED',x+slotW/2,wy+30);
    c.fillStyle=`rgb(${Wp.col.map(v=>v*255|0).join(',')})`;if(un)c.fillRect(x+slotW-9,wy+5,5,5);});
  const Wc=WEAPONS[G.prog.weapon];c.textAlign='right';c.font='700 14px Orbitron,sans-serif';c.fillStyle='#e8fbff';c.fillText(Wc.name,w*.96,wy+slotH+22);
  c.font='600 14px Rajdhani,sans-serif';c.fillStyle='#8fb7c9';c.fillText(Wc.ammo?`MISSILES ${G.prog.missiles}/${S.maxMissiles}`:Wc.kind==='lance'?'HOLD TO FIRE · DRAINS ENERGY':`${Wc.energy} ENERGY / SHOT`,w*.96,wy+slotH+39);}

// =====================================================================
//  SCREENS
// =====================================================================
function show(id){$(id).classList.add('on');}function hide(id){$(id).classList.remove('on');}
function openPause(){if(G.state!=='play')return;G.state='pause';releasePointer();mouseDown=false;$('sSens').value=settings.sens;$('sInv').value=settings.invert?'1':'0';$('sMode').value=settings.mouseMode;$('sVol').value=settings.vol;show('pauseScr');}
function resume(){hide('pauseScr');G.state='play';audioInit();lockPointer();}
$('bResume').onclick=resume;
$('bQuit').onclick=()=>{save();hide('pauseScr');G.state='title';show('title');$('bCont').style.display='';};
$('sSens').oninput=e=>{settings.sens=+e.target.value;saveSettings();};
$('sInv').onchange=e=>{settings.invert=e.target.value==='1';saveSettings();};
$('sMode').onchange=e=>{settings.mouseMode=e.target.value;saveSettings();};
$('sVol').oninput=e=>{settings.vol=+e.target.value;if(A.master)A.master.gain.value=settings.vol;saveSettings();};
function startGame(prog){G.prog=prog;P=null;audioInit();hide('title');G.msgs=[];loadSystem(prog.cur);G.state='play';lockPointer();
  if(prog.time<1){setTimeout(()=>msg('Commander, the Severance shattered the relay network across the galaxy.','#bff4ff'),1200);setTimeout(()=>msg('Repair the station terminals to restore each jump beacon.','#bff4ff'),4200);
    setTimeout(()=>msg('Follow the cyan waypoint. Hold W to thrust, H for cruise drive.','#7ff0ff'),7200);
    setTimeout(()=>msg('Pink marker = HAVEN satellite, a safe zone. Dock with F, then walk around inside and meet other pilots. Enter = chat.','#ff9be8'),10500);}}
$('bNew').onclick=()=>{startGame(newProgress());};
$('bCont').onclick=()=>{const s=loadSave();if(s){if(s.weapon===undefined)s.weapon=0;startGame(s);}};
if(loadSave())$('bCont').style.display='';
function showDead(){G.state='dead';$('deadStats').innerHTML=`Your ship was destroyed in ${G.sys.def.name}.<br>The salvage drone recovered your flight data.<br><span class="k">Respawning costs 15% of your credits.</span>`;show('deadScr');}
$('bRespawn').onclick=()=>{hide('deadScr');const loss=Math.floor(G.prog.credits*.15);G.prog.credits-=loss;P=makePlayer(G.sys.arrival,vnorm(vsub(G.sys.hub,G.sys.arrival)));initDust();projs=[];
  for(const e of enemies){if(e.T.static||e.T.boss)continue;e.state='patrol';e.provoked=false;if(vdist(e.pos,P.pos)<2500)e.pos=vadd(e.home,vscale(randUnit(),400));}
  G.state='play';msg(`Ship reconstituted. -${loss} CR`,'#ffb347');lockPointer();save();};
function showWin(){G.state='win';releasePointer();const p=G.prog;const m=Math.floor(p.time/60);
  $('winStats').innerHTML=`The Leviathan has fallen and the relay network sings again.<br><br>Flight time <b>${m} min</b> · Hostiles destroyed <b>${p.kills}</b><br>Credits <b>${p.credits.toLocaleString()}</b> · Ship losses <b>${p.deaths}</b>`;show('winScr');save();}
$('bWinCont').onclick=()=>{hide('winScr');G.state='play';lockPointer();};
$('bWinTitle').onclick=()=>{hide('winScr');G.state='title';show('title');$('bCont').style.display='';};

// ---------- Galaxy map ----------
const MAP={sel:-1,hover:-1,stars:[]};for(let i=0;i<400;i++)MAP.stars.push([Math.random(),Math.random(),Math.random()]);
function openMap(){G.state='map';releasePointer();mouseDown=false;MAP.sel=G.prog.cur;show('mapScr');updateMapInfo();SFX.ui();requestAnimationFrame(drawMap);}
function closeMap(){hide('mapScr');G.state='play';lockPointer();}
$('bMapClose').onclick=closeMap;
function mapPos(i,cw,ch){const s=SYS[i];const pad=60,side=Math.min(340,cw*.4);return[pad+s.x*(cw-pad*2-side),pad+40+s.y*(ch-pad*2-60)];}
function drawMap(){if(G.state!=='map')return;const cv2=$('mapCv');const cw=cv2.clientWidth,ch=cv2.clientHeight;if(cv2.width!==cw*DPR){cv2.width=cw*DPR;cv2.height=ch*DPR;}const c=cv2.getContext('2d');c.setTransform(DPR,0,0,DPR,0,0);const t=performance.now()/1000;
  c.fillStyle='#01040a';c.fillRect(0,0,cw,ch);
  for(const[i,col]of[[0,'rgba(60,40,140,.25)'],[3,'rgba(150,50,40,.2)'],[7,'rgba(160,20,40,.3)'],[4,'rgba(40,120,170,.2)']]){const[x,y]=mapPos(i,cw,ch);const g=c.createRadialGradient(x,y,0,x,y,cw*.25);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,cw,ch);}
  for(const s of MAP.stars){c.fillStyle=`rgba(200,220,255,${s[2]*.6})`;c.fillRect(s[0]*cw,s[1]*ch,1.2,1.2);}
  const st=G.prog.systems;
  for(const[a,b]of LINKS){const A_=mapPos(a,cw,ch),B=mapPos(b,cw,ch);const vis=st[a].state!=='locked'||st[b].state!=='locked';const open=st[a].state==='completed'||st[b].state==='completed';
    c.strokeStyle=open?'rgba(72,229,255,.6)':vis?'rgba(72,229,255,.18)':'rgba(255,255,255,.05)';c.lineWidth=open?2:1;c.setLineDash(open?[]:[5,6]);c.beginPath();c.moveTo(A_[0],A_[1]);c.lineTo(B[0],B[1]);c.stroke();}c.setLineDash([]);
  SYS.forEach((s,i)=>{const[x,y]=mapPos(i,cw,ch);const S=st[i];const col=`rgb(${s.star.map(v=>v*255|0).join(',')})`;const known=S.state!=='locked';
    const g=c.createRadialGradient(x,y,0,x,y,known?36:18);g.addColorStop(0,known?col:'rgba(120,120,140,.5)');g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,known?36:18,0,TAU);c.fill();
    c.fillStyle=known?'#fff':'#556';c.beginPath();c.arc(x,y,known?6:4,0,TAU);c.fill();
    if(S.state==='completed'){c.strokeStyle='#5dff9b';c.lineWidth=2;c.beginPath();c.arc(x,y,13,0,TAU);c.stroke();}
    else if(S.state==='available'){c.strokeStyle=`rgba(255,179,71,${.5+.5*Math.sin(t*4)})`;c.lineWidth=2;c.beginPath();c.arc(x,y,13+Math.sin(t*4)*2,0,TAU);c.stroke();}
    if(i===G.prog.cur){c.strokeStyle='#48e5ff';c.lineWidth=2;c.beginPath();for(let k=0;k<3;k++){const a=t+k*TAU/3;c.moveTo(x+Math.cos(a)*20,y+Math.sin(a)*20);c.lineTo(x+Math.cos(a)*26,y+Math.sin(a)*26);}c.stroke();}
    if(i===MAP.sel){c.strokeStyle='#fff';c.lineWidth=1;c.strokeRect(x-22,y-22,44,44);}
    c.textAlign='center';c.font='700 12px Orbitron,sans-serif';c.fillStyle=known?(i===MAP.hover?'#fff':'#bfe9f5'):'#4c5a66';c.fillText(known?s.name:'UNCHARTED',x,y+42);
    if(s.boss&&known){c.fillStyle='#ff4d5e';c.font='700 10px Orbitron,sans-serif';c.fillText('☠ LEVIATHAN',x,y+56);}});
  requestAnimationFrame(drawMap);}
function updateMapInfo(){const i=MAP.sel;const s=SYS[i],S=G.prog.systems[i];const known=S.state!=='locked';
  $('mapName').textContent=known?s.name:'UNCHARTED SYSTEM';const done=S.terms.filter(Boolean).length;
  let html='';if(known){html+=`<div><span class="k">Threat</span> ${'▮'.repeat(s.lvl+1)}${'▯'.repeat(6-s.lvl-1)}</div><div><span class="k">Status</span> ${S.state==='completed'?'<span style="color:#5dff9b">BEACON ONLINE</span>':'<span style="color:#ffb347">BEACON OFFLINE</span>'}</div>`;
    html+=`<div><span class="k">${s.boss?'Ion arrays':'Terminals'}</span> ${done}/${s.terms}</div><div><span class="k">Planets surveyed</span> ${S.visited?S.scanned.filter(Boolean).length+'/'+s.pt.length:'?'}</div><div><span class="k">Derelict cache</span> ${S.cache?'Salvaged':S.visited?'Signal detected':'Unknown'}</div>`;
    if(s.boss)html+=`<div style="color:#ff6170;margin-top:6px">The Leviathan's lair. Repair the ion lance arrays to breach its shield.</div>`;}
  else html='<div class="k">Restore a neighbouring jump beacon to chart a route here.</div>';
  let can=known&&i!==G.prog.cur;let why='';if(i===G.prog.cur)why='You are here.';else if(!known)why='No route charted.';else if(hostilesNear(1500)){can=false;why='<span style="color:#ff6170">Hyperdrive inhibited — hostiles in range.</span>';}
  if(why)html+=`<div style="margin-top:8px">${why}</div>`;$('mapInfo').innerHTML=html;$('bJump').disabled=!can;}
$('mapCv').addEventListener('mousemove',e=>{const cw=e.target.clientWidth,ch=e.target.clientHeight;MAP.hover=-1;SYS.forEach((s,i)=>{const[x,y]=mapPos(i,cw,ch);if(Math.hypot(e.offsetX-x,e.offsetY-y)<26)MAP.hover=i;});e.target.style.cursor=MAP.hover>=0?'pointer':'default';});
$('mapCv').addEventListener('click',()=>{if(MAP.hover>=0){MAP.sel=MAP.hover;updateMapInfo();SFX.ui();}});
$('bJump').onclick=()=>{const i=MAP.sel;hide('mapScr');G.state='warp';G.warpT=0;G.warpTo=i;G.warpLoaded=false;P.cruise=0;projs=[];SFX.warp();lockPointer();};

// ---------- Shop ----------
function openShop(){const W=G.sys;if(!W.station||vdist(W.station.pos,P.pos)>1600||!W.terminals.some(t=>t.repaired)){msg('Station services need a repaired terminal nearby','#ff8a7a');return;}
  if(hostilesNear(1400)){msg('Cannot dock — hostiles in range','#ff8a7a');return;}G.state='shop';releasePointer();mouseDown=false;renderShop();show('shopScr');SFX.ui();}
function closeShop(){hide('shopScr');G.state='play';lockPointer();}
$('bShopClose').onclick=closeShop;
function renderShop(){const p=G.prog,S=stats();$('shopCr').textContent=p.credits.toLocaleString()+' CR';let h='';
  for(const u of UPG){const lv=p.upg[u.id];const cost=UPG_COST[lv];h+=`<div class="upg"><div><div class="nm">${u.name}</div><div class="ds">${u.desc}</div></div><div class="pips">${[0,1,2,3,4].map(k=>`<i class="${k<lv?'on':''}"></i>`).join('')}</div>
    <button class="btn sm" data-u="${u.id}" ${lv>=5||p.credits<cost?'disabled':''}>${lv>=5?'MAX':cost+' CR'}</button></div>`;}
  $('shopList').innerHTML=h;const rep=Math.ceil((S.maxHull-P.hull)*2);const mis=S.maxMissiles-p.missiles;const mcost=mis*12;
  $('shopSvc').innerHTML=`<button class="btn sm" id="bRep" ${rep<=0||p.credits<rep?'disabled':''}>REPAIR HULL · ${rep} CR</button>`+(p.unlocked.seeker?`<button class="btn sm" id="bMis" ${mis<=0||p.credits<mcost?'disabled':''}>RESTOCK MISSILES · ${mcost} CR</button>`:'');
  $('shopList').querySelectorAll('button[data-u]').forEach(b=>b.onclick=()=>{const id=b.dataset.u;const lv=p.upg[id];const cost=UPG_COST[lv];if(p.credits>=cost&&lv<5){const before=stats();p.credits-=cost;p.upg[id]++;const after=stats();
    P.hull+=after.maxHull-before.maxHull;P.shield+=after.maxShield-before.maxShield;SFX.unlock();save();renderShop();}});
  const br=$('bRep');if(br)br.onclick=()=>{p.credits-=rep;P.hull=S.maxHull;SFX.pick();save();renderShop();};
  const bm=$('bMis');if(bm)bm.onclick=()=>{p.credits-=mcost;p.missiles=S.maxMissiles;SFX.pick();save();renderShop();};}

// ---------- Terminal minigames ----------
const TG={term:null,done:false,timers:[],raf:0};
function tgClear(){TG.timers.forEach(clearTimeout);TG.timers=[];cancelAnimationFrame(TG.raf);}
function tStatus(t,cls=''){const s=$('termStatus');s.textContent=t;s.className=cls;}
function openTerminal(term){G.state='term';releasePointer();mouseDown=false;TG.term=term;TG.done=false;tgClear();const W=G.sys;const lvl=W.def.lvl;
  $('termTitle').textContent=(term.array?'ION LANCE ARRAY ':'RELAY TERMINAL ')+'T-'+String(W.idx+1).padStart(2,'0')+String(term.id+1);
  $('termDone').style.display='none';$('termAbort').style.display='';const body=$('termBody');body.innerHTML='';
  if(term.game==='wires'){$('termSub').textContent='Power conduits severed. Reconnect each line to its matching node.';wiresGame(body,lvl);}
  else if(term.game==='seq'){$('termSub').textContent='Security lockout. Watch the access sequence, then repeat it.';seqGame(body,lvl);}
  else{$('termSub').textContent='Carrier signal drift. Tune the oscillator to match the beacon waveform.';freqGame(body,lvl);}
  show('termScr');SFX.ui();}
function termSuccess(){TG.done=true;SFX.good();tStatus('✔ TERMINAL RESTORED — RELAY LINK ESTABLISHED','ok');$('termDone').style.display='';$('termAbort').style.display='none';}
function closeTerminal(){tgClear();hide('termScr');G.state='play';if(TG.done)onTerminalRepaired(TG.term);TG.done=false;lockPointer();}
$('termDone').onclick=closeTerminal;$('termAbort').onclick=closeTerminal;
function termShock(){const d=8+G.sys.def.lvl*3;P.hull=Math.max(1,P.hull-d);tStatus(`⚡ SURGE! Hull -${d}. Sequence reset.`,'bad');SFX.hull();}
function wiresGame(body,lvl){const n=Math.min(6,4+(lvl>>1));const cv2=document.createElement('canvas');cv2.width=480;cv2.height=320;cv2.className='tcanvas';body.appendChild(cv2);const x=cv2.getContext('2d');
  const cols=shuffle(['#ff4d5e','#41f28a','#3fa9ff','#ffd23f','#d65cff','#3ff0e8']).slice(0,n);const yy=i=>40+i*(240/(n-1));
  const L=cols.map((c,i)=>({c,x:60,y:yy(i),used:false}));const order=shuffle(cols.slice());const R=order.map((c,i)=>({c,x:420,y:yy(i),used:false}));
  let sel=null,mx=0,my=0,errT=0;const links=[];tStatus(`0/${n} CONDUITS ROUTED`);
  const pos=e=>{const b=cv2.getBoundingClientRect();return[(e.clientX-b.left)*480/b.width,(e.clientY-b.top)*320/b.height];};
  cv2.onmousemove=e=>{[mx,my]=pos(e);};
  cv2.onclick=e=>{if(TG.done)return;const[px,py]=pos(e);const hitL=L.find(n=>!n.used&&Math.hypot(n.x-px,n.y-py)<20);const hitR=R.find(n=>!n.used&&Math.hypot(n.x-px,n.y-py)<20);
    if(hitL){sel=hitL;SFX.ui();return;}
    if(sel&&hitR){if(hitR.c===sel.c){links.push([sel,hitR]);sel.used=hitR.used=true;sel=null;tone(600+links.length*120,'triangle',.12,.08);tStatus(`${links.length}/${n} CONDUITS ROUTED`);if(links.length===n)termSuccess();}
      else{errT=.5;sel=null;SFX.bad();tStatus('✖ MISMATCH — conduit sparked','bad');}}};
  const draw=()=>{x.fillStyle='#020b10';x.fillRect(0,0,480,320);x.strokeStyle='rgba(72,229,255,.06)';for(let i=0;i<480;i+=20){x.beginPath();x.moveTo(i,0);x.lineTo(i,320);x.stroke();}for(let i=0;i<320;i+=20){x.beginPath();x.moveTo(0,i);x.lineTo(480,i);x.stroke();}
    const wire=(a,bx,by,c,w)=>{x.strokeStyle=c;x.lineWidth=w;x.beginPath();x.moveTo(a.x,a.y);x.bezierCurveTo(a.x+140,a.y,bx-140,by,bx,by);x.stroke();};
    x.shadowBlur=12;for(const[a,b]of links){x.shadowColor=a.c;wire(a,b.x,b.y,a.c,5);}x.shadowBlur=0;
    if(sel){x.setLineDash([6,6]);wire(sel,mx,my,sel.c,3);x.setLineDash([]);}
    for(const nd of[...L,...R]){x.fillStyle='#061820';x.beginPath();x.arc(nd.x,nd.y,15,0,TAU);x.fill();x.strokeStyle=nd.c;x.lineWidth=nd===sel?4:2;x.stroke();x.fillStyle=nd.used?nd.c:nd.c+'55';x.beginPath();x.arc(nd.x,nd.y,8,0,TAU);x.fill();}
    if(errT>0){errT-=1/60;x.fillStyle=`rgba(255,60,60,${errT*.4})`;x.fillRect(0,0,480,320);}
    x.font='700 11px Orbitron,sans-serif';x.fillStyle='#4f8899';x.textAlign='center';x.fillText('SOURCE',60,18);x.fillText('RELAY',420,18);
    TG.raf=requestAnimationFrame(draw);};draw();}
function seqGame(body,lvl){const len=Math.min(8,4+Math.floor(lvl/1.4));const G9=['◆','▲','●','■','✦','⬢','✚','◐','★'];
  const wrap=document.createElement('div');wrap.className='glyphs';body.appendChild(wrap);const dots=document.createElement('div');dots.className='dots';body.appendChild(dots);
  const btns=G9.map((g,i)=>{const b=document.createElement('button');b.className='glyph';b.textContent=g;wrap.appendChild(b);return b;});
  let seq=[],idx=0,input=false;
  const setDots=()=>{dots.innerHTML=seq.map((_,k)=>`<span class="${k<idx?'on':''}"></span>`).join('');};
  const play=()=>{input=false;idx=0;setDots();tStatus('OBSERVE ACCESS SEQUENCE…');seq.forEach((g,k)=>{TG.timers.push(setTimeout(()=>{btns[g].classList.add('lit');tone(400+g*70,'sine',.25,.07);TG.timers.push(setTimeout(()=>btns[g].classList.remove('lit'),380));},700+k*560));});
    TG.timers.push(setTimeout(()=>{input=true;tStatus(`REPEAT THE SEQUENCE · ${len} GLYPHS`);},700+seq.length*560));};
  const newSeq=()=>{seq=[];for(let k=0;k<len;k++)seq.push((Math.random()*9)|0);play();};
  btns.forEach((b,i)=>b.onclick=()=>{if(!input||TG.done)return;b.classList.add('lit');TG.timers.push(setTimeout(()=>b.classList.remove('lit'),160));
    if(i===seq[idx]){tone(400+i*70,'sine',.18,.07);idx++;setDots();if(idx===seq.length){input=false;termSuccess();}}
    else{input=false;b.classList.add('bad');TG.timers.push(setTimeout(()=>b.classList.remove('bad'),400));SFX.bad();termShock();TG.timers.push(setTimeout(newSeq,1300));}});
  newSeq();}
function freqGame(body,lvl){const usePh=lvl>=2;const tf=1.5+Math.round(Math.random()*9)*.5,ta=.35+Math.random()*.55,tp=usePh?Math.random()*TAU:0;
  const cv2=document.createElement('canvas');cv2.width=480;cv2.height=200;cv2.className='tcanvas';body.appendChild(cv2);const x=cv2.getContext('2d');
  const mk=(lab,min,max,step,val)=>{const d=document.createElement('div');d.className='sl';d.innerHTML=`<span>${lab}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${val}"><span></span>`;body.appendChild(d);return d.querySelector('input');};
  const fI=mk('FREQUENCY',1,7,.05,(tf>4?1.5:6.5)),aI=mk('AMPLITUDE',.1,1,.01,(ta>.6?.2:.95)),pI=usePh?mk('PHASE',0,6.28,.02,(tp+3)%6.28):null;
  let hold=0;let last=performance.now();tStatus('TUNE OSCILLATOR TO MATCH CARRIER');
  const draw=()=>{const now=performance.now();const dt=(now-last)/1000;last=now;const f=+fI.value,a=+aI.value,p=pI?+pI.value:0;
    let pd=Math.abs(((p-tp)%TAU+TAU)%TAU);pd=Math.min(pd,TAU-pd);const err=Math.abs(f-tf)/1.2+Math.abs(a-ta)/.25+(usePh?pd/1.1:0);const sync=clamp(1-err,0,1);
    x.fillStyle='#020b10';x.fillRect(0,0,480,200);x.strokeStyle='rgba(72,229,255,.08)';for(let i=0;i<480;i+=24){x.beginPath();x.moveTo(i,0);x.lineTo(i,200);x.stroke();}x.beginPath();x.moveTo(0,100);x.lineTo(480,100);x.stroke();
    const wave=(F,Aa,Ph,col,w)=>{x.strokeStyle=col;x.lineWidth=w;x.beginPath();for(let i=0;i<=480;i+=3){const yy=100-Math.sin(i/480*TAU*F+Ph+(TG.done?0:now/1000*1.2))*Aa*80;i?x.lineTo(i,yy):x.moveTo(i,yy);}x.stroke();};
    wave(tf,ta,tp,'rgba(93,255,155,.45)',6);wave(f,a,p,sync>.9?'#5dff9b':'#48e5ff',2);
    x.font='700 12px Orbitron,sans-serif';x.textAlign='right';x.fillStyle=sync>.9?'#5dff9b':'#7ff0ff';x.fillText('SYNC '+Math.round(sync*100)+'%',470,20);
    fI.parentNode.lastChild.textContent=f.toFixed(2);aI.parentNode.lastChild.textContent=a.toFixed(2);if(pI)pI.parentNode.lastChild.textContent=p.toFixed(2);
    if(!TG.done){if(sync>.9){hold+=dt;tStatus(`SIGNAL LOCKING… ${Math.min(100,Math.round(hold/1.2*100))}%`,'ok');if(hold>=1.2)termSuccess();}else{if(hold>0)tStatus('TUNE OSCILLATOR TO MATCH CARRIER');hold=0;}}
    TG.raf=requestAnimationFrame(draw);};draw();}


// =====================================================================
//  ONLINE: HAVEN NETWORK (live presence via the page's room)
// =====================================================================
const SHIP_S=2;
const PAINT=[[.3,.9,1],[1,.6,.2],[1,.35,.85],[.5,1,.35],[1,.85,.3],[1,.3,.3],[.65,.45,1],[.92,.95,1]];
const css=c=>`rgb(${c.map(v=>Math.min(255,Math.max(0,v*255|0))).join(',')})`;
const NET={room:null,state:'connecting',remotes:new Map(),sendT:0,chatI:0,emoI:0,myChat:null,myEmo:null,dk:0,log:[]};
const SELF={emoT:0,emoK:null,rpos:null};
const EMOTES={wave:'waves 👋',spin:'busts a move 🕺',fire:'launches fireworks 🎆',love:'sends hearts 💖',drink:'orders a Nebula Fizz 🍹'};
const BADCH=new RegExp("[\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u200b-\\u200f\\u2028-\\u202e\\u2060-\\u206f\\ufeff\\ue000-\\uf8ff]","g");
const cleanName=s=>String(s==null?'':s).replace(BADCH,'').trim().slice(0,16)||'PILOT';
const cleanText=s=>String(s==null?'':s).replace(BADCH,'').trim().slice(0,140);
const num=(x,d=0)=>typeof x==='number'&&isFinite(x)?x:d;
const vec=(a,d=[0,0,0])=>Array.isArray(a)&&a.length===3?[clamp(num(a[0]),-1e6,1e6),clamp(num(a[1]),-1e6,1e6),clamp(num(a[2]),-1e6,1e6)]:d;
const vnormSafe=(a,d)=>{const v=vec(a,d);return vlen(v)>1e-6?vnorm(v):d;};
function updTitleNet(){const el=$('tNet');if(el)el.textContent=NET.state==='online'?'● ONLINE — meet other pilots at the Haven satellites':NET.state==='offline'?'○ Offline — open this game on claude.ai (signed in) to play online':'Connecting to the Haven network…';}
(function netInit(){let tries=0;const go=async()=>{
  if(!window.claude||typeof window.claude.use!=='function'){if(++tries<24){setTimeout(go,250);return;}NET.state='offline';updTitleNet();return;}
  try{const r=await window.claude.use('room');if(!r){NET.state='offline';updTitleNet();return;}NET.room=r;NET.state='online';
    r.onPeers(ch=>{for(const p of ch.left){const Rm=NET.remotes.get(p.peer);if(Rm&&Rm.name&&Rm.st!=='menu')netLog(`${Rm.name} left the network`,Rm.c,true);NET.remotes.delete(p.peer);}},()=>{NET.state='offline';updTitleNet();});
    r.onConnection(c=>{NET.connected=c;},()=>{NET.state='offline';updTitleNet();});
  }catch(e){NET.state='offline';}updTitleNet();};go();})();
function myState(){const s=G.state;if(inHall())return'hall';if(s==='docked'||s==='docking')return'dock';if(s==='warp')return'warp';if(s==='title')return'menu';if(s==='dying'||s==='dead'||(P&&P.dead))return'dead';return'fly';}
function myPresence(){const st=myState();const r3=v=>[Math.round(v[0]),Math.round(v[1]),Math.round(v[2])],r2=v=>[+v[0].toFixed(3),+v[1].toFixed(3),+v[2].toFixed(3)];
  return{v:1,n:cleanName(settings.callsign),c:settings.paint|0,s:G.prog?G.prog.cur:0,st,p:r3(P.pos),f:r2(P.f),u:r2(P.u),vl:r3(P.vel),fr:st==='fly'&&P.firingW>=0?P.firingW:-1,dk:(st==='dock'||st==='hall')?NET.dk:0,ch:NET.myChat,em:NET.myEmo,k:G.prog?G.prog.kills:0,
    hp:st==='hall'?[+HALL.pos[0].toFixed(2),+HALL.pos[1].toFixed(2),+HALL.pos[2].toFixed(2)]:null,hy:st==='hall'?+HALL.yaw.toFixed(3):null,hv:st==='hall'?[+HALL.vel[0].toFixed(2),+HALL.vel[2].toFixed(2)]:null};}
function netUpdate(dt){const r=NET.room;if(!r||NET.state!=='online'||!P)return;
  NET.sendT-=dt;if(NET.sendT<=0){NET.sendT=G.state==='title'?1:.1;try{r.presence(myPresence()).catch(()=>{});}catch(e){}}
  let peers;try{peers=r.peers();}catch(e){return;}const now=performance.now()/1000;const seen=new Set();
  for(const p of peers){if(!p||p.sameTab||p.kind!=='viewer')continue;const pr=p.presence;if(!pr||pr.v!==1)continue;seen.add(p.peer);
    let Rm=NET.remotes.get(p.peer);if(!Rm){Rm={peer:p.peer,pos:null,f:[0,0,1],u:[0,1,0],first:true,emoT:0,fireT:0};NET.remotes.set(p.peer,Rm);}
    if(pr===Rm.pres)continue;Rm.pres=pr;const prevSt=Rm.st;
    Rm.name=cleanName(pr.n);Rm.c=clamp(num(pr.c)|0,0,PAINT.length-1);Rm.s=clamp(num(pr.s)|0,0,SYS.length-1);Rm.st=['fly','dock','warp','menu','dead','hall'].includes(pr.st)?pr.st:'fly';
    Rm.tp=vec(pr.p);Rm.tv=vec(pr.vl);Rm.tf=vnormSafe(pr.f,[0,0,1]);Rm.tu=vnormSafe(pr.u,[0,1,0]);Rm.tt=now;Rm.fr=num(pr.fr,-1)|0;Rm.dk=num(pr.dk);Rm.kills=num(pr.k)|0;
    if(!Rm.pos||prevSt!==Rm.st){Rm.pos=[...Rm.tp];Rm.f=Rm.tf;Rm.u=Rm.tu;}
    if(Rm.st==='hall'){const hp=vec(pr.hp,[0,0,0]);const rr=Math.hypot(hp[0],hp[2]);if(rr>HALL_R-.3){hp[0]*=(HALL_R-.3)/rr;hp[2]*=(HALL_R-.3)/rr;}hp[1]=clamp(hp[1],0,5);Rm.thp=hp;Rm.thy=num(pr.hy);
      const hv=Array.isArray(pr.hv)?pr.hv:[0,0];Rm.thv=[clamp(num(hv[0]),-12,12),0,clamp(num(hv[1]),-12,12)];if(!Rm.hpos||prevSt!=='hall'){Rm.hpos=[...hp];Rm.hyaw=Rm.thy;}}
    const ch=pr.ch;if(ch&&typeof ch==='object'&&num(ch.i,-1)!==Rm.chatI){Rm.chatI=num(ch.i,-1);const txt=cleanText(ch.m);if(txt&&(!Rm.first||Date.now()-num(ch.t)<180000))netChat(Rm,txt);}
    const em=pr.em;if(em&&typeof em==='object'&&num(em.i,-1)!==Rm.emoI){Rm.emoI=num(em.i,-1);if(!Rm.first&&EMOTES[em.k])playEmote(Rm,em.k,Rm.name,Rm.c);}
    if(Rm.first){if(Rm.st!=='menu')netLog(`${Rm.name} is online — ${stText(Rm)}`,Rm.c,true);}
    else if(prevSt!==Rm.st){if(Rm.st==='dock')netLog(`${Rm.name} docked at Haven`,Rm.c,true);else if(prevSt==='dock'&&Rm.st==='fly')netLog(`${Rm.name} undocked`,Rm.c,true);else if(prevSt==='menu')netLog(`${Rm.name} launched into ${SYS[Rm.s].name}`,Rm.c,true);}
    Rm.first=false;}
  for(const k of[...NET.remotes.keys()])if(!seen.has(k))NET.remotes.delete(k);
  for(const Rm of NET.remotes.values()){if(!Rm.pos)continue;const age=Math.min(.6,now-Rm.tt);const pred=vmadd(Rm.tp,Rm.tv,age);const k=1-Math.exp(-dt*10);
    Rm.pos=vdist(Rm.pos,pred)>900?[...pred]:vlerp(Rm.pos,pred,k);
    if(Rm.st==='hall'&&Rm.hpos&&Rm.thp){const hpred=vmadd(Rm.thp,Rm.thv,Math.min(.4,age));Rm.hpos=vdist(Rm.hpos,hpred)>6?[...hpred]:vlerp(Rm.hpos,hpred,1-Math.exp(-dt*12));
      let dy=Rm.thy-Rm.hyaw;dy=Math.atan2(Math.sin(dy),Math.cos(dy));Rm.hyaw+=dy*Math.min(1,dt*12);Rm.hspeed=Math.hypot(Rm.thv[0],Rm.thv[2]);Rm.hphase=(Rm.hphase||0)+dt*Rm.hspeed*2.2;}
    if(Rm.bubble){Rm.bubble.t-=dt;if(Rm.bubble.t<=0)Rm.bubble=null;}const o={f:vnorm(vlerp(Rm.f,Rm.tf,k)),u:vnorm(vlerp(Rm.u,Rm.tu,k))};orthonorm(o);Rm.f=o.f;Rm.u=o.u;Rm.emoT=Math.max(0,Rm.emoT-dt);
    if(G.state==='play'&&Rm.st==='fly'&&Rm.s===G.prog.cur&&Rm.fr>=0&&Rm.fr<WEAPONS.length&&vdist(Rm.pos,P.pos)<5000){Rm.fireT-=dt;if(Rm.fireT<=0){const Wp=WEAPONS[Rm.fr];Rm.fireT=1/(Wp.rof||6);
      const o2=localToWorld({pos:Rm.pos,f:Rm.f,u:Rm.u},[0,-1,15],SHIP_S);
      if(Wp.kind==='rail'||Wp.kind==='lance')beams.push({a:o2,b:vmadd(o2,Rm.f,Wp.range||1000),w:1.6,col:Wp.col,life:Wp.kind==='lance'?.15:.35,max:.35});
      else projs.push({p:o2,prev:o2,v:vadd(vscale(Rm.f,Wp.speed||600),Rm.tv),life:1.6,dmg:0,own:'x',col:Wp.col,size:Wp.size||1.5,len:Wp.len||10,kind:Wp.kind==='nova'?'nova':'bolt'});}}}
  SELF.emoT=Math.max(0,SELF.emoT-dt);}
function dockOrder(){const arr=[];for(const Rm of NET.remotes.values())if(Rm.st==='dock'||Rm.st==='hall')arr.push({k:Rm.peer,dk:Rm.dk||0});if(G.state==='docked'||G.state==='docking'||inHall())arr.push({k:'@me',dk:NET.dk||0});
  arr.sort((a,b)=>a.dk-b.dk||(a.k<b.k?-1:a.k>b.k?1:0));return arr.map(a=>a.k);}
function portPose(i){const h=G.sys.haven.pos;const ring=Math.floor(i/8);const a=(i%8)/8*TAU+.2+ring*TAU/16;const y=ring===0?0:(ring%2?1:-1)*55*Math.ceil(ring/2);
  const out=[Math.cos(a),0,Math.sin(a)];return{pos:vadd(h,vadd(vscale(out,214),[0,y,0])),f:vscale(out,-1),u:[0,1,0],out};}
function shipPoses(){const res=[];const W=G.sys;if(!W||!W.haven||!G.prog)return res;const cur=G.prog.cur;const docked=G.state==='docked'||inHall();const order=dockOrder();
  const add=(pos,f,u,c,emo,Rm,moving)=>{let uu=u;if(emo&&emo.emoT>0){let ang=0;if(emo.emoK==='wave')ang=Math.sin(G.t*12)*.5*Math.min(1,emo.emoT);else if(emo.emoK==='spin')ang=(1-emo.emoT/2.2)*TAU*2;
      if(ang){const rr=vnorm(vcross(f,u));uu=vnorm(vadd(vscale(u,Math.cos(ang)),vscale(rr,Math.sin(ang))));}}
    const col=PAINT[c]||PAINT[0];res.push({pos,f,u:uu,tint:[.22+col[0]*.78,.22+col[1]*.78,.22+col[2]*.78],em:vscale(col,1.8),col,moving,R:Rm});if(Rm)Rm.rpos=pos;};
  for(const Rm of NET.remotes.values()){if(!Rm.pos)continue;
    if((Rm.st==='dock'||Rm.st==='hall')&&(docked||Rm.s===cur)){const i=order.indexOf(Rm.peer);if(i<0)continue;const pt=portPose(i);add(pt.pos,pt.f,pt.u,Rm.c,Rm,Rm,false);}
    else if(Rm.st==='fly'&&Rm.s===cur&&G.state!=='title')add(Rm.pos,Rm.f,Rm.u,Rm.c,Rm,Rm,true);}
  if(docked){const pt=portPose(Math.max(0,order.indexOf('@me')));add(pt.pos,pt.f,pt.u,settings.paint,SELF,null,false);SELF.rpos=pt.pos;}
  return res;}
function stText(r){return r.st==='hall'?'In the concourse':r.st==='dock'?'Docking':r.st==='fly'?'Flying · '+SYS[r.s].name:r.st==='warp'?'Hyperjumping':r.st==='dead'?'Respawning':'In menus';}
function netLog(text,c,sys,name){const e={text,c,sys,name};NET.log.push(e);if(NET.log.length>120)NET.log.shift();if(G.state==='docked'||G.state==='hallmenu')appendLog(e);else if(sys&&G.state!=='title')msg(text,'#ff9be8');}
function appendLog(e){const el=$('chatLog');const d=document.createElement('div');d.className='m'+(e.sys?' sys':'');
  if(e.name){const s=document.createElement('span');s.className='nm';s.style.color=css(PAINT[e.c]||PAINT[0]);s.textContent=e.name+': ';d.appendChild(s);}
  d.appendChild(document.createTextNode(e.text));el.appendChild(d);while(el.children.length>120)el.removeChild(el.firstChild);el.scrollTop=el.scrollHeight;}
function renderLog(){$('chatLog').innerHTML='';NET.log.forEach(appendLog);}
function netChat(Rm,txt){Rm.bubble={text:txt,t:8};netLog(txt,Rm.c,false,Rm.name);if(G.state!=='docked'&&G.state!=='hallmenu'&&G.state!=='title')msg(`${Rm.name}: ${txt}`,css(PAINT[Rm.c]||PAINT[0]));tone(1300,'sine',.06,.03);}
function sendChat(t){t=cleanText(t);if(!t)return;NET.chatI++;NET.myChat={i:NET.chatI,m:t,t:Date.now()};NET.sendT=0;netLog(t,settings.paint,false,cleanName(settings.callsign));
  if(G.state!=='docked'&&G.state!=='hallmenu')msg(`${cleanName(settings.callsign)}: ${t}`,css(PAINT[settings.paint]));if(NET.state!=='online')netLog('(offline: nobody else can hear you right now)',null,true);}
function myEmote(k){if(!EMOTES[k])return;NET.emoI++;NET.myEmo={i:NET.emoI,k};NET.sendT=0;playEmote(SELF,k,cleanName(settings.callsign),settings.paint);}
function playEmote(T,k,name,c){T.emoK=k;T.emoT=2.2;netLog(`${name} ${EMOTES[k]}`,c,true);
  const indoor=inHall()&&(T===SELF||T.st==='hall');const sc=indoor?.05:1;
  const at=()=>indoor?(T===SELF?vadd(hallOrigin(),vadd(HALL.pos,vadd([0,1.7,0],vscale([Math.sin(HALL.yaw),0,Math.cos(HALL.yaw)],2.5)))):vadd(hallOrigin(),vadd(T.hpos||[0,0,0],[0,1.7,0]))):(T.rpos||T.pos||P.pos);
  if(k==='fire'){for(let i=0;i<5;i++)setTimeout(()=>{const p=vadd(at(),indoor?[rand(-2,2),rand(2,4),rand(-2,2)]:[rand(-70,70),rand(50,120),rand(-70,70)]);const cc=pick(PAINT);
      for(let j=0;j<70;j++)parts.push({p:[...p],v:vscale(randUnit(),rand(40,110)*sc),life:rand(1,1.8),max:1.8,s0:1.8*sc,s1:0,c0:[1,1,1],c1:cc,kind:'s',drag:1.2});
      parts.push({p,v:[0,0,0],life:.3,max:.3,s0:30*sc,s1:8*sc,c0:[1,1,1],c1:cc,kind:'g'});tone(rand(300,600),'triangle',.4,.04,80);noise(.4,.08,2000,1,'lowpass',200);},i*380);}
  if(k==='love')for(let j=0;j<40;j++)parts.push({p:vadd(at(),vscale(randUnit(),20*sc)),v:[rand(-15,15)*sc,rand(25,60)*sc,rand(-15,15)*sc],life:rand(1.5,2.5),max:2.5,s0:3*sc,s1:0,c0:[1,.55,.85],c1:[1,.2,.5],kind:'g'});
  if(k==='drink'){tone(700,'sine',.1,.05);tone(520,'sine',.16,.05,null,.09);}
  if(k==='wave')tone(880,'sine',.15,.04);}
// ----- docking -----
function startDock(){if(hostilesNear(1200)){msg('Docking refused — hostiles nearby','#ff8a7a');SFX.empty();return;}
  NET.dk=Date.now();G.state='docking';G.dockT=0;P.cruise=0;P.lanceOn=false;mouseDown=false;P.firingW=-1;
  const pt=portPose(Math.max(0,dockOrder().indexOf('@me')));G.dockFrom={pos:[...P.pos],f:[...P.f],u:[...P.u]};G.dockTo=pt;P.vel=[0,0,0];
  msg('Docking request accepted — welcome to Haven','#ff9be8');tone(500,'sine',.3,.06);tone(750,'sine',.4,.06,null,.2);NET.sendT=0;}
function updateDocking(dt){G.dockT+=dt/2.6;const t=Math.min(1,G.dockT);const k=t*t*(3-2*t);const A_=G.dockFrom,B=G.dockTo;const appr=vadd(B.pos,vscale(B.out,90));
  P.pos=k<.6?vlerp(A_.pos,appr,k/.6):vlerp(appr,B.pos,(k-.6)/.4);const m=Math.min(1,k*1.7);P.f=vnorm(vlerp(A_.f,B.f,m));P.u=vnorm(vlerp(A_.u,B.u,m));orthonorm(P);
  if(G.dockT>=1)enterHall();}
function enterLounge(){const S=stats();G.state='docked';releasePointer();P.vel=[0,0,0];P.hull=S.maxHull;P.shield=S.maxShield;P.energy=S.maxEnergy;G.whiteFlash=.6;
  const out=G.dockTo.out;G.orbit={yaw:Math.atan2(out[2],out[0])+.35,pitch:.28,dist:430};mus.lounge=!!settings.lounge;save();
  $('lName').value=cleanName(settings.callsign);renderPaint();renderLog();renderPilots();updJuke();show('lounge');netLog('Docked at Haven. Hull repaired, shields restored, game saved.',null,true);NET.sendT=0;}
function undock(){if(!inHall()&&G.state!=='docked')return;hide('lounge');const pt=portPose(Math.max(0,dockOrder().indexOf('@me')));
  P.pos=vadd(pt.pos,vscale(pt.out,90));P.f=[...pt.out];P.u=[0,1,0];orthonorm(P);P.vel=vscale(P.f,120);NET.dk=0;G.state='play';mus.lounge=false;initDust();lockPointer();NET.sendT=0;msg('Undocked. Fly safe, pilot.','#ff9be8');}

// ----- Haven concourse (first-person interior) -----
const inHall=()=>G.state==='hall'||G.state==='hallmenu';
const hallOrigin=()=>vadd(G.sys.haven.pos,[0,FLOOR_Y,0]);
const HALL={pos:[0,0,40],yaw:0,pitch:0,vel:[0,0,0],vy:0,ground:true,phase:0,bob:0,lastStep:0};
const HCIRC=[[0,0,3.5],...HPLANTS.map(([x,z])=>[x,z,.6]),...[0,1,2,3,4,5].map(k=>[-7.5+k*3,-26.4,.42])];
const HBOX=[[-9.3,-28.9,9.3,-27.1],[-8.3,-33,8.3,-31.9],[-2.5,32.3,2.5,33.7],[7.7,33.85,9.3,35.15],[-9.3,33.85,-7.7,35.15]];
for(const sx of[-1,1]){const cx=29*sx,bx=cx+sx*3.4;HBOX.push([bx-.9,-4.1,bx+.9,4.1],[cx-3.1,3.3,cx+3.1,4.7],[cx-3.1,-4.7,cx+3.1,-3.3],[cx-1.45,-1.85,cx+1.45,1.85]);}
const groundAt=(x,z)=>(x>-10&&x<10&&z>26&&z<36)?.4:0;
function hallCollide(p){const lim=HALL_R-.75;const r=Math.hypot(p[0],p[2]);if(r>lim){p[0]*=lim/r;p[2]*=lim/r;}
  for(const[cx,cz,cr]of HCIRC){const dx=p[0]-cx,dz=p[2]-cz,d=Math.hypot(dx,dz),m=cr+.35;if(d<m&&d>1e-4){p[0]=cx+dx/d*m;p[2]=cz+dz/d*m;}}
  for(const[x0,z0,x1,z1]of HBOX){const a=x0-.35,b=x1+.35,c=z0-.35,d=z1+.35;if(p[0]>a&&p[0]<b&&p[2]>c&&p[2]<d){const m=Math.min(p[0]-a,b-p[0],p[2]-c,d-p[2]);
    if(m===p[0]-a)p[0]=a;else if(m===b-p[0])p[0]=b;else if(m===p[2]-c)p[2]=c;else p[2]=d;}}}
function updateHall(dt){const H=HALL;let yd=0,pd=0;
  if(isLocked()){const sn=settings.sens*.0022;yd=-mdx*sn;pd=-mdy*sn*(settings.invert?-1:1);}
  else if(settings.mouseMode==='free'){const nx=(mouseX/innerWidth-.5)*2,ny=(mouseY/innerHeight-.5)*2;const dz=v=>Math.abs(v)<.08?0:Math.sign(v)*(Math.abs(v)-.08)/.92;yd=-dz(nx)*2.2*dt;pd=-dz(ny)*1.6*dt*(settings.invert?-1:1);}
  mdx=mdy=0;yd+=((keys.ArrowLeft?1:0)-(keys.ArrowRight?1:0))*2.2*dt;pd+=((keys.ArrowUp?1:0)-(keys.ArrowDown?1:0))*1.6*dt;
  H.yaw+=yd;H.pitch=clamp(H.pitch+pd,-1.45,1.45);
  const f=[Math.sin(H.yaw),0,Math.cos(H.yaw)],r=[-Math.cos(H.yaw),0,Math.sin(H.yaw)];
  const fw=(keys.KeyW?1:0)-(keys.KeyS?1:0),st=(keys.KeyD?1:0)-(keys.KeyA?1:0);const sp=(keys.ShiftLeft||keys.ShiftRight)?7.5:4.2;
  let wish=vadd(vscale(f,fw),vscale(r,st));const wl=vlen(wish);wish=wl>0?vscale(wish,sp/wl):[0,0,0];
  const acc=H.ground?12:2.5;H.vel[0]=lerp(H.vel[0],wish[0],1-Math.exp(-dt*acc));H.vel[2]=lerp(H.vel[2],wish[2],1-Math.exp(-dt*acc));
  if(keys.Space&&H.ground){H.vy=5.4;H.ground=false;tone(260,'sine',.12,.035,420);}
  H.vy-=16*dt;const np=[H.pos[0]+H.vel[0]*dt,H.pos[1]+H.vy*dt,H.pos[2]+H.vel[2]*dt];hallCollide(np);
  const g=groundAt(np[0],np[2]);
  if(np[1]<=g+.001){if(!H.ground&&H.vy<-4)noise(.08,.05,500,1,'lowpass',150);np[1]=g;H.vy=Math.max(0,H.vy);H.ground=true;}
  else if(H.ground&&np[1]-g<.45&&H.vy<=0){np[1]=g;H.vy=0;}else H.ground=false;
  if(np[1]>HALL_H-1.9){np[1]=HALL_H-1.9;if(H.vy>0)H.vy=0;}
  H.pos=np;const hs=Math.hypot(H.vel[0],H.vel[2]);
  if(H.ground&&hs>.5){H.phase+=dt*hs*2.2;const stp=Math.floor(H.phase/Math.PI);if(stp!==H.lastStep){H.lastStep=stp;noise(.05,.025,700,1,'lowpass',200);}}
  H.bob=H.ground?Math.sin(H.phase)*.035*Math.min(1,hs/4):0;
  G.interact=null;let bd=1e9;for(const a of DOOR_A){const d=Math.hypot(H.pos[0]-Math.cos(a)*(HALL_R-2),H.pos[2]-Math.sin(a)*(HALL_R-2));if(d<bd)bd=d;}
  if(bd<3.2)G.interact={kind:'board',text:'[F] BOARD YOUR SHIP & UNDOCK'};
  else if(Math.hypot(H.pos[0],H.pos[2]-31.6)<3)G.interact={kind:'dj',text:`[F] DJ BOOTH · LOUNGE FM ${settings.lounge?'OFF':'ON'}`};
  else if(Math.abs(H.pos[0])<9.6&&H.pos[2]>-27.1&&H.pos[2]<-24.6)G.interact={kind:'bar',text:'[F] ORDER A NEBULA FIZZ'};}
function hallInteract(){const it=G.interact;if(!it)return;if(it.kind==='board')undock();else if(it.kind==='dj'){settings.lounge=!settings.lounge;saveSettings();mus.lounge=settings.lounge;msg('Lounge FM '+(settings.lounge?'ON — vibes restored':'OFF'),'#ff9be8');SFX.ui();}else if(it.kind==='bar')myEmote('drink');}
function drawAvatar(u,feet,yaw,col,phase,mv,emo){let y=yaw,fp=feet;const em=emo&&emo.emoT>0?emo.emoK:null;
  if(em==='spin'){y+=(1-emo.emoT/2.2)*TAU*2;fp=vadd(feet,[0,Math.abs(Math.sin(G.t*9))*.3,0]);}
  const f=[Math.sin(y),0,Math.cos(y)],U=[0,1,0];const tint=[.3+col[0]*.7,.3+col[1]*.7,.3+col[2]*.7],emc=vscale(col,1.8);const body={pos:fp,f,u:U};
  setMeshU(u,modelMat(fp,f,U,1),tint,0,emc,1);drawMesh(MESH.astroBody);
  const limb=(piv,a,mesh)=>{const pv=localToWorld(body,piv);const uu=vsub(vscale(U,Math.cos(a)),vscale(f,Math.sin(a)));const ff=vadd(vscale(f,Math.cos(a)),vscale(U,Math.sin(a)));setMeshU(u,modelMat(pv,ff,uu,1),tint,0,emc,1);drawMesh(mesh);};
  const sw=Math.sin(phase)*.7*mv;limb([.13,.85,0],sw,MESH.astroLeg);limb([-.13,.85,0],-sw,MESH.astroLeg);
  let ar=-sw*.8,al=sw*.8;if(em==='wave')ar=2.7+Math.sin(G.t*11)*.35;if(em==='spin'){ar=2.4+Math.sin(G.t*9)*.4;al=2.4-Math.sin(G.t*9)*.4;}if(em==='drink')ar=1.4;if(em==='love')ar=al=1.6;if(em==='fire')ar=al=2.9;
  limb([.32,1.38,0],ar,MESH.astroArm);limb([-.32,1.38,0],al,MESH.astroArm);}
function enterHall(){const S=stats();G.state='hall';P.vel=[0,0,0];P.hull=S.maxHull;P.shield=S.maxShield;P.energy=S.maxEnergy;P.cruise=0;
  const out=G.dockTo.out;const a=Math.atan2(out[2],out[0]);HALL.pos=[Math.cos(a)*(HALL_R-3),0,Math.sin(a)*(HALL_R-3)];HALL.yaw=Math.atan2(-HALL.pos[0],-HALL.pos[2]);HALL.pitch=0;HALL.vel=[0,0,0];HALL.vy=0;HALL.ground=true;
  mus.lounge=!!settings.lounge;save();G.whiteFlash=.9;G.msgs=[];NET.sendT=0;mdx=mdy=0;for(const k in keys)keys[k]=false;
  msg('Welcome aboard Haven! Hull repaired, shields restored, game saved.','#ff9be8');msg('Walk with WASD · Enter to chat · Tab for the lounge menu','#d6c8f2');tone(523,'sine',.4,.05);tone(784,'sine',.5,.05,null,.15);}
function openHallMenu(){if(G.state!=='hall')return;G.state='hallmenu';releasePointer();for(const k in keys)keys[k]=false;$('lName').value=cleanName(settings.callsign);renderPaint();renderLog();renderPilots();updJuke();show('lounge');SFX.ui();}
function closeHallMenu(){if(G.state!=='hallmenu')return;hide('lounge');G.state='hall';lockPointer();}
// ----- lounge UI -----
function renderPaint(){const el=$('lPaint');el.innerHTML='';PAINT.forEach((c,i)=>{const d=document.createElement('div');d.className='sw'+(i===settings.paint?' on':'');d.style.background=css(c);
  d.onclick=()=>{settings.paint=i;saveSettings();renderPaint();NET.sendT=0;SFX.ui();};el.appendChild(d);});}
function renderPilots(){const el=$('lPilots');el.innerHTML='';const rows=[{name:cleanName(settings.callsign)+' (you)',c:settings.paint,st:'hall',s:G.prog.cur}];for(const Rm of NET.remotes.values())if(Rm.name)rows.push(Rm);
  for(const r of rows){const d=document.createElement('div');d.className='pilot';const i=document.createElement('i');i.style.background=css(PAINT[r.c]||PAINT[0]);const n=document.createElement('span');n.textContent=r.name;
    const st=document.createElement('span');st.className='st';st.textContent=stText(r);d.append(i,n,st);el.appendChild(d);}
  if(rows.length===1){const d=document.createElement('div');d.className='sub';d.style.fontSize='14px';d.style.marginTop='8px';d.textContent=NET.state==='online'?'No other pilots online right now. Share this game with friends to fly together!':'Offline mode: open this game on claude.ai while signed in to meet other pilots.';el.appendChild(d);}
  const n=rows.length;$('lNet').textContent=NET.state==='online'?`QUANTUM-LINKED ACROSS ALL SYSTEMS · ${n} PILOT${n>1?'S':''} ONLINE`:'OFFLINE · SOLO LOUNGE';}
function updJuke(){$('lJuke').textContent='♫ LOUNGE FM: '+(settings.lounge?'ON':'OFF');}
$('lUndock').onclick=undock;$('lBack').onclick=()=>closeHallMenu();
$('lJuke').onclick=()=>{settings.lounge=!settings.lounge;saveSettings();mus.lounge=settings.lounge;updJuke();SFX.ui();};
document.querySelectorAll('#lLeft [data-e]').forEach(b=>b.onclick=()=>myEmote(b.dataset.e));
$('lSend').onclick=()=>{sendChat($('lChat').value);$('lChat').value='';$('lChat').focus();};
$('lChat').addEventListener('keydown',e=>{if(e.key==='Enter'){sendChat(e.target.value);e.target.value='';}e.stopPropagation();});
const nameInput=e=>{settings.callsign=cleanName(e.target.value);saveSettings();NET.sendT=0;};
$('lName').addEventListener('change',e=>{nameInput(e);e.target.value=settings.callsign;renderPilots();});$('lName').addEventListener('keydown',e=>e.stopPropagation());
$('tName').value=settings.callsign;$('tName').addEventListener('input',nameInput);$('tName').addEventListener('keydown',e=>e.stopPropagation());
function openFlyChat(){for(const k in keys)keys[k]=false;mouseDown=false;$('flyChat').style.display='block';const i=$('fChat');i.value='';setTimeout(()=>i.focus(),0);}
function closeFlyChat(){$('flyChat').style.display='none';if(document.activeElement===$('fChat'))$('fChat').blur();}
$('fChat').addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'){sendChat(e.target.value);closeFlyChat();e.preventDefault();}else if(e.key==='Escape')closeFlyChat();});
$('fChat').addEventListener('blur',()=>{$('flyChat').style.display='none';});
saveSettings();updTitleNet();

// =====================================================================
//  BOOT
// =====================================================================
G.prog=newProgress();loadSystem(0,true);G.state='title';G.title=null;G.msgs=[];
P.pos=vadd(G.sys.hub,[-3000,900,2500]);P.f=vnorm(vsub(G.sys.planets[1].pos,P.pos));P.u=[0,1,0];orthonorm(P);
let last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;try{update(dt);render();}catch(e){console.error(e);}requestAnimationFrame(frame);}
requestAnimationFrame(frame);
</script>
</body>
</html>
