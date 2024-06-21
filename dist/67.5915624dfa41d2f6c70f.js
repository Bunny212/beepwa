/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{"0Ejz":function(e,t,n){"use strict"
t.a=n.p+"bi_question_circle-9Ht.svg"},K8Fm:function(e,t,n){"use strict"
var a=n("q1tI"),r=n.n(a),i=n("OlhY"),o=n("NZDO"),s=n("H9le"),c=n("8lqF"),l=n("mkGA"),p=n("T4Ez"),m=n("z6Y5"),u=n("tAhU"),g=n("Y12o"),d=n("0Ejz"),f=n("jsp6")
t.a=(e=>{var t=e.classes,n=Array.from({length:4},(e,n)=>r.a.createElement(c.a,{key:n+1,className:t.listItemBtn},r.a.createElement(p.a,{primary:r.a.createElement(u.a,{variant:"text",sx:{fontSize:"1rem"}})}),r.a.createElement(l.a,{sx:{justifyContent:"end"}},r.a.createElement(i.a,{height:"25px",src:g.a,alt:"Search",title:"Search",width:"15px"})))),x=r.a.createElement(a.Fragment,null,r.a.createElement(o.a,{sx:{flexGrow:1}},r.a.createElement(m.a,{item:!0,xs:12,md:6},r.a.createElement(f.a,{src:d.a}),r.a.createElement(s.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"}},n))))
return r.a.createElement("div",{className:t.root},x)})},"M/BD":function(e,t,n){"use strict"
n.r(t)
var a,r=n("q1tI"),i=n.n(r),o=n("y1Xp"),s=n("Ty5D"),c=n("55Ip"),l=n("STEg"),p=n("LboF"),m=n.n(p),u=n("f1DZ"),g={injectType:"singletonStyleTag",insert:"head",singleton:!0},d=(m()(u.a,g),u.a.locals||{}),f=n("OlhY"),x=n("NZDO"),b=n("H9le"),h=n("8lqF"),w=n("mkGA"),y=n("T4Ez"),S=n("z6Y5"),v=n("Gqia"),j=n("Y12o"),O=n("eazH"),k=n("jsp6"),E=n("Xv0o"),$=n("K8Fm"),T=n("+TN3"),C=n("VkAN"),N=n.n(C),z=n("UYTu"),B=Object(z.a)(a||(a=N()(["\n  query GetFaqsQuestionsByCategeoryId($id: Int!) {\n    getFaqsQuestionsByCategeoryId(id: $id) {\n      description\n      is_active\n      position\n      question_id\n      title\n    }\n  }\n"]))),F=e=>{var{errorMessage:t}=e
return i.a.createElement(x.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"300px"},i.a.createElement(E.a,{sx:{fontSize:48,color:"error.main"}}),i.a.createElement(v.a,{variant:"h6",component:"div",align:"center",mt:2},t))}
function convertToIdentifier(e){return e.replace(/[^\w\s]/g,"").toLowerCase().replace(/\s+/g,"-")}t.default=(e=>{var t=Object(o.a)(d,e.classes),{category:n}=Object(s.i)(),a=Object(s.h)(),{faqCategoryId:p}=a.state||{},{incrementId:m}=a.state||{},{loading:u,error:g,data:E,refetch:C}=Object(T.a)(B,{variables:{id:p}})
if(u)return i.a.createElement($.a,{classes:t})
if(g)return i.a.createElement(F,{errorMessage:g.message})
var{getFaqsQuestionsByCategeoryId:N}=E,z=N.map(e=>i.a.createElement(h.a,{key:e.question_id,component:c.b,to:{pathname:Object(l.a)("/get-support/".concat(n,"/").concat(convertToIdentifier(e.title))),state:{headerTitle:"FAQ/".concat(n),articleTitle:e.title,articleContent:e.description,incrementId:m}},className:t.listItemBtn},i.a.createElement(y.a,{primary:e.title}),i.a.createElement(w.a,{sx:{justifyContent:"end"}},i.a.createElement(f.a,{height:"25px",src:j.a,alt:"Search",title:"Search",width:"15px"})))),I=i.a.createElement(r.Fragment,null,i.a.createElement(x.a,{sx:{flexGrow:1}},i.a.createElement(S.a,{item:!0,xs:12,md:6},i.a.createElement(k.a,{src:O.a}),i.a.createElement(v.a,{sx:{mt:4,mb:2},className:t.pageTitle,component:"div"},n),i.a.createElement(v.a,{sx:{mt:4,mb:2},className:t.pageSubTitle},"Find out more about our commitments below."),i.a.createElement(b.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"}},z))))
return i.a.createElement("div",{className:t.root},I)})},Y12o:function(e,t,n){"use strict"
t.a=n.p+"Arrow-wV5.svg"},eazH:function(e,t,n){"use strict"
t.a=n.p+"getSupportIcon-2Jo.svg"},f1DZ:function(e,t,n){"use strict"
var a=n("JPst"),r=n.n(a)()(function(e){return e[1]})
r.push([e.i,".getSupportCategory-root-Bxm {\n    /* TODO @TW: review (B7) */\n}\n.getSupportCategory-listItemBtn-aFj {\n    border-radius: 12px !important;\n    background: #FFF;\n    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);\n    min-height: 70px;\n    margin-bottom: 10px !important;\n}\n.getSupportCategory-pageTitle-1w8 {\n    color: #000;\n    font-family: Roobert;\n    font-size: 18px;\n    font-style: normal;\n    font-weight: 500;\n    line-height: 110%; /* 19.8px */\n    margin-top: 0;\n    text-transform: capitalize;\n}\n.getSupportCategory-pageSubTitle-pxB {\n    color: #000;\n    font-family: Roobert;\n    font-size: 13px;\n    font-style: normal;\n    font-weight: 500;\n    line-height: 110%; /* 14.3px */\n    margin-top: 0;\n}",""]),r.locals={root:"getSupportCategory-root-Bxm gap-xs grid grid-cols-1 max-w-screen-lg mx-auto my-0 px-sm py-sm lg_gap-md lg_grid-cols-[2fr, 1fr] lg_px-lg lg_py-md",listItemBtn:"getSupportCategory-listItemBtn-aFj",pageTitle:"getSupportCategory-pageTitle-1w8",pageSubTitle:"getSupportCategory-pageSubTitle-pxB"},t.a=r},jsp6:function(e,t,n){"use strict"
var a=n("q1tI"),r=n.n(a),i=n("NZDO")
t.a=(e=>{var{src:t}=e
return r.a.createElement(i.a,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"76.621px",height:"78.189px",flexShrink:0,borderRadius:"12px",background:"#FFF",boxShadow:"0px 0px 16px 0px rgba(0, 0, 0, 0.12)",marginBottom:"10px"}},r.a.createElement("img",{src:t,alt:"Icon"}))})},z6Y5:function(e,t,n){"use strict"
var a=n("EiBv"),r=n("NFhf"),i=n("q1tI"),o=n("BHdc"),s=n("oseK"),c=n("WFWL"),l=n("aGM9"),p=n("Vn7y"),m=n("tCRK"),u=n("UnQg")
var g=i.createContext(),d=n("PYeY"),f=n("TkYO")
function getGridUtilityClass(e){return Object(f.a)("MuiGrid",e)}const x=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12]
var b=Object(d.a)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map(e=>`spacing-xs-${e}`),...["column-reverse","column","row-reverse","row"].map(e=>`direction-xs-${e}`),...["nowrap","wrap-reverse","wrap"].map(e=>`wrap-xs-${e}`),...x.map(e=>`grid-xs-${e}`),...x.map(e=>`grid-sm-${e}`),...x.map(e=>`grid-md-${e}`),...x.map(e=>`grid-lg-${e}`),...x.map(e=>`grid-xl-${e}`)]),h=n("nKUr")
const w=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"]
function getOffset(e){const t=parseFloat(e)
return`${t}${String(e).replace(String(t),"")||"px"}`}function extractZeroValueBreakpointKeys({breakpoints:e,values:t}){let n=""
Object.keys(t).forEach(e=>{""===n&&0!==t[e]&&(n=e)})
const a=Object.keys(e).sort((t,n)=>e[t]-e[n])
return a.slice(0,a.indexOf(n))}const y=Object(p.a)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:a,direction:r,item:i,spacing:o,wrap:s,zeroMinWidth:c,breakpoints:l}=n
let p=[]
a&&(p=function resolveSpacingStyles(e,t,n={}){if(!e||e<=0)return[]
if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[n[`spacing-xs-${String(e)}`]]
const a=[]
return t.forEach(t=>{const r=e[t]
Number(r)>0&&a.push(n[`spacing-${t}-${String(r)}`])}),a}(o,l,t))
const m=[]
return l.forEach(e=>{const a=n[e]
a&&m.push(t[`grid-${e}-${String(a)}`])}),[t.root,a&&t.container,i&&t.item,c&&t.zeroMinWidth,...p,"row"!==r&&t[`direction-xs-${String(r)}`],"wrap"!==s&&t[`wrap-xs-${String(s)}`],...m]}})(({ownerState:e})=>Object(r.a)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap}),function generateDirection({theme:e,ownerState:t}){const n=Object(s.e)({values:t.direction,breakpoints:e.breakpoints.values})
return Object(s.b)({theme:e},n,e=>{const t={flexDirection:e}
return 0===e.indexOf("column")&&(t[`& > .${b.item}`]={maxWidth:"none"}),t})},function generateRowGap({theme:e,ownerState:t}){const{container:n,rowSpacing:a}=t
let r={}
if(n&&0!==a){const t=Object(s.e)({values:a,breakpoints:e.breakpoints.values})
let n
"object"==typeof t&&(n=extractZeroValueBreakpointKeys({breakpoints:e.breakpoints.values,values:t})),r=Object(s.b)({theme:e},t,(t,a)=>{var r
const i=e.spacing(t)
return"0px"!==i?{marginTop:`-${getOffset(i)}`,[`& > .${b.item}`]:{paddingTop:getOffset(i)}}:null!=(r=n)&&r.includes(a)?{}:{marginTop:0,[`& > .${b.item}`]:{paddingTop:0}}})}return r},function generateColumnGap({theme:e,ownerState:t}){const{container:n,columnSpacing:a}=t
let r={}
if(n&&0!==a){const t=Object(s.e)({values:a,breakpoints:e.breakpoints.values})
let n
"object"==typeof t&&(n=extractZeroValueBreakpointKeys({breakpoints:e.breakpoints.values,values:t})),r=Object(s.b)({theme:e},t,(t,a)=>{var r
const i=e.spacing(t)
return"0px"!==i?{width:`calc(100% + ${getOffset(i)})`,marginLeft:`-${getOffset(i)}`,[`& > .${b.item}`]:{paddingLeft:getOffset(i)}}:null!=(r=n)&&r.includes(a)?{}:{width:"100%",marginLeft:0,[`& > .${b.item}`]:{paddingLeft:0}}})}return r},function generateGrid({theme:e,ownerState:t}){let n
return e.breakpoints.keys.reduce((a,i)=>{let o={}
if(t[i]&&(n=t[i]),!n)return a
if(!0===n)o={flexBasis:0,flexGrow:1,maxWidth:"100%"}
else if("auto"===n)o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}
else{const c=Object(s.e)({values:t.columns,breakpoints:e.breakpoints.values}),l="object"==typeof c?c[i]:c
if(null==l)return a
const p=`${Math.round(n/l*1e8)/1e6}%`
let m={}
if(t.container&&t.item&&0!==t.columnSpacing){const n=e.spacing(t.columnSpacing)
if("0px"!==n){const e=`calc(${p} + ${getOffset(n)})`
m={flexBasis:e,maxWidth:e}}}o=Object(r.a)({flexBasis:p,flexGrow:0,maxWidth:p},m)}return 0===e.breakpoints.values[i]?Object.assign(a,o):a[e.breakpoints.up(i)]=o,a},{})})
const S=e=>{const{classes:t,container:n,direction:a,item:r,spacing:i,wrap:o,zeroMinWidth:s,breakpoints:c}=e
let p=[]
n&&(p=function resolveSpacingClasses(e,t){if(!e||e<=0)return[]
if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[`spacing-xs-${String(e)}`]
const n=[]
return t.forEach(t=>{const a=e[t]
if(Number(a)>0){const e=`spacing-${t}-${String(a)}`
n.push(e)}}),n}(i,c))
const m=[]
c.forEach(t=>{const n=e[t]
n&&m.push(`grid-${t}-${String(n)}`)})
const u={root:["root",n&&"container",r&&"item",s&&"zeroMinWidth",...p,"row"!==a&&`direction-xs-${String(a)}`,"wrap"!==o&&`wrap-xs-${String(o)}`,...m]}
return Object(l.a)(u,getGridUtilityClass,t)},v=i.forwardRef(function Grid(e,t){const n=Object(m.a)({props:e,name:"MuiGrid"}),{breakpoints:s}=Object(u.a)(),l=Object(c.a)(n),{className:p,columns:d,columnSpacing:f,component:x="div",container:b=!1,direction:v="row",item:j=!1,rowSpacing:O,spacing:k=0,wrap:E="wrap",zeroMinWidth:$=!1}=l,T=Object(a.a)(l,w),C=O||k,N=f||k,z=i.useContext(g),B=b?d||12:z,F={},I=Object(r.a)({},T)
s.keys.forEach(e=>{null!=T[e]&&(F[e]=T[e],delete I[e])})
const W=Object(r.a)({},l,{columns:B,container:b,direction:v,item:j,rowSpacing:C,columnSpacing:N,wrap:E,zeroMinWidth:$,spacing:k},F,{breakpoints:s.keys}),G=S(W)
return Object(h.jsx)(g.Provider,{value:B,children:Object(h.jsx)(y,Object(r.a)({ownerState:W,className:Object(o.a)(G.root,p),as:x,ref:t},I))})})
t.a=v}}])
