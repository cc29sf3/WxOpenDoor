class JWTPayload {

  /**
   * encoded JSONWebToken
   */
  constructor(token) {
    this.payload = this.decodePayload(token);
  }

  decodePayload(token) {
    try {
      let payloadEncoded = token.split('.')[1];
      let buffer = wx.base64ToArrayBuffer(payloadEncoded);
      let payloadDecoded = String.fromCharCode.apply(null, new Uint8Array(buffer));
      return JSON.parse(payloadDecoded)
    } catch (err) {
      console.error(err);
      return null
    }
  }

  isValid() {
    try {
      if (this.payload && this.payload.exp) {
        let timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log(timestamp)
        return this.payload.exp > timestamp;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  }
  
}
module.exports = JWTPayload