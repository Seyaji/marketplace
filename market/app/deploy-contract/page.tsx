'use client'

import React, { useState } from 'react'
import { ethers } from 'ethers'
import styles from "./deploy-contract.module.css"
import formStyles from "../components/css/form.module.css"
import { ABIEntry, ContractABI, FunctionType, InternalType } from '../../contracts/contract-types'
import { ERC20Token } from '../../contracts/contractAbiFiles'


interface DropDownProps {
  setState: React.Dispatch<React.SetStateAction<string | undefined>>
  state: string
}

export interface FormData {
  name: string;
  constructorArgs: {
    [key: string]: string;
  }
}

interface ContractFormProps extends ABIEntry {
  contractName: string
  setStatus: React.Dispatch<React.SetStateAction<string[]>>
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
  "ERC20Token": constructorFields(ERC20Token),
  "Loan": constructorFields(ERC20Token),
  "NFT": constructorFields(ERC20Token),
  "Game": constructorFields(ERC20Token),
}

async function deployContract(body: any) {
  return await fetch("/api/create-listing", {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
}

function ContractForm({ contractName, inputs, setStatus }: ContractFormProps) {

  async function deploy(formData: FormData) {
    const ethereum = window.ethereum
    if (ethereum) {
      try {
        const provider = new ethers.BrowserProvider(ethereum);

        setStatus((prevState) => ["connected", ...prevState,])

        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setStatus((prevState) => ["Account retrieved", ...prevState,])



        const { constructorArgs } = formData;

        const sorted = inputs?.map(({ name }) => constructorArgs?.[name])

        setStatus((prevState) => ["Validading data...", ...prevState,])

        console.log(provider, signer, constructorArgs, sorted)

        if (provider && sorted) {

          const factory = new ethers.ContractFactory(ERC20Token.abi, ERC20Token.bytecode, signer);
          setStatus((prevState) => ["Constructing contract", ...prevState,])
          const contract = await factory.deploy(...sorted);
          setStatus((prevState) => ["Deploying...", ...prevState,])

          await contract.waitForDeployment();
          setStatus((prevState) => ["Deployed", ...prevState,])

          const contractAddress = (await contract.getAddress()).toLowerCase()

          console.log(contract)
          const res = await deployContract({ author: signer.address.toLowerCase(), address: contractAddress.toLowerCase(), name: "ERC20 " + contractName, image: "/", abi: JSON.stringify(ERC20Token.abi) })
          setStatus((prevState) => ["Deployment Complete", ...prevState,])

          if (res.ok) {
            window.location.href = "/contracts/" + contractAddress
          }
          return contract;
        }
      } catch (error) {
        console.error("Error deploying contract:", error);
        throw error;
      }
    }
  }

  if (inputs) {

    const [formData, setFormData] = useState<FormData>(
      [...inputs, { name: contractName }]
        ?.reduce((acc, curr, index) => (
          //@ts-ignore lame........ :(
          { ...acc, constructorArgs: { ...acc?.constructorArgs, [curr.name]: "" } }
        ), {}) as FormData
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if ('constructorArgs' in formData) {
        await deploy(formData)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData({ ...formData, constructorArgs: { ...formData.constructorArgs, [id]: value } });
    };

    const formField = (name: string, type: string, index: number) => {
      const address = type === InternalType.Address && { "minLength": 42, "maxLength": 42 }

      if (formData && 'constructorArgs' in formData) {
        return (
          <div className={formStyles.form_group} key={name + index}>
            <label>{name}: </label>
            <input
              type={type}
              id={name}
              placeholder={name}
              required
              {...address}
              onChange={(e) => handleChange(e)}
              value={formData.constructorArgs[name]}
            />
          </div>
        )
      }
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
  const [status, setStatus] = useState<string[]>([])

  return (
    <div className={styles.page}>
      <div className={styles.deploy_contract}>
        <div className={styles.dropdown_header}>
          <h4>Choose contract to deploy: </h4>
          <DropDown setState={setState} state={state || ""} />
        </div>
        {
          state && <ContractForm {...contracts[state]} contractName={state} setStatus={setStatus} />
        }
      </div>
      <div className={styles.status_box}>
        {
          status && status?.map((log, index) => <p key={index} > {log}</p>)
        }
      </div>
    </div >
  )
}
