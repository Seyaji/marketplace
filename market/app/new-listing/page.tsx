'use client'

import React, { Fragment, useState } from 'react';
import { alchemy } from '../../lib/alchemy'
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

async function validateData(data: FormData): Promise<boolean> {
  const address = await alchemy.core.getBalance(data.address)
  console.log(address)
  return !!address && !Object.values(data).map(entry => !!entry).includes(false)
}


function ContractForm() {
  const [success, setSuccess] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    author: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await validateData(formData)
      .then(async (valid) => {

        if (valid) {
          await createListing(formData)
          console.log(formData)

          setFormData({
            name: '',
            address: '',
            author: '',
            image: ''
          });

          setSuccess(true)

          console.log(formData)
        }
      })
      .catch(error => console.error(error))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  return (
    <Fragment>
      <form className={styles.new_listing} onSubmit={handleSubmit}>
        <h3>List Contract</h3>

        <div className={styles.form_group}>
          <label>Name: </label>
          <input type="text" id="name" placeholder="Contract Name" required onChange={handleChange} value={formData.name} />
        </div>

        <div className={styles.form_group}>
          <label>Address: </label>
          <input type="text" id="address" placeholder="Contract Address" required onChange={handleChange} value={formData.address} />
        </div>

        <div className={styles.form_group}>
          <label>Author: </label>
          <input type="text" id="author" placeholder="Contract Author/Owner" required onChange={handleChange} value={formData.author} />
        </div>

        <div className={styles.form_group}>
          <label>Image: </label>
          <input type="text" id="image" placeholder="Listing Image Url" required onChange={handleChange} value={formData.image} />
        </div>

        <button className={styles.form_button} type="submit">SUBMIT</button>
      </form>
      {
        success &&
        <div className={styles.form_message}>
          <h4>Listing completed successfully!</h4>
        </div>
      }
    </Fragment>
  )
}

export default function ListContract() {
  return (
    <ContractForm />
  )
}
