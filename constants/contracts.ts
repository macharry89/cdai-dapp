import DAIABI from './ABI/dai.json';
import CDAIABI from './ABI/cdai.json';

export const ROPSTEN_DAI_ADDRESS = "0x31F42841c2db5173425b5223809CF3A38FEde360";
export const ROPSTEN_CDAI_ADDRESS = "0xbc689667C13FB2a04f09272753760E38a95B998C";
export const ROPSTEN_DELEGATOR_ADDRESS = "0xbc689667c13fb2a04f09272753760e38a95b998c";

export const KOVAN_DAI_ADDRESS = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";
export const KOVANN_CDAI_ADDRESS = "0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD";
export const KOVAN_DELEGATOR_ADDRESS = "0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD";

export const DAI_ADDRESS = KOVAN_DAI_ADDRESS;
export const CDAI_ADDRESS = KOVANN_CDAI_ADDRESS;
export const DELEGATOR_ADDRESS = KOVAN_DELEGATOR_ADDRESS;

export const DAI_DECIMALS = 18;
export const CDAI_DECIMALS = 8;

export type Asset = 'DAI' | 'cDAI';

export const ASSET_LIST: {
  [key in Asset]: {
    address: string;
    abi: any;
    decimals: number;
  };
} = {
  DAI: {
    address: DAI_ADDRESS,
    decimals: DAI_DECIMALS,
    abi: DAIABI,
  },
  cDAI: {
    address: CDAI_ADDRESS,
    decimals: CDAI_DECIMALS,
    abi: CDAIABI,
  }
};
