import{a as S}from"./chunk-XWVQ7Y7G.js";import{a as l,b as f,c as M,d as R,h as v,i as C,j as I}from"./chunk-P4RCDVJZ.js";import"./chunk-INPF3QE7.js";import"./chunk-6ASKLLOS.js";import"./chunk-O346CPTS.js";import"./chunk-4CXEXTMY.js";import"./chunk-KTLUAYWQ.js";import"./chunk-WW5LBWJ2.js";import"./chunk-3VHDMWSJ.js";import"./chunk-G5NBOVDF.js";import{Ea as u,Jb as g,cc as T,d as s,e as a,f as m,ha as r,la as p,ua as c,wc as h,yb as d}from"./chunk-PRQNTVEV.js";var k=(()=>{var t;let e=class e{constructor(){a(this,t);this.timeRange=u.required(),m(this,t,r(S)),this.columnsMappings=h(()=>this.isBelowMediumWidth()?R:M),this.topItemsStateService=r(I)}get isBelowMediumWidth(){return s(this,t).isBelowMediumWidth}ngOnChanges(){this.topItemsStateService.publishTopTracksTimeRange(this.timeRange())}};t=new WeakMap,e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=p({type:e,selectors:[["app-top-tracks"]],inputs:{timeRange:[1,"timeRange"]},standalone:!0,features:[c,T],decls:1,vars:4,consts:[["itemsType","tracks",3,"items","columnsMappings","currentTimeRange","isBelowMediumWidth"]],template:function(i,o){i&1&&g(0,"app-base-tabs-container",0),i&2&&d("items",o.topItemsStateService.topTracks())("columnsMappings",o.columnsMappings())("currentTimeRange",o.topItemsStateService.topTracksTimeRange())("isBelowMediumWidth",o.isBelowMediumWidth())},dependencies:[C],changeDetection:0});let n=e;return n})();var E=[{path:":timeRange",component:k,canActivate:[v(f.TopTracks)]},{path:"**",redirectTo:l.ShortTerm}];export{E as default};
//# sourceMappingURL=chunk-JAYTTQLE.js.map
