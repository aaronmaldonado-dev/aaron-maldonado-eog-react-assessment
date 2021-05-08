import React, { ReactNode } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Provider, defaultExchanges, subscriptionExchange, createClient } from 'urql';

type Props = { children: ReactNode }

const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {
  reconnect: true,
});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

export default ({ children }: Props) => {
  return (
    <Provider value={client}>
      { children }
    </Provider>
  );
};
