function secret(req, res) {
  // Since this is an authenticated route, the userId is available
  const _userId = req.userId;
  res.send({ secret: "You're authenticated!" });
}

module.exports = secret;
