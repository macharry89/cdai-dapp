import '../styles/globals.scss'
import '../styles/ActionButton.scss';
import '../styles/ConnectModal.scss';
import '../styles/GlowBorderedCard.scss';
import '../styles/Loader.scss';
import '../styles/Home.scss'
import '../styles/AfterTransactionModal.scss';
import '../styles/CurrencyInput.scss';
import '../styles/Header.scss';
import '../styles/WalletPanel.scss';

import type { AppProps } from 'next/app'
import { Web3Provider } from '@ethersproject/providers';
import dynamic from 'next/dynamic';

const Web3ReactProviderDefault = dynamic(
  () => import('./web3provider'),
  { ssr: false }
)

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
};

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <Web3ReactProviderDefault getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProviderDefault>
  )
}

export default MyApp
