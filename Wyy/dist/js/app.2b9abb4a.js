(function(t){function n(n){for(var i,o,r=n[0],l=n[1],u=n[2],p=0,d=[];p<r.length;p++)o=r[p],e[o]&&d.push(e[o][0]),e[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);c&&c(n);while(d.length)d.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var t,n=0;n<s.length;n++){for(var a=s[n],i=!0,r=1;r<a.length;r++){var l=a[r];0!==e[l]&&(i=!1)}i&&(s.splice(n--,1),t=o(o.s=a[0]))}return t}var i={},e={app:0},s=[];function o(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,n,a){o.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,n){if(1&n&&(t=o(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)o.d(a,i,function(n){return t[n]}.bind(null,i));return a},o.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=n,r=r.slice();for(var u=0;u<r.length;u++)n(r[u]);var c=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,n,a){t.exports=a("56d7")},"034f":function(t,n,a){"use strict";var i=a("64a9"),e=a.n(i);e.a},"039a":function(t,n,a){"use strict";var i=a("3760"),e=a.n(i);e.a},"04b2":function(t,n,a){},"080f":function(t,n,a){},"1d14":function(t,n,a){t.exports=a.p+"img/Upper.d0739882.svg"},"1d92":function(t,n,a){},3760:function(t,n,a){},"3ed6":function(t,n,a){t.exports=a.p+"img/Left.08d792c0.svg"},"53e8":function(t,n,a){"use strict";var i=a("fbfa"),e=a.n(i);e.a},"56d7":function(t,n,a){"use strict";a.r(n);a("cadf"),a("551c"),a("f751"),a("097d");var i=a("2b0e"),e=a("5c96"),s=a.n(e),o=a("bc3a"),r=a.n(o),l=a("8c4f"),u=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"TopBar"},[a("div",{staticClass:"left",on:{click:function(n){return t.$router.go(-1)}}},[a("img",{attrs:{src:t.LeftImgUrl}})])]),a("div",{staticClass:"Page"},[a("router-view",{ref:"child1Container",attrs:{play:t.play}})],1),a("Playbar",{directives:[{name:"show",rawName:"v-show",value:t.bottomBar,expression:"bottomBar"}],attrs:{playlist:t.playlist,play:t.play},on:{save:t.save}})],1)},c=[],p=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"playbar",on:{click:function(n){return t.playFun(t.song.id)}}},[a("audio",{attrs:{id:"audio",autoplay:""},on:{timeupdate:t.durationUpdate,ended:function(n){return t.playend("next")}}}),a("div",{staticClass:"cover"},[a("img",{attrs:{src:t.song.al.picUrl}})]),a("div",{staticClass:"info"},[a("p",[t._v(t._s(t.song.name))]),a("p",t._l(t.song.ar,function(n){return a("span",[t._v(t._s(n.name))])}),0)]),a("div",{staticClass:"openw",on:{click:function(n){return n.stopPropagation(),t.audioPlay(t.song.id)}}},[a("openBtn",{attrs:{isBtn:t.$parent.play}})],1)])},d=[],g=new i["default"],h=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"openBtn",on:{click:function(n){t.openBtn=!t.openBtn}}},[a("div",{staticClass:"open",class:{on:t.openBtn,off:!t.openBtn}},[a("div"),a("div"),a("div")])])},f=[],m={name:"openBtn",props:["isBtn"],data:function(){return{openBtn:!1}},mounted:function(){this.openBtn=this.isBtn},watch:{isBtn:function(t){this.openBtn=t}}},v=m,y=(a("53e8"),a("2877")),S=Object(y["a"])(v,h,f,!1,null,null,null),$=S.exports,w={name:"Playbar",props:["playlist","play"],components:{openBtn:$},data:function(){return{song:{al:""},index:0}},methods:{durationUpdate:function(){if("/play"!=this.$route.path)return!1;this.$emit("save")},playFun:function(t){this.$router.push("/play")},audioPlay:function(t){var n=this.$parent.audio.paused;n?(localStorage.playsongID=t,this.$parent.audio.play()):this.$parent.audio.pause(),this.$parent.play=n},playend:function(t){var n=this.$parent.playlist,a=n[0].index;a++,n.length,n[0].index=a;var i=this;this.user=JSON.parse(localStorage.user),this.axios.get(this.ApiURl+"/song/detail",{params:{ids:n[a].id,cookie:this.user.cookie}}).then(function(t){i.song=t.data.songs[0],g.$emit("song",i.song),i.axios.get(i.ApiURl+"/song/url",{params:{id:n[a].id,cookie:i.user.cookie}}).then(function(t){window.paused=n[a].id,i.$parent.play=!0,i.$parent.audio.src=t.data.data[0].url,localStorage.setItem("played",JSON.stringify(i.song))})})}},mounted:function(){var t=this;g.$on("song",function(n){t.song=n}),this.$parent.audio=document.querySelector("#audio"),console.log(this.$parent.audio);var n=localStorage.played,a=localStorage.user;if(!n||!a)return!1;n=JSON.parse(n),a=JSON.parse(a),this.song=n,this.song.play=!1;var i=this;this.axios.get(this.ApiURl+"/song/url",{params:{id:n.id,cookie:a.cookie}}).then(function(t){i.$parent.audio.src=t.data.data[0].url,i.$parent.audio.pause()})},watch:{play:function(t){}}},k=w,b=(a("bb05"),Object(y["a"])(k,p,d,!1,null,null,null)),_=b.exports,x=a("3ed6"),C=a.n(x),I={name:"app",components:{Playbar:_},watch:{$route:function(){"/play"==this.$route.path?this.bottomBar=!1:this.bottomBar=!0}},data:function(){return{playlist:[],play:"",user:"",bottomBar:!0,LeftImgUrl:C.a}},methods:{save:function(){this.$refs.child1Container.durationUpdate()}},mounted:function(){if(void 0==localStorage.user)return this.$router.push("/login"),!1;var t=JSON.parse(localStorage.user);if(void 0==t.account)this.$router.push("/login");else{this.user=t;var n=this;this.axios.get(this.ApiURl+"/login/status",{params:{cookie:t.cookie}}).then(function(t){var a=t.data.data;200!=a.code&&n.$router.push("/login")})}}},U=I,O=(a("034f"),Object(y["a"])(U,u,c,!1,null,null,null)),B=O.exports,D=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"login"},[a("h1",[t._v("Login")]),a("div",{staticClass:"input"},[a("el-input",{attrs:{placeholder:"输入手机号"},model:{value:t.input.phone,callback:function(n){t.$set(t.input,"phone",n)},expression:"input.phone"}}),a("el-input",{attrs:{placeholder:"输入密码","show-password":""},model:{value:t.input.password,callback:function(n){t.$set(t.input,"password",n)},expression:"input.password"}}),a("el-link",{attrs:{type:"primary"},on:{click:function(n){return t.Qrlogin()}}},[t._v("二维码登录")]),a("el-button",{attrs:{type:"primary"},on:{click:function(n){return t.login()}}},[t._v("登录")])],1),a("el-dialog",{attrs:{title:"扫码登录",visible:t.qrdialog,width:"50%","custom-class":"qr-dialog",center:""},on:{"update:visible":function(n){t.qrdialog=n},close:t.Closedialog}},[a("img",{attrs:{src:t.QrimgUrl}}),a("p",[t._v(t._s(t.loginStatus)+" ")])]),""!=t.message?a("p",[t._v(t._s(t.message))]):t._e()],1)},N=[],R={name:"Login",data:function(){return{input:{phone:"",password:""},QrimgUrl:"",message:"",qrdialog:!1,loginStatus:"  "}},mounted:function(){localStorage.user&&this.$router.push("./")},methods:{login:function(t){if(!window.localStorage)return alert("请更新浏览器"),!1;var n=this;""==this.input.phone||""==this.input.password?this.$message({message:"请完成输入",type:"warning"}):this.axios.get("".concat(this.ApiURl,"/login/cellphone"),{params:{phone:this.input.phone,password:this.input.password}}).then(function(t){console.log(t.data);var a=t.data;if(n.message=a.message,200!=a.code)return!1;localStorage.setItem("user",JSON.stringify(a.cookie)),n.$router.push("./")}).catch(function(t){})},Qrlogin:function(){var t=this,n=Date.parse(new Date);this.axios.get("".concat(this.ApiURl,"/login/qr/key"),{params:{time:n}}).then(function(a){var i=a.data.data.unikey;t.axios.get("".concat(t.ApiURl,"/login/qr/create"),{params:{key:i,qrimg:1,time:n}}).then(function(n){200==n.data.code&&(t.qrdialog=!0,t.QrimgUrl=n.data.data.qrimg,t.Interval=setInterval(function(){var n=Date.parse(new Date);t.axios.get("".concat(t.ApiURl,"/login/qr/check"),{params:{key:i,time:n}}).then(function(n){var a=n.data.code;801==a?t.loginStatus=n.data.message:802==a&&(t.loginStatus=n.data.message),803==a&&(t.loginStatus=n.data.message,localStorage.setItem("user",JSON.stringify(n.data.cookie)),clearInterval(t.Interval),t.$router.push("./")),console.log(t.loginStatus)})},1e3))})})},Closedialog:function(){clearInterval(this.Interval)}}},P=R,A=(a("039a"),Object(y["a"])(P,D,N,!1,null,null,null)),J=A.exports,j=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"playlist"},t._l(t.playlist,function(n,i){return a("div",{staticClass:"song",class:{noCopyright:void 0!=n.noCopyrightRcmd},on:{click:function(n){return t.playFun(i,n)}}},[a("div",{staticClass:"num"},[t._v(t._s(i+1)+".")]),a("div",{staticClass:"info"},[a("p",[t._v(t._s(n.name))]),a("p",t._l(n.ar,function(n){return a("span",[t._v(t._s(n.name))])}),0)]),n.id==t.playing?a("div",{staticClass:"disk",style:{animationPlayState:t.animation}},[a("img",{attrs:{src:t.diskImgUrl}})]):t._e()])}),0)},q=[],F=a("87f6"),L=a.n(F),M={name:"playlist",props:["play"],data:function(){return{playlist:[],i:"",playing:"",diskImgUrl:L.a,animation:""}},methods:{playFun:function(t,n){var a=this;if(n.currentTarget.classList.contains("noCopyright"))return!1;localStorage.playsongID=this.playlist[t].id,localStorage.playlistID=window.playlistID;var i=localStorage.playsongID;this.axios.get(this.ApiURl+"/song/detail",{params:{ids:i,cookie:this.cookie}}).then(function(t){a.song=t.data.songs[0],g.$emit("song",a.song),a.playing=a.song.id,a.axios.get(a.ApiURl+"/song/url",{params:{id:i,cookie:a.cookie}}).then(function(t){localStorage.playsongID=i,window.playsongID=i,a.$parent.play=!0,a.$parent.audio.src=t.data.data[0].url,localStorage.setItem("played",JSON.stringify(a.song))})})}},mounted:function(){var t=this;t.cookie=localStorage.user;var n=this.$route.query.id;this.playing=localStorage.playsongID,window.playlistID=n,this.play?this.animation="running":this.animation="paused",this.user=JSON.parse(localStorage.user),this.axios.get(this.ApiURl+"/playlist/track/all",{params:{id:n,cookie:this.cookie}}).then(function(a){t.playlist=a.data.songs,localStorage.setItem("playlist"+n,JSON.stringify(t.playlist))})},watch:{play:function(t){this.animation=t?"running":"paused"}}},T=M,E=(a("dfba"),Object(y["a"])(T,j,q,!1,null,null,null)),Q=E.exports,z=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"songslists"},[t._l(t.Songslists,function(n,i){return a("div",{staticClass:"songs",on:{click:function(n){return t.songsFun(i)}}},[a("div",{staticClass:"cover"},[a("img",{attrs:{src:n.coverImgUrl+"?param=100y100",alt:""}})]),a("div",{staticClass:"info"},[a("p",[t._v(t._s(n.name))]),a("p",[t._v(t._s(n.trackCount)+" 首")])])])}),a("el-button",{on:{click:t.uLogin}},[t._v("退出登录")])],2)},G=[],H={name:"Songslists",data:function(){return{Songslists:[]}},mounted:function(){if(localStorage.user){var t=this;if(t.cookie=localStorage.user,this.axios.get(this.ApiURl+"/user/account",{params:{cookie:t.cookie}}).then(function(n){n.data.account||t.$router.push("./Login");var a=n.data.account.id;t.axios.get(t.ApiURl+"/user/playlist",{params:{uid:a}}).then(function(n){t.Songslists=n.data.playlist,localStorage.Songslists=JSON.stringify(t.Songslists)})}),void 0!=localStorage.Songslists)return this.Songslists=JSON.parse(localStorage.Songslists),!1}},methods:{songsFun:function(t){this.$router.push({path:"/playlist",query:{id:this.Songslists[t].id}})},uLogin:function(){localStorage.clear(),location.reload()}}},K=H,V=(a("ff52"),Object(y["a"])(K,z,G,!1,null,null,null)),W=V.exports,X=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"play"},[a("div",{staticClass:"cover"},[a("img",{attrs:{src:t.song.al.picUrl}})]),a("div",{staticClass:"name"},[a("p",{domProps:{textContent:t._s(t.song.name)}})]),a("div",{staticClass:"slider",on:{mousedown:function(n){return t.ChangeFun(!0)},touchstart:function(n){return t.ChangeFun(!0)}}},[a("el-slider",{attrs:{"show-tooltip":!1},on:{change:t.sliderFun,input:t.sliderTimer},model:{value:t.slider,callback:function(n){t.slider=n},expression:"slider"}})],1),a("div",{staticClass:"timer"},[a("span",[t._v(t._s(t.timer.s))]),t._v(" / "),a("span",[t._v(t._s(t.timer.e))])]),a("div",{staticClass:"playBtn"},[a("div",{staticClass:"songBtn",on:{click:function(n){return t.songSwitch(!1)}}},[a("img",{attrs:{src:t.UpperImgUrl}})]),a("openBtn",{attrs:{isBtn:t.$parent.play},nativeOn:{click:function(n){return t.audioPlay(n)}}}),a("div",{staticClass:"songBtn",on:{click:function(n){return t.songSwitch(!0)}}},[a("img",{attrs:{src:t.NextImgUrl}})])],1)])},Y=[],Z=a("eb75"),tt=a.n(Z),nt=a("1d14"),at=a.n(nt),it={name:"Play",props:["play"],components:{openBtn:$},data:function(){return{song:{al:""},slider:0,timer:{s:"00:00",e:"00:00"},NextImgUrl:tt.a,UpperImgUrl:at.a}},mounted:function(){var t=this;if(!this.$parent.audio)return this.$router.go(-1),!1;g.$on("song",function(n){t.song=n});var n=localStorage.playlistID,a=localStorage.getItem("playlist"+n);if(a){a=JSON.parse(a);a[0].time;this.playlist=a,this.$parent.playlist=a;var i=localStorage.playsongID;for(var e in a)if(a[e].id==i){this.$parent.playlist[0].index=e;break}}var s=localStorage.playsongID;this.$parent.playlist[0].index;if(void 0==s)return!1;this.user=JSON.parse(localStorage.user),g.$emit("playing",s),this.$parent.play=!this.$parent.audio.paused,this.axios.get(this.ApiURl+"/song/detail",{params:{ids:s,cookie:this.user.cookie}}).then(function(n){t.song=n.data.songs[0],g.$emit("song",t.song);var a=new Date(t.song.dt),i=a.getMinutes(),e=a.getSeconds();if(i=i<10?"0"+i:i,e=e<10?"0"+e:e,t.timer.e=i+":"+e,localStorage.playsongID==window.playsongID)return!1;t.axios.get(t.ApiURl+"/song/url",{params:{id:s,cookie:t.user.cookie}}).then(function(n){localStorage.playsongID=s,window.playsongID=s,t.$parent.play=!0,t.$parent.audio.src=n.data.data[0].url,localStorage.setItem("played",JSON.stringify(t.song))})})},methods:{sliderFun:function(){var t=this.slider*this.song.dt/1e5;this.$parent.audio.currentTime=t,this.isChange=!1},durationUpdate:function(){if(!0===this.isChange)return!1;var t=Math.floor(this.$parent.audio.currentTime);this.slider=t/(this.song.dt/1e3)*100},sliderTimer:function(){var t=this.song.dt*this.slider/1e5;if(!isNaN(t)){t=Math.round(t);var n=t%60,a=Math.round(t/60);n=n<10?"0"+n:n,a=a<10?"0"+a:a,this.timer.s=a+":"+n}},audioPlay:function(){var t=this.$parent.audio.paused;t?this.$parent.audio.play():this.$parent.audio.pause(),this.$parent.play=t,this.song.play=t},songSwitch:function(t){var n=this.$parent.playlist,a=n[0].index;t?(a++,a==n.length&&(a=0),n[a].noCopyrightRcmd&&a++):(a--,-1==a&&(a=n.length-1),n[a].noCopyrightRcmd&&a--),n[0].index=a;var i=this;this.axios.get(this.ApiURl+"/song/detail",{params:{ids:n[a].id,cookie:this.user.cookie}}).then(function(t){i.song=t.data.songs[0],g.$emit("song",i.song);var e=new Date(i.song.dt),s=e.getMinutes(),o=e.getSeconds();s=s<10?"0"+s:s,o=o<10?"0"+o:o,i.timer.e=s+":"+o,i.axios.get(i.ApiURl+"/song/url",{params:{id:n[a].id,cookie:i.user.cookie}}).then(function(t){window.playsongID=n[a].id,localStorage.playsongID=n[a].id,i.$parent.play=!0,i.$parent.audio.src=t.data.data[0].url,localStorage.setItem("played",JSON.stringify(i.song))})})},ChangeFun:function(t){this.isChange=t}}},et=it,st=(a("7975"),Object(y["a"])(et,X,Y,!1,null,null,null)),ot=st.exports,rt=l["a"].prototype.push;l["a"].prototype.push=function(t){return rt.call(this,t).catch(function(t){return t})};var lt=new l["a"]({mode:"history",routes:[{path:"/login",component:J},{path:"/playlist",component:Q},{path:"/",component:W},{path:"/Play",component:ot}]});a("0fae");i["default"].config.productionTip=!1,r.a.defaults.withCredentials=!0,i["default"].prototype.axios=r.a,i["default"].prototype.ApiURl="https://service-hbmwkqmh-1306000875.cd.apigw.tencentcs.com/release",i["default"].use(s.a),i["default"].use(l["a"]);var ut=l["a"].prototype.push;l["a"].prototype.push=function(t){return ut.call(this,t).catch(function(t){return t})},new i["default"]({el:"#app",render:function(t){return t(B)},router:lt,data:{event:new i["default"]}})},"64a9":function(t,n,a){},"6ede":function(t,n,a){},7975:function(t,n,a){"use strict";var i=a("080f"),e=a.n(i);e.a},"87f6":function(t,n,a){t.exports=a.p+"img/disk.4c10b256.png"},bb05:function(t,n,a){"use strict";var i=a("1d92"),e=a.n(i);e.a},dfba:function(t,n,a){"use strict";var i=a("04b2"),e=a.n(i);e.a},eb75:function(t,n,a){t.exports=a.p+"img/Next.a11a70cc.svg"},fbfa:function(t,n,a){},ff52:function(t,n,a){"use strict";var i=a("6ede"),e=a.n(i);e.a}});
//# sourceMappingURL=app.2b9abb4a.js.map