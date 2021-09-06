// recuperamos todos los clientes

const { executeQuery } = require('../helpers');

// const getAll = () => {
//   return new Promise((resolve, reject) => {
//     db.query('select * from clients', (err, result) => {
//       if (err) return reject(err);
//       resolve(result);
//     });
//   });
// };

const getAll = () => {
  return executeQuery('select * from clients');
};

// crear un cliente en la BS

// const create = ({ name, email, address, phone }) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       'insert into clients (name, email, address, phone) values (?,?,?,?)',
//       [name, email, address, phone],
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }
//     );
//   });
// };

const create = ({ name, email, address, phone }) => {
  return executeQuery(
    'insert into clients (name, email, address, phone) values (?,?,?,?)',
    [name, email, address, phone]
  );
};

// metodo para obtener por userId

const getByUserId = (userId) => {
  return executeQuery('select * from clients where user_id = ?', [userId]);
};

module.exports = {
  getAll,
  create,
  getByUserId,
};
