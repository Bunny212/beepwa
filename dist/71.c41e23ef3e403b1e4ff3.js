/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{"0Ejz":function(e,t,n){"use strict"
t.a=n.p+"bi_question_circle-9Ht.svg"},"2Rfg":function(e,t,n){"use strict"
var r=n("JPst"),a=n.n(r)()(function(e){return e[1]})
a.push([e.i,".faqPage-root-WuF {\n    /* TODO @TW: review (B7) */\n}\n.faqPage-listItemBtn-gXf {\n    border-radius: 12px !important;\n    background: #FFF;\n    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);\n    min-height: 70px;\n    margin-bottom: 10px !important;\n}\n.faqPage-pageTitle-lb- {\n    color: #000;\n    font-family: Roobert;\n    font-size: 18px;\n    font-style: normal;\n    font-weight: 500;\n    line-height: 110%; /* 19.8px */\n    margin-top: 0;\n}\n.faqPage-iconBox-7I1 {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    width: 76.621px;\n    height: 78.189px;\n    flex-shrink: 0;\n    border-radius: 12px;\n    background: #FFF;\n    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);\n    margin-bottom: 10px;\n}",""]),a.locals={root:"faqPage-root-WuF gap-xs grid grid-cols-1 max-w-screen-lg mx-auto my-0 px-sm py-sm lg_gap-md lg_grid-cols-[2fr, 1fr] lg_px-lg lg_py-md",listItemBtn:"faqPage-listItemBtn-gXf",pageTitle:"faqPage-pageTitle-lb-",iconBox:"faqPage-iconBox-7I1"},t.a=a},Qrh1:function(e,t,n){"use strict"
var r=n("q1tI"),a=n.n(r),i=n("OlhY"),o=n("NZDO"),c=n("H9le"),s=n("8lqF"),l=n("mkGA"),p=n("T4Ez"),m=n("z6Y5"),u=n("tAhU"),g=n("Y12o"),f=n("0Ejz"),d=n("Z46h")
t.a=(e=>{var t=e.classes,n=Array.from({length:4},(e,n)=>a.a.createElement(s.a,{key:n+1,className:t.listItemBtn},a.a.createElement(p.a,{primary:a.a.createElement(u.a,{variant:"text",sx:{fontSize:"1rem"}})}),a.a.createElement(l.a,{sx:{justifyContent:"end"}},a.a.createElement(i.a,{height:"25px",src:g.a,alt:"Search",title:"Search",width:"15px"})))),b=a.a.createElement(r.Fragment,null,a.a.createElement(o.a,{sx:{flexGrow:1}},a.a.createElement(m.a,{item:!0,xs:12,md:6},a.a.createElement(d.a,{src:f.a}),a.a.createElement(c.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"}},n))))
return a.a.createElement("div",{className:t.root},b)})},Y12o:function(e,t,n){"use strict"
t.a=n.p+"Arrow-wV5.svg"},Z46h:function(e,t,n){"use strict"
var r=n("q1tI"),a=n.n(r),i=n("NZDO")
t.a=(e=>{var{src:t}=e
return a.a.createElement(i.a,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"76.621px",height:"78.189px",flexShrink:0,borderRadius:"12px",background:"#FFF",boxShadow:"0px 0px 16px 0px rgba(0, 0, 0, 0.12)",marginBottom:"10px"}},a.a.createElement("img",{src:t,alt:"Icon"}))})},n3dX:function(e,t,n){"use strict"
n.r(t)
var r,a=n("lSNA"),i=n.n(a),o=n("q1tI"),c=n.n(o),s=n("y1Xp"),l=n("55Ip"),p=n("STEg"),m=n("LboF"),u=n.n(m),g=n("2Rfg"),f={injectType:"singletonStyleTag",insert:"head",singleton:!0},d=(u()(g.a,f),g.a.locals||{}),b=n("dDsW"),x=n("kriW"),h=n("OlhY"),w=n("NZDO"),O=n("H9le"),y=n("8lqF"),j=n("mkGA"),v=n("T4Ez"),S=n("z6Y5"),k=n("Gqia"),E=n("Y12o"),$=n("0Ejz"),W=n("Z46h"),q=n("Xv0o"),N=n("Qrh1"),F=n("+TN3"),z=n("VkAN"),M=n.n(z),P=n("UYTu"),G=Object(P.a)(r||(r=M()(["\n  query GetFaqs {\n    getFaqs {\n        category_id\n        identifier\n        is_active\n        position\n        title\n    }\n  }\n"])))
function ownKeys(e,t){var n=Object.keys(e)
if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e)
t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{}
t%2?ownKeys(Object(n),!0).forEach(function(t){i()(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var B=e=>{var{errorMessage:t}=e
return c.a.createElement(w.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"300px"},c.a.createElement(q.a,{sx:{fontSize:48,color:"error.main"}}),c.a.createElement(k.a,{variant:"h6",component:"div",align:"center",mt:2},t))}
t.default=(e=>{var t=Object(s.a)(d,e.classes),{formatMessage:n}=Object(b.a)(),r="rtl"===n({id:"lang.direction"}),{loading:a,error:i,data:m,refetch:u}=Object(F.a)(G,{fetchPolicy:"cache-and-network",nextFetchPolicy:"cache-first"}),g=Object(o.useMemo)(()=>m&&m.getFaqs?m.getFaqs:null,[m])
if(a)return c.a.createElement(N.a,{classes:t})
if(i)return c.a.createElement(B,{errorMessage:i.message})
var f=g.map(e=>c.a.createElement(y.a,{key:e.category_id,component:l.b,to:{pathname:Object(p.a)("/faq/".concat(e.identifier)),state:{headerTitle:n({id:"faq"}),faqCategoryId:e.category_id}},className:t.listItemBtn},c.a.createElement(v.a,{primary:e.title}),c.a.createElement(j.a,{sx:_objectSpread({justifyContent:"end"},r&&{justifyContent:"flex-start",transform:"rotate(180deg)"})},c.a.createElement(h.a,{height:"25px",src:E.a,alt:"Search",title:"Search",width:"15px"})))),q=c.a.createElement(o.Fragment,null,c.a.createElement(w.a,{sx:{flexGrow:1}},c.a.createElement(S.a,{item:!0,xs:12,md:6},c.a.createElement(W.a,{src:$.a}),c.a.createElement(k.a,{sx:{mt:4,mb:2},className:t.pageTitle,component:"div"},c.a.createElement(x.a,{id:"faqMoreAbout",defaultMessage:"What are you trying to learn more about?"})),c.a.createElement(O.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"}},f))))
return c.a.createElement("div",{className:t.root},q)})},z6Y5:function(e,t,n){"use strict"
var r=n("EiBv"),a=n("NFhf"),i=n("q1tI"),o=n("BHdc"),c=n("oseK"),s=n("WFWL"),l=n("aGM9"),p=n("Vn7y"),m=n("tCRK"),u=n("UnQg")
var g=i.createContext(),f=n("PYeY"),d=n("TkYO")
function getGridUtilityClass(e){return Object(d.a)("MuiGrid",e)}const b=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12]
var x=Object(f.a)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map(e=>`spacing-xs-${e}`),...["column-reverse","column","row-reverse","row"].map(e=>`direction-xs-${e}`),...["nowrap","wrap-reverse","wrap"].map(e=>`wrap-xs-${e}`),...b.map(e=>`grid-xs-${e}`),...b.map(e=>`grid-sm-${e}`),...b.map(e=>`grid-md-${e}`),...b.map(e=>`grid-lg-${e}`),...b.map(e=>`grid-xl-${e}`)]),h=n("nKUr")
const w=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"]
function getOffset(e){const t=parseFloat(e)
return`${t}${String(e).replace(String(t),"")||"px"}`}function extractZeroValueBreakpointKeys({breakpoints:e,values:t}){let n=""
Object.keys(t).forEach(e=>{""===n&&0!==t[e]&&(n=e)})
const r=Object.keys(e).sort((t,n)=>e[t]-e[n])
return r.slice(0,r.indexOf(n))}const O=Object(p.a)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:r,direction:a,item:i,spacing:o,wrap:c,zeroMinWidth:s,breakpoints:l}=n
let p=[]
r&&(p=function resolveSpacingStyles(e,t,n={}){if(!e||e<=0)return[]
if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[n[`spacing-xs-${String(e)}`]]
const r=[]
return t.forEach(t=>{const a=e[t]
Number(a)>0&&r.push(n[`spacing-${t}-${String(a)}`])}),r}(o,l,t))
const m=[]
return l.forEach(e=>{const r=n[e]
r&&m.push(t[`grid-${e}-${String(r)}`])}),[t.root,r&&t.container,i&&t.item,s&&t.zeroMinWidth,...p,"row"!==a&&t[`direction-xs-${String(a)}`],"wrap"!==c&&t[`wrap-xs-${String(c)}`],...m]}})(({ownerState:e})=>Object(a.a)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap}),function generateDirection({theme:e,ownerState:t}){const n=Object(c.e)({values:t.direction,breakpoints:e.breakpoints.values})
return Object(c.b)({theme:e},n,e=>{const t={flexDirection:e}
return 0===e.indexOf("column")&&(t[`& > .${x.item}`]={maxWidth:"none"}),t})},function generateRowGap({theme:e,ownerState:t}){const{container:n,rowSpacing:r}=t
let a={}
if(n&&0!==r){const t=Object(c.e)({values:r,breakpoints:e.breakpoints.values})
let n
"object"==typeof t&&(n=extractZeroValueBreakpointKeys({breakpoints:e.breakpoints.values,values:t})),a=Object(c.b)({theme:e},t,(t,r)=>{var a
const i=e.spacing(t)
return"0px"!==i?{marginTop:`-${getOffset(i)}`,[`& > .${x.item}`]:{paddingTop:getOffset(i)}}:null!=(a=n)&&a.includes(r)?{}:{marginTop:0,[`& > .${x.item}`]:{paddingTop:0}}})}return a},function generateColumnGap({theme:e,ownerState:t}){const{container:n,columnSpacing:r}=t
let a={}
if(n&&0!==r){const t=Object(c.e)({values:r,breakpoints:e.breakpoints.values})
let n
"object"==typeof t&&(n=extractZeroValueBreakpointKeys({breakpoints:e.breakpoints.values,values:t})),a=Object(c.b)({theme:e},t,(t,r)=>{var a
const i=e.spacing(t)
return"0px"!==i?{width:`calc(100% + ${getOffset(i)})`,marginLeft:`-${getOffset(i)}`,[`& > .${x.item}`]:{paddingLeft:getOffset(i)}}:null!=(a=n)&&a.includes(r)?{}:{width:"100%",marginLeft:0,[`& > .${x.item}`]:{paddingLeft:0}}})}return a},function generateGrid({theme:e,ownerState:t}){let n
return e.breakpoints.keys.reduce((r,i)=>{let o={}
if(t[i]&&(n=t[i]),!n)return r
if(!0===n)o={flexBasis:0,flexGrow:1,maxWidth:"100%"}
else if("auto"===n)o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}
else{const s=Object(c.e)({values:t.columns,breakpoints:e.breakpoints.values}),l="object"==typeof s?s[i]:s
if(null==l)return r
const p=`${Math.round(n/l*1e8)/1e6}%`
let m={}
if(t.container&&t.item&&0!==t.columnSpacing){const n=e.spacing(t.columnSpacing)
if("0px"!==n){const e=`calc(${p} + ${getOffset(n)})`
m={flexBasis:e,maxWidth:e}}}o=Object(a.a)({flexBasis:p,flexGrow:0,maxWidth:p},m)}return 0===e.breakpoints.values[i]?Object.assign(r,o):r[e.breakpoints.up(i)]=o,r},{})})
const y=e=>{const{classes:t,container:n,direction:r,item:a,spacing:i,wrap:o,zeroMinWidth:c,breakpoints:s}=e
let p=[]
n&&(p=function resolveSpacingClasses(e,t){if(!e||e<=0)return[]
if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[`spacing-xs-${String(e)}`]
const n=[]
return t.forEach(t=>{const r=e[t]
if(Number(r)>0){const e=`spacing-${t}-${String(r)}`
n.push(e)}}),n}(i,s))
const m=[]
s.forEach(t=>{const n=e[t]
n&&m.push(`grid-${t}-${String(n)}`)})
const u={root:["root",n&&"container",a&&"item",c&&"zeroMinWidth",...p,"row"!==r&&`direction-xs-${String(r)}`,"wrap"!==o&&`wrap-xs-${String(o)}`,...m]}
return Object(l.a)(u,getGridUtilityClass,t)},j=i.forwardRef(function Grid(e,t){const n=Object(m.a)({props:e,name:"MuiGrid"}),{breakpoints:c}=Object(u.a)(),l=Object(s.a)(n),{className:p,columns:f,columnSpacing:d,component:b="div",container:x=!1,direction:j="row",item:v=!1,rowSpacing:S,spacing:k=0,wrap:E="wrap",zeroMinWidth:$=!1}=l,W=Object(r.a)(l,w),q=S||k,N=d||k,F=i.useContext(g),z=x?f||12:F,M={},P=Object(a.a)({},W)
c.keys.forEach(e=>{null!=W[e]&&(M[e]=W[e],delete P[e])})
const G=Object(a.a)({},l,{columns:z,container:x,direction:j,item:v,rowSpacing:q,columnSpacing:N,wrap:E,zeroMinWidth:$,spacing:k},M,{breakpoints:c.keys}),B=y(G)
return Object(h.jsx)(g.Provider,{value:z,children:Object(h.jsx)(O,Object(a.a)({ownerState:G,className:Object(o.a)(B.root,p),as:b,ref:t},P))})})
t.a=j}}])
