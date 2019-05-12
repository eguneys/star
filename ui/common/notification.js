"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function notify(msg) {}

function _default(msg) {
  if (document.hasFocus() || !('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    setTimeout(notify, 10 + Math.random() * 500, msg);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (p) {
      if (p === 'granted') notify(msg);
    });
  }
}