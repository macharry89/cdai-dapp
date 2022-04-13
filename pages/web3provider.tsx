import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import { FC } from 'react';
import { UserContextProvider } from '../contexts/UserContext';

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');

interface Props {
  getLibrary: any;
}

  const Web3ReactProviderDefaultSSR: FC<Props> = ({ children, getLibrary }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Web3ReactProviderDefaultSSR;