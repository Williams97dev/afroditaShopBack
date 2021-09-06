const { executeQuery, executeQueryUnique } = require('../helpers');

// Recupero todos los productos

const getAll = (page, limit) => {
  return executeQuery('select*from products limit ? offset ?', [
    limit,
    limit * (page - 1),
  ]);
};

// page: 1,2,3,4,5,6
// limit: 5
// offset: limit * (page-1)

//Recupero el producto por ID

const getById = (productId) => {
  return executeQueryUnique('select * from products where id = ?', [productId]);
};

// Filtramos por categoria

const getByCategory = (category) => {
  const prom = new Promise((resolve, reject) => {
    db.query(
      'select * from products where category = ?',
      [category],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
  return prom;
};

// Inserta nuevo registro en la BD
// insert into products (name, description, price, category, available, create_at) values(...)

const create = ({ name, description, price, category }) => {
  return executeQuery(
    'insert into products (name, description, price, category, available, created_at) values(?,?,?,?,?,?)',
    [name, description, price, category, true, new Date()]
  );
};

// Editar un producto en la BD
// update products set name = ''; description = '', price = , category = '', where id = XX

const update = (id, { name, description, price, category }) => {
  return new Promise((resolve, reject) => {
    db.query(
      'update products set name = ?, description = ?, price = ? , category = ? where id = ?',
      [name, description, price, category, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Borrar un producto de la base de datos con el ID

const remove = (productId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'delete from products where id = ?',
      [productId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Recuperamos los productos por cliente

const getByClient = (clientId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT p.* FROM products p, tbi_clients_products tbi WHERE p.id = tbi.product_id AND tbi.client_id = ?',
      [clientId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  getAll,
  getById,
  getByCategory,
  create,
  update,
  remove,
  getByClient,
};
