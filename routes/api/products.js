const router = require('express').Router();

const { json } = require('express');
const {
  getAll,
  getById,
  create,
  getByCategory,
  update,
  remove,
} = require('../../models/product.model');

// GET
// GET http://localhost:3000/api/products?page=2&limit=5

router.get('/v2', async (req, res) => {
  try {
    const result = await getAll();
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Ejercicio : GET localhost:3000/api/products/cat/NBCAT
router.get('/cat/:category', (req, res) => {
  getByCategory(req.params.category)
    .then((result) => {
      // res.json(result.map((product) => product.name));
      res.json(result);
    })
    .catch((error) => res.json({ error: error.message }));
});

router.get('/:productID', async (req, res) => {
  try {
    const result = await getById(req.params.productID);
    if (result) {
      res.json(result);
    } else {
      res.json({ error: 'El producto no existe en la base de datos' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// POST

router.post('/', async (req, res) => {
  //Insertar los datos dentro de la BD
  try {
    const result = await create(req.body);
    const product = await getById(result.insertId);
    res.json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// PUT

router.put('/:productId', (req, res) => {
  update(req.params.productId, req.body)
    .then((result) => {
      getById(productId)
        .then((result) => res.json(result))
        .catch((error) => res.json({ error: error.message }));
    })
    .catch((error) => res.json({ error: error.message }));
});

// DELETE

router.delete('/:productId', (req, res) => {
  remove(req.params.productId)
    .then((result) => res.json(result))
    .catch((error) => res.json({ error: error.message }));
});

module.exports = router;
