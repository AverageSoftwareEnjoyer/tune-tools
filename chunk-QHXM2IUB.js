import{a as k,c as R,m as z,o as E}from"./chunk-I5BVM4TL.js";import{C as x,H as j,O as C,X as w,Z as v,aa as f,e,f as h,g as A,ga as u,h as S,q as _,r as y,s as $,w as U}from"./chunk-CSICKPLX.js";var m={production:!0,clientId:"d9716dd3efb4408491738456849796a1",redirectUri:"https://averagesoftwareenjoyer.github.io/tune-tools/auth-callback",scope:"playlist-modify-private playlist-modify-public user-read-private user-read-recently-played user-top-read",authUrl:"https://accounts.spotify.com/authorize",tokenUrl:"https://accounts.spotify.com/api/token"};var L=(()=>{var r;let s=class s{constructor(){h(this,r,u(R))}getAccessToken$(t,o){let d=new k().set("client_id",m.clientId).set("grant_type","authorization_code").set("redirect_uri",m.redirectUri).set("code",o).set("code_verifier",t);return e(this,r).post(m.tokenUrl,d,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}refreshAccessToken$(t){let o=new k().set("client_id",m.clientId).set("grant_type","refresh_token").set("refresh_token",t);return e(this,r).post(m.tokenUrl,o,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})}};r=new WeakMap,s.\u0275fac=function(o){return new(o||s)},s.\u0275prov=f({token:s,factory:s.\u0275fac,providedIn:"root"});let c=s;return c})();var P=(()=>{var r,s;let i=class i{constructor(){h(this,r,!1);h(this,s,!1)}get isUserAuthenticated(){return e(this,r)}set isUserAuthenticated(o){A(this,r,o)}get isUserAuthorized(){return e(this,s)}set isUserAuthorized(o){A(this,s,o)}};r=new WeakMap,s=new WeakMap,i.\u0275fac=function(d){return new(d||i)},i.\u0275prov=f({token:i,factory:i.\u0275fac,providedIn:"root"});let c=i;return c})();var B=["verifier","access_token","refresh_token","token_expiry","state"];var F=(()=>{let r=class r{setItem(i,t){localStorage.setItem(`__${i}`,t)}getItem(i){return localStorage.getItem(`__${i}`)}removeItem(i){localStorage.removeItem(`__${i}`)}clearLocalStorageItems(){for(let i of B)this.removeItem(i)}};r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=f({token:r,factory:r.\u0275fac,providedIn:"root"});let c=r;return c})();var ae=(()=>{var r,s,i,t,o,d,T;let g=class g{constructor(){h(this,d);h(this,r,u(z));h(this,s,u(L));h(this,i,u(P));h(this,t,u(F));h(this,o,u(E))}generateRandomString(a){let n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return crypto.getRandomValues(new Uint8Array(a)).reduce((p,I)=>p+n[I%n.length],"")}sha256$(a){let l=new TextEncoder().encode(a);return y(crypto.subtle.digest("SHA-256",l))}base64encode(a){return btoa(String.fromCharCode(...new Uint8Array(a))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}redirectToAuthCodeFlow$(){let a,n=this.generateRandomString(128),l=this.generateRandomString(128);return x([this.sha256$(n),this.sha256$(l)]).pipe(U(([p,I])=>[this.base64encode(p),this.base64encode(I)]),v(([,p])=>{e(this,t).setItem("verifier",n),e(this,t).setItem("state",p)}),v(([p,I])=>{let H=new k().set("client_id",m.clientId).set("response_type","code").set("redirect_uri",m.redirectUri).set("scope",m.scope).set("code_challenge_method","S256").set("code_challenge",p).set("state",I);a=`${m.authUrl}?${H.toString()}`}),U(()=>!1),C(()=>window.location.href=a))}handleAuthCallback$(){return e(this,r).queryParams.pipe(w(({code:a,state:n})=>!a||!n||n!==e(this,t).getItem("state")?(e(this,t).clearLocalStorageItems(),y(e(this,o).navigateByUrl(""))):(e(this,t).removeItem("state"),this.getAccessTokenWrapper$(a))))}getAccessTokenWrapper$(a){let n=e(this,t).getItem("verifier");return n?e(this,s).getAccessToken$(n,a).pipe(j(()=>(e(this,i).isUserAuthenticated=!1,e(this,t).clearLocalStorageItems(),y(e(this,o).navigateByUrl("")).pipe(w(()=>_)))),v(({access_token:l,refresh_token:p})=>{S(this,d,T).call(this,l,p),e(this,t).removeItem("verifier")}),w(()=>y(e(this,o).navigateByUrl("/top-tracks")))):(e(this,i).isUserAuthenticated=!1,e(this,t).clearLocalStorageItems(),y(e(this,o).navigateByUrl("")))}handlePotentiallyExpiredAccessToken$(){let a=e(this,t).getItem("access_token"),n=e(this,t).getItem("refresh_token"),l=e(this,t).getItem("token_expiry");return!a||!n||!l?(e(this,i).isUserAuthenticated=!1,e(this,t).clearLocalStorageItems(),y(e(this,o).navigateByUrl(""))):new Date>new Date(parseInt(l))?e(this,s).refreshAccessToken$(n).pipe(v(({access_token:p,refresh_token:I})=>S(this,d,T).call(this,p,I)),U(()=>!1)):$(!1)}};r=new WeakMap,s=new WeakMap,i=new WeakMap,t=new WeakMap,o=new WeakMap,d=new WeakSet,T=function(a,n){e(this,i).isUserAuthenticated=!0,e(this,t).setItem("access_token",a),e(this,t).setItem("refresh_token",n);let l=new Date().getTime()+36e5;e(this,t).setItem("token_expiry",l.toString())},g.\u0275fac=function(n){return new(n||g)},g.\u0275prov=f({token:g,factory:g.\u0275fac,providedIn:"root"});let c=g;return c})();export{F as a,P as b,m as c,ae as d};
//# sourceMappingURL=chunk-QHXM2IUB.js.map
