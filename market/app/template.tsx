'use client'

import React from "react"
import Web3ContextProvider from "./components/wallet-connect/web3Context"
import { MenuBar } from "./components/menu/MenuBar"

interface Props {
  children: React.ReactNode
}

export default function Template({ children }: Props) {
  return (
    <Web3ContextProvider>
      <MenuBar />
      {children}
    </Web3ContextProvider>
  )

}