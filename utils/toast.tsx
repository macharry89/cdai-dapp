import { toast } from 'react-toastify';
import Image from 'next/image';
// import TxSuccessImg from '/assets/img/tx-success.png'
// import TxErrorImg from '/assets/img/tx-error.png'
// import TxWalletDisconnectImg from '/assets/img/tx-wallet-disconnect.png'

export type TOAST_TYPE =
  | 'SUCCESS'
  | 'ERROR'
  | 'WRONG_NETWORK'
  | 'WALLET_CONNECT'
  | 'WALLET_DISCONNECT';

export const triggerToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'SUCCESS') {
    toast.success('Successful Transaction', {
      hideProgressBar: true,
      icon: () => <Image src={'/assets/img/tx-success.png'} alt="" width="40" height="40"/>,
    });
  }

  if (type === 'WALLET_CONNECT') {
    toast.success(
      <div>
        <p>Wallet Connected</p>
        <p className="Toastify__toast-submsg">
          Connected to wallet
          {extraContent ? (
            <>
              <br />
              {extraContent}
            </>
          ) : null}
        </p>
      </div>,
      {
        hideProgressBar: true,
        toastId: type,
        icon: () => <Image src={'/assets/img/tx-wallet.png'} alt="" width="40" height="40"/>,
      }
    );
  }

  if (type === 'WALLET_DISCONNECT') {
    toast.error(
      <div>
        <p>Wallet Disconnected</p>
        <p className="Toastify__toast-submsg">
          Disconnected from wallet
          {extraContent ? (
            <>
              <br />
              {extraContent}
            </>
          ) : null}
        </p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => <Image src={'/assets/img/tx-wallet-disconnect.png'} alt="" width="40" height="40"/>,
      }
    );
  }

  if (type === 'ERROR') {
    toast.error('Transaction Failed', {
      hideProgressBar: true,
      icon: () => <Image src={'/assets/img/tx-error.png'} alt="" width="40" height="40"/>,
    });
  }

  if (type === 'WRONG_NETWORK') {
    toast.error(
      <div>
        <p>Wrong Network</p>
        <p className="Toastify__toast-submsg">Switch to Ethereum Network</p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => <Image src={'/assets/img/tx-error.png'} alt="" />,
      }
    );
  }
};

export const updateToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'WALLET_CONNECT') {
    toast.update(type, {
      render: (
        <div>
          <p>Wallet Connected</p>
          <p className="Toastify__toast-submsg">
            Connected to wallet
            <br />
            {extraContent}
          </p>
        </div>
      ),
    });
  }
};
