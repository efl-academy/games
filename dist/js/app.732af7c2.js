(function(e){function t(t){for(var s,a,o=t[0],c=t[1],u=t[2],d=0,h=[];d<o.length;d++)a=o[d],r[a]&&h.push(r[a][0]),r[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s]);l&&l(t);while(h.length)h.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],s=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(s=!1)}s&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var s={},r={app:0},i=[];function a(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=s,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(n,s,function(t){return e[t]}.bind(null,s));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"00d9":function(e,t,n){"use strict";var s=n("5648"),r=n.n(s);r.a},1105:function(e,t,n){},"209d":function(e,t,n){"use strict";var s=n("97f8"),r=n.n(s);r.a},3924:function(e,t,n){},"39df":function(e,t,n){},"4d19":function(e,t,n){"use strict";var s=n("d6ae"),r=n.n(s);r.a},5648:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"fade",mode:"out-in"}},["loading"===e.currentStateValue?n("div",{key:"loading",staticClass:"lds-dual-ring"}):e._e(),"welcome"===e.currentStateValue?n("welcome-page",{key:"welcome",on:{"start-game":e.startGame}}):e._e(),"intro"===e.currentStateValue?n("picture-page",{key:"intro",attrs:{visible:"intro"===e.currentStateValue,images:e.assets["intro"],state:"intro"},on:{next:e.onNextPage}}):e._e(),"getready"===e.currentStateValue?n("picture-page",{key:"getready",attrs:{visible:"getready"===e.currentStateValue,images:e.assets["getready"],state:"getready"},on:{next:e.onNextPage}}):e._e(),"computershot"===e.currentStateValue?n("picture-page",{key:"computershot",attrs:{images:e.assets["computershot"],state:"computershot"},on:{next:e.onNextPage}}):e._e(),"question"===e.currentStateValue?n("div",{key:"question"},[n("timer",{attrs:{timeLimit:"quiz"===e.questionType?e.quizTimeLimit:e.typerTimeLimit},on:{"time-is-up":e.onTimeIsUp}}),"typing"===e.questionType?n("typerighter",{attrs:{data:e.typerData,currentIndex:e.typerCurrentIndex},on:{answered:e.onTyperighterAnswer}}):e._e(),"quiz"===e.questionType?n("options-question",{attrs:{holder:e.currentHolder,data:e.quizData,currentIndex:e.quizCurrentIndex},on:{answered:e.onQuizAnswer}}):e._e()],1):e._e(),"goal"===e.currentStateValue?n("picture-page",{key:"goal",attrs:{images:e.assets["goal"],state:"goal"},on:{next:e.onNextPage}}):e._e(),"miss"===e.currentStateValue?n("picture-page",{key:"miss",attrs:{images:e.assets["miss"],state:"miss"},on:{next:e.onNextPage}}):e._e(),"victory"===e.currentStateValue?n("picture-page",{key:"victory",attrs:{images:e.assets["victory"],state:"victory"},on:{next:e.onNextPage}}):e._e(),"defeat"===e.currentStateValue?n("picture-page",{key:"defeat",attrs:{images:e.assets["defeat"],state:"defeat"},on:{next:e.onNextPage}}):e._e(),"score"===e.currentStateValue?n("score-page",{key:"score",attrs:{score:e.scoreRender,renderPending:e.scoreRenderPending},on:{next:e.onNextPage,"score-action-rendered":e.onScoreActionRendered}}):e._e(),"results"===e.currentStateValue?n("div",{key:"results",staticClass:"results-page-container"},[n("results-page",{attrs:{score:e.scoreRender,resultsHeading:e.resultsHeading},on:{"new-game":e.resetGame}})],1):e._e()],1)],1)},i=[],a=n("75fc"),o=(n("ac6a"),n("456d"),n("cebc")),c=n("1b5e"),u=n("2cb2"),l=function(e){var t=e.slice(),n=t.length;while(n>0){var s=Math.floor(Math.random()*n);n--;var r=t[n];t[n]=t[s],t[s]=r}return t},d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"score"},[n("div",{staticClass:"row-container"},[n("div",{staticClass:"name"},[e._v("\n      "+e._s(e.playerName)+"\n    ")]),n("div",{staticClass:"row"},e._l(e.player,function(e,t){return n("div",{key:t,staticClass:"cell",class:[null===e?"empty":"",!1===e?"failure":"",!0===e?"success":""]})}),0)]),n("div",{staticClass:"row-container"},[n("div",{staticClass:"name"},[e._v("\n      "+e._s(e.botName)+"\n    ")]),n("div",{staticClass:"row"},e._l(e.bot,function(e,t){return n("div",{key:t,staticClass:"cell",class:[null===e?"empty":"",!1===e?"failure":"",!0===e?"success":""]})}),0)])])},h=[],f={props:["player","bot","renderPending"],data:function(){return{playerName:settings.PLAYER_NAME,botName:settings.BOT_NAME}},mounted:function(){var e=this;this.renderPending&&setTimeout(function(){e.$emit("score-action-rendered")},350)}},p=f,m=(n("cf89"),n("2877")),g=Object(m["a"])(p,d,h,!1,null,"127fd994",null),v=g.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"timer"},[n("span",{staticClass:"time"},[e._v(e._s(e._f("prettifyTime")(e.remainedTime)))])])},y=[],S=(n("c5f6"),{props:{timeLimit:Number},data:function(){return{timerId:null,remainedTime:null}},mounted:function(){this.init(),this.start()},filters:{prettifyTime:function(e){var t=Math.floor(e/60),n=e%60;return"".concat(t<10?"0":"").concat(t,":").concat(n<10?"0":"").concat(n)}},methods:{init:function(){this.remainedTime=this.timeLimit},start:function(){var e=this;this.timerId=setInterval(function(){e.remainedTime<1&&(e.$emit("time-is-up",!1),clearInterval(e.timerId)),e.remainedTime--},1e3)}}}),b=S,T=(n("6776"),Object(m["a"])(b,w,y,!1,null,"071d3c66",null)),C=T.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"welcome-page"},[n("h1",{staticClass:"heading"},[e._v("Soccer")]),n("p",[e._v("Help your team win the cup!")]),n("p",[e._v("Answer questions correctly to score goals.")]),n("div",{staticClass:"bottom"},[n("button",{staticClass:"primary",on:{click:e.onStartGameClick}},[e._v("Start Game")])])])},x=[],E={name:"welcome-page",mounted:function(){},methods:{onStartGameClick:function(){this.$emit("start-game")}}},O=E,R=(n("00d9"),Object(m["a"])(O,_,x,!1,null,"ef57d24a",null)),P=R.exports,A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"pictureContainer",staticClass:"picture-page"})},I=[],L={name:"picture-page",props:{state:String,images:Array,visible:Boolean},data:function(){return{imageEl:null}},created:function(){var e=Math.floor(Math.random()*this.images.length);this.imageEl=this.images[e]},mounted:function(){var e=this;setTimeout(function(){e.$emit("next",e.state)},settings.pictureFrameLifetime),this.$refs.pictureContainer.appendChild(this.imageEl),window.innerWidth<=400?this.$refs.pictureContainer.children[0].style.width="290px":window.innerWidth<=480&&(this.$refs.pictureContainer.children[0].style.width="340px")}},k=L,q=(n("d844"),Object(m["a"])(k,A,I,!1,null,"47bf4d60",null)),$=q.exports,j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"score-page"},[n("score",{staticClass:"score",attrs:{player:e.score["PLAYER"],bot:e.score["BOT"],renderPending:e.renderPending},on:{"score-action-rendered":e.actionRendered}})],1)},D=[],N={name:"score-page",props:{score:Object,renderPending:Object},components:{Score:v},mounted:function(){var e=this;setTimeout(function(){e.$emit("next","score")},settings.pictureFrameLifetime)},methods:{actionRendered:function(){this.$emit("score-action-rendered")}}},z=N,H=(n("7475"),Object(m["a"])(z,j,D,!1,null,"90043a48",null)),V=H.exports,W=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"results-page"},[n("h2",{staticClass:"heading"},[e._v(e._s(e.resultsHeading))]),n("score",{attrs:{player:e.score["PLAYER"],bot:e.score["BOT"]}}),n("button",{staticClass:"primary",on:{click:function(t){return e.$emit("new-game")}}},[e._v("New Game")])],1)},G=[],Y={name:"results-page",components:{Score:v},props:{resultsHeading:String,score:Object}},M=Y,B=(n("dfbb"),Object(m["a"])(M,W,G,!1,null,"090cf5b1",null)),Q=B.exports,U=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"typerighter"},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-word"},[n("p",{staticClass:"word"},[e._v(e._s(e.input.toLowerCase()))])]),n("p",{staticClass:"card-definition"},[e._v(e._s(e.currentWord.def))])]),n("div",{staticClass:"word-input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.input,expression:"input"}],ref:"input",attrs:{type:"text",placeholder:"..."},domProps:{value:e.input},on:{input:[function(t){t.target.composing||(e.input=t.target.value)},e.handleChange]}})]),n("Progressbar",{attrs:{correct:e.progress.correct,value:e.progress.value}})],1)},F=[],J=(n("4917"),n("3b2b"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"progress-bar-container"},[n("div",{ref:"progressBar",staticClass:"progress-bar"})])}),K=[],X={name:"ProgressBar",props:{value:Number,correct:{type:Boolean,default:!0}},watch:{value:function(e){this.$refs.progressBar.style.width="".concat(this.value,"%")},correct:function(e){this.$refs.progressBar.style.backgroundColor=this.correct?"#00ffa5":"#ff3000"}}},Z=X,ee=(n("a5bd"),Object(m["a"])(Z,J,K,!1,null,"be0b8aaa",null)),te=ee.exports,ne={name:"app",components:{Progressbar:te,Timer:C},props:{data:Array,currentIndex:Number},data:function(){return{timeLimit:settings.typerighterTimeLimit,elapsedTime:null,avgTimePerWord:null,answeredWords:[],showWelcome:!0,finishGame:!1,progress:{value:0,correct:!0},input:"",lastCorrectInput:""}},mounted:function(){this.init()},filters:{prettifyTime:function(e){var t=Math.floor(e/60),n=e%60;return"".concat(t<10?"0":"").concat(t,":").concat(n<10?"0":"").concat(n.toFixed(0),"s")}},computed:{currentWord:function(){return this.data[this.currentIndex]}},methods:{init:function(){this.answeredWords=[],this.$refs.input.focus()},handleChange:function(e){var t=e.target.value,n=new RegExp("^".concat(t),"i"),s=this.currentWord.word.match(n);this.progress.value=this.calculateProgress(s,t),this.inputPrev=t;var r=this.checkResult();r&&(this.$refs.input.disabled=!0,this.answer(!0))},calculateProgress:function(e){return e?(this.lastCorrectInput=e[0],this.progress.correct=!0,+(e[0].length/this.currentWord.word.length*100).toFixed(0)):this.lastCorrectInput.length?(this.progress.correct=!1,+(this.lastCorrectInput.length/this.currentWord.word.length*100).toFixed(0)):0},handleSessionTime:function(e){var t=this.timeLimit-e;this.elapsedTime=t,this.answeredWords.length?this.avgTimePerWord=t/this.answeredWords.length:this.avgTimePerWord=t},resetQuestion:function(){this.progress.value=0,this.progress.correct=!0,this.input="",this.lastCorrectInput=""},checkResult:function(){return this.currentWord.word===this.input.toLowerCase()},start:function(){var e=this;this.showWelcome=!1,this.showResults=!1,this.init(),this.resetQuestion(),this.$nextTick(function(){e.$refs.input.focus()})},answer:function(e){var t=this;setTimeout(function(){t.$emit("answered",e)},500)}}},se=ne,re=(n("209d"),Object(m["a"])(se,U,F,!1,null,"c9192fc8",null)),ie=re.exports,ae=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"options-question"},[n("div",{staticClass:"sentence-container"},[n("div",{staticClass:"sentence"},[e._v(e._s(e.currentQuiz.question))])]),n("div",{staticClass:"answers-container"},e._l(e.answers,function(t){return n("answer",{key:t,attrs:{answer:t,disabled:e.answered},on:{"check-answer":e.checkAnswer}})}),1)])},oe=[],ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"answer",class:{answered:e.answered},attrs:{disabled:e.disabled},on:{click:e.onClick}},[e._v("\n  "+e._s(e.answer)+"\n")])},ue=[],le={props:{answer:String,status:String,disabled:Boolean},data:function(){return{answered:!1}},methods:{onClick:function(){this.answered=!0,this.$emit("check-answer",this.answer)}}},de=le,he=Object(m["a"])(de,ce,ue,!1,null,"052f74f8",null),fe=he.exports,pe=function(){return{answered:!1,answers:[]}},me={name:"options-question",components:{Answer:fe},props:{holder:String,data:Array,currentIndex:Number},data:function(){return Object(o["a"])({},pe())},created:function(){this.setupDefaultState()},computed:{currentQuiz:function(){return this.data[this.currentIndex]}},methods:{setupDefaultState:function(){this.answers=this.generateAnswers()},generateAnswers:function(){var e=this.data.map(function(e){return e.answer}),t=l(e);return t.slice(0,4)},nextQuestion:function(){this.answers=this.generateAnswers()},checkAnswer:function(e){var t=this;this.answered=!0;var n=this.currentQuiz.answer===e;setTimeout(function(){t.$emit("answered",n)},500)}}},ge=me,ve=(n("4d19"),Object(m["a"])(ge,ae,oe,!1,null,"891178a0",null)),we=ve.exports,ye=Object(c["a"])({id:"pages",initial:"loading",states:{loading:{on:{ASSETS_LOADED:"welcome"}},welcome:{on:{INTRO:"intro"}},intro:{on:{GETREADY:"getready"}},getready:{on:{QUESTION:"question"}},question:{on:{SCORE:"score",RESULTS:"results",GETREADY:"getready",GOAL:"goal",MISS:"miss"}},shot:{on:{SCORE:"score",RESULTS:"results"}},goal:{on:{SCORE:"score"}},miss:{on:{SCORE:"score"}},computershot:{on:{SCORE:"score"}},score:{on:{VICTORY:"victory",DEFEAT:"defeat",RESULTS:"results",GETREADY:"getready",QUESTION:"question",COMPUTERSHOT:"computershot"}},victory:{on:{RESULTS:"results"}},defeat:{on:{RESULTS:"results"}},results:{on:{INTRO:"intro"}}}}),Se=19,be="https://cdn.jsdelivr.net/gh/efl-academy/games@soccer-v3/dist/assets/",Te=function(){return{score:{PLAYER:[null,null,null,null,null],BOT:[null,null,null,null,null]},scoreRender:{PLAYER:[null,null,null,null,null],BOT:[null,null,null,null,null]},scoreRenderPending:null,currentStateValue:ye.initialStateValue,questionType:"typing",currentHolder:"PLAYER",isNextQuestion:!1,isGameFinished:!1,scoreIndex:0,shotsCount:0,typerData:typerighterData,quizData:quizData,quizTimeLimit:settings.quizTimeLimit,typerTimeLimit:settings.typerTimeLimit,typerCurrentIndex:0,quizCurrentIndex:0,states:{},assetsLoaded:!1,assets:{},resultsHeading:"",assetsLoadedCount:0}},Ce={name:"app",data:function(){return Object(o["a"])({fsmService:Object(u["a"])(ye)},Te())},components:{Score:v,Timer:C,WelcomePage:P,PicturePage:$,ScorePage:V,ResultsPage:Q,Typerighter:ie,OptionsQuestion:we},created:function(){var e=this;this.fsmService.onTransition(function(t){e.currentStateValue=t.value}).start(),this.resetData()},mounted:function(){var e=this,t=be;Object.keys(ye.states).map(function(n){e.assets[n]=[];for(var s=function(s){var r=new Image,i="".concat(t).concat(n,"/").concat(n).concat(s,".jpg");r.src=i,r.onload=function(){e.assetsLoadedCount++,e.assets[n].push(r),e.assetsLoadedCount>=Se&&e.fsmService.send("ASSETS_LOADED")}},r=1;r<5;r++)s(r)})},methods:{onNextPage:function(e){switch(e){case"score":if(this.switchHolder(),this.switchQuestionType(),this.isGameFinished){var t=this.calculateWinner();"PLAYER"===t&&(this.resultsHeading="Victory!",this.fsmService.send("VICTORY")),"BOT"===t&&(this.resultsHeading="Defeat",this.fsmService.send("DEFEAT")),t||(this.resultsHeading="Draw",this.fsmService.send("RESULTS"))}else"BOT"===this.currentHolder?this.fsmService.send("COMPUTERSHOT"):this.fsmService.send("GETREADY");break;case"getready":this.fsmService.send("QUESTION");break;case"intro":this.fsmService.send("GETREADY");break;case"goal":this.fsmService.send("SCORE");break;case"miss":this.fsmService.send("SCORE");break;case"computershot":this.onAnswer(this.calculateComputerAnswerResult()),this.fsmService.send("SCORE");break;case"victory":this.fsmService.send("RESULTS");break;case"defeat":this.fsmService.send("RESULTS");break;case"resul":this.fsmService.send("RESULTS");break;default:break}},onScoreActionRendered:function(){this.$set(this.scoreRender[this.scoreRenderPending.holder],this.scoreRenderPending.scoreIndex,this.scoreRenderPending.isCorrect),this.scoreRenderPending=null},onTimeIsUp:function(){"quiz"===this.questionType?this.onQuizAnswer(!1):this.onTyperighterAnswer(!1)},calculateWinner:function(){var e=this.score["PLAYER"].reduce(function(e,t){return e+ +t},0),t=this.score["BOT"].reduce(function(e,t){return e+ +t},0);return e===t?null:e>t?"PLAYER":"BOT"},startGame:function(){this.fsmService.send("INTRO")},resetData:function(){var e=this.assets;Object.assign(this.$data,Te()),this.assets=e,this.typerData=Object(a["a"])(l(this.typerData).map(function(e){return Object(o["a"])({},e,{answered:!1})})),this.quizData=Object(a["a"])(l(this.quizData))},resetGame:function(){this.resetData(),this.fsmService.send("INTRO")},onAnswer:function(e){var t={holder:this.currentHolder,scoreIndex:this.scoreIndex,isCorrect:e};this.scoreRenderPending=t,this.$set(this.score[this.currentHolder],this.scoreIndex,e),this.shotsCount++,this.shotsCount%2===0&&(this.scoreIndex+1===5?this.isGameFinished=!0:this.scoreIndex++),"PLAYER"===this.currentHolder&&(e?this.fsmService.send("GOAL"):this.fsmService.send("MISS"))},onQuizAnswer:function(e){this.quizCurrentIndex++,this.quizData[this.quizCurrentIndex]||(this.quizCurrentIndex=0),this.onAnswer(!!e)},onTyperighterAnswer:function(e){this.typerCurrentIndex++,this.typerData[this.typerCurrentIndex]||(this.typerCurrentIndex=0),this.onAnswer(e)},switchHolder:function(){this.currentHolder="PLAYER"===this.currentHolder?"BOT":"PLAYER"},switchQuestionType:function(){this.questionType=Math.random()<.5?"quiz":"typing"},calculateComputerAnswerResult:function(){return Math.random()<=settings.botDifficulty}}},_e=Ce,xe=(n("8095"),Object(m["a"])(_e,r,i,!1,null,"3b2c6d70",null)),Ee=xe.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(Ee)}}).$mount("#app")},6776:function(e,t,n){"use strict";var s=n("1105"),r=n.n(s);r.a},7475:function(e,t,n){"use strict";var s=n("e9d3"),r=n.n(s);r.a},"7a47":function(e,t,n){},8095:function(e,t,n){"use strict";var s=n("7a47"),r=n.n(s);r.a},"97f8":function(e,t,n){},a5bd:function(e,t,n){"use strict";var s=n("39df"),r=n.n(s);r.a},cf89:function(e,t,n){"use strict";var s=n("e4df"),r=n.n(s);r.a},d6ae:function(e,t,n){},d844:function(e,t,n){"use strict";var s=n("dbda"),r=n.n(s);r.a},dbda:function(e,t,n){},dfbb:function(e,t,n){"use strict";var s=n("3924"),r=n.n(s);r.a},e4df:function(e,t,n){},e9d3:function(e,t,n){}});
//# sourceMappingURL=app.732af7c2.js.map