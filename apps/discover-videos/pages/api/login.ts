import { isNewUser } from '../../lib/db/hasura';
import jwt from 'jsonwebtoken';
import { magicAdmin } from '../../lib/magic';

export default async function login(req, res) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : '';
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );
      const isNewUserQuery = await isNewUser(token, metadata.issuer);
      res.send({ done: true, isNewUserQuery });
    } catch (error) {
      console.error('Error in login', error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}