import auth0 from '../../lib/Auth0/auth0';

export default async function session(req, res) {
  try {
    const data = await auth0.getSession(req);
    // console.log('getToken', data.accessToken);
    // const accessToken = data.accessToken;

    // const userObj = await Object.values(data)[0];
    // const token = await Object.values(userObj)[2];
    // const authObj = await { accessToken: data.accessToken, token: token };

    res.send(data);
    res.status(200).end(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
