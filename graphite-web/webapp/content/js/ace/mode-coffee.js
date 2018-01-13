define("ace/mode/coffee",["require","exports","module","ace/tokenizer","ace/mode/coffee_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/text","ace/worker/worker_client","pilot/oop"],function(a,b,c){function k(){this.$tokenizer=new d((new e).getRules()),this.$outdent=new f}var d=a("ace/tokenizer").Tokenizer,e=a("ace/mode/coffee_highlight_rules").CoffeeHighlightRules,f=a("ace/mode/matching_brace_outdent").MatchingBraceOutdent,g=a("ace/range").Range,h=a("ace/mode/text").Mode,i=a("ace/worker/worker_client").WorkerClient,j=a("pilot/oop");j.inherits(k,h),function(){var a=/(?:[({[=:]|[-=]>|\b(?:else|switch|try|catch(?:\s*[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$/,b=/^(\s*)#/,c=/^\s*###(?!#)/,d=/^\s*/;this.getNextLineIndent=function(b,c,d){var e=this.$getIndent(c),f=this.$tokenizer.getLineTokens(c,b).tokens;return(!f.length||f[f.length-1].type!=="comment")&&b==="start"&&a.test(c)&&(e+=d),e},this.toggleCommentLines=function(a,e,f,h){console.log("toggle");var i=new g(0,0,0,0);for(var j=f;j<=h;++j){var k=e.getLine(j);if(c.test(k))continue;b.test(k)?k=k.replace(b,"$1"):k=k.replace(d,"$&#"),i.end.row=i.start.row=j,i.end.column=k.length+1,e.replace(i,k)}},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new i(["ace","pilot"],"worker-coffee.js","ace/mode/coffee_worker","Worker");b.attachToDocument(a.getDocument()),b.on("error",function(b){a.setAnnotations([b.data])}),b.on("ok",function(b){a.clearAnnotations()})}}.call(k.prototype),b.Mode=k}),define("ace/mode/coffee_highlight_rules",["require","exports","module","pilot/lang","pilot/oop","ace/mode/text_highlight_rules"],function(a,b,c){function g(){var a="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*",b={token:"string",merge:!0,regex:".+"},c=d.arrayToMap("this|throw|then|try|typeof|super|switch|return|break|by)|continue|catch|class|in|instanceof|is|isnt|if|else|extends|for|forown|finally|function|while|when|new|not|delete|debugger|do|loop|of|off|or|on|unless|until|and|yes".split("|")),e=d.arrayToMap("true|false|null|undefined".split("|")),f=d.arrayToMap("case|const|default|function|var|void|with|enum|export|implements|interface|let|package|private|protected|public|static|yield|__hasProp|extends|slice|bind|indexOf".split("|")),g=d.arrayToMap("Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|RangeError|String|SyntaxError|Error|EvalError|TypeError|URIError".split("|")),h=d.arrayToMap("Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent|RangeError|String|SyntaxError|Error|EvalError|TypeError|URIError".split("|"));this.$rules={start:[{token:"identifier",regex:"(?:(?:\\.|::)\\s*)"+a},{token:"variable",regex:"@"+a},{token:function(a){return c.hasOwnProperty(a)?"keyword":e.hasOwnProperty(a)?"constant.language":f.hasOwnProperty(a)?"invalid.illegal":g.hasOwnProperty(a)?"language.support.class":h.hasOwnProperty(a)?"language.support.function":"identifier"},regex:a},{token:"constant.numeric",regex:"(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},{token:"string",merge:!0,regex:"'''",next:"qdoc"},{token:"string",merge:!0,regex:'"""',next:"qqdoc"},{token:"string",merge:!0,regex:"'",next:"qstring"},{token:"string",merge:!0,regex:'"',next:"qqstring"},{token:"string",merge:!0,regex:"`",next:"js"},{token:"string.regex",merge:!0,regex:"///",next:"heregex"},{token:"string.regex",regex:"/(?!\\s)[^[/\\n\\\\]*(?: (?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[/\\n\\\\]*)*/[imgy]{0,4}(?!\\w)"},{token:"comment",merge:!0,regex:"###(?!#)",next:"comment"},{token:"comment",regex:"#.*"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\."},{token:"paren.lparen",regex:"[({[]"},{token:"paren.rparen",regex:"[\\]})]"},{token:"keyword.operator",regex:"\\S+"},{token:"text",regex:"\\s+"}],qdoc:[{token:"string",regex:".*?'''",next:"start"},b],qqdoc:[{token:"string",regex:'.*?"""',next:"start"},b],qstring:[{token:"string",regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",next:"start"},b],qqstring:[{token:"string",regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',next:"start"},b],js:[{token:"string",merge:!0,regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",next:"start"},b],heregex:[{token:"string.regex",regex:".*?///[imgy]{0,4}",next:"start"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",merge:!0,regex:"\\S+"}],comment:[{token:"comment",regex:".*?###",next:"start"},{token:"comment",merge:!0,regex:".+"}]}}var d=a("pilot/lang"),e=a("pilot/oop"),f=a("ace/mode/text_highlight_rules").TextHighlightRules;e.inherits(g,f),b.CoffeeHighlightRules=g}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("ace/range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingBraceOutdent=e}),define("ace/worker/worker_client",["require","exports","module","pilot/oop","pilot/event_emitter"],function(a,b,c){var d=a("pilot/oop"),e=a("pilot/event_emitter").EventEmitter,f=function(b,c,d,e){this.changeListener=this.changeListener.bind(this);if(a.packaged)var f=this.$guessBasePath(),g=this.$worker=new Worker(f+c);else{var h=this.$normalizePath(a.nameToUrl("ace/worker/worker",null,"_")),g=this.$worker=new Worker(h),i={};for(var j=0;j<b.length;j++){var k=b[j],l=this.$normalizePath(a.nameToUrl(k,null,"_").replace(/.js$/,""));i[k]=l}}this.$worker.postMessage({init:!0,tlns:i,module:d,classname:e}),this.callbackId=1,this.callbacks={};var m=this;this.$worker.onerror=function(a){throw window.console&&console.log&&console.log(a),a},this.$worker.onmessage=function(a){var b=a.data;switch(b.type){case"log":window.console&&console.log&&console.log(b.data);break;case"event":m._dispatchEvent(b.name,{data:b.data});break;case"call":var c=m.callbacks[b.id];c&&(c(b.data),delete m.callbacks[b.id])}}};(function(){d.implement(this,e),this.$normalizePath=function(a){return a.match(/^\w+:/)||(a=location.protocol+"//"+location.host+(a.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+a.replace(/^[\/]+/,"")),a},this.$guessBasePath=function(){if(a.aceBaseUrl)return a.aceBaseUrl;var b=document.getElementsByTagName("script");for(var c=0;c<b.length;c++){var d=b[c],e=d.getAttribute("data-ace-base");if(e)return e.replace(/\/*$/,"/");var f=d.src||d.getAttribute("src");if(!f)continue;var g=f.match(/^(?:(.*\/)ace\.js|(.*\/)ace-uncompressed\.js)(?:\?|$)/);if(g)return g[1]||g[2]}return""},this.terminate=function(){this._dispatchEvent("terminate",{}),this.$worker.terminate(),this.$worker=null,this.$doc.removeEventListener("change",this.changeListener),this.$doc=null},this.send=function(a,b){this.$worker.postMessage({command:a,args:b})},this.call=function(a,b,c){if(c){var d=this.callbackId++;this.callbacks[d]=c,b.push(d)}this.send(a,b)},this.emit=function(a,b){try{this.$worker.postMessage({event:a,data:{data:b.data}})}catch(c){}},this.attachToDocument=function(a){this.$doc&&this.terminate(),this.$doc=a,this.call("setValue",[a.getValue()]),a.on("change",this.changeListener)},this.changeListener=function(a){a.range={start:a.data.range.start,end:a.data.range.end},this.emit("change",a)}}).call(f.prototype),b.WorkerClient=f})
