import Modal from './Modal';
import { useWeb3Provider } from '../hooks';
import Image from 'next/image';
import CloseImg from '/assets/img/close.png';
import MetaMaskImg from '/assets/img/metamask.png';
import WalletConnectImg from '/assets/img/wallet-connect.png';
const ConnectModal = ({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) => {
  const { activate } = useWeb3Provider();

  return (
    <Modal isOpen={isOpened} onRequestClose={onClose}>
      <div className="wallet-connect-modal">
        <button className="wallet-connect-close">
          <Image
            src={CloseImg}
            alt=""
            onClick={onClose}
            width="100%"
            height="100%"
          />
        </button>

        <div className="wallet-connect-inner">
          <button
            className="wallet-connector-button"
            onClick={() => activate('Injected')}
          >
            <Image src={MetaMaskImg} alt="" width="34px" height="34px"/>
            MetaMask
          </button>
          <button
            className="wallet-connector-button"
            onClick={() => activate('WalletConnect')}
          >
            <Image src={WalletConnectImg} alt="" width="34px" height="34px"/>
            WalletConnect
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ConnectModal;
