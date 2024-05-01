
import { useEffect, useState } from "react"
import Layout from "../layout"
import { getAllUsers, Profile } from "../../lib/users/userFunction"
import styles from "./users.module.css"

interface Props {
  children: React.ReactNode
}

function UserListItem(user: Profile) {
  return (
    <div className={styles.user_list_item}>
      <h4>ID: {user.id}</h4>
      <h4>Name: {user.name}</h4>
      <h4>Address: {user.address}</h4>
    </div>
  )
}

export default function Users({ children }: Props) {
  const [users, setUsers] = useState<Profile[]>()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getAllUsers()

        if (res.ok) {
          setUsers(await res.json())
          console.log(users)
        }
      }
      catch (error) {
        console.error(error)
      }
    }

    getUsers()
  }, [])


  return (
    <Layout>
      <div className={styles.users}>
        {
          users ? users.map(user => <UserListItem key={user.id} {...user} />) : <h3>Loading ...</h3>
        }
      </div>
    </Layout>
  )
}