/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.8.2r1
*/
(function(){var P;YAHOO.widget.Carousel=function(s,r){YAHOO.widget.Carousel.superclass.constructor.call(this,s,r);};var U=YAHOO.widget.Carousel,e=YAHOO.util.Dom,c=YAHOO.util.Event,p=YAHOO.lang;P="Carousel";var T={},F="afterScroll",g="allItemsRemoved",b="beforeHide",J="beforePageChange",i="beforeScroll",Y="beforeShow",B="blur",X="focus",a="hide",S="itemAdded",o="itemRemoved",Q="itemReplaced",C="itemSelected",L="loadItems",I="navigationStateChange",h="pageChange",H="render",V="show",Z="startAutoPlay",q="stopAutoPlay",K="uiUpdate";function G(r,s){var t;for(t in s){if(s.hasOwnProperty(t)){e.setStyle(r,t,s[t]);}}}function W(s,r){var t=document.createElement(s);r=r||{};if(r.className){e.addClass(t,r.className);}if(r.styles){G(t,r.styles);}if(r.parent){r.parent.appendChild(t);}if(r.id){t.setAttribute("id",r.id);}if(r.content){if(r.content.nodeName){t.appendChild(r.content);}else{t.innerHTML=r.content;}}return t;}function d(t,s,r){var v;if(!t){return 0;}function u(y,x){var z;if(x=="marginRight"&&YAHOO.env.ua.webkit){z=parseInt(e.getStyle(y,"marginLeft"),10);}else{z=parseInt(e.getStyle(y,x),10);}return p.isNumber(z)?z:0;}function w(y,x){var z;if(x=="marginRight"&&YAHOO.env.ua.webkit){z=parseFloat(e.getStyle(y,"marginLeft"));}else{z=parseFloat(e.getStyle(y,x));}return p.isNumber(z)?z:0;}if(typeof r=="undefined"){r="int";}switch(s){case"height":v=t.offsetHeight;if(v>0){v+=u(t,"marginTop")+u(t,"marginBottom");}else{v=w(t,"height")+u(t,"marginTop")+u(t,"marginBottom")+u(t,"borderTopWidth")+u(t,"borderBottomWidth")+u(t,"paddingTop")+u(t,"paddingBottom");}break;case"width":v=t.offsetWidth;if(v>0){v+=u(t,"marginLeft")+u(t,"marginRight");}else{v=w(t,"width")+u(t,"marginLeft")+u(t,"marginRight")+u(t,"borderLeftWidth")+u(t,"borderRightWidth")+u(t,"paddingLeft")+u(t,"paddingRight");}break;default:if(r=="int"){v=u(t,s);}else{if(r=="float"){v=w(t,s);}else{v=e.getStyle(t,s);}}break;}return v;}function O(w){var u=this,x,t,s=0,v=u.get("firstVisible"),r=false;if(u._itemsTable.numItems===0){return 0;}t=u._itemsTable.items[v]||u._itemsTable.loading[v];if(p.isUndefined(t)){return 0;}x=e.get(t.id);if(typeof w=="undefined"){r=u.get("isVertical");}else{r=w=="height";}if(this._itemAttrCache[w]){return this._itemAttrCache[w];}if(r){s=d(x,"height");}else{s=d(x,"width");}this._itemAttrCache[w]=s;return s;}function N(){var s=this,t,r;t=s.get("isVertical");r=O.call(s,t?"height":"width");return(r*s.get("revealAmount")/100);}function m(w){var AH=this,z=AH._cols,v=AH._rows,u,AC,AB,t,x,AD,AJ=0,AE,s,AG,AA={},y=0,AI=AH._itemsTable,AF=AI.items,r=AI.loading;AB=AH.get("isVertical");AC=O.call(AH,AB?"height":"width");AG=N.call(AH);while(y<w){if(!AF[y]&&!r[y]){AJ++;}y++;}w-=AJ;if(v){u=this.getPageForItem(w);if(AB){x=Math.floor(w/z);AJ=x;AE=AJ*AC;AA.top=(AE+AG)+"px";AC=O.call(AH,"width");t=w%z;AJ=t;s=AJ*AC;AA.left=s+"px";}else{t=w%z;AD=(u-1)*z;AJ=t+AD;s=AJ*AC;AA.left=(s+AG)+"px";AC=O.call(AH,"height");x=Math.floor(w/z);AD=(u-1)*v;AJ=x-AD;AE=AJ*AC;AA.top=AE+"px";}}else{if(AB){AA.left=0;AA.top=((w*AC)+AG)+"px";}else{AA.top=0;AA.left=((w*AC)+AG)+"px";}}return AA;}function D(s){var r=this.get("numVisible");return Math.floor(s/r)*r;}function j(t){var s=0,r=0;s=O.call(this);r=s*t;return r;}function f(r,s){s.scrollPageBackward();c.preventDefault(r);}function k(r,s){s.scrollPageForward();c.preventDefault(r);}function n(w,s){var AA=this,AB=AA.CLASSES,r,y=AA._firstItem,t=AA.get("isCircular"),x=AA.get("numItems"),z=AA.get("numVisible"),v=s,u=y+z-1;if(v>=0&&v<x){if(!p.isUndefined(AA._itemsTable.items[v])){r=e.get(AA._itemsTable.items[v].id);if(r){e.removeClass(r,AB.SELECTED_ITEM);}}}if(p.isNumber(w)){w=parseInt(w,10);w=p.isNumber(w)?w:0;}else{w=y;}if(p.isUndefined(AA._itemsTable.items[w])){w=D.call(AA,w);AA.scrollTo(w);}if(!p.isUndefined(AA._itemsTable.items[w])){r=e.get(AA._itemsTable.items[w].id);if(r){e.addClass(r,AB.SELECTED_ITEM);}}if(w<y||w>u){w=D.call(AA,w);AA.scrollTo(w);}}function l(){var t=false,w=this,s=w.CLASSES,v,r,u;if(!w._hasRendered){return;}r=w.get("navigation");u=w._firstItem+w.get("numVisible");if(r.prev){if(w.get("numItems")===0||w._firstItem===0){if(w.get("numItems")===0||!w.get("isCircular")){c.removeListener(r.prev,"click",f);e.addClass(r.prev,s.FIRST_NAV_DISABLED);for(v=0;v<w._navBtns.prev.length;v++){w._navBtns.prev[v].setAttribute("disabled","true");}w._prevEnabled=false;}else{t=!w._prevEnabled;}}else{t=!w._prevEnabled;}if(t){c.on(r.prev,"click",f,w);e.removeClass(r.prev,s.FIRST_NAV_DISABLED);for(v=0;v<w._navBtns.prev.length;v++){w._navBtns.prev[v].removeAttribute("disabled");}w._prevEnabled=true;}}t=false;if(r.next){if(u>=w.get("numItems")){if(!w.get("isCircular")){c.removeListener(r.next,"click",k);e.addClass(r.next,s.DISABLED);for(v=0;v<w._navBtns.next.length;v++){w._navBtns.next[v].setAttribute("disabled","true");}w._nextEnabled=false;}else{t=!w._nextEnabled;}}else{t=!w._nextEnabled;}if(t){c.on(r.next,"click",k,w);e.removeClass(r.next,s.DISABLED);for(v=0;v<w._navBtns.next.length;v++){w._navBtns.next[v].removeAttribute("disabled");}w._nextEnabled=true;}}w.fireEvent(I,{next:w._nextEnabled,prev:w._prevEnabled});}function R(t){var u=this,r,s;if(!u._hasRendered){return;}s=u.get("numVisible");if(!p.isNumber(t)){t=Math.floor(u.get("selectedItem")/s);}r=Math.ceil(u.get("numItems")/s);u._pages.num=r;u._pages.cur=t;if(r>u.CONFIG.MAX_PAGER_BUTTONS){u._updatePagerMenu();}else{u._updatePagerButtons();}}function M(r,s){switch(s){case"height":return d(r,"marginTop")+d(r,"marginBottom")+d(r,"paddingTop")+d(r,"paddingBottom")+d(r,"borderTopWidth")+d(r,"borderBottomWidth");case"width":return d(r,"marginLeft")+d(r,"marginRight")+d(r,"paddingLeft")+d(r,"paddingRight")+d(r,"borderLeftWidth")+d(r,"borderRightWidth");default:break;}return d(r,s);}function A(s){var r=this;if(!p.isObject(s)){return;}switch(s.ev){case S:r._syncUiForItemAdd(s);break;case o:r._syncUiForItemRemove(s);break;case Q:r._syncUiForItemReplace(s);break;case L:r._syncUiForLazyLoading(s);break;}r.fireEvent(K);}function E(u,s){var w=this,v=w.get("currentPage"),t,r=w.get("numVisible");
t=parseInt(w._firstItem/r,10);if(t!=v){w.setAttributeConfig("currentPage",{value:t});w.fireEvent(h,t);}if(w.get("selectOnScroll")){if(w.get("selectedItem")!=w._selectedItem){w.set("selectedItem",w._selectedItem);}}clearTimeout(w._autoPlayTimer);delete w._autoPlayTimer;if(w.isAutoPlayOn()){w.startAutoPlay();}w.fireEvent(F,{first:w._firstItem,last:s},w);}U.getById=function(r){return T[r]?T[r].object:false;};YAHOO.extend(U,YAHOO.util.Element,{_rows:null,_cols:null,_animObj:null,_carouselEl:null,_clipEl:null,_firstItem:0,_hasFocus:false,_hasRendered:false,_isAnimationInProgress:false,_isAutoPlayInProgress:false,_itemsTable:null,_navBtns:null,_navEl:null,_nextEnabled:true,_pages:null,_pagination:{},_prevEnabled:true,_recomputeSize:true,_itemAttrCache:{},CLASSES:{BUTTON:"yui-carousel-button",CAROUSEL:"yui-carousel",CAROUSEL_EL:"yui-carousel-element",CONTAINER:"yui-carousel-container",CONTENT:"yui-carousel-content",DISABLED:"yui-carousel-button-disabled",FIRST_NAV:" yui-carousel-first-button",FIRST_NAV_DISABLED:"yui-carousel-first-button-disabled",FIRST_PAGE:"yui-carousel-nav-first-page",FOCUSSED_BUTTON:"yui-carousel-button-focus",HORIZONTAL:"yui-carousel-horizontal",ITEM_LOADING:"yui-carousel-item-loading",MIN_WIDTH:"yui-carousel-min-width",NAVIGATION:"yui-carousel-nav",NEXT_NAV:" yui-carousel-next-button",NEXT_PAGE:"yui-carousel-next",NAV_CONTAINER:"yui-carousel-buttons",PAGER_ITEM:"yui-carousel-pager-item",PAGINATION:"yui-carousel-pagination",PAGE_FOCUS:"yui-carousel-nav-page-focus",PREV_PAGE:"yui-carousel-prev",SELECTED_ITEM:"yui-carousel-item-selected",SELECTED_NAV:"yui-carousel-nav-page-selected",VERTICAL:"yui-carousel-vertical",MULTI_ROW:"yui-carousel-multi-row",ROW:"yui-carousel-row",VERTICAL_CONTAINER:"yui-carousel-vertical-container",VISIBLE:"yui-carousel-visible"},CONFIG:{FIRST_VISIBLE:0,HORZ_MIN_WIDTH:180,MAX_PAGER_BUTTONS:5,VERT_MIN_WIDTH:115,NUM_VISIBLE:3},STRINGS:{ITEM_LOADING_CONTENT:"Loading",NEXT_BUTTON_TEXT:"Next Page",PAGER_PREFIX_TEXT:"Go to page ",PREVIOUS_BUTTON_TEXT:"Previous Page"},addItem:function(y,s){var x=this,u,t,r,z=0,w,v=x.get("numItems");if(!y){return false;}if(p.isString(y)||y.nodeName){t=y.nodeName?y.innerHTML:y;}else{if(p.isObject(y)){t=y.content;}else{return false;}}u=y.className||"";r=y.id?y.id:e.generateId();if(p.isUndefined(s)){x._itemsTable.items.push({item:t,className:u,id:r});w=x._itemsTable.items.length-1;}else{if(s<0||s>v){return false;}if(!x._itemsTable.items[s]){x._itemsTable.items[s]=undefined;z=1;}x._itemsTable.items.splice(s,z,{item:t,className:u,id:r});}x._itemsTable.numItems++;if(v<x._itemsTable.items.length){x.set("numItems",x._itemsTable.items.length);}x.fireEvent(S,{pos:s,ev:S,newPos:w});return true;},addItems:function(r){var s,u,t=true;if(!p.isArray(r)){return false;}for(s=0,u=r.length;s<u;s++){if(this.addItem(r[s][0],r[s][1])===false){t=false;}}return t;},blur:function(){this._carouselEl.blur();this.fireEvent(B);},clearItems:function(){var r=this,s=r.get("numItems");while(s>0){if(!r.removeItem(0)){}if(r._itemsTable.numItems===0){r.set("numItems",0);break;}s--;}r.fireEvent(g);},focus:function(){var AA=this,v,w,x,u,z,AB,s,t,r;if(!AA._hasRendered){return;}if(AA.isAnimating()){return;}r=AA.get("selectedItem");AB=AA.get("numVisible");s=AA.get("selectOnScroll");t=(r>=0)?AA.getItem(r):null;v=AA.get("firstVisible");z=v+AB-1;x=(r<v||r>z);w=(t&&t.id)?e.get(t.id):null;u=AA._itemsTable;if(!s&&x){w=(u&&u.items&&u.items[v])?e.get(u.items[v].id):null;}if(w){try{w.focus();}catch(y){}}AA.fireEvent(X);},hide:function(){var r=this;if(r.fireEvent(b)!==false){r.removeClass(r.CLASSES.VISIBLE);r.fireEvent(a);}},init:function(u,s){var v=this,r=u,w=false,t;if(!u){return;}v._hasRendered=false;v._navBtns={prev:[],next:[]};v._pages={el:null,num:0,cur:0};v._pagination={};v._itemAttrCache={};v._itemsTable={loading:{},numItems:0,items:[],size:0};if(p.isString(u)){u=e.get(u);}else{if(!u.nodeName){return;}}U.superclass.init.call(v,u,s);t=v.get("selectedItem");if(t>0){v.set("firstVisible",D.call(v,t));}if(u){if(!u.id){u.setAttribute("id",e.generateId());}w=v._parseCarousel(u);if(!w){v._createCarousel(r);}}else{u=v._createCarousel(r);}r=u.id;v.initEvents();if(w){v._parseCarouselItems();}if(t>0){n.call(v,t,0);}if(!s||typeof s.isVertical=="undefined"){v.set("isVertical",false);}v._parseCarouselNavigation(u);v._navEl=v._setupCarouselNavigation();T[r]={object:v};v._loadItems(Math.min(v.get("firstVisible")+v.get("numVisible"),v.get("numItems"))-1);},initAttributes:function(r){var s=this;r=r||{};U.superclass.initAttributes.call(s,r);s.setAttributeConfig("carouselEl",{validator:p.isString,value:r.carouselEl||"OL"});s.setAttributeConfig("carouselItemEl",{validator:p.isString,value:r.carouselItemEl||"LI"});s.setAttributeConfig("currentPage",{readOnly:true,value:0});s.setAttributeConfig("firstVisible",{method:s._setFirstVisible,validator:s._validateFirstVisible,value:r.firstVisible||s.CONFIG.FIRST_VISIBLE});s.setAttributeConfig("selectOnScroll",{validator:p.isBoolean,value:r.selectOnScroll||true});s.setAttributeConfig("numVisible",{setter:s._numVisibleSetter,method:s._setNumVisible,validator:s._validateNumVisible,value:r.numVisible||s.CONFIG.NUM_VISIBLE});s.setAttributeConfig("numItems",{method:s._setNumItems,validator:s._validateNumItems,value:s._itemsTable.numItems});s.setAttributeConfig("scrollIncrement",{validator:s._validateScrollIncrement,value:r.scrollIncrement||1});s.setAttributeConfig("selectedItem",{setter:s._selectedItemSetter,method:s._setSelectedItem,validator:p.isNumber,value:-1});s.setAttributeConfig("revealAmount",{method:s._setRevealAmount,validator:s._validateRevealAmount,value:r.revealAmount||0});s.setAttributeConfig("isCircular",{validator:p.isBoolean,value:r.isCircular||false});s.setAttributeConfig("isVertical",{method:s._setOrientation,validator:p.isBoolean,value:r.isVertical||false});s.setAttributeConfig("navigation",{method:s._setNavigation,validator:s._validateNavigation,value:r.navigation||{prev:null,next:null,page:null}});s.setAttributeConfig("animation",{validator:s._validateAnimation,value:r.animation||{speed:0,effect:null}});
s.setAttributeConfig("autoPlay",{validator:p.isNumber,value:r.autoPlay||0});s.setAttributeConfig("autoPlayInterval",{validator:p.isNumber,value:r.autoPlayInterval||0});s.setAttributeConfig("numPages",{readOnly:true,getter:s._getNumPages});s.setAttributeConfig("lastVisible",{readOnly:true,getter:s._getLastVisible});},initEvents:function(){var t=this,s=t.CLASSES,r;t.on("keydown",t._keyboardEventHandler);t.on(F,l);t.on(S,A);t.on(o,A);t.on(Q,A);t.on(C,function(){if(t._hasFocus){t.focus();}});t.on(L,A);t.on(g,function(u){t.scrollTo(0);l.call(t);R.call(t);});t.on(h,R,t);t.on(H,function(u){if(t.get("selectedItem")===null||t.get("selectedItem")<=0){t.set("selectedItem",t.get("firstVisible"));}l.call(t,u);R.call(t,u);t._setClipContainerSize();t.show();});t.on("selectedItemChange",function(u){n.call(t,u.newValue,u.prevValue);if(u.newValue>=0){t._updateTabIndex(t.getElementForItem(u.newValue));}t.fireEvent(C,u.newValue);});t.on(K,function(u){l.call(t,u);R.call(t,u);});t.on("firstVisibleChange",function(u){if(!t.get("selectOnScroll")){if(u.newValue>=0){t._updateTabIndex(t.getElementForItem(u.newValue));}}});t.on("click",function(u){if(t.isAutoPlayOn()){t.stopAutoPlay();}t._itemClickHandler(u);t._pagerClickHandler(u);});c.onFocus(t.get("element"),function(u,w){var v=c.getTarget(u);if(v&&v.nodeName.toUpperCase()=="A"&&e.getAncestorByClassName(v,s.NAVIGATION)){if(r){e.removeClass(r,s.PAGE_FOCUS);}r=v.parentNode;e.addClass(r,s.PAGE_FOCUS);}else{if(r){e.removeClass(r,s.PAGE_FOCUS);}}w._hasFocus=true;w._updateNavButtons(c.getTarget(u),true);},t);c.onBlur(t.get("element"),function(u,v){v._hasFocus=false;v._updateNavButtons(c.getTarget(u),false);},t);},isAnimating:function(){return this._isAnimationInProgress;},isAutoPlayOn:function(){return this._isAutoPlayInProgress;},getElementForItem:function(r){var s=this;if(r<0||r>=s.get("numItems")){return null;}if(s._itemsTable.items[r]){return e.get(s._itemsTable.items[r].id);}return null;},getElementForItems:function(){var t=this,s=[],r;for(r=0;r<t._itemsTable.numItems;r++){s.push(t.getElementForItem(r));}return s;},getItem:function(r){var s=this;if(r<0||r>=s.get("numItems")){return null;}if(s._itemsTable.numItems>r){if(!p.isUndefined(s._itemsTable.items[r])){return s._itemsTable.items[r];}}return null;},getItems:function(){return this._itemsTable.items;},getLoadingItems:function(){return this._itemsTable.loading;},getRows:function(){return this._rows;},getCols:function(){return this._cols;},getItemPositionById:function(w){var u=this,v=u.get("numItems"),s=0,r=u._itemsTable.items,t;while(s<v){t=r[s]||{};if(t.id==w){return s;}s++;}return -1;},getVisibleItems:function(){var u=this,s=u.get("firstVisible"),v=s+u.get("numVisible"),t=[];while(s<v){t.push(u.getElementForItem(s));s++;}return t;},removeItem:function(s){var u=this,t,r=u.get("numItems");if(s<0||s>=r){return false;}t=u._itemsTable.items.splice(s,1);if(t&&t.length==1){u._itemsTable.numItems--;u.set("numItems",r-1);u.fireEvent(o,{item:t[0],pos:s,ev:o});return true;}return false;},replaceItem:function(z,u){var y=this,w,v,t,x=y.get("numItems"),s,r=z;if(!z){return false;}if(p.isString(z)||z.nodeName){v=z.nodeName?z.innerHTML:z;}else{if(p.isObject(z)){v=z.content;}else{return false;}}if(p.isUndefined(u)){return false;}else{if(u<0||u>=x){return false;}s=y._itemsTable.items[u];if(!s){s=y._itemsTable.loading[u];y._itemsTable.items[u]=undefined;}y._itemsTable.items.splice(u,1,{item:v,className:z.className||"",id:e.generateId()});r=y._itemsTable.items[u];}y.fireEvent(Q,{newItem:r,oldItem:s,pos:u,ev:Q});return true;},replaceItems:function(r){var s,u,t=true;if(!p.isArray(r)){return false;}for(s=0,u=r.length;s<u;s++){if(this.replaceItem(r[s][0],r[s][1])===false){t=false;}}return t;},render:function(s){var u=this,r=u.CLASSES,t=u._rows;u.addClass(r.CAROUSEL);if(!u._clipEl){u._clipEl=u._createCarouselClip();u._clipEl.appendChild(u._carouselEl);}if(s){u.appendChild(u._clipEl);u.appendTo(s);}else{if(!e.inDocument(u.get("element"))){return false;}u.appendChild(u._clipEl);}if(t){e.addClass(u._clipEl,r.MULTI_ROW);}if(u.get("isVertical")){u.addClass(r.VERTICAL);}else{u.addClass(r.HORIZONTAL);}if(u.get("numItems")<1){return false;}u._refreshUi();return true;},scrollBackward:function(){var r=this;r.scrollTo(r._firstItem-r.get("scrollIncrement"));},scrollForward:function(){var r=this;r.scrollTo(r._firstItem+r.get("scrollIncrement"));},scrollPageBackward:function(){var t=this,u=t.get("isVertical"),s=t._cols,r=t._firstItem-t.get("numVisible");if(r<0){if(s){r=t._firstItem-s;}}if(t.get("selectOnScroll")){t._selectedItem=t._getSelectedItem(r);}t.scrollTo(r);},scrollPageForward:function(){var s=this,r=s._firstItem+s.get("numVisible");if(r>s.get("numItems")){r=0;}if(s.get("selectOnScroll")){s._selectedItem=s._getSelectedItem(r);}s.scrollTo(r);},scrollTo:function(AL,AI){var AH=this,u,AJ,z,AB,AC,AM,AN,AO,AD,AA,v,AF,s,w,t,x,AE,y,AP,AK=AH._itemsTable,AG=AK.items,r=AK.loading;if(p.isUndefined(AL)||AL==AH._firstItem||AH.isAnimating()){return;}AJ=AH.get("animation");z=AH.get("isCircular");AB=AH.get("isVertical");AA=AH._cols;v=AH._rows;AO=AH._firstItem;AF=AH.get("numItems");s=AH.get("numVisible");t=AH.get("currentPage");AP=function(){if(AH.isAutoPlayOn()){AH.stopAutoPlay();}};if(AL<0){if(z){AL=AF+AL;}else{AP.call(AH);return;}}else{if(AF>0&&AL>AF-1){if(AH.get("isCircular")){AL=AF-AL;}else{AP.call(AH);return;}}}if(isNaN(AL)){return;}AN=(AH._firstItem>AL)?"backward":"forward";AE=AO+s;AE=(AE>AF-1)?AF-1:AE;x=AH.fireEvent(i,{dir:AN,first:AO,last:AE});if(x===false){return;}AH.fireEvent(J,{page:t});AD=AL+s-1;AH._loadItems(AD>AF-1?AF-1:AD);AM=0-AL;if(v){if(AB){AM=parseInt(AM/AA,10);}else{AM=parseInt(AM/v,10);}}y=0;while(AM<0&&y<AL+s-1&&y<AF){if(!AG[y]&&!r[y]){AM++;}y+=v?v:1;}AH._firstItem=AL;AH.set("firstVisible",AL);AE=AL+s;AE=(AE>AF-1)?AF-1:AE;w=j.call(AH,AM);u=AJ.speed>0;if(u){AH._animateAndSetCarouselOffset(w,AL,AE,AI);}else{AH._setCarouselOffset(w);E.call(AH,AL,AE);}},getPageForItem:function(r){return Math.ceil((r+1)/parseInt(this.get("numVisible"),10));},getFirstVisibleOnPage:function(r){return(r-1)*this.get("numVisible");
},selectPreviousItem:function(){var t=this,s=0,r=t.get("selectedItem");if(r==this._firstItem){s=r-t.get("numVisible");t._selectedItem=t._getSelectedItem(r-1);t.scrollTo(s);}else{s=t.get("selectedItem")-t.get("scrollIncrement");t.set("selectedItem",t._getSelectedItem(s));}},selectNextItem:function(){var s=this,r=0;r=s.get("selectedItem")+s.get("scrollIncrement");s.set("selectedItem",s._getSelectedItem(r));},show:function(){var s=this,r=s.CLASSES;if(s.fireEvent(Y)!==false){s.addClass(r.VISIBLE);s.fireEvent(V);}},startAutoPlay:function(){var r=this,s;if(p.isUndefined(r._autoPlayTimer)){s=r.get("autoPlayInterval");if(s<=0){return;}r._isAutoPlayInProgress=true;r.fireEvent(Z);r._autoPlayTimer=setTimeout(function(){r._autoScroll();},s);}},stopAutoPlay:function(){var r=this;if(!p.isUndefined(r._autoPlayTimer)){clearTimeout(r._autoPlayTimer);delete r._autoPlayTimer;r._isAutoPlayInProgress=false;r.fireEvent(q);}},updatePagination:function(){var z=this,x=z._pagination;if(!x.el){return false;}var w=z.get("numItems"),AA=z.get("numVisible"),u=z.get("firstVisible")+1,v=z.get("currentPage")+1,r=z.get("numPages"),t={"numVisible":AA,"numPages":r,"numItems":w,"selectedItem":z.get("selectedItem")+1,"currentPage":v,"firstVisible":u,"lastVisible":z.get("lastVisible")+1},s=x.callback||{},y=s.scope&&s.obj?s.obj:z;x.el.innerHTML=p.isFunction(s.fn)?s.fn.apply(y,[x.template,t]):YAHOO.lang.substitute(x.template,t);},registerPagination:function(s,u,r){var t=this;t._pagination.template=s;t._pagination.callback=r||{};if(!t._pagination.el){t._pagination.el=W("DIV",{className:t.CLASSES.PAGINATION});if(u=="before"){t._navEl.insertBefore(t._pagination.el,t._navEl.firstChild);}else{t._navEl.appendChild(t._pagination.el);}t.on("itemSelected",t.updatePagination);t.on("pageChange",t.updatePagination);}t.updatePagination();},toString:function(){return P+(this.get?" (#"+this.get("id")+")":"");},_animateAndSetCarouselOffset:function(w,u,s){var v=this,t=v.get("animation"),r=null;if(v.get("isVertical")){r=new YAHOO.util.Motion(v._carouselEl,{top:{to:w}},t.speed,t.effect);}else{r=new YAHOO.util.Motion(v._carouselEl,{left:{to:w}},t.speed,t.effect);}v._isAnimationInProgress=true;r.onComplete.subscribe(v._animationCompleteHandler,{scope:v,item:u,last:s});r.animate();},_animationCompleteHandler:function(r,s,t){t.scope._isAnimationInProgress=false;E.call(t.scope,t.item,t.last);},_autoScroll:function(){var s=this,t=s._firstItem,r;if(t>=s.get("numItems")-1){if(s.get("isCircular")){r=0;}else{s.stopAutoPlay();}}else{r=t+s.get("numVisible");}s._selectedItem=s._getSelectedItem(r);s.scrollTo.call(s,r);},_createCarousel:function(s){var u=this,r=u.CLASSES,t=e.get(s);if(!t){t=W("DIV",{className:r.CAROUSEL,id:s});}if(!u._carouselEl){u._carouselEl=W(u.get("carouselEl"),{className:r.CAROUSEL_EL});}return t;},_createCarouselClip:function(){return W("DIV",{className:this.CLASSES.CONTENT});},_createCarouselItem:function(u){var r,t=this,s=m.call(t,u.pos);return W(t.get("carouselItemEl"),{className:u.className,styles:u.styles,content:u.content,id:u.id});},_getValidIndex:function(t){var w=this,r=w.get("isCircular"),u=w.get("numItems"),v=w.get("numVisible"),s=u-1;if(t<0){t=r?Math.ceil(u/v)*v+t:0;}else{if(t>s){t=r?0:s;}}return t;},_getSelectedItem:function(v){var u=this,r=u.get("isCircular"),t=u.get("numItems"),s=t-1;if(v<0){if(r){v=t+v;}else{v=u.get("selectedItem");}}else{if(v>s){if(r){v=v-t;}else{v=u.get("selectedItem");}}}return v;},_itemClickHandler:function(v){var y=this,w=y.get("carouselItemEl"),s=y.get("element"),t,u,x=c.getTarget(v),r=x.tagName.toUpperCase();if(r==="INPUT"||r==="SELECT"||r==="TEXTAREA"){return;}while(x&&x!=s&&x.id!=y._carouselEl){t=x.nodeName;if(t.toUpperCase()==w){break;}x=x.parentNode;}if((u=y.getItemPositionById(x.id))>=0){y.set("selectedItem",y._getSelectedItem(u));y.focus();}},_keyboardEventHandler:function(t){var v=this,s=c.getCharCode(t),u=c.getTarget(t),r=false;if(v.isAnimating()||u.tagName.toUpperCase()==="SELECT"){return;}switch(s){case 37:case 38:v.selectPreviousItem();r=true;break;case 39:case 40:v.selectNextItem();r=true;break;case 33:v.scrollPageBackward();r=true;break;case 34:v.scrollPageForward();r=true;break;}if(r){if(v.isAutoPlayOn()){v.stopAutoPlay();}c.preventDefault(t);}},_loadItems:function(t){var w=this,s=w.get("numItems"),u=w.get("numVisible"),v=w.get("revealAmount"),x=w._itemsTable.items.length,r=w.get("lastVisible");if(x>t&&t+1>=u){x=t%u||t==r?t-t%u:t-u+1;}if(v&&t<s-1){t++;}if(t>=x&&(!w.getItem(x)||!w.getItem(t))){w.fireEvent(L,{ev:L,first:x,last:t,num:t-x+1});}},_pagerChangeHandler:function(s){var v=this,u=c.getTarget(s),t=u.value,r;if(t){r=v.getFirstVisibleOnPage(t);v._selectedItem=r;v.scrollTo(r);v.focus();}},_pagerClickHandler:function(x){var z=this,t=z.CLASSES,u=c.getTarget(x),s=u.nodeName.toUpperCase(),r,w,v,y;if(e.hasClass(u,t.PAGER_ITEM)||e.hasClass(u.parentNode,t.PAGER_ITEM)){if(s=="EM"){u=u.parentNode;}r=u.href;w=r.lastIndexOf("#");v=parseInt(r.substring(w+1),10);if(v!=-1){y=z.getFirstVisibleOnPage(v);z._selectedItem=y;z.scrollTo(y);z.focus();}c.preventDefault(x);}},_parseCarousel:function(t){var w=this,x,r,s,v,u;r=w.CLASSES;s=w.get("carouselEl");v=false;for(x=t.firstChild;x;x=x.nextSibling){if(x.nodeType==1){u=x.nodeName;if(u.toUpperCase()==s){w._carouselEl=x;e.addClass(w._carouselEl,w.CLASSES.CAROUSEL_EL);v=true;}}}return v;},_parseCarouselItems:function(){var y=this,AA=y.CLASSES,v=0,z,r,t,u,s,w=y.get("firstVisible"),x=y._carouselEl;z=y._rows;t=y.get("carouselItemEl");for(r=x.firstChild;r;r=r.nextSibling){if(r.nodeType==1){s=r.nodeName;if(s.toUpperCase()==t){if(r.id){u=r.id;}else{u=e.generateId();r.setAttribute("id",u);}y.addItem(r,w);w++;}}}},_parseCarouselNavigation:function(x){var y=this,w,z=y.CLASSES,s,v,u,r,t=false;r=e.getElementsByClassName(z.PREV_PAGE,"*",x);if(r.length>0){for(v in r){if(r.hasOwnProperty(v)){s=r[v];if(s.nodeName=="INPUT"||s.nodeName=="BUTTON"||s.nodeName=="A"){y._navBtns.prev.push(s);}else{u=s.getElementsByTagName("INPUT");if(p.isArray(u)&&u.length>0){y._navBtns.prev.push(u[0]);
}else{u=s.getElementsByTagName("BUTTON");if(p.isArray(u)&&u.length>0){y._navBtns.prev.push(u[0]);}}}}}w={prev:r};}r=e.getElementsByClassName(z.NEXT_PAGE,"*",x);if(r.length>0){for(v in r){if(r.hasOwnProperty(v)){s=r[v];if(s.nodeName=="INPUT"||s.nodeName=="BUTTON"||s.nodeName=="A"){y._navBtns.next.push(s);}else{u=s.getElementsByTagName("INPUT");if(p.isArray(u)&&u.length>0){y._navBtns.next.push(u[0]);}else{u=s.getElementsByTagName("BUTTON");if(p.isArray(u)&&u.length>0){y._navBtns.next.push(u[0]);}}}}}if(w){w.next=r;}else{w={next:r};}}if(w){y.set("navigation",w);t=true;}return t;},_refreshUi:function(){var v=this,s,w=v.get("isVertical"),y=v.get("firstVisible"),t,x,r,u;if(v._itemsTable.numItems<1){return;}u=O.call(v,w?"height":"width");t=v._itemsTable.items[y].id;u=w?d(t,"width"):d(t,"height");e.setStyle(v._carouselEl,w?"width":"height",u+"px");v._hasRendered=true;v.fireEvent(H);},_setCarouselOffset:function(t){var r=this,s;s=r.get("isVertical")?"top":"left";e.setStyle(r._carouselEl,s,t+"px");},_setupCarouselNavigation:function(){var w=this,u,s,r,y,v,x,t;r=w.CLASSES;v=e.getElementsByClassName(r.NAVIGATION,"DIV",w.get("element"));if(v.length===0){v=W("DIV",{className:r.NAVIGATION});w.insertBefore(v,e.getFirstChild(w.get("element")));}else{v=v[0];}w._pages.el=W("UL");v.appendChild(w._pages.el);y=w.get("navigation");if(p.isString(y.prev)||p.isArray(y.prev)){if(p.isString(y.prev)){y.prev=[y.prev];}for(u in y.prev){if(y.prev.hasOwnProperty(u)){w._navBtns.prev.push(e.get(y.prev[u]));}}}else{t=W("SPAN",{className:r.BUTTON+r.FIRST_NAV});e.setStyle(t,"visibility","visible");u=e.generateId();t.innerHTML='<button type="button" '+'id="'+u+'" name="'+w.STRINGS.PREVIOUS_BUTTON_TEXT+'">'+w.STRINGS.PREVIOUS_BUTTON_TEXT+"</button>";v.appendChild(t);u=e.get(u);w._navBtns.prev=[u];s={prev:[t]};}if(p.isString(y.next)||p.isArray(y.next)){if(p.isString(y.next)){y.next=[y.next];}for(u in y.next){if(y.next.hasOwnProperty(u)){w._navBtns.next.push(e.get(y.next[u]));}}}else{x=W("SPAN",{className:r.BUTTON+r.NEXT_NAV});e.setStyle(x,"visibility","visible");u=e.generateId();x.innerHTML='<button type="button" '+'id="'+u+'" name="'+w.STRINGS.NEXT_BUTTON_TEXT+'">'+w.STRINGS.NEXT_BUTTON_TEXT+"</button>";v.appendChild(x);u=e.get(u);w._navBtns.next=[u];if(s){s.next=[x];}else{s={next:[x]};}}if(s){w.set("navigation",s);}return v;},_setClipContainerSize:function(r,t){var z=this,x=z.get("isVertical"),AB=z._rows,v=z._cols,y=z.get("revealAmount"),s=O.call(z,"height"),u=O.call(z,"width"),AA,w;r=r||z._clipEl;if(AB){AA=s*AB;w=u*v;}else{t=t||z.get("numVisible");if(x){AA=s*t;}else{w=u*t;}}z._recomputeSize=(AA===0);if(z._recomputeSize){z._hasRendered=false;return;}y=N.call(z);if(x){AA+=(y*2);}else{w+=(y*2);}if(x){AA+=M(z._carouselEl,"height");e.setStyle(r,"height",AA+"px");if(v){w+=M(z._carouselEl,"width");e.setStyle(r,"width",w+(0)+"px");}}else{w+=M(z._carouselEl,"width");e.setStyle(r,"width",w+"px");if(AB){AA+=M(z._carouselEl,"height");e.setStyle(r,"height",AA+"px");}}z._setContainerSize(r);},_setContainerSize:function(s,t){var w=this,r=w.CONFIG,z=w.CLASSES,v,y,u,x;v=w.get("isVertical");y=w._rows;u=w._cols;s=s||w._clipEl;t=t||(v?"height":"width");x=parseFloat(e.getStyle(s,t),10);x=p.isNumber(x)?x:0;if(v){x+=M(w._carouselEl,"height")+d(w._navEl,"height");}else{x+=M(w._carouselEl,"width");}if(!v){if(x<r.HORZ_MIN_WIDTH){x=r.HORZ_MIN_WIDTH;w.addClass(z.MIN_WIDTH);}}w.setStyle(t,x+"px");if(v){x=O.call(w,"width");if(u){x=x*u;}e.setStyle(w._carouselEl,"width",x+"px");if(x<r.VERT_MIN_WIDTH){x=r.VERT_MIN_WIDTH;w.addClass(z.MIN_WIDTH);}w.setStyle("width",x+"px");}else{if(y){x=O.call(w,"height");x=x*y;e.setStyle(w._carouselEl,"height",x+"px");}}},_setFirstVisible:function(s){var r=this;if(s>=0&&s<r.get("numItems")){r.scrollTo(s);}else{s=r.get("firstVisible");}return s;},_setNavigation:function(r){var s=this;if(r.prev){c.on(r.prev,"click",f,s);}if(r.next){c.on(r.next,"click",k,s);}},_setNumVisible:function(s){var r=this;r._setClipContainerSize(r._clipEl,s);},_numVisibleSetter:function(t){var s=this,r=t;if(p.isArray(t)){s._cols=t[0];s._rows=t[1];r=t[0]*t[1];}return r;},_selectedItemSetter:function(s){var r=this;return(s<r.get("numItems"))?s:0;},_setNumItems:function(t){var s=this,r=s._itemsTable.numItems;if(p.isArray(s._itemsTable.items)){if(s._itemsTable.items.length!=r){r=s._itemsTable.items.length;s._itemsTable.numItems=r;}}if(t<r){while(r>t){s.removeItem(r-1);r--;}}return t;},_setOrientation:function(t){var s=this,r=s.CLASSES;if(t){s.replaceClass(r.HORIZONTAL,r.VERTICAL);}else{s.replaceClass(r.VERTICAL,r.HORIZONTAL);}this._itemAttrCache={};return t;},_setRevealAmount:function(s){var r=this;if(s>=0&&s<=100){s=parseInt(s,10);s=p.isNumber(s)?s:0;r._setClipContainerSize();}else{s=r.get("revealAmount");}return s;},_setSelectedItem:function(r){this._selectedItem=r;},_getNumPages:function(){return Math.ceil(parseInt(this.get("numItems"),10)/parseInt(this.get("numVisible"),10));},_getLastVisible:function(){var r=this;return r.get("currentPage")+1==r.get("numPages")?r.get("numItems")-1:r.get("firstVisible")+r.get("numVisible")-1;},_syncUiForItemAdd:function(u){var v,AA=this,x=AA._carouselEl,r,AB,t=AA._itemsTable,s,w,y,z;w=p.isUndefined(u.pos)?u.newPos||t.numItems-1:u.pos;if(!s){AB=t.items[w]||{};r=AA._createCarouselItem({className:AB.className,styles:AB.styles,content:AB.item,id:AB.id,pos:w});if(p.isUndefined(u.pos)){if(!p.isUndefined(t.loading[w])){s=t.loading[w];}if(s){x.replaceChild(r,s);delete t.loading[w];}else{x.appendChild(r);}}else{if(!p.isUndefined(t.items[u.pos+1])){y=e.get(t.items[u.pos+1].id);}if(y){x.insertBefore(r,y);}else{}}}else{if(p.isUndefined(u.pos)){if(!e.isAncestor(AA._carouselEl,s)){x.appendChild(s);}}else{if(!e.isAncestor(x,s)){if(!p.isUndefined(t.items[u.pos+1])){x.insertBefore(s,e.get(t.items[u.pos+1].id));}}}}if(!AA._hasRendered){AA._refreshUi();}if(AA.get("selectedItem")<0){AA.set("selectedItem",AA.get("firstVisible"));}AA._syncUiItems();},_syncUiForItemReplace:function(x){var w=this,t=w._carouselEl,r=w._itemsTable,y=x.pos,v=x.newItem,s=x.oldItem,u;
u=w._createCarouselItem({className:v.className,styles:v.styles,content:v.item,id:v.id,pos:y});if(u&&s){c.purgeElement(s,true);t.replaceChild(u,e.get(s.id));if(!p.isUndefined(r.loading[y])){r.numItems++;delete r.loading[y];}}if(!w._hasRendered){w._refreshUi();}w._syncUiItems();},_syncUiForItemRemove:function(w){var v=this,r=v._carouselEl,t,u,s,x;s=v.get("numItems");u=w.item;x=w.pos;if(u&&(t=e.get(u.id))){if(t&&e.isAncestor(r,t)){c.purgeElement(t,true);r.removeChild(t);}if(v.get("selectedItem")==x){x=x>=s?s-1:x;}}else{}v._syncUiItems();},_syncUiForLazyLoading:function(v){var z=this,x=z._carouselEl,t=z._itemsTable,w=t.items.length,y=t.items[v.last+1],r,s;if(!y&&v.last<w){s=v.first;do{y=t.items[s];s++;}while(s<w&&!y);}for(var u=v.first;u<=v.last;u++){if(p.isUndefined(t.loading[u])&&p.isUndefined(t.items[u])){r=z._createCarouselItem({className:z.CLASSES.ITEM_LOADING,content:z.STRINGS.ITEM_LOADING_CONTENT,id:e.generateId(),pos:u});if(r){if(y){y=e.get(y.id);if(y){x.insertBefore(r,y);}else{}}else{x.appendChild(r);}}t.loading[u]=r;}}z._syncUiItems();},_syncUiItems:function(){var u,y=this,w=y.get("numItems"),t,s=y._itemsTable,v=s.items,r=s.loading,z,x;for(t=0;t<w;t++){z=v[t]||r[t];if(z&&z.id){x=m.call(y,t);z.styles=z.styles||{};for(u in x){if(x.hasOwnProperty(u)){z.styles[u]=x[u];}}G(e.get(z.id),x);}}},_updateNavButtons:function(v,s){var t,r=this.CLASSES,w,u=v.parentNode;if(!u){return;}w=u.parentNode;if(v.nodeName.toUpperCase()=="BUTTON"&&e.hasClass(u,r.BUTTON)){if(s){if(w){t=e.getChildren(w);if(t){e.removeClass(t,r.FOCUSSED_BUTTON);}}e.addClass(u,r.FOCUSSED_BUTTON);}else{e.removeClass(u,r.FOCUSSED_BUTTON);}}},_updatePagerButtons:function(){var z=this,x=z.CLASSES,y=z._pages.cur,r,w,u,AA,s=z.get("numVisible"),v=z._pages.num,t=z._pages.el;if(v===0||!t){return;}e.setStyle(t,"visibility","hidden");while(t.firstChild){t.removeChild(t.firstChild);}for(u=0;u<v;u++){r=document.createElement("LI");if(u===0){e.addClass(r,x.FIRST_PAGE);}if(u==y){e.addClass(r,x.SELECTED_NAV);}w="<a class="+x.PAGER_ITEM+' href="#'+(u+1)+'" tabindex="0"><em>'+z.STRINGS.PAGER_PREFIX_TEXT+" "+(u+1)+"</em></a>";r.innerHTML=w;t.appendChild(r);}e.setStyle(t,"visibility","visible");},_updatePagerMenu:function(){var z=this,x=z.CLASSES,y=z._pages.cur,s,v,AA,t=z.get("numVisible"),w=z._pages.num,u=z._pages.el,r;if(w===0){return;}r=document.createElement("SELECT");if(!r){return;}e.setStyle(u,"visibility","hidden");while(u.firstChild){u.removeChild(u.firstChild);}for(v=0;v<w;v++){s=document.createElement("OPTION");s.value=v+1;s.innerHTML=z.STRINGS.PAGER_PREFIX_TEXT+" "+(v+1);if(v==y){s.setAttribute("selected","selected");}r.appendChild(s);}s=document.createElement("FORM");if(!s){}else{s.appendChild(r);u.appendChild(s);}c.addListener(r,"change",z._pagerChangeHandler,this,true);e.setStyle(u,"visibility","visible");},_updateTabIndex:function(r){var s=this;if(r){if(s._focusableItemEl){s._focusableItemEl.tabIndex=-1;}s._focusableItemEl=r;r.tabIndex=0;}},_validateAnimation:function(r){var s=true;if(p.isObject(r)){if(r.speed){s=s&&p.isNumber(r.speed);}if(r.effect){s=s&&p.isFunction(r.effect);}else{if(!p.isUndefined(YAHOO.util.Easing)){r.effect=YAHOO.util.Easing.easeOut;}}}else{s=false;}return s;},_validateFirstVisible:function(t){var s=this,r=s.get("numItems");if(p.isNumber(t)){if(r===0&&t==r){return true;}else{return(t>=0&&t<r);}}return false;},_validateNavigation:function(r){var s;if(!p.isObject(r)){return false;}if(r.prev){if(!p.isArray(r.prev)){return false;}for(s in r.prev){if(r.prev.hasOwnProperty(s)){if(!p.isString(r.prev[s].nodeName)){return false;}}}}if(r.next){if(!p.isArray(r.next)){return false;}for(s in r.next){if(r.next.hasOwnProperty(s)){if(!p.isString(r.next[s].nodeName)){return false;}}}}return true;},_validateNumItems:function(r){return p.isNumber(r)&&(r>=0);},_validateNumVisible:function(r){var s=false;if(p.isNumber(r)){s=r>0&&r<=this.get("numItems");}else{if(p.isArray(r)){if(p.isNumber(r[0])&&p.isNumber(r[1])){s=r[0]*r[1]>0&&r.length==2;}}}return s;},_validateRevealAmount:function(r){var s=false;if(p.isNumber(r)){s=r>=0&&r<100;}return s;},_validateScrollIncrement:function(r){var s=false;if(p.isNumber(r)){s=(r>0&&r<this.get("numItems"));}return s;}});})();YAHOO.register("carousel",YAHOO.widget.Carousel,{version:"2.8.2r1",build:"8"});