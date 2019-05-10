function notify(msg) {
}

export default function(msg) {
  if (document.hasFocus() || !('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    setTimeout(notify, 10 + Math.random() * 500, msg);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(p => {
      if (p === 'granted') notify(msg);
    });
  }
}
