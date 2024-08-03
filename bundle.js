(()=>{"use strict";var n={37:(n,e,A)=>{A.d(e,{A:()=>a});var t=A(354),r=A.n(t),o=A(314),i=A.n(o)()(r());i.push([n.id,":root\n{\n    --side-bar-color:#1a1919;\n    --color2:#303030;\n    --left-padding:8px;\n    --main-icon-width:30px;\n}\n\nhtml, body {\n    margin:0px;\n    box-sizing: border-box;\n}\n\n*{\n    color:white;\n    box-sizing: border-box;\n}\n\nbody\n{\n    display: grid;\n    grid-template-columns: 1fr 3fr 3fr;\n    background-color: #101010;\n    height:100vh;\n}\n\n.hidden {\n    display: none;\n}\n\n\n.main\n{\n    background-color: #1E1E1E;\n}\n\n.info\n{\n    background-color: #1E1E1E;\n}","",{version:3,sources:["webpack://./src/style/index.css"],names:[],mappings:"AAAA;;IAEI,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;IAClB,sBAAsB;AAC1B;;AAEA;IACI,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,WAAW;IACX,sBAAsB;AAC1B;;AAEA;;IAEI,aAAa;IACb,kCAAkC;IAClC,yBAAyB;IACzB,YAAY;AAChB;;AAEA;IACI,aAAa;AACjB;;;AAGA;;IAEI,yBAAyB;AAC7B;;AAEA;;IAEI,yBAAyB;AAC7B",sourcesContent:[":root\n{\n    --side-bar-color:#1a1919;\n    --color2:#303030;\n    --left-padding:8px;\n    --main-icon-width:30px;\n}\n\nhtml, body {\n    margin:0px;\n    box-sizing: border-box;\n}\n\n*{\n    color:white;\n    box-sizing: border-box;\n}\n\nbody\n{\n    display: grid;\n    grid-template-columns: 1fr 3fr 3fr;\n    background-color: #101010;\n    height:100vh;\n}\n\n.hidden {\n    display: none;\n}\n\n\n.main\n{\n    background-color: #1E1E1E;\n}\n\n.info\n{\n    background-color: #1E1E1E;\n}"],sourceRoot:""}]);const a=i},142:(n,e,A)=>{A.d(e,{A:()=>a});var t=A(354),r=A.n(t),o=A(314),i=A.n(o)()(r());i.push([n.id,":root\n{\n    --side-bar-color:#1a1919;\n    --color2:#303030;\n    --left-padding:8px;\n    --main-icon-width:30px;\n}\n\n.main\n{\n    display:flex;\n    flex-direction: column;\n    gap:1rem;\n    padding:16px;\n}\n\n.main .list-title\n{\n    font-size: 42px;\n}\n\n.add-task-form\n{\n    display:flex;\n    align-items: center;\n    gap:0.5rem;\n}\n\n.add-task-form .input-text\n{\n    background-color:var(--color2);\n    flex:1 1 auto;\n    border:0px;\n    padding:8px 16px;\n    border-radius: 8px;\n}\n\n.date-toggle\n{\n    width: 20px;\n    fill:var(--color2)\n}\n\n.date-toggle:hover\n{\n    cursor: pointer;\n    fill:black;\n}\n\n.input-date\n{\n    background-color: var(--color2);\n}\n\n.notes-tasks-container\n{\n    display: flex;\n    flex-direction: column;\n    gap:1rem;\n}\n\n.task-card\n{\n    display: flex;\n    align-items: center;\n    gap:0.5rem;\n}\n\n.task-card .title\n{\n    flex: 1 1 auto;\n    font-size: 24px;\n}\n\n.task-card .delete-button\n{\n    fill:var(--color2);\n    width: 20px;\n}\n\n.task-card .delete-button:hover\n{\n    fill:rgb(125, 2, 2);\n}\n\n.complete-button\n{\n    width:25px;\n    fill:var(--color2);\n}\n\n.complete-button:hover\n{\n    fill: #474747;\n    cursor: pointer;\n}\n\n.note-card\n{\n    display: flex;\n    align-items: center;\n    gap:0.5em;\n}\n\n.note-icon\n{\n    width:20px;\n    fill:var(--color2);\n    margin-right: 7px;\n}\n\n.note-card .title\n{\n    flex: 1 1 auto;\n    font-size: 24px;\n}","",{version:3,sources:["webpack://./src/style/main.css"],names:[],mappings:"AAAA;;IAEI,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;IAClB,sBAAsB;AAC1B;;AAEA;;IAEI,YAAY;IACZ,sBAAsB;IACtB,QAAQ;IACR,YAAY;AAChB;;AAEA;;IAEI,eAAe;AACnB;;AAEA;;IAEI,YAAY;IACZ,mBAAmB;IACnB,UAAU;AACd;;AAEA;;IAEI,8BAA8B;IAC9B,aAAa;IACb,UAAU;IACV,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;;IAEI,WAAW;IACX;AACJ;;AAEA;;IAEI,eAAe;IACf,UAAU;AACd;;AAEA;;IAEI,+BAA+B;AACnC;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,QAAQ;AACZ;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,UAAU;AACd;;AAEA;;IAEI,cAAc;IACd,eAAe;AACnB;;AAEA;;IAEI,kBAAkB;IAClB,WAAW;AACf;;AAEA;;IAEI,mBAAmB;AACvB;;AAEA;;IAEI,UAAU;IACV,kBAAkB;AACtB;;AAEA;;IAEI,aAAa;IACb,eAAe;AACnB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,SAAS;AACb;;AAEA;;IAEI,UAAU;IACV,kBAAkB;IAClB,iBAAiB;AACrB;;AAEA;;IAEI,cAAc;IACd,eAAe;AACnB",sourcesContent:[":root\n{\n    --side-bar-color:#1a1919;\n    --color2:#303030;\n    --left-padding:8px;\n    --main-icon-width:30px;\n}\n\n.main\n{\n    display:flex;\n    flex-direction: column;\n    gap:1rem;\n    padding:16px;\n}\n\n.main .list-title\n{\n    font-size: 42px;\n}\n\n.add-task-form\n{\n    display:flex;\n    align-items: center;\n    gap:0.5rem;\n}\n\n.add-task-form .input-text\n{\n    background-color:var(--color2);\n    flex:1 1 auto;\n    border:0px;\n    padding:8px 16px;\n    border-radius: 8px;\n}\n\n.date-toggle\n{\n    width: 20px;\n    fill:var(--color2)\n}\n\n.date-toggle:hover\n{\n    cursor: pointer;\n    fill:black;\n}\n\n.input-date\n{\n    background-color: var(--color2);\n}\n\n.notes-tasks-container\n{\n    display: flex;\n    flex-direction: column;\n    gap:1rem;\n}\n\n.task-card\n{\n    display: flex;\n    align-items: center;\n    gap:0.5rem;\n}\n\n.task-card .title\n{\n    flex: 1 1 auto;\n    font-size: 24px;\n}\n\n.task-card .delete-button\n{\n    fill:var(--color2);\n    width: 20px;\n}\n\n.task-card .delete-button:hover\n{\n    fill:rgb(125, 2, 2);\n}\n\n.complete-button\n{\n    width:25px;\n    fill:var(--color2);\n}\n\n.complete-button:hover\n{\n    fill: #474747;\n    cursor: pointer;\n}\n\n.note-card\n{\n    display: flex;\n    align-items: center;\n    gap:0.5em;\n}\n\n.note-icon\n{\n    width:20px;\n    fill:var(--color2);\n    margin-right: 7px;\n}\n\n.note-card .title\n{\n    flex: 1 1 auto;\n    font-size: 24px;\n}"],sourceRoot:""}]);const a=i},61:(n,e,A)=>{A.d(e,{A:()=>a});var t=A(354),r=A.n(t),o=A(314),i=A.n(o)()(r());i.push([n.id,"*{\n    box-sizing: border-box;\n}\n\n.side-bar\n{\n    background-color: var(--side-bar-color);\n    display:flex;\n    flex-direction: column;\n    gap:2rem;\n    padding:16px;\n    min-width: 250px;\n}\n\n.inbox-icon\n{\n    width: var(--main-icon-width);\n    fill:white;\n}\n\n.today-icon\n{\n    width: var(--main-icon-width);\n    fill:white;\n}\n\n.next7-icon\n{\n    width: var(--main-icon-width);\n    fill:white;\n}\n\n.main-lists\n{\n    display: flex;\n    flex-direction: column;\n    gap:1rem;\n    font-size: 20px;\n}\n\n.list\n{\n    padding:8px var(--left-padding);\n    display: flex;\n    align-items: center;\n    gap:0.8rem;\n    border:0px;\n    border-radius: 8px;\n}\n\n.list:hover\n{\n    cursor: pointer;\n    background-color: var(--color2);\n}\n\n.current-list\n{\n    background-color: #3F3F3F;\n}\n\n.title-addList-container\n{\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    --font-size:24px;\n    padding:8px var(--left-padding);\n    margin-bottom: 16px;\n}\n\n.list-icon\n{\n    width:20px; \n    fill:white;\n}\n\n.title-addList-container > .title\n{\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap:0.5rem;\n    color:#fffdfd;\n    font-size: var(--font-size);\n}\n\n.add-list\n{\n    background-color: var(--side-bar-color);\n    cursor: pointer;\n    font-size: var(--font-size);\n    border-radius:8px;\n    width:25px;\n    fill:white;\n}   \n\n.add-list:hover\n{\n    fill:#4772FA;\n}\n\n.list-card\n{\n    padding:8px var(--left-padding);\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-radius: 8px;\n}\n\n.title-icon-container\n{\n    display:flex;\n    align-items: center;\n    gap:0.5rem;\n}\n\n.list-card:hover\n{\n    background-color: var(--color2);\n    cursor: pointer;\n}\n\n.delete-button\n{\n    width: 20px; \n    fill:var(--color2);\n}\n\n.delete-button:hover\n{\n    fill:rgb(125, 2, 2);\n    cursor: pointer;\n}\n\n.completed\n{\n    display: flex;\n    align-items: center;\n    gap:0.5rem;\n    padding:8px;\n    border-radius: 8px;\n}\n\n.completed:hover\n{\n    background-color: var(--color2);\n    cursor: pointer;\n}\n","",{version:3,sources:["webpack://./src/style/sidebar.css"],names:[],mappings:"AAAA;IACI,sBAAsB;AAC1B;;AAEA;;IAEI,uCAAuC;IACvC,YAAY;IACZ,sBAAsB;IACtB,QAAQ;IACR,YAAY;IACZ,gBAAgB;AACpB;;AAEA;;IAEI,6BAA6B;IAC7B,UAAU;AACd;;AAEA;;IAEI,6BAA6B;IAC7B,UAAU;AACd;;AAEA;;IAEI,6BAA6B;IAC7B,UAAU;AACd;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,eAAe;AACnB;;AAEA;;IAEI,+BAA+B;IAC/B,aAAa;IACb,mBAAmB;IACnB,UAAU;IACV,UAAU;IACV,kBAAkB;AACtB;;AAEA;;IAEI,eAAe;IACf,+BAA+B;AACnC;;AAEA;;IAEI,yBAAyB;AAC7B;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,gBAAgB;IAChB,+BAA+B;IAC/B,mBAAmB;AACvB;;AAEA;;IAEI,UAAU;IACV,UAAU;AACd;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,UAAU;IACV,aAAa;IACb,2BAA2B;AAC/B;;AAEA;;IAEI,uCAAuC;IACvC,eAAe;IACf,2BAA2B;IAC3B,iBAAiB;IACjB,UAAU;IACV,UAAU;AACd;;AAEA;;IAEI,YAAY;AAChB;;AAEA;;IAEI,+BAA+B;IAC/B,aAAa;IACb,8BAA8B;IAC9B,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;;IAEI,YAAY;IACZ,mBAAmB;IACnB,UAAU;AACd;;AAEA;;IAEI,+BAA+B;IAC/B,eAAe;AACnB;;AAEA;;IAEI,WAAW;IACX,kBAAkB;AACtB;;AAEA;;IAEI,mBAAmB;IACnB,eAAe;AACnB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,UAAU;IACV,WAAW;IACX,kBAAkB;AACtB;;AAEA;;IAEI,+BAA+B;IAC/B,eAAe;AACnB",sourcesContent:["*{\n    box-sizing: border-box;\n}\n\n.side-bar\n{\n    background-color: var(--side-bar-color);\n    display:flex;\n    flex-direction: column;\n    gap:2rem;\n    padding:16px;\n    min-width: 250px;\n}\n\n.inbox-icon\n{\n    width: var(--main-icon-width);\n    fill:white;\n}\n\n.today-icon\n{\n    width: var(--main-icon-width);\n    fill:white;\n}\n\n.next7-icon\n{\n    width: var(--main-icon-width);\n    fill:white;\n}\n\n.main-lists\n{\n    display: flex;\n    flex-direction: column;\n    gap:1rem;\n    font-size: 20px;\n}\n\n.list\n{\n    padding:8px var(--left-padding);\n    display: flex;\n    align-items: center;\n    gap:0.8rem;\n    border:0px;\n    border-radius: 8px;\n}\n\n.list:hover\n{\n    cursor: pointer;\n    background-color: var(--color2);\n}\n\n.current-list\n{\n    background-color: #3F3F3F;\n}\n\n.title-addList-container\n{\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    --font-size:24px;\n    padding:8px var(--left-padding);\n    margin-bottom: 16px;\n}\n\n.list-icon\n{\n    width:20px; \n    fill:white;\n}\n\n.title-addList-container > .title\n{\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap:0.5rem;\n    color:#fffdfd;\n    font-size: var(--font-size);\n}\n\n.add-list\n{\n    background-color: var(--side-bar-color);\n    cursor: pointer;\n    font-size: var(--font-size);\n    border-radius:8px;\n    width:25px;\n    fill:white;\n}   \n\n.add-list:hover\n{\n    fill:#4772FA;\n}\n\n.list-card\n{\n    padding:8px var(--left-padding);\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-radius: 8px;\n}\n\n.title-icon-container\n{\n    display:flex;\n    align-items: center;\n    gap:0.5rem;\n}\n\n.list-card:hover\n{\n    background-color: var(--color2);\n    cursor: pointer;\n}\n\n.delete-button\n{\n    width: 20px; \n    fill:var(--color2);\n}\n\n.delete-button:hover\n{\n    fill:rgb(125, 2, 2);\n    cursor: pointer;\n}\n\n.completed\n{\n    display: flex;\n    align-items: center;\n    gap:0.5rem;\n    padding:8px;\n    border-radius: 8px;\n}\n\n.completed:hover\n{\n    background-color: var(--color2);\n    cursor: pointer;\n}\n"],sourceRoot:""}]);const a=i},314:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var A="",t=void 0!==e[5];return e[4]&&(A+="@supports (".concat(e[4],") {")),e[2]&&(A+="@media ".concat(e[2]," {")),t&&(A+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),A+=n(e),t&&(A+="}"),e[2]&&(A+="}"),e[4]&&(A+="}"),A})).join("")},e.i=function(n,A,t,r,o){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(t)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(i[l]=!0)}for(var d=0;d<n.length;d++){var c=[].concat(n[d]);t&&i[c[0]]||(void 0!==o&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=o),A&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=A):c[2]=A),r&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=r):c[4]="".concat(r)),e.push(c))}},e}},354:n=>{n.exports=function(n){var e=n[1],A=n[3];if(!A)return e;if("function"==typeof btoa){var t=btoa(unescape(encodeURIComponent(JSON.stringify(A)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t),o="/*# ".concat(r," */");return[e].concat([o]).join("\n")}return[e].join("\n")}},72:n=>{var e=[];function A(n){for(var A=-1,t=0;t<e.length;t++)if(e[t].identifier===n){A=t;break}return A}function t(n,t){for(var o={},i=[],a=0;a<n.length;a++){var l=n[a],d=t.base?l[0]+t.base:l[0],c=o[d]||0,s="".concat(d," ").concat(c);o[d]=c+1;var p=A(s),u={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var f=r(u,t);t.byIndex=a,e.splice(a,0,{identifier:s,updater:f,references:1})}i.push(s)}return i}function r(n,e){var A=e.domAPI(e);return A.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;A.update(n=e)}else A.remove()}}n.exports=function(n,r){var o=t(n=n||[],r=r||{});return function(n){n=n||[];for(var i=0;i<o.length;i++){var a=A(o[i]);e[a].references--}for(var l=t(n,r),d=0;d<o.length;d++){var c=A(o[d]);0===e[c].references&&(e[c].updater(),e.splice(c,1))}o=l}}},659:n=>{var e={};n.exports=function(n,A){var t=function(n){if(void 0===e[n]){var A=document.querySelector(n);if(window.HTMLIFrameElement&&A instanceof window.HTMLIFrameElement)try{A=A.contentDocument.head}catch(n){A=null}e[n]=A}return e[n]}(n);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(A)}},540:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},56:(n,e,A)=>{n.exports=function(n){var e=A.nc;e&&n.setAttribute("nonce",e)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(A){!function(n,e,A){var t="";A.supports&&(t+="@supports (".concat(A.supports,") {")),A.media&&(t+="@media ".concat(A.media," {"));var r=void 0!==A.layer;r&&(t+="@layer".concat(A.layer.length>0?" ".concat(A.layer):""," {")),t+=A.css,r&&(t+="}"),A.media&&(t+="}"),A.supports&&(t+="}");var o=A.sourceMap;o&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleTagTransform(t,n,e.options)}(e,n,A)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},113:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function A(t){var r=e[t];if(void 0!==r)return r.exports;var o=e[t]={id:t,exports:{}};return n[t](o,o.exports,A),o.exports}A.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return A.d(e,{a:e}),e},A.d=(n,e)=>{for(var t in e)A.o(e,t)&&!A.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},A.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),A.nc=void 0,new Array,new Array,new Array;var t=A(72),r=A.n(t),o=A(825),i=A.n(o),a=A(659),l=A.n(a),d=A(56),c=A.n(d),s=A(540),p=A.n(s),u=A(113),f=A.n(u),B=A(37),I={};I.styleTagTransform=f(),I.setAttributes=c(),I.insert=l().bind(null,"head"),I.domAPI=i(),I.insertStyleElement=p(),r()(B.A,I),B.A&&B.A.locals&&B.A.locals;var m=A(61),g={};g.styleTagTransform=f(),g.setAttributes=c(),g.insert=l().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=p(),r()(m.A,g),m.A&&m.A.locals&&m.A.locals;var C=A(142),x={};x.styleTagTransform=f(),x.setAttributes=c(),x.insert=l().bind(null,"head"),x.domAPI=i(),x.insertStyleElement=p(),r()(C.A,x),C.A&&C.A.locals&&C.A.locals;const b=document.querySelector(".date-toggle"),v=document.querySelector(".input-date");b.addEventListener("click",(()=>{v.classList.toggle("hidden")}))})();
//# sourceMappingURL=bundle.js.map