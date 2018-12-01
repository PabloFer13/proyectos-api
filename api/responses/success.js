module.exports = function success(data) {
  const req = this.req;
  const res = this.res;
  const sails = req._sails;
  sails.log.silly(`res.success() :: Sending 200 ("OK") response: ${JSON.stringify(data)}`);
  res.status(200);
  res.send(data);
};
