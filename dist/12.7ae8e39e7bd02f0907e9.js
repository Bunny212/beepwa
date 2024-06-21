/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{TaHA:function(e,t,s){"use strict"
function isObject(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function extend(e={},t={}){Object.keys(t).forEach(s=>{void 0===e[s]?e[s]=t[s]:isObject(t[s])&&isObject(e[s])&&Object.keys(t[s]).length>0&&extend(e[s],t[s])})}s.d(t,"c",function(){return v}),s.d(t,"b",function(){return Pagination}),s.d(t,"a",function(){return Autoplay})
const i={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}}
function getDocument(){const e="undefined"!=typeof document?document:{}
return extend(e,i),e}const r={document:i,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function CustomEvent(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}}
function getWindow(){const e="undefined"!=typeof window?window:{}
return extend(e,r),e}function nextTick(e,t=0){return setTimeout(e,t)}function now(){return Date.now()}function getTranslate(e,t="x"){const s=getWindow()
let i,r,n
const a=function utils_getComputedStyle(e){const t=getWindow()
let s
return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e)
return s.WebKitCSSMatrix?((r=a.transform||a.webkitTransform).split(",").length>6&&(r=r.split(", ").map(e=>e.replace(",",".")).join(", ")),n=new s.WebKitCSSMatrix("none"===r?"":r)):i=(n=a.MozTransform||a.OTransform||a.MsTransform||a.msTransform||a.transform||a.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,")).toString().split(","),"x"===t&&(r=s.WebKitCSSMatrix?n.m41:16===i.length?parseFloat(i[12]):parseFloat(i[4])),"y"===t&&(r=s.WebKitCSSMatrix?n.m42:16===i.length?parseFloat(i[13]):parseFloat(i[5])),r||0}function utils_isObject(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function utils_extend(...e){const t=Object(e[0]),s=["__proto__","constructor","prototype"]
for(let r=1;r<e.length;r+=1){const n=e[r]
if(null!=n&&(i=n,!("undefined"!=typeof window&&void 0!==window.HTMLElement?i instanceof HTMLElement:i&&(1===i.nodeType||11===i.nodeType)))){const e=Object.keys(Object(n)).filter(e=>s.indexOf(e)<0)
for(let s=0,i=e.length;s<i;s+=1){const i=e[s],r=Object.getOwnPropertyDescriptor(n,i)
void 0!==r&&r.enumerable&&(utils_isObject(t[i])&&utils_isObject(n[i])?n[i].__swiper__?t[i]=n[i]:utils_extend(t[i],n[i]):!utils_isObject(t[i])&&utils_isObject(n[i])?(t[i]={},n[i].__swiper__?t[i]=n[i]:utils_extend(t[i],n[i])):t[i]=n[i])}}}var i
return t}function setCSSProperty(e,t,s){e.style.setProperty(t,s)}function animateCSSModeScroll({swiper:e,targetPosition:t,side:s}){const i=getWindow(),r=-e.translate
let n,a=null
const l=e.params.speed
e.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(e.cssModeFrameID)
const o=t>r?"next":"prev",d=(e,t)=>"next"===o&&e>=t||"prev"===o&&e<=t,c=()=>{n=(new Date).getTime(),null===a&&(a=n)
const o=Math.max(Math.min((n-a)/l,1),0),p=.5-Math.cos(o*Math.PI)/2
let u=r+p*(t-r)
if(d(u,t)&&(u=t),e.wrapperEl.scrollTo({[s]:u}),d(u,t))return e.wrapperEl.style.overflow="hidden",e.wrapperEl.style.scrollSnapType="",setTimeout(()=>{e.wrapperEl.style.overflow="",e.wrapperEl.scrollTo({[s]:u})}),void i.cancelAnimationFrame(e.cssModeFrameID)
e.cssModeFrameID=i.requestAnimationFrame(c)}
c()}function elementChildren(e,t=""){return[...e.children].filter(e=>e.matches(t))}function createElement(e,t=[]){const s=document.createElement(e)
return s.classList.add(...Array.isArray(t)?t:[t]),s}function elementStyle(e,t){return getWindow().getComputedStyle(e,null).getPropertyValue(t)}function elementIndex(e){let t,s=e
if(s){for(t=0;null!==(s=s.previousSibling);)1===s.nodeType&&(t+=1)
return t}}function elementParents(e,t){const s=[]
let i=e.parentElement
for(;i;)t?i.matches(t)&&s.push(i):s.push(i),i=i.parentElement
return s}function elementOuterSize(e,t,s){const i=getWindow()
return s?e["width"===t?"offsetWidth":"offsetHeight"]+parseFloat(i.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-right":"margin-top"))+parseFloat(i.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-left":"margin-bottom")):e.offsetWidth}let n,a,l
function getSupport(){return n||(n=function calcSupport(){const e=getWindow(),t=getDocument()
return{smoothScroll:t.documentElement&&t.documentElement.style&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)}}()),n}function getDevice(e={}){return a||(a=function calcDevice({userAgent:e}={}){const t=getSupport(),s=getWindow(),i=s.navigator.platform,r=e||s.navigator.userAgent,n={ios:!1,android:!1},a=s.screen.width,l=s.screen.height,o=r.match(/(Android);?[\s\/]+([\d.]+)?/)
let d=r.match(/(iPad).*OS\s([\d_]+)/)
const c=r.match(/(iPod)(.*OS\s([\d_]+))?/),p=!d&&r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),u="Win32"===i
let m="MacIntel"===i
return!d&&m&&t.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${a}x${l}`)>=0&&((d=r.match(/(Version)\/([\d.]+)/))||(d=[0,1,"13_0_0"]),m=!1),o&&!u&&(n.os="android",n.android=!0),(d||p||c)&&(n.os="ios",n.ios=!0),n}(e)),a}function getBrowser(){return l||(l=function calcBrowser(){const e=getWindow()
let t=!1
function isSafari(){const t=e.navigator.userAgent.toLowerCase()
return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}if(isSafari()){const s=String(e.navigator.userAgent)
if(s.includes("Version/")){const[e,i]=s.split("Version/")[1].split(" ")[0].split(".").map(e=>Number(e))
t=e<16||16===e&&i<2}}return{isSafari:t||isSafari(),needPerspectiveFix:t,isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),l}const o=(e,t)=>{if(!e||e.destroyed||!e.params)return
const s=t.closest((()=>e.isElement?"swiper-slide":`.${e.params.slideClass}`)())
if(s){const t=s.querySelector(`.${e.params.lazyPreloaderClass}`)
t&&t.remove()}},d=(e,t)=>{if(!e.slides[t])return
const s=e.slides[t].querySelector('[loading="lazy"]')
s&&s.removeAttribute("loading")},c=e=>{if(!e||e.destroyed||!e.params)return
let t=e.params.lazyPreloadPrevNext
const s=e.slides.length
if(!s||!t||t<0)return
t=Math.min(t,s)
const i="auto"===e.params.slidesPerView?e.slidesPerViewDynamic():Math.ceil(e.params.slidesPerView),r=e.activeIndex
if(e.params.grid&&e.params.grid.rows>1){const s=r,n=[s-t]
return n.push(...Array.from({length:t}).map((e,t)=>s+i+t)),void e.slides.forEach((t,s)=>{n.includes(t.column)&&d(e,s)})}const n=r+i-1
if(e.params.rewind||e.params.loop)for(let i=r-t;i<=n+t;i+=1){const t=(i%s+s)%s;(t<r||t>n)&&d(e,t)}else for(let i=Math.max(r-t,0);i<=Math.min(n+t,s-1);i+=1)i!==r&&(i>n||i<r)&&d(e,i)}
function transitionEmit({swiper:e,runCallbacks:t,direction:s,step:i}){const{activeIndex:r,previousIndex:n}=e
let a=s
if(a||(a=r>n?"next":r<n?"prev":"reset"),e.emit(`transition${i}`),t&&r!==n){if("reset"===a)return void e.emit(`slideResetTransition${i}`)
e.emit(`slideChangeTransition${i}`),"next"===a?e.emit(`slideNextTransition${i}`):e.emit(`slidePrevTransition${i}`)}}function onTouchStart_onTouchStart(e){const t=this,s=getDocument(),i=getWindow(),r=t.touchEventsData
r.evCache.push(e)
const{params:n,touches:a,enabled:l}=t
if(!l)return
if(!n.simulateTouch&&"mouse"===e.pointerType)return
if(t.animating&&n.preventInteractionOnTransition)return
!t.animating&&n.cssMode&&n.loop&&t.loopFix()
let o=e
o.originalEvent&&(o=o.originalEvent)
let d=o.target
if("wrapper"===n.touchEventsTarget&&!t.wrapperEl.contains(d))return
if("which"in o&&3===o.which)return
if("button"in o&&o.button>0)return
if(r.isTouched&&r.isMoved)return
const c=!!n.noSwipingClass&&""!==n.noSwipingClass,p=e.composedPath?e.composedPath():e.path
c&&o.target&&o.target.shadowRoot&&p&&(d=p[0])
const u=n.noSwipingSelector?n.noSwipingSelector:`.${n.noSwipingClass}`,m=!(!o.target||!o.target.shadowRoot)
if(n.noSwiping&&(m?function closestElement(e,t=this){return function __closestFrom(t){if(!t||t===getDocument()||t===getWindow())return null
t.assignedSlot&&(t=t.assignedSlot)
const s=t.closest(e)
return s||t.getRootNode?s||__closestFrom(t.getRootNode().host):null}(t)}(u,d):d.closest(u)))return void(t.allowClick=!0)
if(n.swipeHandler&&!d.closest(n.swipeHandler))return
a.currentX=o.pageX,a.currentY=o.pageY
const f=a.currentX,h=a.currentY,g=n.edgeSwipeDetection||n.iOSEdgeSwipeDetection,v=n.edgeSwipeThreshold||n.iOSEdgeSwipeThreshold
if(g&&(f<=v||f>=i.innerWidth-v)){if("prevent"!==g)return
e.preventDefault()}Object.assign(r,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),a.startX=f,a.startY=h,r.touchStartTime=now(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,n.threshold>0&&(r.allowThresholdMove=!1)
let w=!0
d.matches(r.focusableElements)&&(w=!1,"SELECT"===d.nodeName&&(r.isTouched=!1)),s.activeElement&&s.activeElement.matches(r.focusableElements)&&s.activeElement!==d&&s.activeElement.blur()
const b=w&&t.allowTouchMove&&n.touchStartPreventDefault
!n.touchStartForcePreventDefault&&!b||d.isContentEditable||o.preventDefault(),n.freeMode&&n.freeMode.enabled&&t.freeMode&&t.animating&&!n.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",o)}function onResize(){const e=this,{params:t,el:s}=e
if(s&&0===s.offsetWidth)return
t.breakpoints&&e.setBreakpoint()
const{allowSlideNext:i,allowSlidePrev:r,snapGrid:n}=e,a=e.virtual&&e.params.virtual.enabled
e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses()
const l=a&&t.loop
!("auto"===t.slidesPerView||t.slidesPerView>1)||!e.isEnd||e.isBeginning||e.params.centeredSlides||l?e.params.loop&&!a?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0):e.slideTo(e.slides.length-1,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&(clearTimeout(e.autoplay.resizeTimeout),e.autoplay.resizeTimeout=setTimeout(()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume()},500)),e.allowSlidePrev=r,e.allowSlideNext=i,e.params.watchOverflow&&n!==e.snapGrid&&e.checkOverflow()}let p=!1
function dummyEventListener(){}const u=(e,t)=>{const s=getDocument(),{params:i,el:r,wrapperEl:n,device:a}=e,l=!!i.nested,o="on"===t?"addEventListener":"removeEventListener",d=t
r[o]("pointerdown",e.onTouchStart,{passive:!1}),s[o]("pointermove",e.onTouchMove,{passive:!1,capture:l}),s[o]("pointerup",e.onTouchEnd,{passive:!0}),s[o]("pointercancel",e.onTouchEnd,{passive:!0}),s[o]("pointerout",e.onTouchEnd,{passive:!0}),s[o]("pointerleave",e.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&r[o]("click",e.onClick,!0),i.cssMode&&n[o]("scroll",e.onScroll),i.updateOnWindowResize?e[d](a.ios||a.android?"resize orientationchange observerUpdate":"resize observerUpdate",onResize,!0):e[d]("observerUpdate",onResize,!0),r[o]("load",e.onLoad,{capture:!0})}
const m=(e,t)=>e.grid&&t.grid&&t.grid.rows>1
var f={init:!0,direction:"horizontal",oneWayMovement:!1,touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopedSlides:null,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1}
function moduleExtendParams(e,t){return function extendParams(s={}){const i=Object.keys(s)[0],r=s[i]
"object"==typeof r&&null!==r?(["navigation","pagination","scrollbar"].indexOf(i)>=0&&!0===e[i]&&(e[i]={auto:!0}),i in e&&"enabled"in r?(!0===e[i]&&(e[i]={enabled:!0}),"object"!=typeof e[i]||"enabled"in e[i]||(e[i].enabled=!0),e[i]||(e[i]={enabled:!1}),utils_extend(t,s)):utils_extend(t,s)):utils_extend(t,s)}}const h={eventsEmitter:{on(e,t,s){const i=this
if(!i.eventsListeners||i.destroyed)return i
if("function"!=typeof t)return i
const r=s?"unshift":"push"
return e.split(" ").forEach(e=>{i.eventsListeners[e]||(i.eventsListeners[e]=[]),i.eventsListeners[e][r](t)}),i},once(e,t,s){const i=this
if(!i.eventsListeners||i.destroyed)return i
if("function"!=typeof t)return i
function onceHandler(...s){i.off(e,onceHandler),onceHandler.__emitterProxy&&delete onceHandler.__emitterProxy,t.apply(i,s)}return onceHandler.__emitterProxy=t,i.on(e,onceHandler,s)},onAny(e,t){const s=this
if(!s.eventsListeners||s.destroyed)return s
if("function"!=typeof e)return s
const i=t?"unshift":"push"
return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[i](e),s},offAny(e){const t=this
if(!t.eventsListeners||t.destroyed)return t
if(!t.eventsAnyListeners)return t
const s=t.eventsAnyListeners.indexOf(e)
return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this
return!s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach(e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach((i,r)=>{(i===t||i.__emitterProxy&&i.__emitterProxy===t)&&s.eventsListeners[e].splice(r,1)})}),s):s},emit(...e){const t=this
if(!t.eventsListeners||t.destroyed)return t
if(!t.eventsListeners)return t
let s,i,r
return"string"==typeof e[0]||Array.isArray(e[0])?(s=e[0],i=e.slice(1,e.length),r=t):(s=e[0].events,i=e[0].data,r=e[0].context||t),i.unshift(r),(Array.isArray(s)?s:s.split(" ")).forEach(e=>{t.eventsAnyListeners&&t.eventsAnyListeners.length&&t.eventsAnyListeners.forEach(t=>{t.apply(r,[e,...i])}),t.eventsListeners&&t.eventsListeners[e]&&t.eventsListeners[e].forEach(e=>{e.apply(r,i)})}),t}},update:{updateSize:function updateSize_updateSize(){const e=this
let t,s
const i=e.el
t=void 0!==e.params.width&&null!==e.params.width?e.params.width:i.clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:i.clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(elementStyle(i,"padding-left")||0,10)-parseInt(elementStyle(i,"padding-right")||0,10),s=s-parseInt(elementStyle(i,"padding-top")||0,10)-parseInt(elementStyle(i,"padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function updateSlides(){const e=this
function getDirectionLabel(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function getDirectionPropertyValue(e,t){return parseFloat(e.getPropertyValue(getDirectionLabel(t))||0)}const t=e.params,{wrapperEl:s,slidesEl:i,size:r,rtlTranslate:n,wrongRTL:a}=e,l=e.virtual&&t.virtual.enabled,o=l?e.virtual.slides.length:e.slides.length,d=elementChildren(i,`.${e.params.slideClass}, swiper-slide`),c=l?e.virtual.slides.length:d.length
let p=[]
const u=[],m=[]
let f=t.slidesOffsetBefore
"function"==typeof f&&(f=t.slidesOffsetBefore.call(e))
let h=t.slidesOffsetAfter
"function"==typeof h&&(h=t.slidesOffsetAfter.call(e))
const g=e.snapGrid.length,v=e.slidesGrid.length
let w=t.spaceBetween,b=-f,S=0,y=0
if(void 0===r)return
"string"==typeof w&&w.indexOf("%")>=0?w=parseFloat(w.replace("%",""))/100*r:"string"==typeof w&&(w=parseFloat(w)),e.virtualSize=-w,d.forEach(e=>{n?e.style.marginLeft="":e.style.marginRight="",e.style.marginBottom="",e.style.marginTop=""}),t.centeredSlides&&t.cssMode&&(setCSSProperty(s,"--swiper-centered-offset-before",""),setCSSProperty(s,"--swiper-centered-offset-after",""))
const T=t.grid&&t.grid.rows>1&&e.grid
let E
T&&e.grid.initSlides(c)
const x="auto"===t.slidesPerView&&t.breakpoints&&Object.keys(t.breakpoints).filter(e=>void 0!==t.breakpoints[e].slidesPerView).length>0
for(let s=0;s<c;s+=1){let i
if(E=0,d[s]&&(i=d[s]),T&&e.grid.updateSlide(s,i,c,getDirectionLabel),!d[s]||"none"!==elementStyle(i,"display")){if("auto"===t.slidesPerView){x&&(d[s].style[getDirectionLabel("width")]="")
const r=getComputedStyle(i),n=i.style.transform,a=i.style.webkitTransform
if(n&&(i.style.transform="none"),a&&(i.style.webkitTransform="none"),t.roundLengths)E=e.isHorizontal()?elementOuterSize(i,"width",!0):elementOuterSize(i,"height",!0)
else{const e=getDirectionPropertyValue(r,"width"),t=getDirectionPropertyValue(r,"padding-left"),s=getDirectionPropertyValue(r,"padding-right"),n=getDirectionPropertyValue(r,"margin-left"),a=getDirectionPropertyValue(r,"margin-right"),l=r.getPropertyValue("box-sizing")
if(l&&"border-box"===l)E=e+n+a
else{const{clientWidth:r,offsetWidth:l}=i
E=e+t+s+n+a+(l-r)}}n&&(i.style.transform=n),a&&(i.style.webkitTransform=a),t.roundLengths&&(E=Math.floor(E))}else E=(r-(t.slidesPerView-1)*w)/t.slidesPerView,t.roundLengths&&(E=Math.floor(E)),d[s]&&(d[s].style[getDirectionLabel("width")]=`${E}px`)
d[s]&&(d[s].swiperSlideSize=E),m.push(E),t.centeredSlides?(b=b+E/2+S/2+w,0===S&&0!==s&&(b=b-r/2-w),0===s&&(b=b-r/2-w),Math.abs(b)<.001&&(b=0),t.roundLengths&&(b=Math.floor(b)),y%t.slidesPerGroup==0&&p.push(b),u.push(b)):(t.roundLengths&&(b=Math.floor(b)),(y-Math.min(e.params.slidesPerGroupSkip,y))%e.params.slidesPerGroup==0&&p.push(b),u.push(b),b=b+E+w),e.virtualSize+=E+w,S=E,y+=1}}if(e.virtualSize=Math.max(e.virtualSize,r)+h,n&&a&&("slide"===t.effect||"coverflow"===t.effect)&&(s.style.width=`${e.virtualSize+w}px`),t.setWrapperSize&&(s.style[getDirectionLabel("width")]=`${e.virtualSize+w}px`),T&&e.grid.updateWrapperSize(E,p,getDirectionLabel),!t.centeredSlides){const s=[]
for(let i=0;i<p.length;i+=1){let n=p[i]
t.roundLengths&&(n=Math.floor(n)),p[i]<=e.virtualSize-r&&s.push(n)}p=s,Math.floor(e.virtualSize-r)-Math.floor(p[p.length-1])>1&&p.push(e.virtualSize-r)}if(l&&t.loop){const s=m[0]+w
if(t.slidesPerGroup>1){const i=Math.ceil((e.virtual.slidesBefore+e.virtual.slidesAfter)/t.slidesPerGroup),r=s*t.slidesPerGroup
for(let e=0;e<i;e+=1)p.push(p[p.length-1]+r)}for(let i=0;i<e.virtual.slidesBefore+e.virtual.slidesAfter;i+=1)1===t.slidesPerGroup&&p.push(p[p.length-1]+s),u.push(u[u.length-1]+s),e.virtualSize+=s}if(0===p.length&&(p=[0]),0!==w){const s=e.isHorizontal()&&n?"marginLeft":getDirectionLabel("marginRight")
d.filter((e,s)=>!(t.cssMode&&!t.loop)||s!==d.length-1).forEach(e=>{e.style[s]=`${w}px`})}if(t.centeredSlides&&t.centeredSlidesBounds){let e=0
m.forEach(t=>{e+=t+(w||0)})
const t=(e-=w)-r
p=p.map(e=>e<=0?-f:e>t?t+h:e)}if(t.centerInsufficientSlides){let e=0
if(m.forEach(t=>{e+=t+(w||0)}),(e-=w)<r){const t=(r-e)/2
p.forEach((e,s)=>{p[s]=e-t}),u.forEach((e,s)=>{u[s]=e+t})}}if(Object.assign(e,{slides:d,snapGrid:p,slidesGrid:u,slidesSizesGrid:m}),t.centeredSlides&&t.cssMode&&!t.centeredSlidesBounds){setCSSProperty(s,"--swiper-centered-offset-before",`${-p[0]}px`),setCSSProperty(s,"--swiper-centered-offset-after",`${e.size/2-m[m.length-1]/2}px`)
const t=-e.snapGrid[0],i=-e.slidesGrid[0]
e.snapGrid=e.snapGrid.map(e=>e+t),e.slidesGrid=e.slidesGrid.map(e=>e+i)}if(c!==o&&e.emit("slidesLengthChange"),p.length!==g&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),u.length!==v&&e.emit("slidesGridLengthChange"),t.watchSlidesProgress&&e.updateSlidesOffset(),!(l||t.cssMode||"slide"!==t.effect&&"fade"!==t.effect)){const s=`${t.containerModifierClass}backface-hidden`,i=e.el.classList.contains(s)
c<=t.maxBackfaceHiddenSlides?i||e.el.classList.add(s):i&&e.el.classList.remove(s)}},updateAutoHeight:function updateAutoHeight(e){const t=this,s=[],i=t.virtual&&t.params.virtual.enabled
let r,n=0
"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed)
const a=e=>i?t.slides[t.getSlideIndexByData(e)]:t.slides[e]
if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||[]).forEach(e=>{s.push(e)})
else for(r=0;r<Math.ceil(t.params.slidesPerView);r+=1){const e=t.activeIndex+r
if(e>t.slides.length&&!i)break
s.push(a(e))}else s.push(a(t.activeIndex))
for(r=0;r<s.length;r+=1)if(void 0!==s[r]){const e=s[r].offsetHeight
n=e>n?e:n}(n||0===n)&&(t.wrapperEl.style.height=`${n}px`)},updateSlidesOffset:function updateSlidesOffset(){const e=this,t=e.slides,s=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0
for(let i=0;i<t.length;i+=1)t[i].swiperSlideOffset=(e.isHorizontal()?t[i].offsetLeft:t[i].offsetTop)-s-e.cssOverflowAdjustment()},updateSlidesProgress:function updateSlidesProgress(e=this&&this.translate||0){const t=this,s=t.params,{slides:i,rtlTranslate:r,snapGrid:n}=t
if(0===i.length)return
void 0===i[0].swiperSlideOffset&&t.updateSlidesOffset()
let a=-e
r&&(a=e),i.forEach(e=>{e.classList.remove(s.slideVisibleClass)}),t.visibleSlidesIndexes=[],t.visibleSlides=[]
let l=s.spaceBetween
"string"==typeof l&&l.indexOf("%")>=0?l=parseFloat(l.replace("%",""))/100*t.size:"string"==typeof l&&(l=parseFloat(l))
for(let e=0;e<i.length;e+=1){const o=i[e]
let d=o.swiperSlideOffset
s.cssMode&&s.centeredSlides&&(d-=i[0].swiperSlideOffset)
const c=(a+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),p=(a-n[0]+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),u=-(a-d),m=u+t.slidesSizesGrid[e];(u>=0&&u<t.size-1||m>1&&m<=t.size||u<=0&&m>=t.size)&&(t.visibleSlides.push(o),t.visibleSlidesIndexes.push(e),i[e].classList.add(s.slideVisibleClass)),o.progress=r?-c:c,o.originalProgress=r?-p:p}},updateProgress:function updateProgress(e){const t=this
if(void 0===e){const s=t.rtlTranslate?-1:1
e=t&&t.translate&&t.translate*s||0}const s=t.params,i=t.maxTranslate()-t.minTranslate()
let{progress:r,isBeginning:n,isEnd:a,progressLoop:l}=t
const o=n,d=a
if(0===i)r=0,n=!0,a=!0
else{r=(e-t.minTranslate())/i
const s=Math.abs(e-t.minTranslate())<1,l=Math.abs(e-t.maxTranslate())<1
n=s||r<=0,a=l||r>=1,s&&(r=0),l&&(r=1)}if(s.loop){const s=t.getSlideIndexByData(0),i=t.getSlideIndexByData(t.slides.length-1),r=t.slidesGrid[s],n=t.slidesGrid[i],a=t.slidesGrid[t.slidesGrid.length-1],o=Math.abs(e);(l=o>=r?(o-r)/a:(o+a-n)/a)>1&&(l-=1)}Object.assign(t,{progress:r,progressLoop:l,isBeginning:n,isEnd:a}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),n&&!o&&t.emit("reachBeginning toEdge"),a&&!d&&t.emit("reachEnd toEdge"),(o&&!n||d&&!a)&&t.emit("fromEdge"),t.emit("progress",r)},updateSlidesClasses:function updateSlidesClasses(){const e=this,{slides:t,params:s,slidesEl:i,activeIndex:r}=e,n=e.virtual&&s.virtual.enabled,a=e=>elementChildren(i,`.${s.slideClass}${e}, swiper-slide${e}`)[0]
let l
if(t.forEach(e=>{e.classList.remove(s.slideActiveClass,s.slideNextClass,s.slidePrevClass)}),n)if(s.loop){let t=r-e.virtual.slidesBefore
t<0&&(t=e.virtual.slides.length+t),t>=e.virtual.slides.length&&(t-=e.virtual.slides.length),l=a(`[data-swiper-slide-index="${t}"]`)}else l=a(`[data-swiper-slide-index="${r}"]`)
else l=t[r]
if(l){l.classList.add(s.slideActiveClass)
let e=function elementNextAll(e,t){const s=[]
for(;e.nextElementSibling;){const i=e.nextElementSibling
t?i.matches(t)&&s.push(i):s.push(i),e=i}return s}(l,`.${s.slideClass}, swiper-slide`)[0]
s.loop&&!e&&(e=t[0]),e&&e.classList.add(s.slideNextClass)
let i=function elementPrevAll(e,t){const s=[]
for(;e.previousElementSibling;){const i=e.previousElementSibling
t?i.matches(t)&&s.push(i):s.push(i),e=i}return s}(l,`.${s.slideClass}, swiper-slide`)[0]
s.loop&&0===!i&&(i=t[t.length-1]),i&&i.classList.add(s.slidePrevClass)}e.emitSlidesClasses()},updateActiveIndex:function updateActiveIndex(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{snapGrid:i,params:r,activeIndex:n,realIndex:a,snapIndex:l}=t
let o,d=e
const p=e=>{let s=e-t.virtual.slidesBefore
return s<0&&(s=t.virtual.slides.length+s),s>=t.virtual.slides.length&&(s-=t.virtual.slides.length),s}
if(void 0===d&&(d=function getActiveIndexByTranslate(e){const{slidesGrid:t,params:s}=e,i=e.rtlTranslate?e.translate:-e.translate
let r
for(let e=0;e<t.length;e+=1)void 0!==t[e+1]?i>=t[e]&&i<t[e+1]-(t[e+1]-t[e])/2?r=e:i>=t[e]&&i<t[e+1]&&(r=e+1):i>=t[e]&&(r=e)
return s.normalizeSlideIndex&&(r<0||void 0===r)&&(r=0),r}(t)),i.indexOf(s)>=0)o=i.indexOf(s)
else{const e=Math.min(r.slidesPerGroupSkip,d)
o=e+Math.floor((d-e)/r.slidesPerGroup)}if(o>=i.length&&(o=i.length-1),d===n)return o!==l&&(t.snapIndex=o,t.emit("snapIndexChange")),void(t.params.loop&&t.virtual&&t.params.virtual.enabled&&(t.realIndex=p(d)))
let u
u=t.virtual&&r.virtual.enabled&&r.loop?p(d):t.slides[d]?parseInt(t.slides[d].getAttribute("data-swiper-slide-index")||d,10):d,Object.assign(t,{previousSnapIndex:l,snapIndex:o,previousRealIndex:a,realIndex:u,previousIndex:n,activeIndex:d}),t.initialized&&c(t),t.emit("activeIndexChange"),t.emit("snapIndexChange"),a!==u&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")},updateClickedSlide:function updateClickedSlide(e){const t=this,s=t.params,i=e.closest(`.${s.slideClass}, swiper-slide`)
let r,n=!1
if(i)for(let e=0;e<t.slides.length;e+=1)if(t.slides[e]===i){n=!0,r=e
break}if(!i||!n)return t.clickedSlide=void 0,void(t.clickedIndex=void 0)
t.clickedSlide=i,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(i.getAttribute("data-swiper-slide-index"),10):t.clickedIndex=r,s.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}},translate:{getTranslate:function getSwiperTranslate(e=(this.isHorizontal()?"x":"y")){const{params:t,rtlTranslate:s,translate:i,wrapperEl:r}=this
if(t.virtualTranslate)return s?-i:i
if(t.cssMode)return i
let n=getTranslate(r,e)
return n+=this.cssOverflowAdjustment(),s&&(n=-n),n||0},setTranslate:function setTranslate_setTranslate(e,t){const s=this,{rtlTranslate:i,params:r,wrapperEl:n,progress:a}=s
let l,o=0,d=0
s.isHorizontal()?o=i?-e:e:d=e,r.roundLengths&&(o=Math.floor(o),d=Math.floor(d)),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?o:d,r.cssMode?n[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-o:-d:r.virtualTranslate||(s.isHorizontal()?o-=s.cssOverflowAdjustment():d-=s.cssOverflowAdjustment(),n.style.transform=`translate3d(${o}px, ${d}px, 0px)`)
const c=s.maxTranslate()-s.minTranslate();(l=0===c?0:(e-s.minTranslate())/c)!==a&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function minTranslate_minTranslate(){return-this.snapGrid[0]},maxTranslate:function maxTranslate_maxTranslate(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function translateTo(e=0,t=this.params.speed,s=!0,i=!0,r){const n=this,{params:a,wrapperEl:l}=n
if(n.animating&&a.preventInteractionOnTransition)return!1
const o=n.minTranslate(),d=n.maxTranslate()
let c
if(c=i&&e>o?o:i&&e<d?d:e,n.updateProgress(c),a.cssMode){const e=n.isHorizontal()
if(0===t)l[e?"scrollLeft":"scrollTop"]=-c
else{if(!n.support.smoothScroll)return animateCSSModeScroll({swiper:n,targetPosition:-c,side:e?"left":"top"}),!0
l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(n.setTransition(0),n.setTranslate(c),s&&(n.emit("beforeTransitionStart",t,r),n.emit("transitionEnd"))):(n.setTransition(t),n.setTranslate(c),s&&(n.emit("beforeTransitionStart",t,r),n.emit("transitionStart")),n.animating||(n.animating=!0,n.onTranslateToWrapperTransitionEnd||(n.onTranslateToWrapperTransitionEnd=function transitionEnd(e){n&&!n.destroyed&&e.target===this&&(n.wrapperEl.removeEventListener("transitionend",n.onTranslateToWrapperTransitionEnd),n.onTranslateToWrapperTransitionEnd=null,delete n.onTranslateToWrapperTransitionEnd,s&&n.emit("transitionEnd"))}),n.wrapperEl.addEventListener("transitionend",n.onTranslateToWrapperTransitionEnd))),!0}},transition:{setTransition:function setTransition_setTransition(e,t){const s=this
s.params.cssMode||(s.wrapperEl.style.transitionDuration=`${e}ms`),s.emit("setTransition",e,t)},transitionStart:function transitionStart(e=!0,t){const s=this,{params:i}=s
i.cssMode||(i.autoHeight&&s.updateAutoHeight(),transitionEmit({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function transitionEnd(e=!0,t){const{params:s}=this
this.animating=!1,s.cssMode||(this.setTransition(0),transitionEmit({swiper:this,runCallbacks:e,direction:t,step:"End"}))}},slide:{slideTo:function slideTo(e=0,t=this.params.speed,s=!0,i,r){"string"==typeof e&&(e=parseInt(e,10))
const n=this
let a=e
a<0&&(a=0)
const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:m,enabled:f}=n
if(n.animating&&l.preventInteractionOnTransition||!f&&!i&&!r)return!1
const h=Math.min(n.params.slidesPerGroupSkip,a)
let g=h+Math.floor((a-h)/n.params.slidesPerGroup)
g>=o.length&&(g=o.length-1)
const v=-o[g]
if(l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*v),s=Math.floor(100*d[e]),i=Math.floor(100*d[e+1])
void 0!==d[e+1]?t>=s&&t<i-(i-s)/2?a=e:t>=s&&t<i&&(a=e+1):t>=s&&(a=e)}if(n.initialized&&a!==p){if(!n.allowSlideNext&&(u?v>n.translate&&v>n.minTranslate():v<n.translate&&v<n.minTranslate()))return!1
if(!n.allowSlidePrev&&v>n.translate&&v>n.maxTranslate()&&(p||0)!==a)return!1}let w
if(a!==(c||0)&&s&&n.emit("beforeSlideChangeStart"),n.updateProgress(v),w=a>p?"next":a<p?"prev":"reset",u&&-v===n.translate||!u&&v===n.translate)return n.updateActiveIndex(a),l.autoHeight&&n.updateAutoHeight(),n.updateSlidesClasses(),"slide"!==l.effect&&n.setTranslate(v),"reset"!==w&&(n.transitionStart(s,w),n.transitionEnd(s,w)),!1
if(l.cssMode){const e=n.isHorizontal(),s=u?v:-v
if(0===t){const t=n.virtual&&n.params.virtual.enabled
t&&(n.wrapperEl.style.scrollSnapType="none",n._immediateVirtual=!0),t&&!n._cssModeVirtualInitialSet&&n.params.initialSlide>0?(n._cssModeVirtualInitialSet=!0,requestAnimationFrame(()=>{m[e?"scrollLeft":"scrollTop"]=s})):m[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame(()=>{n.wrapperEl.style.scrollSnapType="",n._immediateVirtual=!1})}else{if(!n.support.smoothScroll)return animateCSSModeScroll({swiper:n,targetPosition:s,side:e?"left":"top"}),!0
m.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return n.setTransition(t),n.setTranslate(v),n.updateActiveIndex(a),n.updateSlidesClasses(),n.emit("beforeTransitionStart",t,i),n.transitionStart(s,w),0===t?n.transitionEnd(s,w):n.animating||(n.animating=!0,n.onSlideToWrapperTransitionEnd||(n.onSlideToWrapperTransitionEnd=function transitionEnd(e){n&&!n.destroyed&&e.target===this&&(n.wrapperEl.removeEventListener("transitionend",n.onSlideToWrapperTransitionEnd),n.onSlideToWrapperTransitionEnd=null,delete n.onSlideToWrapperTransitionEnd,n.transitionEnd(s,w))}),n.wrapperEl.addEventListener("transitionend",n.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function slideToLoop(e=0,t=this.params.speed,s=!0,i){"string"==typeof e&&(e=parseInt(e,10))
const r=this
let n=e
return r.params.loop&&(r.virtual&&r.params.virtual.enabled?n+=r.virtual.slidesBefore:n=r.getSlideIndexByData(n)),r.slideTo(n,t,s,i)},slideNext:function slideNext(e=this.params.speed,t=!0,s){const i=this,{enabled:r,params:n,animating:a}=i
if(!r)return i
let l=n.slidesPerGroup
"auto"===n.slidesPerView&&1===n.slidesPerGroup&&n.slidesPerGroupAuto&&(l=Math.max(i.slidesPerViewDynamic("current",!0),1))
const o=i.activeIndex<n.slidesPerGroupSkip?1:l,d=i.virtual&&n.virtual.enabled
if(n.loop){if(a&&!d&&n.loopPreventsSliding)return!1
i.loopFix({direction:"next"}),i._clientLeft=i.wrapperEl.clientLeft}return n.rewind&&i.isEnd?i.slideTo(0,e,t,s):i.slideTo(i.activeIndex+o,e,t,s)},slidePrev:function slidePrev(e=this.params.speed,t=!0,s){const i=this,{params:r,snapGrid:n,slidesGrid:a,rtlTranslate:l,enabled:o,animating:d}=i
if(!o)return i
const c=i.virtual&&r.virtual.enabled
if(r.loop){if(d&&!c&&r.loopPreventsSliding)return!1
i.loopFix({direction:"prev"}),i._clientLeft=i.wrapperEl.clientLeft}function normalize(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const p=normalize(l?i.translate:-i.translate),u=n.map(e=>normalize(e))
let m=n[u.indexOf(p)-1]
if(void 0===m&&r.cssMode){let e
n.forEach((t,s)=>{p>=t&&(e=s)}),void 0!==e&&(m=n[e>0?e-1:e])}let f=0
if(void 0!==m&&((f=a.indexOf(m))<0&&(f=i.activeIndex-1),"auto"===r.slidesPerView&&1===r.slidesPerGroup&&r.slidesPerGroupAuto&&(f=f-i.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),r.rewind&&i.isBeginning){const r=i.params.virtual&&i.params.virtual.enabled&&i.virtual?i.virtual.slides.length-1:i.slides.length-1
return i.slideTo(r,e,t,s)}return i.slideTo(f,e,t,s)},slideReset:function slideReset(e=this.params.speed,t=!0,s){return this.slideTo(this.activeIndex,e,t,s)},slideToClosest:function slideToClosest(e=this.params.speed,t=!0,s,i=.5){const r=this
let n=r.activeIndex
const a=Math.min(r.params.slidesPerGroupSkip,n),l=a+Math.floor((n-a)/r.params.slidesPerGroup),o=r.rtlTranslate?r.translate:-r.translate
if(o>=r.snapGrid[l]){const e=r.snapGrid[l]
o-e>(r.snapGrid[l+1]-e)*i&&(n+=r.params.slidesPerGroup)}else{const e=r.snapGrid[l-1]
o-e<=(r.snapGrid[l]-e)*i&&(n-=r.params.slidesPerGroup)}return n=Math.max(n,0),n=Math.min(n,r.slidesGrid.length-1),r.slideTo(n,e,t,s)},slideToClickedSlide:function slideToClickedSlide(){const e=this,{params:t,slidesEl:s}=e,i="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView
let r,n=e.clickedIndex
const a=e.isElement?"swiper-slide":`.${t.slideClass}`
if(t.loop){if(e.animating)return
r=parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10),t.centeredSlides?n<e.loopedSlides-i/2||n>e.slides.length-e.loopedSlides+i/2?(e.loopFix(),n=e.getSlideIndex(elementChildren(s,`${a}[data-swiper-slide-index="${r}"]`)[0]),nextTick(()=>{e.slideTo(n)})):e.slideTo(n):n>e.slides.length-i?(e.loopFix(),n=e.getSlideIndex(elementChildren(s,`${a}[data-swiper-slide-index="${r}"]`)[0]),nextTick(()=>{e.slideTo(n)})):e.slideTo(n)}else e.slideTo(n)}},loop:{loopCreate:function loopCreate(e){const{params:t,slidesEl:s}=this
!t.loop||this.virtual&&this.params.virtual.enabled||(elementChildren(s,`.${t.slideClass}, swiper-slide`).forEach((e,t)=>{e.setAttribute("data-swiper-slide-index",t)}),this.loopFix({slideRealIndex:e,direction:t.centeredSlides?void 0:"next"}))},loopFix:function loopFix({slideRealIndex:e,slideTo:t=!0,direction:s,setTranslate:i,activeSlideIndex:r,byController:n,byMousewheel:a}={}){const l=this
if(!l.params.loop)return
l.emit("beforeLoopFix")
const{slides:o,allowSlidePrev:d,allowSlideNext:c,slidesEl:p,params:u}=l
if(l.allowSlidePrev=!0,l.allowSlideNext=!0,l.virtual&&u.virtual.enabled)return t&&(u.centeredSlides||0!==l.snapIndex?u.centeredSlides&&l.snapIndex<u.slidesPerView?l.slideTo(l.virtual.slides.length+l.snapIndex,0,!1,!0):l.snapIndex===l.snapGrid.length-1&&l.slideTo(l.virtual.slidesBefore,0,!1,!0):l.slideTo(l.virtual.slides.length,0,!1,!0)),l.allowSlidePrev=d,l.allowSlideNext=c,void l.emit("loopFix")
const m="auto"===u.slidesPerView?l.slidesPerViewDynamic():Math.ceil(parseFloat(u.slidesPerView,10))
let f=u.loopedSlides||m
f%u.slidesPerGroup!=0&&(f+=u.slidesPerGroup-f%u.slidesPerGroup),l.loopedSlides=f
const h=[],g=[]
let v=l.activeIndex
void 0===r?r=l.getSlideIndex(l.slides.filter(e=>e.classList.contains(u.slideActiveClass))[0]):v=r
const w="next"===s||!s,b="prev"===s||!s
let S=0,y=0
if(r<f){S=Math.max(f-r,u.slidesPerGroup)
for(let e=0;e<f-r;e+=1){const t=e-Math.floor(e/o.length)*o.length
h.push(o.length-t-1)}}else if(r>l.slides.length-2*f){y=Math.max(r-(l.slides.length-2*f),u.slidesPerGroup)
for(let e=0;e<y;e+=1){const t=e-Math.floor(e/o.length)*o.length
g.push(t)}}if(b&&h.forEach(e=>{l.slides[e].swiperLoopMoveDOM=!0,p.prepend(l.slides[e]),l.slides[e].swiperLoopMoveDOM=!1}),w&&g.forEach(e=>{l.slides[e].swiperLoopMoveDOM=!0,p.append(l.slides[e]),l.slides[e].swiperLoopMoveDOM=!1}),l.recalcSlides(),"auto"===u.slidesPerView&&l.updateSlides(),u.watchSlidesProgress&&l.updateSlidesOffset(),t)if(h.length>0&&b)if(void 0===e){const e=l.slidesGrid[v],t=l.slidesGrid[v+S]-e
a?l.setTranslate(l.translate-t):(l.slideTo(v+S,0,!1,!0),i&&(l.touches[l.isHorizontal()?"startX":"startY"]+=t))}else i&&l.slideToLoop(e,0,!1,!0)
else if(g.length>0&&w)if(void 0===e){const e=l.slidesGrid[v],t=l.slidesGrid[v-y]-e
a?l.setTranslate(l.translate-t):(l.slideTo(v-y,0,!1,!0),i&&(l.touches[l.isHorizontal()?"startX":"startY"]+=t))}else l.slideToLoop(e,0,!1,!0)
if(l.allowSlidePrev=d,l.allowSlideNext=c,l.controller&&l.controller.control&&!n){const t={slideRealIndex:e,slideTo:!1,direction:s,setTranslate:i,activeSlideIndex:r,byController:!0}
Array.isArray(l.controller.control)?l.controller.control.forEach(e=>{!e.destroyed&&e.params.loop&&e.loopFix(t)}):l.controller.control instanceof l.constructor&&l.controller.control.params.loop&&l.controller.control.loopFix(t)}l.emit("loopFix")},loopDestroy:function loopDestroy(){const{params:e,slidesEl:t}=this
if(!e.loop||this.virtual&&this.params.virtual.enabled)return
this.recalcSlides()
const s=[]
this.slides.forEach(e=>{const t=void 0===e.swiperSlideIndex?1*e.getAttribute("data-swiper-slide-index"):e.swiperSlideIndex
s[t]=e}),this.slides.forEach(e=>{e.removeAttribute("data-swiper-slide-index")}),s.forEach(e=>{t.append(e)}),this.recalcSlides(),this.slideTo(this.realIndex,0)}},grabCursor:{setGrabCursor:function setGrabCursor(e){const t=this
if(!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return
const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl
t.isElement&&(t.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",t.isElement&&requestAnimationFrame(()=>{t.__preventObserver__=!1})},unsetGrabCursor:function unsetGrabCursor(){const e=this
e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame(()=>{e.__preventObserver__=!1}))}},events:{attachEvents:function attachEvents(){const e=this,t=getDocument(),{params:s}=e
e.onTouchStart=onTouchStart_onTouchStart.bind(e),e.onTouchMove=function onTouchMove_onTouchMove(e){const t=getDocument(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:a,enabled:l}=s
if(!l)return
if(!r.simulateTouch&&"mouse"===e.pointerType)return
let o=e
if(o.originalEvent&&(o=o.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",o))
const d=i.evCache.findIndex(e=>e.pointerId===o.pointerId)
d>=0&&(i.evCache[d]=o)
const c=i.evCache.length>1?i.evCache[0]:o,p=c.pageX,u=c.pageY
if(o.preventedByNestedSwiper)return n.startX=p,void(n.startY=u)
if(!s.allowTouchMove)return o.target.matches(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:p,startY:u,prevX:s.touches.currentX,prevY:s.touches.currentY,currentX:p,currentY:u}),i.touchStartTime=now()))
if(r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(u<n.startY&&s.translate<=s.maxTranslate()||u>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(p<n.startX&&s.translate<=s.maxTranslate()||p>n.startX&&s.translate>=s.minTranslate())return
if(t.activeElement&&o.target===t.activeElement&&o.target.matches(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1)
if(i.allowTouchCallbacks&&s.emit("touchMove",o),o.targetTouches&&o.targetTouches.length>1)return
n.currentX=p,n.currentY=u
const m=n.currentX-n.startX,f=n.currentY-n.startY
if(s.params.threshold&&Math.sqrt(m**2+f**2)<s.params.threshold)return
if(void 0===i.isScrolling){let e
s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:m*m+f*f>=25&&(e=180*Math.atan2(Math.abs(f),Math.abs(m))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",o),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling||s.zoom&&s.params.zoom&&s.params.zoom.enabled&&i.evCache.length>1)return void(i.isTouched=!1)
if(!i.startMoving)return
s.allowClick=!1,!r.cssMode&&o.cancelable&&o.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&o.stopPropagation()
let h=s.isHorizontal()?m:f,g=s.isHorizontal()?n.currentX-n.previousX:n.currentY-n.previousY
r.oneWayMovement&&(h=Math.abs(h)*(a?1:-1),g=Math.abs(g)*(a?1:-1)),n.diff=h,h*=r.touchRatio,a&&(h=-h,g=-g)
const v=s.touchesDirection
s.swipeDirection=h>0?"prev":"next",s.touchesDirection=g>0?"prev":"next"
const w=s.params.loop&&!r.cssMode
if(!i.isMoved){if(w&&s.loopFix({direction:s.swipeDirection}),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating){const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0})
s.wrapperEl.dispatchEvent(e)}i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",o)}let b
i.isMoved&&v!==s.touchesDirection&&w&&Math.abs(h)>=1&&(s.loopFix({direction:s.swipeDirection,setTranslate:!0}),b=!0),s.emit("sliderMove",o),i.isMoved=!0,i.currentTranslate=h+i.startTranslate
let S=!0,y=r.resistanceRatio
if(r.touchReleaseOnEdges&&(y=0),h>0?(w&&!b&&i.currentTranslate>(r.centeredSlides?s.minTranslate()-s.size/2:s.minTranslate())&&s.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>s.minTranslate()&&(S=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+h)**y))):h<0&&(w&&!b&&i.currentTranslate<(r.centeredSlides?s.maxTranslate()+s.size/2:s.maxTranslate())&&s.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:s.slides.length-("auto"===r.slidesPerView?s.slidesPerViewDynamic():Math.ceil(parseFloat(r.slidesPerView,10)))}),i.currentTranslate<s.maxTranslate()&&(S=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-h)**y))),S&&(o.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(h)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate)
if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),r.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}.bind(e),e.onTouchEnd=function onTouchEnd_onTouchEnd(e){const t=this,s=t.touchEventsData,i=s.evCache.findIndex(t=>t.pointerId===e.pointerId)
if(i>=0&&s.evCache.splice(i,1),["pointercancel","pointerout","pointerleave"].includes(e.type)&&("pointercancel"!==e.type||!t.browser.isSafari&&!t.browser.isWebView))return
const{params:r,touches:n,rtlTranslate:a,slidesGrid:l,enabled:o}=t
if(!o)return
if(!r.simulateTouch&&"mouse"===e.pointerType)return
let d=e
if(d.originalEvent&&(d=d.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",d),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&r.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1)
r.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1)
const c=now(),p=c-s.touchStartTime
if(t.allowClick){const e=d.path||d.composedPath&&d.composedPath()
t.updateClickedSlide(e&&e[0]||d.target),t.emit("tap click",d),p<300&&c-s.lastClickTime<300&&t.emit("doubleTap doubleClick",d)}if(s.lastClickTime=now(),nextTick(()=>{t.destroyed||(t.allowClick=!0)}),!s.isTouched||!s.isMoved||!t.swipeDirection||0===n.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1)
let u
if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,u=r.followFinger?a?t.translate:-t.translate:-s.currentTranslate,r.cssMode)return
if(r.freeMode&&r.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:u})
let m=0,f=t.slidesSizesGrid[0]
for(let e=0;e<l.length;e+=e<r.slidesPerGroupSkip?1:r.slidesPerGroup){const t=e<r.slidesPerGroupSkip-1?1:r.slidesPerGroup
void 0!==l[e+t]?u>=l[e]&&u<l[e+t]&&(m=e,f=l[e+t]-l[e]):u>=l[e]&&(m=e,f=l[l.length-1]-l[l.length-2])}let h=null,g=null
r.rewind&&(t.isBeginning?g=r.virtual&&r.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(h=0))
const v=(u-l[m])/f,w=m<r.slidesPerGroupSkip-1?1:r.slidesPerGroup
if(p>r.longSwipesMs){if(!r.longSwipes)return void t.slideTo(t.activeIndex)
"next"===t.swipeDirection&&(v>=r.longSwipesRatio?t.slideTo(r.rewind&&t.isEnd?h:m+w):t.slideTo(m)),"prev"===t.swipeDirection&&(v>1-r.longSwipesRatio?t.slideTo(m+w):null!==g&&v<0&&Math.abs(v)>r.longSwipesRatio?t.slideTo(g):t.slideTo(m))}else{if(!r.shortSwipes)return void t.slideTo(t.activeIndex)
!t.navigation||d.target!==t.navigation.nextEl&&d.target!==t.navigation.prevEl?("next"===t.swipeDirection&&t.slideTo(null!==h?h:m+w),"prev"===t.swipeDirection&&t.slideTo(null!==g?g:m)):d.target===t.navigation.nextEl?t.slideTo(m+w):t.slideTo(m)}}.bind(e),s.cssMode&&(e.onScroll=function onScroll(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:i}=e
if(!i)return
let r
e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses()
const n=e.maxTranslate()-e.minTranslate();(r=0===n?0:(e.translate-e.minTranslate())/n)!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}.bind(e)),e.onClick=function onClick(e){const t=this
t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}.bind(e),e.onLoad=function onLoad(e){o(this,e.target),this.params.cssMode||"auto"!==this.params.slidesPerView&&!this.params.autoHeight||this.update()}.bind(e),p||(t.addEventListener("touchstart",dummyEventListener),p=!0),u(e,"on")},detachEvents:function detachEvents(){u(this,"off")}},breakpoints:{setBreakpoint:function setBreakpoint(){const e=this,{realIndex:t,initialized:s,params:i,el:r}=e,n=i.breakpoints
if(!n||n&&0===Object.keys(n).length)return
const a=e.getBreakpoint(n,e.params.breakpointsBase,e.el)
if(!a||e.currentBreakpoint===a)return
const l=(a in n?n[a]:void 0)||e.originalParams,o=m(e,i),d=m(e,l),c=i.enabled
o&&!d?(r.classList.remove(`${i.containerModifierClass}grid`,`${i.containerModifierClass}grid-column`),e.emitContainerClasses()):!o&&d&&(r.classList.add(`${i.containerModifierClass}grid`),(l.grid.fill&&"column"===l.grid.fill||!l.grid.fill&&"column"===i.grid.fill)&&r.classList.add(`${i.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach(t=>{if(void 0===l[t])return
const s=i[t]&&i[t].enabled,r=l[t]&&l[t].enabled
s&&!r&&e[t].disable(),!s&&r&&e[t].enable()})
const p=l.direction&&l.direction!==i.direction,u=i.loop&&(l.slidesPerView!==i.slidesPerView||p)
p&&s&&e.changeDirection(),utils_extend(e.params,l)
const f=e.params.enabled
Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),c&&!f?e.disable():!c&&f&&e.enable(),e.currentBreakpoint=a,e.emit("_beforeBreakpoint",l),u&&s&&(e.loopDestroy(),e.loopCreate(t),e.updateSlides()),e.emit("breakpoint",l)},getBreakpoint:function getBreakpoint(e,t="window",s){if(!e||"container"===t&&!s)return
let i=!1
const r=getWindow(),n="window"===t?r.innerHeight:s.clientHeight,a=Object.keys(e).map(e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1))
return{value:n*t,point:e}}return{value:e,point:e}})
a.sort((e,t)=>parseInt(e.value,10)-parseInt(t.value,10))
for(let e=0;e<a.length;e+=1){const{point:n,value:l}=a[e]
"window"===t?r.matchMedia(`(min-width: ${l}px)`).matches&&(i=n):l<=s.clientWidth&&(i=n)}return i||"max"}},checkOverflow:{checkOverflow:function checkOverflow(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:i}=s
if(i){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*i
e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length
!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:{addClasses:function addClasses(){const{classNames:e,params:t,rtl:s,el:i,device:r}=this,n=function prepareClasses(e,t){const s=[]
return e.forEach(e=>{"object"==typeof e?Object.keys(e).forEach(i=>{e[i]&&s.push(t+i)}):"string"==typeof e&&s.push(t+e)}),s}(["initialized",t.direction,{"free-mode":this.params.freeMode&&t.freeMode.enabled},{autoheight:t.autoHeight},{rtl:s},{grid:t.grid&&t.grid.rows>1},{"grid-column":t.grid&&t.grid.rows>1&&"column"===t.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":t.cssMode},{centered:t.cssMode&&t.centeredSlides},{"watch-progress":t.watchSlidesProgress}],t.containerModifierClass)
e.push(...n),i.classList.add(...e),this.emitContainerClasses()},removeClasses:function removeClasses(){const{el:e,classNames:t}=this
e.classList.remove(...t),this.emitContainerClasses()}}},g={}
class core_Swiper{constructor(...e){let t,s
1===e.length&&e[0].constructor&&"Object"===Object.prototype.toString.call(e[0]).slice(8,-1)?s=e[0]:[t,s]=e,s||(s={}),s=utils_extend({},s),t&&!s.el&&(s.el=t)
const i=getDocument()
if(s.el&&"string"==typeof s.el&&i.querySelectorAll(s.el).length>1){const e=[]
return i.querySelectorAll(s.el).forEach(t=>{const i=utils_extend({},s,{el:t})
e.push(new core_Swiper(i))}),e}const r=this
r.__swiper__=!0,r.support=getSupport(),r.device=getDevice({userAgent:s.userAgent}),r.browser=getBrowser(),r.eventsListeners={},r.eventsAnyListeners=[],r.modules=[...r.__modules__],s.modules&&Array.isArray(s.modules)&&r.modules.push(...s.modules)
const n={}
r.modules.forEach(e=>{e({params:s,swiper:r,extendParams:moduleExtendParams(s,n),on:r.on.bind(r),once:r.once.bind(r),off:r.off.bind(r),emit:r.emit.bind(r)})})
const a=utils_extend({},f,n)
return r.params=utils_extend({},a,g,s),r.originalParams=utils_extend({},r.params),r.passedParams=utils_extend({},s),r.params&&r.params.on&&Object.keys(r.params.on).forEach(e=>{r.on(e,r.params.on[e])}),r.params&&r.params.onAny&&r.onAny(r.params.onAny),Object.assign(r,{enabled:r.params.enabled,el:t,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===r.params.direction,isVertical:()=>"vertical"===r.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:r.params.allowSlideNext,allowSlidePrev:r.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:r.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,evCache:[]},allowClick:!0,allowTouchMove:r.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),r.emit("_swiper"),r.params.init&&r.init(),r}getSlideIndex(e){const{slidesEl:t,params:s}=this,i=elementIndex(elementChildren(t,`.${s.slideClass}, swiper-slide`)[0])
return elementIndex(e)-i}getSlideIndexByData(e){return this.getSlideIndex(this.slides.filter(t=>1*t.getAttribute("data-swiper-slide-index")===e)[0])}recalcSlides(){const{slidesEl:e,params:t}=this
this.slides=elementChildren(e,`.${t.slideClass}, swiper-slide`)}enable(){const e=this
e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this
e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){e=Math.min(Math.max(e,0),1)
const s=this.minTranslate(),i=(this.maxTranslate()-s)*e+s
this.translateTo(i,void 0===t?0:t),this.updateActiveIndex(),this.updateSlidesClasses()}emitContainerClasses(){const e=this
if(!e.params._emitClasses||!e.el)return
const t=e.el.className.split(" ").filter(t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass))
e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this
return t.destroyed?"":e.className.split(" ").filter(e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass)).join(" ")}emitSlidesClasses(){const e=this
if(!e.params._emitClasses||!e.el)return
const t=[]
e.slides.forEach(s=>{const i=e.getSlideClasses(s)
t.push({slideEl:s,classNames:i}),e.emit("_slideClass",s,i)}),e.emit("_slideClasses",t)}slidesPerViewDynamic(e="current",t=!1){const{params:s,slides:i,slidesGrid:r,slidesSizesGrid:n,size:a,activeIndex:l}=this
let o=1
if(s.centeredSlides){let e,t=i[l]?i[l].swiperSlideSize:0
for(let s=l+1;s<i.length;s+=1)i[s]&&!e&&(o+=1,(t+=i[s].swiperSlideSize)>a&&(e=!0))
for(let s=l-1;s>=0;s-=1)i[s]&&!e&&(o+=1,(t+=i[s].swiperSlideSize)>a&&(e=!0))}else if("current"===e)for(let e=l+1;e<i.length;e+=1){(t?r[e]+n[e]-r[l]<a:r[e]-r[l]<a)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){r[l]-r[e]<a&&(o+=1)}return o}update(){const e=this
if(!e||e.destroyed)return
const{snapGrid:t,params:s}=e
function setTranslate(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate())
e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i
if(s.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach(t=>{t.complete&&o(e,t)}),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),s.freeMode&&s.freeMode.enabled&&!s.cssMode)setTranslate(),s.autoHeight&&e.updateAutoHeight()
else{if(("auto"===s.slidesPerView||s.slidesPerView>1)&&e.isEnd&&!s.centeredSlides){const t=e.virtual&&s.virtual.enabled?e.virtual.slides:e.slides
i=e.slideTo(t.length-1,0,!1,!0)}else i=e.slideTo(e.activeIndex,0,!1,!0)
i||setTranslate()}s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t=!0){const s=this,i=s.params.direction
return e||(e="horizontal"===i?"vertical":"horizontal"),e===i||"horizontal"!==e&&"vertical"!==e?s:(s.el.classList.remove(`${s.params.containerModifierClass}${i}`),s.el.classList.add(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.forEach(t=>{"vertical"===e?t.style.width="":t.style.height=""}),s.emit("changeDirection"),t&&s.update(),s)}changeLanguageDirection(e){const t=this
t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this
if(t.mounted)return!0
let s=e||t.params.el
if("string"==typeof s&&(s=document.querySelector(s)),!s)return!1
s.swiper=t,s.shadowEl&&(t.isElement=!0)
const i=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`
let r=(()=>{if(s&&s.shadowRoot&&s.shadowRoot.querySelector)return s.shadowRoot.querySelector(i())
return elementChildren(s,i())[0]})()
return!r&&t.params.createElements&&(r=createElement("div",t.params.wrapperClass),s.append(r),elementChildren(s,`.${t.params.slideClass}`).forEach(e=>{r.append(e)})),Object.assign(t,{el:s,wrapperEl:r,slidesEl:t.isElement?s:r,mounted:!0,rtl:"rtl"===s.dir.toLowerCase()||"rtl"===elementStyle(s,"direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===s.dir.toLowerCase()||"rtl"===elementStyle(s,"direction")),wrongRTL:"-webkit-box"===elementStyle(r,"display")}),!0}init(e){const t=this
return t.initialized?t:!1===t.mount(e)?t:(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(),t.attachEvents(),[...t.el.querySelectorAll('[loading="lazy"]')].forEach(e=>{e.complete?o(t,e):e.addEventListener("load",e=>{o(t,e.target)})}),c(t),t.initialized=!0,c(t),t.emit("init"),t.emit("afterInit"),t)}destroy(e=!0,t=!0){const s=this,{params:i,el:r,wrapperEl:n,slides:a}=s
return void 0===s.params||s.destroyed?null:(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),i.loop&&s.loopDestroy(),t&&(s.removeClasses(),r.removeAttribute("style"),n.removeAttribute("style"),a&&a.length&&a.forEach(e=>{e.classList.remove(i.slideVisibleClass,i.slideActiveClass,i.slideNextClass,i.slidePrevClass),e.removeAttribute("style"),e.removeAttribute("data-swiper-slide-index")})),s.emit("destroy"),Object.keys(s.eventsListeners).forEach(e=>{s.off(e)}),!1!==e&&(s.el.swiper=null,function deleteProps(e){const t=e
Object.keys(t).forEach(e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}})}(s)),s.destroyed=!0,null)}static extendDefaults(e){utils_extend(g,e)}static get extendedDefaults(){return g}static get defaults(){return f}static installModule(e){core_Swiper.prototype.__modules__||(core_Swiper.prototype.__modules__=[])
const t=core_Swiper.prototype.__modules__
"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach(e=>core_Swiper.installModule(e)),core_Swiper):(core_Swiper.installModule(e),core_Swiper)}}Object.keys(h).forEach(e=>{Object.keys(h[e]).forEach(t=>{core_Swiper.prototype[t]=h[e][t]})}),core_Swiper.use([function Resize({swiper:e,on:t,emit:s}){const i=getWindow()
let r=null,n=null
const a=()=>{e&&!e.destroyed&&e.initialized&&(s("beforeResize"),s("resize"))},l=()=>{e&&!e.destroyed&&e.initialized&&s("orientationchange")}
t("init",()=>{e.params.resizeObserver&&void 0!==i.ResizeObserver?e&&!e.destroyed&&e.initialized&&(r=new ResizeObserver(t=>{n=i.requestAnimationFrame(()=>{const{width:s,height:i}=e
let r=s,n=i
t.forEach(({contentBoxSize:t,contentRect:s,target:i})=>{i&&i!==e.el||(r=s?s.width:(t[0]||t).inlineSize,n=s?s.height:(t[0]||t).blockSize)}),r===s&&n===i||a()})})).observe(e.el):(i.addEventListener("resize",a),i.addEventListener("orientationchange",l))}),t("destroy",()=>{n&&i.cancelAnimationFrame(n),r&&r.unobserve&&e.el&&(r.unobserve(e.el),r=null),i.removeEventListener("resize",a),i.removeEventListener("orientationchange",l)})},function Observer({swiper:e,extendParams:t,on:s,emit:i}){const r=[],n=getWindow(),a=(t,s={})=>{const a=new(n.MutationObserver||n.WebkitMutationObserver)(t=>{if(e.__preventObserver__)return
if(1===t.length)return void i("observerUpdate",t[0])
const s=function observerUpdate(){i("observerUpdate",t[0])}
n.requestAnimationFrame?n.requestAnimationFrame(s):n.setTimeout(s,0)})
a.observe(t,{attributes:void 0===s.attributes||s.attributes,childList:void 0===s.childList||s.childList,characterData:void 0===s.characterData||s.characterData}),r.push(a)}
t({observer:!1,observeParents:!1,observeSlideChildren:!1}),s("init",()=>{if(e.params.observer){if(e.params.observeParents){const t=elementParents(e.el)
for(let e=0;e<t.length;e+=1)a(t[e])}a(e.el,{childList:e.params.observeSlideChildren}),a(e.wrapperEl,{attributes:!1})}}),s("destroy",()=>{r.forEach(e=>{e.disconnect()}),r.splice(0,r.length)})}])
var v=core_Swiper
function createElementIfNotDefined(e,t,s,i){return e.params.createElements&&Object.keys(i).forEach(r=>{if(!s[r]&&!0===s.auto){let n=elementChildren(e.el,`.${i[r]}`)[0]
n||((n=createElement("div",i[r])).className=i[r],e.el.append(n)),s[r]=n,t[r]=n}}),s}function classesToSelector(e=""){return`.${e.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function Pagination({swiper:e,extendParams:t,on:s,emit:i}){const r="swiper-pagination"
let n
t({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),e.pagination={el:null,bullets:[]}
let a=0
const l=e=>(Array.isArray(e)||(e=[e].filter(e=>!!e)),e)
function isPaginationDisabled(){return!e.params.pagination.el||!e.pagination.el||Array.isArray(e.pagination.el)&&0===e.pagination.el.length}function setSideBullets(t,s){const{bulletActiveClass:i}=e.params.pagination
t&&(t=t[`${"prev"===s?"previous":"next"}ElementSibling`])&&(t.classList.add(`${i}-${s}`),(t=t[`${"prev"===s?"previous":"next"}ElementSibling`])&&t.classList.add(`${i}-${s}-${s}`))}function onBulletClick(t){const s=t.target.closest(classesToSelector(e.params.pagination.bulletClass))
if(!s)return
t.preventDefault()
const i=elementIndex(s)*e.params.slidesPerGroup
if(e.params.loop){if(e.realIndex===i)return
const t=e.getSlideIndexByData(i),s=e.getSlideIndexByData(e.realIndex)
t>e.slides.length-e.loopedSlides&&e.loopFix({direction:t>s?"next":"prev",activeSlideIndex:t,slideTo:!1}),e.slideToLoop(i)}else e.slideTo(i)}function update(){const t=e.rtl,s=e.params.pagination
if(isPaginationDisabled())return
let r,o,d=e.pagination.el
d=l(d)
const c=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,p=e.params.loop?Math.ceil(c/e.params.slidesPerGroup):e.snapGrid.length
if(e.params.loop?(o=e.previousRealIndex||0,r=e.params.slidesPerGroup>1?Math.floor(e.realIndex/e.params.slidesPerGroup):e.realIndex):void 0!==e.snapIndex?(r=e.snapIndex,o=e.previousSnapIndex):(o=e.previousIndex||0,r=e.activeIndex||0),"bullets"===s.type&&e.pagination.bullets&&e.pagination.bullets.length>0){const i=e.pagination.bullets
let l,c,p
if(s.dynamicBullets&&(n=elementOuterSize(i[0],e.isHorizontal()?"width":"height",!0),d.forEach(t=>{t.style[e.isHorizontal()?"width":"height"]=`${n*(s.dynamicMainBullets+4)}px`}),s.dynamicMainBullets>1&&void 0!==o&&((a+=r-(o||0))>s.dynamicMainBullets-1?a=s.dynamicMainBullets-1:a<0&&(a=0)),l=Math.max(r-a,0),p=((c=l+(Math.min(i.length,s.dynamicMainBullets)-1))+l)/2),i.forEach(e=>{const t=[...["","-next","-next-next","-prev","-prev-prev","-main"].map(e=>`${s.bulletActiveClass}${e}`)].map(e=>"string"==typeof e&&e.includes(" ")?e.split(" "):e).flat()
e.classList.remove(...t)}),d.length>1)i.forEach(t=>{const i=elementIndex(t)
i===r?t.classList.add(...s.bulletActiveClass.split(" ")):e.isElement&&t.setAttribute("part","bullet"),s.dynamicBullets&&(i>=l&&i<=c&&t.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),i===l&&setSideBullets(t,"prev"),i===c&&setSideBullets(t,"next"))})
else{const t=i[r]
if(t&&t.classList.add(...s.bulletActiveClass.split(" ")),e.isElement&&i.forEach((e,t)=>{e.setAttribute("part",t===r?"bullet-active":"bullet")}),s.dynamicBullets){const e=i[l],t=i[c]
for(let e=l;e<=c;e+=1)i[e]&&i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "))
setSideBullets(e,"prev"),setSideBullets(t,"next")}}if(s.dynamicBullets){const r=Math.min(i.length,s.dynamicMainBullets+4),a=(n*r-n)/2-p*n,l=t?"right":"left"
i.forEach(t=>{t.style[e.isHorizontal()?l:"top"]=`${a}px`})}}d.forEach((t,n)=>{if("fraction"===s.type&&(t.querySelectorAll(classesToSelector(s.currentClass)).forEach(e=>{e.textContent=s.formatFractionCurrent(r+1)}),t.querySelectorAll(classesToSelector(s.totalClass)).forEach(e=>{e.textContent=s.formatFractionTotal(p)})),"progressbar"===s.type){let i
i=s.progressbarOpposite?e.isHorizontal()?"vertical":"horizontal":e.isHorizontal()?"horizontal":"vertical"
const n=(r+1)/p
let a=1,l=1
"horizontal"===i?a=n:l=n,t.querySelectorAll(classesToSelector(s.progressbarFillClass)).forEach(t=>{t.style.transform=`translate3d(0,0,0) scaleX(${a}) scaleY(${l})`,t.style.transitionDuration=`${e.params.speed}ms`})}"custom"===s.type&&s.renderCustom?(t.innerHTML=s.renderCustom(e,r+1,p),0===n&&i("paginationRender",t)):(0===n&&i("paginationRender",t),i("paginationUpdate",t)),e.params.watchOverflow&&e.enabled&&t.classList[e.isLocked?"add":"remove"](s.lockClass)})}function render(){const t=e.params.pagination
if(isPaginationDisabled())return
const s=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length
let r=e.pagination.el
r=l(r)
let n=""
if("bullets"===t.type){let i=e.params.loop?Math.ceil(s/e.params.slidesPerGroup):e.snapGrid.length
e.params.freeMode&&e.params.freeMode.enabled&&i>s&&(i=s)
for(let s=0;s<i;s+=1)t.renderBullet?n+=t.renderBullet.call(e,s,t.bulletClass):n+=`<${t.bulletElement} ${e.isElement?'part="bullet"':""} class="${t.bulletClass}"></${t.bulletElement}>`}"fraction"===t.type&&(n=t.renderFraction?t.renderFraction.call(e,t.currentClass,t.totalClass):`<span class="${t.currentClass}"></span>`+" / "+`<span class="${t.totalClass}"></span>`),"progressbar"===t.type&&(n=t.renderProgressbar?t.renderProgressbar.call(e,t.progressbarFillClass):`<span class="${t.progressbarFillClass}"></span>`),e.pagination.bullets=[],r.forEach(s=>{"custom"!==t.type&&(s.innerHTML=n||""),"bullets"===t.type&&e.pagination.bullets.push(...s.querySelectorAll(classesToSelector(t.bulletClass)))}),"custom"!==t.type&&i("paginationRender",r[0])}function init(){e.params.pagination=createElementIfNotDefined(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"})
const t=e.params.pagination
if(!t.el)return
let s
"string"==typeof t.el&&e.isElement&&(s=e.el.shadowRoot.querySelector(t.el)),s||"string"!=typeof t.el||(s=[...document.querySelectorAll(t.el)]),s||(s=t.el),s&&0!==s.length&&(e.params.uniqueNavElements&&"string"==typeof t.el&&Array.isArray(s)&&s.length>1&&(s=[...e.el.querySelectorAll(t.el)]).length>1&&(s=s.filter(t=>elementParents(t,".swiper")[0]===e.el)[0]),Array.isArray(s)&&1===s.length&&(s=s[0]),Object.assign(e.pagination,{el:s}),(s=l(s)).forEach(s=>{"bullets"===t.type&&t.clickable&&s.classList.add(t.clickableClass),s.classList.add(t.modifierClass+t.type),s.classList.add(e.isHorizontal()?t.horizontalClass:t.verticalClass),"bullets"===t.type&&t.dynamicBullets&&(s.classList.add(`${t.modifierClass}${t.type}-dynamic`),a=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&s.classList.add(t.progressbarOppositeClass),t.clickable&&s.addEventListener("click",onBulletClick),e.enabled||s.classList.add(t.lockClass)}))}function destroy(){const t=e.params.pagination
if(isPaginationDisabled())return
let s=e.pagination.el
s&&(s=l(s)).forEach(s=>{s.classList.remove(t.hiddenClass),s.classList.remove(t.modifierClass+t.type),s.classList.remove(e.isHorizontal()?t.horizontalClass:t.verticalClass),t.clickable&&s.removeEventListener("click",onBulletClick)}),e.pagination.bullets&&e.pagination.bullets.forEach(e=>e.classList.remove(...t.bulletActiveClass.split(" ")))}s("changeDirection",()=>{if(!e.pagination||!e.pagination.el)return
const t=e.params.pagination
let{el:s}=e.pagination;(s=l(s)).forEach(s=>{s.classList.remove(t.horizontalClass,t.verticalClass),s.classList.add(e.isHorizontal()?t.horizontalClass:t.verticalClass)})}),s("init",()=>{!1===e.params.pagination.enabled?o():(init(),render(),update())}),s("activeIndexChange",()=>{void 0===e.snapIndex&&update()}),s("snapIndexChange",()=>{update()}),s("snapGridLengthChange",()=>{render(),update()}),s("destroy",()=>{destroy()}),s("enable disable",()=>{let{el:t}=e.pagination
t&&(t=l(t)).forEach(t=>t.classList[e.enabled?"remove":"add"](e.params.pagination.lockClass))}),s("lock unlock",()=>{update()}),s("click",(t,s)=>{const r=s.target
let{el:n}=e.pagination
if(Array.isArray(n)||(n=[n].filter(e=>!!e)),e.params.pagination.el&&e.params.pagination.hideOnClick&&n&&n.length>0&&!r.classList.contains(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&r===e.navigation.nextEl||e.navigation.prevEl&&r===e.navigation.prevEl))return
const t=n[0].classList.contains(e.params.pagination.hiddenClass)
i(!0===t?"paginationShow":"paginationHide"),n.forEach(t=>t.classList.toggle(e.params.pagination.hiddenClass))}})
const o=()=>{e.el.classList.add(e.params.pagination.paginationDisabledClass)
let{el:t}=e.pagination
t&&(t=l(t)).forEach(t=>t.classList.add(e.params.pagination.paginationDisabledClass)),destroy()}
Object.assign(e.pagination,{enable:()=>{e.el.classList.remove(e.params.pagination.paginationDisabledClass)
let{el:t}=e.pagination
t&&(t=l(t)).forEach(t=>t.classList.remove(e.params.pagination.paginationDisabledClass)),init(),render(),update()},disable:o,render,update,init,destroy})}function Autoplay({swiper:e,extendParams:t,on:s,emit:i,params:r}){let n,a
e.autoplay={running:!1,paused:!1,timeLeft:0},t({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}})
let l,o,d,c,p,u,m,f=r&&r.autoplay?r.autoplay.delay:3e3,h=r&&r.autoplay?r.autoplay.delay:3e3,g=(new Date).getTime
function onTransitionEnd(t){e&&!e.destroyed&&e.wrapperEl&&t.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",onTransitionEnd),T())}const v=()=>{if(e.destroyed||!e.autoplay.running)return
e.autoplay.paused?o=!0:o&&(h=l,o=!1)
const t=e.autoplay.paused?l:g+h-(new Date).getTime()
e.autoplay.timeLeft=t,i("autoplayTimeLeft",t,t/f),a=requestAnimationFrame(()=>{v()})},w=t=>{if(e.destroyed||!e.autoplay.running)return
cancelAnimationFrame(a),v()
let s=void 0===t?e.params.autoplay.delay:t
f=e.params.autoplay.delay,h=e.params.autoplay.delay
const r=(()=>{let t
if(!(t=e.virtual&&e.params.virtual.enabled?e.slides.filter(e=>e.classList.contains("swiper-slide-active"))[0]:e.slides[e.activeIndex]))return
return parseInt(t.getAttribute("data-swiper-autoplay"),10)})()
!Number.isNaN(r)&&r>0&&void 0===t&&(s=r,f=r,h=r),l=s
const o=e.params.speed,d=()=>{e&&!e.destroyed&&(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(o,!0,!0),i("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,o,!0,!0),i("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(o,!0,!0),i("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,o,!0,!0),i("autoplay")),e.params.cssMode&&(g=(new Date).getTime(),requestAnimationFrame(()=>{w()})))}
return s>0?(clearTimeout(n),n=setTimeout(()=>{d()},s)):requestAnimationFrame(()=>{d()}),s},b=()=>{e.autoplay.running=!0,w(),i("autoplayStart")},S=()=>{e.autoplay.running=!1,clearTimeout(n),cancelAnimationFrame(a),i("autoplayStop")},y=(t,s)=>{if(e.destroyed||!e.autoplay.running)return
clearTimeout(n),t||(m=!0)
const r=()=>{i("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",onTransitionEnd):T()}
if(e.autoplay.paused=!0,s)return u&&(l=e.params.autoplay.delay),u=!1,void r()
const a=l||e.params.autoplay.delay
l=a-((new Date).getTime()-g),e.isEnd&&l<0&&!e.params.loop||(l<0&&(l=0),r())},T=()=>{e.isEnd&&l<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(g=(new Date).getTime(),m?(m=!1,w(l)):w(),e.autoplay.paused=!1,i("autoplayResume"))},E=()=>{if(e.destroyed||!e.autoplay.running)return
const t=getDocument()
"hidden"===t.visibilityState&&(m=!0,y(!0)),"visible"===t.visibilityState&&T()},x=e=>{"mouse"===e.pointerType&&(m=!0,y(!0))},C=t=>{"mouse"===t.pointerType&&e.autoplay.paused&&T()}
s("init",()=>{e.params.autoplay.enabled&&(e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",x),e.el.addEventListener("pointerleave",C)),getDocument().addEventListener("visibilitychange",E),g=(new Date).getTime(),b())}),s("destroy",()=>{e.el.removeEventListener("pointerenter",x),e.el.removeEventListener("pointerleave",C),getDocument().removeEventListener("visibilitychange",E),e.autoplay.running&&S()}),s("beforeTransitionStart",(t,s,i)=>{!e.destroyed&&e.autoplay.running&&(i||!e.params.autoplay.disableOnInteraction?y(!0,!0):S())}),s("sliderFirstMove",()=>{!e.destroyed&&e.autoplay.running&&(e.params.autoplay.disableOnInteraction?S():(d=!0,c=!1,m=!1,p=setTimeout(()=>{m=!0,c=!0,y(!0)},200)))}),s("touchEnd",()=>{if(!e.destroyed&&e.autoplay.running&&d){if(clearTimeout(p),clearTimeout(n),e.params.autoplay.disableOnInteraction)return c=!1,void(d=!1)
c&&e.params.cssMode&&T(),c=!1,d=!1}}),s("slideChange",()=>{!e.destroyed&&e.autoplay.running&&(u=!0)}),Object.assign(e.autoplay,{start:b,stop:S,pause:y,resume:T})}},c0hC:function(e,t,s){"use strict"
s.d(t,"a",function(){return d}),s.d(t,"b",function(){return c})
var i=s("q1tI"),r=s.n(i),n=s("TaHA")
function isObject(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function extend(e,t){const s=["__proto__","constructor","prototype"]
Object.keys(t).filter(e=>s.indexOf(e)<0).forEach(s=>{void 0===e[s]?e[s]=t[s]:isObject(t[s])&&isObject(e[s])&&Object.keys(t[s]).length>0?t[s].__swiper__?e[s]=t[s]:extend(e[s],t[s]):e[s]=t[s]})}function needsNavigation(e={}){return e.navigation&&void 0===e.navigation.nextEl&&void 0===e.navigation.prevEl}function needsPagination(e={}){return e.pagination&&void 0===e.pagination.el}function needsScrollbar(e={}){return e.scrollbar&&void 0===e.scrollbar.el}function uniqueClasses(e=""){const t=e.split(" ").map(e=>e.trim()).filter(e=>!!e),s=[]
return t.forEach(e=>{s.indexOf(e)<0&&s.push(e)}),s.join(" ")}function wrapperClass(e=""){return e?e.includes("swiper-wrapper")?e:`swiper-wrapper ${e}`:"swiper-wrapper"}const a=["eventsPrefix","injectStyles","injectStylesUrls","modules","init","_direction","oneWayMovement","touchEventsTarget","initialSlide","_speed","cssMode","updateOnWindowResize","resizeObserver","nested","focusableElements","_enabled","_width","_height","preventInteractionOnTransition","userAgent","url","_edgeSwipeDetection","_edgeSwipeThreshold","_freeMode","_autoHeight","setWrapperSize","virtualTranslate","_effect","breakpoints","_spaceBetween","_slidesPerView","maxBackfaceHiddenSlides","_grid","_slidesPerGroup","_slidesPerGroupSkip","_slidesPerGroupAuto","_centeredSlides","_centeredSlidesBounds","_slidesOffsetBefore","_slidesOffsetAfter","normalizeSlideIndex","_centerInsufficientSlides","_watchOverflow","roundLengths","touchRatio","touchAngle","simulateTouch","_shortSwipes","_longSwipes","longSwipesRatio","longSwipesMs","_followFinger","allowTouchMove","_threshold","touchMoveStopPropagation","touchStartPreventDefault","touchStartForcePreventDefault","touchReleaseOnEdges","uniqueNavElements","_resistance","_resistanceRatio","_watchSlidesProgress","_grabCursor","preventClicks","preventClicksPropagation","_slideToClickedSlide","_loop","loopedSlides","loopPreventsSliding","_rewind","_allowSlidePrev","_allowSlideNext","_swipeHandler","_noSwiping","noSwipingClass","noSwipingSelector","passiveListeners","containerModifierClass","slideClass","slideActiveClass","slideVisibleClass","slideNextClass","slidePrevClass","wrapperClass","lazyPreloaderClass","lazyPreloadPrevNext","runCallbacksOnInit","observer","observeParents","observeSlideChildren","a11y","_autoplay","_controller","coverflowEffect","cubeEffect","fadeEffect","flipEffect","creativeEffect","cardsEffect","hashNavigation","history","keyboard","mousewheel","_navigation","_pagination","parallax","_scrollbar","_thumbs","virtual","zoom","control"]
function isChildSwiperSlide(e){return e.type&&e.type.displayName&&e.type.displayName.includes("SwiperSlide")}function getChildren(e){const t=[],s={"container-start":[],"container-end":[],"wrapper-start":[],"wrapper-end":[]}
return r.a.Children.toArray(e).forEach(e=>{if(isChildSwiperSlide(e))t.push(e)
else if(e.props&&e.props.slot&&s[e.props.slot])s[e.props.slot].push(e)
else if(e.props&&e.props.children){const i=function processChildren(e){const t=[]
return r.a.Children.toArray(e).forEach(e=>{isChildSwiperSlide(e)?t.push(e):e.props&&e.props.children&&processChildren(e.props.children).forEach(e=>t.push(e))}),t}(e.props.children)
i.length>0?i.forEach(e=>t.push(e)):s["container-end"].push(e)}else s["container-end"].push(e)}),{slides:t,slots:s}}function useIsomorphicLayoutEffect(e,t){return"undefined"==typeof window?Object(i.useEffect)(e,t):Object(i.useLayoutEffect)(e,t)}const l=Object(i.createContext)(null),o=Object(i.createContext)(null)
function _extends(){return(_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t]
for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i])}return e}).apply(this,arguments)}const d=Object(i.forwardRef)(function(e,t){let{className:s,tag:l="div",wrapperTag:d="div",children:c,onSwiper:p,...u}=void 0===e?{}:e,m=!1
const[f,h]=Object(i.useState)("swiper"),[g,v]=Object(i.useState)(null),[w,b]=Object(i.useState)(!1),S=Object(i.useRef)(!1),y=Object(i.useRef)(null),T=Object(i.useRef)(null),E=Object(i.useRef)(null),x=Object(i.useRef)(null),C=Object(i.useRef)(null),P=Object(i.useRef)(null),M=Object(i.useRef)(null),O=Object(i.useRef)(null),{params:L,passedParams:_,rest:k,events:I}=function getParams(e={},t=!0){const s={on:{}},i={},r={}
extend(s,n.c.defaults),extend(s,n.c.extendedDefaults),s._emitClasses=!0,s.init=!1
const l={},o=a.map(e=>e.replace(/_/,"")),d=Object.assign({},e)
return Object.keys(d).forEach(n=>{void 0!==e[n]&&(o.indexOf(n)>=0?isObject(e[n])?(s[n]={},r[n]={},extend(s[n],e[n]),extend(r[n],e[n])):(s[n]=e[n],r[n]=e[n]):0===n.search(/on[A-Z]/)&&"function"==typeof e[n]?t?i[`${n[2].toLowerCase()}${n.substr(3)}`]=e[n]:s.on[`${n[2].toLowerCase()}${n.substr(3)}`]=e[n]:l[n]=e[n])}),["navigation","pagination","scrollbar"].forEach(e=>{!0===s[e]&&(s[e]={}),!1===s[e]&&delete s[e]}),{params:s,passedParams:r,rest:l,events:i}}(u),{slides:z,slots:A}=getChildren(c),D=()=>{b(!w)}
Object.assign(L.on,{_containerClasses(e,t){h(t)}})
const j=()=>{Object.assign(L.on,I),m=!0
const e={...L}
if(delete e.wrapperClass,T.current=new n.c(e),T.current.virtual&&T.current.params.virtual.enabled){T.current.virtual.slides=z
const e={cache:!1,slides:z,renderExternal:v,renderExternalUpdate:!1}
extend(T.current.params.virtual,e),extend(T.current.originalParams.virtual,e)}}
y.current||j(),T.current&&T.current.on("_beforeBreakpoint",D)
return Object(i.useEffect)(()=>()=>{T.current&&T.current.off("_beforeBreakpoint",D)}),Object(i.useEffect)(()=>{!S.current&&T.current&&(T.current.emitSlidesClasses(),S.current=!0)}),useIsomorphicLayoutEffect(()=>{if(t&&(t.current=y.current),y.current)return T.current.destroyed&&j(),function mountSwiper({el:e,nextEl:t,prevEl:s,paginationEl:i,scrollbarEl:r,swiper:n},a){needsNavigation(a)&&t&&s&&(n.params.navigation.nextEl=t,n.originalParams.navigation.nextEl=t,n.params.navigation.prevEl=s,n.originalParams.navigation.prevEl=s),needsPagination(a)&&i&&(n.params.pagination.el=i,n.originalParams.pagination.el=i),needsScrollbar(a)&&r&&(n.params.scrollbar.el=r,n.originalParams.scrollbar.el=r),n.init(e)}({el:y.current,nextEl:C.current,prevEl:P.current,paginationEl:M.current,scrollbarEl:O.current,swiper:T.current},L),p&&p(T.current),()=>{T.current&&!T.current.destroyed&&T.current.destroy(!0,!1)}},[]),useIsomorphicLayoutEffect(()=>{!m&&I&&T.current&&Object.keys(I).forEach(e=>{T.current.on(e,I[e])})
const e=function getChangedParams(e,t,s,i,r){const n=[]
if(!t)return n
const l=e=>{n.indexOf(e)<0&&n.push(e)}
if(s&&i){const e=i.map(r),t=s.map(r)
e.join("")!==t.join("")&&l("children"),i.length!==s.length&&l("children")}return a.filter(e=>"_"===e[0]).map(e=>e.replace(/_/,"")).forEach(s=>{if(s in e&&s in t)if(isObject(e[s])&&isObject(t[s])){const i=Object.keys(e[s]),r=Object.keys(t[s])
i.length!==r.length?l(s):(i.forEach(i=>{e[s][i]!==t[s][i]&&l(s)}),r.forEach(i=>{e[s][i]!==t[s][i]&&l(s)}))}else e[s]!==t[s]&&l(s)}),n}(_,E.current,z,x.current,e=>e.key)
return E.current=_,x.current=z,e.length&&T.current&&!T.current.destroyed&&function updateSwiper({swiper:e,slides:t,passedParams:s,changedParams:i,nextEl:r,prevEl:n,scrollbarEl:a,paginationEl:l}){const o=i.filter(e=>"children"!==e&&"direction"!==e&&"wrapperClass"!==e),{params:d,pagination:c,navigation:p,scrollbar:u,virtual:m,thumbs:f}=e
let h,g,v,w,b,S,y,T
i.includes("thumbs")&&s.thumbs&&s.thumbs.swiper&&d.thumbs&&!d.thumbs.swiper&&(h=!0),i.includes("controller")&&s.controller&&s.controller.control&&d.controller&&!d.controller.control&&(g=!0),i.includes("pagination")&&s.pagination&&(s.pagination.el||l)&&(d.pagination||!1===d.pagination)&&c&&!c.el&&(v=!0),i.includes("scrollbar")&&s.scrollbar&&(s.scrollbar.el||a)&&(d.scrollbar||!1===d.scrollbar)&&u&&!u.el&&(w=!0),i.includes("navigation")&&s.navigation&&(s.navigation.prevEl||n)&&(s.navigation.nextEl||r)&&(d.navigation||!1===d.navigation)&&p&&!p.prevEl&&!p.nextEl&&(b=!0)
const E=t=>{e[t]&&(e[t].destroy(),"navigation"===t?(e.isElement&&(e[t].prevEl.remove(),e[t].nextEl.remove()),d[t].prevEl=void 0,d[t].nextEl=void 0,e[t].prevEl=void 0,e[t].nextEl=void 0):(e.isElement&&e[t].el.remove(),d[t].el=void 0,e[t].el=void 0))}
i.includes("loop")&&e.isElement&&(d.loop&&!s.loop?S=!0:!d.loop&&s.loop?y=!0:T=!0),o.forEach(e=>{if(isObject(d[e])&&isObject(s[e]))extend(d[e],s[e]),("navigation"===e||"pagination"===e||"scrollbar"===e)&&"enabled"in s[e]&&!s[e].enabled&&E(e)
else{const t=s[e]
!0!==t&&!1!==t||"navigation"!==e&&"pagination"!==e&&"scrollbar"!==e?d[e]=s[e]:!1===t&&E(e)}}),o.includes("controller")&&!g&&e.controller&&e.controller.control&&d.controller&&d.controller.control&&(e.controller.control=d.controller.control),i.includes("children")&&t&&m&&d.virtual.enabled&&(m.slides=t,m.update(!0)),i.includes("children")&&t&&d.loop&&(T=!0),h&&f.init()&&f.update(!0)
g&&(e.controller.control=d.controller.control),v&&(!e.isElement||l&&"string"!=typeof l||((l=document.createElement("div")).classList.add("swiper-pagination"),e.el.shadowEl.appendChild(l)),l&&(d.pagination.el=l),c.init(),c.render(),c.update()),w&&(!e.isElement||a&&"string"!=typeof a||((a=document.createElement("div")).classList.add("swiper-scrollbar"),e.el.shadowEl.appendChild(a)),a&&(d.scrollbar.el=a),u.init(),u.updateSize(),u.setTranslate()),b&&(e.isElement&&(r&&"string"!=typeof r||((r=document.createElement("div")).classList.add("swiper-button-next"),e.el.shadowEl.appendChild(r)),n&&"string"!=typeof n||((n=document.createElement("div")).classList.add("swiper-button-prev"),e.el.shadowEl.appendChild(n))),r&&(d.navigation.nextEl=r),n&&(d.navigation.prevEl=n),p.init(),p.update()),i.includes("allowSlideNext")&&(e.allowSlideNext=s.allowSlideNext),i.includes("allowSlidePrev")&&(e.allowSlidePrev=s.allowSlidePrev),i.includes("direction")&&e.changeDirection(s.direction,!1),(S||T)&&e.loopDestroy(),(y||T)&&e.loopCreate(),e.update()}({swiper:T.current,slides:z,passedParams:_,changedParams:e,nextEl:C.current,prevEl:P.current,scrollbarEl:O.current,paginationEl:M.current}),()=>{I&&T.current&&Object.keys(I).forEach(e=>{T.current.off(e,I[e])})}}),useIsomorphicLayoutEffect(()=>{(e=>{!e||e.destroyed||!e.params.virtual||e.params.virtual&&!e.params.virtual.enabled||(e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.parallax&&e.params.parallax&&e.params.parallax.enabled&&e.parallax.setTranslate())})(T.current)},[g]),r.a.createElement(l,_extends({ref:y,className:uniqueClasses(`${f}${s?` ${s}`:""}`)},k),r.a.createElement(o.Provider,{value:T.current},A["container-start"],r.a.createElement(d,{className:wrapperClass(L.wrapperClass)},A["wrapper-start"],function renderSlides(){return L.virtual?function renderVirtual(e,t,s){if(!s)return null
const i=e=>{let s=e
return e<0?s=t.length+e:s>=t.length&&(s-=t.length),s},n=e.isHorizontal()?{[e.rtlTranslate?"right":"left"]:`${s.offset}px`}:{top:`${s.offset}px`},{from:a,to:l}=s,o=e.params.loop?-t.length:0,d=e.params.loop?2*t.length:t.length,c=[]
for(let e=o;e<d;e+=1)e>=a&&e<=l&&c.push(t[i(e)])
return c.map((t,s)=>r.a.cloneElement(t,{swiper:e,style:n,key:`slide-${s}`}))}(T.current,z,g):z.map((e,t)=>r.a.cloneElement(e,{swiper:T.current,swiperSlideIndex:t}))}(),A["wrapper-end"]),needsNavigation(L)&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{ref:P,className:"swiper-button-prev"}),r.a.createElement("div",{ref:C,className:"swiper-button-next"})),needsScrollbar(L)&&r.a.createElement("div",{ref:O,className:"swiper-scrollbar"}),needsPagination(L)&&r.a.createElement("div",{ref:M,className:"swiper-pagination"}),A["container-end"]))})
function swiper_slide_extends(){return(swiper_slide_extends=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t]
for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i])}return e}).apply(this,arguments)}d.displayName="Swiper"
const c=Object(i.forwardRef)(function(e,t){let{tag:s="div",children:n,className:a="",swiper:o,zoom:d,lazy:c,virtualIndex:p,swiperSlideIndex:u,...m}=void 0===e?{}:e
const f=Object(i.useRef)(null),[h,g]=Object(i.useState)("swiper-slide"),[v,w]=Object(i.useState)(!1)
function updateClasses(e,t,s){t===f.current&&g(s)}useIsomorphicLayoutEffect(()=>{if(void 0!==u&&(f.current.swiperSlideIndex=u),t&&(t.current=f.current),f.current&&o){if(!o.destroyed)return o.on("_slideClass",updateClasses),()=>{o&&o.off("_slideClass",updateClasses)}
"swiper-slide"!==h&&g("swiper-slide")}}),useIsomorphicLayoutEffect(()=>{o&&f.current&&!o.destroyed&&g(o.getSlideClasses(f.current))},[o])
const b={isActive:h.indexOf("swiper-slide-active")>=0,isVisible:h.indexOf("swiper-slide-visible")>=0,isPrev:h.indexOf("swiper-slide-prev")>=0,isNext:h.indexOf("swiper-slide-next")>=0},S=()=>"function"==typeof n?n(b):n
return r.a.createElement(s,swiper_slide_extends({ref:f,className:uniqueClasses(`${h}${a?` ${a}`:""}`),"data-swiper-slide-index":p,onLoad:()=>{w(!0)}},m),d&&r.a.createElement(l.Provider,{value:b},r.a.createElement("div",{className:"swiper-zoom-container","data-swiper-zoom":"number"==typeof d?d:void 0},S(),c&&!v&&r.a.createElement("div",{className:"swiper-lazy-preloader"}))),!d&&r.a.createElement(l.Provider,{value:b},S(),c&&!v&&r.a.createElement("div",{className:"swiper-lazy-preloader"})))})
c.displayName="SwiperSlide"}}])
