/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var D=YAHOO,B=D.util,A=D.lang,C;if(!B.Storage){C=function(E){D.log("Exception in YAHOO.util.Storage.?? - must be extended by a storage engine".replace("??",E).replace("??",this.getName?this.getName():"Unknown"),"error");};B.Storage=function(E,G,F){var H=this;D.env._id_counter+=1;H._cfg=A.isObject(F)?F:{};H._location=E;H._name=G;H.isReady=false;H.createEvent(H.CE_READY,{scope:H});H.createEvent(H.CE_CHANGE,{scope:H});H.subscribe(H.CE_READY,function(){H.isReady=true;});};B.Storage.prototype={CE_READY:"YUIStorageReady",CE_CHANGE:"YUIStorageChange",DELIMITER:"__",_cfg:"",_name:"",_location:"",length:0,isReady:false,clear:function(){this._clear();this.length=0;},getItem:function(E){D.log("Fetching item at  "+E);var F=this._getItem(E);return A.isValue(F)?this._getValue(F):null;},getName:function(){return this._name;},hasKey:function(E){return A.isString(E)&&this._hasKey(E);},key:function(E){D.log("Fetching key at "+E);if(A.isNumber(E)&&-1<E&&this.length>E){var F=this._key(E);if(F){return F;}}throw ("INDEX_SIZE_ERR - Storage.setItem - The provided index ("+E+") is not available");},removeItem:function(F){D.log("removing "+F);if(this.hasKey(F)){var E=this._getItem(F);if(!E){E=null;}this._removeItem(F);this.fireEvent(this.CE_CHANGE,new B.StorageEvent(this,F,E,null,B.StorageEvent.TYPE_REMOVE_ITEM));}else{}},setItem:function(G,H){D.log("SETTING "+H+" to "+G);if(A.isString(G)){var F=this.hasKey(G)?B.StorageEvent.TYPE_UPDATE_ITEM:B.StorageEvent.TYPE_ADD_ITEM,E=this._getItem(G);if(!E){E=null;}if(this._setItem(G,this._createValue(H))){this.fireEvent(this.CE_CHANGE,new B.StorageEvent(this,G,E,H,F));}else{throw ("QUOTA_EXCEEDED_ERROR - Storage.setItem - The choosen storage method ("+this.getName()+") has exceeded capacity");}}else{}},_clear:function(){C("_clear");return"";},_createValue:function(F){var E=(A.isNull(F)||A.isUndefined(F))?(""+F):typeof F;return"string"===E?F:E+this.DELIMITER+F;},_getItem:function(E){C("_getItem");return"";},_getValue:function(F){var E=F?F.split(this.DELIMITER):[];if(1==E.length){return F;}switch(E[0]){case"boolean":return"true"===E[1];case"number":return parseFloat(E[1]);case"null":return null;default:return E[1];}},_key:function(E){C("_key");return"";},_hasKey:function(E){return null!==this._getItem(E);},_removeItem:function(E){C("_removeItem");return"";},_setItem:function(E,F){C("_setItem");return"";}};A.augmentProto(B.Storage,B.EventProvider);}}());(function(){var H=YAHOO.util,B=YAHOO.lang,E={},G=[],F={},C=function(I){return(I&&I.isAvailable())?I:null;},A=function(J,I,K){var L=E[J+I.ENGINE_NAME];if(!L){L=new I(J,K);E[J+I.ENGINE_NAME]=L;}return L;},D=function(I){switch(I){case H.StorageManager.LOCATION_LOCAL:case H.StorageManager.LOCATION_SESSION:return I;default:return H.StorageManager.LOCATION_SESSION;}};H.StorageManager={LOCATION_SESSION:"sessionStorage",LOCATION_LOCAL:"localStorage",get:function(O,J,M){var K=B.isObject(M)?M:{},I=C(F[O]);if(!I&&!K.force){var N,L;if(K.order){L=K.order.length;for(N=0;N<L&&!I;N+=1){I=C(K.order[N]);}}if(!I){L=G.length;for(N=0;N<L&&!I;N+=1){I=C(G[N]);}}}if(I){return A(D(J),I,K.engine);}throw ("YAHOO.util.StorageManager.get - No engine available, please include an engine before calling this function.");},getByteSize:function(I){return encodeURIComponent(""+I).length;},register:function(I){if(B.isFunction(I)&&B.isFunction(I.isAvailable)&&B.isString(I.ENGINE_NAME)){F[I.ENGINE_NAME]=I;G.push(I);return true;}return false;}};YAHOO.register("StorageManager",H.SWFStore,{version:"2.8.0r4",build:"2446"});}());(function(){YAHOO.util.StorageEvent=function(D,B,A,E,C){this.key=B;this.oldValue=A;this.newValue=E;this.url=window.location.href;this.window=window;this.storageArea=D;this.type=C;};YAHOO.lang.augmentObject(YAHOO.util.StorageEvent,{TYPE_ADD_ITEM:"addItem",TYPE_REMOVE_ITEM:"removeItem",TYPE_UPDATE_ITEM:"updateItem"});YAHOO.util.StorageEvent.prototype={key:null,newValue:null,oldValue:null,source:null,storageArea:null,type:null,url:null};}());(function(){var B=YAHOO.util,A=YAHOO.lang;B.StorageEngineKeyed=function(){B.StorageEngineKeyed.superclass.constructor.apply(this,arguments);this._keys=[];this._keyMap={};};A.extend(B.StorageEngineKeyed,B.Storage,{_keys:null,_keyMap:null,_addKey:function(C){this._keyMap[C]=this.length;this._keys.push(C);this.length=this._keys.length;},_indexOfKey:function(D){var C=this._keyMap[D];return undefined===C?-1:C;},_removeKey:function(E){var D=this._indexOfKey(E),F=this._keys.slice(D+1);delete this._keyMap[E];for(var C in this._keyMap){if(D<this._keyMap[C]){this._keyMap[C]-=1;}}this._keys.length=D;this._keys=this._keys.concat(F);this.length=this._keys.length;}});}());(function(){var D=YAHOO.util,B=YAHOO.lang,A=function(E){if(E.begin){E.begin();}},C=function(E){if(E.commit){E.commit();}};D.StorageEngineHTML5=function(E,F){var G=this;D.StorageEngineHTML5.superclass.constructor.call(G,E,D.StorageEngineHTML5.ENGINE_NAME,F);G._engine=window[E];G.length=G._engine.length;B.later(250,G,function(){G.fireEvent(G.CE_READY);});};YAHOO.lang.extend(D.StorageEngineHTML5,D.Storage,{_engine:null,_clear:function(){var G=this;if(G._engine.clear){G._engine.clear();}else{for(var F=G.length,E;0<=F;F-=1){E=G._key(F);G._removeItem(E);}}},_getItem:function(E){var F=this._engine.getItem(E);return B.isObject(F)?F.value:F;},_key:function(E){return this._engine.key(E);},_removeItem:function(E){var F=this;A(F._engine);F._engine.removeItem(E);C(F._engine);F.length=F._engine.length;},_setItem:function(E,F){var H=this;try{A(H._engine);H._engine.setItem(E,F);C(H._engine);H.length=H._engine.length;return true;}catch(G){return false;}}},true);D.StorageEngineHTML5.ENGINE_NAME="html5";D.StorageEngineHTML5.isAvailable=function(){return window.localStorage;};D.StorageManager.register(D.StorageEngineHTML5);}());(function(){var G=YAHOO.util,B=YAHOO.lang,D=9948,C="YUIStorageEngine",F=null,E=encodeURIComponent,A=decodeURIComponent;G.StorageEngineGears=function(I,L){var O=this;G.StorageEngineGears.superclass.constructor.call(O,I,G.StorageEngineGears.ENGINE_NAME,L);
if(!F){F=google.gears.factory.create(G.StorageEngineGears.GEARS);F.open(window.location.host+"-"+G.StorageEngineGears.DATABASE);F.execute("CREATE TABLE IF NOT EXISTS "+C+" (key TEXT, location TEXT, value TEXT)");}var K=G.StorageManager.LOCATION_SESSION===O._location,H=G.Cookie.get("sessionKey"+G.StorageEngineGears.ENGINE_NAME);if(!H){F.execute("BEGIN");F.execute("DELETE FROM "+C+' WHERE location="'+E(G.StorageManager.LOCATION_SESSION)+'"');F.execute("COMMIT");}var J=F.execute("SELECT key FROM "+C+' WHERE location="'+E(O._location)+'"'),N={};try{while(J.isValidRow()){var M=A(J.field(0));if(!N[M]){N[M]=true;O._addKey(M);}J.next();}}finally{J.close();}if(K){G.Cookie.set("sessionKey"+G.StorageEngineGears.ENGINE_NAME,true);}O.length=O._keys.length;B.later(250,O,function(){O.fireEvent(O.CE_READY);});};B.extend(G.StorageEngineGears,G.StorageEngineKeyed,{_clear:function(){F.execute("BEGIN");F.execute("DELETE FROM "+C+' WHERE location="'+E(this._location)+'"');F.execute("COMMIT");this._keys=[];this.length=0;},_getItem:function(J){var I=F.execute("SELECT value FROM "+C+' WHERE key="'+E(J)+'" AND location="'+E(this._location)+'"'),K="";try{while(I.isValidRow()){var H=I.field(0);K+=I.field(0);I.next();}}finally{I.close();}return K?A(K):null;},_key:function(H){return this._keys[H];},_removeItem:function(H){F.execute("BEGIN");F.execute("DELETE FROM "+C+' WHERE key="'+E(H)+'" AND location="'+E(this._location)+'"');F.execute("COMMIT");this._removeKey(H);},_setItem:function(P,M){if(!this.hasKey(P)){this._addKey(P);}var H=E(P),Q=E(this._location),R=E(M),K=[],O=D-(H+Q).length;if(O<R.length){for(var N=0,L=R.length;N<L;N+=O){K.push(R.substr(N,O));}}else{K.push(R);}F.execute("BEGIN");F.execute("DELETE FROM "+C+' WHERE key="'+E(P)+'" AND location="'+E(this._location)+'"');for(var J=0,I=K.length;J<I;J+=1){F.execute("INSERT INTO "+C+' VALUES ("'+H+'", "'+Q+'", "'+K[J]+'")');}F.execute("COMMIT");return true;}});G.Event.on("unload",function(){if(F){F.close();}});G.StorageEngineGears.ENGINE_NAME="gears";G.StorageEngineGears.GEARS="beta.database";G.StorageEngineGears.DATABASE="yui.database";G.StorageEngineGears.isAvailable=function(){if(window.google&&window.google.gears){try{google.gears.factory.create(G.StorageEngineGears.GEARS);return true;}catch(H){}}return false;};G.StorageManager.register(G.StorageEngineGears);}());(function(){var G=YAHOO.util,B=YAHOO.lang,H=G.Dom,C=215,E=138,F=null,D=function(J,I){return J._location+J.DELIMITER+I;},A=function(J){if(!F){if(!B.isString(J.swfURL)){J.swfURL=G.StorageEngineSWF.SWFURL;}if(!J.containerID){var K=document.getElementsByTagName("body")[0],I=K.appendChild(document.createElement("div"));J.containerID=H.generateId(I);}if(!J.attributes){J.attributes={};}if(!J.attributes.flashVars){J.attributes.flashVars={};}J.attributes.flashVars.useCompression="true";J.attributes.version=9.115;F=new YAHOO.widget.SWF(J.containerID,J.swfURL,J.attributes);}};G.StorageEngineSWF=function(I,J){var K=this;G.StorageEngineSWF.superclass.constructor.call(K,I,G.StorageEngineSWF.ENGINE_NAME,J);A(K._cfg);F.unsubscribe("contentReady");F.addListener("contentReady",function(){K._swf=F._swf;F.initialized=true;var N=G.StorageManager.LOCATION_SESSION===K._location,M=G.Cookie.get("sessionKey"+G.StorageEngineSWF.ENGINE_NAME);for(var P=F.callSWF("getLength",[])-1;0<=P;P-=1){var O=F.callSWF("getNameAt",[P]),L=-1<O.indexOf(G.StorageManager.LOCATION_SESSION+K.DELIMITER);if(N&&!M){F.callSWF("removeItem",[O]);}else{if(N===L){K._addKey(O);}}}if(N){G.Cookie.set("sessionKey"+G.StorageEngineSWF.ENGINE_NAME,true);}K.length=K._keys.length;K.fireEvent(K.CE_READY);});if(F.initialized){F.fireEvent("contentReady");}};B.extend(G.StorageEngineSWF,G.StorageEngineKeyed,{_swf:null,_clear:function(){for(var J=this._keys.length-1;0<=J;J-=1){var I=this._keys[J];F.callSWF("removeItem",[I]);}this._keys=[];this.length=0;},_getItem:function(I){var J=D(this,I);return F.callSWF("getValueOf",[J]);},_key:function(I){return(this._keys[I]||"").replace(/^.*?__/,"");},_removeItem:function(I){var J=D(this,I);F.callSWF("removeItem",[J]);this._removeKey(J);},_setItem:function(I,K){var J=D(this,I),L;if(F.callSWF("getValueOf",[J])){this._removeItem(I);}this._addKey(J);if(F.callSWF("setItem",[J,K])){return true;}else{L=H.get(F._id);if(C>H.getStyle(L,"width").replace(/\D+/g,"")){H.setStyle(L,"width",C+"px");}if(E>H.getStyle(L,"height").replace(/\D+/g,"")){H.setStyle(L,"height",E+"px");}return F.callSWF("displaySettings",[]);}}});G.StorageEngineSWF.SWFURL="swfstore.swf";G.StorageEngineSWF.ENGINE_NAME="swf";G.StorageEngineSWF.isAvailable=function(){return(6<=YAHOO.env.ua.flash&&YAHOO.widget.SWF);};G.StorageManager.register(G.StorageEngineSWF);}());YAHOO.register("storage",YAHOO.util.Storage,{version:"2.8.0r4",build:"2446"});