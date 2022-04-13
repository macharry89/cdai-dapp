import { useContext, useEffect, useMemo, useState } from 'react';

import { UserContext } from '../contexts/UserContext';
import {
  useERC20Approve,
  useERC20Balance,
  useWeb3Provider,
} from '../hooks';
import CurrencyInput from './CurrencyInput';
import Loader from './Loader';
import GlowBorderedCard from './GlowBorderedCard';
import { getNormalizedPriceString, triggerToast } from '../utils';
import { useMint } from '../hooks/useMint';
import ActionButton from './ActionButton';

import Image from 'next/image';

const WalletPanel = () => {
  const { currencyAmount, setIsWalletConnectOpened, setCurrencyAmount, supplyBalance, updateSupplyBalance } =
    useContext(UserContext);

  const { account, active } = useWeb3Provider();
  const [ daiBalance , refreshDaiBalance] = useERC20Balance('DAI');
  const [ cDaiBalance ] = useERC20Balance('cDAI');
  const { isApproved, isApproving, approve } = useERC20Approve('DAI');
  const { isMinting, mint } = useMint();

  const [ exchangeRate, setExchangeRate ] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/exchangerate");
      if (res.ok) {
        const data = await res.json();
        setExchangeRate(data.exchangeRate);
      }
    })();

    updateSupplyBalance(account);
  });

  const ctaBtn = useMemo(() => {
    const btnContent = active ? (
      isApproved ? (
        isMinting ? (
          <>
            <Loader />
            Supplying
          </>
        ) : (
          'Supply'
        )
      ) : isApproving ? (
        <>
          <Loader />
          Enabling
        </>
      ) : (
        'Enable'
      )
    ) : (
      'Connect Wallet'
    );

    return (
      <ActionButton
        disabled={active && !currencyAmount && isApproved}
        onClick={() => {
          if (active) {
            if (isApproved) {
              if (!isMinting) {
                mint(parseFloat(currencyAmount), 'DAI');
              }
            } else if (!isApproving) {
              approve();
            }
          } else {
            setIsWalletConnectOpened(true);
          }
        }}
      >
        {btnContent}
      </ActionButton>
    );
  }, [
    active,
    approve,
    currencyAmount,
    mint,
    isApproved,
    isApproving,
    isMinting,
    setIsWalletConnectOpened,
  ]);

  return (
    <div className="wallet-panel">

      <div className="wallet-panel-wrapper">
        <div className="wallet-horizontal-border wallet-top-border">
          <Image
            src={'/assets/img/border-top.png'}
            alt=""
            layout="fill"
          />
        </div>
        <div className="wallet-horizontal-border wallet-bottom-border">
          <Image
            src={'/assets/img/border-bottom.png'}
            alt=""
            layout="fill"
          />
        </div>
        <div className="wallet-vertical-border wallet-left-border">
          <Image
            src={'/assets/img/border-vertical.png'}
            alt=""
            layout="fill"
          />
        </div>
        <div className="wallet-vertical-border wallet-right-border">
          <Image
            src={'/assets/img/border-vertical.png'}
            alt=""
            layout="fill"
          />
        </div>

        <div className="wallet-sale-status">
          <p>Welcome to Compound</p>
        </div>

        <div className="wallet-pannel-inner">
          <div className="wallet-currency-select-row">
            <div className="wallet-currency-select-title">
              I want to deposit
            </div>

            <div className="wallet-dai-balance">
              <button
                onClick={() =>
                  daiBalance && setCurrencyAmount(daiBalance.toString())
                }
              >
                Balance:{' '}
                {daiBalance?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) ?? '--'}
              </button>
              <button onClick={refreshDaiBalance}>
                <Image 
                  src={'/assets/img/refresh.svg'} 
                  alt="" 
                  width={25}
                  height={25}
                />
              </button>
            </div>
          </div>

          <CurrencyInput
            value={currencyAmount}
            onChange={setCurrencyAmount}
            maxValue={daiBalance}
          />

          <div className="wallet-cta-row">
            <div className="connect-btn-wrapper">{ctaBtn}</div>
          </div>

          <div className="wallet-info-grid">
            <GlowBorderedCard 
              title="Exchange rate" 
              content={`1 DAI = ${getNormalizedPriceString(exchangeRate ?? 0)} cDAI`}
            />
            <GlowBorderedCard
              title="Your Supply Balance"
              content={`${getNormalizedPriceString(Number.parseFloat(supplyBalance) ?? 0)} cDAI`}
            />
            <GlowBorderedCard
              title="Your DAI Balance"
              content={`${getNormalizedPriceString(daiBalance ?? 0)} DAI`}
            />
            <GlowBorderedCard
              title="Your cDAI Balance"
              content={`${getNormalizedPriceString(cDaiBalance ?? 0)} cDAI`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPanel;
