YUI.add('yui2-resize', function(Y) {
    var YAHOO    = Y.YUI2;
    /*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
(function(){var E=YAHOO.util.Dom,A=YAHOO.util.Event,C=YAHOO.lang;var B=function(F,D){var G={element:F,attributes:D||{}};B.superclass.constructor.call(this,G.element,G.attributes);};B._instances={};B.getResizeById=function(D){if(B._instances[D]){return B._instances[D];}return false;};YAHOO.extend(B,YAHOO.util.Element,{CSS_RESIZE:"yui-resize",CSS_DRAG:"yui-draggable",CSS_HOVER:"yui-resize-hover",CSS_PROXY:"yui-resize-proxy",CSS_WRAP:"yui-resize-wrap",CSS_KNOB:"yui-resize-knob",CSS_HIDDEN:"yui-resize-hidden",CSS_HANDLE:"yui-resize-handle",CSS_STATUS:"yui-resize-status",CSS_GHOST:"yui-resize-ghost",CSS_RESIZING:"yui-resize-resizing",_resizeEvent:null,dd:null,browser:YAHOO.env.ua,_positioned:null,_dds:null,_wrap:null,_proxy:null,_handles:null,_currentHandle:null,_currentDD:null,_cache:null,_active:null,_createProxy:function(){if(this.get("proxy")){this._proxy=document.createElement("div");this._proxy.className=this.CSS_PROXY;this._proxy.style.height=this.get("element").clientHeight+"px";this._proxy.style.width=this.get("element").clientWidth+"px";this._wrap.parentNode.appendChild(this._proxy);}else{this.set("animate",false);}},_createWrap:function(){this._positioned=false;switch(this.get("element").tagName.toLowerCase()){case"img":case"textarea":case"input":case"iframe":case"select":this.set("wrap",true);break;}if(this.get("wrap")){this._wrap=document.createElement("div");this._wrap.id=this.get("element").id+"_wrap";this._wrap.className=this.CSS_WRAP;E.setStyle(this._wrap,"width",this.get("width"));E.setStyle(this._wrap,"height",this.get("height"));E.setStyle(this._wrap,"z-index",this.getStyle("z-index"));this.setStyle("z-index",0);var F=E.getStyle(this.get("element"),"position");E.setStyle(this._wrap,"position",((F=="static")?"relative":F));E.setStyle(this._wrap,"top",E.getStyle(this.get("element"),"top"));E.setStyle(this._wrap,"left",E.getStyle(this.get("element"),"left"));if(E.getStyle(this.get("element"),"position")=="absolute"){this._positioned=true;E.setStyle(this.get("element"),"position","relative");E.setStyle(this.get("element"),"top","0");E.setStyle(this.get("element"),"left","0");}var D=this.get("element").parentNode;D.replaceChild(this._wrap,this.get("element"));this._wrap.appendChild(this.get("element"));}else{this._wrap=this.get("element");if(E.getStyle(this._wrap,"position")=="absolute"){this._positioned=true;}}if(this.get("draggable")){this._setupDragDrop();}if(this.get("hover")){E.addClass(this._wrap,this.CSS_HOVER);}if(this.get("knobHandles")){E.addClass(this._wrap,this.CSS_KNOB);}if(this.get("hiddenHandles")){E.addClass(this._wrap,this.CSS_HIDDEN);}E.addClass(this._wrap,this.CSS_RESIZE);},_setupDragDrop:function(){E.addClass(this._wrap,this.CSS_DRAG);this.dd=new YAHOO.util.DD(this._wrap,this.get("id")+"-resize",{dragOnly:true});this.dd.on("dragEvent",function(){this.fireEvent("dragEvent",arguments);},this,true);},_createHandles:function(){this._handles={};this._dds={};var G=this.get("handles");for(var F=0;F<G.length;F++){this._handles[G[F]]=document.createElement("div");this._handles[G[F]].id=E.generateId(this._handles[G[F]]);this._handles[G[F]].className=this.CSS_HANDLE+" "+this.CSS_HANDLE+"-"+G[F];var D=document.createElement("div");D.className=this.CSS_HANDLE+"-inner-"+G[F];this._handles[G[F]].appendChild(D);this._wrap.appendChild(this._handles[G[F]]);A.on(this._handles[G[F]],"mouseover",this._handleMouseOver,this,true);A.on(this._handles[G[F]],"mouseout",this._handleMouseOut,this,true);this._dds[G[F]]=new YAHOO.util.DragDrop(this._handles[G[F]],this.get("id")+"-handle-"+G);this._dds[G[F]].setPadding(15,15,15,15);this._dds[G[F]].on("startDragEvent",this._handleStartDrag,this._dds[G[F]],this);this._dds[G[F]].on("mouseDownEvent",this._handleMouseDown,this._dds[G[F]],this);}this._status=document.createElement("span");this._status.className=this.CSS_STATUS;document.body.insertBefore(this._status,document.body.firstChild);},_ieSelectFix:function(){return false;},_ieSelectBack:null,_setAutoRatio:function(D){if(this.get("autoRatio")){if(D&&D.shiftKey){this.set("ratio",true);}else{this.set("ratio",this._configs.ratio._initialConfig.value);}}},_handleMouseDown:function(D){if(E.getStyle(this._wrap,"position")=="absolute"){this._positioned=true;}if(D){this._setAutoRatio(D);}if(this.browser.ie){this._ieSelectBack=document.body.onselectstart;document.body.onselectstart=this._ieSelectFix;}},_handleMouseOver:function(G){E.removeClass(this._wrap,this.CSS_RESIZE);if(this.get("hover")){E.removeClass(this._wrap,this.CSS_HOVER);}var D=A.getTarget(G);if(!E.hasClass(D,this.CSS_HANDLE)){D=D.parentNode;}if(E.hasClass(D,this.CSS_HANDLE)&&!this._active){E.addClass(D,this.CSS_HANDLE+"-active");for(var F in this._handles){if(C.hasOwnProperty(this._handles,F)){if(this._handles[F]==D){E.addClass(D,this.CSS_HANDLE+"-"+F+"-active");break;}}}}E.addClass(this._wrap,this.CSS_RESIZE);},_handleMouseOut:function(G){E.removeClass(this._wrap,this.CSS_RESIZE);if(this.get("hover")&&!this._active){E.addClass(this._wrap,this.CSS_HOVER);}var D=A.getTarget(G);if(!E.hasClass(D,this.CSS_HANDLE)){D=D.parentNode;}if(E.hasClass(D,this.CSS_HANDLE)&&!this._active){E.removeClass(D,this.CSS_HANDLE+"-active");for(var F in this._handles){if(C.hasOwnProperty(this._handles,F)){if(this._handles[F]==D){E.removeClass(D,this.CSS_HANDLE+"-"+F+"-active");break;}}}}E.addClass(this._wrap,this.CSS_RESIZE);},_handleStartDrag:function(G,F){var D=F.getDragEl();if(E.hasClass(D,this.CSS_HANDLE)){if(E.getStyle(this._wrap,"position")=="absolute"){this._positioned=true;}this._active=true;this._currentDD=F;if(this._proxy){this._proxy.style.visibility="visible";this._proxy.style.zIndex="1000";this._proxy.style.height=this.get("element").clientHeight+"px";this._proxy.style.width=this.get("element").clientWidth+"px";}for(var H in this._handles){if(C.hasOwnProperty(this._handles,H)){if(this._handles[H]==D){this._currentHandle=H;var I="_handle_for_"+H;E.addClass(D,this.CSS_HANDLE+"-"+H+"-active");F.on("dragEvent",this[I],this,true);F.on("mouseUpEvent",this._handleMouseUp,this,true);
break;}}}E.addClass(D,this.CSS_HANDLE+"-active");if(this.get("proxy")){var J=E.getXY(this.get("element"));E.setXY(this._proxy,J);if(this.get("ghost")){this.addClass(this.CSS_GHOST);}}E.addClass(this._wrap,this.CSS_RESIZING);this._setCache();this._updateStatus(this._cache.height,this._cache.width,this._cache.top,this._cache.left);this.fireEvent("startResize",{type:"startresize",target:this});}},_setCache:function(){this._cache.xy=E.getXY(this._wrap);E.setXY(this._wrap,this._cache.xy);this._cache.height=this.get("clientHeight");this._cache.width=this.get("clientWidth");this._cache.start.height=this._cache.height;this._cache.start.width=this._cache.width;this._cache.start.top=this._cache.xy[1];this._cache.start.left=this._cache.xy[0];this._cache.top=this._cache.xy[1];this._cache.left=this._cache.xy[0];this.set("height",this._cache.height,true);this.set("width",this._cache.width,true);},_handleMouseUp:function(F){this._active=false;var G="_handle_for_"+this._currentHandle;this._currentDD.unsubscribe("dragEvent",this[G],this,true);this._currentDD.unsubscribe("mouseUpEvent",this._handleMouseUp,this,true);if(this._proxy){this._proxy.style.visibility="hidden";this._proxy.style.zIndex="-1";if(this.get("setSize")){this.resize(F,this._cache.height,this._cache.width,this._cache.top,this._cache.left,true);}else{this.fireEvent("resize",{ev:"resize",target:this,height:this._cache.height,width:this._cache.width,top:this._cache.top,left:this._cache.left});}if(this.get("ghost")){this.removeClass(this.CSS_GHOST);}}if(this.get("hover")){E.addClass(this._wrap,this.CSS_HOVER);}if(this._status){E.setStyle(this._status,"display","none");}if(this.browser.ie){document.body.onselectstart=this._ieSelectBack;}if(this.browser.ie){E.removeClass(this._wrap,this.CSS_RESIZE);}for(var D in this._handles){if(C.hasOwnProperty(this._handles,D)){E.removeClass(this._handles[D],this.CSS_HANDLE+"-active");}}if(this.get("hover")&&!this._active){E.addClass(this._wrap,this.CSS_HOVER);}E.removeClass(this._wrap,this.CSS_RESIZING);E.removeClass(this._handles[this._currentHandle],this.CSS_HANDLE+"-"+this._currentHandle+"-active");E.removeClass(this._handles[this._currentHandle],this.CSS_HANDLE+"-active");if(this.browser.ie){E.addClass(this._wrap,this.CSS_RESIZE);}this._resizeEvent=null;this._currentHandle=null;if(!this.get("animate")){this.set("height",this._cache.height,true);this.set("width",this._cache.width,true);}this.fireEvent("endResize",{ev:"endResize",target:this,height:this._cache.height,width:this._cache.width,top:this._cache.top,left:this._cache.left});},_setRatio:function(K,N,Q,I){var O=K,G=N;if(this.get("ratio")){var P=this._cache.height,H=this._cache.width,F=parseInt(this.get("height"),10),L=parseInt(this.get("width"),10),M=this.get("maxHeight"),R=this.get("minHeight"),D=this.get("maxWidth"),J=this.get("minWidth");switch(this._currentHandle){case"l":K=F*(N/L);K=Math.min(Math.max(R,K),M);N=L*(K/F);Q=(this._cache.start.top-(-((F-K)/2)));I=(this._cache.start.left-(-((L-N))));break;case"r":K=F*(N/L);K=Math.min(Math.max(R,K),M);N=L*(K/F);Q=(this._cache.start.top-(-((F-K)/2)));break;case"t":N=L*(K/F);K=F*(N/L);I=(this._cache.start.left-(-((L-N)/2)));Q=(this._cache.start.top-(-((F-K))));break;case"b":N=L*(K/F);K=F*(N/L);I=(this._cache.start.left-(-((L-N)/2)));break;case"bl":K=F*(N/L);N=L*(K/F);I=(this._cache.start.left-(-((L-N))));break;case"br":K=F*(N/L);N=L*(K/F);break;case"tl":K=F*(N/L);N=L*(K/F);I=(this._cache.start.left-(-((L-N))));Q=(this._cache.start.top-(-((F-K))));break;case"tr":K=F*(N/L);N=L*(K/F);I=(this._cache.start.left);Q=(this._cache.start.top-(-((F-K))));break;}O=this._checkHeight(K);G=this._checkWidth(N);if((O!=K)||(G!=N)){Q=0;I=0;if(O!=K){G=this._cache.width;}if(G!=N){O=this._cache.height;}}}return[O,G,Q,I];},_updateStatus:function(K,G,J,F){if(this._resizeEvent&&(!C.isString(this._resizeEvent))){if(this.get("status")){E.setStyle(this._status,"display","inline");}K=((K===0)?this._cache.start.height:K);G=((G===0)?this._cache.start.width:G);var I=parseInt(this.get("height"),10),D=parseInt(this.get("width"),10);if(isNaN(I)){I=parseInt(K,10);}if(isNaN(D)){D=parseInt(G,10);}var L=(parseInt(K,10)-I);var H=(parseInt(G,10)-D);this._cache.offsetHeight=L;this._cache.offsetWidth=H;this._status.innerHTML="<strong>"+parseInt(K,10)+" x "+parseInt(G,10)+"</strong><em>"+((L>0)?"+":"")+L+" x "+((H>0)?"+":"")+H+"</em>";E.setXY(this._status,[A.getPageX(this._resizeEvent)+12,A.getPageY(this._resizeEvent)+12]);}},reset:function(){this.resize(null,this._cache.start.height,this._cache.start.width,this._cache.start.top,this._cache.start.left,true);return this;},resize:function(M,J,P,Q,H,F,K){this._resizeEvent=M;var G=this._wrap,I=this.get("animate"),O=true;if(this._proxy&&!F){G=this._proxy;I=false;}this._setAutoRatio(M);if(this._positioned){if(this._proxy){Q=this._cache.top-Q;H=this._cache.left-H;}}var L=this._setRatio(J,P,Q,H);J=parseInt(L[0],10);P=parseInt(L[1],10);Q=parseInt(L[2],10);H=parseInt(L[3],10);if(Q==0){Q=E.getY(G);}if(H==0){H=E.getX(G);}if(this._positioned){if(this._proxy&&F){if(!I){G.style.top=this._proxy.style.top;G.style.left=this._proxy.style.left;}else{Q=this._proxy.style.top;H=this._proxy.style.left;}}else{if(!this.get("ratio")&&!this._proxy){Q=this._cache.top+-(Q);H=this._cache.left+-(H);}if(Q){if(this.get("minY")){if(Q<this.get("minY")){Q=this.get("minY");}}if(this.get("maxY")){if(Q>this.get("maxY")){Q=this.get("maxY");}}}if(H){if(this.get("minX")){if(H<this.get("minX")){H=this.get("minX");}}if(this.get("maxX")){if((H+P)>this.get("maxX")){H=(this.get("maxX")-P);}}}}}if(!K){var N=this.fireEvent("beforeResize",{ev:"beforeResize",target:this,height:J,width:P,top:Q,left:H});if(N===false){return false;}}this._updateStatus(J,P,Q,H);if(this._positioned){if(this._proxy&&F){}else{if(Q){E.setY(G,Q);this._cache.top=Q;}if(H){E.setX(G,H);this._cache.left=H;}}}if(J){if(!I){O=true;if(this._proxy&&F){if(!this.get("setSize")){O=false;}}if(O){if(this.browser.ie>6){if(J===this._cache.height){J=J+1;}}G.style.height=J+"px";}if((this._proxy&&F)||!this._proxy){if(this._wrap!=this.get("element")){this.get("element").style.height=J+"px";
}}}this._cache.height=J;}if(P){this._cache.width=P;if(!I){O=true;if(this._proxy&&F){if(!this.get("setSize")){O=false;}}if(O){G.style.width=P+"px";}if((this._proxy&&F)||!this._proxy){if(this._wrap!=this.get("element")){this.get("element").style.width=P+"px";}}}}if(I){if(YAHOO.util.Anim){var D=new YAHOO.util.Anim(G,{height:{to:this._cache.height},width:{to:this._cache.width}},this.get("animateDuration"),this.get("animateEasing"));if(this._positioned){if(Q){D.attributes.top={to:parseInt(Q,10)};}if(H){D.attributes.left={to:parseInt(H,10)};}}if(this._wrap!=this.get("element")){D.onTween.subscribe(function(){this.get("element").style.height=G.style.height;this.get("element").style.width=G.style.width;},this,true);}D.onComplete.subscribe(function(){this.set("height",J);this.set("width",P);this.fireEvent("resize",{ev:"resize",target:this,height:J,width:P,top:Q,left:H});},this,true);D.animate();}}else{if(this._proxy&&!F){this.fireEvent("proxyResize",{ev:"proxyresize",target:this,height:J,width:P,top:Q,left:H});}else{this.fireEvent("resize",{ev:"resize",target:this,height:J,width:P,top:Q,left:H});}}return this;},_handle_for_br:function(F){var G=this._setWidth(F.e);var D=this._setHeight(F.e);this.resize(F.e,(D+1),G,0,0);},_handle_for_bl:function(G){var H=this._setWidth(G.e,true);var F=this._setHeight(G.e);var D=(H-this._cache.width);this.resize(G.e,F,H,0,D);},_handle_for_tl:function(G){var I=this._setWidth(G.e,true);var F=this._setHeight(G.e,true);var H=(F-this._cache.height);var D=(I-this._cache.width);this.resize(G.e,F,I,H,D);},_handle_for_tr:function(F){var H=this._setWidth(F.e);var D=this._setHeight(F.e,true);var G=(D-this._cache.height);this.resize(F.e,D,H,G,0);},_handle_for_r:function(D){this._dds.r.setYConstraint(0,0);var F=this._setWidth(D.e);this.resize(D.e,0,F,0,0);},_handle_for_l:function(F){this._dds.l.setYConstraint(0,0);var G=this._setWidth(F.e,true);var D=(G-this._cache.width);this.resize(F.e,0,G,0,D);},_handle_for_b:function(F){this._dds.b.setXConstraint(0,0);var D=this._setHeight(F.e);this.resize(F.e,D,0,0,0);},_handle_for_t:function(F){this._dds.t.setXConstraint(0,0);var D=this._setHeight(F.e,true);var G=(D-this._cache.height);this.resize(F.e,D,0,G,0);},_setWidth:function(H,J){var I=this._cache.xy[0],G=this._cache.width,D=A.getPageX(H),F=(D-I);if(J){F=(I-D)+parseInt(this.get("width"),10);}F=this._snapTick(F,this.get("yTicks"));F=this._checkWidth(F);return F;},_checkWidth:function(D){if(this.get("minWidth")){if(D<=this.get("minWidth")){D=this.get("minWidth");}}if(this.get("maxWidth")){if(D>=this.get("maxWidth")){D=this.get("maxWidth");}}return D;},_checkHeight:function(D){if(this.get("minHeight")){if(D<=this.get("minHeight")){D=this.get("minHeight");}}if(this.get("maxHeight")){if(D>=this.get("maxHeight")){D=this.get("maxHeight");}}return D;},_setHeight:function(G,I){var H=this._cache.xy[1],F=this._cache.height,J=A.getPageY(G),D=(J-H);if(I){D=(H-J)+parseInt(this.get("height"),10);}D=this._snapTick(D,this.get("xTicks"));D=this._checkHeight(D);return D;},_snapTick:function(G,F){if(!G||!F){return G;}var H=G;var D=G%F;if(D>0){if(D>(F/2)){H=G+(F-D);}else{H=G-D;}}return H;},init:function(F,D){this._cache={xy:[],height:0,width:0,top:0,left:0,offsetHeight:0,offsetWidth:0,start:{height:0,width:0,top:0,left:0}};B.superclass.init.call(this,F,D);this.set("setSize",this.get("setSize"));if(D.height){this.set("height",parseInt(D.height,10));}if(D.width){this.set("width",parseInt(D.width,10));}var G=F;if(!C.isString(G)){G=E.generateId(G);}B._instances[G]=this;this._active=false;this._createWrap();this._createProxy();this._createHandles();},getProxyEl:function(){return this._proxy;},getWrapEl:function(){return this._wrap;},getStatusEl:function(){return this._status;},getActiveHandleEl:function(){return this._handles[this._currentHandle];},isActive:function(){return((this._active)?true:false);},initAttributes:function(D){B.superclass.initAttributes.call(this,D);this.setAttributeConfig("setSize",{value:((D.setSize===false)?false:true),validator:YAHOO.lang.isBoolean});this.setAttributeConfig("wrap",{writeOnce:true,validator:YAHOO.lang.isBoolean,value:D.wrap||false});this.setAttributeConfig("handles",{writeOnce:true,value:D.handles||["r","b","br"],validator:function(F){if(C.isString(F)&&F.toLowerCase()=="all"){F=["t","b","r","l","bl","br","tl","tr"];}if(!C.isArray(F)){F=F.replace(/, /g,",");F=F.split(",");}this._configs.handles.value=F;}});this.setAttributeConfig("width",{value:D.width||parseInt(this.getStyle("width"),10),validator:YAHOO.lang.isNumber,method:function(F){F=parseInt(F,10);if(F>0){if(this.get("setSize")){this.setStyle("width",F+"px");}this._cache.width=F;this._configs.width.value=F;}}});this.setAttributeConfig("height",{value:D.height||parseInt(this.getStyle("height"),10),validator:YAHOO.lang.isNumber,method:function(F){F=parseInt(F,10);if(F>0){if(this.get("setSize")){this.setStyle("height",F+"px");}this._cache.height=F;this._configs.height.value=F;}}});this.setAttributeConfig("minWidth",{value:D.minWidth||15,validator:YAHOO.lang.isNumber});this.setAttributeConfig("minHeight",{value:D.minHeight||15,validator:YAHOO.lang.isNumber});this.setAttributeConfig("maxWidth",{value:D.maxWidth||10000,validator:YAHOO.lang.isNumber});this.setAttributeConfig("maxHeight",{value:D.maxHeight||10000,validator:YAHOO.lang.isNumber});this.setAttributeConfig("minY",{value:D.minY||false});this.setAttributeConfig("minX",{value:D.minX||false});this.setAttributeConfig("maxY",{value:D.maxY||false});this.setAttributeConfig("maxX",{value:D.maxX||false});this.setAttributeConfig("animate",{value:D.animate||false,validator:function(G){var F=true;if(!YAHOO.util.Anim){F=false;}return F;}});this.setAttributeConfig("animateEasing",{value:D.animateEasing||function(){var G=false;try{G=YAHOO.util.Easing.easeOut;}catch(F){}return G;}()});this.setAttributeConfig("animateDuration",{value:D.animateDuration||0.5});this.setAttributeConfig("proxy",{value:D.proxy||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("ratio",{value:D.ratio||false,validator:YAHOO.lang.isBoolean});
this.setAttributeConfig("ghost",{value:D.ghost||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("draggable",{value:D.draggable||false,validator:YAHOO.lang.isBoolean,method:function(F){if(F&&this._wrap){this._setupDragDrop();}else{if(this.dd){E.removeClass(this._wrap,this.CSS_DRAG);this.dd.unreg();}}}});this.setAttributeConfig("hover",{value:D.hover||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("hiddenHandles",{value:D.hiddenHandles||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("knobHandles",{value:D.knobHandles||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("xTicks",{value:D.xTicks||false});this.setAttributeConfig("yTicks",{value:D.yTicks||false});this.setAttributeConfig("status",{value:D.status||false,validator:YAHOO.lang.isBoolean});this.setAttributeConfig("autoRatio",{value:D.autoRatio||false,validator:YAHOO.lang.isBoolean});},destroy:function(){for(var F in this._handles){if(C.hasOwnProperty(this._handles,F)){A.purgeElement(this._handles[F]);this._handles[F].parentNode.removeChild(this._handles[F]);}}if(this._proxy){this._proxy.parentNode.removeChild(this._proxy);}if(this._status){this._status.parentNode.removeChild(this._status);}if(this.dd){this.dd.unreg();E.removeClass(this._wrap,this.CSS_DRAG);}if(this._wrap!=this.get("element")){this.setStyle("position","");this.setStyle("top","");this.setStyle("left","");this._wrap.parentNode.replaceChild(this.get("element"),this._wrap);}this.removeClass(this.CSS_RESIZE);delete YAHOO.util.Resize._instances[this.get("id")];for(var D in this){if(C.hasOwnProperty(this,D)){this[D]=null;delete this[D];}}},toString:function(){if(this.get){return"Resize (#"+this.get("id")+")";}return"Resize Utility";}});YAHOO.util.Resize=B;})();YAHOO.register("resize",YAHOO.util.Resize,{version:"2.5.2",build:"1076"});
}, '2.5.2' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-dragdrop", "yui2-element", "yui2-skin-sam-resize"], "optional": ["yui2-animation"]});
