var { Open, negotiate } = require('./StarController');

exports.home = Open((res, ctx) => {
  negotiate({
    html: () => {
      res.render('lobby/home', { title: "", data: {}});
    }, api: (v) => {
      
    }}, ctx);
});

exports.socket = function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(JSON.stringify({
      t: "n",
      d: 1,
      r: 0
    }));
  });
};
