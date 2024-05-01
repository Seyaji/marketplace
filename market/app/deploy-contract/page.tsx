'use client'

import React, { useState } from 'react'
import styles from "./deploy-contract.module.css"
import formStyles from "../components/css/form.module.css"


interface DropDownProps {
  setState: React.Dispatch<React.SetStateAction<string | undefined>>
}

interface ContractFields {
  name: string;
  fields: { [key: string]: string };
}

interface FieldData {
  [key: string]: string;
}

interface ContractCollection {
  [key: string]: ContractFields
}

interface ContractFormProps extends ContractFields { }


// To be replaced by with API call to SQL backend
const contracts: ContractCollection = {
  "Guess Average": {
    name: "Guess Average",
    fields: {
      "Price": 'string',
      "Number Of Shares": 'number',
      'Timer': 'number'
    }
  },
  "Contract A": {
    name: "Contract A",
    fields: {
      'Number of voters': 'number',
      'Signup cost': 'string',
      'Timer': 'number'
    }
  },
  "Contract B": {
    name: "Contract B",
    fields: {
      "Price": 'string',
      "Number Of Shares": 'number'
    }
  },
  "Contract C": {
    name: "Contract C",
    fields: {
      "Price": 'string',
      "Number Of Shares": 'number'
    }
  }
}


function ContractForm({ name, fields }: ContractFormProps) {
  const [formData, setFormData] = useState<FieldData>({});

  console.log(fields)
  console.log(Object.entries(fields))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  function formField(key: string, type: string, index: number) {
    return (
      <div className={formStyles.form_group} key={key + index}>
        <label>{key}: </label>
        <input
          type={type}
          id={key}
          placeholder={key}
          required
          onChange={handleChange}
          value={formData[key]}
        />
      </div>
    )
  }

  return (
    <form>
      <h3>{name}</h3>
      {
        Object.entries(fields).map(([key, value], index) => formField(key, value, index))
      }
      <button className={formStyles.form_button} type="submit">DEPLOY</button>
    </form>
  );
}

function DropDown({ setState }: DropDownProps) {
  const contractTypes = Object.keys(contracts)

  function handleClick(e: React.MouseEvent) {
    const contract = e.currentTarget.getAttribute('value')
    if (contract) {
      console.log(contract)
      setState(contract)
    }
  }

  return (
    <div className={styles.dropdown_box}>
      <ul>
        <li>- pick contract -</li>
        {
          contractTypes.map((name, index) => <li key={name + index} onClick={handleClick} value={name}>{name}</li>)
        }
      </ul>
    </div>
  )
}

export default function DeployContract() {
  const [state, setState] = useState<string | undefined>()

  return (
    <div className={styles.page}>
      <div className={styles.deploy_contract}>
        <div className={styles.dropdown_header}>
          <h4>Choose contract to deploy: </h4>
          <DropDown setState={setState} />
        </div>
        {
          state && <ContractForm {...contracts[state]} />
        }
      </div>
    </div>
  )
}
