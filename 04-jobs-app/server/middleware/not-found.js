const notFound = async (req, res) =>
  res.status(404).send("Route doesn not exist");

module.exports = notFound;
