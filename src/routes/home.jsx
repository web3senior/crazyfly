import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import MaterialIcon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from './../contexts/AuthContext'
import Logo from './../../src/assets/logo.svg'
import Aratta from './../../src/assets/aratta.svg'
import { getLeaderboard } from './../util/api'
import Luckybet from './../../src/assets/luckybet.svg'
import Slogan from './../../src/assets/slogan.svg'
import Web3 from 'web3'
import ABI from '../abi/luckybet.json'
import party from 'party-js'
import DappDefaultIcon from './../assets/dapp-default-icon.svg'
import styles from './Home.module.scss'

export const loader = async () => {
  return defer({ key: 'val' })
}

function Home({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [wallet, setWallet] = useState('')
  const [leaderboard, setLeaderboard] = useState([])
  const [whitelist, setWhitelist] = useState()
  const [recentApp, setRecentApp] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const txtSearchRef = useRef()
  console.log(useAuth())

  const getRecentApp = async () => {
    return await JSON.parse(localStorage.getItem(`appSeen`))
  }

  const handleShowModal = (action) => {
    setShowModal((showModal) => !showModal)
    switch (action) {
      case 'rules':
        setModalContent(`Goal: Catch as many flies as possible within the specified time limit to climb the leaderboard and become the ultimate fly-catching champion!`)
        break
      case 'about':
        setModalContent(
          `Crazy Fly is a blockchain game where you control a hungry frog on a mission to catch mischievous flies. As you play, you'll earn rewards and unlock unique NFT collectibles, each with its own value and utility.`
        )
        break
      case 'guide':
        setModalContent(`
        Getting Started with Crazy Fly
Ready to join the fun and catch some flies? Here's a quick guide to get you started:

1. Connect Your Web3 Wallet:

Open Crazy Fly and click the "Connect Wallet" button.
Choose your preferred Web3 wallet from the available options (e.g., MetaMask, WalletConnect).
Follow the on-screen instructions to grant Crazy Fly access to your wallet.
2. Select the Network:

Once your wallet is connected, you'll be prompted to choose the network you want to play on.
Crazy Fly currently supports popular blockchains like Line and Luxo.
Select the network that best suits your needs and preferences.
3. Start Playing!

With your wallet connected and the network selected, you're ready to dive into the world of Crazy Fly!
Catch flies, collect NFTs, and enjoy the fun and rewarding gameplay.
        `)
        break
      default:
        setModalContent(`Unknown`)
        break
    }
  }

  async function getAccount() {
    const accounts = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
      .request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.')
        } else {
          console.error(err)
        }
      })
    const account = accounts[0]
    localStorage.setItem(`wallet`, account)
    toast.success(`Wallet connected`)
    setWallet(account)
    return account
  }

  useEffect(() => {
    getLeaderboard().then((res) => {
      console.log(res)
      setLeaderboard(res)
    })
    // if (typeof window.ethereum !== "undefined") {
    //   console.log("MetaMask is installed!");
    //   getAccount().then((addr) => {
    //     console.log(addr)
    //     setWallet(addr)
    //   })
    // }
    // getAppList().then(async (res) => {
    //   const responses = await Promise.all(res[0].map(async (item) => Object.assign(await fetchIPFS(item.metadata), item, { like: web3.utils.toNumber(await getLike(item.id)) })))
    //   setApp(responses.filter((item) => item.status))
    //   setBackupApp(responses)
    //   setIsLoading(false)
    // })
    // getRecentApp().then((res) => {
    //   setRecentApp(res)
    // })
  }, [])

  return (
    <>
      <section className={styles.section}>
        {showModal && (
          <>
            <div className={styles.modal}>
              <div className={styles.modal__content}>
                <span onMouseDown={() => setShowModal(!showModal)} />
                {modalContent}
              </div>
            </div>
          </>
        )}

        <div className={`${styles['logo']} d-flex flex-row align-items-center justify-content-between`}>
          <figure className={`d-flex flex-row align-items-center justify-content-center`}>
            <img alt={`Lukso`} src={Logo} />
          </figure>
          <b>{import.meta.env.VITE_NAME}</b>
        </div>

        <div className={`__container h-inherit d-flex flex-column align-items-center justify-content-center`} data-width={`large`}>
          <nav className={`d-flex flex-column align-items-center justify-content-center`}>
            {!wallet && <button onClick={() => getAccount()}>Connect</button>}
            {wallet && <button onClick={() => navigate(`/level`)}>Play</button>}
            <button onClick={() => handleShowModal('rules')}>Rules</button>
            <button onClick={() => handleShowModal('guide')}>Guide</button>
            <button onClick={() => handleShowModal('about')}>About</button>

            <div className="card">
              <div className="card__header">Leaderboard | 10 top users</div>
              <div className="card__body">
                <table>
                  <thead>
                    <th className="text-left">Wallet</th>
                    <th>Score</th>
                  </thead>
                  <tbody>
                    {leaderboard &&
                      leaderboard
                        .filter((item, i) => i < 10)
                        .map((item) => {
                          return (
                            <tr>
                              <td>{item.wallet_addr}</td>
                              <td>{item.score}</td>
                            </tr>
                          )
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </nav>

          <Link to={`//aratta.dev`} target={`_blank`}>
            <figure>
              <img alt={import.meta.env.VITE_AUTHOR} src={Aratta} />
            </figure>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
