import { Suspense, useState, useEffect, useRef } from 'react'
import { useLoaderData, defer, Form, Await, useRouteError, Link, useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import MaterialIcon from './helper/MaterialIcon'
import Shimmer from './helper/Shimmer'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import Logo from './../../src/assets/logo.svg'
import Web3 from 'web3'
import ABI from '../abi/luckybet.json'
import party from 'party-js'
import DappDefaultIcon from './../assets/dapp-default-icon.svg'
import styles from './Level.module.scss'


export const loader = async () => {
  return defer({ key: 'val' })
}

function Pools({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState([])
  const [app, setApp] = useState([])
  const [backApp, setBackupApp] = useState([])
  const [whitelist, setWhitelist] = useState()
  const [recentApp, setRecentApp] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const txtSearchRef = useRef()

  useEffect(() => {
    // getAppList().then(async (res) => {
    //   const responses = await Promise.all(res[0].map(async (item) => Object.assign(await fetchIPFS(item.metadata), item, { like: web3.utils.toNumber(await getLike(item.id)) })))
    //   setApp(responses.filter((item) => item.status))
    //   setBackupApp(responses)
    //   setIsLoading(false)
    // })
    setPools([{ name: 'Level 1' }, { name: 'Level 2' }, { name: 'Level 3' }, { name: 'Level 4' }])
  }, [])

  return (
    <>
      <section className={styles.section}>
        <div className={`__container h-inherit d-flex flex-column align-items-center justify-content-center`} data-width={`large`}>
          <div className={`d-flex flex-column align-items-center justify-content-center mt-10`}>
            {pools.map((item, i) => {
              return (
                <Link to={`/play/0x0000000000000000000000000000000000000000000000000000000000000001`} key={i} style={{ opacity: i === 0 ? 1 : 0.4 }}>
                  <button>{item.name}</button>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Pools
