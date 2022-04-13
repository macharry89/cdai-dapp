import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const TESTNET_CHAINID = 42;
const TESTNET_RPC = 'https://kovan.infura.io/v3/';
const TESTNET_NAME = 'Kovan Test Network';

// const TESTNET_CHAINID = 3;
// const TESTNET_RPC = 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
// const TESTNET_NAME = 'Roppsten Test Network';

const MAINNET_CHAINID = 1;
const MAINNET_RPC =
  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const MAINNET_NAME = 'Ethereum Network';

export const NETWORK_CHAINID = TESTNET_CHAINID;
export const NETWORK_RPC = TESTNET_RPC;
export const NETWORK_NAME = TESTNET_NAME;

export const SUPPORTED_CHAINIDS = [TESTNET_CHAINID];

export const INJECTED_CONNECTOR = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINIDS,
});

export const WALLETCONNECT_CONNECTOR = new WalletConnectConnector({
  bridge: 'https://bridge.walletconnect.org',
  chainId: TESTNET_CHAINID,
  clientMeta: {
    description: 'cDAI Bond on Kovan for dApp challenge!',
    icons: ['https://app.benqi.fi/svgs/qi_black_text.svg'],
    name: 'BENQI',
    url: 'https://app.benqi.fi',
  },
  rpc: {
    [TESTNET_CHAINID]: TESTNET_RPC,
  },
  supportedChainIds: [TESTNET_CHAINID],
});

export type Connector = 'Injected' | 'WalletConnect';
