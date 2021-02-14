import auth0 from '../../lib/Auth0/auth0';

export default async function session(req, res) {
  try {
    const data = await auth0.getSession(req);
    const authCreds = JSON.stringify(data);
    res.status(200).end(authCreds);
  } catch (error) {
    console.error('in getToken', error);
    res.status(error.status || 500).end(error.message);
  }
}
