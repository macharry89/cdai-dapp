import { Asset, ASSET_LIST, DELEGATOR_ADDRESS } from '../constants/contracts';
import { useContract } from './useContract';
import { useCallback, useEffect, useState } from 'react';
import { useWeb3Provider } from './useWeb3Provider';
import { BigNumber, constants } from 'ethers';
import { useIsMounted } from './useIsMounted';
import { triggerToast } from '../utils';

export const useERC20Approve = (asset: Asset) => {
  const erc20Contract = useContract(
    ASSET_LIST[asset].address,
    ASSET_LIST[asset].abi,
    true
  );
  const { account } = useWeb3Provider();
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const isMounted = useIsMounted();

  const approve = useCallback(() => {
    if (erc20Contract) {
      setIsApproving(true);
      erc20Contract
        .approve(DELEGATOR_ADDRESS, constants.MaxUint256)
        .then((txPreHash: any) => txPreHash.wait())
        .then((txHash: any) => {
          if (isMounted.current) {
            setIsApproved(true);
            triggerToast('SUCCESS');
          }
        })
        .catch((err: any) => {
          triggerToast('ERROR');
        })
        .then(() => {
          if (isMounted.current) {
            setIsApproving(false);
          }
        });
    }
  }, [erc20Contract, isMounted]);

  useEffect(() => {
    if (account && erc20Contract) {
      erc20Contract
        .allowance(account, DELEGATOR_ADDRESS)
        .then((value: BigNumber) => {
          if (!value.isZero() && isMounted.current) {
            setIsApproved(true);
          } else {
            setIsApproved(false);
          }
        });
    }
  }, [account, erc20Contract, isMounted]);

  return {
    isApproved,
    approve,
    isApproving,
  };
};
