export function anonPoolSeek(pool) {
  return $.ajax({
    method: 'POST',
    url: '/setup/hook/' + window.star.StrongSocket.sri,
    data: {
      time: pool.lim
    }
  });
}
