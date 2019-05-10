function makeAckable(send) {
  var currentId = 1;

  var messages = [];

  function resend() {
    var resendCutoff = Date.now() - 2500;
    messages.forEach(function(m) {
      if (m.at < resendCutoff) send(m.t, m.d);
    });
  }

  setInterval(resend, 1000);

  return {
    resend: resend,
    register: function(t, d) {
      d.a = currentId++;
      messages.push({
        t: t,
        d: d,
        at: Date.now()
      });
    },
    gotAck: function(id) {
      messages = messages.filter(function(m) {
        return m.d.a !== id;
      });
    }
  };
}

star.StrongSocket = function(url, version, settings) {
  var now = Date.now;

  settings = $.extend(true, {}, star.StrongSocket.defaults, settings);
  var options = settings.options;
  var ws;
  var pingSchedule;
  var connectSchedule;
  var ackable = makeAckable(function(t, d){ send(t, d); });
  var lastPingTime = now();
  var pongCount = 0;
  var averageLag = 0;
  var pingTries = 0;
  var tryOtherUrl = false;
  var autoReconnect = true;
  var nbConnects = 0;
  var storage = star.storage.make('surl6');

  var connect = function() {
    destroy();
    autoReconnect = true;
    var params = $.param(settings.params);
    if (version !== false) params += (params ? '&' : '')+ 'v=' + version;
    var fullUrl = options.protocol + '//' + baseUrl() + url + '?' + params;
    debug("connection attempt to " + fullUrl);
    try {
      ws = new WebSocket(fullUrl);
      ws.onerror = function(e) {
        onError(e);
      };
      ws.onclose = function(e) {
        if (autoReconnect) {
          debug("Will autoreconnect in " + options.autoReconnectDelay);
          scheduleConnect(options.autoReconectDelay);
        }
      };
      ws.onopen = function() {
        debug("connected to " + fullUrl);
        onSuccess();
        $("body").removeClass("offline").addClass("online");
        pingNow();
        ackable.resend();
      };
      ws.onmessage = function(e) {
        if (e.data === 0) { pong(); return; }
        var m = JSON.parse(e.data);
        if (m.t === 'n') pong();
        if (m.t === 'b') m.d.forEach(handle);
        else handle(m);
      };
    } catch (e) {
      onError(e);
    }
    scheduleConnect(options.pingMaxLag);
  };

  var send = function(t, d, o, noRetry) {
    o = o || {};
    var msg = { t: t };
    if (d !== undefined) {
      if (o.withLag) d.l = Math.round(averageLag);
      if (o.millis >= 0) d.s = Math.round(o.millis * 0.1).toString(36);
      msg.d = d;
    }
    if (o.ackable) {
      msg.d = msg.d || {};
      ackable.register(t, msg.d);
    }
    var message = JSON.stringify(msg);
    debug("send " + message);
    try {
      ws.send(message);
    } catch (e) {
      if (!noRetry) setTimeout(function() {
        send(t, msg.d, o, true);
      }, 1000);
    }
  };

  var scheduleConnect = function(delay) {
    if (options.idle) delay = 10 * 1000 + Math.random() * 10 * 1000;
    clearTimeout(pingSchedule);
    clearTimeout(connectSchedule);
    connectSchedule = setTimeout(function() {
      $('body').addClass('offline').removeClass('online');
      tryOtherUrl = true;
      connect();
    }, delay);
  };
  var schedulePing = function(delay) {
    clearTimeout(pingSchedule);
    pingSchedule = setTimeout(pingNow, delay);
  };
  var pingNow = function() {
    clearTimeout(pingSchedule);
    clearTimeout(connectSchedule);
    var pingData = (options.isAuth && pongCount % 8 == 2) ? JSON.stringify({
      t: 'p',
      l: Math.round(0.1 * averageLag),
      v: version
    }) : null;
    try {
      ws.send(pingData);
      lastPingTime = now();
    } catch (e) {
      debug(e, true);
    }
    if (pingTries < options.pingMaxTries) {
      pingTries++;
      schedulePing(computePingDelay());
    } else {
      pingTries = 0;
      scheduleConnect(options.pingMaxLag);
    }
  };
  var computePingDelay = function() {
    return options.pingDelay + (options.idle ? 1000 : 0);
  };
  var pong = function() {
    clearTimeout(connectSchedule);
    schedulePing(computePingDelay());
    var currentLag = Math.min(now() - lastPingTime, 10000);
    pongCount++;
    
    var mix = pongCount > 4 ? 0.1 : 1 / pongCount;
    averageLag += mix * (currentLag - averageLag);
  };
  var handle = function(m) {
    if (m.v) {
      if (m.v <= version) {
        debug("already has event " + m.v);
        return;
      }
      if (m.v > version + 1) {
        star.reload(); 
        return;
      }
      version = m.v;
    }
    switch(m.t || false) {
    case false:
      break;
    case 'resync':
      star.reload();
      break;
    case 'ack':
      ackable.gotAck(m.d);
      break;
    default:
      var processed = settings.receive && settings.receive(m.t, m.d);
      if (!processed && settings.events[m.t]) settings.events[m.t](m.d || null, m);
    }
  };
  var debug = function(msg, always) {
    if (always || options.debug) {
      console.debug("[" + options.name + " " + settings.params.sri + "]", msg);
    }
  };
  var destroy = function() {
    clearTimeout(pingSchedule);
    clearTimeout(connectSchedule);
    disconnect();
    ws = null;
  };
  var disconnect = function(onNextConnect) {
    if (ws) {
      debug("Disconnect");
      autoReconnect = false;
      ws.onerror = ws.onclose = ws.onopen = ws.onmessage = $.noop;
      ws.close();
    }
    if (onNextConnect) options.onNextConnect = onNextConnect;
  };
  var onError = function(e) {
    options.debug = true;
    debug('error: ' + JSON.stringify(e));
    tryOtherUrl = true;
    clearTimeout(pingSchedule);
  };
  var onSuccess = function() {
    nbConnects++;
    if (nbConnects === 1) {
      options.onFirstConnect();
    }
  };
  var baseUrl = function() {
    var urls = options.baseUrls, url = storage.get();
    if (!url) {
      url = urls[0];
      storage.set(url);
    } else if (tryOtherUrl) {
      tryOtherUrl = false;
      url = urls[(urls.indexOf(url) + 1) % urls.length];
      storage.set(url);
    }
    return url;
  };

  connect();
  window.addEventListener('unload', destroy);

  return {
    connect,
    disconnect,
    send,
    destroy,
    options,
    pingInterval: function() {
      return computePingDelay() + averageLag;
    },
    averageLag: function() {
      return averageLag;
    },
    getVersion: function() {
      return version;
    }
  };
};

star.StrongSocket.sri = Math.random().toString(36).slice(2, 12);

star.StrongSocket.defaults = {
  events: {
  },
  params: {
    sri: star.StrongSocket.sri
  },
  options: {
    name: 'unnamed',
    idle: false,
    pingMaxLag: 9000,
    pingMaxTries: 5,
    pingDelay: 2500,
    autoReconnectDelay: 3500,
    protocol: location.protocol === 'https:' ? 'wss:' : 'ws:',
    baseUrls: (function(d) {
      return [d].concat((d === 'socket.oyunkeyf.net' || d === 'socket.o.com' ? [1, 2] : []).map(function(port) {
        return d + ':' + (9020 + port);
      }));
    })(document.body.getAttribute('data-socket-domain')),
    onFirstConnect: $.noop
  }
};
