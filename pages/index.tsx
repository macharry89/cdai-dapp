import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import AfterTransactionModal from '../components/AfterTransactionModal'
import ConnectModal from '../components/ConnectModal'
import Header from '../components/Header'
import WalletPanel from '../components/WalletPanel'
import { UserContext } from '../contexts/UserContext'
import { useWeb3Listener } from '../hooks'
import { useEagerConnect } from '../hooks/useEagerConnect'
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  useEagerConnect();
  useWeb3Listener();

  const { isWalletConnectOpened, setIsWalletConnectOpened } =
    useContext(UserContext);
    
  return (
    <div className="home">
      <Head>
        <title>cDAI Dapp</title>
        <meta name="description" content="cDAI Dapp Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="page-wrapper">
          <Header />
          <WalletPanel />

          <ConnectModal
            isOpened={isWalletConnectOpened}
            onClose={() => setIsWalletConnectOpened(false)}
          />

          <AfterTransactionModal />
        </div>
      </main>
      <ToastContainer />
    </div>
  )
}

export default Home
