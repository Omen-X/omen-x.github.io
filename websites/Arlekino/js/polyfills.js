"use strict";String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{value:function(t,e){var r=0<e?0|e:0;return this.substring(r,r+t.length)===t}}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var e=this;do{if(Element.prototype.matches.call(e,t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null});