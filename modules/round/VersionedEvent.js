function VersionedEvent(version, typ, encoded) {
  this.version = version;
  this.typ = typ;
  this.decoded = encoded;

  this.jsFor = (m) => {
    if (visibleBy(m)) {
      return {
        v: this.version,
        t: this.typ,
        d: decodedFor(m)
      };
    } else return { v: this.version };
  };

  var decodedFor = (m) => {
    return this.decoded;
  };

  var visibleBy = (m) => {
    return true;
  };
}

module.exports = {
  apply(e, version) {
    return new VersionedEvent(
      version,
      e.typ,
      e.data
    );
  }
};
