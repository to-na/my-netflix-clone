import { findVideoIdByUser } from '../../lib/db/hasura';
import jwt from 'jsonwebtoken';

export default async function stats(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(403).send({}); //.send({ done: false });
      } else {
        const videoId = req.query.videoId;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.issuer;
        const findVideoById = await findVideoIdByUser(token, userId, videoId);
        res.send({ cookies: req.cookies, decodedToken, findVideoById });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ done: false, error: error?.message });
    }
  }
}
