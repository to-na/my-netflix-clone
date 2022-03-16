import cookie from 'cookie';

const MAX_AGE = 60 * 60 * 24 * 7;
export const setTokenCookie = (token, res) => {
  const setCookie = cookie.serialize('token', token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  res.setHeader('Set-Cookie', setCookie);
};
