import React, { ReactNode } from 'react';
import { Provider, createClient } from 'urql';

type Props = { children: ReactNode }

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

export default ({ children }: Props) => {
  return (
    <Provider value={client}>
      { children }
    </Provider>
  );
};
