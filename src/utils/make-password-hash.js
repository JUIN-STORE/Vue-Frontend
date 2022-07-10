function makePasswordHash(password) {
  const bcrypt = require('bcryptjs');
  return bcrypt.hashSync(password);
}

export { makePasswordHash };
