import jwt from 'jsonwebtoken';

export function requireLogin(req, res, next) {
   if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No credentials sent!' });
   }

   const token = req.headers.authorization.split(' ')[1];

   try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
   } catch (error) {
      return res.status(401).json({ error: 'Invalid token!' });
   }
}