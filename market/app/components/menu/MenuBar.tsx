'use client'
import styles from './menuBar.module.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from '../../config'
import { Account } from '../../account' 
import { WalletOptions } from '../../wallet-options' 

const queryClient = new QueryClient()

function ConnectWallet() { 
  const { isConnected } = useAccount() 
  if (isConnected) return <Account /> 
  return <WalletOptions /> 
} 
function SearchBar() {
  return (
    <div className={styles.search}>

      <div className={styles.name_div}>
        <h3><a href="/">MARKET</a></h3>
      </div>

      <div className={styles.search_bar}>
        <input className={styles.search_box} />

        <div className={styles.search_button}>
          SEARCH
        </div>

      </div>

    </div>
  )
}

function TopBar() {
  return (
    <div className={styles.top_bar}>
      <ul>
        <li><a href="/">My Contracts</a></li>
        <li><a href="/new-listing">List Contract</a></li>
        <li>Help</li>
      </ul>

      <ul>
        <b>Connect Wallet </b>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}> 
            <ConnectWallet /> 
          </QueryClientProvider> 
        </WagmiProvider> 
      </ul>
    </div>
  )
}

function BottomBar() {
  return (
    <div className={styles.bottom_bar}>
      <ul>
        <li><a href='/market'>Bottom</a></li>
        <li><a href='/market'>Row</a></li>
        <li><a href='/market'>Categories</a></li>
      </ul>
    </div>
  )
}

export function MenuBar() {
  return (
    <div className={styles.menu_bar}>
      <TopBar />
      <SearchBar />
      <BottomBar />
    </div>
  )
}