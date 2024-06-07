import{i as E,k as L}from"./chunk-NTUJKVRU.js";import{a as p}from"./chunk-6B5GWKLQ.js";import{a as y,c as R}from"./chunk-4YIGD7KX.js";import{$ as d,B as x,G as j,N as C,W as A,Y as k,d as e,e as h,f as U,fa as u,g as S,p as $,q as v,r as b,v as w}from"./chunk-SU73ZYXM.js";var P=(()=>{var r;let i=class i{constructor(){h(this,r,u(R))}getAccessToken$(t,o){let f=new y().set("client_id",p.clientId).set("grant_type","authorization_code").set("redirect_uri",p.redirectUri).set("code",o).set("code_verifier",t);return e(this,r).post(p.tokenUrl,f,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}refreshAccessToken$(t){let o=new y().set("client_id",p.clientId).set("grant_type","refresh_token").set("refresh_token",t);return e(this,r).post(p.tokenUrl,o,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}};r=new WeakMap,i.\u0275fac=function(o){return new(o||i)},i.\u0275prov=d({token:i,factory:i.\u0275fac,providedIn:"root"});let c=i;return c})();var z=(()=>{var r,i;let s=class s{constructor(){h(this,r,!1);h(this,i,!1)}get isUserAuthenticated(){return e(this,r)}set isUserAuthenticated(o){U(this,r,o)}get isUserAuthorized(){return e(this,i)}set isUserAuthorized(o){U(this,i,o)}};r=new WeakMap,i=new WeakMap,s.\u0275fac=function(f){return new(f||s)},s.\u0275prov=d({token:s,factory:s.\u0275fac,providedIn:"root"});let c=s;return c})();var B=["verifier","access_token","refresh_token","token_expiry","state"];var F=(()=>{let r=class r{setItem(s,t){localStorage.setItem(`__${s}`,t)}getItem(s){return localStorage.getItem(`__${s}`)}removeItem(s){localStorage.removeItem(`__${s}`)}clearLocalStorageItems(){for(let s of B)this.removeItem(s)}};r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=d({token:r,factory:r.\u0275fac,providedIn:"root"});let c=r;return c})();var ne=(()=>{var r,i,s,t,o,f,_;let g=class g{constructor(){h(this,f);h(this,r,u(E));h(this,i,u(P));h(this,s,u(z));h(this,t,u(F));h(this,o,u(L))}generateRandomString(a){let n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return crypto.getRandomValues(new Uint8Array(a)).reduce((m,I)=>m+n[I%n.length],"")}sha256$(a){let l=new TextEncoder().encode(a);return v(crypto.subtle.digest("SHA-256",l))}base64encode(a){return btoa(String.fromCharCode(...new Uint8Array(a))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}redirectToAuthCodeFlow$(){let a,n=this.generateRandomString(128),l=this.generateRandomString(128);return x([this.sha256$(n),this.sha256$(l)]).pipe(w(([m,I])=>[this.base64encode(m),this.base64encode(I)]),k(([,m])=>{e(this,t).setItem("verifier",n),e(this,t).setItem("state",m)}),k(([m,I])=>{let H=new y().set("client_id",p.clientId).set("response_type","code").set("redirect_uri",p.redirectUri).set("scope",p.scope).set("code_challenge_method","S256").set("code_challenge",m).set("state",I);a=`${p.authUrl}?${H.toString()}`}),w(()=>!1),C(()=>window.location.href=a))}handleAuthCallback$(){return e(this,r).queryParams.pipe(A(({code:a,state:n})=>!a||!n||n!==e(this,t).getItem("state")?(e(this,t).clearLocalStorageItems(),v(e(this,o).navigateByUrl(""))):(e(this,t).removeItem("state"),this.getAccessTokenWrapper$(a))))}getAccessTokenWrapper$(a){let n=e(this,t).getItem("verifier");return n?e(this,i).getAccessToken$(n,a).pipe(j(()=>(e(this,s).isUserAuthenticated=!1,e(this,t).clearLocalStorageItems(),v(e(this,o).navigateByUrl("")).pipe(A(()=>$)))),k(({access_token:l,refresh_token:m})=>{S(this,f,_).call(this,l,m),e(this,t).removeItem("verifier")}),A(()=>v(e(this,o).navigateByUrl("/top-tracks")))):(e(this,s).isUserAuthenticated=!1,e(this,t).clearLocalStorageItems(),v(e(this,o).navigateByUrl("")))}handlePotentiallyExpiredAccessToken$(){let a=e(this,t).getItem("access_token"),n=e(this,t).getItem("refresh_token"),l=e(this,t).getItem("token_expiry");return!a||!n||!l?(e(this,s).isUserAuthenticated=!1,e(this,t).clearLocalStorageItems(),v(e(this,o).navigateByUrl(""))):new Date>new Date(parseInt(l))?e(this,i).refreshAccessToken$(n).pipe(k(({access_token:m,refresh_token:I})=>S(this,f,_).call(this,m,I)),w(()=>!1)):b(!1)}};r=new WeakMap,i=new WeakMap,s=new WeakMap,t=new WeakMap,o=new WeakMap,f=new WeakSet,_=function(a,n){e(this,s).isUserAuthenticated=!0,e(this,t).setItem("access_token",a),e(this,t).setItem("refresh_token",n);let l=new Date().getTime()+36e5;e(this,t).setItem("token_expiry",l.toString())},g.\u0275fac=function(n){return new(n||g)},g.\u0275prov=d({token:g,factory:g.\u0275fac,providedIn:"root"});let c=g;return c})();export{F as a,z as b,ne as c};
//# sourceMappingURL=chunk-Z7QQHZ7B.js.map
