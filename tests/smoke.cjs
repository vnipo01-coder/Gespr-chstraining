"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const html=read("index.html"),css=read("styles.css"),data=read("data.js"),lexicon=read("lexicon-v2.js"),audio=read("audio-coach.js"),code=read("app.js");
for(const [file,source] of [["data.js",data],["lexicon-v2.js",lexicon],["audio-coach.js",audio],["app.js",code]])new vm.Script(source,{filename:file});
assert(html.includes('<html lang="de-CH">'));
const scripts=[...html.matchAll(/<script defer src="\.\/([^"]+\.js)"><\/script>/g)].map(x=>x[1]);
assert.deepEqual(scripts,["data.js","lexicon-v2.js","audio-coach.js","app.js"],"Deferred module order");
assert(css.includes("@media(max-width:740px)"),"Mobile layout missing");
assert(css.includes("prefers-reduced-motion:reduce"),"Reduced motion missing");
const windowMock={addEventListener(){},scrollTo(){},speechSynthesis:{cancel(){},speak(){}},confirm(){return false}};
const elements=new Map(),events={};
const element=id=>{if(!elements.has(id))elements.set(id,{id,innerHTML:"",textContent:"",value:"",dataset:{},className:"",style:{},classList:{add(){},remove(){},toggle(){return true}},addEventListener(t,fn){events[id+":"+t]=fn},setAttribute(){}});return elements.get(id)};
const documentMock={getElementById:element,querySelectorAll(){return []},addEventListener(t,fn){events["document:"+t]=fn},title:""};
const locationMock={hash:"#/start"},localStorageMock={getItem(){return null},setItem(){}};
const ctx=vm.createContext({window:windowMock,document:documentMock,location:locationMock,localStorage:localStorageMock,performance:{now(){return 0}},navigator:{},history:{},setInterval(){return 1},clearInterval(){},setTimeout(){return 1},clearTimeout(){},URL,URLSearchParams});
vm.runInContext(data,ctx,{filename:"data.js"});vm.runInContext(lexicon,ctx,{filename:"lexicon-v2.js"});vm.runInContext(audio,ctx,{filename:"audio-coach.js"});vm.runInContext(code,ctx,{filename:"app.js"});
const D=windowMock.LOGOS_DATA,T=windowMock.LOGOS_TEST;
assert.equal(D.lexicon.length,139,"V0.2 lexicon should have 139 curated entries");
assert.equal(windowMock.LOGOS_LEXICON_V2.added,121,"V0.2 should add 121 new entries");
assert.equal(new Set(D.lexicon.map(x=>x.id)).size,D.lexicon.length,"Lexicon IDs must be unique");
assert(D.drills.length>=8);
assert(D.meditations.length>=4);
assert.equal(D.chakras.length,7);
assert(D.layers.length===6);
assert(T.sourceCount>=20);
for(const [id,s] of Object.entries(D.sources)){assert(new URL(s.url).protocol==="https:","Invalid source URL: "+id)}
for(const item of D.lexicon){assert(item.parts.length>=1&&item.source.length>=1,"Incomplete lexicon "+item.id);item.source.forEach(s=>assert(D.sources[s],"Unknown source "+s))}
for(const d of D.drills){assert(d.text.length>=3,"Short script: "+d.id);assert(d.text.join(" ").split(/\s+/).length>75,"Short exercise: "+d.id);d.source.forEach(s=>assert(D.sources[s]))}
for(const [page,signature] of Object.entries({home:"constellation",language:"Morphemanalyse",studio:"reader-panel",coaching:"coach-detail",meditate:"breath-panel",chakraPage:"chakra-card",practice:"tracker",references:"source-card"})){
const value=T[page]();assert(value.includes(signature),"Page not rendering: "+page);assert(!value.includes("undefined"),"Unexpected undefined: "+page);
}
assert(T.language().includes('id="freeWord"')&&T.language().includes('id="discourseInput"'),"Free input laboratory absent");
assert(T.language().includes('id="lexArea"'),"Lexicon category selector absent");
assert(T.studio().includes('id="audioTimeline"'),"Local on-device audio timeline missing");
assert(T.studio().includes("keine Transkription"),"Local audio privacy boundary absent");
assert(!audio.includes("MediaRecorder")||audio.includes("NOT connected"),"Do not add recording to the local audio coach");
assert(T.studio().includes("Spracherkennung"),"Mic privacy disclosure missing");
assert(T.meditate().includes("Schwindel"),"Breathing safety guidance missing");
assert(T.chakraPage().includes("wissenschaftlicher"),"Chakra evidence boundary absent");
assert(T.references().includes("Wie werden Aussagen dargestellt?"),"Source explanation missing");
assert(typeof events["document:click"]==="function","Delegated interactivity missing");
console.log("LOGOS ATELIER smoke passed: 8 views, "+D.lexicon.length+" terms, "+D.drills.length+" speaking drills, "+D.chakras.length+" cultural symbols, "+T.sourceCount+" referenced sources.");
