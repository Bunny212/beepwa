/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{SAkj:function(e,t,a){"use strict"
a.r(t),a.d(t,"default",function(){return j}),a.d(t,"FilterSidebarShimmer",function(){return v.a})
var r=a("q1tI"),l=a.n(r),n=a("kriW"),i=a("17x9"),s=a("+TN3"),c=a("Ty5D"),o=a("OlZo"),u=a("y1Xp"),f=a("Mhql"),b=a("+wQL"),d=a("qykw"),p=a("6QXU"),O=a("t1DO"),m=a("th2e"),g=a("bGkD"),h=e=>{var{filters:t,filterCountToOpen:a}=e,i=(e=>{var{filters:t}=e,a=Object(u.a)(d.a,e.operations),{getFilterInputsQuery:l}=a,[n,i]=Object(r.useState)(!1),[{drawer:p},{toggleDrawer:O,closeDrawer:m}]=Object(o.b)(),[g,h]=Object(f.a)(),j=Object(r.useRef)(null),v="filter"===p,y=Object(c.g)(),{pathname:w,search:k}=Object(c.h)(),{data:C}=Object(s.a)(l),N=Object(r.useMemo)(()=>t.map(e=>{var{attribute_code:t}=e
return t}),[t]),E=Object(r.useMemo)(()=>{var e=new Set
return"/search.html"!==w&&(e.add("category_id"),e.add("category_uid")),e},[w]),M=Object(r.useMemo)(()=>{var e=new Set,t=C?C.__type.inputFields:[]
for(var{name:a}of t){var r=N.includes(a),l=!E.has(a)
r&&l&&e.add(a)}return e},[E,N,C]),S=e=>{var t=JSON.stringify(e)
return e.length<=2&&(t.includes(JSON.stringify({__typename:"AggregationOption",label:"0",value:"0"}))||t.includes(JSON.stringify({__typename:"AggregationOption",label:"1",value:"1"})))},[A,_,T,I]=Object(r.useMemo)(()=>{var e=new Map,a=new Set,r=new Map,l=new Map,n=Object(b.f)([...t])
for(var i of n){var{options:s,label:c,attribute_code:o}=i
if(M.has(o)){var u=[]
if(e.set(o,c),a.add("".concat(o,"[filter]")),S(s))r.set(o,"boolean"),u.push({title:"No",value:"0",label:c+":No"}),u.push({title:"Yes",value:"1",label:c+":Yes"})
else for(var{label:f,value:d}of(r.set(o,null),s))u.push({title:Object(b.g)(f),value:d})
l.set(o,u)}}return[e,a,l,r]},[t,M])
Object(r.useEffect)(()=>{if(n){var e=Object(b.d)(k,_,g)
y.push({pathname:w,search:e}),i(!1)}},[_,g,y,n,w,k])
var F=Object(r.useCallback)(()=>{O("filter")},[O]),R=Object(r.useCallback)(()=>{m()},[m]),D=Object(r.useCallback)(()=>{i(!0),R()},[R]),J=Object(r.useCallback)(()=>{h.clear(),i(!0)},[h,i]),q=Object(r.useCallback)(e=>{if(v)switch(e.keyCode){case 27:R()}},[v,R])
return Object(r.useEffect)(()=>{var e=null===j.current&&"filter"===p,t="filter"===j.current&&null===p
if(e||t){var a=Object(b.e)(k,_,T)
h.setItems(a)}t&&R(),j.current=p},[p,h,T,_,k,R]),Object(r.useEffect)(()=>{var e=Object(b.e)(k,_,T)
h.setItems(e)},[h,T,_,k]),{filterApi:h,filterItems:T,filterKeys:_,filterNames:A,filterFrontendInput:I,filterState:g,handleApply:D,handleClose:R,handleKeyDownActions:q,handleOpen:F,handleReset:J,isApplying:n,isOpen:v}})({filters:t}),{filterApi:h,filterItems:j,filterNames:v,filterFrontendInput:y,filterState:w,handleApply:k,handleReset:C}=i,N=Object(r.useRef)(),E=Object(u.a)(g.a,e.classes),M=Object(r.useCallback)(function(){var e=N.current
if(e&&"function"==typeof e.getBoundingClientRect){var t=e.getBoundingClientRect().top,a=window.scrollY+t-150
window.scrollTo(0,a)}k(...arguments)},[k,N]),S=Object(r.useMemo)(()=>Array.from(j,(e,t)=>{var[r,n]=e,i=w.get(r),s=v.get(r),c=y.get(r)
return l.a.createElement(m.a,{key:r,filterApi:h,filterState:i,filterFrontendInput:c,group:r,items:n,name:s,onApply:M,initialOpen:t<a})}),[h,j,v,y,w,a,M]),A=w.size?l.a.createElement("div",{className:E.action},l.a.createElement(p.a,{type:"button",onClick:C},l.a.createElement(n.a,{id:"filterModal.action",defaultMessage:"Clear all"}))):null
return l.a.createElement("aside",{className:E.root,ref:N,"aria-busy":"false"},l.a.createElement("div",{className:E.body},l.a.createElement("div",{className:E.header},l.a.createElement("h2",{className:E.headerTitle},l.a.createElement(n.a,{id:"filterModal.headerTitle",defaultMessage:"Filters"}))),l.a.createElement(O.a,{filterApi:h,filterNames:v,filterState:w,onRemove:M}),A,l.a.createElement("ul",{className:E.blocks},S)))}
h.defaultProps={filterCountToOpen:3},h.propTypes={classes:Object(i.shape)({action:i.string,blocks:i.string,body:i.string,header:i.string,headerTitle:i.string,root:i.string,root_open:i.string}),filters:Object(i.arrayOf)(Object(i.shape)({attribute_code:i.string,items:i.array})),filterCountToOpen:i.number}
var j=h,v=a("LlM3")}}])
