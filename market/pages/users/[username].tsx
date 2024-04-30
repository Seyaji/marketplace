'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUser } from '../../lib/users/userFunction';
import styles from './profile.module.css'
import Layout from '../layout'

interface Profile {
  id: number;
  name: string;
  address: string;
  image: string;
  createdAt: Date;
}

export default function UserProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const [userData, setUserData] = useState<Profile>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUser(username as string);

        if (res.ok) {
          const data = await res.json();
          console.log(data)
          setUserData(data);
        } else {
          console.log(res)
          console.error('Failed to fetch user data:', res.statusText);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (username) {
      console.log(username)
      fetchUserData();
    }
  }, [username]);

  function userDisplay(user: Profile) {
    return (
      <div className={styles.profile_content}>
        <div className={styles.user_entry}>
          <h3 className={styles.user_entry_tag}>User ID: </h3>
          <h3>{user.id}</h3>
        </div>

        <div className={styles.user_entry}>
          <h3 className={styles.user_entry_tag}>Username: </h3>
          <h3>{user.name}</h3>
        </div>

        <div className={styles.user_entry}>
          <h3 className={styles.user_entry_tag}>Address: </h3>
          <h3>{user.address}</h3>
        </div>

      </div>
    )
  }

  return (
    <Layout>
      <div className={styles.profile}>
        {
          !userData ? <div>Loading...</div> : userDisplay(userData)
        }
      </div>
    </Layout>
  );
}
