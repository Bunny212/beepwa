/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{YQ8e:function(e,t,n){"use strict"
n.r(t),n.d(t,"default",function(){return v})
var r=n("q1tI"),a=n.n(r),c=n("17x9"),o=n("dDsW"),s=n("kriW"),i=n("lSNA"),l=n.n(i),u=n("Ty5D"),d=n("FITH")
function ownKeys(e,t){var n=Object.keys(e)
if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e)
t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{}
t%2?ownKeys(Object(n),!0).forEach(function(t){l()(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var g=["email","firstName","lastName"],p=e=>{var{signedInRedirectUrl:t,signInPageUrl:n}=e,a=Object(u.g)(),[{isSignedIn:c}]=Object(d.b)(),{search:o}=Object(u.h)(),s=Object(r.useMemo)(()=>a&&a.location.state?a.location.state:{},[a]),i=s.from||null
Object(r.useEffect)(()=>{c&&(i||t)&&a.push(i||t)},[i,a,c,t])
var l=Object(r.useCallback)(()=>{n&&a.push(n,s)},[a,s,n])
return{createAccountProps:{initialValues:Object(r.useMemo)(()=>(e=>{var t=new URLSearchParams(e)
return g.reduce((e,n)=>_objectSpread(_objectSpread({},e),{},{[n]:t.get(n)}),{})})(o),[o]),isCancelButtonHidden:!1,onCancel:l}}},b=n("y1Xp"),f=n("+h8t"),m=n("UPvi"),O=n("LboF"),j=n.n(O),P=n("n4HV"),y={injectType:"singletonStyleTag",insert:"head",singleton:!0},h=(j()(P.a,y),P.a.locals||{}),w=e=>{var t=Object(b.a)(h,e.classes),{createAccountProps:n}=p(e),{formatMessage:r}=Object(o.a)()
return a.a.createElement("div",{className:t.root},a.a.createElement(m.b,null,r({id:"createAccountPage.title",defaultMessage:"Create an Account"})),a.a.createElement("h1",{className:t.header},a.a.createElement(s.a,{id:"createAccountPage.header",defaultMessage:"Create an Account"})),a.a.createElement("div",{className:t.contentContainer},a.a.createElement(f.a,n)))}
w.defaultProps={signedInRedirectUrl:"/order-history",signInPageUrl:"/sign-in"},w.propTypes={classes:Object(c.shape)({root:c.string,header:c.string,contentContainer:c.string}),signedInRedirectUrl:c.string,signInPageUrl:c.string}
var v=w},n4HV:function(e,t,n){"use strict"
var r=n("JPst"),a=n.n(r)()(function(e){return e[1]})
a.push([e.i,".createAccountPage-root-5tc {\n    grid-template-columns: minmax(auto, 512px);\n}\n\n.createAccountPage-header-77p {\n}\n\n.createAccountPage-contentContainer-0Td {\n}\n",""]),a.locals={root:"createAccountPage-root-5tc gap-y-md grid justify-center px-0 py-md text-center",header:"createAccountPage-header-77p font-serif",contentContainer:"createAccountPage-contentContainer-0Td lg_border-2 lg_border-solid lg_border-subtle lg_pb-md lg_rounded-md"},t.a=a}}])
