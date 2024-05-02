'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Listing } from '../../app/market/page';
import Layout from '../layout'
import styles from "./contract.module.css"

async function contractRequest(address: string) {
  return await fetch("/api/get-contract?address=" + address.toLowerCase())
}

export default function Contract() {
  const [details, setDetails] = useState<Listing>()
  const router = useRouter();
  const { contract } = router.query;

  useEffect(() => {
    const getContract = async () => {
      const res = await contractRequest(contract as string)
        .then(async (res) => res.ok ? await res.json() : console.error("No contract found..."))
        .catch(error => console.error(error))
      if (res?.contract) {
        setDetails(res.contract)
      }
    }

    if (contract) {
      getContract()
    }

  }, [contract])

  function ContractBox(details: Listing) {

    const entries: [string, string][] = Object.entries(details)

    function Heading({ header }: { header: [string, string] }) {
      const [key, value] = header

      if (key === 'abi') {
        return;
      }

      return (
        <div className={styles.details_header}>
          <h3 className={styles.contract_label}>{key[0].toUpperCase() + key.slice(1, key.length)}: </h3>
          <h3>{value}</h3>
        </div>
      )
    }

    return (
      <div className={styles.contract_box}>
        {
          entries.map((entry, index) => <Heading key={index} header={entry} />)
        }

        <div className={styles.contract_functions}>

        </div>

      </div>
    )
  }

  return (
    <Layout>
      <div className={styles.page_layout}>
        {
          details ? <ContractBox {...details} /> : <h1>Loading...</h1>
        }
      </div>
    </Layout>
  )

}