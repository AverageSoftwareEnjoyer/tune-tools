import{X as wt,Z as bt,a as S,c as E,d as T,e as k,f as W,g as H,k as Z,l as u,m as yt,y as j,z as P}from"./chunk-PK5LSSKH.js";import{d as y,i as mt}from"./chunk-IWPWY3IN.js";import{Da as dt,Dc as vt,E as N,G as at,H as L,Ha as D,I as Y,Pa as ft,_ as M,a as B,b as rt,da as m,ea as O,fb as R,ga as lt,i as I,ia as h,ja as ht,jb as ut,k as F,n as v,nb as b,oa as x,pa as X,pb as _t,qb as pt,r as ot,ta as ct,tc as gt}from"./chunk-R2BZJTIW.js";var At=20,z=(()=>{let t=class t{constructor(e,i,n){this._ngZone=e,this._platform=i,this._scrolled=new v,this._globalSubscription=null,this._scrolledCount=0,this.scrollContainers=new Map,this._document=n}register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=At){return this._platform.isBrowser?new F(i=>{this._globalSubscription||this._addGlobalListener();let n=e>0?this._scrolled.pipe(Y(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{n.unsubscribe(),this._scrolledCount--,this._scrolledCount||this._removeGlobalListener()}}):ot()}ngOnDestroy(){this._removeGlobalListener(),this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let n=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(L(r=>!r||n.indexOf(r)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((n,r)=>{this._scrollableContainsElement(r,e)&&i.push(r)}),i}_getWindow(){return this._document.defaultView||window}_scrollableContainsElement(e,i){let n=yt(i),r=e.getElementRef().nativeElement;do if(n==r)return!0;while(n=n.parentElement);return!1}_addGlobalListener(){this._globalSubscription=this._ngZone.runOutsideAngular(()=>{let e=this._getWindow();return N(e.document,"scroll").subscribe(()=>this._scrolled.next())})}_removeGlobalListener(){this._globalSubscription&&(this._globalSubscription.unsubscribe(),this._globalSubscription=null)}};t.\u0275fac=function(i){return new(i||t)(h(b),h(S),h(y,8))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})(),Ft=(()=>{let t=class t{constructor(e,i,n,r){this.elementRef=e,this.scrollDispatcher=i,this.ngZone=n,this.dir=r,this._destroyed=new v,this._elementScrolled=new F(a=>this.ngZone.runOutsideAngular(()=>N(this.elementRef.nativeElement,"scroll").pipe(M(this._destroyed)).subscribe(a)))}ngOnInit(){this.scrollDispatcher.register(this)}ngOnDestroy(){this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,n=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=n?e.end:e.start),e.right==null&&(e.right=n?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),n&&k()!=E.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),k()==E.INVERTED?e.left=e.right:k()==E.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;T()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i="left",n="right",r=this.elementRef.nativeElement;if(e=="top")return r.scrollTop;if(e=="bottom")return r.scrollHeight-r.clientHeight-r.scrollTop;let a=this.dir&&this.dir.value=="rtl";return e=="start"?e=a?n:i:e=="end"&&(e=a?i:n),a&&k()==E.INVERTED?e==i?r.scrollWidth-r.clientWidth-r.scrollLeft:r.scrollLeft:a&&k()==E.NEGATED?e==i?r.scrollLeft+r.scrollWidth-r.clientWidth:-r.scrollLeft:e==i?r.scrollLeft:r.scrollWidth-r.clientWidth-r.scrollLeft}};t.\u0275fac=function(i){return new(i||t)(R(D),R(z),R(b),R(j,8))},t.\u0275dir=X({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]],standalone:!0});let o=t;return o})(),Nt=20,V=(()=>{let t=class t{constructor(e,i,n){this._platform=e,this._change=new v,this._changeListener=r=>{this._change.next(r)},this._document=n,i.runOutsideAngular(()=>{if(e.isBrowser){let r=this._getWindow();r.addEventListener("resize",this._changeListener),r.addEventListener("orientationchange",this._changeListener)}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){if(this._platform.isBrowser){let e=this._getWindow();e.removeEventListener("resize",this._changeListener),e.removeEventListener("orientationchange",this._changeListener)}this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:n}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+n,right:e.left+i,height:n,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),n=e.documentElement,r=n.getBoundingClientRect(),a=-r.top||e.body.scrollTop||i.scrollY||n.scrollTop||0,c=-r.left||e.body.scrollLeft||i.scrollX||n.scrollLeft||0;return{top:a,left:c}}change(e=Nt){return e>0?this._change.pipe(Y(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}};t.\u0275fac=function(i){return new(i||t)(h(S),h(b),h(y,8))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var St=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=x({type:t}),t.\u0275inj=O({});let o=t;return o})(),$=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=x({type:t}),t.\u0275inj=O({imports:[P,St,P,St]});let o=t;return o})();var Ct=T(),U=class{constructor(t,s){this._viewportRuler=t,this._previousHTMLStyles={top:"",left:""},this._isEnabled=!1,this._document=s}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||"",this._previousHTMLStyles.top=t.style.top||"",t.style.left=u(-this._previousScrollPosition.left),t.style.top=u(-this._previousScrollPosition.top),t.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let t=this._document.documentElement,s=this._document.body,e=t.style,i=s.style,n=e.scrollBehavior||"",r=i.scrollBehavior||"";this._isEnabled=!1,e.left=this._previousHTMLStyles.left,e.top=this._previousHTMLStyles.top,t.classList.remove("cdk-global-scrollblock"),Ct&&(e.scrollBehavior=i.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Ct&&(e.scrollBehavior=n,i.scrollBehavior=r)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let s=this._document.body,e=this._viewportRuler.getViewportSize();return s.scrollHeight>e.height||s.scrollWidth>e.width}};var G=class{constructor(t,s,e,i){this._scrollDispatcher=t,this._ngZone=s,this._viewportRuler=e,this._config=i,this._scrollSubscription=null,this._detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(this._scrollSubscription)return;let t=this._scrollDispatcher.scrolled(0).pipe(L(s=>!s||!this._overlayRef.overlayElement.contains(s.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=t.subscribe(()=>{let s=this._viewportRuler.getViewportScrollPosition().top;Math.abs(s-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=t.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},A=class{enable(){}disable(){}attach(){}};function q(o,t){return t.some(s=>{let e=o.bottom<s.top,i=o.top>s.bottom,n=o.right<s.left,r=o.left>s.right;return e||i||n||r})}function Rt(o,t){return t.some(s=>{let e=o.top<s.top,i=o.bottom>s.bottom,n=o.left<s.left,r=o.right>s.right;return e||i||n||r})}var K=class{constructor(t,s,e,i){this._scrollDispatcher=t,this._viewportRuler=s,this._ngZone=e,this._config=i,this._scrollSubscription=null}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let s=this._overlayRef.overlayElement.getBoundingClientRect(),{width:e,height:i}=this._viewportRuler.getViewportSize();q(s,[{width:e,height:i,bottom:i,right:e,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},Xt=(()=>{let t=class t{constructor(e,i,n,r){this._scrollDispatcher=e,this._viewportRuler=i,this._ngZone=n,this.noop=()=>new A,this.close=a=>new G(this._scrollDispatcher,this._ngZone,this._viewportRuler,a),this.block=()=>new U(this._viewportRuler,this._document),this.reposition=a=>new K(this._scrollDispatcher,this._viewportRuler,this._ngZone,a),this._document=r}};t.\u0275fac=function(i){return new(i||t)(h(z),h(V),h(b),h(y))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})(),Q=class{constructor(t){if(this.scrollStrategy=new A,this.panelClass="",this.hasBackdrop=!1,this.backdropClass="cdk-overlay-dark-backdrop",this.disposeOnNavigation=!1,t){let s=Object.keys(t);for(let e of s)t[e]!==void 0&&(this[e]=t[e])}}};var J=class{constructor(t,s){this.connectionPair=t,this.scrollableViewProperties=s}};var Pt=(()=>{let t=class t{constructor(e){this._attachedOverlays=[],this._document=e}ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}};t.\u0275fac=function(i){return new(i||t)(h(y))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})(),Wt=(()=>{let t=class t extends Pt{constructor(e,i){super(e),this._ngZone=i,this._keydownListener=n=>{let r=this._attachedOverlays;for(let a=r.length-1;a>-1;a--)if(r[a]._keydownEvents.observers.length>0){let c=r[a]._keydownEvents;this._ngZone?this._ngZone.run(()=>c.next(n)):c.next(n);break}}}add(e){super.add(e),this._isAttached||(this._ngZone?this._ngZone.runOutsideAngular(()=>this._document.body.addEventListener("keydown",this._keydownListener)):this._document.body.addEventListener("keydown",this._keydownListener),this._isAttached=!0)}detach(){this._isAttached&&(this._document.body.removeEventListener("keydown",this._keydownListener),this._isAttached=!1)}};t.\u0275fac=function(i){return new(i||t)(h(y),h(b,8))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})(),Ht=(()=>{let t=class t extends Pt{constructor(e,i,n){super(e),this._platform=i,this._ngZone=n,this._cursorStyleIsSet=!1,this._pointerDownListener=r=>{this._pointerDownEventTarget=W(r)},this._clickListener=r=>{let a=W(r),c=r.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:a;this._pointerDownEventTarget=null;let d=this._attachedOverlays.slice();for(let l=d.length-1;l>-1;l--){let f=d[l];if(f._outsidePointerEvents.observers.length<1||!f.hasAttached())continue;if(Et(f.overlayElement,a)||Et(f.overlayElement,c))break;let _=f._outsidePointerEvents;this._ngZone?this._ngZone.run(()=>_.next(r)):_.next(r)}}}add(e){if(super.add(e),!this._isAttached){let i=this._document.body;this._ngZone?this._ngZone.runOutsideAngular(()=>this._addEventListeners(i)):this._addEventListeners(i),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){if(this._isAttached){let e=this._document.body;e.removeEventListener("pointerdown",this._pointerDownListener,!0),e.removeEventListener("click",this._clickListener,!0),e.removeEventListener("auxclick",this._clickListener,!0),e.removeEventListener("contextmenu",this._clickListener,!0),this._platform.IOS&&this._cursorStyleIsSet&&(e.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1}}_addEventListeners(e){e.addEventListener("pointerdown",this._pointerDownListener,!0),e.addEventListener("click",this._clickListener,!0),e.addEventListener("auxclick",this._clickListener,!0),e.addEventListener("contextmenu",this._clickListener,!0)}};t.\u0275fac=function(i){return new(i||t)(h(y),h(S),h(b,8))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();function Et(o,t){let s=typeof ShadowRoot<"u"&&ShadowRoot,e=t;for(;e;){if(e===o)return!0;e=s&&e instanceof ShadowRoot?e.host:e.parentNode}return!1}var Bt=(()=>{let t=class t{constructor(e,i){this._platform=i,this._document=e}ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||H()){let n=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<n.length;r++)n[r].remove()}let i=this._document.createElement("div");i.classList.add(e),H()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}};t.\u0275fac=function(i){return new(i||t)(h(y),h(S))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})(),tt=class{constructor(t,s,e,i,n,r,a,c,d,l=!1,f){this._portalOutlet=t,this._host=s,this._pane=e,this._config=i,this._ngZone=n,this._keyboardDispatcher=r,this._document=a,this._location=c,this._outsideClickDispatcher=d,this._animationsDisabled=l,this._injector=f,this._backdropElement=null,this._backdropClick=new v,this._attachments=new v,this._detachments=new v,this._locationChanges=I.EMPTY,this._backdropClickHandler=_=>this._backdropClick.next(_),this._backdropTransitionendHandler=_=>{this._disposeBackdrop(_.target)},this._keydownEvents=new v,this._outsidePointerEvents=new v,this._renders=new v,i.scrollStrategy&&(this._scrollStrategy=i.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=i.positionStrategy,this._afterRenderRef=vt(()=>_t(()=>{this._renders.next()},{injector:this._injector}))}get overlayElement(){return this._pane}get backdropElement(){return this._backdropElement}get hostElement(){return this._host}attach(t){!this._host.parentElement&&this._previousHostParent&&this._previousHostParent.appendChild(this._host);let s=this._portalOutlet.attach(t);return this._positionStrategy&&this._positionStrategy.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),pt(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof s?.onDestroy=="function"&&s.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),s}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),t}dispose(){let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._disposeBackdrop(this._backdropElement),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._previousHostParent=this._pane=this._host=null,t&&this._detachments.next(),this._detachments.complete(),this._afterRenderRef.destroy(),this._renders.complete()}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()))}updateSize(t){this._config=B(B({},this._config),t),this._updateElementSize()}setDirection(t){this._config=rt(B({},this._config),{direction:t}),this._updateElementDirection()}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!0)}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!1)}getDirection(){let t=this._config.direction;return t?typeof t=="string"?t:t.value:"ltr"}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=u(this._config.width),t.height=u(this._config.height),t.minWidth=u(this._config.minWidth),t.minHeight=u(this._config.minHeight),t.maxWidth=u(this._config.maxWidth),t.maxHeight=u(this._config.maxHeight)}_togglePointerEvents(t){this._pane.style.pointerEvents=t?"":"none"}_attachBackdrop(){let t="cdk-overlay-backdrop-showing";this._backdropElement=this._document.createElement("div"),this._backdropElement.classList.add("cdk-overlay-backdrop"),this._animationsDisabled&&this._backdropElement.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropElement,this._config.backdropClass,!0),this._host.parentElement.insertBefore(this._backdropElement,this._host),this._backdropElement.addEventListener("click",this._backdropClickHandler),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>{this._backdropElement&&this._backdropElement.classList.add(t)})}):this._backdropElement.classList.add(t)}_updateStackingOrder(){this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){let t=this._backdropElement;if(t){if(this._animationsDisabled){this._disposeBackdrop(t);return}t.classList.remove("cdk-overlay-backdrop-showing"),this._ngZone.runOutsideAngular(()=>{t.addEventListener("transitionend",this._backdropTransitionendHandler)}),t.style.pointerEvents="none",this._backdropTimeout=this._ngZone.runOutsideAngular(()=>setTimeout(()=>{this._disposeBackdrop(t)},500))}}_toggleClasses(t,s,e){let i=Z(s||[]).filter(n=>!!n);i.length&&(e?t.classList.add(...i):t.classList.remove(...i))}_detachContentWhenEmpty(){this._ngZone.runOutsideAngular(()=>{let t=this._renders.pipe(M(at(this._attachments,this._detachments))).subscribe(()=>{(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),t.unsubscribe())})})}_disposeScrollStrategy(){let t=this._scrollStrategy;t&&(t.disable(),t.detach&&t.detach())}_disposeBackdrop(t){t&&(t.removeEventListener("click",this._backdropClickHandler),t.removeEventListener("transitionend",this._backdropTransitionendHandler),t.remove(),this._backdropElement===t&&(this._backdropElement=null)),this._backdropTimeout&&(clearTimeout(this._backdropTimeout),this._backdropTimeout=void 0)}},kt="cdk-overlay-connected-position-bounding-box",Zt=/([A-Za-z%]+)$/,et=class{get positions(){return this._preferredPositions}constructor(t,s,e,i,n){this._viewportRuler=s,this._document=e,this._platform=i,this._overlayContainer=n,this._lastBoundingBoxSize={width:0,height:0},this._isPushed=!1,this._canPush=!0,this._growAfterOpen=!1,this._hasFlexibleDimensions=!0,this._positionLocked=!1,this._viewportMargin=0,this._scrollables=[],this._preferredPositions=[],this._positionChanges=new v,this._resizeSubscription=I.EMPTY,this._offsetX=0,this._offsetY=0,this._appliedPanelClasses=[],this.positionChanges=this._positionChanges,this.setOrigin(t)}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(kt),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._overlayContainer.getContainerElement().getBoundingClientRect();let t=this._originRect,s=this._overlayRect,e=this._viewportRect,i=this._containerRect,n=[],r;for(let a of this._preferredPositions){let c=this._getOriginPoint(t,i,a),d=this._getOverlayPoint(c,s,a),l=this._getOverlayFit(d,s,e,a);if(l.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,c);return}if(this._canFitWithFlexibleDimensions(l,d,e)){n.push({position:a,origin:c,overlayRect:s,boundingBoxRect:this._calculateBoundingBoxRect(c,a)});continue}(!r||r.overlayFit.visibleArea<l.visibleArea)&&(r={overlayFit:l,overlayPoint:d,originPoint:c,position:a,overlayRect:s})}if(n.length){let a=null,c=-1;for(let d of n){let l=d.boundingBoxRect.width*d.boundingBoxRect.height*(d.position.weight||1);l>c&&(c=l,a=d)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(r.position,r.originPoint);return}this._applyPosition(r.position,r.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&C(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(kt),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;if(t){this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._overlayContainer.getContainerElement().getBoundingClientRect();let s=this._getOriginPoint(this._originRect,this._containerRect,t);this._applyPosition(t,s)}else this.apply()}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=!0){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=!0){return this._growAfterOpen=t,this}withPush(t=!0){return this._canPush=t,this}withLockedPosition(t=!0){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}_getOriginPoint(t,s,e){let i;if(e.originX=="center")i=t.left+t.width/2;else{let r=this._isRtl()?t.right:t.left,a=this._isRtl()?t.left:t.right;i=e.originX=="start"?r:a}s.left<0&&(i-=s.left);let n;return e.originY=="center"?n=t.top+t.height/2:n=e.originY=="top"?t.top:t.bottom,s.top<0&&(n-=s.top),{x:i,y:n}}_getOverlayPoint(t,s,e){let i;e.overlayX=="center"?i=-s.width/2:e.overlayX==="start"?i=this._isRtl()?-s.width:0:i=this._isRtl()?0:-s.width;let n;return e.overlayY=="center"?n=-s.height/2:n=e.overlayY=="top"?0:-s.height,{x:t.x+i,y:t.y+n}}_getOverlayFit(t,s,e,i){let n=xt(s),{x:r,y:a}=t,c=this._getOffset(i,"x"),d=this._getOffset(i,"y");c&&(r+=c),d&&(a+=d);let l=0-r,f=r+n.width-e.width,_=0-a,g=a+n.height-e.height,p=this._subtractOverflows(n.width,l,f),w=this._subtractOverflows(n.height,_,g),nt=p*w;return{visibleArea:nt,isCompletelyWithinViewport:n.width*n.height===nt,fitsInViewportVertically:w===n.height,fitsInViewportHorizontally:p==n.width}}_canFitWithFlexibleDimensions(t,s,e){if(this._hasFlexibleDimensions){let i=e.bottom-s.y,n=e.right-s.x,r=Ot(this._overlayRef.getConfig().minHeight),a=Ot(this._overlayRef.getConfig().minWidth),c=t.fitsInViewportVertically||r!=null&&r<=i,d=t.fitsInViewportHorizontally||a!=null&&a<=n;return c&&d}return!1}_pushOverlayOnScreen(t,s,e){if(this._previousPushAmount&&this._positionLocked)return{x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let i=xt(s),n=this._viewportRect,r=Math.max(t.x+i.width-n.width,0),a=Math.max(t.y+i.height-n.height,0),c=Math.max(n.top-e.top-t.y,0),d=Math.max(n.left-e.left-t.x,0),l=0,f=0;return i.width<=n.width?l=d||-r:l=t.x<this._viewportMargin?n.left-e.left-t.x:0,i.height<=n.height?f=c||-a:f=t.y<this._viewportMargin?n.top-e.top-t.y:0,this._previousPushAmount={x:l,y:f},{x:t.x+l,y:t.y+f}}_applyPosition(t,s){if(this._setTransformOrigin(t),this._setOverlayElementStyles(s,t),this._setBoundingBoxStyles(s,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let e=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!$t(this._lastScrollVisibility,e)){let i=new J(t,e);this._positionChanges.next(i)}this._lastScrollVisibility=e}this._lastPosition=t,this._isInitialRender=!1}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let s=this._boundingBox.querySelectorAll(this._transformOriginSelector),e,i=t.overlayY;t.overlayX==="center"?e="center":this._isRtl()?e=t.overlayX==="start"?"right":"left":e=t.overlayX==="start"?"left":"right";for(let n=0;n<s.length;n++)s[n].style.transformOrigin=`${e} ${i}`}_calculateBoundingBoxRect(t,s){let e=this._viewportRect,i=this._isRtl(),n,r,a;if(s.overlayY==="top")r=t.y,n=e.height-r+this._viewportMargin;else if(s.overlayY==="bottom")a=e.height-t.y+this._viewportMargin*2,n=e.height-a+this._viewportMargin;else{let g=Math.min(e.bottom-t.y+e.top,t.y),p=this._lastBoundingBoxSize.height;n=g*2,r=t.y-g,n>p&&!this._isInitialRender&&!this._growAfterOpen&&(r=t.y-p/2)}let c=s.overlayX==="start"&&!i||s.overlayX==="end"&&i,d=s.overlayX==="end"&&!i||s.overlayX==="start"&&i,l,f,_;if(d)_=e.width-t.x+this._viewportMargin*2,l=t.x-this._viewportMargin;else if(c)f=t.x,l=e.right-t.x;else{let g=Math.min(e.right-t.x+e.left,t.x),p=this._lastBoundingBoxSize.width;l=g*2,f=t.x-g,l>p&&!this._isInitialRender&&!this._growAfterOpen&&(f=t.x-p/2)}return{top:r,left:f,bottom:a,right:_,width:l,height:n}}_setBoundingBoxStyles(t,s){let e=this._calculateBoundingBoxRect(t,s);!this._isInitialRender&&!this._growAfterOpen&&(e.height=Math.min(e.height,this._lastBoundingBoxSize.height),e.width=Math.min(e.width,this._lastBoundingBoxSize.width));let i={};if(this._hasExactPosition())i.top=i.left="0",i.bottom=i.right=i.maxHeight=i.maxWidth="",i.width=i.height="100%";else{let n=this._overlayRef.getConfig().maxHeight,r=this._overlayRef.getConfig().maxWidth;i.height=u(e.height),i.top=u(e.top),i.bottom=u(e.bottom),i.width=u(e.width),i.left=u(e.left),i.right=u(e.right),s.overlayX==="center"?i.alignItems="center":i.alignItems=s.overlayX==="end"?"flex-end":"flex-start",s.overlayY==="center"?i.justifyContent="center":i.justifyContent=s.overlayY==="bottom"?"flex-end":"flex-start",n&&(i.maxHeight=u(n)),r&&(i.maxWidth=u(r))}this._lastBoundingBoxSize=e,C(this._boundingBox.style,i)}_resetBoundingBoxStyles(){C(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){C(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(t,s){let e={},i=this._hasExactPosition(),n=this._hasFlexibleDimensions,r=this._overlayRef.getConfig();if(i){let l=this._viewportRuler.getViewportScrollPosition();C(e,this._getExactOverlayY(s,t,l)),C(e,this._getExactOverlayX(s,t,l))}else e.position="static";let a="",c=this._getOffset(s,"x"),d=this._getOffset(s,"y");c&&(a+=`translateX(${c}px) `),d&&(a+=`translateY(${d}px)`),e.transform=a.trim(),r.maxHeight&&(i?e.maxHeight=u(r.maxHeight):n&&(e.maxHeight="")),r.maxWidth&&(i?e.maxWidth=u(r.maxWidth):n&&(e.maxWidth="")),C(this._pane.style,e)}_getExactOverlayY(t,s,e){let i={top:"",bottom:""},n=this._getOverlayPoint(s,this._overlayRect,t);if(this._isPushed&&(n=this._pushOverlayOnScreen(n,this._overlayRect,e)),t.overlayY==="bottom"){let r=this._document.documentElement.clientHeight;i.bottom=`${r-(n.y+this._overlayRect.height)}px`}else i.top=u(n.y);return i}_getExactOverlayX(t,s,e){let i={left:"",right:""},n=this._getOverlayPoint(s,this._overlayRect,t);this._isPushed&&(n=this._pushOverlayOnScreen(n,this._overlayRect,e));let r;if(this._isRtl()?r=t.overlayX==="end"?"left":"right":r=t.overlayX==="end"?"right":"left",r==="right"){let a=this._document.documentElement.clientWidth;i.right=`${a-(n.x+this._overlayRect.width)}px`}else i.left=u(n.x);return i}_getScrollVisibility(){let t=this._getOriginRect(),s=this._pane.getBoundingClientRect(),e=this._scrollables.map(i=>i.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:Rt(t,e),isOriginOutsideView:q(t,e),isOverlayClipped:Rt(s,e),isOverlayOutsideView:q(s,e)}}_subtractOverflows(t,...s){return s.reduce((e,i)=>e-Math.max(i,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,s=this._document.documentElement.clientHeight,e=this._viewportRuler.getViewportScrollPosition();return{top:e.top+this._viewportMargin,left:e.left+this._viewportMargin,right:e.left+t-this._viewportMargin,bottom:e.top+s-this._viewportMargin,width:t-2*this._viewportMargin,height:s-2*this._viewportMargin}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(t,s){return s==="x"?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&Z(t).forEach(s=>{s!==""&&this._appliedPanelClasses.indexOf(s)===-1&&(this._appliedPanelClasses.push(s),this._pane.classList.add(s))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t)}),this._appliedPanelClasses=[])}_getOriginRect(){let t=this._origin;if(t instanceof D)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let s=t.width||0,e=t.height||0;return{top:t.y,bottom:t.y+e,left:t.x,right:t.x+s,height:e,width:s}}};function C(o,t){for(let s in t)t.hasOwnProperty(s)&&(o[s]=t[s]);return o}function Ot(o){if(typeof o!="number"&&o!=null){let[t,s]=o.split(Zt);return!s||s==="px"?parseFloat(t):null}return o||null}function xt(o){return{top:Math.floor(o.top),right:Math.floor(o.right),bottom:Math.floor(o.bottom),left:Math.floor(o.left),width:Math.floor(o.width),height:Math.floor(o.height)}}function $t(o,t){return o===t?!0:o.isOriginClipped===t.isOriginClipped&&o.isOriginOutsideView===t.isOriginOutsideView&&o.isOverlayClipped===t.isOverlayClipped&&o.isOverlayOutsideView===t.isOverlayOutsideView}var Dt="cdk-global-overlay-wrapper",it=class{constructor(){this._cssPosition="static",this._topOffset="",this._bottomOffset="",this._alignItems="",this._xPosition="",this._xOffset="",this._width="",this._height="",this._isDisposed=!1}attach(t){let s=t.getConfig();this._overlayRef=t,this._width&&!s.width&&t.updateSize({width:this._width}),this._height&&!s.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(Dt),this._isDisposed=!1}top(t=""){return this._bottomOffset="",this._topOffset=t,this._alignItems="flex-start",this}left(t=""){return this._xOffset=t,this._xPosition="left",this}bottom(t=""){return this._topOffset="",this._bottomOffset=t,this._alignItems="flex-end",this}right(t=""){return this._xOffset=t,this._xPosition="right",this}start(t=""){return this._xOffset=t,this._xPosition="start",this}end(t=""){return this._xOffset=t,this._xPosition="end",this}width(t=""){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=""){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=""){return this.left(t),this._xPosition="center",this}centerVertically(t=""){return this.top(t),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,s=this._overlayRef.hostElement.style,e=this._overlayRef.getConfig(),{width:i,height:n,maxWidth:r,maxHeight:a}=e,c=(i==="100%"||i==="100vw")&&(!r||r==="100%"||r==="100vw"),d=(n==="100%"||n==="100vh")&&(!a||a==="100%"||a==="100vh"),l=this._xPosition,f=this._xOffset,_=this._overlayRef.getConfig().direction==="rtl",g="",p="",w="";c?w="flex-start":l==="center"?(w="center",_?p=f:g=f):_?l==="left"||l==="end"?(w="flex-end",g=f):(l==="right"||l==="start")&&(w="flex-start",p=f):l==="left"||l==="start"?(w="flex-start",g=f):(l==="right"||l==="end")&&(w="flex-end",p=f),t.position=this._cssPosition,t.marginLeft=c?"0":g,t.marginTop=d?"0":this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=c?"0":p,s.justifyContent=w,s.alignItems=d?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,s=this._overlayRef.hostElement,e=s.style;s.classList.remove(Dt),e.justifyContent=e.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position="",this._overlayRef=null,this._isDisposed=!0}},Ut=(()=>{let t=class t{constructor(e,i,n,r){this._viewportRuler=e,this._document=i,this._platform=n,this._overlayContainer=r}global(){return new it}flexibleConnectedTo(e){return new et(e,this._viewportRuler,this._document,this._platform,this._overlayContainer)}};t.\u0275fac=function(i){return new(i||t)(h(V),h(y),h(S),h(Bt))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})(),Gt=0,st=(()=>{let t=class t{constructor(e,i,n,r,a,c,d,l,f,_,g,p){this.scrollStrategies=e,this._overlayContainer=i,this._componentFactoryResolver=n,this._positionBuilder=r,this._keyboardDispatcher=a,this._injector=c,this._ngZone=d,this._document=l,this._directionality=f,this._location=_,this._outsideClickDispatcher=g,this._animationsModuleType=p}create(e){let i=this._createHostElement(),n=this._createPaneElement(i),r=this._createPortalOutlet(n),a=new Q(e);return a.direction=a.direction||this._directionality.value,new tt(r,i,n,a,this._ngZone,this._keyboardDispatcher,this._document,this._location,this._outsideClickDispatcher,this._animationsModuleType==="NoopAnimations",this._injector.get(ct))}position(){return this._positionBuilder}_createPaneElement(e){let i=this._document.createElement("div");return i.id=`cdk-overlay-${Gt++}`,i.classList.add("cdk-overlay-pane"),e.appendChild(i),i}_createHostElement(){let e=this._document.createElement("div");return this._overlayContainer.getContainerElement().appendChild(e),e}_createPortalOutlet(e){return this._appRef||(this._appRef=this._injector.get(gt)),new wt(e,this._componentFactoryResolver,this._appRef,this._injector,this._document)}};t.\u0275fac=function(i){return new(i||t)(h(Xt),h(Bt),h(ut),h(Ut),h(Wt),h(dt),h(b),h(y),h(j),h(mt),h(Ht),h(ft,8))},t.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var qt=new lt("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let o=ht(st);return()=>o.scrollStrategies.reposition()}});function Kt(o){return()=>o.scrollStrategies.reposition()}var Qt={provide:qt,deps:[st],useFactory:Kt},Qe=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=x({type:t}),t.\u0275inj=O({providers:[st,Qt],imports:[P,bt,$,$]});let o=t;return o})();export{z as a,Ft as b,V as c,St as d,$ as e,Q as f,st as g,Qe as h};
//# sourceMappingURL=chunk-FZA6R2MS.js.map
