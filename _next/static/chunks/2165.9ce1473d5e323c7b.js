"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2165],{2165:function(n,e,i){i.r(e),i.d(e,{default:function(){return t}});var t=[Object.freeze({information_for_contributors:["This file has been converted from https://github.com/textmate/ini.tmbundle/blob/master/Syntaxes/Ini.plist","If you want to provide a fix or improvement, please create a pull request against the original repository.","Once accepted there, we are happy to receive an update request."],version:"https://github.com/textmate/ini.tmbundle/commit/2af0cbb0704940f967152616f2f1ff0aae6287a6",name:"ini",scopeName:"source.ini",patterns:[{begin:"(^[ \\t]+)?(?=#)",beginCaptures:{1:{name:"punctuation.whitespace.comment.leading.ini"}},end:"(?!\\G)",patterns:[{begin:"#",beginCaptures:{0:{name:"punctuation.definition.comment.ini"}},end:"\\n",name:"comment.line.number-sign.ini"}]},{begin:"(^[ \\t]+)?(?=;)",beginCaptures:{1:{name:"punctuation.whitespace.comment.leading.ini"}},end:"(?!\\G)",patterns:[{begin:";",beginCaptures:{0:{name:"punctuation.definition.comment.ini"}},end:"\\n",name:"comment.line.semicolon.ini"}]},{captures:{1:{name:"keyword.other.definition.ini"},2:{name:"punctuation.separator.key-value.ini"}},match:"\\b([a-zA-Z0-9_.-]+)\\b\\s*(=)"},{captures:{1:{name:"punctuation.definition.entity.ini"},3:{name:"punctuation.definition.entity.ini"}},match:"^(\\[)(.*?)(\\])",name:"entity.name.section.group-title.ini"},{begin:"'",beginCaptures:{0:{name:"punctuation.definition.string.begin.ini"}},end:"'",endCaptures:{0:{name:"punctuation.definition.string.end.ini"}},name:"string.quoted.single.ini",patterns:[{match:"\\\\.",name:"constant.character.escape.ini"}]},{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.ini"}},end:'"',endCaptures:{0:{name:"punctuation.definition.string.end.ini"}},name:"string.quoted.double.ini"}],displayName:"INI",aliases:["properties"]})]}}]);