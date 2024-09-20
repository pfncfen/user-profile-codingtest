import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

const db = require('../db/db');

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/profile', (_, res) =>
  db.query('SELECT * FROM user WHERE id = 1 LIMIT 1', [], function (results: any) {
    res.json({ results });
  }),
);

router.post('/profile', (req, res) => {
  db.query(
    `UPDATE user SET username = '${req.body.username}', email = '${req.body.email}', phone = '${req.body.phone}' WHERE id = 1`,
    [],
    function () {
      res.send('OK');
    },
  );
});

export default router;
