'use client'

import React, { useState } from 'react'
import styles from "./deploy-contract.module.css"
import formStyles from "../components/css/form.module.css"
import { ABIEntry, ContractABI, FunctionType } from '../../contracts/contract-types'
import { token } from '../../contracts/contractAbiFiles'


interface DropDownProps {
  setState: React.Dispatch<React.SetStateAction<string | undefined>>
  state: string
}

interface FieldData {
  [key: string]: string;
}

interface ContractFormProps extends ABIEntry {
  contractName: string
}

function constructorFields(abi: ContractABI) {
  const abiArray = abi.abi
  if (abiArray) {
    return abiArray.filter(entry => entry.type === FunctionType.Constructor)[0]
  }
  return []
}


interface ContractData {
  [key: string]: ABIEntry | never[]
}
const contracts: ContractData = {
  "ERC20Token": constructorFields(token),
  "Loan": constructorFields(token),
  "NFT": constructorFields(token),
  "Game": constructorFields(token),
}


async function deployContract(body: FieldData) {
  return await fetch("/api/deploy-contract", {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
}


function ContractForm({ contractName, inputs }: ContractFormProps) {
  const [formData, setFormData] = useState<FieldData>({});


  if (Object.values(formData).length <= 0) {
    setFormData(inputs?.reduce((acc, curr) => ({ ...acc, [curr.name]: "" }), {}) || {})
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await deployContract(formData)
  }

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
    <form onSubmit={handleSubmit}>
      <h3>{contractName}</h3>
      {
        (inputs ?? []).map(({ name, type }, index) => formField(name, type, index))
      }
      <button className={formStyles.form_button} type="submit">DEPLOY</button>
    </form>
  );
}

function DropDown({ setState, state }: DropDownProps) {
  const contractTypes = Object.keys(contracts)

  function handleClick(e: React.MouseEvent) {
    const contract = e.currentTarget.getAttribute('value')
    if (contract) {
      setState(contract)
    }
  }

  return (
    <div className={styles.dropdown_box}>
      <ul>
        {
          state ? <li>{state}</li> : <li>- pick contract -</li>
        }
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
          <DropDown setState={setState} state={state || ""} />
        </div>
        {
          state && <ContractForm {...contracts[state]} contractName={state} />
        }
      </div>
    </div>
  )
}
