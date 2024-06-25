import express from 'express';

const router = express.Router();

router.get('/', function (req, res, next) {
   res.json({
      status: 'OK',
      message: 'Welcome to the API of sunshade.',
   });
});

export default router;
