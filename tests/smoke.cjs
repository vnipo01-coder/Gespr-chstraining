"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const root=path.resolve(__dirname,".."),read=p=>fs.readFileSync(path.join(root,p),"utf8");
const html=read("index.html"),css=read("styles.css"),data=read("data.js"),code=read("app.js");
new vm.Script(data,{filename:"data.js"});new vm.Script(code,{filename:"app.js"});
assert(html.includes('<html lang="de-CH">'));
assert(html.indexOf('src="./data.js"')<html.indexOf('src="./app.js"'));
assert(css.includes("@media(max-width:740px)"),"Mobile layout missing");
assert(css.includes("prefers-reduced-motion:reduce"),"Reduced motion missing");
const windowMock={addEventListener(){},scrollTo(){},speechSynthesis:{cancel(){},speak(){}},confirm(){return false}};
const elements=new Map(),events={};
const element=id=>{if(!elements.has(id))elements.set(id,{id,innerHTML:"",textContent:"",value:"",dataset:{},className:"",style:{},classList:{add(){},remove(){},toggle(){return true}},addEventListener(t,fn){events[id+":"+t]=fn},setAttribute(){}});return elements.get(id)};
const documentMock={getElementById:element,querySelectorAll(){return []},addEventListener(t,fn){events["document:"+t]=fn},title:""};
const locationMock={hash:"#/start"},localStorageMock={getItem(){return null},setItem(){}};
const ctx=vm.createContext({window:windowMock,document:documentMock,location:locationMock,localStorage:localStorageMock,performance:{now(){return 0}},history:{},setInterval(){return 1},clearInterval(){},setTimeout(){return 1},clearTimeout(){},URL,URLSearchParams});
vm.runInContext(data,ctx,{filename:"data.js"});vm.runInContext(code,ctx,{filename:"app.js"});
const D=windowMock.LOGOS_DATA,T=windowMock.LOGOS_TEST;
assert(D.lexicon.length>=18);
assert(D.drills.length>=8);
assert(D.meditations.length>=4);
assert.equal(D.chakras.length,7);
assert(D.layers.length===6);
assert(T.sourceCount>=10);
for(const [id,s] of Object.entries(D.sources)){assert(new URL(s.url).protocol==="https:","Invalid source URL: "+id)}
for(const item of D.lexicon){assert(item.parts.length>=1&&item.source.length>=1,"Incomplete lexicon "+item.id);item.source.forEach(s=>assert(D.sources[s],"Unknown source "+s))}
for(const d of D.drills){assert(d.text.length>=3,"Short script: "+d.id);assert(d.text.join(" ").split(/\s+/).length>75,"Short exercise: "+d.id);d.source.forEach(s=>assert(D.sources[s]))}
for(const [page,signature] of Object.entries({home:"constellation",language:"Morphemanalyse",studio:"reader-panel",coaching:"coach-detail",meditate:"breath-panel",chakraPage:"chakra-card",practice:"tracker",references:"source-card"})){
const value=T[page]();assert(value.includes(signature),"Page not rendering: "+page);assert(!value.includes("undefined"),"Unexpected undefined: "+page);
}
assert(T.language().includes('id="freeWord"')&&T.language().includes('id="discourseInput"'),"Free input laboratory absent");
assert(T.studio().includes("Spracherkennung"),"Mic privacy disclosure missing");
assert(T.meditate().includes("Schwindel"),"Breathing safety guidance missing");
assert(T.chakraPage().includes("wissenschaftlicher"),"Chakra evidence boundary absent");
assert(T.references().includes("Wie werden Aussagen dargestellt?"),"Source explanation missing");
assert(typeof events["document:click"]==="function","Delegated interactivity missing");
console.log("LOGOS ATELIER smoke passed: 8 views, "+D.lexicon.length+" terms, "+D.drills.length+" speaking drills, "+D.chakras.length+" cultural symbols, "+T.sourceCount+" referenced sources.");
