import { useCallback, useContext, useState } from 'react';
import { parseEther } from 'ethers/lib/utils';

import { Asset, DELEGATOR_ADDRESS } from '../constants/contracts';
import DelegatorABI from '../constants/ABI/delegator.json';
import { useContract } from './useContract';
import { useIsMounted } from './useIsMounted';
import { triggerToast } from '../utils';
import { UserContext } from '../contexts/UserContext';
import { useWeb3Provider, useDelegateInfo } from '../hooks';

export const useMint = () => {
  const delegatorContract = useContract(DELEGATOR_ADDRESS, DelegatorABI, true);
  const [isMinting, setIsMinting] = useState(false);
  const isMounted = useIsMounted();
  const { setIsTransactionModalOpened, setCurrencyAmount } =
    useContext(UserContext);
  const { account } = useWeb3Provider();
  const delegateInfo = useDelegateInfo();

  const mint = useCallback(
    (amount: number, asset: Asset) => {
      if (delegatorContract) {
        setIsMinting(true);
        delegatorContract
          .mint(parseEther(amount.toString()))
          .then((txPreHash: any) => txPreHash.wait())
          .then(async (txHash: any) => {
            if (isMounted.current) {
              triggerToast('SUCCESS');

              // const fetchData = async () => {
              //   const response = await fetch("/api/dai-supply");
            
              //   if (!response.ok) {
              //     throw new Error(`Error: ${response.status}`);
              //   }
              //   const data = await response.json();
              //   console.log(data);
              // };

              setIsTransactionModalOpened(true);
              setCurrencyAmount('');
            }
          })
          .catch((err: any) => {
            console.error(err);
            triggerToast('ERROR');
          })
          .then(() => {
            if (isMounted.current) {
              setIsMinting(false);
            }
          });
      }
    },
    [
      delegatorContract,
      isMounted,
      // presaleInfo.buyRate,
      account,
      setIsTransactionModalOpened,
      setCurrencyAmount,
    ]
  );

  return {
    isMinting,
    mint,
  };
};
