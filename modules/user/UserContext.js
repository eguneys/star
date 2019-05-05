class BaseUserContext {
  constructor(req, me) {
    this.req = req;
    this.me = me;
  }
}

class BodyUserContext extends BaseUserContext {
  constructor(body, m) {
    super(body, m);
  }
  
}

exports.UserContext = (req, me) => new BodyUserContext(req, me);
