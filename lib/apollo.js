import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Websocket from 'isomorphic-ws';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';

import auth0 from '../lib/Auth0/auth0';

let apolloClient = null;

const isBrowser = typeof window !== 'undefined';

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
// eslint-disable-next-line import/prefer-default-export
export default function withApollo(PageComponent, { ssr = false } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      // eslint-disable-next-line no-console
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree, req } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      // eslint-disable-next-line no-multi-assign
      const apolloClient = (ctx.apolloClient = initApolloClient({}, req));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            // eslint-disable-next-line no-console
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState, req) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, req);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, req) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient

  // Custom Auth link that fetches the access_token from local and supplies it with every request.
  const authLink = setContext(async (_, { headers }) => {
    // If we already have an accessToken, there is no need to try and fetch one.
    // (This is because server side reqeusts already include the cookie, no need to fetch it again.)
    // Client-side request dont have access to httpOnly cookies, and require an accessor
    // like /api/getToken

    // If there is a req object, try to pull the access token from it.
    if (req) {
      const { accessToken } = await auth0.getSession(req);

      return {
        headers: {
          ...headers,
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    }

    const response = await fetch(`${process.env.DEPLOYED_URI}/api/getToken`, {
      credentials: 'same-origin',
    });
    const authStr = await response.text();
    const { accessToken } = JSON.parse(authStr);
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: `${process.env.GRAPHQL_ENDPOINT}`,
    credentials: 'include',
    fetch: fetch,
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: `${process.env.WEBSOCKET_ENDPOINT}`,
        options: {
          reconnect: true,
        },
        webSocketImpl: Websocket,
      })
    : null;

  /*
      running process.browser ternary check because wsLink should only be used in the browser. 
      Per https://github.com/apollographql/subscriptions-transport-ws/issues/333
    */

  const link = process.browser
    ? split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    ssrMode: isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(link),
    connectToDevTools: isBrowser,
    cache: new InMemoryCache().restore(initialState),
    resolvers: {},
  });
}
