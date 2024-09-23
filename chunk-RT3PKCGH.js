import{d as he,j as de,u as ue}from"./chunk-AXSW6VG5.js";import{Fa as ae,H,Ha as ce,K as ee,Pa as le,Q as ne,Z as re,a as Z,ba as te,da as I,ga as A,h as V,ia as v,ja as g,k as X,q as Q,r as J,ra as se,ta as oe,ua as ie,x as k}from"./chunk-7CVD3CZV.js";var L=class{},B=class{},w=class r{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(t=>{let n=t.indexOf(":");if(n>0){let s=t.slice(0,n),o=s.toLowerCase(),a=t.slice(n+1).trim();this.maybeSetNormalizedName(s,o),this.headers.has(o)?this.headers.get(o).push(a):this.headers.set(o,[a])}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((t,n)=>{this.setHeaderEntries(n,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([t,n])=>{this.setHeaderEntries(t,n)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof r?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(t=>{this.headers.set(t,e.headers.get(t)),this.normalizedNames.set(t,e.normalizedNames.get(t))})}clone(e){let t=new r;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof r?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){let t=e.name.toLowerCase();switch(e.op){case"a":case"s":let n=e.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(e.name,t);let s=(e.op==="a"?this.headers.get(t):void 0)||[];s.push(...n),this.headers.set(t,s);break;case"d":let o=e.value;if(!o)this.headers.delete(t),this.normalizedNames.delete(t);else{let a=this.headers.get(t);if(!a)return;a=a.filter(i=>o.indexOf(i)===-1),a.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,a)}break}}setHeaderEntries(e,t){let n=(Array.isArray(t)?t:[t]).map(o=>o.toString()),s=e.toLowerCase();this.headers.set(s,n),this.maybeSetNormalizedName(e,s)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}};var G=class{encodeKey(e){return fe(e)}encodeValue(e){return fe(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function be(r,e){let t=new Map;return r.length>0&&r.replace(/^\?/,"").split("&").forEach(s=>{let o=s.indexOf("="),[a,i]=o==-1?[e.decodeKey(s),""]:[e.decodeKey(s.slice(0,o)),e.decodeValue(s.slice(o+1))],d=t.get(a)||[];d.push(i),t.set(a,d)}),t}var Pe=/%(\d[a-f0-9])/gi,Ne={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function fe(r){return encodeURIComponent(r).replace(Pe,(e,t)=>Ne[t]??e)}function _(r){return`${r}`}var b=class r{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new G,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=be(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{let n=e.fromObject[t],s=Array.isArray(n)?n.map(_):[_(n)];this.map.set(t,s)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){let t=[];return Object.keys(e).forEach(n=>{let s=e[n];Array.isArray(s)?s.forEach(o=>{t.push({param:n,value:o,op:"a"})}):t.push({param:n,value:s,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let t=this.encoder.encodeKey(e);return this.map.get(e).map(n=>t+"="+this.encoder.encodeValue(n)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let t=new r({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let t=(e.op==="a"?this.map.get(e.param):void 0)||[];t.push(_(e.value)),this.map.set(e.param,t);break;case"d":if(e.value!==void 0){let n=this.map.get(e.param)||[],s=n.indexOf(_(e.value));s!==-1&&n.splice(s,1),n.length>0?this.map.set(e.param,n):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var W=class{constructor(){this.map=new Map}set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function Ae(r){switch(r){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function pe(r){return typeof ArrayBuffer<"u"&&r instanceof ArrayBuffer}function ye(r){return typeof Blob<"u"&&r instanceof Blob}function me(r){return typeof FormData<"u"&&r instanceof FormData}function Oe(r){return typeof URLSearchParams<"u"&&r instanceof URLSearchParams}var F=class r{constructor(e,t,n,s){this.url=t,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase();let o;if(Ae(this.method)||s?(this.body=n!==void 0?n:null,o=s):o=n,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new w,this.context??=new W,!this.params)this.params=new b,this.urlWithParams=t;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=t;else{let i=t.indexOf("?"),d=i===-1?"?":i<t.length-1?"&":"";this.urlWithParams=t+d+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||pe(this.body)||ye(this.body)||me(this.body)||Oe(this.body)?this.body:this.body instanceof b?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||me(this.body)?null:ye(this.body)?this.body.type||null:pe(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof b?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(e={}){let t=e.method||this.method,n=e.url||this.url,s=e.responseType||this.responseType,o=e.transferCache??this.transferCache,a=e.body!==void 0?e.body:this.body,i=e.withCredentials??this.withCredentials,d=e.reportProgress??this.reportProgress,c=e.headers||this.headers,f=e.params||this.params,m=e.context??this.context;return e.setHeaders!==void 0&&(c=Object.keys(e.setHeaders).reduce((p,T)=>p.set(T,e.setHeaders[T]),c)),e.setParams&&(f=Object.keys(e.setParams).reduce((p,T)=>p.set(T,e.setParams[T]),f)),new r(t,n,a,{params:f,headers:c,context:m,reportProgress:d,responseType:s,withCredentials:i,transferCache:o})}},P=function(r){return r[r.Sent=0]="Sent",r[r.UploadProgress=1]="UploadProgress",r[r.ResponseHeader=2]="ResponseHeader",r[r.DownloadProgress=3]="DownloadProgress",r[r.Response=4]="Response",r[r.User=5]="User",r}(P||{}),j=class{constructor(e,t=200,n="OK"){this.headers=e.headers||new w,this.status=e.status!==void 0?e.status:t,this.statusText=e.statusText||n,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}},z=class r extends j{constructor(e={}){super(e),this.type=P.ResponseHeader}clone(e={}){return new r({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},U=class r extends j{constructor(e={}){super(e),this.type=P.Response,this.body=e.body!==void 0?e.body:null}clone(e={}){return new r({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},R=class extends j{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},Ee=200,Ie=204;function $(r,e){return{body:e,headers:r.headers,context:r.context,observe:r.observe,params:r.params,reportProgress:r.reportProgress,responseType:r.responseType,withCredentials:r.withCredentials,transferCache:r.transferCache}}var Me=(()=>{let e=class e{constructor(n){this.handler=n}request(n,s,o={}){let a;if(n instanceof F)a=n;else{let c;o.headers instanceof w?c=o.headers:c=new w(o.headers);let f;o.params&&(o.params instanceof b?f=o.params:f=new b({fromObject:o.params})),a=new F(n,s,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:f,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache})}let i=J(a).pipe(ee(c=>this.handler.handle(c)));if(n instanceof F||o.observe==="events")return i;let d=i.pipe(H(c=>c instanceof U));switch(o.observe||"body"){case"body":switch(a.responseType){case"arraybuffer":return d.pipe(k(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return d.pipe(k(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return d.pipe(k(c=>{if(c.body!==null&&typeof c.body!="string")throw new Error("Response is not a string.");return c.body}));case"json":default:return d.pipe(k(c=>c.body))}case"response":return d;default:throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)}}delete(n,s={}){return this.request("DELETE",n,s)}get(n,s={}){return this.request("GET",n,s)}head(n,s={}){return this.request("HEAD",n,s)}jsonp(n,s){return this.request("JSONP",n,{params:new b().append(s,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(n,s={}){return this.request("OPTIONS",n,s)}patch(n,s,o={}){return this.request("PATCH",n,$(o,s))}post(n,s,o={}){return this.request("POST",n,$(o,s))}put(n,s,o={}){return this.request("PUT",n,$(o,s))}};e.\u0275fac=function(s){return new(s||e)(v(L))},e.\u0275prov=I({token:e,factory:e.\u0275fac});let r=e;return r})(),De=/^\)\]\}',?\n/,xe="X-Request-URL";function ge(r){if(r.url)return r.url;let e=xe.toLocaleLowerCase();return r.headers.get(e)}var ke=(()=>{let e=class e{constructor(){this.fetchImpl=g(C,{optional:!0})?.fetch??((...n)=>globalThis.fetch(...n)),this.ngZone=g(ce)}handle(n){return new X(s=>{let o=new AbortController;return this.doRequest(n,o.signal,s).then(K,a=>s.error(new R({error:a}))),()=>o.abort()})}doRequest(n,s,o){return V(this,null,function*(){let a=this.createRequestInit(n),i;try{let y=this.ngZone.runOutsideAngular(()=>this.fetchImpl(n.urlWithParams,Z({signal:s},a)));Fe(y),o.next({type:P.Sent}),i=yield y}catch(y){o.error(new R({error:y,status:y.status??0,statusText:y.statusText,url:n.urlWithParams,headers:y.headers}));return}let d=new w(i.headers),c=i.statusText,f=ge(i)??n.urlWithParams,m=i.status,p=null;if(n.reportProgress&&o.next(new z({headers:d,status:m,statusText:c,url:f})),i.body){let y=i.headers.get("content-length"),M=[],l=i.body.getReader(),h=0,E,O,u=typeof Zone<"u"&&Zone.current;yield this.ngZone.runOutsideAngular(()=>V(this,null,function*(){for(;;){let{done:N,value:x}=yield l.read();if(N)break;if(M.push(x),h+=x.length,n.reportProgress){O=n.responseType==="text"?(O??"")+(E??=new TextDecoder).decode(x,{stream:!0}):void 0;let Y=()=>o.next({type:P.DownloadProgress,total:y?+y:void 0,loaded:h,partialText:O});u?u.run(Y):Y()}}}));let D=this.concatChunks(M,h);try{let N=i.headers.get("Content-Type")??"";p=this.parseBody(n,D,N)}catch(N){o.error(new R({error:N,headers:new w(i.headers),status:i.status,statusText:i.statusText,url:ge(i)??n.urlWithParams}));return}}m===0&&(m=p?Ee:0),m>=200&&m<300?(o.next(new U({body:p,headers:d,status:m,statusText:c,url:f})),o.complete()):o.error(new R({error:p,headers:d,status:m,statusText:c,url:f}))})}parseBody(n,s,o){switch(n.responseType){case"json":let a=new TextDecoder().decode(s).replace(De,"");return a===""?null:JSON.parse(a);case"text":return new TextDecoder().decode(s);case"blob":return new Blob([s],{type:o});case"arraybuffer":return s.buffer}}createRequestInit(n){let s={},o=n.withCredentials?"include":void 0;if(n.headers.forEach((a,i)=>s[a]=i.join(",")),n.headers.has("Accept")||(s.Accept="application/json, text/plain, */*"),!n.headers.has("Content-Type")){let a=n.detectContentTypeHeader();a!==null&&(s["Content-Type"]=a)}return{body:n.serializeBody(),method:n.method,headers:s,credentials:o}}concatChunks(n,s){let o=new Uint8Array(s),a=0;for(let i of n)o.set(i,a),a+=i.length;return o}};e.\u0275fac=function(s){return new(s||e)},e.\u0275prov=I({token:e,factory:e.\u0275fac});let r=e;return r})(),C=class{};function K(){}function Fe(r){r.then(K,K)}function Le(r,e){return e(r)}function je(r,e,t){return(n,s)=>ie(t,()=>e(n,o=>r(o,s)))}var q=new A(""),Ue=new A(""),_e=new A("",{providedIn:"root",factory:()=>!0});var Te=(()=>{let e=class e extends L{constructor(n,s){super(),this.backend=n,this.injector=s,this.chain=null,this.pendingTasks=g(ae),this.contributeToStability=g(_e)}handle(n){if(this.chain===null){let s=Array.from(new Set([...this.injector.get(q),...this.injector.get(Ue,[])]));this.chain=s.reduceRight((o,a)=>je(o,a,this.injector),Le)}if(this.contributeToStability){let s=this.pendingTasks.add();return this.chain(n,o=>this.backend.handle(o)).pipe(ne(()=>this.pendingTasks.remove(s)))}else return this.chain(n,s=>this.backend.handle(s))}};e.\u0275fac=function(s){return new(s||e)(v(B),v(oe))},e.\u0275prov=I({token:e,factory:e.\u0275fac});let r=e;return r})();var Be=/^\)\]\}',?\n/;function ze(r){return"responseURL"in r&&r.responseURL?r.responseURL:/^X-Request-URL:/m.test(r.getAllResponseHeaders())?r.getResponseHeader("X-Request-URL"):null}var we=(()=>{let e=class e{constructor(n){this.xhrFactory=n}handle(n){if(n.method==="JSONP")throw new te(-2800,!1);let s=this.xhrFactory;return(s.\u0275loadImpl?Q(s.\u0275loadImpl()):J(null)).pipe(re(()=>new X(a=>{let i=s.build();if(i.open(n.method,n.urlWithParams),n.withCredentials&&(i.withCredentials=!0),n.headers.forEach((l,h)=>i.setRequestHeader(l,h.join(","))),n.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!n.headers.has("Content-Type")){let l=n.detectContentTypeHeader();l!==null&&i.setRequestHeader("Content-Type",l)}if(n.responseType){let l=n.responseType.toLowerCase();i.responseType=l!=="json"?l:"text"}let d=n.serializeBody(),c=null,f=()=>{if(c!==null)return c;let l=i.statusText||"OK",h=new w(i.getAllResponseHeaders()),E=ze(i)||n.url;return c=new z({headers:h,status:i.status,statusText:l,url:E}),c},m=()=>{let{headers:l,status:h,statusText:E,url:O}=f(),u=null;h!==Ie&&(u=typeof i.response>"u"?i.responseText:i.response),h===0&&(h=u?Ee:0);let D=h>=200&&h<300;if(n.responseType==="json"&&typeof u=="string"){let N=u;u=u.replace(Be,"");try{u=u!==""?JSON.parse(u):null}catch(x){u=N,D&&(D=!1,u={error:x,text:u})}}D?(a.next(new U({body:u,headers:l,status:h,statusText:E,url:O||void 0})),a.complete()):a.error(new R({error:u,headers:l,status:h,statusText:E,url:O||void 0}))},p=l=>{let{url:h}=f(),E=new R({error:l,status:i.status||0,statusText:i.statusText||"Unknown Error",url:h||void 0});a.error(E)},T=!1,y=l=>{T||(a.next(f()),T=!0);let h={type:P.DownloadProgress,loaded:l.loaded};l.lengthComputable&&(h.total=l.total),n.responseType==="text"&&i.responseText&&(h.partialText=i.responseText),a.next(h)},M=l=>{let h={type:P.UploadProgress,loaded:l.loaded};l.lengthComputable&&(h.total=l.total),a.next(h)};return i.addEventListener("load",m),i.addEventListener("error",p),i.addEventListener("timeout",p),i.addEventListener("abort",p),n.reportProgress&&(i.addEventListener("progress",y),d!==null&&i.upload&&i.upload.addEventListener("progress",M)),i.send(d),a.next({type:P.Sent}),()=>{i.removeEventListener("error",p),i.removeEventListener("abort",p),i.removeEventListener("load",m),i.removeEventListener("timeout",p),n.reportProgress&&(i.removeEventListener("progress",y),d!==null&&i.upload&&i.upload.removeEventListener("progress",M)),i.readyState!==i.DONE&&i.abort()}})))}};e.\u0275fac=function(s){return new(s||e)(v(ue))},e.\u0275prov=I({token:e,factory:e.\u0275fac});let r=e;return r})(),ve=new A(""),Se="XSRF-TOKEN",Ve=new A("",{providedIn:"root",factory:()=>Se}),Xe="X-XSRF-TOKEN",Je=new A("",{providedIn:"root",factory:()=>Xe}),S=class{},$e=(()=>{let e=class e{constructor(n,s,o){this.doc=n,this.platform=s,this.cookieName=o,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let n=this.doc.cookie||"";return n!==this.lastCookieString&&(this.parseCount++,this.lastToken=de(n,this.cookieName),this.lastCookieString=n),this.lastToken}};e.\u0275fac=function(s){return new(s||e)(v(he),v(le),v(Ve))},e.\u0275prov=I({token:e,factory:e.\u0275fac});let r=e;return r})();function Ge(r,e){let t=r.url.toLowerCase();if(!g(ve)||r.method==="GET"||r.method==="HEAD"||t.startsWith("http://")||t.startsWith("https://"))return e(r);let n=g(S).getToken(),s=g(Je);return n!=null&&!r.headers.has(s)&&(r=r.clone({headers:r.headers.set(s,n)})),e(r)}var Re=function(r){return r[r.Interceptors=0]="Interceptors",r[r.LegacyInterceptors=1]="LegacyInterceptors",r[r.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",r[r.NoXsrfProtection=3]="NoXsrfProtection",r[r.JsonpSupport=4]="JsonpSupport",r[r.RequestsMadeViaParent=5]="RequestsMadeViaParent",r[r.Fetch=6]="Fetch",r}(Re||{});function We(r,e){return{\u0275kind:r,\u0275providers:e}}function gn(...r){let e=[Me,we,Te,{provide:L,useExisting:Te},{provide:B,useFactory:()=>g(ke,{optional:!0})??g(we)},{provide:q,useValue:Ge,multi:!0},{provide:ve,useValue:!0},{provide:S,useClass:$e}];for(let t of r)e.push(...t.\u0275providers);return se(e)}function Tn(r){return We(Re.Interceptors,r.map(e=>({provide:q,useValue:e,multi:!0})))}export{b as a,R as b,Me as c,gn as d,Tn as e};
//# sourceMappingURL=chunk-RT3PKCGH.js.map
