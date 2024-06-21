/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{MzgX:function(t,e,s){"use strict"
s.d(e,"a",function(){return LinesEllipsis})
var i=s("q1tI")
function _extends(){return(_extends=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]
for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t}).apply(this,arguments)}const n={position:"absolute",bottom:0,left:0,height:0,overflow:"hidden","padding-top":0,"padding-bottom":0,border:"none"},o=["box-sizing","width","font-size","font-weight","font-family","font-style","letter-spacing","text-indent","white-space","word-break","overflow-wrap","padding-left","padding-right"]
const a=["component","ellipsis","trimRight","className"]
function prevSibling(t,e){for(;t&&e--;)t=t.previousElementSibling
return t}const l={basedOn:void 0,className:"",component:"div",ellipsis:"…",maxLine:1,onReflow(){},text:"",trimRight:!0,winWidth:void 0},r=Object.keys(l)
class LinesEllipsis extends i.Component{constructor(t){super(t),this.state={text:t.text,clamped:!1},this.units=[],this.maxLine=0,this.canvas=null}componentDidMount(){this.initCanvas(),this.reflow(this.props)}componentDidUpdate(t){t.winWidth!==this.props.winWidth&&this.copyStyleToCanvas(),this.props!==t&&this.reflow(this.props)}componentWillUnmount(){this.canvas.parentNode.removeChild(this.canvas),this.canvas=null}setState(t,e){return void 0!==t.clamped&&(this.clamped=t.clamped),super.setState(t,e)}initCanvas(){if(this.canvas)return
const t=this.canvas=document.createElement("div")
t.className=`LinesEllipsis-canvas ${this.props.className}`,t.setAttribute("aria-hidden","true"),this.copyStyleToCanvas(),Object.keys(n).forEach(e=>{t.style[e]=n[e]}),document.body.appendChild(t)}copyStyleToCanvas(){const t=window.getComputedStyle(this.target)
o.forEach(e=>{this.canvas.style[e]=t[e]})}reflow(t){const e=t.basedOn||(/^[\x00-\x7F]+$/.test(t.text)?"words":"letters")
switch(e){case"words":this.units=t.text.split(/\b|(?=\W)/)
break
case"letters":this.units=Array.from(t.text)
break
default:throw new Error(`Unsupported options basedOn: ${e}`)}this.maxLine=+t.maxLine||1,this.canvas.innerHTML=this.units.map(t=>`<span class='LinesEllipsis-unit'>${t}</span>`).join("")
const s=this.putEllipsis(this.calcIndexes()),i=s>-1,n={clamped:i,text:i?this.units.slice(0,s).join(""):t.text}
this.setState(n,t.onReflow.bind(this,n))}calcIndexes(){const t=[0]
let e=this.canvas.firstElementChild
if(!e)return t
let s=0,i=1,n=e.offsetTop
for(;(e=e.nextElementSibling)&&(e.offsetTop>n&&(i++,t.push(s),n=e.offsetTop),s++,!(i>this.maxLine)););return t}putEllipsis(t){if(t.length<=this.maxLine)return-1
const e=t[this.maxLine],s=this.units.slice(0,e),i=this.canvas.children[e].offsetTop
this.canvas.innerHTML=s.map((t,e)=>`<span class='LinesEllipsis-unit'>${t}</span>`).join("")+`<wbr><span class='LinesEllipsis-ellipsis'>${this.props.ellipsis}</span>`
const n=this.canvas.lastElementChild
let o=prevSibling(n,2)
for(;o&&(n.offsetTop>i||n.offsetHeight>o.offsetHeight||n.offsetTop>o.offsetTop);)this.canvas.removeChild(o),o=prevSibling(n,2),s.pop()
return s.length}isClamped(){return this.clamped}render(){const{text:t,clamped:e}=this.state,s=this.props,{component:n,ellipsis:o,trimRight:l,className:p}=s,c=function _objectWithoutPropertiesLoose(t,e){if(null==t)return{}
var s,i,n={},o=Object.keys(t)
for(i=0;i<o.length;i++)s=o[i],e.indexOf(s)>=0||(n[s]=t[s])
return n}(s,a)
return i.createElement(n,_extends({className:`LinesEllipsis ${e?"LinesEllipsis--clamped":""} ${p}`,ref:t=>this.target=t},function omit(t,e){if(!t||"object"!=typeof t)return t
const s={}
return Object.keys(t).forEach(i=>{e.indexOf(i)>-1||(s[i]=t[i])}),s}(c,r)),e&&l?t.replace(/[\s\uFEFF\xA0]+$/,""):t,i.createElement("wbr",null),e&&i.createElement("span",{className:"LinesEllipsis-ellipsis"},o))}}LinesEllipsis.defaultProps=l}}])
