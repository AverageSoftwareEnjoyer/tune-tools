import{Ca as I,Ha as M,Pb as L,Qb as R,Vb as D,Xa as B,Zb as g,_ as S,aa as a,ba as b,da as h,fa as d,ga as l,la as v,na as _}from"./chunk-Y3DDOGII.js";var N=null;function p(){return N}function je(n){N??=n}var O=class{};var y=new h(""),w=(()=>{let e=class e{historyGo(t){throw new Error("")}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=a({token:e,factory:()=>l(z),providedIn:"platform"});let n=e;return n})(),Ge=new h(""),z=(()=>{let e=class e extends w{constructor(){super(),this._doc=l(y),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return p().getBaseHref(this._doc)}onPopState(t){let i=p().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=p().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=a({token:e,factory:()=>new e,providedIn:"platform"});let n=e;return n})();function A(n,e){if(n.length==0)return e;if(e.length==0)return n;let s=0;return n.endsWith("/")&&s++,e.startsWith("/")&&s++,s==2?n+e.substring(1):s==1?n+e:n+"/"+e}function T(n){let e=n.match(/#|\?|$/),s=e&&e.index||n.length,t=s-(n[s-1]==="/"?1:0);return n.slice(0,t)+n.slice(s)}function c(n){return n&&n[0]!=="?"?"?"+n:n}var f=(()=>{let e=class e{historyGo(t){throw new Error("")}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=a({token:e,factory:()=>l(V),providedIn:"root"});let n=e;return n})(),$=new h(""),V=(()=>{let e=class e extends f{constructor(t,i){super(),this._platformLocation=t,this._removeListenerFns=[],this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??l(y).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return A(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+c(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,u){let o=this.prepareExternalUrl(r+c(u));this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,u){let o=this.prepareExternalUrl(r+c(u));this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}};e.\u0275fac=function(i){return new(i||e)(d(w),d($,8))},e.\u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})(),He=(()=>{let e=class e extends f{constructor(t,i){super(),this._platformLocation=t,this._baseHref="",this._removeListenerFns=[],i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(t){let i=A(this._baseHref,t);return i.length>0?"#"+i:i}pushState(t,i,r,u){let o=this.prepareExternalUrl(r+c(u));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,u){let o=this.prepareExternalUrl(r+c(u));o.length==0&&(o=this._platformLocation.pathname),this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}};e.\u0275fac=function(i){return new(i||e)(d(w),d($,8))},e.\u0275prov=a({token:e,factory:e.\u0275fac});let n=e;return n})(),j=(()=>{let e=class e{constructor(t){this._subject=new I,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=Y(T(P(i))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+c(i))}normalize(t){return e.stripTrailingSlash(H(this._basePath,P(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+c(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+c(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i,complete:r})}};e.normalizeQueryParams=c,e.joinWithSlash=A,e.stripTrailingSlash=T,e.\u0275fac=function(i){return new(i||e)(d(f))},e.\u0275prov=a({token:e,factory:()=>G(),providedIn:"root"});let n=e;return n})();function G(){return new j(d(f))}function H(n,e){if(!n||!e.startsWith(n))return e;let s=e.substring(n.length);return s===""||["/",";","?","#"].includes(s[0])?s:e}function P(n){return n.replace(/\/index.html$/,"")}function Y(n){if(new RegExp("^(https?:)?//").test(n)){let[,s]=n.split(/\/\/[^\/]+/);return s}return n}function Ye(n,e){e=encodeURIComponent(e);for(let s of n.split(";")){let t=s.indexOf("="),[i,r]=t==-1?[s,""]:[s.slice(0,t),s.slice(t+1)];if(i.trim()===e)return decodeURIComponent(r)}return null}function Z(n,e){return new S(2100,!1)}var m=class{createSubscription(e,s){return g(()=>e.subscribe({next:s,error:t=>{throw t}}))}dispose(e){g(()=>e.unsubscribe())}},C=class{createSubscription(e,s){return e.then(s,t=>{throw t})}dispose(e){}},W=new C,K=new m,Ze=(()=>{let e=class e{constructor(t){this._latestValue=null,this.markForCheckOnValueUpdate=!0,this._subscription=null,this._obj=null,this._strategy=null,this._ref=t}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null}transform(t){if(!this._obj){if(t)try{this.markForCheckOnValueUpdate=!1,this._subscribe(t)}finally{this.markForCheckOnValueUpdate=!0}return this._latestValue}return t!==this._obj?(this._dispose(),this.transform(t)):this._latestValue}_subscribe(t){this._obj=t,this._strategy=this._selectStrategy(t),this._subscription=this._strategy.createSubscription(t,i=>this._updateLatestValue(t,i))}_selectStrategy(t){if(L(t))return W;if(R(t))return K;throw Z(e,t)}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null}_updateLatestValue(t,i){t===this._obj&&(this._latestValue=i,this.markForCheckOnValueUpdate&&this._ref?.markForCheck())}};e.\u0275fac=function(i){return new(i||e)(B(D,16))},e.\u0275pipe=_({name:"async",type:e,pure:!1,standalone:!0});let n=e;return n})();var We=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=v({type:e}),e.\u0275inj=b({});let n=e;return n})(),q="browser",X="server";function Q(n){return n===q}function Ke(n){return n===X}var qe=(()=>{let e=class e{};e.\u0275prov=a({token:e,providedIn:"root",factory:()=>Q(l(M))?new F(l(y),window):new E});let n=e;return n})(),F=class{constructor(e,s){this.document=e,this.window=s,this.offset=()=>[0,0]}setOffset(e){Array.isArray(e)?this.offset=()=>e:this.offset=e}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(e){this.window.scrollTo(e[0],e[1])}scrollToAnchor(e){let s=J(this.document,e);s&&(this.scrollToElement(s),s.focus())}setHistoryScrollRestoration(e){this.window.history.scrollRestoration=e}scrollToElement(e){let s=e.getBoundingClientRect(),t=s.left+this.window.pageXOffset,i=s.top+this.window.pageYOffset,r=this.offset();this.window.scrollTo(t-r[0],i-r[1])}};function J(n,e){let s=n.getElementById(e)||n.getElementsByName(e)[0];if(s)return s;if(typeof n.createTreeWalker=="function"&&n.body&&typeof n.body.attachShadow=="function"){let t=n.createTreeWalker(n.body,NodeFilter.SHOW_ELEMENT),i=t.currentNode;for(;i;){let r=i.shadowRoot;if(r){let u=r.getElementById(e)||r.querySelector(`[name="${e}"]`);if(u)return u}i=t.nextNode()}}return null}var E=class{setOffset(e){}getScrollPosition(){return[0,0]}scrollToPosition(e){}scrollToAnchor(e){}setHistoryScrollRestoration(e){}},k=class{};export{p as a,je as b,O as c,y as d,Ge as e,f,V as g,He as h,j as i,Ye as j,Ze as k,We as l,q as m,Q as n,Ke as o,qe as p,k as q};
//# sourceMappingURL=chunk-FS4ND72F.js.map
