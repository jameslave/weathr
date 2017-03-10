"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}!function e(t,n,r){function o(c,u){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!u&&a)return a(c,!0);if(i)return i(c,!0);throw new Error("Cannot find module '"+c+"'")}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){document.cookie="temp=f",document.cookie="hours=8";var r=e("./location"),o=e("./parser"),i=e("./injector"),c=document.cookie?document.cookie.match(/hours=(\d{1,2})/)[1]||8:8;r.get().then(function(e){return r.send(e)}).then(function(e){return o.getData(e,c)}).then(function(e){return i.inject(e,c)})},{"./injector":2,"./location":3,"./parser":4}],2:[function(e,t,n){function r(e){document.getElementById("location").innerText=e.loc}function o(e){var t=document.getElementById("temp"),n=document.cookie?document.cookie.match(/temp=(f|c)/)[1]||"f":"f";t.innerText=e[n]+" °"+n.toUpperCase()}function i(e,t){var n=document.getElementById("forecast-hours"),r=document.getElementById("forecast-temp-text"),o=document.getElementById("forecast-wind-text"),i=document.getElementById("forecast-precip-text");n.innerText=t,r.innerText=e.tempStr,o.innerText=e.windStr,i.innerText=e.precipStr}n.inject=function(e,t){r(e),o(e),i(e,t)}},{}],3:[function(e,t,n){n.get=function(){return new Promise(function(e,t){if(!navigator.geolocation)return void t("Browser does not support geolocation");navigator.geolocation.getCurrentPosition(function(t){e({lat:t.coords.latitude,lon:t.coords.longitude})})})},n.send=function(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open("POST","/location",!0),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(e)),r.onerror=function(){n("Connection to server failed")},r.onreadystatechange=function(){4==r.readyState&&200==r.status&&t(JSON.parse(r.responseText))}})}},{}],4:[function(e,t,n){function r(e,t,n){return e>=t&&e<n}function o(e,t){var n=parseInt(e.current_observation.feelslike_f),r=e.hourly_forecast.slice(0,t).map(function(e){return parseInt(e.temp.english)}),o=r.reduce(function(e,t){return e+t})/t,i=o-n,c={2:"very cold",3:"cold",4:"chilly",5:"cool",6:"nice",7:"really nice",8:"hot",9:"very hot"},u=function(e){var t=Math.floor(e/10);return t<2?c[2]:t>9?c[9]:c[t]}(n),a=function(e){return e>8?"get much warmer":e>3?"get warmer":Math.abs(e)<=3?"stay "+u:e<-3?"get cooler":"get much cooler"}(i),f="It's going to ";return f+=a,f+="."}function i(e,t){var n=parseInt(e.current_observation.wind_mph),o=e.hourly_forecast.slice(0,t).map(function(e){return parseInt(e.wspd.english)}),i=o.reduce(function(e,t){return e+t})/t,c=i-n,u=function(e){return e>=20?"really windy":r(e,10,20)?"windy":r(e,5,10)?"breezy":"calm"}(n),a=function(e){return e>10?"get much windier":e>5?"get windier":Math.abs(e)<=5?"stay "+u:e<-5?"get calmer":"get much calmer"}(c),f="It's going to ";return f+=a,f+="."}function c(e,t){var n=e.hourly_forecast.slice(0,t),o=n.map(function(e){return parseInt(e.pop)}),i=n.map(function(e){return parseInt(e.fctcode)}),c=Math.max.apply(Math,_toConsumableArray(o)),u=Math.max.apply(Math,_toConsumableArray(i));[10,12,14,18,20,22].map(function(e){return u===e}).reduce(function(e,t){return e&&t})&&u++;var a=(e.current_observation.icon,function(e){return e>=80?"It will be wet":r(e,40,80)?"There's a good chance of precipitation":r(e,10,40)?"There's a slight chance of precipitation":"It will be dry"}(c)),f=a;return f+="."}n.getData=function(e,t){return new Promise(function(n){var r={};r.loc=e.current_observation.display_location.city,r.f=e.current_observation.feelslike_f,r.c=e.current_observation.feelslike_c,r.tempStr=o(e,t),r.windStr=i(e,t),r.precipStr=c(e,t),n(r)})}},{}]},{},[1]);