/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.8.2r1
*/
YAHOO.widget.LogMsg=function(A){this.msg=this.time=this.category=this.source=this.sourceDetail=null;if(A&&(A.constructor==Object)){for(var B in A){if(A.hasOwnProperty(B)){this[B]=A[B];}}}};YAHOO.widget.LogWriter=function(A){if(!A){YAHOO.log("Could not instantiate LogWriter due to invalid source.","error","LogWriter");return;}this._source=A;};YAHOO.widget.LogWriter.prototype.toString=function(){return"LogWriter "+this._sSource;};YAHOO.widget.LogWriter.prototype.log=function(A,B){YAHOO.widget.Logger.log(A,B,this._source);};YAHOO.widget.LogWriter.prototype.getSource=function(){return this._source;};YAHOO.widget.LogWriter.prototype.setSource=function(A){if(!A){YAHOO.log("Could not set source due to invalid source.","error",this.toString());return;}else{this._source=A;}};YAHOO.widget.LogWriter.prototype._source=null;if(!YAHOO.widget.Logger){YAHOO.widget.Logger={loggerEnabled:true,_browserConsoleEnabled:false,categories:["info","warn","error","time","window"],sources:["global"],_stack:[],maxStackEntries:2500,_startTime:new Date().getTime(),_lastTime:null,_windowErrorsHandled:false,_origOnWindowError:null};YAHOO.widget.Logger.log=function(B,F,G){if(this.loggerEnabled){if(!F){F="info";}else{F=F.toLocaleLowerCase();if(this._isNewCategory(F)){this._createNewCategory(F);}}var C="global";var A=null;if(G){var D=G.indexOf(" ");if(D>0){C=G.substring(0,D);A=G.substring(D,G.length);}else{C=G;}if(this._isNewSource(C)){this._createNewSource(C);}}var H=new Date();var J=new YAHOO.widget.LogMsg({msg:B,time:H,category:F,source:C,sourceDetail:A});var I=this._stack;var E=this.maxStackEntries;if(E&&!isNaN(E)&&(I.length>=E)){I.shift();}I.push(J);this.newLogEvent.fire(J);if(this._browserConsoleEnabled){this._printToBrowserConsole(J);}return true;}else{return false;}};YAHOO.widget.Logger.reset=function(){this._stack=[];this._startTime=new Date().getTime();this.loggerEnabled=true;this.log("Logger reset");this.logResetEvent.fire();};YAHOO.widget.Logger.getStack=function(){return this._stack;};YAHOO.widget.Logger.getStartTime=function(){return this._startTime;};YAHOO.widget.Logger.disableBrowserConsole=function(){YAHOO.log("Logger output to the function console.log() has been disabled.");this._browserConsoleEnabled=false;};YAHOO.widget.Logger.enableBrowserConsole=function(){this._browserConsoleEnabled=true;YAHOO.log("Logger output to the function console.log() has been enabled.");};YAHOO.widget.Logger.handleWindowErrors=function(){if(!YAHOO.widget.Logger._windowErrorsHandled){if(window.error){YAHOO.widget.Logger._origOnWindowError=window.onerror;}window.onerror=YAHOO.widget.Logger._onWindowError;YAHOO.widget.Logger._windowErrorsHandled=true;YAHOO.log("Logger handling of window.onerror has been enabled.");}else{YAHOO.log("Logger handling of window.onerror had already been enabled.");}};YAHOO.widget.Logger.unhandleWindowErrors=function(){if(YAHOO.widget.Logger._windowErrorsHandled){if(YAHOO.widget.Logger._origOnWindowError){window.onerror=YAHOO.widget.Logger._origOnWindowError;YAHOO.widget.Logger._origOnWindowError=null;}else{window.onerror=null;}YAHOO.widget.Logger._windowErrorsHandled=false;YAHOO.log("Logger handling of window.onerror has been disabled.");}else{YAHOO.log("Logger handling of window.onerror had already been disabled.");}};YAHOO.widget.Logger.categoryCreateEvent=new YAHOO.util.CustomEvent("categoryCreate",this,true);YAHOO.widget.Logger.sourceCreateEvent=new YAHOO.util.CustomEvent("sourceCreate",this,true);YAHOO.widget.Logger.newLogEvent=new YAHOO.util.CustomEvent("newLog",this,true);YAHOO.widget.Logger.logResetEvent=new YAHOO.util.CustomEvent("logReset",this,true);YAHOO.widget.Logger._createNewCategory=function(A){this.categories.push(A);this.categoryCreateEvent.fire(A);};YAHOO.widget.Logger._isNewCategory=function(B){for(var A=0;A<this.categories.length;A++){if(B==this.categories[A]){return false;}}return true;};YAHOO.widget.Logger._createNewSource=function(A){this.sources.push(A);this.sourceCreateEvent.fire(A);};YAHOO.widget.Logger._isNewSource=function(A){if(A){for(var B=0;B<this.sources.length;B++){if(A==this.sources[B]){return false;}}return true;}};YAHOO.widget.Logger._printToBrowserConsole=function(C){if(window.console&&console.log){var E=C.category;var D=C.category.substring(0,4).toUpperCase();var G=C.time;var F;if(G.toLocaleTimeString){F=G.toLocaleTimeString();}else{F=G.toString();}var H=G.getTime();var B=(YAHOO.widget.Logger._lastTime)?(H-YAHOO.widget.Logger._lastTime):0;YAHOO.widget.Logger._lastTime=H;var A=F+" ("+B+"ms): "+C.source+": ";if(YAHOO.env.ua.webkit){A+=C.msg;}console.log(A,C.msg);}};YAHOO.widget.Logger._onWindowError=function(A,C,B){try{YAHOO.widget.Logger.log(A+" ("+C+", line "+B+")","window");if(YAHOO.widget.Logger._origOnWindowError){YAHOO.widget.Logger._origOnWindowError();}}catch(D){return false;}};YAHOO.widget.Logger.log("Logger initialized");}(function(){var C=YAHOO.widget.Logger,D=YAHOO.util,E=D.Dom,A=D.Event,G=document;function B(I,H){I=G.createElement(I);if(H){for(var J in H){if(H.hasOwnProperty(J)){I[J]=H[J];}}}return I;}function F(I,H){this._sName=F._index;F._index++;this._init.apply(this,arguments);if(this.autoRender!==false){this.render();}}YAHOO.lang.augmentObject(F,{_index:0,ENTRY_TEMPLATE:(function(){return B("pre",{className:"yui-log-entry"});})(),VERBOSE_TEMPLATE:"<p><span class='{category}'>{label}</span> {totalTime}ms (+{elapsedTime}) {localTime}:</p><p>{sourceAndDetail}</p><p>{message}</p>",BASIC_TEMPLATE:"<p><span class='{category}'>{label}</span> {totalTime}ms (+{elapsedTime}) {localTime}: {sourceAndDetail}: {message}</p>"});F.prototype={logReaderEnabled:true,width:null,height:null,top:null,left:null,right:null,bottom:null,fontSize:null,footerEnabled:true,verboseOutput:true,entryFormat:null,newestOnTop:true,outputBuffer:100,thresholdMax:500,thresholdMin:100,isCollapsed:false,isPaused:false,draggable:true,toString:function(){return"LogReader instance"+this._sName;},pause:function(){this.isPaused=true;this._timeout=null;this.logReaderEnabled=false;if(this._btnPause){this._btnPause.value="Resume";
}},resume:function(){this.isPaused=false;this.logReaderEnabled=true;this._printBuffer();if(this._btnPause){this._btnPause.value="Pause";}},render:function(){if(this.rendered){return;}this._initContainerEl();this._initHeaderEl();this._initConsoleEl();this._initFooterEl();this._initCategories();this._initSources();this._initDragDrop();C.newLogEvent.subscribe(this._onNewLog,this);C.logResetEvent.subscribe(this._onReset,this);C.categoryCreateEvent.subscribe(this._onCategoryCreate,this);C.sourceCreateEvent.subscribe(this._onSourceCreate,this);this.rendered=true;this._filterLogs();},destroy:function(){A.purgeElement(this._elContainer,true);this._elContainer.innerHTML="";this._elContainer.parentNode.removeChild(this._elContainer);this.rendered=false;},hide:function(){this._elContainer.style.display="none";},show:function(){this._elContainer.style.display="block";},collapse:function(){this._elConsole.style.display="none";if(this._elFt){this._elFt.style.display="none";}this._btnCollapse.value="Expand";this.isCollapsed=true;},expand:function(){this._elConsole.style.display="block";if(this._elFt){this._elFt.style.display="block";}this._btnCollapse.value="Collapse";this.isCollapsed=false;},getCheckbox:function(H){return this._filterCheckboxes[H];},getCategories:function(){return this._categoryFilters;},showCategory:function(I){var K=this._categoryFilters;if(K.indexOf){if(K.indexOf(I)>-1){return;}}else{for(var H=0;H<K.length;H++){if(K[H]===I){return;}}}this._categoryFilters.push(I);this._filterLogs();var J=this.getCheckbox(I);if(J){J.checked=true;}},hideCategory:function(I){var K=this._categoryFilters;for(var H=0;H<K.length;H++){if(I==K[H]){K.splice(H,1);break;}}this._filterLogs();var J=this.getCheckbox(I);if(J){J.checked=false;}},getSources:function(){return this._sourceFilters;},showSource:function(H){var K=this._sourceFilters;if(K.indexOf){if(K.indexOf(H)>-1){return;}}else{for(var I=0;I<K.length;I++){if(H==K[I]){return;}}}K.push(H);this._filterLogs();var J=this.getCheckbox(H);if(J){J.checked=true;}},hideSource:function(H){var K=this._sourceFilters;for(var I=0;I<K.length;I++){if(H==K[I]){K.splice(I,1);break;}}this._filterLogs();var J=this.getCheckbox(H);if(J){J.checked=false;}},clearConsole:function(){this._timeout=null;this._buffer=[];this._consoleMsgCount=0;var H=this._elConsole;H.innerHTML="";},setTitle:function(H){this._title.innerHTML=this.html2Text(H);},getLastTime:function(){return this._lastTime;},formatMsg:function(I){var H=this.entryFormat||(this.verboseOutput?F.VERBOSE_TEMPLATE:F.BASIC_TEMPLATE),J={category:I.category,label:I.category.substring(0,4).toUpperCase(),sourceAndDetail:I.sourceDetail?I.source+" "+I.sourceDetail:I.source,message:this.html2Text(I.msg||I.message||"")};if(I.time&&I.time.getTime){J.localTime=I.time.toLocaleTimeString?I.time.toLocaleTimeString():I.time.toString();J.elapsedTime=I.time.getTime()-this.getLastTime();J.totalTime=I.time.getTime()-C.getStartTime();}var K=F.ENTRY_TEMPLATE.cloneNode(true);if(this.verboseOutput){K.className+=" yui-log-verbose";}K.innerHTML=H.replace(/\{(\w+)\}/g,function(L,M){return(M in J)?J[M]:"";});return K;},html2Text:function(H){if(H){H+="";return H.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");}return"";},_sName:null,_buffer:null,_consoleMsgCount:0,_lastTime:null,_timeout:null,_filterCheckboxes:null,_categoryFilters:null,_sourceFilters:null,_elContainer:null,_elHd:null,_elCollapse:null,_btnCollapse:null,_title:null,_elConsole:null,_elFt:null,_elBtns:null,_elCategoryFilters:null,_elSourceFilters:null,_btnPause:null,_btnClear:null,_init:function(H,I){this._buffer=[];this._filterCheckboxes={};this._lastTime=C.getStartTime();if(I&&(I.constructor==Object)){for(var J in I){if(I.hasOwnProperty(J)){this[J]=I[J];}}}this._elContainer=E.get(H);YAHOO.log("LogReader initialized",null,this.toString());},_initContainerEl:function(){if(!this._elContainer||!/div$/i.test(this._elContainer.tagName)){this._elContainer=G.body.insertBefore(B("div"),G.body.firstChild);E.addClass(this._elContainer,"yui-log-container");}E.addClass(this._elContainer,"yui-log");var J=this._elContainer.style,H=["width","right","top","fontSize"],K,I;for(I=H.length-1;I>=0;--I){K=H[I];if(this[K]){J[K]=this[K];}}if(this.left){J.left=this.left;J.right="auto";}if(this.bottom){J.bottom=this.bottom;J.top="auto";}if(YAHOO.env.ua.opera){G.body.style+="";}},_initHeaderEl:function(){if(this._elHd){A.purgeElement(this._elHd,true);this._elHd.innerHTML="";}this._elHd=B("div",{id:"yui-log-hd"+this._sName,className:"yui-log-hd"});this._elCollapse=B("div",{className:"yui-log-btns"});this._btnCollapse=B("input",{type:"button",className:"yui-log-button",value:"Collapse"});A.on(this._btnCollapse,"click",this._onClickCollapseBtn,this);this._title=B("h4",{innerHTML:"Logger Console"});this._elCollapse.appendChild(this._btnCollapse);this._elHd.appendChild(this._elCollapse);this._elHd.appendChild(this._title);this._elContainer.appendChild(this._elHd);},_initConsoleEl:function(){if(this._elConsole){A.purgeElement(this._elConsole,true);this._elConsole.innerHTML="";}this._elConsole=B("div",{className:"yui-log-bd"});if(this.height){this._elConsole.style.height=this.height;}this._elContainer.appendChild(this._elConsole);},_initFooterEl:function(){if(this.footerEnabled){if(this._elFt){A.purgeElement(this._elFt,true);this._elFt.innerHTML="";}this._elFt=B("div",{className:"yui-log-ft"});this._elBtns=B("div",{className:"yui-log-btns"});this._btnPause=B("input",{type:"button",className:"yui-log-button",value:"Pause"});A.on(this._btnPause,"click",this._onClickPauseBtn,this);this._btnClear=B("input",{type:"button",className:"yui-log-button",value:"Clear"});A.on(this._btnClear,"click",this._onClickClearBtn,this);this._elCategoryFilters=B("div",{className:"yui-log-categoryfilters"});this._elSourceFilters=B("div",{className:"yui-log-sourcefilters"});this._elBtns.appendChild(this._btnPause);this._elBtns.appendChild(this._btnClear);this._elFt.appendChild(this._elBtns);this._elFt.appendChild(this._elCategoryFilters);
this._elFt.appendChild(this._elSourceFilters);this._elContainer.appendChild(this._elFt);}},_initDragDrop:function(){if(D.DD&&this.draggable&&this._elHd){var H=new D.DD(this._elContainer);H.setHandleElId(this._elHd.id);this._elHd.style.cursor="move";}},_initCategories:function(){this._categoryFilters=[];var J=C.categories;for(var H=0;H<J.length;H++){var I=J[H];this._categoryFilters.push(I);if(this._elCategoryFilters){this._createCategoryCheckbox(I);}}},_initSources:function(){this._sourceFilters=[];var J=C.sources;for(var I=0;I<J.length;I++){var H=J[I];this._sourceFilters.push(H);if(this._elSourceFilters){this._createSourceCheckbox(H);}}},_createCategoryCheckbox:function(K){if(this._elFt){var J=B("span",{className:"yui-log-filtergrp"}),H=B("input",{id:"yui-log-filter-"+K+this._sName,className:"yui-log-filter-"+K,type:"checkbox",category:K}),I=B("label",{htmlFor:H.id,className:K,innerHTML:K});A.on(H,"click",this._onCheckCategory,this);this._filterCheckboxes[K]=H;J.appendChild(H);J.appendChild(I);this._elCategoryFilters.appendChild(J);H.checked=true;}},_createSourceCheckbox:function(H){if(this._elFt){var K=B("span",{className:"yui-log-filtergrp"}),I=B("input",{id:"yui-log-filter-"+H+this._sName,className:"yui-log-filter-"+H,type:"checkbox",source:H}),J=B("label",{htmlFor:I.id,className:H,innerHTML:H});A.on(I,"click",this._onCheckSource,this);this._filterCheckboxes[H]=I;K.appendChild(I);K.appendChild(J);this._elSourceFilters.appendChild(K);I.checked=true;}},_filterLogs:function(){if(this._elConsole!==null){this.clearConsole();this._printToConsole(C.getStack());}},_printBuffer:function(){this._timeout=null;if(this._elConsole!==null){var I=this.thresholdMax;I=(I&&!isNaN(I))?I:500;if(this._consoleMsgCount<I){var H=[];for(var J=0;J<this._buffer.length;J++){H[J]=this._buffer[J];}this._buffer=[];this._printToConsole(H);}else{this._filterLogs();}if(!this.newestOnTop){this._elConsole.scrollTop=this._elConsole.scrollHeight;}}},_printToConsole:function(P){var I=P.length,T=G.createDocumentFragment(),W=[],X=this.thresholdMin,J=this._sourceFilters.length,U=this._categoryFilters.length,R,O,N,M,S;if(isNaN(X)||(X>this.thresholdMax)){X=0;}R=(I>X)?(I-X):0;for(O=R;O<I;O++){var L=false,Q=false,V=P[O],H=V.source,K=V.category;for(N=0;N<J;N++){if(H==this._sourceFilters[N]){Q=true;break;}}if(Q){for(N=0;N<U;N++){if(K==this._categoryFilters[N]){L=true;break;}}}if(L){if(this._consoleMsgCount===0){this._lastTime=V.time.getTime();}M=this.formatMsg(V);if(typeof M==="string"){W[W.length]=M;}else{T.insertBefore(M,this.newestOnTop?T.firstChild||null:null);}this._consoleMsgCount++;this._lastTime=V.time.getTime();}}if(W.length){W.splice(0,0,this._elConsole.innerHTML);this._elConsole.innerHTML=this.newestOnTop?W.reverse().join(""):W.join("");}else{if(T.firstChild){this._elConsole.insertBefore(T,this.newestOnTop?this._elConsole.firstChild||null:null);}}},_onCategoryCreate:function(K,J,H){var I=J[0];H._categoryFilters.push(I);if(H._elFt){H._createCategoryCheckbox(I);}},_onSourceCreate:function(K,J,H){var I=J[0];H._sourceFilters.push(I);if(H._elFt){H._createSourceCheckbox(I);}},_onCheckCategory:function(H,I){var J=this.category;if(!this.checked){I.hideCategory(J);}else{I.showCategory(J);}},_onCheckSource:function(H,I){var J=this.source;if(!this.checked){I.hideSource(J);}else{I.showSource(J);}},_onClickCollapseBtn:function(H,I){if(!I.isCollapsed){I.collapse();}else{I.expand();}},_onClickPauseBtn:function(H,I){if(!I.isPaused){I.pause();}else{I.resume();}},_onClickClearBtn:function(H,I){I.clearConsole();},_onNewLog:function(K,J,H){var I=J[0];H._buffer.push(I);if(H.logReaderEnabled===true&&H._timeout===null){H._timeout=setTimeout(function(){H._printBuffer();},H.outputBuffer);}},_onReset:function(J,I,H){H._filterLogs();}};YAHOO.widget.LogReader=F;})();YAHOO.register("logger",YAHOO.widget.Logger,{version:"2.8.2r1",build:"8"});