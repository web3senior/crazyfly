import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Splashscreen from './splashscreen'
import styles from './Layout.module.scss'

export default function Root() {
  const [network, setNetwork] = useState()
  const [isLoading, setIsLoading] = useState()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const location = useLocation()

  useEffect(() => {
  
  }, [])

  return (
    <>
      <Toaster />
      <Splashscreen />

      <div className={styles.layout}>
        <header>
          {/* {auth.wallet && `${auth.wallet.slice(0, 4)}...${auth.wallet.slice(38)}`} */}
        </header>

        <main>
          <Outlet />
        </main>

        <footer />
      </div>
    </>
  )
}
