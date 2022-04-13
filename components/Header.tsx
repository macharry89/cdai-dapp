import { useContext, useState } from 'react';

import { UserContext } from '../contexts/UserContext';
import { useWeb3Provider } from '../hooks';
import { getWalletAddressAbbr } from '../utils';
import Image from 'next/image'
// import cDaiImg from '/assets/img/cdai.svg';
// import ChevronDownImg from '/assets/img/chevron-down.svg';

const Header = () => {
  const { isWalletConnectOpened, setIsWalletConnectOpened } =
    useContext(UserContext);
  const { account, active, deactivate } = useWeb3Provider();
  const [isWalletInfoOpened, setIsWalletInfoOpened] = useState(false);

  return (
    <div className="header">
      <div className="header-bg">
        <Image src={'/assets/img/cdai.svg'} alt="" width="100%" height="100%"/>
      </div>
      <div className="header-container">
        <span className="logo">
          CErc20Delegator
        </span>
        <button
          className="wallet-btn"
          onClick={() => {
            if (active) {
              setIsWalletInfoOpened(!isWalletInfoOpened);
            } else {
              !isWalletConnectOpened
                ? setIsWalletConnectOpened(true)
                : setIsWalletConnectOpened(false);
            }
          }}
        >
          {active ? (
            <>
              <span>{getWalletAddressAbbr(account)}</span>
              <Image src={'/assets/img/chevron-down.svg'} alt="" width="14" height="14"/>
            </>
          ) : (
            'Connect Wallet'
          )}
        </button>

        {active && isWalletInfoOpened ? (
          <button
            className="wallet-info-button"
            onClick={() => {
              deactivate();
              setIsWalletInfoOpened(false);
            }}
          >
            Disconnect
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default Header;
