"use strict";(self.webpackChunkwarehouse=self.webpackChunkwarehouse||[]).push([[611],{5076:(t,e,n)=>{var r=n(74783)(t.id,{locals:!1});t.hot.dispose(r),t.hot.accept(void 0,r)},44136:(t,e,n)=>{n.d(e,{v9:()=>a,bR:()=>c,yC:()=>s});var r=n(70655),i=n(9669),o=n.n(i);var l=new(function(){function t(t){var e=this;this.instance=o().create({baseURL:t.baseURL,timeout:6e4}),this.instance.interceptors.request.use((function(t){var e=(0,r.pi)({},t.params);return Object.keys(e).forEach((function(n){"[object Array]"===Object.prototype.toString.call(e[n])?0===e[n].length&&delete t.params[n]:""===e[n]&&delete t.params[n]})),t}),(function(t){return console.error("request err: "+t),Promise.reject(t)})),this.instance.interceptors.response.use((function(t){return(0,r.mG)(e,void 0,void 0,(function(){var e;return(0,r.Jh)(this,(function(n){return e=t.data,200!==t.status?[2,e]:[2,(null==e?void 0:e.data)||e]}))}))}))}return t.prototype.request=function(t){return this.instance.request(t)},t}())({baseURL:"/api/bqss"}),s=function(t){return l.request({url:"",params:{name:t}})},a=function(t){return l.request({url:"",params:{book:t}})},c=function(t){return l.request({params:{chapter:t}})}},41611:(t,e,n)=>{n.r(e),n.d(e,{default:()=>p});var r=n(70655),i=n(66252),o=n(2262),l=n(4727),s=n(44136),a=n(79950),c=["innerHTML"],u={class:"footer"};const f=(0,i.aZ)({__name:"chapter",setup:function(t){var e=(0,l.tv)(),n=(0,l.yj)().query,f=n.title,p=n.url,v=n.link,d=(0,o.qj)({title:"",content:"",prev:"",dir:"",next:""}),h=function(t){(0,s.bR)(t).then((function(t){Object.assign(d,(0,r.pi)((0,r.pi)({},t),{content:t.content.replace(/\n/g,"<br/>")}))}))};(0,i.bv)((function(){return h(v)}));var m=function(){e.push({path:"/novel/book",query:{title:f,url:p}})},b=function(t){var e,n=d.prev;t&&(n=d.next),null===(e=document.querySelector("#app"))||void 0===e||e.scrollTo({top:0,behavior:"smooth"}),h(n)};return function(t,e){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i.Wm)((0,o.SU)(a.l2),{title:d.title,"left-text":"返回","left-arrow":"",onClickLeft:m},null,8,["title"]),(0,i._)("div",{class:"content",innerHTML:d.content},null,8,c),(0,i._)("div",u,[(0,i._)("div",{onClick:e[0]||(e[0]=function(t){return b(-1)})},"上一章"),(0,i._)("div",{onClick:m},"返回目录"),(0,i._)("div",{onClick:e[1]||(e[1]=function(t){return b(1)})},"下一章")])],64)}}});n(5076);const p=(0,n(83744).Z)(f,[["__scopeId","data-v-03b1afb8"]])},79950:(t,e,n)=>{n.d(e,{l2:()=>x});var r=n(60458),i=n(66252),o=n(2262),l=n(69678),s=n(8443),a=n(52639),c=n(5314),u=n(40590),f=n(16846);const p=Symbol();const v=(t,e)=>{const n=(0,o.iH)(),r=()=>{n.value=(0,u.EL)(t).height};return(0,i.bv)((()=>{if((0,i.Y3)(r),e)for(let t=1;t<=3;t++)setTimeout(r,100*t)})),function(t){const e=(0,i.f3)(p,null);e&&(0,i.YP)(e,(e=>{e&&t()}))}((()=>(0,i.Y3)(r))),(0,i.YP)([f.bn,f.uK],r),n};var d=n(86425);const[h,m]=(0,l.do)("nav-bar"),b={title:String,fixed:Boolean,zIndex:s.Or,border:s.J5,leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean,clickable:s.J5};var k=(0,i.aZ)({name:h,props:b,emits:["clickLeft","clickRight"],setup(t,{emit:e,slots:n}){const r=(0,o.iH)(),l=function(t,e){const n=v(t,!0);return t=>(0,i.Wm)("div",{class:e("placeholder"),style:{height:n.value?`${n.value}px`:void 0}},[t()])}(r,m),s=t=>e("clickLeft",t),u=t=>e("clickRight",t),f=()=>{const{title:e,fixed:o,border:l,zIndex:f}=t,p=(0,a.As)(f),v=t.leftArrow||t.leftText||n.left,h=t.rightText||n.right;return(0,i.Wm)("div",{ref:r,style:p,class:[m({fixed:o}),{[c.xe]:l,"van-safe-area-top":t.safeAreaInsetTop}]},[(0,i.Wm)("div",{class:m("content")},[v&&(0,i.Wm)("div",{class:[m("left"),t.clickable?c.e9:""],onClick:s},[n.left?n.left():[t.leftArrow&&(0,i.Wm)(d.JO,{class:m("arrow"),name:"arrow-left"},null),t.leftText&&(0,i.Wm)("span",{class:m("text")},[t.leftText])]]),(0,i.Wm)("div",{class:[m("title"),"van-ellipsis"]},[n.title?n.title():e]),h&&(0,i.Wm)("div",{class:[m("right"),t.clickable?c.e9:""],onClick:u},[n.right?n.right():(0,i.Wm)("span",{class:m("text")},[t.rightText])])])])};return()=>t.fixed&&t.placeholder?l(f):f()}});const x=(0,r.n)(k)}}]);