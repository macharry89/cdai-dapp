import { toast } from 'react-toastify';
import Image from 'next/image';
import TxSuccessImg from '/assets/img/tx-success.png'
import TxErrorImg from '/assets/img/tx-error.png'
import TxWalletDisconnectImg from '/assets/img/tx-wallet-disconnect.png'

export type TOAST_TYPE =
  | 'SUCCESS'
  | 'ERROR'
  | 'WRONG_NETWORK'
  | 'WALLET_CONNET'
  | 'WALLET_DISCONNECT';

export const triggerToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'SUCCESS') {
    toast.success('Successful Transaction', {
      hideProgressBar: true,
      icon: () => <Image src={TxSuccessImg} alt="" />,
    });
  }

  if (type === 'WALLET_CONNET') {
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
        icon: () => <Image src={TxErrorImg} alt="" />,
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
        icon: () => <Image src={TxWalletDisconnectImg} alt="" />,
      }
    );
  }

  if (type === 'ERROR') {
    toast.error('Transaction Failed', {
      hideProgressBar: true,
      icon: () => <Image src={TxErrorImg} alt="" />,
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
        icon: () => <Image src={TxErrorImg} alt="" />,
      }
    );
  }
};

export const updateToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'WALLET_CONNET') {
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
