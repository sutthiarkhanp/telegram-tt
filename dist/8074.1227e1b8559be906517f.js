(()=>{"use strict";var e,t,r={88074:(e,t,r)=>{var i=r(87784),o=r(49357);let s;importScripts(new URL(r(25404),r.b));const a=new Promise((e=>{Module.onRuntimeInitialized=()=>{s={init:Module.cwrap("lottie_init","",[]),destroy:Module.cwrap("lottie_destroy","",["number"]),resize:Module.cwrap("lottie_resize","",["number","number","number"]),buffer:Module.cwrap("lottie_buffer","number",["number"]),render:Module.cwrap("lottie_render","",["number","number"]),loadFromData:Module.cwrap("lottie_load_from_data","number",["number","number"])},e()}})),n=new Map;async function l(e){const t=await fetch(e),r=t.headers.get("Content-Type");if(r?.startsWith("text/"))return t.text();const o=await t.arrayBuffer();return(0,i.inflate)(o,{to:"string"})}function c(e,t,r){const i=t?30:60,o=JSON.parse(e).fr||i,s=o%i==0?o/i:1;return{reduceFactor:s,msPerFrame:1e3/(o/s),reducedFramesCount:Math.ceil(r/s)}}const d={"rlottie:init":async function(e,t,r,i,o,d){s||await a;const u=await l(t),f=allocate(intArrayFromString(u),"i8",0),h=s.init(),m=s.loadFromData(h,f);s.resize(h,r,r);const p=new ImageData(r,r),{reduceFactor:v,msPerFrame:y,reducedFramesCount:g}=c(u,i,m);n.set(e,{imgSize:r,reduceFactor:v,handle:h,imageData:p,customColor:o}),d(v,y,g)},"rlottie:changeData":async function(e,t,r,i){s||await a;const o=await l(t),d=allocate(intArrayFromString(o),"i8",0),{handle:u}=n.get(e),f=s.loadFromData(u,d),{reduceFactor:h,msPerFrame:m,reducedFramesCount:p}=c(o,r,f);i(h,m,p)},"rlottie:renderFrames":async function(e,t,r){s||await a;const{imgSize:i,reduceFactor:o,handle:l,imageData:c,customColor:d}=n.get(e),u=t*o;s.render(l,u);const f=s.buffer(l),h=Module.HEAPU8.subarray(f,f+i*i*4);if(d){const e=new Uint8ClampedArray(h);!function(e,t){for(let r=0;r<e.length;r+=4)e[r]=t[0],e[r+1]=t[1],e[r+2]=t[2]}(e,d),c.data.set(e)}else c.data.set(h);r(t,await createImageBitmap(c))},"rlottie:destroy":function e(t){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{const e=n.get(t);s.destroy(e.handle),n.delete(t)}catch(i){r||setTimeout((()=>e(t,!0)),1e3)}}};(0,o.C)(d);var u=r(65905);const f=new Map;function h(e,t,r){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?i:i+"")in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}self.addEventListener("message",(e=>{const{type:t,messageId:r,result:i}=e.data;if("partResponse"===t){const e=f.get(r);e&&e.resolve(i)}}));const m=1024;var p=function(e){return e.loading="loading",e.ready="ready",e.closed="closed",e}(p||{});class v{constructor(e,t){let{onConfig:r,onChunk:i,stepOffset:o,stepMultiplier:s,isPolyfill:a,maxFrames:n}=t;h(this,"url",void 0),h(this,"file",void 0),h(this,"status",p.loading),h(this,"stepOffset",void 0),h(this,"stepMultiplier",void 0),h(this,"maxFrames",void 0),h(this,"isPolyfill",void 0),h(this,"decodedSamples",new Set),h(this,"lastSample",0),h(this,"onConfig",void 0),h(this,"onChunk",void 0),this.url=e,this.stepOffset=o,this.stepMultiplier=s,this.maxFrames=n,this.isPolyfill=a,this.onConfig=r,this.onChunk=i,this.file=u.createFile(),this.file.onError=e=>{console.error(e)},this.file.onReady=this.onReady.bind(this),this.file.onSamples=this.onSamples.bind(this),this.loadMetadata()}async loadMetadata(){let e=0;for(;void 0!==e;){try{e=await this.requestPart(e,131072)}catch(e){console.error(e)}if(this.status===p.ready)break}}async loadNextFrames(e,t,r){let i=e*this.stepOffset,o=0,s=this.file.seek(i,!0);for(;this.status!==p.closed;)try{if(await this.requestPart(s.offset,r),i>t)break;this.lastSample>1&&o<this.lastSample&&(i+=e*this.stepMultiplier,o=this.lastSample),s=this.file.seek(i,!0)}catch(e){console.error(e)}this.file.flush()}async requestPart(e,t){let r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];const i=e%m,o=e-i,s=o+t-1;let a=await function(e){const t=Date.now().toString(36)+Math.random().toString(36).slice(2),r={};let i=!1;const o=Promise.race([new Promise((e=>{setTimeout((()=>e()),3e4)})).then((()=>i?void 0:Promise.reject(new Error("ERROR_PART_TIMEOUT")))),new Promise(((e,t)=>{Object.assign(r,{resolve:e,reject:t})}))]);return f.set(t,r),o.catch((()=>{})).finally((()=>{f.delete(t),i=!0})),postMessage({type:"requestPart",messageId:t,params:e}),o}({url:this.url,start:o,end:s});if(!a)return;i&&(a=a.slice(i)),a.fileStart=e;const n=this.file.appendBuffer(a);return r?n:e+a.byteLength}description(e){const t=this.file.getTrackById(e.id);for(const e of t.mdia.minf.stbl.stsd.entries)if(e.avcC||e.hvcC||e.av1C){const t=new u.DataStream(void 0,0,u.DataStream.BIG_ENDIAN);return e.avcC?e.avcC.write(t):e.hvcC?e.hvcC.write(t):e.av1C&&e.av1C.write(t),new Uint8Array(t.buffer,8)}throw new Error("avcC, hvcC ro av1C not found")}onReady(e){const t=e.videoTracks[0];let r=t.codec;r.startsWith("avc1")&&(r="avc1.4d001f"),this.onConfig({codec:r,codedHeight:t.video.height,codedWidth:t.video.width,description:this.description(t)});const i=e.duration/e.timescale,o=this.isPolyfill?24:12,s=(a=t.bitrate/o)+m-a%m;var a;const n=function(e,t){return Math.round((e+t)/t)}(i,this.maxFrames);this.file.setExtractionOptions(t.id,void 0,{nbSamples:1}),this.file.start(),this.status=p.ready,this.loadNextFrames(n,i,s)}onSamples(e,t,r){if(this.status===p.ready)for(const t of r){const r=t.cts/t.timescale,i=t.is_sync?"key":"delta",o=`${i}${t.number}`;this.decodedSamples.has(o)||(this.onChunk(new EncodedVideoChunk({type:i,timestamp:1e6*r,duration:1e6*t.duration/t.timescale,data:t.data})),this.decodedSamples.add(o),this.lastSample=parseInt(t.number,10),t.is_sync&&this.file.releaseUsedSamples(e,t.number))}}close(){this.file.flush(),this.file.stop(),this.status=p.closed}}let y,g,w;const b={"video-preview:init":function(e,t,r,i,o){const s="VideoDecoder"in globalThis;if(!s)return console.log("[Video Preview] WebCodecs not supported"),new Promise((e=>{w=e}));const a=new Set;return y=new VideoDecoder({async output(e){const t=e.timestamp/1e6,r=Math.floor(t);if(!a.has(r)){const t=await createImageBitmap(e);a.add(r),o(r,t)}e.close()},error(e){console.error("[Video Preview] error",e)}}),g=new v(e,{stepOffset:r,stepMultiplier:i,isPolyfill:!s,maxFrames:t,onConfig(e){y?.configure(e)},onChunk(e){"configured"===y?.state&&y?.decode(e)}}),new Promise((e=>{w=e}))},"video-preview:destroy":function(){try{y?.close(),g?.close()}catch{}y=void 0,g=void 0,w?.()}};(0,o.C)(b)},25404:(e,t,r)=>{e.exports=r.p+"rlottie-wasm.f013598f1b2ba719f25e.js"}},i={};function o(e){var t=i[e];if(void 0!==t)return t.exports;var s=i[e]={exports:{}};return r[e].call(s.exports,s,s.exports,o),s.exports}o.m=r,o.x=()=>{var e=o.O(void 0,[7784,5905,9357],(()=>o(88074)));return o.O(e)},e=[],o.O=(t,r,i,s)=>{if(!r){var a=1/0;for(d=0;d<e.length;d++){for(var[r,i,s]=e[d],n=!0,l=0;l<r.length;l++)(!1&s||a>=s)&&Object.keys(o.O).every((e=>o.O[e](r[l])))?r.splice(l--,1):(n=!1,s<a&&(a=s));if(n){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[r,i,s]},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,r)=>(o.f[r](e,t),t)),[])),o.u=e=>e+"."+{5905:"efaeccc9ed0bc890f551",7784:"4e167a928464165e6412",9357:"2e4b24d012475d2d29de"}[e]+".js",o.miniCssF=e=>{},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var i=r.length-1;i>-1&&(!e||!/^http(s?):/.test(e));)e=r[i--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{o.b=self.location+"";var e={8074:1};o.f.i=(t,r)=>{e[t]||importScripts(o.p+o.u(t))};var t=self.webpackChunktelegram_t=self.webpackChunktelegram_t||[],r=t.push.bind(t);t.push=t=>{var[i,s,a]=t;for(var n in s)o.o(s,n)&&(o.m[n]=s[n]);for(a&&a(o);i.length;)e[i.pop()]=1;r(t)}})(),t=o.x,o.x=()=>Promise.all([7784,5905,9357].map(o.e,o)).then(t),o.x()})();
//# sourceMappingURL=8074.1227e1b8559be906517f.js.map