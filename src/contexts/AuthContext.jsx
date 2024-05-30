import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// import { user } from '../util/api'
// import { ERC725 } from '@erc725/erc725.js'
// import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json'
import toast, { Toaster } from 'react-hot-toast'
import Web3 from 'web3'

export const PROVIDER = window.lukso
export const web3 = new Web3(PROVIDER)
export const _ = web3.utils._

export const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

export const isAuth = async () => await localStorage.getItem('accessToken')

export const chainID = async () => await web3.eth.getChainId()

export const getIPFS = async (CID) => {
  //  console.log(CID)
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  const response = await fetch(`https://api.universalprofile.cloud/ipfs/${CID}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

/**
 * Fetch Universal Profile
 * @param {address} addr
 * @returns
 */


/**
 * Connect wallet
 */
export const isWalletConnected = async () => {
  try {
    let accounts = await web3.eth.getAccounts()
    return accounts[0]
  } catch (error) {
    toast.error(error.message)
  }
}

export const isUPinstalled = () => PROVIDER && PROVIDER.isUniversalProfileExtension

export function AuthProvider({ children }) {
  const [wallet, setWallet] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  function logout() {
    localStorage.removeItem('accessToken')
    navigate('/login')
    setUser(null)
  }

  const connectWallet = async () => {
    let loadingToast = toast.loading('Loading...')

    try {
      let accounts = await web3.eth.getAccounts()
      if (accounts.length === 0) await web3.eth.requestAccounts()
      accounts = await web3.eth.getAccounts()
      //console.log(accounts)
      setWallet(accounts[0])
      fetchProfile(accounts[0]).then((res) => setProfile(res))
      toast.dismiss(loadingToast)
      toast.success(`UP successfuly connected`)
      navigate(`/`)
      return accounts[0]
    } catch (error) {
      toast.error(`The provider could not be found.`)
      toast.dismiss(loadingToast)
    }
  }

  useEffect(() => {
    // if (isUPinstalled()) {
    //   isWalletConnected().then((addr) => {
    //     if (addr !== undefined) {
    //       setWallet(addr)
    //       fetchProfile(addr).then((res) => setProfile(res))
    //     }
    //   })
    // }
  }, [])

  const value = {
    wallet,
    setWallet,
    profile,
    isUPinstalled,
    setProfile,
    isWalletConnected,
    connectWallet,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
