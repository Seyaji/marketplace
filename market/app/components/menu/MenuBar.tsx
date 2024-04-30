'use client'

import { Fragment } from 'react';
import { IWeb3Context, useWeb3Context } from '../wallet-connect/web3Context'
import Web3ContextProvider from "../wallet-connect/web3Context";
import styles from './menuBar.module.css'

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

function shortAddress(address: string) {
  return "0x..." + address.slice(address.length - 6, address.length)
}

function TopBar() {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, network, provider },
  } = useWeb3Context() as IWeb3Context;

  function connectWalletButton() {
    if (isAuthenticated) {
      connectWallet()

      return (
        <ul>
          <li>{shortAddress(address ?? "")}</li>
          <li>Network: {network?.name}</li>
          <button className={styles.connection} onClick={disconnect}>Disconnect</button>
        </ul>
      )
    }

    return (
      <ul>
        <button className={styles.connection} onClick={connectWallet}>Connect</button>
      </ul>
    )
  }


  return (
    <div className={styles.top_bar}>
      <ul>
        <li><a href="/">My Contracts</a></li>
        <li><a href="/new-listing">List Contract</a></li>
        <li>Help</li>
      </ul>

      {
        connectWalletButton()
      }
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
      <Web3ContextProvider>
        <TopBar />
        <SearchBar />
        <BottomBar />
      </Web3ContextProvider>
    </div>
  )
}