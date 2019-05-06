var { Open, negotiate } = require('./StarController');

exports.home = Open((res, ctx) => {
  negotiate({
    html: () => {
      res.render('lobby/home', { title: "", data: {}});
    }, api: (v) => {
      
    }}, ctx);
});

exports.socket = function(ws, req) {
  console.log(ws);
  ws.on('message', function(msg) {
    // ws.send(msg);
  });
};
