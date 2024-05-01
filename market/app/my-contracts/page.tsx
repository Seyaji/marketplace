'use client'

import { useEffect, useState } from 'react'
import { IWeb3Context, useWeb3Context } from '../components/wallet-connect/web3Context'
import { Listing } from '../market/page'
import { Card } from '../components/product-card/Card'
import styles from "../market/market.module.css"



async function getUserContracts(address: string) {
  return await fetch("/api/my-contracts?address=" + address.toLowerCase())
}

export default function MyContracts() {
  const [contracts, setContracts] = useState<Listing[]>()
  const {
    state: { address, network, provider },
  } = useWeb3Context() as IWeb3Context;

  useEffect(() => {
    const userContracts = async () => {
      try {
        if (address) {
          const res = await getUserContracts(address)

          if (res.ok) {
            const data = await res.json()
            setContracts(data)
          }
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    if (address) {
      userContracts()
    }
  }, [address])


  return (
    <div className={styles.market}>
      {
        (contracts ?? []).map((contract, index) => <Card key={index + contract.name} {...contract} />)
      }
    </div>
  )
}