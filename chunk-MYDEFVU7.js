import{a as v,b as I}from"./chunk-5KOSEQ7T.js";import{L as T}from"./chunk-2ZYM47BY.js";import"./chunk-4CXEXTMY.js";import"./chunk-6Q5E7ID7.js";import{a as n,c as l,g as f,h as M,i as R}from"./chunk-3D5V3SDA.js";import"./chunk-S4XWDHAS.js";import"./chunk-7INKEAZU.js";import"./chunk-6PRRXIRX.js";import{$b as S,Gb as g,d as a,e as m,f as p,ha as r,la as c,sc as h,ua as u,vb as d}from"./chunk-JIPULUQR.js";var A=(()=>{var t;let e=class e{constructor(){m(this,t);this.timeRange=n.ShortTerm,p(this,t,r(T)),this.columnsMappings=h(()=>this.isBelowMediumWidth()?M:f),this.topItemsStateService=r(I)}get isBelowMediumWidth(){return a(this,t).isBelowMediumWidth}ngOnChanges(){this.topItemsStateService.publishTopArtistsTimeRange(this.timeRange)}};t=new WeakMap,e.\u0275fac=function(i){return new(i||e)},e.\u0275cmp=c({type:e,selectors:[["app-top-artists"]],inputs:{timeRange:"timeRange"},standalone:!0,features:[u,S],decls:1,vars:4,consts:[["itemsType","artists",3,"items","columnsMappings","currentTimeRange","isBelowMediumWidth"]],template:function(i,o){i&1&&g(0,"app-base-tabs-container",0),i&2&&d("items",o.topItemsStateService.topArtists())("columnsMappings",o.columnsMappings)("currentTimeRange",o.topItemsStateService.topArtistsTimeRange())("isBelowMediumWidth",o.isBelowMediumWidth)},dependencies:[v],changeDetection:0});let s=e;return s})();var Q=[{path:":timeRange",component:A,canActivate:[R(l.TopArtists)]},{path:"**",redirectTo:n.ShortTerm}];export{Q as default};
//# sourceMappingURL=chunk-MYDEFVU7.js.map
