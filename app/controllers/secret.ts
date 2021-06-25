function secret(req, res) {
  // Since this is an authenticated route, the user is available
  const user = req.user;
  res.send({ secret: `You're authenticated as user #${user.id}!` });
}

module.exports = secret;
