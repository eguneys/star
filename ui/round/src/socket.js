export function make(send, ctrl) {

  const handlers = {
  };

  return {
    send,
    handlers,
    receive(typ, data) {
      if (handlers[typ]) {
        handlers[typ](data);
        return true;
      }
      return false;
    }
  };

}
