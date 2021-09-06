const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

// Funcion de ayuda para ejecutar las Querys

function executeQuery(query, arrParams = []) {
  return new Promise((resolve, reject) => {
    db.query(query, arrParams, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// Funcion de ayuda para solo recuperar un valor del resultado de la Querry

function executeQueryUnique(query, arrParams = []) {
  return new Promise((resolve, reject) => {
    db.query(query, arrParams, (err, result) => {
      if (err) return reject(err);
      if (result.length !== 1) return resolve(null);
      resolve(result[0]);
    });
  });
}

// crear token

function createToken(user) {
  const payload = {
    user_id: user.id,
    expired_at: dayjs().add(5, 'minutes').unix(),
    created_at: dayjs().unix(),
    role: user.role,
  };
  return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = {
  executeQuery,
  executeQueryUnique,
  createToken,
};
