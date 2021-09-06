const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../helpers');

const { create, getByEmail } = require('../../models/users.model');

// Post de Register

router.post(
  '/register',
  body('username', ' Debes incluir un username con mas de 3 caracteres')
    .exists()
    .isLength({ min: 3 }),

  body('password', ' La contraseña tiene que tener entre 3 y 10 caracteres')
    .exists()
    .isLength({ min: 4, max: 10 })
    .custom((value) => {
      const regex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,/\\!@#$%^&*])(?=.{8,})'
      );
      return regex.test(value);
    }),

  body('email', 'Debes incluir un email correcto').exists().isEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const user = await getByEmail(req.body.email);
    if (user) {
      return res.json({ error: 'Error en el registro. Revisa los datos' });
    }

    const passwordEnc = bcrypt.hashSync(req.body.password, 10);
    req.body.password = passwordEnc;

    const result = await create(req.body);
    res.send(result);
  }
);

// POST de login
router.post('/login', async (req, res) => {
  // req.body--email, password});
  const user = await getByEmail(req.body.email);
  if (!user) {
    return res.json({ error: 'Erro en usuario y/o contraseña 1' });
  }

  const equal = bcrypt.compareSync(req.body.password, user.password);
  if (equal) {
    res.json({
      success: 'Login correcto',
      token: createToken(user),
    });
  } else {
    return res.json({ error: 'Erro en usuario y/o contraseña 2' });
  }
});
module.exports = router;
