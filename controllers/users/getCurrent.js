const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL = null } = req.user;
  res.json({
    email,
    subscription,
    avatarURL,
  });
};

module.exports = getCurrent;
