import fetch from 'isomorphic-unfetch';

import '../styles/styles.css';
import { AuthProvider } from '../components/AuthProvider';

// this is to wake the server up as soon as the app loads
// fetch(`${process.env.GRAPHQL_ENDPOINT}`);

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
