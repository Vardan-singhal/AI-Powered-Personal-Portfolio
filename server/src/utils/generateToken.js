const { signAccess, signRefresh } = require('../config/jwt');
module.exports = function generateTokens(user) {
  const payload = { id: user._id.toString(), role: user.role };
  return { accessToken: signAccess(payload), refreshToken: signRefresh(payload) };
};
