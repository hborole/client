import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <>
      <h1>Header {currentUser?.email}</h1>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
