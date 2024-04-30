'use client'

import { useRouter } from 'next/router';
import { useState } from 'react';

interface Profile {
  id: number;
  name: string;
  address: string;
  image: string;
  createdAt: Date;
}

const testProfile = {
  id: 1,
  name: "EtherMan",
  address: "0x4A079D4417b522762C72dB9643234FCC4683a40E",
  image: "/",
  createdAt: Date.now()

}

const UserProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userData, setUserData] = useState<Profile>();


  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.name}</h1>
    </div>
  );
};

export default UserProfilePage;
