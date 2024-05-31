import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import MaterialIcon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth, web3, _ } from './../contexts/AuthContext'
import Logo from './../../src/assets/logo.svg'
import Aratta from './../../src/assets/aratta.svg'
import Luckybet from './../../src/assets/luckybet.svg'
import Slogan from './../../src/assets/slogan.svg'
import Web3 from 'web3'
import ABI from '../abi/luckybet.json'
import party from 'party-js'
import DappDefaultIcon from './../assets/dapp-default-icon.svg'
import styles from './Home.module.scss'

party.resolvableShapes['UP'] = `<img src="http://localhost:5173/src/assets/up-logo.svg"/>`
party.resolvableShapes['Lukso'] = `<img src="http://localhost:5173/src/assets/lukso-logo.svg"/>`

const WhitelistFactoryAddr = web3.utils.padLeft(`0x2`, 64)

export const loader = async () => {
  return defer({ key: 'val' })
}

function Home({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [app, setApp] = useState([])
  const [backApp, setBackupApp] = useState([])
  const [whitelist, setWhitelist] = useState()
  const [recentApp, setRecentApp] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const txtSearchRef = useRef()

  const addMe = async () => {
    const t = toast.loading(`Loading`)
    try {
      web3.eth.defaultAccount = auth.wallet

      const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET, {
        from: auth.wallet,
      })
      console.log(whitelistFactoryContract.defaultChain, Date.now())
      await whitelistFactoryContract.methods
        .addUser(WhitelistFactoryAddr)
        .send()
        .then((res) => {
          console.log(res)
          toast.dismiss(t)
          toast.success(`You hav been added to the list.`)
          party.confetti(document.querySelector(`h4`), {
            count: party.variation.range(20, 40),
          })
        })
    } catch (error) {
      console.error(error)
      toast.dismiss(t)
    }
  }

  const addUserByManager = async () => {
    const t = toast.loading(`Loading`)
    try {
      web3.eth.defaultAccount = auth.wallet

      const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET, {
        from: auth.wallet,
      })

      await whitelistFactoryContract.methods
        .addUserByManager(WhitelistFactoryAddr)
        .send()
        .then((res) => {
          console.log(res)
          toast.dismiss(t)
          toast.success(`You hav been added to the list.`)
          party.confetti(document.querySelector(`h4`), {
            count: party.variation.range(20, 40),
          })
        })
    } catch (error) {
      console.error(error)
      toast.dismiss(t)
    }
  }

  const updateWhitelist = async () => {
    web3.eth.defaultAccount = `0x188eeC07287D876a23565c3c568cbE0bb1984b83`

    const whitelistFactoryContract = new web3.eth.Contract('', `0xc407722d150c8a65e890096869f8015D90a89EfD`, {
      from: '0x188eeC07287D876a23565c3c568cbE0bb1984b83', // default from address
      gasPrice: '20000000000',
    })
    console.log(whitelistFactoryContract.defaultChain, Date.now())
    await whitelistFactoryContract.methods
      .updateWhitelist(web3.utils.utf8ToBytes(1), `q1q1q1q1`, false)
      .send()
      .then((res) => {
        console.log(res)
      })
  }

  const createWhitelist = async () => {
    console.log(auth.wallet)
    web3.eth.defaultAccount = auth.wallet

    const whitelistFactoryContract = new web3.eth.Contract(ABI, import.meta.env.VITE_WHITELISTFACTORY_CONTRACT_MAINNET)
    await whitelistFactoryContract.methods
      .addWhitelist(``, Date.now(), 1710102205873, `0x0D5C8B7cC12eD8486E1E0147CC0c3395739F138d`, [])
      .send({ from: auth.wallet })
      .then((res) => {
        console.log(res)
      })
  }

  const handleSearch = async () => {
    let dataFilter = app
    if (txtSearchRef.current.value !== '') {
      let filteredData = dataFilter.filter((item) => item.name.toLowerCase().includes(txtSearchRef.current.value.toLowerCase()))
      if (filteredData.length > 0) setApp(filteredData)
    } else setApp(backApp)
  }

  const fetchIPFS = async (CID) => {
    try {
      const response = await fetch(`https://api.universalprofile.cloud/ipfs/${CID}`)
      if (!response.ok) throw new Response('Failed to get data', { status: 500 })
      const json = await response.json()
      // console.log(json)
      return json
    } catch (error) {
      console.error(error)
    }

    return false
  }

  const getAppList = async () => {
    let web3 = new Web3(`https://rpc.lukso.gateway.fm`)
    web3.eth.defaultAccount = auth.wallet
    const UpstoreContract = new web3.eth.Contract(ABI, import.meta.env.VITE_UPSTORE_CONTRACT_MAINNET)
    return await UpstoreContract.methods.getAppList().call()
  }

  const getLike = async (appId) => {
    let web3 = new Web3(import.meta.env.VITE_RPC_URL)
    const UpstoreContract = new web3.eth.Contract(ABI, import.meta.env.VITE_UPSTORE_CONTRACT_MAINNET)
    return await UpstoreContract.methods.getLikeTotal(appId).call()
  }

  const handleRemoveRecentApp = async (e, appId) => {
    localStorage.setItem('appSeen', JSON.stringify(recentApp.filter((reduceItem) => reduceItem.appId !== appId)))

    // Refresh the recent app list
    getRecentApp().then((res) => {
      setRecentApp(res)
    })
  }

  const getRecentApp = async () => {
    return await JSON.parse(localStorage.getItem(`appSeen`))
  }

  const handleShowModal = (action) => {
    setShowModal((showModal) => !showModal)
    switch (action) {
      case 'rules':
        setModalContent(
          `Goal: Catch as many flies as possible within the specified time limit to climb the leaderboard and become the ultimate fly-catching champion!`
        )
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

  useEffect(() => {
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
          <button onClick={() => auth.connectWallet()}>Connect</button>
          <button onClick={() => navigate(`/level`)}>Play</button>
            <button onClick={() => handleShowModal('rules')}>Rules</button>
            <button onClick={() => handleShowModal('guide')}>Guide</button>
            <button onClick={() => handleShowModal('about')}>About</button>
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
