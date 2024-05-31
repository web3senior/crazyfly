import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import Web3 from 'web3'
import detectEthereumProvider from "@metamask/detect-provider";


export const AuthContext = React.createContext()

export function useAuth() {
  useContext(AuthContext)
}

export const isAuth = async () => await localStorage.getItem('accessToken')

export const chainID = async () => await web3.eth.getChainId()

export const getIPFS = async (CID) => {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_IPFS_GATEWAY}${CID}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

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

export const isMetaMaskInstalled = () => PROVIDER && PROVIDER.isMetaMask

export function AuthProvider({ children }) {
  const [wallet, setWallet] = useState(null)
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
      toast.dismiss(loadingToast)
      toast.success(`Wallet successfuly connected`)
      navigate(`/`)
      return accounts[0]
    } catch (error) {
      toast.error(`The provider could not be found.`)
      toast.dismiss(loadingToast)
    }
  }

  async function getAccount() {
    const accounts = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
      .request({ method: "eth_requestAccounts" })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error.
            // If this happens, the user rejected the connection request.
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    const account = accounts[0];
    setWallet(account)
  return account
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      getAccount().then((addr) => {
        console.log(addr)
        setWallet(addr)
      })
    }    
  }, [])

  const value = {
    wallet,
    getAccount,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
