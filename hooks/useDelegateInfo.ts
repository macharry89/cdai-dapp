import {
  DAI_DECIMALS,
  DELEGATOR_ADDRESS,
  CDAI_DECIMALS,
} from '../constants/contracts';
import DelegatorABI from '../constants/ABI/delegator.json';
import { useContract } from './useContract';
import { useCallback, useEffect, useState } from 'react';
import { formatUnits } from 'ethers/lib/utils';
import { useIsMounted } from './useIsMounted';

export const useDelegateInfo = () => {
  const delegatorContract = useContract(DELEGATOR_ADDRESS, DelegatorABI);
  const isMounted = useIsMounted();

  const [delegateInfo, setDelegateInfo] = useState<{
    buyRate?: number;
  }>({});

  const fetchDelegateInfo = useCallback(() => {
    // if (delegatorContract) {
    //   Promise.all([
    //     delegatorContract.totalCoinAmount(),
    //   ])
    //     .then(
    //       ([]) => {
    //       }
    //     )
    //     .catch((err) => {
    //       console.log('--------------error')
    //       if (isMounted.current) {
    //         console.error(err);
    //       }
    //     });
    // }
  }, [isMounted, delegatorContract]);

  useEffect(() => {
    fetchDelegateInfo();
    const timer = setInterval(() => fetchDelegateInfo(), 3000);
    return () => {
      clearInterval(timer);
    };
  }, [fetchDelegateInfo]);

  return delegateInfo;
};
