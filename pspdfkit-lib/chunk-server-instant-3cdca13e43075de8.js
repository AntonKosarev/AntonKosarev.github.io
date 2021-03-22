/*!
 * PSPDFKit for Web 2021.2.0 (https://pspdfkit.com/web)
 * 
 * Copyright (c) 2016-2019 PSPDFKit GmbH. All rights reserved.
 * 
 * THIS SOURCE CODE AND ANY ACCOMPANYING DOCUMENTATION ARE PROTECTED BY INTERNATIONAL COPYRIGHT LAW
 * AND MAY NOT BE RESOLD OR REDISTRIBUTED. USAGE IS BOUND TO THE PSPDFKIT LICENSE AGREEMENT.
 * UNAUTHORIZED REPRODUCTION OR DISTRIBUTION IS SUBJECT TO CIVIL AND CRIMINAL PENALTIES.
 * This notice may not be removed from this file.
 * 
 * PSPDFKit uses several open source third-party components: https://pspdfkit.com/acknowledgements/web/
 */
(window.__PSPDFKitChunk=window.__PSPDFKitChunk||[]).push([[60],{951:function(e,t,n){"use strict";n.r(t),n.d(t,"InstantProvider",(function(){return he}));var i=n(8),s=n.n(i),o=n(17),a=n.n(o),r=n(91),c=n.n(r),l=n(7),u=n.n(l),d=n(13),h=n.n(d),f=n(1),p=n.n(f),m=n(57),b=n(156),v=n(282),k=n(3),y=n(6),_=n(9),g=n.n(_),C=n(10),O=n.n(C),j=n(4),F=n.n(j);function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=F()(e);if(t){var s=F()(this).constructor;n=Reflect.construct(i,arguments,s)}else n=i.apply(this,arguments);return O()(this,n)}}var I=function(e){g()(n,e);var t=w(n);function n(){return u()(this,n),t.apply(this,arguments)}return n}(Object(y.e)({clientId:"",userId:null,presenceContent:{}}));function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=F()(e);if(t){var s=F()(this).constructor;n=Reflect.construct(i,arguments,s)}else n=i.apply(this,arguments);return O()(this,n)}}var x=function(e){g()(n,e);var t=R(n);function n(){return u()(this,n),t.apply(this,arguments)}return n}(Object(y.e)({status:"offline",currentClient:null,clients:Object(y.b)()})),S=n(24),P=n.n(S),A=n(93),q=n.n(A),E=n(179),T=n(110),U=function(){function e(t,n){u()(this,e),this.callback=t,this.timerCalc=n,this.timer=null,this.tries=0}return h()(e,[{key:"reset",value:function(){this.tries=0,this.timer&&clearTimeout(this.timer)}},{key:"scheduleTimeout",value:function(){var e=this;this.timer&&clearTimeout(this.timer),this.timer=setTimeout((function(){e.tries=e.tries+1,e.callback()}),this.timerCalc(this.tries+1))}}]),e}(),V="0.0.1",D=0,B=1,z=2,H={name:"PSPDFKit-Web"},W=function(e){return[1e3,2e3][e-1]||5e3},L=function(){function e(t,n){var i=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=s.reconnectTimerCalc,a=void 0===o?W:o,r=s.enableReconnect,c=void 0===r||r,l=s.events,d=void 0===l?[]:l;u()(this,e),this.eventEmitter=new T.a(["connect","disconnect","error"].concat(d)),this.serverURL=t,this.authPayload=n,this.socket=null,this.lastRequestId=0,this.requestsWaitingForAnswers=Object(y.b)(),c&&(this.reconnectTimer=new U((function(){i.socket&&(i.socket.close(),i.socket=null),i.connect()}),a)),this.clearAuthenticationInformation()}return h()(e,[{key:"registerEvents",value:function(e){var t;(t=this.eventEmitter.events).push.apply(t,q()(e))}},{key:"connect",value:function(){var e=this;if(!this.socket){var t=new WebSocket(this.serverURL);t.onopen=this.onOpen.bind(this),t.onmessage=this.onMessage.bind(this),t.onerror=function(){e.socket=null,e.eventEmitter.emit("error","Failed to create the WebSocket connection to ".concat(e.serverURL,". ")+"Please check your firewall or proxy settings.")},this.socket=t}}},{key:"disconnect",value:function(){this.socket&&(this.socket.onclose=function(){},this.socket.close(),this.clearAuthenticationInformation(),this.abortOpenRequests(),this.eventEmitter.emit("disconnect"))}},{key:"sendRequest",value:function(e,t){var n=this;return new Promise((function(i,s){if(n.isAuthenticated&&n.socket){var o=n.nextRequestId(),a=JSON.stringify(t);n.requestsWaitingForAnswers=n.requestsWaitingForAnswers.set(o,{resolve:i,reject:s}),n.socket.send("".concat(o,":").concat(e,":").concat(a))}else s(new k.a("Cannot send request when the connection is not authenticated"))}))}},{key:"on",value:function(e,t){this.eventEmitter.on(e,t)}},{key:"off",value:function(e,t){this.eventEmitter.off(e,t)}},{key:"onOpen",value:function(){var e=this.socket;e&&(e.onerror=this.onError.bind(this),e.onclose=this.onClose.bind(this))}},{key:"onMessage",value:function(e){var t=e.data;if(this.isAuthenticated){var n=this.parseFrame(t);if(n.requestId){var i=n.requestId;Object(k.i)(this.requestsWaitingForAnswers.has(i),"Received a reply with an unknown request ID.");var s=this.requestsWaitingForAnswers.get(i);switch(Object(k.i)(s),n.action){case"ok":s.resolve(n.payload);break;case"error":s.reject(new k.a(n.payload.reason||"Unknown error"));break;default:Object(k.i)(!1,"".concat(n.action," is not a valid request reply"))}this.requestsWaitingForAnswers=this.requestsWaitingForAnswers.delete(i)}else this.eventEmitter.events.includes(n.action)&&this.eventEmitter.emit(n.action,n.payload),this.log("incoming info message",n)}else{var o=this.parseUnauthenticatedFrame(t);switch(o.action){case"hello":this.onHello(o.payload);break;case"authenticated":this.onAuthenticated(o.payload);break;case"error":this.eventEmitter.emit("error",o.payload.reason||"Unknown error")}}}},{key:"onClose",value:function(e){this.clearAuthenticationInformation(),this.abortOpenRequests(),this.reconnectTimer&&this.reconnectTimer.scheduleTimeout(),this.eventEmitter.emit("disconnect"),this.log("close",e)}},{key:"onError",value:function(e){this.reconnectTimer&&this.reconnectTimer.scheduleTimeout(),this.log("error",e)}},{key:"nextRequestId",value:function(){var e=this.lastRequestId+1;return this.lastRequestId=e,e}},{key:"onHello",value:function(e){var t=this.socket;if(2===e.protocol_version){var n={protocol_version:2,client_version:V,client_info:H,auth_payload:this.authPayload};t.send("hello_web:".concat(JSON.stringify(n)))}else t.send("handshake_failed:".concat(JSON.stringify({reason:"protocol_mismatch",protocol_version:2,client_version:V,client_info:H}))),this.eventEmitter.emit("error","protocol_mismatch")}},{key:"onAuthenticated",value:function(e){Object(k.i)(e.client_id,"`authenticated` message has no `client_id`"),this.clientId=e.client_id,this.userId=e.user_id||null,this.eventEmitter.emit("connect",{clientId:this.clientId,userId:this.userId})}},{key:"log",value:function(){if("development"===Object(E.b)()){for(var e,t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];(e=console).log.apply(e,["SYNCConnection"].concat(n))}}},{key:"parseFrame",value:function(e){var t=/^(\d+|info):([a-zA-Z-_]+):(.+)$/.exec(e.toString()),n=P()(t,4),i=n[1],s=n[2],o=n[3],a=null;return"info"!==i&&(a=parseInt(i)),{requestId:a,action:s,payload:JSON.parse(o)}}},{key:"parseUnauthenticatedFrame",value:function(e){var t=/^(hello|authenticated|error):(.+)$/.exec(e.toString()),n=P()(t,3),i=n[1],s=n[2];return{action:i,payload:JSON.parse(s)}}},{key:"abortOpenRequests",value:function(){this.requestsWaitingForAnswers.forEach((function(e){e.reject(new k.a("request aborted"))})),this.requestsWaitingForAnswers=Object(y.b)()}},{key:"clearAuthenticationInformation",value:function(){this.clientId="",this.userId=null}},{key:"connectionState",get:function(){switch(this.socket&&this.socket.readyState){case D:return"connecting";case B:return"open";case z:return"closing";default:return"closed"}}},{key:"isAuthenticated",get:function(){return""!==this.clientId}}]),e}(),M=n(35),K=n.n(M);function N(e){return Object(k.i)("string"==typeof e.client_id,"The client payload must have a `client_id`"),Object(k.i)("object"===K()(e.presence),"The client payload must have a `presence`"),new I({clientId:e.client_id,userId:e.user_id,presenceContent:e.presence})}function J(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return $(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,s=function(){};return{s:s,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,r=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return a=e.done,e},e:function(e){r=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(r)throw o}}}}function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var G=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new x,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:L;u()(this,e),this.state=t,this.connectionClass=n}return h()(e,[{key:"load",value:function(e,t,n){var i=this;return new Promise((function(s,o){i.setState=function(e){i.state=e},i.connection=new i.connectionClass(e,t,{events:["client_presence"]}),i.connection.on("connect",(function(e){var t=new I({clientId:e.clientId,userId:e.userId,presenceContent:n});i.setState(i.state.set("status","online").set("currentClient",t)),i.populateClients(n).then((function(){s(i)})).catch(o)})),i.connection.on("error",(function(e){o(new k.a(e.toString()))})),i.connection.on("client_presence",(function(e){return i.onInfoClientPresence(e)})),i.connection.connect()}))}},{key:"populateClients",value:function(e){var t=this;return new Promise((function(n,i){t.connection.sendRequest("enter_layer",{presence:e}).then((function(e){t.setState(function(e,t){return Object(k.i)(t.clients,"The payload must have a `clients` list"),e.withMutations((function(n){var i=Object(y.b)(t.clients.map((function(e){return N(e)})).map((function(e){return[e.clientId,e]}))).set(e.currentClient.clientId,e.currentClient);n.set("clients",i)}))}(t.state,e)),n()})).catch(i)}))}},{key:"onInfoClientPresence",value:function(e){if(this.setState(function(e,t){Object(k.i)("object"==K()(t.clients),"The payload must have `clients`");var n=e.clients.withMutations((function(n){if(t.clients.entered){var i,s=J(t.clients.entered);try{for(s.s();!(i=s.n()).done;){var o=i.value;if(e.clients.has(o.client_id))throw new k.a("The client marked as entered is already known");var a=N(o);n.set(a.clientId,a)}}catch(e){s.e(e)}finally{s.f()}}if(t.clients.updated){var r,c=J(t.clients.updated);try{for(c.s();!(r=c.n()).done;){var l=r.value;Object(k.i)("string"==typeof l.client_id,"The client payload must have a `client_id`"),Object(k.i)("object"===K()(l.presence),"The client payload must have a `presence`");var u=e.clients.get(l.client_id);if(!u)throw new k.a("The client marked as updated is not known");n.set(u.clientId,u.set("presenceContent",l.presence))}}catch(e){c.e(e)}finally{c.f()}}if(t.clients.left){var d,h=J(t.clients.left);try{for(h.s();!(d=h.n()).done;){var f=d.value;if(!e.clients.has(f))throw new k.a("The client marked as left is not known");n.delete(f)}}catch(e){h.e(e)}finally{h.f()}}}));return e.set("clients",n)}(this.state,e)),this.shouldFireClientUpdatesCallback){var t=Object(y.b)();if(e.clients.entered){var n=e.clients.entered.map((function(e){return e.client_id}));t=this.state.clients.filter((function(e){return-1!==n.indexOf(e.clientId)})).toMap()}var i=Object(y.b)();if(e.clients.updated){var s=e.clients.updated.map((function(e){return e.client_id}));i=this.state.clients.filter((function(e){return-1!==s.indexOf(e.clientId)})).toMap()}var o=Object(y.a)();e.clients.updated&&(o=Object(y.a)(e.clients.left)),this.clientUpdatesCallback(t,i,o)}}},{key:"disconnect",value:function(){"offline"!==this.getStatus()&&(this.setState(this.state.set("status","offline")),this.connection.disconnect())}},{key:"getStatus",value:function(){return this.state.status}},{key:"getCurrentClient",value:function(){return this.state.currentClient}},{key:"getClients",value:function(){return this.shouldFireClientUpdatesCallback=!0,this.state.clients}},{key:"updatePresence",value:function(e){var t=this;return new Promise((function(n,i){if("online"!==t.getStatus())return i(new k.a("ClientsPresence is not connected"));t.connection.sendRequest("update_client_presence",{presence:e}).then((function(){t.setState(function(e,t){return e.setIn(["currentClient","presenceContent"],t).setIn(["clients",e.currentClient.clientId,"presenceContent"],t)}(t.state,e)),n(!0)}),(function(){i(new k.a("Unable to update presence"))}))}))}},{key:"onClientUpdates",value:function(e){if("function"!=typeof e)throw new TypeError("callback must be a function");this.clientUpdatesCallback=e}}]),e}(),Y=n(446);function Z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=F()(e);if(t){var s=F()(this).constructor;n=Reflect.construct(i,arguments,s)}else n=i.apply(this,arguments);return O()(this,n)}}var Q=function(e){g()(n,e);var t=Z(n);function n(){return u()(this,n),t.apply(this,arguments)}return n}(Object(y.e)({content:null,attachments:null,id:null,type:null,group:void 0,resolve:function(){},reject:function(){}})),X=n(392);function ee(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=F()(e);if(t){var s=F()(this).constructor;n=Reflect.construct(i,arguments,s)}else n=i.apply(this,arguments);return O()(this,n)}}var te=function(e){g()(n,e);var t=ee(n);function n(){return u()(this,n),t.apply(this,arguments)}return n}(Object(y.e)({requestInfo:null,status:"offline",currentClient:null,localRecordsContents:Object(y.c)(),localRecordsChanges:Object(y.a)(),stagedRecordsChanges:Object(y.a)(),localRecordsRev:0,requiredAttachmentIds:Object(y.g)(),clients:Object(y.b)()})),ne=n(325),ie=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new te,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:X.b;u()(this,e),p()(this,"_recordsUpdatesCallback",(function(){})),p()(this,"_acceptedRecordsResponseCallback",(function(){})),p()(this,"_shouldFireRecordsUpdateCallback",!1),p()(this,"onChanges",(function(e){if(t._shouldFireRecordsUpdateCallback){var n=e.created,i=e.updated,s=e.deleted;t._recordsUpdatesCallback(Object(y.a)(n),Object(y.a)(i),Object(y.a)(s))}})),p()(this,"onAcceptedRecords",(function(e){if(t._shouldFireRecordsUpdateCallback){var n=e.created,i=e.updated,s=e.deleted;t._acceptedRecordsResponseCallback(Object(y.a)(n),Object(y.a)(i),Object(y.a)(s))}})),p()(this,"setOnDocumentHandleConflictCallback",(function(e){if("function"!=typeof e)throw new TypeError("callback must be a function");t._cycle.setOnDocumentHandleConflictCallback(e)})),p()(this,"syncChanges",Object(ne.a)((function(){return t._cycle.nextCycle()}))),this._state=n,this._CycleClass=i}return h()(e,[{key:"getRecords",value:function(){return this._shouldFireRecordsUpdateCallback=!0,this._state.localRecordsContents.map((function(e,t){return{content:e.content,permissions:e.permissions,group:e.group,id:t}})).toList()}},{key:"createRecord",value:function(e,t,n,i){var s=this;return new Promise((function(o,a){var r=new Q({id:e,content:t,attachments:n,group:i,type:"created",resolve:o,reject:a});s.enqueueChangeRequest(r)}))}},{key:"updateRecord",value:function(e,t,n){var i=this;return new Promise((function(s,o){if(!i.isKnownRecordId(e))return o(new k.a("Record with ID: ".concat(e," not found.")));var a=new Q({id:e,content:t,group:n,type:"updated",resolve:s,reject:o});i.enqueueChangeRequest(a)}))}},{key:"deleteRecord",value:function(e){var t=this;return new Promise((function(n,i){if(!t.isKnownRecordId(e))return i(new k.a("Record with ID: ".concat(e," not found.")));var s=new Q({id:e,type:"deleted",resolve:n,reject:i});t.enqueueChangeRequest(s)}))}},{key:"onRecordsUpdates",value:function(e,t){if("function"!=typeof e)throw new TypeError("recordsUpdateCallback must be a function");if("function"!=typeof t)throw new TypeError("acceptedRecordsCallback must be a function");this._recordsUpdatesCallback=e,this._acceptedRecordsResponseCallback=t}},{key:"destroy",value:function(){this._cycle&&this._cycle.destroy()}}]),h()(e,[{key:"load",value:function(e,t){var n=this,i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return new Promise((function(s,o){var a=n.setState.bind(n);n.setState(n._state.set("requestInfo",{serverURL:e,authPayload:t})),n._cycle=new n._CycleClass({getState:function(){return n._state},setState:a,onChanges:n.onChanges,onAcceptedRecords:n.onAcceptedRecords,longPollingTimeout:i?X.a:0}),n._cycle.nextCycle(0).then((function(){s(n)})).catch(o)}))}},{key:"setState",value:function(e){this._state=e}},{key:"enqueueChangeRequest",value:function(e){var t=Object(Y.a)({oldChanges:this._state.localRecordsChanges,newChanges:Object(y.a)([e])});this.setState(this._state.set("localRecordsChanges",t))}},{key:"isKnownRecordId",value:function(e){function t(t){return"created"===t.type&&t.id===e}var n=this._state.localRecordsContents.has(e),i=!!this._state.localRecordsChanges.find(t),s=!!this._state.stagedRecordsChanges.find(t);return n||i||s}}]),e}(),se=n(866),oe=n(204);n(2);function ae(e,t){var n,i=e.get("annotations"),s=e.get("formFields"),o=e.get("comments"),a=e.get("formattedFormFieldValues");return t.id.startsWith("form-field-value/")&&(n=t.id.split("/")[1]),i.get(t.id)||s.find((function(e){return e.id===t.id}))||o.get(t.id)||(n?a.get(n):void 0)}function re(e,t){return Boolean(ae(e,t))}var ce=n(73),le=n(144),ue=n(111),de=n(158),he=function(){function e(t,n,i){var s=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:se.a;u()(this,e),p()(this,"_existingBookmarksIds",new y.g),p()(this,"_existingFormFieldsIds",new y.g),p()(this,"_existingFormFieldValuesIds",new y.g),p()(this,"_existingCommentIds",new y.g),p()(this,"_documentHandleConflictCallback",(function(){})),p()(this,"canCreateBackendOrphanWidgets",!0),p()(this,"setDocumentHandleConflictCallback",(function(e){s._documentHandleConflictCallback=e})),p()(this,"setDocumentHandleOutdated",(function(e){s._setDocumentHandleOutdatedCallback=e})),p()(this,"onDocumentHandleConflict",(function(){s._documentHandleConflictCallback&&s._documentHandleConflictCallback(),s._setDocumentHandleOutdatedCallback&&s._setDocumentHandleOutdatedCallback(!0)})),this._serverURL=t,this._documentURL=n,this._authPayload=i,this._settings=o,this._hasLoadedInitialRecords=!1}var t,n,i,o,r,l,d;return h()(e,[{key:"load",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:G,i=[];return this._sync=new t,i.push(this._sync.load("".concat(this._documentURL,"/sync"),this._authPayload,this._settings.listenToServerChangesEnabled).catch(console.error)),this._sync.setOnDocumentHandleConflictCallback(this.onDocumentHandleConflict),this._settings.clientsPresenceEnabled&&(this._clients=new n,i.push(this._clients.load("".concat(this._serverURL.replace(/^http/i,"ws"),"/websocket"),this._authPayload,{}).then((function(){var t=e._clients;null!=t&&(t.onClientUpdates((function(){return e._onClientsChange(t.getClients())})),e._onClientsChange(t.getClients()))})).catch((function(e){Object(k.n)("PSPDFKit: An error occurred while initializing the connected clients module. This might be due to a lack of support for WebSockets or a related failure.\n\nFailure details:\n\n"+e.message)})))),Promise.all(i).then((function(){return e})).catch((function(e){throw new k.a("Initialization of PSPDFKit Instant failed:\n".concat(e.message))}))}},{key:"destroy",value:function(){this._sync&&this._sync.destroy()}},{key:"setFormsEnabledInConfig",value:function(e){this._formsEnabledInConfig=e}},{key:"setReadStateCallbacks",value:function(e){this._readStateCallbacks=e}},{key:"setAnnotationCallbacks",value:function(e){this._annotationCallbacks=e}},{key:"setBookmarkCallbacks",value:function(e){this._bookmarkCallbacks=e}},{key:"setFormFieldCallbacks",value:function(e){this._formFieldCallbacks=e}},{key:"setFormFieldValueCallbacks",value:function(e){this._formFieldValueCallbacks=e}},{key:"setCommentCallbacks",value:function(e){this._commentCallbacks=e}},{key:"createAnnotation",value:function(e,t){var n=Object(m.o)(e),i=n.id,s=c()(n,["id"]),o=s.group,a=(s.permissions,c()(s,["group","permissions"]));return this._sync.createRecord(i,a,Object(m.b)(t),o)}},{key:"createComment",value:function(e){var t=Object(m.p)(e),n=t.id,i=c()(t,["id"]),s=i.group,o=(i.permissions,c()(i,["group","permissions"]));return this._existingCommentIds=this._existingCommentIds.add(n),this._sync.createRecord(n,o,{},s)}},{key:"updateComment",value:(d=a()(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.updateRecord(Object(m.p)(t));case 3:return e.abrupt("return",e.sent);case 6:if(e.prev=6,e.t0=e.catch(0),e.t0 instanceof k.a){e.next=10;break}throw e.t0;case 10:case"end":return e.stop()}}),e,this,[[0,6]])}))),function(e){return d.apply(this,arguments)})},{key:"deleteComment",value:function(e){return this._existingCommentIds=this._existingCommentIds.delete(e),this._sync.deleteRecord(e).then((function(){}))}},{key:"setStateGetter",value:function(e){this._getState=e}},{key:"updateRecord",value:(l=a()(s.a.mark((function e(t){var n,i,o,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.id,i=t.permissions,o=t.group,a=c()(t,["id","permissions","group"]),!(this._getState&&this._getState()&&this._getState().backend.isCollaborationPermissionsEnabled())){e.next=5;break}return e.abrupt("return",this._sync.updateRecord(n,i.edit?a:void 0,i.setGroup?o:void 0));case 5:return e.abrupt("return",this._sync.updateRecord(n,a,o));case 6:case"end":return e.stop()}}),e,this)}))),function(e){return l.apply(this,arguments)})},{key:"updateAnnotation",value:(r=a()(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.updateRecord(Object(m.o)(t));case 3:return e.abrupt("return",e.sent);case 6:if(e.prev=6,e.t0=e.catch(0),e.t0 instanceof k.a){e.next=10;break}throw e.t0;case 10:case"end":return e.stop()}}),e,this,[[0,6]])}))),function(e){return r.apply(this,arguments)})},{key:"deleteAnnotation",value:function(e){return this._sync.deleteRecord(e.id).then((function(){}))}},{key:"createBookmark",value:function(e){var t=Object(b.b)(e),n=t.id,i=c()(t,["id"]);return this._existingBookmarksIds=this._existingBookmarksIds.add(n),this._sync.createRecord(n,i,{})}},{key:"updateBookmark",value:(o=a()(s.a.mark((function e(t){var n,i,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(b.b)(t),i=n.id,o=c()(n,["id"]),e.prev=1,e.next=4,this._sync.updateRecord(i,o);case 4:return e.abrupt("return",e.sent);case 7:if(e.prev=7,e.t0=e.catch(1),e.t0 instanceof k.a){e.next=11;break}throw e.t0;case 11:case"end":return e.stop()}}),e,this,[[1,7]])}))),function(e){return o.apply(this,arguments)})},{key:"deleteBookmark",value:function(e){var t=this;return this._sync.deleteRecord(e).then((function(){t._existingBookmarksIds=t._existingBookmarksIds.delete(e)}))}},{key:"createFormField",value:function(e){var t=Object(m.r)(e),n=t.id,i=c()(t,["id"]),s=i.group,o=(i.permissions,c()(i,["group","permissions"]));return this._existingFormFieldsIds=this._existingFormFieldsIds.add(n),this._sync.createRecord(n,o,{},s)}},{key:"updateFormField",value:(i=a()(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.updateRecord(Object(m.r)(t));case 3:return e.abrupt("return",e.sent);case 6:if(e.prev=6,e.t0=e.catch(0),e.t0 instanceof k.a){e.next=10;break}throw e.t0;case 10:case"end":return e.stop()}}),e,this,[[0,6]])}))),function(e){return i.apply(this,arguments)})},{key:"deleteFormField",value:function(e){var t=this;return this._sync.deleteRecord(e.id).then((function(){t._existingFormFieldsIds=t._existingFormFieldsIds.delete(e.id)}))}},{key:"loadFormFields",value:function(){return this.loadAnnotationsForPageIndex()}},{key:"createFormFieldValue",value:function(e){var t=Object(m.s)(e),n=Object(oe.b)(e);return this._existingFormFieldValuesIds=this._existingFormFieldValuesIds.add(n),this._sync.createRecord(n,t,{})}},{key:"setFormFieldValue",value:(n=a()(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(m.s)(t),e.prev=1,e.next=4,this._sync.updateRecord(Object(oe.b)(t),n);case 4:return e.abrupt("return",e.sent);case 7:if(e.prev=7,e.t0=e.catch(1),e.t0 instanceof k.a){e.next=11;break}throw e.t0;case 11:case"end":return e.stop()}}),e,this,[[1,7]])}))),function(e){return n.apply(this,arguments)})},{key:"deleteFormFieldValue",value:function(e){var t=this;return this._sync.deleteRecord(e).then((function(){t._existingFormFieldValuesIds=t._existingFormFieldValuesIds.delete(e)}))}},{key:"loadAnnotationsForPageIndex",value:function(){var e=this;return this._loadPromise||(this._loadPromise=new Promise((function(e){return setTimeout(e,0)})).then((function(){e._hasLoadedInitialRecords||(e._sync.onRecordsUpdates((function(t,n,i){return e._onRecordsUpdates(t,n,i,v.b)}),(function(t,n,i){return e._onAcceptedRecords(t,n,i)})),e._onRecordsUpdates(e._sync.getRecords(),Object(y.a)(),Object(y.a)(),v.a),e._hasLoadedInitialRecords=!0)}))),this._loadPromise}},{key:"loadBookmarks",value:(t=a()(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return");case 1:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})},{key:"syncChanges",value:function(){return this._sync.syncChanges()}},{key:"_filterRecords",value:function(e){var t=this;return e.filter((function(e){var n=e.content;return t._formsEnabledInConfig||!Object(m.l)(n)}))}},{key:"_onRecordsUpdates",value:function(e,t,n,i){var s=this,o=Object(y.a)(),a=[],r=Object(y.a)(),c=Object(y.a)(),l=Object(y.g)(),u=Object(y.g)(),d=Object(y.g)(),h=Object(y.g)(),f=Object(y.g)(),p=this._getState?this._getState():void 0,v=e,_=t,g=n;if(p&&p.backend&&p.backend.isCollaborationPermissionsEnabled()){v=v.filter((function(e){return!!e.content}));var C=[];t.forEach((function(e,t){e.content?re(p,e)||(v=v.push(e),C.push(t)):re(p,e)?(g=g.push(e.id),C.push(t)):C.push(t)})),_=_.filter((function(e,t){return!C.includes(t)})),g=g.filter((function(e){return p.annotations.has(e)||s._existingFormFieldValuesIds.has(e)||s._existingFormFieldsIds.has(e)||s._existingCommentIds.has(e)||s._existingBookmarksIds.has(e)}))}var O=Object(y.a)().withMutations((function(e){s._filterRecords(v).forEach((function(t){var n=t.id,i=t.content,l={permissions:t.permissions,group:t.group};try{Object(m.l)(i)?(a.push(Object(m.e)(n,i,l)),s._existingFormFieldsIds=s._existingFormFieldsIds.add(n)):Object(m.m)(i)?(r=r.push(Object(m.f)(i)),s._existingFormFieldValuesIds=s._existingFormFieldValuesIds.add(n)):Object(m.j)(i)?(o=o.push(Object(b.a)(n,i)),s._existingBookmarksIds=s._existingBookmarksIds.add(n)):Object(m.k)(i)?(s._existingCommentIds=s._existingCommentIds.add(n),c=c.push(Object(m.d)(n,i,l))):Object(m.n)(i)||e.push(Object(m.c)(n,i,l))}catch(e){console.info("Skipped creating record #".concat(n," from payload because an error occurred while deserializing."),i),console.info(e)}}))}));a.length>0&&(Object(k.i)(this._formFieldCallbacks),this._formFieldCallbacks.createFormFields(Object(y.a)(a),i)),r.size>0&&(Object(k.i)(this._formFieldValueCallbacks),this._formFieldValueCallbacks.createFormFieldValues(Object(y.a)(r),i)),O.size>0&&(Object(k.i)(this._annotationCallbacks),this._annotationCallbacks.createAnnotations(O,Object(y.b)(),i)),c.size>0&&(Object(k.i)(this._commentCallbacks),this._commentCallbacks.createComments(c,i)),o.size>0&&(Object(k.i)(this._bookmarkCallbacks),this._bookmarkCallbacks.createBookmarks(o,i));var j=Object(y.a)().asMutable(),F=[],w=[],I=[],R=Object(y.a)().withMutations((function(e){s._filterRecords(_).map((function(t){var n=t.id,i=t.content,s=t.group,o={permissions:t.permissions,group:s};try{if(Object(m.l)(i))try{F.push(Object(m.e)(n,i,o))}catch(e){d=d.add(n),console.info("Skipped updating form field #".concat(n," from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state."),i),console.info(e)}else if(Object(m.m)(i))try{w.push(Object(m.f)(i))}catch(e){h=h.add(n),console.info("Skipped updating form field value #".concat(n," from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state."),i),console.info(e)}else if(Object(m.j)(i))try{j.push(Object(b.a)(n,i))}catch(e){u=u.add(n),console.info("Skipped updating bookmark #".concat(n," from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state."),i),console.info(e)}else if(Object(m.k)(i))try{I.push(Object(m.d)(n,i,o))}catch(e){f=f.add(n),console.info("Skipped updating comment #".concat(n," from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state."),i,e)}else e.push(Object(m.c)(n,i,o))}catch(e){l=l.add(n),console.info("Skipped updating annotation #".concat(n," from payload because an error occurred while deserializing. To avoid issues, we have removed the previous version from the application state."),i),console.info(e)}}))}));R.size>0&&(Object(k.i)(this._annotationCallbacks),this._annotationCallbacks.updateAnnotations(R)),j.size>0&&(Object(k.i)(this._bookmarkCallbacks),this._bookmarkCallbacks.updateBookmarks(j)),F.length>0&&(Object(k.i)(this._formFieldCallbacks),this._formFieldCallbacks.updateFormFields(Object(y.a)(F))),w.length>0&&(Object(k.i)(this._formFieldValueCallbacks),this._formFieldValueCallbacks.setFormFieldValues(Object(y.a)(w))),I.length>0&&(Object(k.i)(this._commentCallbacks),this._commentCallbacks.updateComments(Object(y.a)(I))),(l=l.concat(g.filter((function(e){return!(s._existingBookmarksIds.has(e)||s._existingFormFieldsIds.has(e)||s._existingFormFieldValuesIds.has(e)||s._existingCommentIds.has(e))})).toSet())).size>0&&(Object(k.i)(this._annotationCallbacks),this._annotationCallbacks.deleteAnnotations(l)),(u=u.concat(g.filter((function(e){var t=s._existingBookmarksIds.has(e);return t&&(s._existingBookmarksIds=s._existingBookmarksIds.delete(e)),t})).toSet())).size>0&&(Object(k.i)(this._bookmarkCallbacks),this._bookmarkCallbacks.deleteBookmarks(u)),(d=d.concat(g.filter((function(e){var t=s._existingFormFieldsIds.has(e);return t&&(s._existingFormFieldsIds=s._existingFormFieldsIds.delete(e)),t})).toSet())).size>0&&(Object(k.i)(this._formFieldCallbacks),this._formFieldCallbacks.deleteFormFields(d)),(h=h.concat(g.filter((function(e){var t=s._existingFormFieldValuesIds.has(e);return t&&(s._existingFormFieldValuesIds=s._existingFormFieldValuesIds.delete(e)),t})).toSet())).size>0&&(Object(k.i)(this._formFieldValueCallbacks),this._formFieldValueCallbacks.deleteFormFieldValues(h)),(f=f.concat(g.filter((function(e){var t=s._existingCommentIds.has(e);return t&&(s._existingCommentIds=s._existingCommentIds.delete(e)),t})).toSet())).size>0&&(Object(k.i)(this._commentCallbacks),this._commentCallbacks.deleteComments(f))}},{key:"_onAcceptedRecords",value:function(e,t){var n=this._getState?this._getState():void 0;if(n&&n.backend&&n.backend.isCollaborationPermissionsEnabled()){var i=[],s=[],o=[],a=[],r=[],c=[];e.isEmpty()||e.forEach(l),t.isEmpty()||t.forEach(l),i.length>0&&(Object(k.i)(this._annotationCallbacks),this._annotationCallbacks.updateAnnotations(Object(y.a)(i),!0)),s.length>0&&(Object(k.i)(this._commentCallbacks),this._commentCallbacks.updateComments(Object(y.a)(s))),o.length>0&&(Object(k.i)(this._formFieldCallbacks),this._formFieldCallbacks.updateFormFields(Object(y.a)(o))),a.length>0&&(Object(k.i)(this._annotationCallbacks),this._annotationCallbacks.deleteAnnotations(Object(y.g)(a),!0)),r.length>0&&(Object(k.i)(this._commentCallbacks),this._commentCallbacks.deleteComments(Object(y.g)(r))),c.length>0&&(Object(k.i)(this._formFieldCallbacks),this._formFieldCallbacks.deleteFormFields(Object(y.g)(c)))}function l(e){var t={permissions:e.permissions,group:e.group},l=ae(n,e);if(l&&"string"!=typeof l){Object(de.c)(t);var u=Object(de.a)(t);(l=l.merge(u))instanceof ce.a?t.permissions&&t.permissions.view?i.push(l):a.push(l.id):l instanceof le.a?t.permissions&&t.permissions.view?s.push(l):r.push(l.id):l instanceof ue.a&&(t.permissions&&t.permissions.view?o.push(l):c.push(l.id))}}}},{key:"onClientsChange",value:function(e){if("function"!=typeof e)throw new TypeError("Callback must be a function");this.onClientsChangeCallback=e}},{key:"_onClientsChange",value:function(e){this.onClientsChangeCallback.call(null,e)}}]),e}()}}]);