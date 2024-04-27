'use client'

import React, { useState } from 'react';
import styles from "./new-listing.module.css";

interface FormData {
  name: string;
  address: string;
  author: string;
  image: string;
}

async function createListing(data: FormData) {
  const res = await fetch("/api/create-listing", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    console.error("Error creating listing")
  } else {
    console.log("success!")
  }

}

function validateData(data: FormData): boolean {
  return !Object.values(data).map(entry => !!entry).includes(false)
}


function ContractForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    author: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateData(formData)) {
      await createListing(formData)
      console.log(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  return (
    <form className={styles.new_listing} onSubmit={handleSubmit}>
      <h3>List Contract</h3>

      <div className={styles.form_group}>
        <label>Name: </label>
        <input type="text" id="name" placeholder="Contract Name" required onChange={handleChange} />
      </div>

      <div className={styles.form_group}>
        <label>Address: </label>
        <input type="text" id="address" placeholder="Contract Address" required onChange={handleChange} />
      </div>

      <div className={styles.form_group}>
        <label>Author: </label>
        <input type="text" id="author" placeholder="Contract Author/Owner" required onChange={handleChange} />
      </div>

      <div className={styles.form_group}>
        <label>Image: </label>
        <input type="text" id="image" placeholder="Listing Image Url" required onChange={handleChange} />
      </div>

      <button className={styles.form_button} type="submit">SUBMIT</button>
    </form>
  )
}

export default function ListContract() {
  return (
    <ContractForm />
  )
}
