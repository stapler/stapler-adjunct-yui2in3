YUI.add('yui2-autocomplete', function(Y) {
    var YAHOO    = Y.YUI2;
    /*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.3.1
*/
YAHOO.widget.AutoComplete=function(G,B,J,D){if(G&&B&&J){if(J instanceof YAHOO.widget.DataSource){this.dataSource=J;}else{return ;}if(YAHOO.util.Dom.inDocument(G)){if(YAHOO.lang.isString(G)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+G;this._oTextbox=document.getElementById(G);}else{this._sName=(G.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+G.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._oTextbox=G;}YAHOO.util.Dom.addClass(this._oTextbox,"yui-ac-input");}else{return ;}if(YAHOO.util.Dom.inDocument(B)){if(YAHOO.lang.isString(B)){this._oContainer=document.getElementById(B);}else{this._oContainer=B;}if(this._oContainer.style.display=="none"){}var E=this._oContainer.parentNode;var A=E.tagName.toLowerCase();if(A=="div"){YAHOO.util.Dom.addClass(E,"yui-ac");}else{}}else{return ;}if(D&&(D.constructor==Object)){for(var I in D){if(I){this[I]=D[I];}}}this._initContainer();this._initProps();this._initList();this._initContainerHelpers();var H=this;var F=this._oTextbox;var C=this._oContainer._oContent;YAHOO.util.Event.addListener(F,"keyup",H._onTextboxKeyUp,H);YAHOO.util.Event.addListener(F,"keydown",H._onTextboxKeyDown,H);YAHOO.util.Event.addListener(F,"focus",H._onTextboxFocus,H);YAHOO.util.Event.addListener(F,"blur",H._onTextboxBlur,H);YAHOO.util.Event.addListener(C,"mouseover",H._onContainerMouseover,H);YAHOO.util.Event.addListener(C,"mouseout",H._onContainerMouseout,H);YAHOO.util.Event.addListener(C,"scroll",H._onContainerScroll,H);YAHOO.util.Event.addListener(C,"resize",H._onContainerResize,H);if(F.form){YAHOO.util.Event.addListener(F.form,"submit",H._onFormSubmit,H);}YAHOO.util.Event.addListener(F,"keypress",H._onTextboxKeyPress,H);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);F.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListItems=function(){return this._aListItems;};YAHOO.widget.AutoComplete.prototype.getListItemData=function(A){if(A._oResultData){return A._oResultData;}else{return false;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(A){if(A){if(this._oContainer._oContent._oHeader){this._oContainer._oContent._oHeader.innerHTML=A;this._oContainer._oContent._oHeader.style.display="block";}}else{this._oContainer._oContent._oHeader.innerHTML="";this._oContainer._oContent._oHeader.style.display="none";}};YAHOO.widget.AutoComplete.prototype.setFooter=function(A){if(A){if(this._oContainer._oContent._oFooter){this._oContainer._oContent._oFooter.innerHTML=A;this._oContainer._oContent._oFooter.style.display="block";}}else{this._oContainer._oContent._oFooter.innerHTML="";this._oContainer._oContent._oFooter.style.display="none";}};YAHOO.widget.AutoComplete.prototype.setBody=function(A){if(A){if(this._oContainer._oContent._oBody){this._oContainer._oContent._oBody.innerHTML=A;this._oContainer._oContent._oBody.style.display="block";this._oContainer._oContent.style.display="block";}}else{this._oContainer._oContent._oBody.innerHTML="";this._oContainer._oContent.style.display="none";}this._maxResultsDisplayed=0;};YAHOO.widget.AutoComplete.prototype.formatResult=function(B,C){var A=B[0];if(A){return A;}else{return"";}};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(A,B,D,C){return true;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(A){this._sendQuery(A);};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(A){return A;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var B=this.toString();var A=this._oTextbox;var D=this._oContainer;this.textboxFocusEvent.unsubscribe();this.textboxKeyEvent.unsubscribe();this.dataRequestEvent.unsubscribe();this.dataReturnEvent.unsubscribe();this.dataErrorEvent.unsubscribe();this.containerExpandEvent.unsubscribe();this.typeAheadEvent.unsubscribe();
this.itemMouseOverEvent.unsubscribe();this.itemMouseOutEvent.unsubscribe();this.itemArrowToEvent.unsubscribe();this.itemArrowFromEvent.unsubscribe();this.itemSelectEvent.unsubscribe();this.unmatchedItemSelectEvent.unsubscribe();this.selectionEnforceEvent.unsubscribe();this.containerCollapseEvent.unsubscribe();this.textboxBlurEvent.unsubscribe();YAHOO.util.Event.purgeElement(A,true);YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";for(var C in this){if(YAHOO.lang.hasOwnProperty(this,C)){this[C]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._oTextbox=null;YAHOO.widget.AutoComplete.prototype._bFocused=true;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._oContainer=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._aListItems=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._maxResultsDisplayed=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sSavedQuery=null;YAHOO.widget.AutoComplete.prototype._oCurItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var B=this.minQueryLength;if(!YAHOO.lang.isNumber(B)){this.minQueryLength=1;}var D=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(D)||(D<1)){this.maxResultsDisplayed=10;}var E=this.queryDelay;if(!YAHOO.lang.isNumber(E)||(E<0)){this.queryDelay=0.2;}var A=this.delimChar;if(YAHOO.lang.isString(A)&&(A.length>0)){this.delimChar=[A];}else{if(!YAHOO.lang.isArray(A)){this.delimChar=null;}}var C=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(C)||(C<0)){this.animSpeed=0.3;}if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._oContainer._oContent,{},this.animSpeed);}else{this._oAnim.duration=this.animSpeed;}}if(this.forceSelection&&A){}};YAHOO.widget.AutoComplete.prototype._initContainerHelpers=function(){if(this.useShadow&&!this._oContainer._oShadow){var B=document.createElement("div");B.className="yui-ac-shadow";this._oContainer._oShadow=this._oContainer.appendChild(B);}if(this.useIFrame&&!this._oContainer._oIFrame){var A=document.createElement("iframe");A.src=this._iFrameSrc;A.frameBorder=0;A.scrolling="no";A.style.position="absolute";A.style.width="100%";A.style.height="100%";A.tabIndex=-1;this._oContainer._oIFrame=this._oContainer.appendChild(A);}};YAHOO.widget.AutoComplete.prototype._initContainer=function(){YAHOO.util.Dom.addClass(this._oContainer,"yui-ac-container");if(!this._oContainer._oContent){var D=document.createElement("div");D.className="yui-ac-content";D.style.display="none";this._oContainer._oContent=this._oContainer.appendChild(D);var B=document.createElement("div");B.className="yui-ac-hd";B.style.display="none";this._oContainer._oContent._oHeader=this._oContainer._oContent.appendChild(B);var C=document.createElement("div");C.className="yui-ac-bd";this._oContainer._oContent._oBody=this._oContainer._oContent.appendChild(C);var A=document.createElement("div");A.className="yui-ac-ft";A.style.display="none";this._oContainer._oContent._oFooter=this._oContainer._oContent.appendChild(A);}else{}};YAHOO.widget.AutoComplete.prototype._initList=function(){this._aListItems=[];while(this._oContainer._oContent._oBody.hasChildNodes()){var B=this.getListItems();if(B){for(var A=B.length-1;A>=0;A--){B[A]=null;}}this._oContainer._oContent._oBody.innerHTML="";}var E=document.createElement("ul");E=this._oContainer._oContent._oBody.appendChild(E);for(var C=0;C<this.maxResultsDisplayed;C++){var D=document.createElement("li");D=E.appendChild(D);this._aListItems[C]=D;this._initListItem(D,C);}this._maxResultsDisplayed=this.maxResultsDisplayed;};YAHOO.widget.AutoComplete.prototype._initListItem=function(C,B){var A=this;C.style.display="none";C._nItemIndex=B;C.mouseover=C.mouseout=C.onclick=null;YAHOO.util.Event.addListener(C,"mouseover",A._onItemMouseover,A);YAHOO.util.Event.addListener(C,"mouseout",A._onItemMouseout,A);YAHOO.util.Event.addListener(C,"click",A._onItemMouseclick,A);};YAHOO.widget.AutoComplete.prototype._onIMEDetected=function(A){A._enableIntervalDetection();};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var A=this._oTextbox.value;var B=this._sLastTextboxValue;if(A!=B){this._sLastTextboxValue=A;this._sendQuery(A);}};YAHOO.widget.AutoComplete.prototype._cancelIntervalDetection=function(A){if(A._queryInterval){clearInterval(A._queryInterval);}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(A){if((A==9)||(A==13)||(A==16)||(A==17)||(A>=18&&A<=20)||(A==27)||(A>=33&&A<=35)||(A>=36&&A<=40)||(A>=44&&A<=45)){return true;
}return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(G){if(this.minQueryLength==-1){this._toggleContainer(false);return ;}var C=(this.delimChar)?this.delimChar:null;if(C){var E=-1;for(var B=C.length-1;B>=0;B--){var F=G.lastIndexOf(C[B]);if(F>E){E=F;}}if(C[B]==" "){for(var A=C.length-1;A>=0;A--){if(G[E-1]==C[A]){E--;break;}}}if(E>-1){var D=E+1;while(G.charAt(D)==" "){D+=1;}this._sSavedQuery=G.substring(0,D);G=G.substr(D);}else{if(G.indexOf(this._sSavedQuery)<0){this._sSavedQuery=null;}}}if((G&&(G.length<this.minQueryLength))||(!G&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}this._toggleContainer(false);return ;}G=encodeURIComponent(G);this._nDelayID=-1;G=this.doBeforeSendQuery(G);this.dataRequestEvent.fire(this,G);this.dataSource.getResults(this._populateList,G,this);};YAHOO.widget.AutoComplete.prototype._populateList=function(K,L,I){if(L===null){I.dataErrorEvent.fire(I,K);}if(!I._bFocused||!L){return ;}var A=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);var O=I._oContainer._oContent.style;O.width=(!A)?null:"";O.height=(!A)?null:"";var H=decodeURIComponent(K);I._sCurQuery=H;I._bItemSelected=false;if(I._maxResultsDisplayed!=I.maxResultsDisplayed){I._initList();}var C=Math.min(L.length,I.maxResultsDisplayed);I._nDisplayedItems=C;if(C>0){I._initContainerHelpers();var D=I._aListItems;for(var G=C-1;G>=0;G--){var N=D[G];var B=L[G];N.innerHTML=I.formatResult(B,H);N.style.display="list-item";N._sResultKey=B[0];N._oResultData=B;}for(var F=D.length-1;F>=C;F--){var M=D[F];M.innerHTML=null;M.style.display="none";M._sResultKey=null;M._oResultData=null;}var J=I.doBeforeExpandContainer(I._oTextbox,I._oContainer,K,L);I._toggleContainer(J);if(I.autoHighlight){var E=D[0];I._toggleHighlight(E,"to");I.itemArrowToEvent.fire(I,E);I._typeAhead(E,K);}else{I._oCurItem=null;}}else{I._toggleContainer(false);}I.dataReturnEvent.fire(I,K,L);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var C=this._oTextbox.value;var B=(this.delimChar)?this.delimChar[0]:null;var A=(B)?C.lastIndexOf(B,C.length-2):-1;if(A>-1){this._oTextbox.value=C.substring(0,A);}else{this._oTextbox.value="";}this._sSavedQuery=this._oTextbox.value;this.selectionEnforceEvent.fire(this);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var D=null;for(var A=this._nDisplayedItems-1;A>=0;A--){var C=this._aListItems[A];var B=C._sResultKey.toLowerCase();if(B==this._sCurQuery.toLowerCase()){D=C;break;}}return(D);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(E,G){if(!this.typeAhead||(this._nKeyCode==8)){return ;}var B=this._oTextbox;var F=this._oTextbox.value;if(!B.setSelectionRange&&!B.createTextRange){return ;}var C=F.length;this._updateValue(E);var D=B.value.length;this._selectText(B,C,D);var A=B.value.substr(C,D);this.typeAheadEvent.fire(this,G,A);};YAHOO.widget.AutoComplete.prototype._selectText=function(A,B,C){if(A.setSelectionRange){A.setSelectionRange(B,C);}else{if(A.createTextRange){var D=A.createTextRange();D.moveStart("character",B);D.moveEnd("character",C-A.value.length);D.select();}else{A.select();}}};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(B){var D=false;var C=this._oContainer._oContent.offsetWidth+"px";var A=this._oContainer._oContent.offsetHeight+"px";if(this.useIFrame&&this._oContainer._oIFrame){D=true;if(B){this._oContainer._oIFrame.style.width=C;this._oContainer._oIFrame.style.height=A;}else{this._oContainer._oIFrame.style.width=0;this._oContainer._oIFrame.style.height=0;}}if(this.useShadow&&this._oContainer._oShadow){D=true;if(B){this._oContainer._oShadow.style.width=C;this._oContainer._oShadow.style.height=A;}else{this._oContainer._oShadow.style.width=0;this._oContainer._oShadow.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(J){var L=this._oContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return ;}if(!J){this._oContainer._oContent.scrollTop=0;var C=this._aListItems;if(C&&(C.length>0)){for(var G=C.length-1;G>=0;G--){C[G].style.display="none";}}if(this._oCurItem){this._toggleHighlight(this._oCurItem,"from");}this._oCurItem=null;this._nDisplayedItems=0;this._sCurQuery=null;}if(!J&&!this._bContainerOpen){L._oContent.style.display="none";return ;}var B=this._oAnim;if(B&&B.getEl()&&(this.animHoriz||this.animVert)){if(!J){this._toggleContainerHelpers(J);}if(B.isAnimated()){B.stop();}var H=L._oContent.cloneNode(true);L.appendChild(H);H.style.top="-9000px";H.style.display="block";var F=H.offsetWidth;var D=H.offsetHeight;var A=(this.animHoriz)?0:F;var E=(this.animVert)?0:D;B.attributes=(J)?{width:{to:F},height:{to:D}}:{width:{to:A},height:{to:E}};if(J&&!this._bContainerOpen){L._oContent.style.width=A+"px";L._oContent.style.height=E+"px";}else{L._oContent.style.width=F+"px";L._oContent.style.height=D+"px";}L.removeChild(H);H=null;var I=this;var K=function(){B.onComplete.unsubscribeAll();if(J){I.containerExpandEvent.fire(I);}else{L._oContent.style.display="none";I.containerCollapseEvent.fire(I);}I._toggleContainerHelpers(J);};L._oContent.style.display="block";B.onComplete.subscribe(K);B.animate();this._bContainerOpen=J;}else{if(J){L._oContent.style.display="block";this.containerExpandEvent.fire(this);}else{L._oContent.style.display="none";this.containerCollapseEvent.fire(this);}this._toggleContainerHelpers(J);this._bContainerOpen=J;}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(A,C){var B=this.highlightClassName;if(this._oCurItem){YAHOO.util.Dom.removeClass(this._oCurItem,B);}if((C=="to")&&B){YAHOO.util.Dom.addClass(A,B);this._oCurItem=A;}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(A,C){if(A==this._oCurItem){return ;}var B=this.prehighlightClassName;if((C=="mouseover")&&B){YAHOO.util.Dom.addClass(A,B);}else{YAHOO.util.Dom.removeClass(A,B);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(F){var C=this._oTextbox;var E=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var B=this._sSavedQuery;var D=F._sResultKey;C.focus();
C.value="";if(E){if(B){C.value=B;}C.value+=D+E;if(E!=" "){C.value+=" ";}}else{C.value=D;}if(C.type=="textarea"){C.scrollTop=C.scrollHeight;}var A=C.value.length;this._selectText(C,A,A);this._oCurItem=F;};YAHOO.widget.AutoComplete.prototype._selectItem=function(A){this._bItemSelected=true;this._updateValue(A);this._cancelIntervalDetection(this);this.itemSelectEvent.fire(this,A,A._oResultData);this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._oCurItem){this._selectItem(this._oCurItem);}else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(G){if(this._bContainerOpen){var D=this._oCurItem;var F=-1;if(D){F=D._nItemIndex;}var C=(G==40)?(F+1):(F-1);if(C<-2||C>=this._nDisplayedItems){return ;}if(D){this._toggleHighlight(D,"from");this.itemArrowFromEvent.fire(this,D);}if(C==-1){if(this.delimChar&&this._sSavedQuery){if(!this._textMatchesOption()){this._oTextbox.value=this._sSavedQuery;}else{this._oTextbox.value=this._sSavedQuery+this._sCurQuery;}}else{this._oTextbox.value=this._sCurQuery;}this._oCurItem=null;return ;}if(C==-2){this._toggleContainer(false);return ;}var B=this._aListItems[C];var E=this._oContainer._oContent;var A=((YAHOO.util.Dom.getStyle(E,"overflow")=="auto")||(YAHOO.util.Dom.getStyle(E,"overflowY")=="auto"));if(A&&(C>-1)&&(C<this._nDisplayedItems)){if(G==40){if((B.offsetTop+B.offsetHeight)>(E.scrollTop+E.offsetHeight)){E.scrollTop=(B.offsetTop+B.offsetHeight)-E.offsetHeight;}else{if((B.offsetTop+B.offsetHeight)<E.scrollTop){E.scrollTop=B.offsetTop;}}}else{if(B.offsetTop<E.scrollTop){this._oContainer._oContent.scrollTop=B.offsetTop;}else{if(B.offsetTop>(E.scrollTop+E.offsetHeight)){this._oContainer._oContent.scrollTop=(B.offsetTop+B.offsetHeight)-E.offsetHeight;}}}}this._toggleHighlight(B,"to");this.itemArrowToEvent.fire(this,B);if(this.typeAhead){this._updateValue(B);}}};YAHOO.widget.AutoComplete.prototype._onItemMouseover=function(A,B){if(B.prehighlightClassName){B._togglePrehighlight(this,"mouseover");}else{B._toggleHighlight(this,"to");}B.itemMouseOverEvent.fire(B,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseout=function(A,B){if(B.prehighlightClassName){B._togglePrehighlight(this,"mouseout");}else{B._toggleHighlight(this,"from");}B.itemMouseOutEvent.fire(B,this);};YAHOO.widget.AutoComplete.prototype._onItemMouseclick=function(A,B){B._toggleHighlight(this,"to");B._selectItem(this);};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(A,B){B._bOverContainer=true;};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(A,B){B._bOverContainer=false;if(B._oCurItem){B._toggleHighlight(B._oCurItem,"to");}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(A,B){B._oTextbox.focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(A,B){B._toggleContainerHelpers(B._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(A,B){var C=A.keyCode;switch(C){case 9:if(B._oCurItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}break;case 13:if(B._oCurItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._oCurItem);}else{B._toggleContainer(false);}break;case 27:B._toggleContainer(false);return ;case 39:B._jumpSelection();break;case 38:YAHOO.util.Event.stopEvent(A);B._moveSelection(C);break;case 40:YAHOO.util.Event.stopEvent(A);B._moveSelection(C);break;default:break;}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(A,C){var D=A.keyCode;var B=(navigator.userAgent.toLowerCase().indexOf("mac")!=-1);if(B){switch(D){case 9:if(C._oCurItem){if(C.delimChar&&(C._nKeyCode!=D)){YAHOO.util.Event.stopEvent(A);}}break;case 13:if(C._oCurItem){if(C._nKeyCode!=D){if(C._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}}break;case 38:case 40:YAHOO.util.Event.stopEvent(A);break;default:break;}}else{if(D==229){C._queryInterval=setInterval(function(){C._onIMEDetected(C);},500);}}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(B,D){D._initProps();var E=B.keyCode;D._nKeyCode=E;var C=this.value;if(D._isIgnoreKey(E)||(C.toLowerCase()==D._sCurQuery)){return ;}else{D._bItemSelected=false;YAHOO.util.Dom.removeClass(D._oCurItem,D.highlightClassName);D._oCurItem=null;D.textboxKeyEvent.fire(D,E);}if(D.queryDelay>0){var A=setTimeout(function(){D._sendQuery(C);},(D.queryDelay*1000));if(D._nDelayID!=-1){clearTimeout(D._nDelayID);}D._nDelayID=A;}else{D._sendQuery(C);}};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(A,B){B._oTextbox.setAttribute("autocomplete","off");B._bFocused=true;if(!B._bItemSelected){B.textboxFocusEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(A,B){if(!B._bOverContainer||(B._nKeyCode==9)){if(!B._bItemSelected){var C=B._textMatchesOption();if(!B._bContainerOpen||(B._bContainerOpen&&(C===null))){if(B.forceSelection){B._clearSelection();}else{B.unmatchedItemSelectEvent.fire(B);}}else{if(B.forceSelection){B._selectItem(C);}}}if(B._bContainerOpen){B._toggleContainer(false);}B._cancelIntervalDetection(B);B._bFocused=false;B.textboxBlurEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onFormSubmit=function(A,B){if(B.allowBrowserAutocomplete){B._oTextbox.setAttribute("autocomplete","on");}else{B._oTextbox.setAttribute("autocomplete","off");}};YAHOO.widget.DataSource=function(){};YAHOO.widget.DataSource.ERROR_DATANULL="Response data was null";YAHOO.widget.DataSource.ERROR_DATAPARSE="Response data could not be parsed";YAHOO.widget.DataSource.prototype.maxCacheEntries=15;YAHOO.widget.DataSource.prototype.queryMatchContains=false;YAHOO.widget.DataSource.prototype.queryMatchSubset=false;YAHOO.widget.DataSource.prototype.queryMatchCase=false;YAHOO.widget.DataSource.prototype.toString=function(){return"DataSource "+this._sName;};YAHOO.widget.DataSource.prototype.getResults=function(A,D,B){var C=this._doQueryCache(A,D,B);if(C.length===0){this.queryEvent.fire(this,B,D);
this.doQuery(A,D,B);}};YAHOO.widget.DataSource.prototype.doQuery=function(A,C,B){};YAHOO.widget.DataSource.prototype.flushCache=function(){if(this._aCache){this._aCache=[];}if(this._aCacheHelper){this._aCacheHelper=[];}this.cacheFlushEvent.fire(this);};YAHOO.widget.DataSource.prototype.queryEvent=null;YAHOO.widget.DataSource.prototype.cacheQueryEvent=null;YAHOO.widget.DataSource.prototype.getResultsEvent=null;YAHOO.widget.DataSource.prototype.getCachedResultsEvent=null;YAHOO.widget.DataSource.prototype.dataErrorEvent=null;YAHOO.widget.DataSource.prototype.cacheFlushEvent=null;YAHOO.widget.DataSource._nIndex=0;YAHOO.widget.DataSource.prototype._sName=null;YAHOO.widget.DataSource.prototype._aCache=null;YAHOO.widget.DataSource.prototype._init=function(){var A=this.maxCacheEntries;if(!YAHOO.lang.isNumber(A)||(A<0)){A=0;}if(A>0&&!this._aCache){this._aCache=[];}this._sName="instance"+YAHOO.widget.DataSource._nIndex;YAHOO.widget.DataSource._nIndex++;this.queryEvent=new YAHOO.util.CustomEvent("query",this);this.cacheQueryEvent=new YAHOO.util.CustomEvent("cacheQuery",this);this.getResultsEvent=new YAHOO.util.CustomEvent("getResults",this);this.getCachedResultsEvent=new YAHOO.util.CustomEvent("getCachedResults",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.cacheFlushEvent=new YAHOO.util.CustomEvent("cacheFlush",this);};YAHOO.widget.DataSource.prototype._addCacheElem=function(B){var A=this._aCache;if(!A||!B||!B.query||!B.results){return ;}if(A.length>=this.maxCacheEntries){A.shift();}A.push(B);};YAHOO.widget.DataSource.prototype._doQueryCache=function(A,I,N){var H=[];var G=false;var J=this._aCache;var F=(J)?J.length:0;var K=this.queryMatchContains;var D;if((this.maxCacheEntries>0)&&J&&(F>0)){this.cacheQueryEvent.fire(this,N,I);if(!this.queryMatchCase){D=I;I=I.toLowerCase();}for(var P=F-1;P>=0;P--){var E=J[P];var B=E.results;var C=(!this.queryMatchCase)?encodeURIComponent(E.query).toLowerCase():encodeURIComponent(E.query);if(C==I){G=true;H=B;if(P!=F-1){J.splice(P,1);this._addCacheElem(E);}break;}else{if(this.queryMatchSubset){for(var O=I.length-1;O>=0;O--){var R=I.substr(0,O);if(C==R){G=true;for(var M=B.length-1;M>=0;M--){var Q=B[M];var L=(this.queryMatchCase)?encodeURIComponent(Q[0]).indexOf(I):encodeURIComponent(Q[0]).toLowerCase().indexOf(I);if((!K&&(L===0))||(K&&(L>-1))){H.unshift(Q);}}E={};E.query=I;E.results=H;this._addCacheElem(E);break;}}if(G){break;}}}}if(G){this.getCachedResultsEvent.fire(this,N,D,H);A(D,H,N);}}return H;};YAHOO.widget.DS_XHR=function(C,A,D){if(D&&(D.constructor==Object)){for(var B in D){this[B]=D[B];}}if(!YAHOO.lang.isArray(A)||!YAHOO.lang.isString(C)){return ;}this.schema=A;this.scriptURI=C;this._init();};YAHOO.widget.DS_XHR.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_XHR.TYPE_JSON=0;YAHOO.widget.DS_XHR.TYPE_XML=1;YAHOO.widget.DS_XHR.TYPE_FLAT=2;YAHOO.widget.DS_XHR.ERROR_DATAXHR="XHR response failed";YAHOO.widget.DS_XHR.prototype.connMgr=YAHOO.util.Connect;YAHOO.widget.DS_XHR.prototype.connTimeout=0;YAHOO.widget.DS_XHR.prototype.scriptURI=null;YAHOO.widget.DS_XHR.prototype.scriptQueryParam="query";YAHOO.widget.DS_XHR.prototype.scriptQueryAppend="";YAHOO.widget.DS_XHR.prototype.responseType=YAHOO.widget.DS_XHR.TYPE_JSON;YAHOO.widget.DS_XHR.prototype.responseStripAfter="\n<!-";YAHOO.widget.DS_XHR.prototype.doQuery=function(E,G,B){var J=(this.responseType==YAHOO.widget.DS_XHR.TYPE_XML);var D=this.scriptURI+"?"+this.scriptQueryParam+"="+G;if(this.scriptQueryAppend.length>0){D+="&"+this.scriptQueryAppend;}var C=null;var F=this;var I=function(K){if(!F._oConn||(K.tId!=F._oConn.tId)){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}for(var N in K){}if(!J){K=K.responseText;}else{K=K.responseXML;}if(K===null){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var M=F.parseResponse(G,K,B);var L={};L.query=decodeURIComponent(G);L.results=M;if(M===null){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DataSource.ERROR_DATAPARSE);M=[];}else{F.getResultsEvent.fire(F,B,G,M);F._addCacheElem(L);}E(G,M,B);};var A=function(K){F.dataErrorEvent.fire(F,B,G,YAHOO.widget.DS_XHR.ERROR_DATAXHR);return ;};var H={success:I,failure:A};if(YAHOO.lang.isNumber(this.connTimeout)&&(this.connTimeout>0)){H.timeout=this.connTimeout;}if(this._oConn){this.connMgr.abort(this._oConn);}F._oConn=this.connMgr.asyncRequest("GET",D,H,null);};YAHOO.widget.DS_XHR.prototype.parseResponse=function(sQuery,oResponse,oParent){var aSchema=this.schema;var aResults=[];var bError=false;var nEnd=((this.responseStripAfter!=="")&&(oResponse.indexOf))?oResponse.indexOf(this.responseStripAfter):-1;if(nEnd!=-1){oResponse=oResponse.substring(0,nEnd);}switch(this.responseType){case YAHOO.widget.DS_XHR.TYPE_JSON:var jsonList,jsonObjParsed;var isNotMac=(navigator.userAgent.toLowerCase().indexOf("khtml")==-1);if(oResponse.parseJSON&&isNotMac){jsonObjParsed=oResponse.parseJSON();if(!jsonObjParsed){bError=true;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{if(window.JSON&&isNotMac){jsonObjParsed=JSON.parse(oResponse);if(!jsonObjParsed){bError=true;break;}else{try{jsonList=eval("jsonObjParsed."+aSchema[0]);}catch(e){bError=true;break;}}}else{try{while(oResponse.substring(0,1)==" "){oResponse=oResponse.substring(1,oResponse.length);}if(oResponse.indexOf("{")<0){bError=true;break;}if(oResponse.indexOf("{}")===0){break;}var jsonObjRaw=eval("("+oResponse+")");if(!jsonObjRaw){bError=true;break;}jsonList=eval("(jsonObjRaw."+aSchema[0]+")");}catch(e){bError=true;break;}}}if(!jsonList){bError=true;break;}if(!YAHOO.lang.isArray(jsonList)){jsonList=[jsonList];}for(var i=jsonList.length-1;i>=0;i--){var aResultItem=[];var jsonResult=jsonList[i];for(var j=aSchema.length-1;j>=1;j--){var dataFieldValue=jsonResult[aSchema[j]];if(!dataFieldValue){dataFieldValue="";}aResultItem.unshift(dataFieldValue);}if(aResultItem.length==1){aResultItem.push(jsonResult);}aResults.unshift(aResultItem);}break;case YAHOO.widget.DS_XHR.TYPE_XML:var xmlList=oResponse.getElementsByTagName(aSchema[0]);
if(!xmlList){bError=true;break;}for(var k=xmlList.length-1;k>=0;k--){var result=xmlList.item(k);var aFieldSet=[];for(var m=aSchema.length-1;m>=1;m--){var sValue=null;var xmlAttr=result.attributes.getNamedItem(aSchema[m]);if(xmlAttr){sValue=xmlAttr.value;}else{var xmlNode=result.getElementsByTagName(aSchema[m]);if(xmlNode&&xmlNode.item(0)&&xmlNode.item(0).firstChild){sValue=xmlNode.item(0).firstChild.nodeValue;}else{sValue="";}}aFieldSet.unshift(sValue);}aResults.unshift(aFieldSet);}break;case YAHOO.widget.DS_XHR.TYPE_FLAT:if(oResponse.length>0){var newLength=oResponse.length-aSchema[0].length;if(oResponse.substr(newLength)==aSchema[0]){oResponse=oResponse.substr(0,newLength);}var aRecords=oResponse.split(aSchema[0]);for(var n=aRecords.length-1;n>=0;n--){aResults[n]=aRecords[n].split(aSchema[1]);}}break;default:break;}sQuery=null;oResponse=null;oParent=null;if(bError){return null;}else{return aResults;}};YAHOO.widget.DS_XHR.prototype._oConn=null;YAHOO.widget.DS_JSFunction=function(A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isFunction(A)){return ;}else{this.dataFunction=A;this._init();}};YAHOO.widget.DS_JSFunction.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSFunction.prototype.dataFunction=null;YAHOO.widget.DS_JSFunction.prototype.doQuery=function(C,F,D){var B=this.dataFunction;var E=[];E=B(F);if(E===null){this.dataErrorEvent.fire(this,D,F,YAHOO.widget.DataSource.ERROR_DATANULL);return ;}var A={};A.query=decodeURIComponent(F);A.results=E;this._addCacheElem(A);this.getResultsEvent.fire(this,D,F,E);C(F,E,D);return ;};YAHOO.widget.DS_JSArray=function(A,C){if(C&&(C.constructor==Object)){for(var B in C){this[B]=C[B];}}if(!YAHOO.lang.isArray(A)){return ;}else{this.data=A;this._init();}};YAHOO.widget.DS_JSArray.prototype=new YAHOO.widget.DataSource();YAHOO.widget.DS_JSArray.prototype.data=null;YAHOO.widget.DS_JSArray.prototype.doQuery=function(E,I,A){var F;var C=this.data;var J=[];var D=false;var B=this.queryMatchContains;if(I){if(!this.queryMatchCase){I=I.toLowerCase();}for(F=C.length-1;F>=0;F--){var H=[];if(YAHOO.lang.isString(C[F])){H[0]=C[F];}else{if(YAHOO.lang.isArray(C[F])){H=C[F];}}if(YAHOO.lang.isString(H[0])){var G=(this.queryMatchCase)?encodeURIComponent(H[0]).indexOf(I):encodeURIComponent(H[0]).toLowerCase().indexOf(I);if((!B&&(G===0))||(B&&(G>-1))){J.unshift(H);}}}}else{for(F=C.length-1;F>=0;F--){if(YAHOO.lang.isString(C[F])){J.unshift([C[F]]);}else{if(YAHOO.lang.isArray(C[F])){J.unshift(C[F]);}}}}this.getResultsEvent.fire(this,A,I,J);E(I,J,A);};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.3.1",build:"541"});
}, '2.3.1' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-skin-sam-autocomplete"], "optional": ["yui2-animation", "yui2-connection"]});
