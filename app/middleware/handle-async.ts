function handleAsync(middleware) {
  return (req, res, next) => {
    const result = middleware(req, res, next);
    return Promise.resolve(result).catch(next);
  };
}

module.exports = handleAsync;
