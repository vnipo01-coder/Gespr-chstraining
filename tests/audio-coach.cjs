"use strict";
/* Isolierter Audio-Life-Cycle-Test ohne echten Mikrofonzugriff und ohne Netzwerk. */
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const code=fs.readFileSync(path.resolve(__dirname,"../audio-coach.js"),"utf8");
const clicks={},nodes=new Map();let now=0,micRequested=0,stoppedTracks=0,closedContexts=0;
let frameSeq=0;const frames=new Map();
const style={};
function element(id){if(!nodes.has(id))nodes.set(id,{id,disabled:false,textContent:"",innerHTML:"",dataset:{},style:{},width:720,height:110,addEventListener(type,cb){clicks[id+":"+type]=cb},getContext(){return{clearRect(){},fillRect(){},set fillStyle(x){}}}});return nodes.get(id)}
const doc={getElementById:element};
const sound={getTracks(){return[{stop(){stoppedTracks++}}]}};
class FakeContext{
 constructor(){this.destination={}}
 async resume(){}
 createMediaStreamSource(){return{connect(){},disconnect(){}}}
 createAnalyser(){return{fftSize:2048,smoothingTimeConstant:0,getFloatTimeDomainData(buffer){buffer.fill(now<1300?.002:((Math.floor(now/1000)%2===0)?.07:.001))},disconnect(){}}}
 async close(){closedContexts++}
}
const win={AudioContext:FakeContext,requestAnimationFrame(fn){const id=++frameSeq;frames.set(id,fn);return id},cancelAnimationFrame(id){frames.delete(id)}};
const navigatorMock={mediaDevices:{async getUserMedia(args){micRequested++;assert.equal(args.audio.echoCancellation,true);assert.equal(args.video,false);return sound}}};
vm.runInNewContext(code,{window:win,document:doc,navigator:navigatorMock,performance:{now(){return now}}},{filename:"audio-coach.js"});
const a=win.LOGOS_AUDIO_COACH;assert(a.render().includes("Keine Aufnahme"));assert(a.render().includes('id="audioStart"'));
assert.equal(a.stats().voiceMs,0);assert.equal(micRequested,0);
a.bind();assert.equal(typeof clicks["audioStart:click"],"function");assert.equal(typeof clicks["audioStop:click"],"function");
(async()=>{
 await clicks["audioStart:click"]();
 assert.equal(micRequested,1,"Microphone requested once and only after explicit click");
 assert.equal(stoppedTracks,0);
 assert.equal(element("audioStop").disabled,false);
 for(let t=100;t<=5400;t+=100){now=t;const f=[...frames.entries()][0];if(f){frames.delete(f[0]);f[1](t)}}
 assert(a.stats().observedMs>1000,"Audio samples should be measured without recording");
 assert(a.stats().voiceMs>0,"Simulated louder periods should be detected");
 assert(element("audioLevelFill").style.width!==undefined,"Signal meter should update");
 a.stop(true);
 assert.equal(stoppedTracks,1,"Microphone tracks must be stopped");
 assert.equal(element("audioStop").disabled,true);
 assert(element("audioFeedback").innerHTML.includes("Beobachtung beendet"));
 await Promise.resolve();await Promise.resolve();
 assert.equal(closedContexts,1,"Web Audio context must be closed");
 assert.equal(frames.size,0,"No animation frames remain");
 assert(a.render().includes("keine Transkription"));
 console.log("LOGOS ATELIER audio lifecycle passed: opt-in, local signal, visual feedback, track and context cleanup.");
})().catch(err=>{console.error(err);process.exitCode=1});
