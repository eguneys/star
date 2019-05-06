(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Star = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

require("./standalones/util");

require("./standalones/trans");

},{"./standalones/trans":2,"./standalones/util":3}],2:[function(require,module,exports){
"use strict";

star.trans = function (i18n) {
  var format = function format(str, args) {
    if (args.length && str.includes('$s')) for (var i = 1; i < 4; i++) {
      str = str.replace('%' + i + '$s', args[i - 1]);
    }
    args.forEach(function (arg) {
      str = str.replace('%s', arg);
    });
    return str;
  };

  var list = function list(str, args) {
    var segments = str.split(/(%(?:\d\$)?s)/g);

    for (var i = 1; i <= args.length; i++) {
      var pos = segments.indexOf('%' + i + '$s');
      if (pos !== -1) segments[pos] = args[i - 1];
    }

    for (var i = 0; i < args.length; i++) {
      var pos = segments.indexOf('%s');
      if (pos === -1) break;
      segments[pos] = args[i];
    }

    return segments;
  };

  var trans = function trans(key) {
    var str = i18n[key];
    return str ? format(str, Array.prototype.slice.call(arguments, 1)) : key;
  };

  trans.noarg = function (key) {
    // optimisation for translations without arguments
    return i18n[key] || key;
  };

  trans.vdom = function (key) {
    var str = i18n[key];
    return str ? list(str, Array.prototype.slice.call(arguments, 1)) : [key];
  };

  return trans;
};

},{}],3:[function(require,module,exports){
"use strict";

window.star = window.star || {};

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvc3RhbmRhbG9uZXMvdHJhbnMuanMiLCJzcmMvc3RhbmRhbG9uZXMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7Ozs7O0FDREEsSUFBSSxDQUFDLEtBQUwsR0FBYSxVQUFTLElBQVQsRUFBZTtBQUMxQixNQUFJLE1BQU0sR0FBRyxTQUFULE1BQVMsQ0FBUyxHQUFULEVBQWMsSUFBZCxFQUFvQjtBQUMvQixRQUFJLElBQUksQ0FBQyxNQUFMLElBQWUsR0FBRyxDQUFDLFFBQUosQ0FBYSxJQUFiLENBQW5CLEVBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxDQUFwQixFQUF1QixDQUFDLEVBQXhCO0FBQ0UsTUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxNQUFNLENBQU4sR0FBVSxJQUF0QixFQUE0QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUwsQ0FBaEMsQ0FBTjtBQURGO0FBRUYsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUFhLFVBQVMsR0FBVCxFQUFjO0FBQ3pCLE1BQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksSUFBWixFQUFrQixHQUFsQixDQUFOO0FBQ0QsS0FGRDtBQUdBLFdBQU8sR0FBUDtBQUNELEdBUkQ7O0FBU0EsTUFBSSxJQUFJLEdBQUcsU0FBUCxJQUFPLENBQVMsR0FBVCxFQUFjLElBQWQsRUFBb0I7QUFDN0IsUUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUosQ0FBVSxnQkFBVixDQUFmOztBQUNBLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLElBQUksSUFBSSxDQUFDLE1BQTFCLEVBQWtDLENBQUMsRUFBbkMsRUFBdUM7QUFDckMsVUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsTUFBTSxDQUFOLEdBQVUsSUFBM0IsQ0FBVjtBQUNBLFVBQUksR0FBRyxLQUFLLENBQUMsQ0FBYixFQUFnQixRQUFRLENBQUMsR0FBRCxDQUFSLEdBQWdCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBTCxDQUFwQjtBQUNqQjs7QUFDRCxTQUFLLElBQUksQ0FBQyxHQUFHLENBQWIsRUFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUF6QixFQUFpQyxDQUFDLEVBQWxDLEVBQXNDO0FBQ3BDLFVBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFULENBQWlCLElBQWpCLENBQVY7QUFDQSxVQUFJLEdBQUcsS0FBSyxDQUFDLENBQWIsRUFBZ0I7QUFDaEIsTUFBQSxRQUFRLENBQUMsR0FBRCxDQUFSLEdBQWdCLElBQUksQ0FBQyxDQUFELENBQXBCO0FBQ0Q7O0FBQ0QsV0FBTyxRQUFQO0FBQ0QsR0FaRDs7QUFjQSxNQUFJLEtBQUssR0FBRyxTQUFSLEtBQVEsQ0FBUyxHQUFULEVBQWM7QUFDeEIsUUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUQsQ0FBZDtBQUNBLFdBQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFELEVBQU0sS0FBSyxDQUFDLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkIsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBTixDQUFULEdBQTJELEdBQXJFO0FBQ0QsR0FIRDs7QUFLQSxFQUFBLEtBQUssQ0FBQyxLQUFOLEdBQWMsVUFBUyxHQUFULEVBQWM7QUFDMUI7QUFDQSxXQUFPLElBQUksQ0FBQyxHQUFELENBQUosSUFBYSxHQUFwQjtBQUNELEdBSEQ7O0FBSUEsRUFBQSxLQUFLLENBQUMsSUFBTixHQUFhLFVBQVMsR0FBVCxFQUFjO0FBQ3pCLFFBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFELENBQWQ7QUFDQSxXQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRCxFQUFNLEtBQUssQ0FBQyxTQUFOLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLENBQTJCLFNBQTNCLEVBQXNDLENBQXRDLENBQU4sQ0FBUCxHQUF5RCxDQUFDLEdBQUQsQ0FBbkU7QUFDRCxHQUhEOztBQUlBLFNBQU8sS0FBUDtBQUNELENBdENEOzs7OztBQ0FBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsTUFBTSxDQUFDLElBQVAsSUFBZSxFQUE3QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAnLi9zdGFuZGFsb25lcy91dGlsJztcbmltcG9ydCAnLi9zdGFuZGFsb25lcy90cmFucyc7XG4iLCJzdGFyLnRyYW5zID0gZnVuY3Rpb24oaTE4bikge1xuICB2YXIgZm9ybWF0ID0gZnVuY3Rpb24oc3RyLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoICYmIHN0ci5pbmNsdWRlcygnJHMnKSlcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNDsgaSsrKVxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSgnJScgKyBpICsgJyRzJywgYXJnc1tpIC0gMV0pO1xuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbihhcmcpIHtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKCclcycsIGFyZyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcbiAgdmFyIGxpc3QgPSBmdW5jdGlvbihzdHIsIGFyZ3MpIHtcbiAgICB2YXIgc2VnbWVudHMgPSBzdHIuc3BsaXQoLyglKD86XFxkXFwkKT9zKS9nKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcG9zID0gc2VnbWVudHMuaW5kZXhPZignJScgKyBpICsgJyRzJyk7XG4gICAgICBpZiAocG9zICE9PSAtMSkgc2VnbWVudHNbcG9zXSA9IGFyZ3NbaSAtIDFdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwb3MgPSBzZWdtZW50cy5pbmRleE9mKCclcycpO1xuICAgICAgaWYgKHBvcyA9PT0gLTEpIGJyZWFrO1xuICAgICAgc2VnbWVudHNbcG9zXSA9IGFyZ3NbaV07XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50cztcbiAgfTtcblxuICB2YXIgdHJhbnMgPSBmdW5jdGlvbihrZXkpIHtcbiAgICB2YXIgc3RyID0gaTE4bltrZXldO1xuICAgIHJldHVybiBzdHIgPyBmb3JtYXQoc3RyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSA6IGtleTtcbiAgfTtcblxuICB0cmFucy5ub2FyZyA9IGZ1bmN0aW9uKGtleSkge1xuICAgIC8vIG9wdGltaXNhdGlvbiBmb3IgdHJhbnNsYXRpb25zIHdpdGhvdXQgYXJndW1lbnRzXG4gICAgcmV0dXJuIGkxOG5ba2V5XSB8fCBrZXk7XG4gIH07XG4gIHRyYW5zLnZkb20gPSBmdW5jdGlvbihrZXkpIHtcbiAgICB2YXIgc3RyID0gaTE4bltrZXldO1xuICAgIHJldHVybiBzdHIgPyBsaXN0KHN0ciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkgOiBba2V5XTtcbiAgfTtcbiAgcmV0dXJuIHRyYW5zO1xufTtcbiIsIndpbmRvdy5zdGFyID0gd2luZG93LnN0YXIgfHwge307XG4iXX0=
