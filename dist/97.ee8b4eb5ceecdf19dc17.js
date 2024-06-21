/*! @version pwa-studio: 0.0.1, @magento/venia-ui: ~10.0.0, @magento/venia-sample-payments-checkmo: ^0.0.12, @magento/upward-security-headers: ^1.0.14, @magento/pwa-theme-venia: ~1.4.0, @magento/pwa-buildpack: ^11.4.1, @magento/peregrine: ~13.0.0, @magento/pagebuilder: ~8.0.0, @magento/eslint-config: ~1.5.0, @magento/babel-preset-peregrine: ~1.2.2, @apollo/client: ~3.5.0 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{NYgU:function(e,t,a){"use strict"
a.r(t),a.d(t,"default",function(){return I})
var n,i,s=a("q1tI"),r=a.n(s),l=a("dDsW"),c=a("kriW"),o=a("8UhI"),u=a("J3e4"),m=a("yXPU"),b=a.n(m),d=a("+TN3"),g=a("pZLH"),f=a("y1Xp"),p=a("FITH"),h=a("VkAN"),y=a.n(h),E=a("UYTu"),S=Object(E.a)(n||(n=y()(["\n    mutation SetNewsletterSubscription($isSubscribed: Boolean!) {\n        updateCustomer(input: { is_subscribed: $isSubscribed }) {\n            # eslint-disable-next-line @graphql-eslint/require-id-when-available\n            customer {\n                is_subscribed\n            }\n        }\n    }\n"]))),v={getCustomerSubscriptionQuery:Object(E.a)(i||(i=y()(["\n    query GetCustomerSubscription {\n        # eslint-disable-next-line @graphql-eslint/require-id-when-available\n        customer {\n            is_subscribed\n        }\n    }\n"]))),setNewsletterSubscriptionMutation:S},j=e=>{var{afterSubmit:t}=e,a=Object(f.a)(v,e.operations),{getCustomerSubscriptionQuery:n,setNewsletterSubscriptionMutation:i}=a,[{isSignedIn:r}]=Object(p.b)(),{data:l,error:c}=Object(d.a)(n,{skip:!r}),o=Object(s.useMemo)(()=>{if(l)return{isSubscribed:l.customer.is_subscribed}},[l]),[u,{error:m,loading:h}]=Object(g.a)(i)
return{formErrors:[m,c],initialValues:o,handleSubmit:Object(s.useCallback)(function(){var e=b()(function*(e){try{yield u({variables:e})}catch(e){return}t&&t()})
return function(t){return e.apply(this,arguments)}}(),[u,t]),isDisabled:h}},P=a("ACyH"),N=a("Ri9G"),T=a("7X3U"),O=a("dTQg"),C=a("UPvi"),x=a("DUu4"),w=a("LboF"),k=a.n(w),M=a("kEv4"),V={injectType:"singletonStyleTag",insert:"head",singleton:!0},q=(k()(M.a,V),M.a.locals||{}),I=e=>{var{formatMessage:t}=Object(l.a)(),a=Object(f.a)(q,e.classes),[,{addToast:n}]=Object(u.a)(),i=Object(s.useCallback)(()=>{n({type:"info",message:t({id:"communicationsPage.preferencesText",defaultMessage:"Your preferences have been updated."}),timeout:5e3})},[n,t]),m=j({afterSubmit:i}),{formErrors:b,handleSubmit:d,initialValues:g,isDisabled:p}=m
if(!g)return x.a
var h=t({id:"communicationsPage.title",defaultMessage:"Communications"})
return r.a.createElement("div",{className:a.root},r.a.createElement(C.b,null,h),r.a.createElement("h1",{className:a.title},r.a.createElement(c.a,{id:"communicationsPage.communicationsText",defaultMessage:"Communications"})),r.a.createElement("p",null,r.a.createElement(c.a,{id:"communicationsPage.optInText",defaultMessage:"We'd like to stay in touch. Please check the boxes next to the communications you'd like to receive."})),r.a.createElement(O.a,{errors:b}),r.a.createElement(o.b,{className:a.form,onSubmit:d,initialValues:g},r.a.createElement(T.a,{id:"isSubscribed",label:t({id:"communicationsPage.eNewsletterText",defaultMessage:"Venia E-Newsletter"})},r.a.createElement(N.a,{field:"isSubscribed",label:t({id:"communicationsPage.subscribeText",defaultMessage:"Stay on the cutting edge of fashion; subscribe to the monthly Venia Newsletter."})})),r.a.createElement("div",{className:a.buttonsContainer},r.a.createElement(P.a,{disabled:p,type:"submit",priority:"high"},t(p?{id:"communicationsPage.savingText",defaultMessage:"Saving"}:{id:"communicationsPage.changesText",defaultMessage:"Save Changes"})))))}},Ri9G:function(e,t,a){"use strict"
var n=a("pVnL"),i=a.n(n),s=a("QILm"),r=a.n(s),l=a("q1tI"),c=a.n(l),o=a("17x9"),u=a("8UhI"),m=a("c3RJ"),b=a("y1Xp"),d=a("gpca"),g=a("/Gi5"),f=a("ZRVi"),p=a("LboF"),h=a.n(p),y=a("jMiJ"),E={injectType:"singletonStyleTag",insert:"head",singleton:!0},S=(h()(y.a,E),y.a.locals||{}),v=["ariaLabel","classes","field","fieldValue","id","label","message"],j=c.a.createElement(g.a,null),P=c.a.createElement(f.a,null),N=e=>{var{ariaLabel:t,classes:a,field:n,fieldValue:s,id:o,label:g,message:f}=e,p=r()(e,v),h=Object(u.k)(n),y=Object(m.a)(n),E=Object(b.a)(S,a),N=y.value?j:P
return Object(l.useEffect)(()=>{null!=s&&s!==y.value&&h.setValue(s)},[h,y.value,s]),c.a.createElement(l.Fragment,null,c.a.createElement("label",{"aria-label":t,className:E.root,htmlFor:o},c.a.createElement(u.a,i()({},p,{className:E.input,field:n,id:o})),c.a.createElement("span",{className:E.icon},N),c.a.createElement("span",{className:E.label},g)),c.a.createElement(d.a,{fieldState:y},f))}
t.a=N
N.propTypes={ariaLabel:o.string,classes:Object(o.shape)({icon:o.string,input:o.string,label:o.string,message:o.string,root:o.string}),field:o.string.isRequired,id:o.string,label:o.node.isRequired,message:o.node}},kEv4:function(e,t,a){"use strict"
var n=a("JPst"),i=a.n(n)()(function(e){return e[1]})
i.push([e.i,".communicationsPage-root-BcS {\n}\n\n.communicationsPage-title-yCV {\n}\n\n.communicationsPage-form-Na6 {\n}\n\n.communicationsPage-buttonsContainer-YRT {\n}\n",""]),i.locals={root:"communicationsPage-root-BcS grid gap-y-md px-sm py-md lg_px-lg",title:"communicationsPage-title-yCV font-bold font-serif justify-self-center",form:"communicationsPage-form-Na6 grid gap-y-md",buttonsContainer:"communicationsPage-buttonsContainer-YRT flex justify-center lg_justify-start"},t.a=i}}])
