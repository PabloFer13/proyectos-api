module.exports = function created(data) {
  const req = this.req;
  const res = this.res;
  const sails = req._sails;
  sails.log.silly(`res.created() :: Sending 201 ("CREATED") response: ${JSON.stringify(data)}`);
  res.status(201);
  res.send(data);
};
