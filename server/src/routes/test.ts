import express from 'express';

export = (() => {
  const router = express.Router();
  // router.use(async (req, res, next) => {
  // });

  router.get('/', async (req: express.Request, res: express.Response) => {
    try {
      res.send({
        status: true,
        message: ' ようこそ Friend!'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  return router;
})();
