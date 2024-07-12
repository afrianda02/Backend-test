const members = require('../models/Member');

exports.getMembers = (req, res) => {
  res.json(members);
};
