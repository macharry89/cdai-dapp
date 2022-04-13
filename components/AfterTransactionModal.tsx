import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useAddTokenToMetamask } from '../hooks/useAddTokenToMetamask';
import Image from 'next/image'
// import ApproveSuccessImg from '/assets/img/approve-success.svg';
// import DaiImg from '/assets/img/dai.svg';
// import cDaiImg from '/assets/img/cdai.svg';
import Modal from './Modal';

const AfterTransactionModal = () => {
  const { isTransactionModalOpened, setIsTransactionModalOpened } =
    useContext(UserContext);
  const addDaiTokenToMetamask = useAddTokenToMetamask('DAI');
  const addCDaiTokenToMetamask = useAddTokenToMetamask('cDAI');

  return (
    <Modal
      isOpen={isTransactionModalOpened}
      onRequestClose={() => setIsTransactionModalOpened(false)}
      style={{
        overlay: {
          background: 'rgba(6, 14, 33, 0.72)',
        },
        content: {
          maxWidth: '803px',
          width: '100%',
          padding: '16px',
        },
      }}
    >
      <div className="approve-popup">
        <button
          className="close-button"
          onClick={() => setIsTransactionModalOpened(false)}
        />
        <div className="header-icon">
          <Image src={'/assets/img/approve-success.svg'} alt="success" width="126" height="126"/>
        </div>
        <h3>Congratulations!</h3>
        <p className="narrow-paragraph">
          Add the DAI/cDAI token to your wallet by clicking the button below.
        </p>
        <div className="button-wrapper">
          <button className="cta metamask-cta" onClick={addDaiTokenToMetamask}>
            <Image src={'/assets/img/dai.svg'} alt="Metamask" width="48" height="48"/>
            <span>Add cDAI to MetaMask</span>
          </button>
          <button className="cta metamask-cta" onClick={addCDaiTokenToMetamask}>
            <Image src={'/assets/img/cdai.svg'} alt="Metamask" width="48" height="48"/>
            <span>Add cDAI to MetaMask</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AfterTransactionModal;
