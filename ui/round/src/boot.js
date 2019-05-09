export default function(opts) {
  const star = window.star;
  const element = document.querySelector('.round__app');
  const data = opts.data;
  let round;
  star.socket = star.StrongSocket(
    data.url.socket,
    data.player.version, {
      options: { name: 'round' },
      params: {},
      receive(t, d) { round.socketReceive(t, d); },
      events: {
      }
    }
  );

  opts.element = element;
  opts.socketSend = star.socket.send;
  round = (window['StarRound']).app(opts);
}
