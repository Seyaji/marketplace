'use client'

import styles from "./create-profile.module.css"
import React, { Fragment, useState } from 'react';
import { alchemy } from '../../lib/alchemy'

interface FormData {
  name: string;
  address: string;
  image: string;
}


async function validateData(data: FormData): Promise<boolean> {
  const address = await alchemy.core.getBalance(data.address)
  return !!address && !Object.values(data).map(entry => !!entry).includes(false)
}

async function createProfile(data: FormData) {
  const res = await fetch("/api/create-profile", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    console.error("Error creating profile")
  } else {
    console.log("success!")
  }

}

export default function CreateProfile() {
  const [success, setSuccess] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await validateData(formData)
      .then(async (valid) => {

        if (valid) {
          await createProfile(formData)

          setFormData({
            name: '',
            address: '',
            image: ''
          });

          setSuccess(true)
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
      <form className={styles.new_profile} onSubmit={handleSubmit}>
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
          <label>Image: </label>
          <input type="text" id="image" placeholder="Listing Image Url" required onChange={handleChange} value={formData.image} />
        </div>

        <button className={styles.form_button} type="submit">SUBMIT</button>
      </form>
      {
        success && <h4>Profile created successfully! </h4>
      }
    </Fragment>
  )
}