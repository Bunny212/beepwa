/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{"0Ejz":function(e,t,n){"use strict"
t.a=n.p+"bi_question_circle-9Ht.svg"},"E9/w":function(e,t,n){"use strict"
var r=n("JPst"),a=n.n(r)()(function(e){return e[1]})
a.push([e.i,".getSupportPage-root-wtT {\n    /* TODO @TW: review (B7) */\n}\n.getSupportPage-listItemBtn-ne5 {\n    border-radius: 12px !important;\n    background: #FFF;\n    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);\n    min-height: 70px;\n    margin-bottom: 10px !important;\n}\n.getSupportPage-pageTitle-Bc6 {\n    color: #000;\n    font-family: Roobert;\n    font-size: 18px;\n    font-style: normal;\n    font-weight: 500;\n    line-height: 110%; /* 19.8px */\n    margin-top: 0;\n}\n.getSupportPage-iconBox-Fc3 {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    width: 76.621px;\n    height: 78.189px;\n    flex-shrink: 0;\n    border-radius: 12px;\n    background: #FFF;\n    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);\n    margin-bottom: 10px;\n}",""]),a.locals={root:"getSupportPage-root-wtT gap-xs grid grid-cols-1 max-w-screen-lg mx-auto my-0 px-sm py-sm lg_gap-md lg_grid-cols-[2fr, 1fr] lg_px-lg lg_py-md",listItemBtn:"getSupportPage-listItemBtn-ne5",pageTitle:"getSupportPage-pageTitle-Bc6",iconBox:"getSupportPage-iconBox-Fc3"},t.a=a},K8Fm:function(e,t,n){"use strict"
var r=n("q1tI"),a=n.n(r),i=n("OlhY"),o=n("NZDO"),s=n("H9le"),c=n("8lqF"),p=n("mkGA"),l=n("T4Ez"),m=n("z6Y5"),u=n("tAhU"),g=n("Y12o"),d=n("0Ejz"),f=n("jsp6")
t.a=(e=>{var t=e.classes,n=Array.from({length:4},(e,n)=>a.a.createElement(c.a,{key:n+1,className:t.listItemBtn},a.a.createElement(l.a,{primary:a.a.createElement(u.a,{variant:"text",sx:{fontSize:"1rem"}})}),a.a.createElement(p.a,{sx:{justifyContent:"end"}},a.a.createElement(i.a,{height:"25px",src:g.a,alt:"Search",title:"Search",width:"15px"})))),x=a.a.createElement(r.Fragment,null,a.a.createElement(o.a,{sx:{flexGrow:1}},a.a.createElement(m.a,{item:!0,xs:12,md:6},a.a.createElement(f.a,{src:d.a}),a.a.createElement(s.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"}},n))))
return a.a.createElement("div",{className:t.root},x)})},Vhc4:function(e,t,n){"use strict"
n.r(t)
var r,a=n("q1tI"),i=n.n(a),o=n("y1Xp"),s=n("55Ip"),c=n("STEg"),p=n("LboF"),l=n.n(p),m=n("E9/w"),u={injectType:"singletonStyleTag",insert:"head",singleton:!0},g=(l()(m.a,u),m.a.locals||{}),d=n("dDsW"),f=n("kriW"),x=n("OlhY"),b=n("NZDO"),h=n("H9le"),w=n("8lqF"),S=n("mkGA"),y=n("T4Ez"),v=n("z6Y5"),O=n("Gqia"),j=n("Y12o"),k=n("eazH"),E=n("jsp6"),$=n("Xv0o"),F=n("K8Fm"),W=n("+TN3"),N=n("VkAN"),z=n.n(N),M=n("UYTu"),T=Object(M.a)(r||(r=z()(["\n  query GetSupportFaqs {\n    getSupportFaqs {\n        category_id\n        identifier\n        is_active\n        position\n        title\n    }\n  }\n"]))),B=e=>{var{errorMessage:t}=e
return i.a.createElement(b.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"300px"},i.a.createElement($.a,{sx:{fontSize:48,color:"error.main"}}),i.a.createElement(O.a,{variant:"h6",component:"div",align:"center",mt:2},t))}
t.default=(e=>{var t=Object(o.a)(g,e.classes),{formatMessage:n}=Object(d.a)(),{loading:r,error:p,data:l,refetch:m}=Object(W.a)(T)
if(r)return i.a.createElement(F.a,{classes:t})
if(p)return i.a.createElement(B,{errorMessage:p.message})
var{getSupportFaqs:u}=l,$=u.map(e=>i.a.createElement(w.a,{key:e.category_id,component:s.b,to:{pathname:"orders"==e.identifier?Object(c.a)("/order-history"):Object(c.a)("/get-support/".concat(e.identifier)),state:"orders"===e.identifier?{headerTitle:n({id:"orderHistory",defaultMessage:"Order History"}),getSupport:!0,identifier:e.identifier,faqCategoryId:e.category_id}:{headerTitle:n({id:"faq",defaultMessage:"FAQ"}),faqCategoryId:e.category_id}},className:t.listItemBtn},i.a.createElement(y.a,{primary:e.title}),i.a.createElement(S.a,{sx:{justifyContent:"end"}},i.a.createElement(x.a,{height:"25px",src:j.a,alt:"Search",title:"Search",width:"15px"})))),N=i.a.createElement(a.Fragment,null,i.a.createElement(b.a,{sx:{flexGrow:1}},i.a.createElement(v.a,{item:!0,xs:12,md:6},i.a.createElement(E.a,{src:k.a}),i.a.createElement(O.a,{sx:{mt:4,mb:2},className:t.pageTitle,component:"div"},i.a.createElement(f.a,{id:"learnMoreAbout",defaultMessage:"What are you trying to learn and more about?"})),i.a.createElement(h.a,{sx:{width:"100%",maxWidth:360,bgcolor:"background.paper"}},$))))
return i.a.createElement("div",{className:t.root},N)})},Y12o:function(e,t,n){"use strict"
t.a=n.p+"Arrow-wV5.svg"},eazH:function(e,t,n){"use strict"
t.a=n.p+"getSupportIcon-2Jo.svg"},jsp6:function(e,t,n){"use strict"
var r=n("q1tI"),a=n.n(r),i=n("NZDO")
t.a=(e=>{var{src:t}=e
return a.a.createElement(i.a,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"76.621px",height:"78.189px",flexShrink:0,borderRadius:"12px",background:"#FFF",boxShadow:"0px 0px 16px 0px rgba(0, 0, 0, 0.12)",marginBottom:"10px"}},a.a.createElement("img",{src:t,alt:"Icon"}))})},z6Y5:function(e,t,n){"use strict"
var r=n("EiBv"),a=n("NFhf"),i=n("q1tI"),o=n("BHdc"),s=n("oseK"),c=n("WFWL"),p=n("aGM9"),l=n("Vn7y"),m=n("tCRK"),u=n("UnQg")
var g=i.createContext(),d=n("PYeY"),f=n("TkYO")
function getGridUtilityClass(e){return Object(f.a)("MuiGrid",e)}const x=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12]
var b=Object(d.a)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map(e=>`spacing-xs-${e}`),...["column-reverse","column","row-reverse","row"].map(e=>`direction-xs-${e}`),...["nowrap","wrap-reverse","wrap"].map(e=>`wrap-xs-${e}`),...x.map(e=>`grid-xs-${e}`),...x.map(e=>`grid-sm-${e}`),...x.map(e=>`grid-md-${e}`),...x.map(e=>`grid-lg-${e}`),...x.map(e=>`grid-xl-${e}`)]),h=n("nKUr")
const w=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"]
function getOffset(e){const t=parseFloat(e)
return`${t}${String(e).replace(String(t),"")||"px"}`}function extractZeroValueBreakpointKeys({breakpoints:e,values:t}){let n=""
Object.keys(t).forEach(e=>{""===n&&0!==t[e]&&(n=e)})
const r=Object.keys(e).sort((t,n)=>e[t]-e[n])
return r.slice(0,r.indexOf(n))}const S=Object(l.a)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:r,direction:a,item:i,spacing:o,wrap:s,zeroMinWidth:c,breakpoints:p}=n
let l=[]
r&&(l=function resolveSpacingStyles(e,t,n={}){if(!e||e<=0)return[]
if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[n[`spacing-xs-${String(e)}`]]
const r=[]
return t.forEach(t=>{const a=e[t]
Number(a)>0&&r.push(n[`spacing-${t}-${String(a)}`])}),r}(o,p,t))
const m=[]
return p.forEach(e=>{const r=n[e]
r&&m.push(t[`grid-${e}-${String(r)}`])}),[t.root,r&&t.container,i&&t.item,c&&t.zeroMinWidth,...l,"row"!==a&&t[`direction-xs-${String(a)}`],"wrap"!==s&&t[`wrap-xs-${String(s)}`],...m]}})(({ownerState:e})=>Object(a.a)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap}),function generateDirection({theme:e,ownerState:t}){const n=Object(s.e)({values:t.direction,breakpoints:e.breakpoints.values})
return Object(s.b)({theme:e},n,e=>{const t={flexDirection:e}
return 0===e.indexOf("column")&&(t[`& > .${b.item}`]={maxWidth:"none"}),t})},function generateRowGap({theme:e,ownerState:t}){const{container:n,rowSpacing:r}=t
let a={}
if(n&&0!==r){const t=Object(s.e)({values:r,breakpoints:e.breakpoints.values})
let n
"object"==typeof t&&(n=extractZeroValueBreakpointKeys({breakpoints:e.breakpoints.values,values:t})),a=Object(s.b)({theme:e},t,(t,r)=>{var a
const i=e.spacing(t)
return"0px"!==i?{marginTop:`-${getOffset(i)}`,[`& > .${b.item}`]:{paddingTop:getOffset(i)}}:null!=(a=n)&&a.includes(r)?{}:{marginTop:0,[`& > .${b.item}`]:{paddingTop:0}}})}return a},function generateColumnGap({theme:e,ownerState:t}){const{container:n,columnSpacing:r}=t
let a={}
if(n&&0!==r){const t=Object(s.e)({values:r,breakpoints:e.breakpoints.values})
let n
"object"==typeof t&&(n=extractZeroValueBreakpointKeys({breakpoints:e.breakpoints.values,values:t})),a=Object(s.b)({theme:e},t,(t,r)=>{var a
const i=e.spacing(t)
return"0px"!==i?{width:`calc(100% + ${getOffset(i)})`,marginLeft:`-${getOffset(i)}`,[`& > .${b.item}`]:{paddingLeft:getOffset(i)}}:null!=(a=n)&&a.includes(r)?{}:{width:"100%",marginLeft:0,[`& > .${b.item}`]:{paddingLeft:0}}})}return a},function generateGrid({theme:e,ownerState:t}){let n
return e.breakpoints.keys.reduce((r,i)=>{let o={}
if(t[i]&&(n=t[i]),!n)return r
if(!0===n)o={flexBasis:0,flexGrow:1,maxWidth:"100%"}
else if("auto"===n)o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}
else{const c=Object(s.e)({values:t.columns,breakpoints:e.breakpoints.values}),p="object"==typeof c?c[i]:c
if(null==p)return r
const l=`${Math.round(n/p*1e8)/1e6}%`
let m={}
if(t.container&&t.item&&0!==t.columnSpacing){const n=e.spacing(t.columnSpacing)
if("0px"!==n){const e=`calc(${l} + ${getOffset(n)})`
m={flexBasis:e,maxWidth:e}}}o=Object(a.a)({flexBasis:l,flexGrow:0,maxWidth:l},m)}return 0===e.breakpoints.values[i]?Object.assign(r,o):r[e.breakpoints.up(i)]=o,r},{})})
const y=e=>{const{classes:t,container:n,direction:r,item:a,spacing:i,wrap:o,zeroMinWidth:s,breakpoints:c}=e
let l=[]
n&&(l=function resolveSpacingClasses(e,t){if(!e||e<=0)return[]
if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[`spacing-xs-${String(e)}`]
const n=[]
return t.forEach(t=>{const r=e[t]
if(Number(r)>0){const e=`spacing-${t}-${String(r)}`
n.push(e)}}),n}(i,c))
const m=[]
c.forEach(t=>{const n=e[t]
n&&m.push(`grid-${t}-${String(n)}`)})
const u={root:["root",n&&"container",a&&"item",s&&"zeroMinWidth",...l,"row"!==r&&`direction-xs-${String(r)}`,"wrap"!==o&&`wrap-xs-${String(o)}`,...m]}
return Object(p.a)(u,getGridUtilityClass,t)},v=i.forwardRef(function Grid(e,t){const n=Object(m.a)({props:e,name:"MuiGrid"}),{breakpoints:s}=Object(u.a)(),p=Object(c.a)(n),{className:l,columns:d,columnSpacing:f,component:x="div",container:b=!1,direction:v="row",item:O=!1,rowSpacing:j,spacing:k=0,wrap:E="wrap",zeroMinWidth:$=!1}=p,F=Object(r.a)(p,w),W=j||k,N=f||k,z=i.useContext(g),M=b?d||12:z,T={},B=Object(a.a)({},F)
s.keys.forEach(e=>{null!=F[e]&&(T[e]=F[e],delete B[e])})
const G=Object(a.a)({},p,{columns:M,container:b,direction:v,item:O,rowSpacing:W,columnSpacing:N,wrap:E,zeroMinWidth:$,spacing:k},T,{breakpoints:s.keys}),I=y(G)
return Object(h.jsx)(g.Provider,{value:M,children:Object(h.jsx)(S,Object(a.a)({ownerState:G,className:Object(o.a)(I.root,l),as:x,ref:t},B))})})
t.a=v}}])
