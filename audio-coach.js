/* LOGOS ATELIER 0.2 — lokale Audiopegel- und Pausenbeobachtung
 * Keine Audioaufnahme, kein Upload, keine Spracherkennung. Signalpegel ist keine Redequalitätsdiagnostik.
 */
window.LOGOS_AUDIO_COACH=(()=>{
"use strict";
const STATE={stream:null,ctx:null,analyser:null,source:null,raf:0,active:false,buffer:null,started:0,lastSample:0,lastVoice:0,voiceSegmentStart:0,pausedSince:0,voiceMs:0,observedMs:0,pauses:0,noise:0,threshold:.018,levels:[],calibration:[],error:""};
const $=id=>document.getElementById(id);
const sec=(x)=>Math.max(0,x/1000).toFixed(1);
const fmt=ms=>String(Math.floor(ms/60000)).padStart(2,"0")+":"+String(Math.floor(ms/1000)%60).padStart(2,"0");
const supported=()=>!!(navigator.mediaDevices?.getUserMedia&&(window.AudioContext||window.webkitAudioContext));
const render=()=>'<section class="local-audio" aria-labelledby="localAudioHeading"><div class="local-audio-header"><div><span class="eyebrow">AUDIO-REFLEXION / LOKAL IM BROWSER</span><h3 id="localAudioHeading">Dein Sprechverlauf</h3><p>Eine freiwillige Pegel- und Pausenbeobachtung beim lauten Lesen. Keine Aufnahme, keine Transkription, keine Weitergabe des Mikrofonsignals durch diese Funktion.</p></div><div class="local-audio-status" id="audioState" role="status" aria-live="polite">Bereit · Mikrofon nicht aktiv</div></div><div class="local-audio-controls"><button class="primary-btn" type="button" id="audioStart">◉ Lokale Analyse starten</button><button class="secondary-btn" type="button" id="audioStop" disabled>■ Beenden</button><span class="audio-privacy"><span aria-hidden="true">●</span> Nur Echtzeit-Messwerte im Arbeitsspeicher</span></div><div class="audio-live"><div class="audio-level"><span>Signalpegel</span><div class="audio-level-bg"><div id="audioLevelFill"></div></div><small id="audioLevelLabel">–</small></div><canvas id="audioTimeline" width="720" height="110" role="img" aria-label="Live-Verlauf des Schalldruckpegel-Ersatzwertes; keine Audioaufnahme"></canvas></div><div class="audio-metrics"><div><strong id="audioDuration">00:00</strong><span>Beobachtungszeit</span></div><div><strong id="audioVoiced">–</strong><span>lautere Signalphasen</span></div><div><strong id="audioPauses">–</strong><span>längere leisere Phasen*</span></div></div><div class="audio-feedback" id="audioFeedback" aria-live="polite"><b>So funktioniert es:</b> Bleibe nach dem Start etwa eine Sekunde still, damit sich der Pegelschwellwert an die Umgebung anpasst. Danach wird nur der momentane Signalpegel analysiert. Geräusche, Mikrofonabstand und Raumakustik beeinflussen die Anzeige. Eine leise Passage ist nicht automatisch eine Sprechpause.</div><p class="audio-disclaimer">*Heuristik: Der Algorithmus schätzt lautere und leisere Phasen anhand eines adaptiven Signalpegels. Die Werte unterscheiden Sprache nicht sicher von Umgebungsgeräuschen. Sie messen weder Selbstbewusstsein, rhetorische Qualität noch objektive Sprechgeschwindigkeit. Für Wörter pro Minute nutze separat und freiwillig die browserabhängige Spracherkennung.</p></section>';
function status(message,kind=""){const e=$("audioState");if(e){e.textContent=message;e.dataset.kind=kind}}
function draw(){
 const canvas=$("audioTimeline");if(!canvas||!canvas.getContext)return;
 const ctx=canvas.getContext("2d");const w=canvas.width,h=canvas.height;
 ctx.clearRect(0,0,w,h);ctx.fillStyle="#f4f5fb";ctx.fillRect(0,0,w,h);
 ctx.fillStyle="#dfe4f2";for(let j=1;j<4;j++)ctx.fillRect(0,Math.floor(h*j/4),w,1);
 const levels=STATE.levels.slice(-120);
 if(!levels.length)return;
 const bar=w/120;
 for(let i=0;i<levels.length;i++){const item=levels[i];const height=Math.max(2,Math.min(1,item.rms/.15)*(h-16));ctx.fillStyle=item.loud?"#7657c8":"#b4c3dd";ctx.fillRect(Math.floor((120-levels.length+i)*bar),Math.floor((h-height)/2),Math.max(2,bar-1),height)}
}
function update(){
 const duration=Math.max(0,performance.now()-STATE.started);
 const e=$("audioDuration"),v=$("audioVoiced"),p=$("audioPauses"),f=$("audioLevelFill"),l=$("audioLevelLabel");
 if(e)e.textContent=fmt(duration);
 if(v)v.textContent=STATE.observedMs>0?Math.round(STATE.voiceMs/STATE.observedMs*100)+" %":"–";
 if(p)p.textContent=STATE.observedMs>0?String(STATE.pauses):"–";
 const latest=STATE.levels.at(-1);
 if(f)f.style.width=Math.min(100,Math.round((latest?.rms||0)/.16*100))+"%";
 if(l)l.textContent=latest?latest.loud?"Deutliches Signal":"Leises Signal":"–";
 draw();
}
function sample(t){
 if(!STATE.active||!STATE.analyser)return;
 const samples=STATE.buffer;STATE.analyser.getFloatTimeDomainData(samples);
 let sq=0;for(let i=0;i<samples.length;i++){const v=samples[i];sq+=v*v}
 const rms=Math.sqrt(sq/samples.length);
 const elapsed=t-STATE.started,delta=Math.max(0,Math.min(150,t-(STATE.lastSample||t)));
 if(elapsed<1200){STATE.calibration.push(rms);STATE.noise=STATE.calibration.reduce((a,b)=>a+b,0)/STATE.calibration.length;STATE.threshold=Math.max(.018,STATE.noise*2.8)}
 const loud=elapsed>=1200&&rms>STATE.threshold;
 if(elapsed>=1200){
  STATE.observedMs+=delta;
  if(loud){
   STATE.voiceMs+=delta;
   if(!STATE.voiceSegmentStart)STATE.voiceSegmentStart=t;
   // A previously sustained voice phase ended, then a quiet interval >= 650 ms: one approximate pause.
   if(STATE.pausedSince&&t-STATE.pausedSince>=650&&STATE.lastVoice-STATE.voiceSegmentStart>=450){STATE.pauses++}
   STATE.pausedSince=0;
   STATE.lastVoice=t;
  }else if(!STATE.pausedSince){STATE.pausedSince=t}
 }
 if(t-STATE.lastSample>=90){
  STATE.levels.push({rms,loud});
  if(STATE.levels.length>120)STATE.levels.shift();
  STATE.lastSample=t;update();
 }
 STATE.raf=window.requestAnimationFrame(sample);
}
function closeResources(){
 STATE.active=false;
 if(STATE.raf){window.cancelAnimationFrame(STATE.raf);STATE.raf=0}
 if(STATE.stream){for(const track of STATE.stream.getTracks())track.stop();STATE.stream=null}
 try{STATE.source?.disconnect()}catch(e){}
 try{STATE.analyser?.disconnect()}catch(e){}
 const c=STATE.ctx;STATE.ctx=null;if(c)try{const r=c.close();if(r?.catch)r.catch(()=>{})}catch(e){}
 STATE.analyser=null;STATE.source=null;STATE.buffer=null;
 const start=$("audioStart"),end=$("audioStop");if(start)start.disabled=false;if(end)end.disabled=true;
}
function feedback(){
 const box=$("audioFeedback");if(!box)return;
 const dur=performance.now()-STATE.started;
 if(dur<4000){box.innerHTML="<b>Sehr kurze Messung.</b> Sprich für eine längere Beobachtung mindestens einige vollständige Sätze.";return}
 const percent=STATE.observedMs?Math.round(STATE.voiceMs/STATE.observedMs*100):0;
 const note=STATE.pauses===0?"Es wurden keine längeren leisen Abschnitte erkannt. Prüfe selbst, ob deine Sätze genügend Raum erhalten haben.":"Es wurden "+STATE.pauses+" längere leisere Abschnitte erkannt. Prüfe, ob sie zu deinen Gedankenübergängen passen.";
 box.innerHTML="<b>Beobachtung beendet.</b> Während "+sec(dur)+" Sekunden lagen ungefähr "+percent+" % der ausgewerteten Zeit über dem adaptiven Pegelschwellwert. "+note+" Die Auswertung enthält keine Bewertung deiner Persönlichkeit und kann Umgebungsgeräusche nicht zuverlässig ausschliessen.";
}
function stop(showFeedback=true){
 if(!STATE.active&&!STATE.stream)return;
 if(showFeedback)feedback();
 closeResources();
 status("Mikrofon ausgeschaltet · keine Aufzeichnung", "");
}
async function start(){
 if(STATE.active)return;
 if(!supported()){status("Lokale Mikrofonanalyse wird von diesem Browser nicht unterstützt.","error");return}
 const startBtn=$("audioStart");if(startBtn)startBtn.disabled=true;
 status("Mikrofonberechtigung wird angefragt …");
 let stream,ctx;
 try{
  stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:false},video:false});
  // Navigation may have changed while awaiting permission: avoid starting outside the studio.
  if(!$("audioTimeline")){stream.getTracks().forEach(track=>track.stop());return}
  const C=window.AudioContext||window.webkitAudioContext;ctx=new C();await ctx.resume();
  if(!$("audioTimeline")){stream.getTracks().forEach(track=>track.stop());await ctx.close();return}
  const source=ctx.createMediaStreamSource(stream),analyser=ctx.createAnalyser();
  analyser.fftSize=2048;analyser.smoothingTimeConstant=.25;source.connect(analyser);
  // Intentionally NOT connected to audio output, remote service or MediaRecorder.
  Object.assign(STATE,{stream,ctx,source,analyser,buffer:new Float32Array(analyser.fftSize),active:true,started:performance.now(),lastSample:0,lastVoice:0,voiceSegmentStart:0,pausedSince:0,voiceMs:0,observedMs:0,pauses:0,noise:0,threshold:.018,levels:[],calibration:[]});
  const end=$("audioStop");if(end)end.disabled=false;
  status("Mikrofon aktiv · zuerst etwa eine Sekunde ruhig bleiben, dann sprechen","active");
  STATE.raf=window.requestAnimationFrame(sample);
 }catch(err){
  if(stream)stream.getTracks().forEach(track=>track.stop());
  if(ctx)try{await ctx.close()}catch(e){}
  if(startBtn)startBtn.disabled=false;
  status("Kein Mikrofonzugriff: "+(err?.name||"nicht verfügbar"),"error");
 }
}
function bind(){
 const startBtn=$("audioStart"),stopBtn=$("audioStop");
 if(!startBtn||!stopBtn)return;
 startBtn.addEventListener("click",start);
 stopBtn.addEventListener("click",()=>stop(true));
 draw();
}
return{render,bind,stop,stats:()=>({durationMs:STATE.active?performance.now()-STATE.started:0,voiceMs:STATE.voiceMs,observedMs:STATE.observedMs,pauses:STATE.pauses,calibrationMs:1200}),supported};
})();