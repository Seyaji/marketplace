'use client'

import { useEffect, useState } from 'react'
import { Card } from "../components/product-card/Card";
import styles from "./market.module.css"

export interface Listing {
  id: string;
  name: string;
  address: string;
  author: string;
  image: string;
}


async function getListings() {
  const response = await fetch("/api/get-listings");
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }
  return await response.json();
}

export default function Market() {
  const [listings, setListings] = useState<Listing[]>()

  useEffect(() => {
    getListings()
      .then(data => setListings(data))
      .catch(error => console.error("Error fetching listings:", error));
  }, []);

  return (
    <div className={styles.market}>
      <br />
      <h1>Market</h1>
      <br />
      <div className={styles.market_grid}>
        {listings && listings.map(item => <Card key={item.id} {...item} />)}
      </div>
    </div>

  )
}